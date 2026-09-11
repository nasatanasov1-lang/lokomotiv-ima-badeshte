import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { seasonStats, seasonsIsPlaceholder, seasonsSource } from '../data/seasons'

const axisStyle = { fontSize: 12, fill: 'var(--ink-muted)' }

export default function StatsCharts() {
  const maxPosition = Math.max(...seasonStats.map((s) => s.leaguePosition)) + 1

  return (
    <div>
      {seasonsIsPlaceholder && (
        <div
          className="card"
          style={{
            padding: '12px 16px',
            marginBottom: 24,
            borderColor: 'var(--accent)',
            display: 'flex',
            gap: 10,
            alignItems: 'baseline',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            Примерни данни
          </span>
          <span style={{ fontSize: 13.5, color: 'var(--ink-secondary)' }}>
            Числата по-долу са илюстративни, докато редакторите на сайта заменят
            с проверени данни. {seasonsSource}
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 16, marginBottom: 4 }}>Място в класирането по сезон</h3>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 12 }}>
            По-високо на графиката = по-добро класиране (1 = шампион)
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={seasonStats} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="season" tick={axisStyle} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
              <YAxis
                reversed
                domain={[1, maxPosition]}
                tick={axisStyle}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  fontSize: 13,
                }}
                formatter={(value) => [`${value}. място`, 'Класиране']}
              />
              <Line
                type="monotone"
                dataKey="leaguePosition"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--accent)', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 16, marginBottom: 4 }}>Точки по сезон</h3>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 12 }}>
            Общ брой точки в efbet Лига
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={seasonStats} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="season" tick={axisStyle} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={28} />
              <Tooltip
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  fontSize: 13,
                }}
                formatter={(value) => [`${value} точки`, 'Точки']}
              />
              <Bar dataKey="points" fill="var(--series-blue)" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
