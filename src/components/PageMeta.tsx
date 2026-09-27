import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeo } from '../data/seo'

/**
 * При клиентска навигация (без презареждане на страницата) обновява
 * заглавието в раздела на браузъра. Превюто при споделяне (Facebook и др.)
 * не минава оттук - за него отговаря worker/index.ts, защото ботовете не
 * изпълняват React.
 */
export default function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = getSeo(pathname).title
  }, [pathname])

  return null
}
