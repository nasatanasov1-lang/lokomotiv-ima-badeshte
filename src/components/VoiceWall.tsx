import { useEffect, useState } from 'react'
import SectionHeading from './SectionHeading'
import VoiceSubmitForm from './VoiceSubmitForm'
import { voices as exampleVoices, voicesIntro } from '../data/voices'

type ApiVoice = { id: number; name: string; role: string; answer: string }

export default function VoiceWall() {
  const [apiVoices, setApiVoices] = useState<ApiVoice[] | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/voices')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { voices: ApiVoice[] }) => {
        if (!cancelled) setApiVoices(data.voices)
      })
      .catch(() => {
        if (!cancelled) setApiVoices(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Докато няма истински одобрени отговори (или API-то още не е свързано),
  // показваме примерните илюстративни отговори вместо празно пространство.
  const displayed: { key: string; name: string; role: string; answer: string }[] =
    apiVoices && apiVoices.length > 0
      ? apiVoices.map((v) => ({ key: String(v.id), name: v.name, role: v.role, answer: v.answer }))
      : exampleVoices.map((v) => ({ key: v.name, name: v.name, role: v.role, answer: v.answer }))

  return (
    <section className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading eyebrow="Гласът на Локомотив" title="Какъв Локомотив искаш след 5 години?" description={voicesIntro} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}
      >
        {displayed.map((v) => (
          <blockquote key={v.key} className="card" style={{ padding: 20, margin: 0, minWidth: 0 }}>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, marginBottom: 14, overflowWrap: 'anywhere' }}>
              &ldquo;{v.answer}&rdquo;
            </p>
            <footer style={{ fontSize: 13.5, color: 'var(--ink-muted)' }}>
              - {v.name}, {v.role}
            </footer>
          </blockquote>
        ))}
      </div>

      <div style={{ maxWidth: 480 }}>
        <VoiceSubmitForm />
      </div>
    </section>
  )
}
