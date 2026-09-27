import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import PageMeta from './PageMeta'

export default function Layout() {
  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <PageMeta />
      <Nav />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
