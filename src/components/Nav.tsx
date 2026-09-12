import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import crest from '../assets/lokomotiv-crest.png'

const links = [
  { to: '/', label: 'Начало' },
  { to: '/hronologiya', label: 'Хронология' },
  { to: '/100-godini', label: '100 години' },
  { to: '/v-chisla', label: 'Статистика' },
  { to: '/precedenti', label: 'Правили сме го' },
  { to: '/media', label: 'Медия' },
  { to: '/investitori', label: 'За инвеститори' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--page)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          paddingBlock: 12,
          minHeight: 64,
        }}
      >
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
        >
          <img
            src={crest}
            alt="Емблема на ПФК Локомотив Пловдив"
            width={44}
            height={44}
            style={{ borderRadius: 999, flexShrink: 0, filter: 'brightness(1.18)' }}
          />
          <span
            style={{
              fontWeight: 800,
              fontSize: 19,
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            Локомотив Пловдив
          </span>
        </NavLink>

        <nav
          style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              style={({ isActive }) => ({
                padding: '8px 14px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                color: isActive ? 'var(--accent-ink)' : 'var(--ink-secondary)',
                background: isActive ? 'var(--accent)' : 'transparent',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mobile-nav-toggle"
          aria-label="Меню"
          style={{
            display: 'none',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            borderRadius: 10,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav
          className="container"
          style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 16 }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                padding: '10px 14px',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                color: isActive ? 'var(--accent-ink)' : 'var(--ink-secondary)',
                background: isActive ? 'var(--accent)' : 'var(--surface)',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 1320px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
