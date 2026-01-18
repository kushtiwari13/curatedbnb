import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './LegalPage.module.css'

const Privacy = () => {
  useDocumentMeta({
    title: 'Privacy Policy | Curated BNB',
    description: 'Privacy policy for Curated BNB.',
  })

  return (
    <div className="container section">
      <div className={styles.page}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <section className={styles.section} data-reveal>
          <p>
            This privacy policy sets out how CURATED BNBS uses and protects any information that you give CURATED BNBS
            when you visit their website and/or agree to purchase from them. CURATED BNBS is committed to ensuring that
            your privacy is protected.
          </p>
          <p>
            CURATED BNBS may change this policy from time to time by updating this page. You should check this page from
            time to time to ensure that you adhere to these changes.
          </p>
          <p>We may collect the following information:</p>
          <ul className={styles.list}>
            <li>Name</li>
            <li>Contact information including email address</li>
            <li>Demographic information such as postcode, preferences and interests, if required</li>
            <li>Other information relevant to customer surveys and/or offers</li>
          </ul>
          <p>What we do with the information we gather:</p>
          <ul className={styles.list}>
            <li>Internal record keeping.</li>
            <li>We may use the information to improve our products and services.</li>
            <li>
              We may periodically send promotional emails about new products, special offers or other information which
              we think you may find interesting using the email address which you have provided.
            </li>
            <li>
              From time to time, we may also use your information to contact you for market research purposes. We may
              contact you by email, phone, fax or mail.
            </li>
            <li>We may use the information to customise the website according to your interests.</li>
          </ul>
          <p>
            We are committed to ensuring that your information is secure. In order to prevent unauthorised access or
            disclosure we have put in suitable measures.
          </p>
          <p>How we use cookies:</p>
          <p>
            A cookie is a small file which asks permission to be placed on your computer&apos;s hard drive. Once you
            agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a
            particular site. Cookies allow web applications to respond to you as an individual.
          </p>
          <p>
            We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage
            traffic and improve our website in order to tailor it to customer needs. We only use this information for
            statistical analysis purposes and then the data is removed from the system.
          </p>
          <p>
            Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find
            useful and which you do not. A cookie in no way gives us access to your computer or any information about
            you, other than the data you choose to share with us.
          </p>
          <p>
            You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can
            usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full
            advantage of the website.
          </p>
          <p>Controlling your personal information:</p>
          <p>
            You may choose to restrict the collection or use of your personal information in the following ways: whenever
            you are asked to fill in a form on the website, look for the box that you can click to indicate that you do
            not want the information to be used by anybody for direct marketing purposes.
          </p>
          <p>
            If you have previously agreed to us using your personal information for direct marketing purposes, you may
            change your mind at any time by writing to or emailing us at curatedbnbs@gmail.com.
          </p>
          <p>
            We will not sell, distribute or lease your personal information to third parties unless we have your
            permission or are required by law to do so.
          </p>
          <p>
            We may use your personal information to send you promotional information about third parties which we think
            you may find interesting if you tell us that you wish this to happen.
          </p>
          <p>
            If you believe that any information we are holding on you is incorrect or incomplete, please write to DOOR
            NO F2 NOOR RESIDENCY NO 1, 3RDCROSS 14TH MAIN CURE ORTHOP, AND PHYSIOTHERAPY CENTER BENGALURU URBAN KARNATAKA
            560011 or contact us at 9845460981 or curatedbnbs@gmail.com as soon as possible. We will promptly correct any
            information found to be incorrect.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Privacy
