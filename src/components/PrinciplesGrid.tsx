import SectionHeading from './SectionHeading'
import { principles } from '../data/principles'

export default function PrinciplesGrid() {
  return (
    <section className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="Какво искаме"
        title="Шест нормални принципа"
        description="Не искания срещу конкретен човек, а стандарти, които трябва да важат за всяко бъдещо ръководство на клуба."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {principles.map((p) => (
          <div key={p.title} className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 17, marginBottom: 8 }}>{p.title}</h3>
            <p style={{ color: 'var(--ink-secondary)', fontSize: 14.5, lineHeight: 1.6 }}>
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
