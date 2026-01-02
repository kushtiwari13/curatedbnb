import styles from './Modal.module.css'

const Modal = ({ title, children, onClose }) => {
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.dialog}>
        <button className={styles.close} onClick={onClose} aria-label="Close modal">
          ×
        </button>
        {title && <h2>{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
