import SectionHeading from '../components/SectionHeading'
import StatsCharts from '../components/StatsCharts'
import OwnershipPrecedent from '../components/OwnershipPrecedent'
import OtherClubsCompare from '../components/OtherClubsCompare'

export default function VChisla() {
  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="Локомотив в числа"
        title="Данните говорят по-силно от лозунгите"
        description="Класиране, точки и още показатели по сезони — на едно място, без интерпретация."
      />
      <StatsCharts />

      <div style={{ height: 64 }} />

      <OwnershipPrecedent />

      <div style={{ height: 64 }} />

      <OtherClubsCompare />
    </div>
  )
}
