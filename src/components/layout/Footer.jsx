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
          <Link to="/properties/the-brutalist-den-koramangala" className={styles.link}>
            The Brutalist Den
          </Link>
          <Link to="/properties/the-city-boho-jayanagar" className={styles.link}>
            The City Boho
          </Link>
          <Link to="/properties/the-japandi-nest-jayanagar" className={styles.link}>
            The Japandi Nest
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
        <div className={styles.links}>
          <strong>Legal</strong>
          <Link to="/terms" className={styles.link}>
            Terms &amp; Conditions
          </Link>
          <Link to="/privacy" className={styles.link}>
            Privacy Policy
          </Link>
          <Link to="/shipping" className={styles.link}>
            Shipping Policy
          </Link>
          <Link to="/cancellation-refund" className={styles.link}>
            Cancellation &amp; Refund
          </Link>
          <Link to="/contact" className={styles.link}>
            Contact Us
          </Link>
        </div>
      </div>
      <div className={`container ${styles.legal}`}>© {new Date().getFullYear()} Curated BNB. Crafted with care.</div>
    </footer>
  )
}

export default Footer
