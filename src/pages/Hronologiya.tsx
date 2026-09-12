import SectionHeading from '../components/SectionHeading'
import Timeline from '../components/Timeline'
import FanStatements from '../components/FanStatements'
import OwnerStatements from '../components/OwnerStatements'
import MythFact from '../components/MythFact'

export default function Hronologiya() {
  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="Как стигнахме дотук"
        title="Хронология на клуба"
        description="Сезони, класирания, треньори, ключови моменти."
      />
      <Timeline />

      <div style={{ height: 64 }} />

      <FanStatements />

      <div style={{ height: 64 }} />

      <OwnerStatements />

      <div style={{ height: 64 }} />

      <SectionHeading
        eyebrow="Мит или факт?"
        title="Кое може да се провери"
        description="Не отговаряме пропагандно - показваме какво реално може и не може да се докаже с публично достъпни данни."
      />
      <MythFact />
    </div>
  )
}
