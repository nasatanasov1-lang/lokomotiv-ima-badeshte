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
import { seasonStats, seasonsSource, seasonsCurrentNote } from '../data/seasons'

const axisStyle = { fontSize: 10, fill: 'var(--ink-muted)' }
const xAxisTickProps = {
  angle: -45 as const,
  textAnchor: 'end' as const,
  height: 46,
  interval: 0 as const,
}

export default function StatsCharts() {
  const maxPosition = Math.max(...seasonStats.map((s) => s.leaguePosition)) + 1

  return (
    <div>
      <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 24 }}>
        {seasonsSource} {seasonsCurrentNote}
      </p>

      <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 16, marginBottom: 4 }}>Място в класирането по сезон</h3>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 12 }}>
            По-високо на графиката = по-добро класиране (1 = шампион)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={seasonStats} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="season"
                tick={axisStyle}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={false}
                {...xAxisTickProps}
              />
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
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={seasonStats} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="season"
                tick={axisStyle}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={false}
                {...xAxisTickProps}
              />
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
