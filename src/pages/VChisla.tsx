import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import StatsCharts from '../components/StatsCharts'

export default function VChisla() {
  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="Статистика"
        title="Данните говорят по-силно от лозунгите"
        description="Класиране и точки по сезони, от шампионската 2004/05 до днес — на едно място, без интерпретация."
      />
      <StatsCharts />

      <div style={{ height: 40 }} />

      <Link
        to="/precedenti"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontWeight: 700,
          color: 'var(--accent)',
          textDecoration: 'none',
        }}
      >
        Вижте „Вече го направихме“ — как Локомотив вече смени собственик <ArrowRight size={16} />
      </Link>
    </div>
  )
}
