import { mythFacts, type Verdict } from '../data/mythFacts'

const verdictColor: Record<Verdict, string> = {
  myth: 'var(--ink-muted)',
  fact: 'var(--good)',
  unclear: 'var(--accent)',
}

export default function MythFact() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {mythFacts.map((m) => (
        <div key={m.claim} className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'baseline', marginBottom: 8 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: verdictColor[m.verdict],
              }}
            >
              {m.verdictLabel}
            </span>
          </div>
          <h3 style={{ fontSize: 16.5, marginBottom: 8, lineHeight: 1.4 }}>„{m.claim}“</h3>
          <p style={{ color: 'var(--ink-secondary)', fontSize: 14.5, lineHeight: 1.6 }}>
            {m.explanation}
          </p>
        </div>
      ))}
    </div>
  )
}
