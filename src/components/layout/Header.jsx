import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import styles from './Header.module.css'
import logo from '../../assets/Logo.svg'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Features', href: '/#features' },
  { label: 'Properties', href: '/#properties' },
  { label: 'Host with us', href: '/#host' },
]

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      {open && <div className={`${styles.overlay} ${open ? styles.open : ''}`} onClick={() => setOpen(false)} />}
      <div className={`${styles.inner} container`}>
        <Link to="/" className={styles.brand} aria-label="Curated BNB home">
          <img src={logo} alt="Curated BNB logo" className={styles.logo} />
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>Curated BNB</span>
            <span className={styles.brandTagline}>Comfort redefined</span>
          </span>
        </Link>
        <nav className={`${styles.nav} ${open ? styles.open : ''}`} aria-label="Primary navigation">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <Link to="/properties/property-1" className={styles.navLink} onClick={() => setOpen(false)}>
            Properties
          </Link>
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
          <Button
            as="a"
            href="/#properties"
            variant="primary"
            className={styles.cta}
            onClick={() => setOpen(false)}
          >
            Book a Stay
          </Button>
          <button
            className={styles.menuToggle}
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
