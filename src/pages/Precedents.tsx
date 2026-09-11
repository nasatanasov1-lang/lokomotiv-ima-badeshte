import SectionHeading from '../components/SectionHeading'
import OwnershipPrecedent from '../components/OwnershipPrecedent'
import OtherClubsCompare from '../components/OtherClubsCompare'

export default function Precedents() {
  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="Има живот след собственик"
        title="Вече го направихме"
        description="Смяната на собственик не е хипотеза за Локомотив — вече се е случвала. А и не само тук: и други клубове са минавали през същото."
      />
      <OwnershipPrecedent />

      <div style={{ height: 64 }} />

      <OtherClubsCompare />
    </div>
  )
}
