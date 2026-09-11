export type SeasonStat = {
  season: string
  /** Място в класирането в efbet Лига (1 = шампион) */
  leaguePosition: number
  points: number
}

/**
 * ⚠️ ПРИМЕРНИ ДАННИ.
 * Стойностите по-долу са илюстративни placeholder-и, за да покажат как ще
 * изглежда графиката. ПРЕДИ да качите сайта на живо с претенция за реални
 * данни, заменете тези числа с проверени такива от официалната статистика
 * на Българския футболен съюз / efbet Лига и добавете линк към източника
 * в `seasonsSource`.
 */
export const seasonStats: SeasonStat[] = [
  { season: '2018/19', leaguePosition: 7, points: 38 },
  { season: '2019/20', leaguePosition: 9, points: 33 },
  { season: '2020/21', leaguePosition: 6, points: 41 },
  { season: '2021/22', leaguePosition: 8, points: 36 },
  { season: '2022/23', leaguePosition: 10, points: 30 },
  { season: '2023/24', leaguePosition: 9, points: 34 },
  { season: '2024/25', leaguePosition: 8, points: 37 },
]

export const seasonsIsPlaceholder = true

export const seasonsSource =
  'Източник: [ДА СЕ ДОБАВИ] — официална статистика на БФС / efbet Лига за всеки сезон.'
