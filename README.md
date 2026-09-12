# Локомотив Пловдив

Независима, неутрална гражданска платформа на общността около Локомотив
Пловдив. Не е анти-нищо сайт - показва състоянието и перспективата пред
клуба с проверими факти, вместо лозунги.

> „Локомотив не е един човек. Собственици идват и си отиват. Локомотив остава.“

🔴 На живо: **https://lokomotiv-plovdiv.com** (и https://www.lokomotiv-plovdiv.com)
Резервен адрес: https://lokomotiv-ima-badeshte.nasatanasov1.workers.dev

## Стек

React + TypeScript + Vite, Tailwind CSS 4 (Vite плъгин), React Router,
Recharts за графиките, lucide-react за икони. Без backend - всичко е
статични данни в `src/data/*.ts`, така че цялото съдържание се редактира
директно във файловете, без база данни.

## Локално стартиране

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # продукционен build в dist/
npm run preview   # преглед на build-а локално
```

Изисква Node.js **20.19+ или 22.12+** (Vite показва предупреждение на
по-стари версии, но билдва и работи и на 20.18 - за постоянна работа е
по-добре да се обнови Node).

## Структура на сайта

4 страници (MVP):

| Път | Съдържание |
|---|---|
| `/` | Начало - hero изречение, принципи, интерактивна викторина „А ти какво избираш?“, гласове на общността |
| `/hronologiya` | „Как стигнахме дотук“ (хронология) + „Мит или факт?“ |
| `/v-chisla` | Графики („Локомотив в числа“) + „Има живот след собственик“ |
| `/investitori` | Двуезична (BG/EN) страница за инвеститори |

## Редакция на съдържанието

Всичко текстово живее в `src/data/`:

- `timeline.ts` - хронология. Всеки запис има `source`/`sourceUrl` или
  `needsSource: true`, ако още няма проверен линк.
- `mythFacts.ts` - секцията „Мит или факт?“.
- `principles.ts` - 6-те принципа в „Какво искаме“.
- `quiz.ts` - въпросите и 4-те „визии“ на интерактивната викторина.
- `voices.ts` - **в момента съдържа само примерни, илюстративни отговори**
  (не истински цитати на реални хора) - виж коментара в началото на файла.
- `seasons.ts` - данни за графиките в „Локомотив в числа“. **Маркирани
  като примерни (`seasonsIsPlaceholder = true`)** - трябва да се заменят
  с реални, проверени числа от официалната статистика на БФС/efbet Лига
  преди сайтът да претендира за истинска статистика.
- `otherClubs.ts` - примерите в „Има живот след собственик“.

**Принцип на сайта:** по-добре празно поле или „чака източник“, отколкото
грешен или недоказан факт. Затова има вградени маркери (`needsSource`,
`isPlaceholder`) навсякъде, където съдържанието още не е финално.

## Deploy (Cloudflare Workers + GitHub)

Cloudflare вече води новите Git-свързани проекти през "Workers" flow-а
(`npx wrangler deploy`), не класическия Pages upload на `dist/`.

1. Качете хранилището в GitHub (public или private).
2. В Cloudflare Dashboard → Workers & Pages → Create → Connect to Git →
   изберете репото.
3. Build/Deploy настройки (обикновено се разпознават автоматично):
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
4. [wrangler.jsonc](wrangler.jsonc) в корена на проекта казва на Wrangler
   да качи `./dist` като статични assets, с
   `not_found_handling: "single-page-application"` за SPA routing (за да
   работят директните линкове към `/hronologiya`, `/precedenti` и т.н.).
   **Важно:** не добавяйте `public/_redirects` успоредно с това - двата
   механизма за SPA fallback се засичат един друг като безкраен цикъл
   (`Invalid _redirects configuration... Infinite loop detected`).

Всеки push към главния клон автоматично пуска нов деплой.

### Собствен домейн

Домейнът `lokomotiv-plovdiv.com` е купен и вързан през Cloudflare Dashboard →
Workers & Pages → `lokomotiv-ima-badeshte` → Domains → Add Domain, което
автоматично създаде wildcard Route (`*.lokomotiv-plovdiv.com/*`) в зоната.

`www.lokomotiv-plovdiv.com` **не** се добавя през същия диалог (той отказва с
„No zones match“, защото wildcard Route-ът вече покрива всеки subdomain) -
единственото, което реално липсваше, е самият DNS запис. Оправя се в
Cloudflare Dashboard → Domains → `lokomotiv-plovdiv.com` → DNS → Records →
Add record: Type `CNAME`, Name `www`, Target `lokomotiv-plovdiv.com`,
Proxy status **Proxied**.

## "Гласът на Локомотив" - истински, модерирани отговори

От тук нататък `VoiceWall` на началната страница чете одобрени отговори
на живо от [worker/index.ts](worker/index.ts) (Cloudflare Worker + D1 база
данни), вместо статичните примери в `src/data/voices.ts` (те остават само
като fallback, докато няма нито едно одобрено).

- Публично: `GET /api/voices` (одобрени), `POST /api/voices` (нов отговор -
  влиза със статус `pending`, никога не се показва автоматично).
- Модерация: `/admin` (не е в навигацията) - заключена зад парола, сравнена
  със secret-а `ADMIN_PASSWORD` в Cloudflare (Workers & Pages -> проектът ->
  Settings -> Variables and Secrets). Одобрение/отказ/изтриване на всеки
  отговор оттам.
- Схемата (`voice_submissions`) се създава автоматично при първата заявка
  (`CREATE TABLE IF NOT EXISTS`) - не е нужна отделна миграция.
- `database_id` в [wrangler.jsonc](wrangler.jsonc) сочи към D1 база, наречена
  `lokomotiv-voices` (Cloudflare Dashboard -> D1 SQL Database -> Create).

## Емблема на клуба

[src/assets/lokomotiv-crest.png](src/assets/lokomotiv-crest.png) е свалена директно от официалния сайт
[lokomotivpd.com](https://lokomotivpd.com/) и се ползва единствено за визуална идентификация на кой клуб
е посветен сайтът (в навигацията, hero-то и фавикона) - не за търговски цели. Сайтът навсякъде е ясно
маркиран като независима инициатива, а не официален канал на клуба (виж [Footer.tsx](src/components/Footer.tsx)).
Ако фенското сдружение или клубът поискат тя да отпадне, файлът се сменя/трие само от трите места, които
го внасят: [Nav.tsx](src/components/Nav.tsx), [Hero.tsx](src/components/Hero.tsx) и `public/favicon.png`.

## Тон и редакционни правила

Сайтът е замислен да е нещо, което журналист може да цитира и неутрален
човек може да сподели - затова:

- без псувни, карикатури или лични нападки;
- всяко твърдение за факт трябва да има източник;
- когато нещо не може да се докаже - казва се ясно, вместо да се
  подразбира в едната или другата посока (виж „Мит или факт?“).
