import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logo from '../../assets/Logo.svg'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <img src={logo} alt="Curated BNB" className={styles.logo} />
          <div>
            <strong>Curated BNB</strong>
            <p>Thoughtfully hosted stays for discerning guests.</p>
          </div>
        </div>
        <div className={styles.links}>
          <strong>Explore</strong>
          <a href="/#about" className={styles.link}>
            About
          </a>
          <a href="/#features" className={styles.link}>
            Features
          </a>
          <a href="/#properties" className={styles.link}>
            Properties
          </a>
        </div>
        <div className={styles.links}>
          <strong>Stays</strong>
          <Link to="/properties/property-1" className={styles.link}>
            Seaside Atelier
          </Link>
          <Link to="/properties/property-2" className={styles.link}>
            Hillside Hideaway
          </Link>
          <Link to="/properties/property-3" className={styles.link}>
            Terrace Maison
          </Link>
        </div>
        <div className={styles.links}>
          <strong>Connect</strong>
          <a className={styles.link} href="mailto:hello@curatedbnb.com">
            hello@curatedbnb.com
          </a>
          <a className={styles.link} href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a className={styles.link} href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className={`container ${styles.legal}`}>© {new Date().getFullYear()} Curated BNB. Crafted with care.</div>
    </footer>
  )
}

export default Footer
