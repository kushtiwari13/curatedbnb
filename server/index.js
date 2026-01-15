import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

const app = express()
const port = process.env.PORT || 4242
const domain = process.env.DOMAIN || process.env.CLIENT_URL || 'http://localhost:5173'
const razorpayKeyId = 'rzp_test_S2ZvLKm3aet64B'
const razorpayKeySecret = 'ttl0eZaZFxqBuRCDIFmlPEOp'

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

app.post('/create-order', async (req, res) => {
  if (!razorpayKeyId || !razorpayKeySecret) {
    return res.status(400).json({ message: 'Razorpay keys missing on server.' })
  }

  const { propertyId, propertyName, dates, guests, total } = req.body

  if (!propertyId || !dates?.checkIn || !dates?.checkOut || !total) {
    return res.status(400).json({ message: 'Invalid booking payload.' })
  }

  const amount = Math.round(Number(total) * 100)
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Invalid booking amount.' })
  }

  try {
    const auth = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64')
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        receipt: `curatedbnb_${Date.now()}`,
        notes: {
          propertyId,
          propertyName,
          checkIn: dates.checkIn,
          checkOut: dates.checkOut,
          guests,
        },
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Razorpay order error', text)
      return res.status(502).json({ message: 'Unable to create Razorpay order.' })
    }

    const order = await response.json()
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Razorpay order error', error)
    res.status(500).json({ message: 'Unable to create Razorpay order.' })
  }
})

app.post('/verify-payment', (req, res) => {
  if (!razorpayKeySecret) {
    return res.status(400).json({ message: 'Razorpay key secret missing on server.' })
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Missing payment verification fields.' })
  }

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`
  const expected = crypto.createHmac('sha256', razorpayKeySecret).update(payload).digest('hex')

  if (expected !== razorpay_signature) {
    return res.status(400).json({ message: 'Invalid payment signature.' })
  }

  res.json({ status: 'success', paymentId: razorpay_payment_id })
})

app.listen(port, () => {
  console.log(`Payment server running on ${port}`)
})
