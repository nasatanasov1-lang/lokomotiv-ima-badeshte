import { jubileeQuotes, videoMessageSummary } from '../data/jubilee'

export default function JubileeQuotes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="card" style={{ padding: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', marginBottom: 6 }}>
          {videoMessageSummary.date} - {videoMessageSummary.from}
        </p>
        <p style={{ fontSize: 14.5, color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
          Пълният текст на видеото не е публично достъпен в писмена форма. Медиите обобщават посланието в
          три ключови мисли:
        </p>
        <ul style={{ margin: '0 0 12px', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {videoMessageSummary.keyPoints.map((p) => (
            <li key={p} style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              {p}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 14.5, fontStyle: 'italic', color: 'var(--ink)' }}>
          {videoMessageSummary.paraphrasedLine}
        </p>
      </div>

      {jubileeQuotes.map((q) => (
        <blockquote key={q.from} className="card" style={{ padding: 20, margin: 0 }}>
          <p style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 10 }}>“{q.text}”</p>
          <footer style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
            - {q.from}
            {q.needsSource && (
              <span
                style={{
                  marginLeft: 8,
                  fontWeight: 700,
                  fontSize: 11.5,
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                чака точен линк
              </span>
            )}
          </footer>
        </blockquote>
      ))}
    </div>
  )
}
