import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import useScrollReveal from '../../hooks/useScrollReveal'

const Layout = ({ children }) => {
  const location = useLocation()
  useScrollReveal([location.pathname])

  useEffect(() => {
    if (location.hash) return
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
