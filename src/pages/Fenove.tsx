import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import { initiatives } from '../data/initiatives'

export default function Fenove() {
  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="Ние"
        title="Да си фен на Локомотив е повече от футбол"
        description="Футболът ни събира, но общността е това, което правим заедно - особено когато е трудно."
      />

      <h3
        style={{
          fontSize: 13,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--ink-muted)',
          marginBottom: 20,
        }}
      >
        Инициативи на феновете
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {initiatives.map((item) => (
          <Link
            key={item.slug}
            to={`/fenove/${item.slug}`}
            className="card"
            style={{ display: 'block', overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}
          >
            {item.photo && (
              <img
                src={item.photo.src}
                alt={item.photo.caption}
                style={{ width: '100%', display: 'block', aspectRatio: '16 / 9', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: 16 }}>
              <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>{item.date}</p>
              <h4 style={{ fontSize: 18, marginBottom: 8 }}>{item.title}</h4>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-secondary)' }}>{item.lead}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
