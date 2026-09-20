import { Link, Navigate, useParams } from 'react-router-dom'
import { initiatives } from '../data/initiatives'

export default function InitiativeDetail() {
  const { slug } = useParams<{ slug: string }>()
  const item = initiatives.find((i) => i.slug === slug)
  if (!item) return <Navigate to="/fenove" replace />

  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <Link
        to="/fenove"
        style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-secondary)', textDecoration: 'none' }}
      >
        ← Всички инициативи
      </Link>

      <article style={{ marginTop: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>{item.date}</p>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', marginBottom: 20, maxWidth: 720 }}>{item.title}</h2>

        {item.photo && (
          <figure className="card" style={{ margin: '0 0 24px', overflow: 'hidden', maxWidth: 720 }}>
            <img
              src={item.photo.src}
              alt={item.photo.caption}
              style={{ width: '100%', display: 'block', aspectRatio: '925 / 520', objectFit: 'cover' }}
            />
            <figcaption style={{ padding: 12, fontSize: 13, color: 'var(--ink-secondary)' }}>
              {item.photo.caption}
              {item.photo.credit && <span style={{ color: 'var(--ink-muted)' }}> - Снимка: {item.photo.credit}</span>}
            </figcaption>
          </figure>
        )}

        {[item.summary, ...item.body].map((text, i) => (
          <p
            key={i}
            style={{ color: 'var(--ink-secondary)', fontSize: 16, lineHeight: 1.7, maxWidth: 720, marginBottom: 16 }}
          >
            {text}
          </p>
        ))}
      </article>

      <p
        className="card"
        style={{ padding: 20, marginTop: 40, maxWidth: 720, color: 'var(--ink-secondary)', fontSize: 15 }}
      >
        Имате своя фенска история или снимки? Споделете ги - общността е това, което сме направили заедно.
      </p>
    </div>
  )
}
