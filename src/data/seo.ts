import { initiatives } from './initiatives'
import { mediaStories } from './media'

/**
 * Метаданни за превюто при споделяне (Facebook/Viber/Messenger/Twitter) и за
 * заглавието в раздела на браузъра. Този файл се импортира и от Cloudflare
 * Worker-а (worker/index.ts), затова НЕ трябва да съдържа import на
 * картинки или на друго, което не е чиста TS/JS логика - иначе билдът на
 * worker-а се чупи.
 */

export type SeoEntry = {
  title: string
  description: string
  /** Абсолютен адрес на картинката (може да е и хотлинк към чужд сървър, напр. YouTube). */
  image: string
  type?: 'article' | 'website'
}

export const SITE_URL = 'https://lokomotiv-plovdiv.com'
export const SITE_NAME = 'Локомотив Пловдив'

export const DEFAULT_SEO: SeoEntry = {
  title: SITE_NAME,
  description:
    'Локомотив Пловдив — независима гражданска платформа на феновете за устойчиво управление, прозрачност и перспектива пред клуба.',
  image: `${SITE_URL}/og/default.png`,
}

function absolute(src: string): string {
  return src.startsWith('http') ? src : `${SITE_URL}${src}`
}

function youtubeThumb(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

const STATIC_PAGES: Record<string, SeoEntry> = {
  '/': DEFAULT_SEO,
  '/fenove': {
    title: `Ние — ${SITE_NAME}`,
    description:
      'Инициативите на феновете и общността на Локомотив — от доброволчеството по време на Ковид до протестите на „Лаута“.',
    image: DEFAULT_SEO.image,
  },
  '/media': {
    title: `Паметни моменти — ${SITE_NAME}`,
    description: 'Визуалният разказ на Локомотив в снимки и видео — от финала през 2019 г. до 100-годишнината на клуба.',
    image: DEFAULT_SEO.image,
  },
  '/hronologiya': {
    title: `Хронология — ${SITE_NAME}`,
    description: 'Историята на Локомотив Пловдив година по година.',
    image: DEFAULT_SEO.image,
  },
  '/100-godini': {
    title: `100 години Локомотив — ${SITE_NAME}`,
    description: 'Юбилейната 2026 г. на Локомотив Пловдив.',
    image: DEFAULT_SEO.image,
  },
  '/precedenti': {
    title: `Правили сме го — ${SITE_NAME}`,
    description:
      'Смяната на собственик не е хипотеза за Локомотив — вече се е случвала. А и не само тук: и други клубове са минавали през същото.',
    image: DEFAULT_SEO.image,
  },
  '/investitori': {
    title: `За инвеститори — ${SITE_NAME}`,
    description: DEFAULT_SEO.description,
    image: DEFAULT_SEO.image,
  },
  '/v-chisla': {
    title: `Локомотив в числа — ${SITE_NAME}`,
    description: DEFAULT_SEO.description,
    image: DEFAULT_SEO.image,
  },
}

function initiativeSeo(): Record<string, SeoEntry> {
  const map: Record<string, SeoEntry> = {}
  for (const item of initiatives) {
    const image = item.photo
      ? absolute(item.photo.src)
      : item.videos?.[0]
        ? youtubeThumb(item.videos[0].videoId)
        : DEFAULT_SEO.image
    map[`/fenove/${item.slug}`] = {
      title: `${item.title} — ${SITE_NAME}`,
      description: item.lead,
      image,
      type: 'article',
    }
  }
  return map
}

function mediaSeo(): Record<string, SeoEntry> {
  const map: Record<string, SeoEntry> = {}
  for (const story of mediaStories) {
    const image = story.photos[0]
      ? absolute(story.photos[0].src)
      : story.videos[0]
        ? youtubeThumb(story.videos[0].videoId)
        : DEFAULT_SEO.image
    map[`/media/${story.slug}`] = {
      title: `${story.title} — ${SITE_NAME}`,
      description: story.summary.length > 200 ? `${story.summary.slice(0, 197)}...` : story.summary,
      image,
      type: 'article',
    }
  }
  return map
}

const REGISTRY: Record<string, SeoEntry> = {
  ...STATIC_PAGES,
  ...initiativeSeo(),
  ...mediaSeo(),
}

export function getSeo(pathname: string): SeoEntry {
  return REGISTRY[pathname] ?? DEFAULT_SEO
}
