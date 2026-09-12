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
  /** За конкретно събитие, напр. "15 май 2019". Празно за постоянни колекции (напр. "Хорео"). */
  date?: string
  /** Текст за таба в подменюто — по подразбиране е `date`, ако не е зададен изрично. */
  navLabel?: string
  title: string
  summary: string
  videos: VideoItem[]
  photos: PhotoItem[]
}

/**
 * ДОБАВЯНЕ НА НОВА ИСТОРИЯ:
 * копирай обект по образец, дай уникален slug, добави го В КРАЯ на масива —
 * първата история (final-2019) е водеща/по подразбиране в /media и трябва
 * да остане на позиция 0, освен ако изрично не се поиска друго.
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
      'На финала за Купата на България на Националния стадион „Васил Левски“, пред над 16 000 зрители, Локомотив побеждава градския съперник Ботев Пловдив с 1:0. Ален Ожболт вкарва с пета в 73-тата минута — гол, останал в историята на клуба. За Локомотив това е първата спечелена Купа на България в историята на клуба, докато Ботев играе финал за четвърти път. По повод пловдивското дерби на националния стадион футболистите на двата отбора излизат със специални съвместни фланелки в знак на градско единство.',
    videos: [
      {
        videoId: 'fwQaxyyGoT8',
        title: 'Купа България финал: Ботев – Локомотив Пловдив 0:1, гол Ожболт',
        source: 'LOKOMANIA_1926_PLOVDIV',
        sourceUrl: 'https://www.youtube.com/@Plovdiv_1926',
      },
      {
        videoId: '67OXEd-yPaQ',
        title: 'Уникалната радост на феновете при гола на Ожболт',
        source: 'LOKOMANIA_1926_PLOVDIV',
        sourceUrl: 'https://www.youtube.com/@Plovdiv_1926',
      },
      {
        videoId: 'GsgcHXYYOxg',
        title: 'Пътят на Локомотив до най-ценната купа в историята на пловдивския футбол',
        source: 'LOKOMANIA_1926_PLOVDIV',
        sourceUrl: 'https://www.youtube.com/@Plovdiv_1926',
      },
      {
        videoId: 'cuWplNgypeI',
        title: '15.05 — Купата е наша за вечността',
        source: 'LOKOMANIA_1926_PLOVDIV',
        sourceUrl: 'https://www.youtube.com/@Plovdiv_1926',
      },
      {
        videoId: 'hw8vWUqvyfE',
        title: 'Пловдив ликува — купата е черно-бяла',
        source: 'LOKOMANIA_1926_PLOVDIV',
        sourceUrl: 'https://www.youtube.com/@Plovdiv_1926',
      },
      {
        videoId: '9Z2LsmtAXmM',
        title: 'Анте я подаде, Ожболт я вкара, купата е наша и жълта тишина…',
        source: 'LOKOMANIA_1926_PLOVDIV',
        sourceUrl: 'https://www.youtube.com/@Plovdiv_1926',
      },
    ],
    photos: [],
  },
  {
    slug: 'horeo',
    navLabel: 'Хорео',
    title: 'Хорео',
    summary:
      'Хореографиите на трибуните са част от визуалната идентичност на локомотивската общност — тук събираме снимки и видеа от различни поводи през годините.',
    videos: [
      {
        videoId: 'dpI6RAYVt40',
        title: 'PlovdivDerbyTV: Хореографията на Лаута в мача със Спартак Търнава',
        source: 'PlovdivDerby.com',
        sourceUrl: 'https://www.youtube.com/@PlovdivDerby',
      },
      {
        videoId: 'aeJfkeu16Yk',
        title: 'Вижте втората хореография на феновете на Локомотив за дербито',
        source: 'Redaktor Trafficnews',
        sourceUrl: 'https://www.youtube.com/@redaktortrafficnews2086',
      },
    ],
    photos: [],
  },
  {
    slug: 'jubilee-100',
    navLabel: '100 години',
    title: '100 години Локомотив',
    summary:
      'Визуалният разказ за юбилейната 2026 г. — концертът на Античния театър, юбилейните екипи и празненствата по случай стогодишнината на клуба. Пълната програма по месеци и официалните послания са на отделната страница „100 години“.',
    videos: [],
    photos: [],
  },
]
