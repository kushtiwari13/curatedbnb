import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../atoms/Button'
import styles from './Header.module.css'
import logo from '../../assets/curated_logo_new.png'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Features', href: '/#features' },
  { label: 'Properties', href: '/#properties' },
  { label: 'Host with us', href: '/#host' },
]

const Header = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isHome && !scrolled ? styles.headerTransparent : styles.headerSolid}`}>
      {open && (
        <div className={`${styles.overlay} ${open ? styles.overlayActive : ''}`} onClick={() => setOpen(false)} />
      )}
      <div className={`${styles.inner} container`}>
        <Link to="/" className={styles.brand} aria-label="Curated BNB home">
          <img src={logo} alt="Curated BNB logo" className={styles.logo} />
        </Link>
        <nav
          id="primary-navigation"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Primary navigation"
        >
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <Button
            as="a"
            href="/#properties"
            variant="primary"
            className={styles.navCTA}
            onClick={() => setOpen(false)}
          >
            Book a Stay
          </Button>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0' }}>
          <Button as="a" href="/#properties" variant="primary" className={styles.cta} onClick={() => setOpen(false)}>
            Book a Stay
          </Button>
          <button
            className={styles.menuToggle}
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label="Toggle menu"
            type="button"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
