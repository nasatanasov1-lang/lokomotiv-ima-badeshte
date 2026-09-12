import SectionHeading from './SectionHeading'
import YouTubeEmbed from './YouTubeEmbed'
import { videos, photos } from '../data/media'

export default function MediaGallery() {
  return (
    <div>
      <SectionHeading
        eyebrow="Видеа"
        title="От трибуните и клуба"
        description="Записи, свързани с историята, юбилея и настоящите събития около Локомотив."
      />
      {videos.length === 0 ? (
        <p className="card" style={{ padding: 20, color: 'var(--ink-muted)', fontSize: 14 }}>
          Все още няма добавени видеа тук.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {videos.map((v) => (
            <YouTubeEmbed key={v.videoId} video={v} />
          ))}
        </div>
      )}

      <div style={{ height: 56 }} />

      <SectionHeading eyebrow="Снимки" title="Моменти" />
      {photos.length === 0 ? (
        <p className="card" style={{ padding: 20, color: 'var(--ink-muted)', fontSize: 14 }}>
          Все още няма добавени снимки тук.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {photos.map((p) => (
            <figure key={p.src} className="card" style={{ margin: 0, overflow: 'hidden' }}>
              <img src={p.src} alt={p.caption} style={{ width: '100%', display: 'block', aspectRatio: '4 / 3', objectFit: 'cover' }} />
              <figcaption style={{ padding: 12, fontSize: 13, color: 'var(--ink-secondary)' }}>
                {p.caption}
                {p.credit && <span style={{ color: 'var(--ink-muted)' }}> — {p.credit}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
