import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** При всяка смяна на страница връща скрола най-горе. Котвите на същата страница (#...) не я сменят. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
