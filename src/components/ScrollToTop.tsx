import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** При смяна на страница връща скрола най-горе (освен при връзка към #котва). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
