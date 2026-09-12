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

/**
 * ДОБАВЯНЕ НА ВИДЕО:
 * { videoId: 'dQw4w9WgXcQ', title: 'Заглавие', date: '...', source: '...', sourceUrl: '...' }
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
export const videos: VideoItem[] = []

export const photos: PhotoItem[] = []
