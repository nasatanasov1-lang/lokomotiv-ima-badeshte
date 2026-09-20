import SectionHeading from '../components/SectionHeading'
import { initiatives } from '../data/initiatives'

export default function Fenove() {
  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="Фенове"
        title="Локомотив е повече от футбол"
        description="Клубът е силен, защото има кой да го обича - на трибуните и извън тях."
      />

      <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-muted)', marginBottom: 24 }}>
        Инициативи
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
        {initiatives.map((item) => (
          <article key={item.slug} id={item.slug}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>{item.date}</p>
            <h4 style={{ fontSize: 'clamp(20px, 3vw, 26px)', marginBottom: 16 }}>{item.title}</h4>

            {item.photo && (
              <figure className="card" style={{ margin: '0 0 20px', overflow: 'hidden', maxWidth: 720 }}>
                <img
                  src={item.photo.src}
                  alt={item.photo.caption}
                  style={{ width: '100%', display: 'block', aspectRatio: '925 / 520', objectFit: 'cover' }}
                />
                <figcaption style={{ padding: 12, fontSize: 13, color: 'var(--ink-secondary)' }}>
                  {item.photo.caption}
                  {item.photo.credit && (
                    <span style={{ color: 'var(--ink-muted)' }}> - Снимка: {item.photo.credit}</span>
                  )}
                </figcaption>
              </figure>
            )}

            {[item.summary, ...item.body].map((text, i) => (
              <p
                key={i}
                style={{
                  color: 'var(--ink-secondary)',
                  fontSize: 15,
                  lineHeight: 1.65,
                  maxWidth: 720,
                  marginBottom: 14,
                }}
              >
                {text}
              </p>
            ))}
          </article>
        ))}
      </div>
    </div>
  )
}
