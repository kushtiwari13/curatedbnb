import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config()

const app = express()
const port = process.env.PORT || 4242
const domain = process.env.DOMAIN || process.env.CLIENT_URL || 'http://localhost:5173'
const stripeSecret = process.env.STRIPE_SECRET_KEY

app.use(
  cors({
    origin: [domain, 'http://localhost:5173', 'http://localhost:5174'],
  }),
)
app.use(express.json())

app.get('/health', (_req, res) => res.json({ ok: true }))

app.get('/ical', async (req, res) => {
  const { url } = req.query
  if (!url) return res.status(400).json({ message: 'Missing iCal URL' })
  try {
    const response = await fetch(url)
    const text = await response.text()
    res.setHeader('Content-Type', 'text/calendar')
    res.send(text)
  } catch (error) {
    console.error('iCal proxy error', error)
    res.status(500).json({ message: 'Unable to proxy iCal feed' })
  }
})

app.post('/create-checkout-session', async (req, res) => {
  if (!stripeSecret) {
    return res.status(400).json({ message: 'Stripe secret key missing on server.' })
  }

  const stripe = new Stripe(stripeSecret)
  const { propertyId, propertySlug, propertyName, dates, guests, total } = req.body

  if (!propertyId || !dates?.checkIn || !dates?.checkOut || !total) {
    return res.status(400).json({ message: 'Invalid booking payload.' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${domain}/properties/${propertySlug || propertyId}?status=success`,
      cancel_url: `${domain}/properties/${propertySlug || propertyId}?status=cancelled`,
      customer_email: req.body.email,
      metadata: {
        propertyId,
        propertyName,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        guests,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: propertyName || 'Curated BNB stay',
              description: `Guests: ${guests}`,
            },
            unit_amount: Math.round(Number(total) * 100),
          },
          quantity: 1,
        },
      ],
    })

    res.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe error', error)
    res.status(500).json({ message: 'Unable to start checkout.' })
  }
})

app.listen(port, () => {
  console.log(`Payment server running on ${port}`)
})
