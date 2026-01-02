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
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link to="/properties/property-1" className={styles.navLink} onClick={() => setOpen(false)}>
            Stays
          </Link>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
