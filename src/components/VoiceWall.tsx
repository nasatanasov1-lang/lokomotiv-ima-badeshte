import SectionHeading from './SectionHeading'
import { voices, voicesIntro, voicesFormNote } from '../data/voices'

export default function VoiceWall() {
  return (
    <section className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading eyebrow="Гласът на Локомотив" title="Какъв Локомотив искаш след 5 години?" description={voicesIntro} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          marginBottom: 20,
        }}
      >
        {voices.map((v) => (
          <blockquote
            key={v.name}
            className="card"
            style={{ padding: 20, margin: 0 }}
          >
            <p style={{ fontSize: 15.5, lineHeight: 1.6, marginBottom: 14 }}>“{v.answer}”</p>
            <footer style={{ fontSize: 13.5, color: 'var(--ink-muted)' }}>
              — {v.name}, {v.role}
            </footer>
          </blockquote>
        ))}
      </div>
      <p style={{ fontSize: 13.5, color: 'var(--ink-muted)' }}>{voicesFormNote}</p>
    </section>
  )
}
