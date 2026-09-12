import { useState } from 'react'

export default function VoiceSubmitForm() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [answer, setAnswer] = useState('')
  const [website, setWebsite] = useState('') // honeypot - остава скрито за хора
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !role.trim() || !answer.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/voices', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, role, answer, website }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
      setName('')
      setRole('')
      setAnswer('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card" style={{ padding: 20, textAlign: 'center' }}>
        <p style={{ fontWeight: 700, marginBottom: 4 }}>Благодарим!</p>
        <p style={{ fontSize: 14, color: 'var(--ink-secondary)' }}>
          Отговорът ти чака преглед и ще се появи тук, след като бъде одобрен.
        </p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 10,
    border: '1px solid var(--border)',
    background: 'var(--page)',
    color: 'var(--ink)',
    fontSize: 14,
    fontFamily: 'inherit',
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 20 }}>
      <h3 style={{ fontSize: 16, marginBottom: 4 }}>Кажи и своя отговор</h3>
      <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 16 }}>
        Отговорите се преглеждат преди публикуване, за да остане пространството смислено.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Име (или псевдоним)"
          maxLength={80}
          required
          style={inputStyle}
        />
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Връзка с клуба (напр. „фен от 10 години“)"
          maxLength={120}
          required
          style={inputStyle}
        />
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Какъв Локомотив искаш да видиш след 5 години?"
          maxLength={600}
          required
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
        {/* Honeypot - скрито от хора чрез CSS, ботовете обикновено го попълват */}
        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />

        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            padding: '11px 18px',
            borderRadius: 999,
            border: 'none',
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            fontWeight: 700,
            fontSize: 14,
            cursor: status === 'sending' ? 'default' : 'pointer',
            opacity: status === 'sending' ? 0.7 : 1,
          }}
        >
          {status === 'sending' ? 'Изпращане…' : 'Изпрати'}
        </button>
        {status === 'error' && (
          <p style={{ fontSize: 13, color: 'var(--accent)' }}>
            Нещо се обърка — опитай отново след малко.
          </p>
        )}
      </div>
    </form>
  )
}
