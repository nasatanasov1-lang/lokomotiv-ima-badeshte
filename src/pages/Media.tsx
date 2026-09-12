import SectionHeading from '../components/SectionHeading'
import MediaGallery from '../components/MediaGallery'

export default function Media() {
  return (
    <div className="container" style={{ paddingBlock: 56 }}>
      <SectionHeading
        eyebrow="Медия"
        title="Локомотив в снимки и видео"
        description="Визуалният разказ — от юбилея до трибуните."
      />
      <MediaGallery />
    </div>
  )
}
