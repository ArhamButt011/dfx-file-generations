import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: Request) {
  const body = await req.json()
  const { subscription_id } = body

  if (!subscription_id) {
    return new Response(
      JSON.stringify({ message: 'Missing subscription ID' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  try {
    await stripe.subscriptions.cancel(subscription_id)
    return new Response(
      JSON.stringify({ success: true, message: 'Subscription canceled' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (err) {
    console.error('Error canceling subscription:', err)
    return new Response(
      JSON.stringify({ message: 'Error canceling subscription' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
