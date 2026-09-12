import MediaStorySection from './MediaStorySection'
import { mediaStories } from '../data/media'

export default function MediaGallery() {
  if (mediaStories.length === 0) {
    return (
      <p className="card" style={{ padding: 20, color: 'var(--ink-muted)', fontSize: 14 }}>
        Все още няма добавени истории тук.
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {mediaStories.map((story, i) => (
        <div key={story.slug}>
          <MediaStorySection story={story} />
          {i < mediaStories.length - 1 && (
            <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '40px 0' }} />
          )}
        </div>
      ))}
    </div>
  )
}
