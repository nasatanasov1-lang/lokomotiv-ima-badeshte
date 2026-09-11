import { timeline, timelineNote, trophies } from '../data/timeline'

export default function Timeline() {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
          marginBottom: 40,
        }}
      >
        {trophies.map((t) => (
          <div key={t.season + t.title} className="card" style={{ padding: '14px 16px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
              {t.season}
            </p>
            <p style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 2 }}>{t.title}</p>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{t.detail}</p>
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', paddingLeft: 24 }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 5,
            top: 6,
            bottom: 6,
            width: 2,
            background: 'var(--border)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {timeline.map((ev) => (
            <div key={ev.title} style={{ position: 'relative' }}>
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  left: -24 + 1,
                  top: 5,
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: ev.needsSource ? 'var(--surface-2)' : 'var(--accent)',
                  border: '2px solid var(--page)',
                  outline: `1px solid ${ev.needsSource ? 'var(--border)' : 'var(--accent)'}`,
                }}
              />
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
                {ev.date}
              </p>
              <h3 style={{ fontSize: 17, marginBottom: 6 }}>{ev.title}</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: 15, lineHeight: 1.6, marginBottom: 8 }}>
                {ev.description}
              </p>
              {ev.needsSource ? (
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
                  чака точен източник
                </span>
              ) : (
                <p style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>
                  Източник: {ev.sourceUrl ? (
                    <a href={ev.sourceUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--series-blue)' }}>
                      {ev.source}
                    </a>
                  ) : (
                    ev.source
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <p style={{ marginTop: 32, fontSize: 13.5, color: 'var(--ink-muted)' }}>{timelineNote}</p>
    </div>
  )
}
