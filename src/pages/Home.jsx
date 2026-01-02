import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Button from '../components/atoms/Button'
import FeatureCard from '../components/FeatureCard'
import PropertyCard from '../components/PropertyCard'
import styles from './Home.module.css'
import heroImage from '../assets/P1.svg'
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
      <Helmet>
        <title>Curated BNB | Luxury boutique stays</title>
        <meta
          name="description"
          content="Curated BNB presents elevated boutique stays with concierge booking and thoughtful design."
        />
      </Helmet>
      <div className="container">
        <section className={styles.hero} id="hero">
          <div className={styles.heroText}>
            <div className={styles.pillRow}>
              <span className={styles.pill}>Luxury stays</span>
              <span className={styles.pill}>Concierge booking</span>
              <span className={styles.pill}>Design-first</span>
            </div>
            <h1 className={styles.headline}>Curated stays. Elevated comfort.</h1>
            <p className={styles.subhead}>
              Boutique homes crafted for discerning travelers—where thoughtful design, private service, and seamless
              booking come together.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button as="a" href="#properties" variant="primary">
                Explore our properties
              </Button>
              <Button as="a" href="#host" variant="secondary">
                List your property
              </Button>
            </div>
          </div>
          <div className={styles.heroCard}>
            <div className={styles.heroImage}>
              <img src={heroImage} alt="Seaside Atelier placeholder" />
            </div>
            <div>
              <h3 style={{ marginBottom: '0.35rem' }}>Seaside Atelier</h3>
              <p style={{ margin: 0, color: 'var(--color-muted)' }}>
                Sun-drenched terraces above the Tyrrhenian Sea. Linen-draped suites with curated art and private plunge.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className={styles.about}>
            <div className={styles.aboutCard}>
              <img src={logo} alt="Curated BNB mark" className={styles.logoMark} />
              <h2>Comfort redefined</h2>
              <p>
                Curated BNB is a boutique collection of homes chosen for soulful design, comfort, and setting. Every stay
                includes elevated linens, thoughtful amenities, and a concierge who knows the neighborhood by heart.
              </p>
              <p>
                We collaborate with local artisans and hosts to ensure each residence feels distinctive—whether you are
                overlooking the sea, vineyards, or a vibrant city terrace.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h3>Why travelers choose us</h3>
              <ul>
                <li>Curated only-after inspection: no mass listings.</li>
                <li>Seamless arrival with pre-arranged transfers and in-home orientation.</li>
                <li>Design-forward furnishings and mood lighting for slow evenings in.</li>
                <li>Responsive concierge: dining bookings, private chefs, tastings, and hidden gems.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <h2>Curated for discerning stays</h2>
            <p>Elevated essentials paired with intuitive service.</p>
          </div>
          <div className={styles.featuresGrid}>
            {featureItems.map((item) => (
              <FeatureCard key={item.title} title={item.title} copy={item.copy} icon={item.icon} />
            ))}
          </div>
        </section>

        <section className="section" id="properties">
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <h2>Our properties</h2>
            <p>Three distinct stays, one standard of care.</p>
          </div>
          <div className={styles.propertiesGrid}>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        <section className="section" id="host">
          <div className={styles.hostSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
              <div>
                <h2>List your property with Curated BNB</h2>
                <p>
                  We partner with owners who value design, guest delight, and reliable care. Share a few details and
                  we&apos;ll be in touch.
                </p>
              </div>
              <Button as="a" href="mailto:hello@curatedbnb.com" variant="secondary">
                Talk to us
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
