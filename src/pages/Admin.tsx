import { useEffect, useState } from 'react'

type Submission = {
  id: number
  name: string
  role: string
  answer: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export default function Admin() {
  const [key, setKey] = useState(() => sessionStorage.getItem('admin_key') ?? '')
  const [unlocked, setUnlocked] = useState(false)
  // Ако вече има запазена сесия, изчакваме проверката ѝ, вместо да мигне логин формата.
  const [checking, setChecking] = useState(() => !!sessionStorage.getItem('admin_key'))
  const [voices, setVoices] = useState<Submission[] | null>(null)
  const [error, setError] = useState('')

  async function load(adminKey: string) {
    setError('')
    // HTTP хедърите поддържат само ISO-8859-1 - кодираме, за да работи паролата
    // дори с кирилица/специални символи.
    const res = await fetch('/api/admin/voices', {
      headers: { 'x-admin-key': encodeURIComponent(adminKey) },
    })
    if (res.status === 401) {
      setUnlocked(false)
      sessionStorage.removeItem('admin_key')
      setError('Грешна парола.')
      return
    }
    if (!res.ok) {
      setError('Нещо се обърка при зареждането.')
      return
    }
    const data = (await res.json()) as { voices: Submission[] }
    setVoices(data.voices)
    setUnlocked(true)
    sessionStorage.setItem('admin_key', adminKey)
  }

  useEffect(() => {
    if (key) load(key).finally(() => setChecking(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function act(id: number, action: 'approve' | 'reject' | 'delete') {
    await fetch(`/api/admin/voices/${id}/${action}`, {
      method: 'POST',
      headers: { 'x-admin-key': encodeURIComponent(key) },
    })
    load(key)
  }

  if (checking) {
    return <div className="container" style={{ paddingBlock: 80 }} />
  }

  if (!unlocked) {
    return (
      <div className="container" style={{ paddingBlock: 80, maxWidth: 360 }}>
        <h1 style={{ fontSize: 20, marginBottom: 16 }}>Admin вход</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            load(key)
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Парола"
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--ink)',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 16px',
              borderRadius: 999,
              border: 'none',
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Влез
          </button>
          {error && <p style={{ color: 'var(--accent)', fontSize: 13 }}>{error}</p>}
        </form>
      </div>
    )
  }

  const pending = voices?.filter((v) => v.status === 'pending') ?? []
  const rest = voices?.filter((v) => v.status !== 'pending') ?? []

  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>Модерация - Гласът на Локомотив</h1>

      <h2 style={{ fontSize: 16, marginBottom: 12, color: 'var(--accent)' }}>
        Чакащи преглед ({pending.length})
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        {pending.length === 0 && <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Няма чакащи.</p>}
        {pending.map((v) => (
          <div key={v.id} className="card" style={{ padding: 16 }}>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 6 }}>
              {v.name} - {v.role} - {v.created_at}
            </p>
            <p style={{ marginBottom: 12 }}>{v.answer}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => act(v.id, 'approve')} style={btnStyle('var(--good)')}>
                Одобри
              </button>
              <button onClick={() => act(v.id, 'reject')} style={btnStyle('var(--ink-muted)')}>
                Откажи
              </button>
              <button onClick={() => act(v.id, 'delete')} style={btnStyle('var(--accent)')}>
                Изтрий
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 16, marginBottom: 12 }}>Обработени ({rest.length})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rest.map((v) => (
          <div
            key={v.id}
            className="card"
            style={{ padding: 12, display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13 }}
          >
            <span>
              <strong>{v.status === 'approved' ? '✅' : '❌'}</strong> {v.name}: {v.answer.slice(0, 60)}
              {v.answer.length > 60 ? '…' : ''}
            </span>
            <button onClick={() => act(v.id, 'delete')} style={{ ...btnStyle('var(--ink-muted)'), padding: '4px 10px' }}>
              Изтрий
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function btnStyle(color: string): React.CSSProperties {
  return {
    padding: '6px 14px',
    borderRadius: 999,
    border: `1px solid ${color}`,
    background: 'transparent',
    color,
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
  }
}
