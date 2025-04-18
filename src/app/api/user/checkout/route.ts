import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { price_id, user_id, plan_name } = body

    if (!price_id) {
      return new Response(
        JSON.stringify({ message: 'Missing Stripe price ID' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      //   customer_creation: 'always',
      success_url: `${origin}/Generate_DXF`,
      cancel_url: `${origin}/subscription`,
      customer_email: body.email,
      metadata: {
        user_id: user_id,
        plan_name: plan_name,
      },
      // payment_intent_data: {
      //   setup_future_usage: 'off_session',
      // },
    })

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Stripe Checkout Error:', error)

    const errorMessage =
      error instanceof Error ? error.message : 'Something went wrong'
    return new Response(
      JSON.stringify({
        message: errorMessage,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
