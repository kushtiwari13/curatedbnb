import { useEffect, useState } from 'react'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Button from '../components/atoms/Button'
import FeatureCard from '../components/FeatureCard'
import PropertyCard from '../components/PropertyCard'
import styles from './Home.module.css'
import logo from '../assets/Logo.svg'
import { properties } from '../data/properties'

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const featureItems = [
  {
    title: 'Handpicked Homes',
    copy: 'Each residence is inspected for design, comfort, and locality—no generic stays.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5L12 14.3 7.5 16.7l.9-5L4.8 8.2l5-.7L12 3z" />
      </svg>
    ),
  },
  {
    title: 'Seamless Booking',
    copy: 'Clear pricing, live availability, and concierge confirmation within moments.',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M8 2v4M16 2v4M3 9h18" />
      </svg>
    ),
  },
  {
    title: 'Premium Linen & Amenities',
    copy: 'Hotel-grade bedding, plush robes, and thoughtful toiletries as standard.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3c3 3 6 6 6 9a6 6 0 1 1-12 0c0-3 3-6 6-9z" />
      </svg>
    ),
  },
  {
    title: 'Concierge Support',
    copy: 'Transfers, private dining, tastings, and experiences handled with care.',
    icon: (
      <svg {...iconProps}>
        <path d="M6 12V9a6 6 0 1 1 12 0v3l2 2H4l2-2z" />
        <path d="M8 16h8a2 2 0 0 1-4 2 2 2 0 0 1-4-2z" />
      </svg>
    ),
  },
  {
    title: 'Prime Locations',
    copy: 'Seaside terraces, hillside decks, and city rooftops close to the best of each locale.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Elevated Design',
    copy: 'Aesthetic, soulful interiors that feel both luxe and livable.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l7 7-7 11-7-11 7-7z" />
      </svg>
    ),
  },
]

const testimonials = [
  {
    name: 'Priya S.',
    location: 'Mumbai',
    quote:
      'The stay felt like a private retreat—quiet, cinematic, and thoughtfully curated. Every detail was handled before we even asked.',
    image: properties[0]?.image,
  },
  {
    name: 'Arjun K.',
    location: 'Singapore',
    quote:
      'Impeccable interiors and a concierge that truly anticipates. It felt less like a rental and more like a private residence.',
    image: properties[1]?.image,
  },
  {
    name: 'Meera D.',
    location: 'New York',
    quote:
      'We booked for a staycation and it reset our week. Soft light, beautiful materials, and a view we still talk about.',
    image: properties[2]?.image,
  },
]

const Home = () => {
  const [form, setForm] = useState({ name: '', email: '', location: '', message: '' })
  const [errors, setErrors] = useState({})
  const [formStatus, setFormStatus] = useState('')
  const [heroStep, setHeroStep] = useState(0)
  const [heroPanelVisible, setHeroPanelVisible] = useState(true)
  const metaTitle = 'Curated BNB | Luxury boutique stays'
  const metaDescription = 'Curated BNB presents elevated boutique stays with concierge booking and thoughtful design.'

  useDocumentMeta({
    title: metaTitle,
    description: metaDescription,
    ogImage: properties[1]?.image,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(max-width: 600px)')
    let ticking = false

    const updateStep = () => {
      const hero = document.getElementById('hero')
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      const scrollY = window.scrollY || window.pageYOffset
      const heroTop = scrollY + rect.top
      const heroHeight = rect.height || window.innerHeight
      const distance = scrollY - heroTop
      const progress = distance / heroHeight

      const isMobile = mediaQuery.matches
      let nextStep = 2
      if (isMobile) {
        nextStep = 0
        if (progress > 0.08) nextStep = 1
        if (progress > 0.25) nextStep = 2
      }
      setHeroStep(nextStep)
      setHeroPanelVisible(true)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        updateStep()
        ticking = false
      })
    }

    updateStep()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onScroll)
    } else {
      mediaQuery.addListener(onScroll)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', onScroll)
      } else {
        mediaQuery.removeListener(onScroll)
      }
    }
  }, [])

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
      <section className={`${styles.hero} ${styles[`heroStep${heroStep}`]}`} id="hero">
        <div
          className={styles.heroBackdropImage}
          style={{ backgroundImage: `url(${properties[0]?.image})` }}
          aria-hidden
        />
        <div className={styles.heroShade} aria-hidden />
        <div className={`container ${styles.heroInner}`} data-reveal>
          <div className={styles.heroCopy}>
            <div className={styles.pillRow}>
              <span className={styles.pill}>Boutique homes</span>
              <span className={styles.pill}>Concierge booking</span>
              <span className={styles.pill}>Effortless stays</span>
            </div>
            <h1 className={styles.headline}>Curated stays on a grand canvas.</h1>
            <p className={styles.subhead}>
              Three signature residences with sweeping views, tactile interiors, and attentive service—crafted for guests
              who prefer memorable over mass-market.
            </p>
            <div className={styles.heroActions}>
              <Button as="a" href="#properties" variant="primary" className={styles.heroPrimary}>
                Book a stay
              </Button>
              <Button as="a" href="#properties" variant="secondary" className={styles.heroSecondary}>
                Explore properties
              </Button>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>3</span>
                <span className={styles.statLabel}>Signature residences</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>24/7</span>
                <span className={styles.statLabel}>Concierge access</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>5★</span>
                <span className={styles.statLabel}>Guest experience</span>
              </div>
            </div>
          </div>
          <div className={`${styles.heroMedia} ${heroStep > 0 ? styles.heroMediaActive : ''}`}>
            <div className={styles.heroStack}>
              <img
                src={properties[2]?.image}
                alt="Curated BNB signature residence"
                className={`${styles.heroImageMain} imageFrame`}
              />
              <img
                src={properties[1]?.image}
                alt="Curated BNB luxury interior"
                className={`${styles.heroImageAlt} imageFrame`}
              />
            </div>
            <div className={`${styles.heroPanel} ${heroStep > 0 ? styles.heroPanelLift : ''}`}>
              <span className={styles.panelEyebrow}>Curated standard</span>
              <h3 className={styles.panelTitle}>Refined stays, handled end-to-end.</h3>
              <p className={styles.panelCopy}>
                From arrival to departure, every detail is orchestrated so you can settle in effortlessly.
              </p>
            </div>
            <div className={styles.heroBadge}>
              <span className={styles.badgeLabel}>Seasonal highlight</span>
              <span className={styles.badgeValue}>Oceanview Collection</span>
            </div>
          </div>
        </div>
        <div className={styles.scrollIndicator} aria-hidden>
          <span className={styles.scrollLine} />
          <span className={styles.scrollText}>Scroll</span>
        </div>
      </section>

      <section className={styles.featuredSection} id="properties">
        <div className={`container ${styles.featuredInner}`}>
          <div className={styles.sectionHeader} data-reveal>
            <div className={styles.sectionIntro}>
              <span className={styles.eyebrow}>Featured stays</span>
              <h2>Signature residences, framed like editorials.</h2>
              <p>Full-bleed light, private terraces, and a quiet sense of grandeur.</p>
            </div>
          </div>
          <div className={styles.featuredGrid} data-reveal>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <section className={styles.storySection} id="about" data-reveal>
          <div className={styles.storyMedia}>
            <img src={properties[1]?.image} alt="Curated BNB lifestyle moment" className={styles.storyImage} />
          </div>
          <div className={styles.storyCopy}>
            <span className={styles.eyebrow}>Our story</span>
            <h2>Calm, collected, and richly lived-in.</h2>
            <p>
              Curated BNB is a trio of boutique homes chosen for their light, texture, and soul. Expect layered
              interiors, artisanal touches, and the kind of calm you feel the moment you arrive.
            </p>
            <p>
              A dedicated concierge readies every detail—arrivals, dining, and experiences—so you can simply settle in
              and live well.
            </p>
            <div className={styles.storySignature}>
              <img src={logo} alt="Curated BNB mark" className={styles.logoMark} />
              <span className={styles.logoCaption}>Curated BNB</span>
            </div>
          </div>
        </section>

        <section className={styles.conciergeSection} id="concierge" data-reveal>
          <div
            className={styles.conciergeBackdrop}
            style={{ backgroundImage: `url(${properties[2]?.image})` }}
            aria-hidden
          />
          <div className={styles.conciergeShade} aria-hidden />
          <div className={styles.conciergeCard}>
            <span className={styles.eyebrow}>Concierge experience</span>
            <h2>Arrive to a stay that feels already yours.</h2>
            <p>
              Private transfers, chef-led dinners, day trips, and celebrations are arranged with precision. Your only
              task is to be present.
            </p>
            <div className={styles.conciergeHighlights}>
              {featureItems.slice(0, 3).map((item) => (
                <div key={item.title} className={styles.highlight}>
                  <span className={styles.highlightIcon}>{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button as="a" href="#host" variant="secondary" className={styles.conciergeCta}>
              Speak with concierge
            </Button>
          </div>
        </section>

        <section className={styles.testimonialSection} data-reveal>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>Guest notes</span>
              <h2>Quiet luxury, seen through their eyes.</h2>
            </div>
          </div>
          <div className={styles.testimonialTrack}>
            {testimonials.map((item) => (
              <article key={item.name} className={styles.testimonialCard}>
                <div className={styles.testimonialMedia}>
                  <img src={item.image} alt={`${item.name} stay`} loading="lazy" />
                </div>
                <p className={styles.testimonialQuote}>&ldquo;{item.quote}&rdquo;</p>
                <div className={styles.testimonialMeta}>
                  <span className={styles.testimonialName}>{item.name}</span>
                  <span className={styles.testimonialLocation}>{item.location}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="features" data-reveal>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>Signature touch</span>
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

        <section className="section" id="host" data-reveal>
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

      <section className={styles.ctaSection} aria-labelledby="cta-title">
        <div className={styles.ctaBackdrop} style={{ backgroundImage: `url(${properties[0]?.image})` }} aria-hidden />
        <div className={styles.ctaShade} aria-hidden />
        <div className={`container ${styles.ctaContent}`} data-reveal>
          <span className={styles.eyebrow}>Plan your escape</span>
          <h2 id="cta-title">A quieter way to travel, reserved just for you.</h2>
          <p>Reserve your dates, share your preferences, and let us curate the rest.</p>
          <div className={styles.ctaActions}>
            <Button as="a" href="#properties" variant="primary" className={styles.heroPrimary}>
              Book a stay
            </Button>
            <Button as="a" href="#host" variant="secondary" className={styles.heroSecondary}>
              List your property
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
