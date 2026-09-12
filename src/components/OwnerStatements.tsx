import SectionHeading from './SectionHeading'
import { ownerStatements, ownerStatementsIntro } from '../data/ownerStatements'

export default function OwnerStatements() {
  return (
    <div>
      <SectionHeading
        eyebrow="Причината да стигнем до тук"
        title="Изказвания, които говорят сами за себе си"
        description={ownerStatementsIntro}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {ownerStatements.map((s) => (
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
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--series-blue)' }}>
                Христо Крушарски
              </span>
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
