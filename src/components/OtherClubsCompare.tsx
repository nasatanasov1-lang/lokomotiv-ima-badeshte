import { otherClubs, otherClubsIntro } from '../data/otherClubs'
import SectionHeading from './SectionHeading'

export default function OtherClubsCompare() {
  return (
    <div>
      <SectionHeading
        eyebrow="Има живот след собственик"
        title="Смяната на собственик не е автоматично край"
        description={otherClubsIntro}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {otherClubs.map((c) => (
          <div key={c.club} className="card" style={{ padding: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', marginBottom: 4 }}>
              {c.country}
            </p>
            <h3 style={{ fontSize: 16.5, marginBottom: 10 }}>{c.club}</h3>
            <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: 10 }}>
              {c.whatHappened}
            </p>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{c.takeaway}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
