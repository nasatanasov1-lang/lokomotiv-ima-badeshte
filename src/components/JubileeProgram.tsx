import { jubileeProgram } from '../data/jubilee'

export default function JubileeProgram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {jubileeProgram.map((group) => (
        <div key={group.month}>
          <h3
            style={{
              fontSize: 14,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--accent)',
              marginBottom: 12,
            }}
          >
            {group.month}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {group.items.map((item) => (
              <div key={item.title} className="card" style={{ padding: 18 }}>
                <h4 style={{ fontSize: 15.5, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: 8 }}>
                  {item.description}
                </p>
                {item.needsSource ? (
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: 12,
                      fontWeight: 700,
                      color: 'var(--ink-muted)',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      borderRadius: 999,
                      padding: '3px 10px',
                    }}
                  >
                    {item.source ? 'чака потвърждение' : 'чака точен източник'}
                  </span>
                ) : (
                  item.source && (
                    <p style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>
                      Източник:{' '}
                      {item.sourceUrl ? (
                        <a href={item.sourceUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--series-blue)' }}>
                          {item.source}
                        </a>
                      ) : (
                        item.source
                      )}
                    </p>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
