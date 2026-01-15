const paymentMode = import.meta.env.VITE_PAYMENT_MODE || 'stub'
const razorpayKeyId = 'rzp_test_S2ZvLKm3aet64B'

const loadRazorpay = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK.'))
    document.body.appendChild(script)
  })

export const initiatePayment = async (bookingPayload) => {
  if (paymentMode === 'stub') {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    return { status: 'success', reference: `STUB-${Date.now()}` }
  }

  if (paymentMode !== 'razorpay') {
    throw new Error('Unsupported payment mode. Set VITE_PAYMENT_MODE=razorpay.')
  }

  if (!razorpayKeyId) {
    throw new Error('Razorpay key id missing. Set VITE_RAZORPAY_KEY_ID.')
  }

  await loadRazorpay()

  const orderResponse = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingPayload),
  })

  if (!orderResponse.ok) {
    throw new Error('Unable to create Razorpay order. Check server logs.')
  }

  const order = await orderResponse.json()

  return new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      key: razorpayKeyId,
      amount: order.amount,
      currency: order.currency,
      name: 'Curated BNB',
      description: bookingPayload.propertyName || 'Curated stay',
      order_id: order.orderId,
      prefill: {
        name: bookingPayload.guest?.name || '',
        email: bookingPayload.guest?.email || '',
      },
      handler: async (response) => {
        try {
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...response,
              booking: bookingPayload,
            }),
          })

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed.')
          }

          const verified = await verifyResponse.json()
          resolve({
            status: 'success',
            reference: response.razorpay_payment_id,
            downloadUrl: verified?.downloadUrl,
            calendarUrl: verified?.calendarUrl,
            emailSentTo: verified?.emailSentTo,
          })
        } catch (error) {
          reject(error)
        }
      },
      modal: {
        ondismiss: () => reject(new Error('Payment cancelled.')),
      },
      theme: {
        color: '#c8a45a',
      },
    })

    checkout.open()
  })
}
