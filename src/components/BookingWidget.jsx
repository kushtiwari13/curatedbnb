import { useEffect, useMemo, useState } from 'react'
import AvailabilityCalendar from './AvailabilityCalendar'
import Button from './atoms/Button'
import Modal from './Modal'
import { doesRangeOverlap, getUnavailableDateRanges } from '../services/availability'
import { initiatePayment } from '../services/payment'
import styles from './BookingWidget.module.css'

const getNights = (range) => {
  if (!range?.from || !range?.to) return 0
  const diff = range.to.getTime() - range.from.getTime()
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)))
}

const BookingWidget = ({ property }) => {
  const [range, setRange] = useState({ from: null, to: null })
  const [guests, setGuests] = useState(2)
  const [unavailable, setUnavailable] = useState([])
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [reference, setReference] = useState('')

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const blocked = await getUnavailableDateRanges(property.iCalUrl)
      if (mounted) setUnavailable(blocked)
    }
    load()
    return () => {
      mounted = false
    }
  }, [property.iCalUrl])

  const nights = useMemo(() => getNights(range), [range])
  const subtotal = nights * property.pricing.nightlyRate
  const cleaning = nights ? property.pricing.cleaningFee : 0
  const service = nights ? Math.round((subtotal + cleaning) * property.pricing.serviceFeePercent) : 0
  const total = subtotal + cleaning + service

  const handleCheck = () => {
    setMessage('')
    if (!range?.from || !range?.to) {
      setMessage('Select your check-in and check-out dates to continue.')
      return
    }
    if (doesRangeOverlap(range.from, range.to, unavailable)) {
      setMessage('Those dates are unavailable. Please choose alternate dates.')
      return
    }
    setMessage('These dates are available. Proceed to book your stay.')
  }

  const handleBook = async () => {
    if (!range?.from || !range?.to) {
      setMessage('Select your dates before booking.')
      return
    }
    setStatus('processing')
    setMessage('')
    try {
      const payload = {
        propertyId: property.id,
        propertySlug: property.slug,
        propertyName: property.name,
        dates: {
          checkIn: range.from,
          checkOut: range.to,
        },
        guests,
        total,
      }
      const result = await initiatePayment(payload)
      if (result?.status === 'success' || result?.status === 'redirecting') {
        setReference(result.reference || 'Stripe Checkout')
        setShowConfirmation(true)
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong starting payment.')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <aside className={styles.widget} aria-label="Booking widget">
      <div className={styles.header}>
        <div>
          <div className={styles.price}>${property.pricing.nightlyRate}</div>
          <span style={{ color: 'var(--color-muted)' }}>per night</span>
        </div>
        <div style={{ textAlign: 'right', color: 'var(--color-muted)' }}>
          {unavailable.length ? `${unavailable.length} blocked ranges` : 'Checking calendar...'}
        </div>
      </div>

      <AvailabilityCalendar range={range} onSelect={setRange} unavailableRanges={unavailable} />

      <div className={styles.row}>
        <label className={styles.label} htmlFor="guests">
          Guests
        </label>
        <select
          id="guests"
          className={styles.select}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num} guest{num > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>{nights || 0} night{nights !== 1 ? 's' : ''} x ${property.pricing.nightlyRate}</span>
          <span>${subtotal}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Cleaning fee</span>
          <span>${cleaning}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Service ({Math.round(property.pricing.serviceFeePercent * 100)}%)</span>
          <span>${service}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.total}`}>
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {message && <div className={`${styles.alert} ${message.includes('available') ? styles.success : ''}`}>{message}</div>}

      <div className={styles.row}>
        <Button variant="secondary" onClick={handleCheck} fullWidth>
          Check availability
        </Button>
        <Button variant="primary" onClick={handleBook} fullWidth disabled={status === 'processing'}>
          {status === 'processing' ? 'Starting payment...' : 'Book now'}
        </Button>
      </div>

      <p style={{ color: 'var(--color-subtle)', fontSize: '0.9rem' }}>
        Secure checkout powered by Stripe. Confirmation shared immediately after payment.
      </p>

      {showConfirmation && (
        <Modal title="Booking confirmed" onClose={() => setShowConfirmation(false)}>
          <p>
            Thank you for choosing <strong>{property.name}</strong>. Your reference is{' '}
            <strong>{reference}</strong>.
          </p>
          <p style={{ color: 'var(--color-muted)' }}>
            A downloadable confirmation and calendar invite will be available after payment processing. For bespoke
            requests, email concierge@curatedbnb.com.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <Button variant="secondary">Download confirmation</Button>
            <Button variant="ghost">Email me the details</Button>
            <Button variant="primary" onClick={() => setShowConfirmation(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}
    </aside>
  )
}

export default BookingWidget
