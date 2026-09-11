export type SeasonStat = {
  season: string
  /** Място в класирането в efbet Лига / А група (1 = шампион) */
  leaguePosition: number
  points: number
}

/**
 * Данни от a-pfg.com (специализиран архив за българското първенство),
 * кръстосано проверени с Уикипедия за сезон 2020/21 (вицешампион, 61 точки)
 * и сезон 2019/20 (вицешампион) — съвпадат. Сезон 2026/27 е текущият,
 * все още в ход към момента на писане (затова изглежда с малко точки).
 */
export const seasonStats: SeasonStat[] = [
  { season: '03/04', leaguePosition: 1, points: 75 },
  { season: '04/05', leaguePosition: 3, points: 58 },
  { season: '05/06', leaguePosition: 5, points: 40 },
  { season: '06/07', leaguePosition: 7, points: 43 },
  { season: '07/08', leaguePosition: 9, points: 43 },
  { season: '08/09', leaguePosition: 6, points: 43 },
  { season: '09/10', leaguePosition: 12, points: 33 },
  { season: '10/11', leaguePosition: 5, points: 52 },
  { season: '11/12', leaguePosition: 6, points: 57 },
  { season: '12/13', leaguePosition: 9, points: 39 },
  { season: '13/14', leaguePosition: 7, points: 50 },
  { season: '14/15', leaguePosition: 10, points: 32 },
  { season: '15/16', leaguePosition: 5, points: 49 },
  { season: '16/17', leaguePosition: 5, points: 52 },
  { season: '17/18', leaguePosition: 12, points: 37 },
  { season: '18/19', leaguePosition: 12, points: 38 },
  { season: '19/20', leaguePosition: 2, points: 50 },
  { season: '20/21', leaguePosition: 2, points: 61 },
  { season: '21/22', leaguePosition: 9, points: 38 },
  { season: '22/23', leaguePosition: 6, points: 53 },
  { season: '23/24', leaguePosition: 5, points: 58 },
  { season: '24/25', leaguePosition: 13, points: 20 },
  { season: '25/26', leaguePosition: 5, points: 55 },
]

export const seasonsIsPlaceholder = false

export const seasonsSource = 'Източник: a-pfg.com — архив на класиранията в efbet Лига / А група.'

export const seasonsCurrentNote =
  'Сезон 2026/27 не е включен в графиките — той е в ход към момента на писане и данните за него все още се променят от кръг на кръг.'
