import { useState } from 'react'
import { Play } from 'lucide-react'
import type { VideoItem } from '../data/media'

export default function YouTubeEmbed({ video }: { video: VideoItem }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ position: 'relative', aspectRatio: '16 / 9', background: '#000' }}>
        {loaded ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            aria-label={`Пусни видео: ${video.title}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 0,
              padding: 0,
              cursor: 'pointer',
              backgroundImage: `url(https://i3.ytimg.com/vi/${video.videoId}/hqdefault.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.25)',
              }}
            >
              <span
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 999,
                  background: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Play size={26} color="var(--accent-ink)" fill="var(--accent-ink)" style={{ marginLeft: 3 }} />
              </span>
            </span>
          </button>
        )}
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 15, marginBottom: 4, lineHeight: 1.4 }}>{video.title}</h3>
        {video.date && <p style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{video.date}</p>}
        {video.source && (
          <p style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>
            Източник:{' '}
            {video.sourceUrl ? (
              <a href={video.sourceUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--series-blue)' }}>
                {video.source}
              </a>
            ) : (
              video.source
            )}
          </p>
        )}
      </div>
    </div>
  )
}
