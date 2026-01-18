import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './LegalPage.module.css'

const Contact = () => {
  useDocumentMeta({
    title: 'Contact Us | Curated BNB',
    description: 'Contact details for Curated BNB.',
  })

  return (
    <div className="container section">
      <div className={styles.page}>
        <h1 className={styles.title}>Contact Us</h1>
        <section className={styles.section} data-reveal>
          <p>Merchant Legal entity name: CURATED BNBS</p>
          <p>
            Registered Address: DOOR NO F2 NOOR RESIDENCY NO 1, 3RDCROSS 14TH MAIN CURE ORTHOP, AND PHYSIOTHERAPY
            CENTER BENGALURU URBAN KARNATAKA 560011
          </p>
          <p>
            Operational Address: DOOR NO F2 NOOR RESIDENCY NO 1, 3RDCROSS 14TH MAIN CURE ORTHOP, AND PHYSIOTHERAPY
            CENTER BENGALURU URBAN KARNATAKA 560011
          </p>
          <p>Telephone No: 9845460981</p>
          <p>E-Mail ID: curatedbnbs@gmail.com</p>
        </section>
      </div>
    </div>
  )
}

export default Contact
