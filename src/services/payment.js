import { loadStripe } from '@stripe/stripe-js'

const paymentMode = import.meta.env.VITE_PAYMENT_MODE || 'stub'
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

export const initiatePayment = async (bookingPayload) => {
  if (paymentMode === 'stub') {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    return { status: 'success', reference: `STUB-${Date.now()}` }
  }

  if (!publishableKey) {
    throw new Error('Stripe publishable key missing. Set VITE_STRIPE_PUBLISHABLE_KEY.')
  }

  const stripe = await loadStripe(publishableKey)
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingPayload),
  })

  if (!response.ok) {
    throw new Error('Unable to create checkout session. Check server logs.')
  }

  const { sessionId } = await response.json()
  const { error } = await stripe.redirectToCheckout({ sessionId })

  if (error) throw error
  return { status: 'redirecting' }
}
