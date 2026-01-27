import { useEffect } from 'react'
import styles from './Modal.module.css'

const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.dialog}>
        <button className={styles.close} onClick={onClose} aria-label="Close modal">
          ×
        </button>
        {title && <h2>{title}</h2>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
