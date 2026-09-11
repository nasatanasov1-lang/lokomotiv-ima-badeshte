import { useState } from 'react'
import { quizQuestions, visions, type VisionKey } from '../data/quiz'
import SectionHeading from './SectionHeading'

const emptyScores: Record<VisionKey, number> = {
  heritage: 0,
  transparency: 0,
  ambition: 0,
  community: 0,
}

export default function QuizWidget() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState(emptyScores)
  const finished = step >= quizQuestions.length

  function answer(vision: VisionKey) {
    setScores((s) => ({ ...s, [vision]: s[vision] + 1 }))
    setStep((s) => s + 1)
  }

  function restart() {
    setStep(0)
    setScores(emptyScores)
  }

  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1
  const ranked = (Object.keys(scores) as VisionKey[]).sort((a, b) => scores[b] - scores[a])
  const winner = ranked[0]

  return (
    <section id="vizia" className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="А ти какво избираш?"
        title="7 въпроса за бъдещето на клуба"
        description="Без имена, без страни — само въпроси за това какъв Локомотив искаш да видиш."
      />

      <div className="card" style={{ padding: 'clamp(20px, 4vw, 36px)', maxWidth: 640 }}>
        {!finished ? (
          <>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 10, fontWeight: 600 }}>
              Въпрос {step + 1} от {quizQuestions.length}
            </p>
            <h3 style={{ fontSize: 20, marginBottom: 20, lineHeight: 1.4 }}>
              {quizQuestions[step].question}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quizQuestions[step].options.map((opt) => (
                <button
                  key={opt.text}
                  type="button"
                  onClick={() => answer(opt.vision)}
                  style={{
                    textAlign: 'left',
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    color: 'var(--ink)',
                    fontSize: 15,
                    cursor: 'pointer',
                  }}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700, marginBottom: 6 }}>
              {visions[winner].tagline}
            </p>
            <h3 style={{ fontSize: 24, marginBottom: 14 }}>{visions[winner].title}</h3>
            <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
              {visions[winner].description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {ranked.map((key) => (
                <div key={key}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 13.5,
                      color: 'var(--ink-secondary)',
                      marginBottom: 4,
                    }}
                  >
                    <span>{visions[key].title}</span>
                    <span>{Math.round((scores[key] / total) * 100)}%</span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 999,
                      background: 'var(--surface-2)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${(scores[key] / total) * 100}%`,
                        background: 'var(--accent)',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={restart}
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Отговори отново
            </button>
          </>
        )}
      </div>
    </section>
  )
}
