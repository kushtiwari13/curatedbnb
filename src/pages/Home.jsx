import { useState } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Button from '../components/atoms/Button'
import FeatureCard from '../components/FeatureCard'
import PropertyCard from '../components/PropertyCard'
import styles from './Home.module.css'
import logo from '../assets/Logo.svg'
import { properties } from '../data/properties'

const featureItems = [
  {
    title: 'Handpicked Homes',
    copy: 'Each residence is inspected for design, comfort, and locality—no generic stays.',
    icon: '✦',
  },
  {
    title: 'Seamless Booking',
    copy: 'Clear pricing, live availability, and concierge confirmation within moments.',
    icon: '↺',
  },
  {
    title: 'Premium Linen & Amenities',
    copy: 'Hotel-grade bedding, plush robes, and thoughtful toiletries as standard.',
    icon: '☁︎',
  },
  {
    title: 'Concierge Support',
    copy: 'Transfers, private dining, tastings, and experiences handled with care.',
    icon: '⌁',
  },
  {
    title: 'Prime Locations',
    copy: 'Seaside terraces, hillside decks, and city rooftops close to the best of each locale.',
    icon: '⌂',
  },
  {
    title: 'Elevated Design',
    copy: 'Aesthetic, soulful interiors that feel both luxe and livable.',
    icon: '✧',
  },
]

const Home = () => {
  const [form, setForm] = useState({ name: '', email: '', location: '', message: '' })
  const [errors, setErrors] = useState({})
  const [formStatus, setFormStatus] = useState('')
  const metaTitle = 'Curated BNB | Luxury boutique stays'
  const metaDescription = 'Curated BNB presents elevated boutique stays with concierge booking and thoughtful design.'

  useDocumentMeta({
    title: metaTitle,
    description: metaDescription,
    ogImage: properties[1]?.image,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  })

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!form.name) nextErrors.name = 'Please share your name.'
    if (!form.email || !form.email.includes('@')) nextErrors.email = 'Enter a valid email.'
    if (!form.location) nextErrors.location = 'Where is your property located?'
    if (!form.message) nextErrors.message = 'Tell us about your property vision.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    console.log('Host inquiry', form)
    setFormStatus('We received your note. Our concierge will respond within one business day.')
    setForm({ name: '', email: '', location: '', message: '' })
  }

  return (
    <>
      <section
        className={styles.hero}
        id="hero"
        style={{
          backgroundImage: `url(${properties[1]?.image})`,
        }}
      >
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroContent}>
          <div className={styles.pillRow}>
            <span className={styles.pill}>Boutique homes</span>
            <span className={styles.pill}>Concierge booking</span>
            <span className={styles.pill}>Effortless stays</span>
          </div>
          <h1 className={styles.headline}>Curated stays on a grand canvas.</h1>
          <p className={styles.subhead}>
            Three signature residences with sweeping views, tactile interiors, and attentive service—crafted for guests who
            prefer memorable over mass-market.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button as="a" href="#properties" variant="primary">
              Explore properties
            </Button>
            <Button as="a" href="#host" variant="secondary">
              Host with us
            </Button>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="section" id="about">
          <div className={styles.sectionHeader}>
            <div>
              <h2>Comfort, distilled</h2>
              <p>Everything essential to a refined stay, without excess.</p>
            </div>
            <img src={logo} alt="Curated BNB mark" className={styles.logoMark} />
          </div>
          <div className={styles.aboutGrid}>
            <div className={styles.softCard}>
              <h3>Our point of view</h3>
              <p>
                Curated BNB is a trio of signature homes chosen for their light, texture, and soul. Expect layered
                interiors, artisanal touches, and the kind of calm you feel the moment you arrive.
              </p>
              <p>
                A dedicated concierge readies every detail—arrivals, dining, experiences—so you can simply settle in and
                live well.
              </p>
            </div>
            <div className={styles.softCard}>
              <h3>What you can count on</h3>
              <ul>
                <li>Pre-arrival provisioning and effortless check-in.</li>
                <li>Hotel-grade linens, plush robes, and spa-like touches.</li>
                <li>Local expertise for dining, tastings, charters, and galleries.</li>
                <li>Transparent pricing with live availability and secure payment.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className={styles.sectionHeader}>
            <div>
              <h2>Essential luxuries</h2>
              <p>Considered finishes and thoughtful service in every stay.</p>
            </div>
          </div>
          <div className={styles.featuresGrid}>
            {featureItems.map((item) => (
              <FeatureCard key={item.title} title={item.title} copy={item.copy} icon={item.icon} />
            ))}
          </div>
        </section>

        <section className="section" id="properties">
          <div className={styles.sectionHeader}>
            <div>
              <h2>Signature residences</h2>
              <p>Three distinct moods, one standard of care.</p>
            </div>
          </div>
          <div className={styles.propertiesGrid}>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        <section className="section" id="host">
          <div className={`${styles.softCard} ${styles.hostSection}`}>
            <div>
              <h2>List your property</h2>
              <p>
                If design, service, and reliability matter to you, we&apos;d love to learn about your home. We manage
                bookings, guest care, and presentation—so you can focus on hospitality.
              </p>
              <Button as="a" href="mailto:hello@curatedbnb.com" variant="secondary">
                Talk with us
              </Button>
            </div>

            <form onSubmit={handleSubmit} className={styles.formGrid} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className={styles.input}
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="location">
                  Property location
                </label>
                <input
                  id="location"
                  className={styles.input}
                  value={form.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                />
                {errors.location && <span className={styles.error}>{errors.location}</span>}
              </div>
              <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.label} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  className={styles.textarea}
                  rows={4}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                />
                {errors.message && <span className={styles.error}>{errors.message}</span>}
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <Button type="submit" variant="primary">
                  Submit inquiry
                </Button>
                {formStatus && <div className={styles.success}>{formStatus}</div>}
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
