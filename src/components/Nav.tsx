import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Начало' },
  { to: '/hronologiya', label: 'Хронология' },
  { to: '/100-godini', label: '100 години' },
  { to: '/v-chisla', label: 'В числа' },
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
          height: 64,
        }}
      >
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
        >
          <span
            aria-hidden
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: 'var(--accent)',
              flexShrink: 0,
            }}
          />
          <span style={{ fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            Локомотив има бъдеще
          </span>
        </NavLink>

        <nav
          style={{ display: 'flex', gap: 4 }}
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
        @media (max-width: 720px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
