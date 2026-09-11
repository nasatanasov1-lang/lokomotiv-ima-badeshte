import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'

type Lang = 'bg' | 'en'

const content = {
  bg: {
    eyebrow: 'За инвеститори',
    title: 'Заинтересовани от бъдещето на Локомотив Пловдив?',
    intro:
      'Феновете не могат и не искат да продават клуба — той не е тяхна собственост. Но общността може да бъде мост между сериозен интерес и реалността на клуба.',
    quote: '„Не търсим купувач за клуба. Говорим с всеки, който се интересува от бъдещето му.“',
    points: [
      {
        title: 'История',
        text: 'Клуб с корени от 1926 г., една национална титла (2004) и силна футболна традиция в Пловдив.',
      },
      {
        title: 'Публика',
        text: 'Пловдив е вторият по големина град в България с дългогодишна футболна култура и лоялна фен база.',
      },
      {
        title: 'Стадион и град',
        text: 'Собствен стадион в сърцето на града от 1982 г., в бързо развиваща се икономическа зона.',
      },
      {
        title: 'Школа',
        text: 'Действаща юношеска школа с потенциал за дългосрочна инвестиция в развитието на млади играчи.',
      },
    ],
    contactTitle: 'Разговор с общността',
    contactText:
      'Ако представлявате инвеститор или организация с реален интерес към дългосрочното развитие на клуба, свържете се с легитимното фенско сдружение чрез каналите по-долу.',
    contactCta: 'Пишете ни',
  },
  en: {
    eyebrow: 'For investors',
    title: 'Interested in the future of Lokomotiv Plovdiv?',
    intro:
      'Fans cannot and do not want to sell the club — it is not theirs to sell. But the community can be a bridge between serious interest and the club\'s reality.',
    quote: '"We are not looking for a buyer for the club. We talk to anyone genuinely interested in its future."',
    points: [
      {
        title: 'History',
        text: 'A club with roots going back to 1926, one national title (2004), and a strong football tradition in Plovdiv.',
      },
      {
        title: 'Fan base',
        text: "Plovdiv is Bulgaria's second-largest city, with a long football culture and a loyal fan base.",
      },
      {
        title: 'Stadium & city',
        text: 'Own stadium in the heart of the city since 1982, located in a fast-developing economic area.',
      },
      {
        title: 'Academy',
        text: 'An active youth academy with potential for long-term investment in developing young players.',
      },
    ],
    contactTitle: 'Talk to the community',
    contactText:
      "If you represent an investor or organisation with genuine interest in the club's long-term development, reach out to the legitimate fan association through the channels below.",
    contactCta: 'Get in touch',
  },
} as const

export default function Investitori() {
  const [lang, setLang] = useState<Lang>('bg')
  const c = content[lang]

  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <div
          className="card"
          style={{ display: 'flex', padding: 4, gap: 4, borderRadius: 999 }}
        >
          {(['bg', 'en'] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                border: 'none',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                background: lang === l ? 'var(--accent)' : 'transparent',
                color: lang === l ? 'var(--accent-ink)' : 'var(--ink-secondary)',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <SectionHeading eyebrow={c.eyebrow} title={c.title} description={c.intro} />

      <p
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: 'var(--ink)',
          borderLeft: '3px solid var(--accent)',
          paddingLeft: 16,
          marginBottom: 40,
        }}
      >
        {c.quote}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 48,
        }}
      >
        {c.points.map((p) => (
          <div key={p.title} className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 16.5, marginBottom: 8 }}>{p.title}</h3>
            <p style={{ fontSize: 14.5, color: 'var(--ink-secondary)', lineHeight: 1.6 }}>{p.text}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 28 }}>
        <h3 style={{ fontSize: 18, marginBottom: 10 }}>{c.contactTitle}</h3>
        <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: 18 }}>{c.contactText}</p>
        {/* TODO: замени с реален имейл/канал на легитимното фенско сдружение */}
        <a
          href="mailto:info@lokomotiv-ima-badeshte.bg"
          style={{
            display: 'inline-block',
            padding: '12px 20px',
            borderRadius: 999,
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          {c.contactCta}
        </a>
      </div>
    </div>
  )
}
