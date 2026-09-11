import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import crest from '../assets/lokomotiv-crest.png'

export default function Hero() {
  return (
    <section style={{ paddingBlock: 'clamp(48px, 8vw, 96px)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <img
          src={crest}
          alt="Емблема на ПФК Локомотив Пловдив"
          width={104}
          height={104}
          style={{ marginBottom: 24, opacity: 0.85 }}
        />
        <p
          style={{
            display: 'inline-block',
            padding: '6px 14px',
            borderRadius: 999,
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            color: 'var(--ink-secondary)',
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 28,
          }}
        >
          Независима гражданска инициатива на общността
        </p>

        <h1
          style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          Локомотив не е един човек.
          <br />
          <span style={{ color: 'var(--ink-secondary)' }}>
            Собственици идват и си отиват.
          </span>
          <br />
          Локомотив остава.
        </h1>

        <p
          style={{
            fontSize: 'clamp(17px, 2.2vw, 21px)',
            color: 'var(--ink-secondary)',
            maxWidth: 560,
            margin: '0 auto 36px',
          }}
        >
          Не искаме просто промяна. Искаме перспектива.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/hronologiya"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 22px',
              borderRadius: 999,
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Как стигнахме дотук <ArrowRight size={17} />
          </Link>
          <a
            href="#vizia"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 22px',
              borderRadius: 999,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--ink)',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Открий своята визия за Локомотив
          </a>
        </div>
      </div>
    </section>
  )
}
