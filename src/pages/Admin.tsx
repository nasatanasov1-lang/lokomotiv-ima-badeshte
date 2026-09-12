import { useEffect, useState } from 'react'

type Submission = {
  id: number
  name: string
  role: string
  answer: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

const PAGE_SIZE = 20

export default function Admin() {
  const [key, setKey] = useState(() => sessionStorage.getItem('admin_key') ?? '')
  const [unlocked, setUnlocked] = useState(false)
  // Ако вече има запазена сесия, изчакваме проверката ѝ, вместо да мигне логин формата.
  const [checking, setChecking] = useState(() => !!sessionStorage.getItem('admin_key'))
  const [voices, setVoices] = useState<Submission[] | null>(null)
  const [error, setError] = useState('')

  const [tab, setTab] = useState<'pending' | 'processed'>('pending')
  const [pendingPage, setPendingPage] = useState(1)
  const [processedPage, setProcessedPage] = useState(1)

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

  function confirmDelete(v: Submission) {
    const message =
      v.status === 'approved'
        ? `„${v.name}“ вече е одобрен и се показва на сайта. Изтриването ще го премахне и от там незабавно. Продължавам ли?`
        : `Сигурен ли си, че искаш да изтриеш отговора на „${v.name}“?`
    if (window.confirm(message)) {
      act(v.id, 'delete')
    }
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
  const processed = voices?.filter((v) => v.status !== 'pending') ?? []

  const pendingTotalPages = Math.max(1, Math.ceil(pending.length / PAGE_SIZE))
  const processedTotalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE))
  const safePendingPage = Math.min(pendingPage, pendingTotalPages)
  const safeProcessedPage = Math.min(processedPage, processedTotalPages)

  const pendingPageItems = pending.slice((safePendingPage - 1) * PAGE_SIZE, safePendingPage * PAGE_SIZE)
  const processedPageItems = processed.slice((safeProcessedPage - 1) * PAGE_SIZE, safeProcessedPage * PAGE_SIZE)

  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>Модерация - Гласът на Локомотив</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
        <button
          onClick={() => setTab('pending')}
          style={tabStyle(tab === 'pending')}
        >
          Чакащи ({pending.length})
        </button>
        <button
          onClick={() => setTab('processed')}
          style={tabStyle(tab === 'processed')}
        >
          Обработени ({processed.length})
        </button>
      </div>

      {tab === 'pending' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            {pending.length === 0 && <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Няма чакащи.</p>}
            {pendingPageItems.map((v) => (
              <div key={v.id} className="card" style={{ padding: 16 }}>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 6, overflowWrap: 'anywhere' }}>
                  {v.name} - {v.role} - {v.created_at}
                </p>
                <p style={{ marginBottom: 12, overflowWrap: 'anywhere' }}>{v.answer}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => act(v.id, 'approve')} style={btnStyle('var(--good)')}>
                    Одобри
                  </button>
                  <button onClick={() => act(v.id, 'reject')} style={btnStyle('var(--ink-muted)')}>
                    Откажи
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pager page={safePendingPage} totalPages={pendingTotalPages} onChange={setPendingPage} />
        </>
      )}

      {tab === 'processed' && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {processed.length === 0 && <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Няма обработени.</p>}
            {processedPageItems.map((v) => (
              <div
                key={v.id}
                style={{
                  padding: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  fontSize: 13,
                  borderRadius: 16,
                  border: `1px solid ${v.status === 'approved' ? '#1c3a26' : '#3a1c1c'}`,
                  background: v.status === 'approved' ? '#0c1a10' : '#1a0c0c',
                  color: '#e8e8e6',
                }}
              >
                <span style={{ overflowWrap: 'anywhere', minWidth: 0 }}>
                  <strong>{v.status === 'approved' ? '✅' : '❌'}</strong> {v.name}: {v.answer.slice(0, 60)}
                  {v.answer.length > 60 ? '…' : ''}
                </span>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {v.status === 'approved' ? (
                    <button
                      onClick={() => act(v.id, 'reject')}
                      style={{ ...btnStyle('var(--ink-muted)'), padding: '4px 10px' }}
                    >
                      Откажи
                    </button>
                  ) : (
                    <button
                      onClick={() => act(v.id, 'approve')}
                      style={{ ...btnStyle('var(--good)'), padding: '4px 10px' }}
                    >
                      Одобри
                    </button>
                  )}
                  <button onClick={() => confirmDelete(v)} style={{ ...btnStyle('var(--accent)'), padding: '4px 10px' }}>
                    Изтрий
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pager page={safeProcessedPage} totalPages={processedTotalPages} onChange={setProcessedPage} />
        </>
      )}
    </div>
  )
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    padding: '10px 16px',
    border: 'none',
    borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
    background: 'transparent',
    color: active ? 'var(--ink)' : 'var(--ink-muted)',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    marginBottom: -1,
  }
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

function Pager({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
}) {
  if (totalPages <= 1) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
      <button onClick={() => onChange(page - 1)} disabled={page <= 1} style={pagerBtnStyle(page <= 1)}>
        ← Предишна
      </button>
      <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
        Страница {page} от {totalPages}
      </span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        style={pagerBtnStyle(page >= totalPages)}
      >
        Следваща →
      </button>
    </div>
  )
}

function pagerBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    padding: '6px 14px',
    borderRadius: 999,
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: disabled ? 'var(--ink-muted)' : 'var(--ink)',
    fontSize: 13,
    fontWeight: 600,
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  }
}
