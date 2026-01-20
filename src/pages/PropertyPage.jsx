import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget'
import Button from '../components/atoms/Button'
import { getPropertyBySlug } from '../data/properties'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Modal from '../components/Modal'
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
  const { slug } = useParams()
  const navigate = useNavigate()
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const property = getPropertyBySlug(slug)
  const gallery = useMemo(() => {
    if (!property) return []
    if (property.gallery?.length) return property.gallery
    return [{ src: property.image, label: 'Property' }]
  }, [property])
  const carouselPhotos = useMemo(() => gallery.filter((item) => item.label), [gallery])
  const displayPhotos = carouselPhotos.length ? carouselPhotos : gallery

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

  useEffect(() => {
    setActivePhotoIndex(0)
  }, [displayPhotos.length])

  const activePhoto = displayPhotos[activePhotoIndex]

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev === 0 ? displayPhotos.length - 1 : prev - 1))
  }

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev === displayPhotos.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="container section">
        <div
          className={styles.hero}
          data-reveal
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(21, 21, 21, 0.4), rgba(21, 21, 21, 0.75)), url(${property.image})`,
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
            <div className={styles.gallery} data-reveal>
              <div className={styles.galleryMain}>
                {activePhoto && (
                  <img
                    src={activePhoto.src}
                    alt={`${property.name}${activePhoto.label ? ` ${activePhoto.label}` : ''}`}
                    className={styles.galleryImage}
                  />
                )}
                <button className={styles.galleryControl} onClick={handlePrevPhoto} aria-label="Previous photo">
                  ‹
                </button>
                <button className={`${styles.galleryControl} ${styles.galleryControlNext}`} onClick={handleNextPhoto} aria-label="Next photo">
                  ›
                </button>
                <Button variant="secondary" className={styles.galleryButton} onClick={() => setShowGallery(true)}>
                  Show all photos
                </Button>
              </div>
              <div className={styles.galleryThumbs}>
                {displayPhotos.map((photo, index) => (
                  <button
                    key={`${photo.src}-${photo.label}`}
                    type="button"
                    className={`${styles.galleryThumb} ${index === activePhotoIndex ? styles.activeThumb : ''}`}
                    onClick={() => setActivePhotoIndex(index)}
                  >
                    <img src={photo.src} alt={photo.label || 'Property photo'} />
                    <span>{photo.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.chips} data-reveal>
              <span className={styles.chip}>{property.capacity.guests} guests</span>
              <span className={styles.chip}>{property.capacity.bedrooms} bedrooms</span>
              <span className={styles.chip}>{property.capacity.bathrooms} bathrooms</span>
              <span className={styles.chip}>Wi-Fi</span>
              <span className={styles.chip}>Parking</span>
            </div>

            <div className={styles.sectionCard} data-reveal>
              <h2>About this stay</h2>
              {property.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.sectionCard} style={{ marginTop: 'var(--space-md)' }} data-reveal>
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

            <div className={styles.sectionCard} style={{ marginTop: 'var(--space-md)' }} data-reveal>
              <h2>Neighborhood highlights</h2>
              <div className={styles.map}>
                <div className={styles.mapInfo}>
                  <p className={styles.mapLabel}>Address</p>
                  <p className={styles.mapAddress}>{property.mapAddress || 'See map for location'}</p>
                  <a className={styles.mapLink} href={property.mapLink} target="_blank" rel="noreferrer">
                    Open in Google Maps
                  </a>
                </div>
                <iframe
                  title="Map"
                  className={styles.mapFrame}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={property.mapEmbed}
                />
              </div>
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

      {showGallery && (
        <Modal title={`${property.name} photos`} onClose={() => setShowGallery(false)}>
          <div className={styles.galleryGrid}>
            {gallery.map((photo) => (
              <figure key={`${photo.src}-${photo.label}`} className={styles.galleryTile}>
                <img src={photo.src} alt={`${property.name}${photo.label ? ` ${photo.label}` : ''}`} />
                {photo.label && <figcaption>{photo.label}</figcaption>}
              </figure>
            ))}
          </div>
        </Modal>
      )}
    </>
  )
}

export default PropertyPage
