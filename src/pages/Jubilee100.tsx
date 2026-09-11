import SectionHeading from '../components/SectionHeading'
import JubileeProgram from '../components/JubileeProgram'
import JubileeQuotes from '../components/JubileeQuotes'
import JubileeDonate from '../components/JubileeDonate'
import { jubileeIntro } from '../data/jubilee'

export default function Jubilee100() {
  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading eyebrow="1926 — 2026" title="100 години Локомотив Пловдив" description={jubileeIntro} />

      <div
        className="jubilee-grid"
        style={{
          display: 'grid',
          gap: 40,
          gridTemplateColumns: 'minmax(0, 2fr) minmax(240px, 1fr)',
          alignItems: 'start',
        }}
      >
        <JubileeProgram />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 84 }}>
          <JubileeDonate />
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, marginBottom: 8 }}>Успоредно с празника</h3>
            <p style={{ fontSize: 13.5, color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              Юбилейната 2026 г. съвпада и с публично недоволство на част от феновете от управлението на
              клуба. Виж пълната хронология на този разговор в „Как стигнахме дотук“.
            </p>
          </div>
        </div>
      </div>

      <div style={{ height: 56 }} />

      <SectionHeading
        eyebrow="Официални послания"
        title="Какво казаха за 100-те години"
        description="Пълният текст на видеообръщението не е публично достъпен в писмена форма — представяме го обобщено, отделно от точните цитати от свързани изявления."
      />
      <JubileeQuotes />

      <style>{`
        @media (max-width: 860px) {
          .jubilee-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
