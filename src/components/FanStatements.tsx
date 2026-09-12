import SectionHeading from './SectionHeading'
import { fanStatements, fanStatementsIntro } from '../data/fanStatements'

export default function FanStatements() {
  return (
    <div>
      <SectionHeading
        eyebrow="Позиции на феновете през годините"
        title="Какво са казвали фенските организации"
        description={fanStatementsIntro}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {fanStatements.map((s) => (
          <div key={s.title} className="card" style={{ padding: 20 }}>
            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>{s.organization}</span>
              <span style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{s.date}</span>
            </div>
            <h3 style={{ fontSize: 16.5, marginBottom: 8, lineHeight: 1.4 }}>{s.title}</h3>
            <p style={{ color: 'var(--ink-secondary)', fontSize: 14.5, lineHeight: 1.6, marginBottom: 10 }}>
              {s.description}
            </p>
            <p style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>
              Източник:{' '}
              <a href={s.sourceUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--series-blue)' }}>
                {s.source}
              </a>
              {s.needsSource && <span style={{ marginLeft: 8, fontWeight: 700 }}>- чака пълна проверка</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
