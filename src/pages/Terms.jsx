import useDocumentMeta from '../hooks/useDocumentMeta'
import styles from './LegalPage.module.css'

const Terms = () => {
  useDocumentMeta({
    title: 'Terms & Conditions | Curated BNB',
    description: 'Terms and conditions for using Curated BNB.',
  })

  return (
    <div className="container section">
      <div className={styles.page}>
        <h1 className={styles.title}>Terms &amp; Conditions</h1>
        <section className={styles.section} data-reveal>
          <p>
            For the purpose of these Terms and Conditions, the term &quot;we&quot;, &quot;us&quot;, &quot;our&quot; used
            anywhere on this page shall mean CURATED BNBS, whose registered/operational office is DOOR NO F2 NOOR
            RESIDENCY NO 1, 3RDCROSS 14TH MAIN CURE ORTHOP, AND PHYSIOTHERAPY CENTER BENGALURU URBAN KARNATAKA 560011.
            &quot;You&quot;, &quot;your&quot;, &quot;user&quot;, &quot;visitor&quot; shall mean any natural or legal
            person who is visiting our website and/or agreed to purchase from us.
          </p>
          <p>
            Your use of the website and/or purchase from us are governed by following Terms and Conditions: The content
            of the pages of this website is subject to change without notice. Neither we nor any third parties provide
            any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the
            information and materials found or offered on this website for any particular purpose.
          </p>
          <p>
            You acknowledge that such information and materials may contain inaccuracies or errors and we expressly
            exclude liability for any such inaccuracies or errors to the fullest extent permitted by law. Your use of
            any information or materials on our website and/or product pages is entirely at your own risk, for which we
            shall not be liable.
          </p>
          <p>
            It shall be your own responsibility to ensure that any products, services or information available through
            our website and/or product pages meet your specific requirements.
          </p>
          <p>
            Our website contains material which is owned by or licensed to us. This material includes, but are not
            limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in
            accordance with the copyright notice, which forms part of these terms and conditions.
          </p>
          <p>
            All trademarks reproduced in our website which are not the property of, or licensed to, the operator are
            acknowledged on the website. Unauthorized use of information provided by us shall give rise to a claim for
            damages and/or be a criminal offense.
          </p>
          <p>
            From time to time our website may also include links to other websites. These links are provided for your
            convenience to provide further information. You may not create a link to our website from another website
            or document without CURATED BNBS&apos;s prior written consent.
          </p>
          <p>
            Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is
            subject to the laws of India.
          </p>
          <p>
            We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly
            out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the
            preset limit mutually agreed by us with our acquiring bank from time to time.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Terms
