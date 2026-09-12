import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Hronologiya from './pages/Hronologiya'
import Jubilee100 from './pages/Jubilee100'
import Precedents from './pages/Precedents'
import Investitori from './pages/Investitori'
import Media from './pages/Media'

// Ленив import - VChisla тегли recharts, което не е нужно за първото зареждане на сайта.
const VChisla = lazy(() => import('./pages/VChisla'))
// Ленив и извън основния layout - вътрешен инструмент, не публична страница.
const Admin = lazy(() => import('./pages/Admin'))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hronologiya" element={<Hronologiya />} />
        <Route path="/100-godini" element={<Jubilee100 />} />
        <Route
          path="/v-chisla"
          element={
            <Suspense fallback={<div className="container" style={{ paddingBlock: 56 }}>Зареждане…</div>}>
              <VChisla />
            </Suspense>
          }
        />
        <Route path="/precedenti" element={<Precedents />} />
        <Route path="/investitori" element={<Investitori />} />
        <Route path="/media" element={<Media />} />
        <Route path="/media/:slug" element={<Media />} />
      </Route>
      <Route
        path="/admin"
        element={
          <Suspense fallback={null}>
            <Admin />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
