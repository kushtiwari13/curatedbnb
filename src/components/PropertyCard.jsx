import { Link } from 'react-router-dom'
import Button from './atoms/Button'
import styles from './PropertyCard.module.css'

const PropertyCard = ({ property }) => {
  return (
    <article className={styles.card}>
      <img src={property.image} alt={property.name} className={styles.image} />
      <div className={styles.content}>
        <span className={styles.location}>{property.location}</span>
        <h3 className={styles.title}>{property.name}</h3>
        <p className={styles.tagline}>{property.tagline}</p>
        <div className={styles.meta}>
          <span className={styles.price}>From ${property.pricing.nightlyRate} / night</span>
          <Button as={Link} to={`/properties/${property.slug}`} variant="secondary" size="small">
            View details
          </Button>
        </div>
      </div>
    </article>
  )
}

export default PropertyCard
