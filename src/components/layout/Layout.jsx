import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import useScrollReveal from '../../hooks/useScrollReveal'

const Layout = ({ children }) => {
  const location = useLocation()
  useScrollReveal([location.pathname])

  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
