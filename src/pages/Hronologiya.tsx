import SectionHeading from '../components/SectionHeading'
import Timeline from '../components/Timeline'
import MythFact from '../components/MythFact'

export default function Hronologiya() {
  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="Как стигнахме дотук"
        title="Хронология на клуба"
        description="Сезони, класирания, треньори, ключови моменти. Всеки факт — с източник или ясно маркиран като чакащ проверка."
      />
      <Timeline />

      <div style={{ height: 64 }} />

      <SectionHeading
        eyebrow="Мит или факт?"
        title="Кое може да се провери"
        description="Не отговаряме пропагандно — показваме какво реално може и не може да се докаже с публично достъпни данни."
      />
      <MythFact />
    </div>
  )
}
