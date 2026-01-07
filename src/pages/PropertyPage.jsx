import { useNavigate, useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget'
import Button from '../components/atoms/Button'
import { getPropertyBySlug } from '../data/properties'
import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './PropertyPage.module.css'

const amenityIcons = {
  view: '🌅',
  pool: '🧊',
  kitchen: '🍴',
  wifi: '📶',
  ac: '❄️',
  spa: '💧',
  fireplace: '🔥',
  parking: '🅿️',
  laundry: '🧺',
}

const PropertyPage = () => {
  const { slug, id } = useParams()
  const navigate = useNavigate()
  const resolvedSlug = slug || (id ? `property-${id}` : undefined)
  const property = getPropertyBySlug(resolvedSlug)

  useDocumentMeta(
    property
      ? {
          title: `${property.name} | Curated BNB`,
          description: property.tagline,
          ogImage: property.image,
          url: typeof window !== 'undefined' ? window.location.href : undefined,
        }
      : {
          title: 'Residence not found | Curated BNB',
          description: 'We could not find the residence you requested.',
        },
  )

  if (!property) {
    return (
      <div className="container section">
        <p>We couldn&apos;t find that residence.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="container section">
        <div
          className={styles.hero}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15,26,36,0.4), rgba(15,26,36,0.7)), url(${property.image})`,
          }}
        >
          <div className={styles.heroOverlay} aria-hidden />
          <div className={styles.overlayContent}>
            <p className={styles.tagline}>{property.location}</p>
            <h1 style={{ color: '#fff', marginBottom: 0 }}>{property.name}</h1>
            <p className={styles.tagline}>{property.tagline}</p>
          </div>
        </div>

        <div className={styles.layout}>
          <div>
            <div className={styles.chips}>
              <span className={styles.chip}>{property.capacity.guests} guests</span>
              <span className={styles.chip}>{property.capacity.bedrooms} bedrooms</span>
              <span className={styles.chip}>{property.capacity.bathrooms} bathrooms</span>
              <span className={styles.chip}>Wi-Fi</span>
              <span className={styles.chip}>Parking</span>
            </div>

            <div className={styles.sectionCard}>
              <h2>About this stay</h2>
              {property.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.sectionCard} style={{ marginTop: 'var(--space-md)' }}>
              <h2>Elevated essentials</h2>
              <div className={styles.amenities}>
                {property.amenities.map((item) => (
                  <div key={item.label} className={styles.amenity}>
                    <span aria-hidden>{amenityIcons[item.iconKey] || '✦'}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.sectionCard} style={{ marginTop: 'var(--space-md)' }}>
              <h2>Neighborhood highlights</h2>
              <div className={styles.mapPlaceholder}>Map preview placeholder</div>
              <ul>
                {property.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>

          <BookingWidget property={property} />
        </div>
      </div>
    </>
  )
}

export default PropertyPage
