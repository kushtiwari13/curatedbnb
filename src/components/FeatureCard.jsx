import styles from './FeatureCard.module.css'

const FeatureCard = ({ title, copy, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon} aria-hidden>
        {icon}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.copy}>{copy}</p>
      </div>
    </div>
  )
}

export default FeatureCard
