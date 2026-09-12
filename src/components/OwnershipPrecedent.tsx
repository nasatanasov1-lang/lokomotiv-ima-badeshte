import SectionHeading from './SectionHeading'
import { ownershipHistory, ownershipHistoryIntro } from '../data/ownershipHistory'

export default function OwnershipPrecedent() {
  return (
    <div>
      <SectionHeading
        eyebrow="У нас, не другаде"
        title="2014: Локомотив вече смени собственик"
        description={ownershipHistoryIntro}
      />
      <div style={{ position: 'relative', paddingLeft: 24, marginBottom: 16 }}>
        <div
          aria-hidden
          style={{ position: 'absolute', left: 5, top: 6, bottom: 6, width: 2, background: 'var(--border)' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {ownershipHistory.map((ev) => (
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
                  background: 'var(--accent)',
                  border: '2px solid var(--page)',
                }}
              />
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>{ev.date}</p>
              <h3 style={{ fontSize: 16.5, marginBottom: 6 }}>{ev.title}</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: 14.5, lineHeight: 1.6, marginBottom: 8 }}>
                {ev.description}
              </p>
              {ev.source && (
                <p style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>
                  Източник:{' '}
                  {ev.sourceUrl ? (
                    <a href={ev.sourceUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--series-blue)' }}>
                      {ev.source}
                    </a>
                  ) : (
                    ev.source
                  )}
                  {ev.needsSource && <span style={{ marginLeft: 8, fontWeight: 700 }}>- чака пълна проверка</span>}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
