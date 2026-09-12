import { Link, useParams } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import MediaStorySection from '../components/MediaStorySection'
import { mediaStories } from '../data/media'

export default function Media() {
  const { slug } = useParams<{ slug?: string }>()
  const activeSlug = slug ?? mediaStories[0]?.slug
  const activeStory = mediaStories.find((s) => s.slug === activeSlug) ?? mediaStories[0]

  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="Медия"
        title="Локомотив в снимки и видео"
        description="Визуалният разказ, история по история — от юбилея до трибуните."
      />

      {mediaStories.length > 1 && (
        <nav
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 40,
            paddingBottom: 16,
            borderBottom: '1px solid var(--border)',
          }}
        >
          {mediaStories.map((s) => {
            const isActive = s.slug === activeStory?.slug
            return (
              <Link
                key={s.slug}
                to={`/media/${s.slug}`}
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  fontSize: 13.5,
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent-ink)' : 'var(--ink-secondary)',
                  background: isActive ? 'var(--accent)' : 'var(--surface)',
                  border: isActive ? 'none' : '1px solid var(--border)',
                }}
              >
                {s.date}
              </Link>
            )
          })}
        </nav>
      )}

      {activeStory ? (
        <MediaStorySection story={activeStory} />
      ) : (
        <p className="card" style={{ padding: 20, color: 'var(--ink-muted)', fontSize: 14 }}>
          Все още няма добавени истории тук.
        </p>
      )}
    </div>
  )
}
