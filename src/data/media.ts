export type VideoItem = {
  /** ID-то от YouTube линка, напр. https://www.youtube.com/watch?v=XXXXXXXXXXX -> "XXXXXXXXXXX" */
  videoId: string
  title: string
  date?: string
  source?: string
  sourceUrl?: string
}

export type PhotoItem = {
  /** Локален import (виж пример в коментара по-долу) */
  src: string
  caption: string
  credit?: string
}

export type MediaStory = {
  slug: string
  date: string
  title: string
  summary: string
  videos: VideoItem[]
  photos: PhotoItem[]
}

/**
 * ДОБАВЯНЕ НА НОВА ИСТОРИЯ:
 * копирай обект по образец, дай уникален slug.
 *
 * ДОБАВЯНЕ НА ВИДЕО В ИСТОРИЯ:
 * { videoId: 'dQw4w9WgXcQ', title: 'Заглавие', source: '...', sourceUrl: '...' }
 *
 * ДОБАВЯНЕ НА СНИМКА:
 * 1. Сложи файла в src/assets/media/
 * 2. import photo1 from '../assets/media/photo1.jpg' най-горе в този файл
 * 3. { src: photo1, caption: '...', credit: '...' }
 *
 * ВАЖНО: снимки от чужди сайтове/медии не се копират тук без разрешение —
 * или лично заснети от фенове (с тяхно съгласие), или официално споделени
 * с разрешение за преразпространение, или Creative Commons с коректен credit.
 */
export const mediaStories: MediaStory[] = [
  {
    slug: 'final-2019',
    date: '15 май 2019',
    title: 'Финалът срещу Ботев — първата купа на Локомотив',
    summary:
      'На финала за Купата на България на Националния стадион „Васил Левски“, пред над 16 000 продадени билета, Локомотив побеждава градския съперник Ботев Пловдив с 1:0. Ален Ожболт вкарва с пета в 73-тата минута — гол, остал в историята на клуба. За Локомотив това е първата спечелена Купа на България в неговата история, докато Ботев е играл финал за четвърти път. По повод дербито на един стадион, футболистите на двата пловдивски отбора излизат със специални съвместни фланелки в знак на градско единство.',
    videos: [
      {
        videoId: 'fwQaxyyGoT8',
        title: 'Купа България финал: Ботев – Локомотив Пловдив 0:1, гол Ожболт',
        source: 'YouTube',
        sourceUrl: 'https://www.youtube.com/watch?v=fwQaxyyGoT8',
      },
      {
        videoId: '67OXEd-yPaQ',
        title: 'Уникалната радост на феновете при гола на Ожболт',
        source: 'YouTube',
        sourceUrl: 'https://www.youtube.com/watch?v=67OXEd-yPaQ',
      },
    ],
    photos: [],
  },
]
