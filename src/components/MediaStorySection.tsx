import YouTubeEmbed from './YouTubeEmbed'
import type { MediaStory } from '../data/media'

export default function MediaStorySection({ story }: { story: MediaStory }) {
  return (
    <section style={{ marginBottom: 8 }}>
      {story.date && (
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 6 }}>{story.date}</p>
      )}
      <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', marginBottom: 12 }}>{story.title}</h2>
      <p style={{ color: 'var(--ink-secondary)', fontSize: 15, lineHeight: 1.65, maxWidth: 720, marginBottom: 24 }}>
        {story.summary}
      </p>

      {story.videos.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            marginBottom: story.photos.length > 0 ? 24 : 0,
          }}
        >
          {story.videos.map((v) => (
            <YouTubeEmbed key={v.videoId} video={v} />
          ))}
        </div>
      )}

      {story.photos.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {story.photos.map((p) => (
            <figure key={p.src} className="card" style={{ margin: 0, overflow: 'hidden' }}>
              <img
                src={p.src}
                alt={p.caption}
                style={{ width: '100%', display: 'block', aspectRatio: '4 / 3', objectFit: 'cover' }}
              />
              <figcaption style={{ padding: 12, fontSize: 13, color: 'var(--ink-secondary)' }}>
                {p.caption}
                {p.credit && <span style={{ color: 'var(--ink-muted)' }}> — {p.credit}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {story.videos.length === 0 && story.photos.length === 0 && (
        <p className="card" style={{ padding: 20, color: 'var(--ink-muted)', fontSize: 14 }}>
          Все още няма добавени снимки или видеа тук.
        </p>
      )}
    </section>
  )
}
