import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './LegalPage.module.css'

const Shipping = () => {
  useDocumentMeta({
    title: 'Shipping Policy | Curated BNB',
    description: 'Shipping policy for Curated BNB.',
  })

  return (
    <div className="container section">
      <div className={styles.page}>
        <h1 className={styles.title}>Shipping Policy</h1>
        <section className={styles.section} data-reveal>
          <p>
            For International buyers, orders are shipped and delivered through registered international courier
            companies and/or International speed post only. For domestic buyers, orders are shipped through registered
            domestic courier companies and/or speed post only.
          </p>
          <p>
            Orders are shipped within Not Applicable or as per the delivery date agreed at the time of order
            confirmation and delivering of the shipment subject to Courier Company / post office norms.
          </p>
          <p>
            CURATED BNBS is not liable for any delay in delivery by the courier company / postal authorities and only
            guarantees to hand over the consignment to the courier company or postal authorities within Not Applicable
            from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
          </p>
          <p>Delivery of all orders will be to the address provided by the buyer.</p>
          <p>
            Delivery of our services will be confirmed on your mail ID as specified during registration. For any issues
            in utilizing our services you may contact our helpdesk on 9845460981 or curatedbnbs@gmail.com.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Shipping
