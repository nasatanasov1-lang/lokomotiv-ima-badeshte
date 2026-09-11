export type VisionKey = 'heritage' | 'transparency' | 'ambition' | 'community'

export type QuizOption = {
  text: string
  vision: VisionKey
}

export type QuizQuestion = {
  question: string
  options: QuizOption[]
}

export const visions: Record<
  VisionKey,
  { title: string; tagline: string; description: string }
> = {
  heritage: {
    title: 'Локомотив на корена',
    tagline: 'Историята и школата преди всичко',
    description:
      'За теб бъдещето на Локомотив трябва да стъпва на неговата идентичност, история и юношеска школа. Не се страхуваш от бавен растеж, стига клубът да остава „нашият“ Локомотив.',
  },
  transparency: {
    title: 'Локомотив на правилата',
    tagline: 'Ясно управление, обяснени решения',
    description:
      'За теб най-важното е управлението да е разбираемо и отчетно пред хората, които го подкрепят — независимо кой стои начело.',
  },
  ambition: {
    title: 'Локомотив на върха',
    tagline: 'Инвестиции и сериозни амбиции',
    description:
      'Искаш клубът да се бори реално за трофеи и си готов да приемеш риск и сериозни инвестиции в името на растежа.',
  },
  community: {
    title: 'Локомотив на хората',
    tagline: 'Гласът на феновете тежи',
    description:
      'За теб клубът е преди всичко общност — а гласът на феновете трябва да има реално тегло в големите решения.',
  },
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: 'Кое е по-важно за теб в дългосрочен план?',
    options: [
      { text: 'Клубът да пази идентичността и историята си', vision: 'heritage' },
      { text: 'Клубът да е финансово прозрачен пред феновете', vision: 'transparency' },
      { text: 'Клубът да се бори за титли и купи', vision: 'ambition' },
      { text: 'Феновете да имат реален глас в решенията', vision: 'community' },
    ],
  },
  {
    question: 'Ако Локомотив инвестира допълнителни средства, къде предпочиташ да отидат?',
    options: [
      { text: 'Школата и младите играчи', vision: 'heritage' },
      { text: 'Независим одит и публична отчетност', vision: 'transparency' },
      { text: 'Трансфери на утвърдени играчи', vision: 'ambition' },
      { text: 'Инициативи и комуникация с феновете', vision: 'community' },
    ],
  },
  {
    question: 'Кой сценарий те притеснява най-много?',
    options: [
      { text: 'Клубът да загуби връзката си с историята си', vision: 'heritage' },
      { text: 'Решения да се вземат без обяснение пред феновете', vision: 'transparency' },
      { text: 'Клубът трайно да остане в средата на класирането', vision: 'ambition' },
      { text: 'Феновете да бъдат игнорирани от ръководството', vision: 'community' },
    ],
  },
  {
    question: 'Коя структура на управление ти звучи най-здравословно?',
    options: [
      { text: 'Хора, лично свързани с историята на клуба', vision: 'heritage' },
      { text: 'Публикувани финансови отчети всяка година', vision: 'transparency' },
      { text: 'Амбициозен собственик с голям бюджет', vision: 'ambition' },
      { text: 'Активно фенско сдружение с думата по решенията', vision: 'community' },
    ],
  },
  {
    question: 'Кое от следните те вдъхновява най-много?',
    options: [
      { text: 'Юноша от школата, дебютиращ в първия отбор', vision: 'heritage' },
      { text: 'Ясен план за развитие, следен публично', vision: 'transparency' },
      { text: 'Голям трансфер, който вдига нивото на отбора', vision: 'ambition' },
      { text: 'Пълен стадион, който сам носи атмосферата', vision: 'community' },
    ],
  },
  {
    question: 'Ако можеше да зададеш едно правило за бъдещето на клуба, кое би било то?',
    options: [
      { text: '„Пазим корена, каквото и да се случва.“', vision: 'heritage' },
      { text: '„Всяко голямо решение се обяснява публично.“', vision: 'transparency' },
      { text: '„Инвестираме сериозно, за да стигнем върха.“', vision: 'ambition' },
      { text: '„Феновете имат думата по големите въпроси.“', vision: 'community' },
    ],
  },
  {
    question: 'Какъв темп на промяна предпочиташ?',
    options: [
      { text: 'Бавен, но сигурен растеж около школата', vision: 'heritage' },
      { text: 'Ясни правила, дори ако забавят нещата', vision: 'transparency' },
      { text: 'Бърз, дори рисков скок напред', vision: 'ambition' },
      { text: 'Решения, взети заедно с общността', vision: 'community' },
    ],
  },
]
