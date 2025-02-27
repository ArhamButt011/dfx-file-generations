import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { headers } from 'next/headers'
import { ObjectId } from 'mongodb'
import { sendSubscriptionEmail } from '@/lib/subscription-email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = (await headers()).get('Stripe-Signature') as string

  if (!sig) {
    return new NextResponse(JSON.stringify({ error: 'Missing signature' }), {
      status: 400,
    })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('Error in webhook route:', err) // Log the error
    return new NextResponse(JSON.stringify({ error: 'Invalid signature' }), {
      status: 400,
    })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const user_id = session.metadata?.user_id
    const plan_name = session.metadata?.plan_name
    const subscription_id = session.subscription as string
    const customer_id = session.customer as string
    const user_email = session.customer_email || session.customer_details?.email
    const total = (session.amount_total ?? 0) / 100
    const subTotal = (session.amount_subtotal ?? 0) / 100
    const user_name: string = session.customer_details?.name ?? 'Unknown User'

    if (
      !user_id ||
      !plan_name ||
      !subscription_id ||
      !customer_id ||
      !user_email
    ) {
      return NextResponse.json(
        {
          error: 'Missing user_id, plan_name, subscription_id, or customer_id',
        },
        { status: 400 },
      )
    }

    let objectUserId
    try {
      objectUserId = new ObjectId(user_id)
    } catch (err) {
      console.error('Error in webhook route:', err)
      return NextResponse.json(
        { error: 'Invalid user_id format' },
        { status: 400 },
      )
    }

    const nowUTC = new Date()
    const expiryUTC = new Date(nowUTC)
    expiryUTC.setMonth(expiryUTC.getMonth() + 1)

    function formatDate(date: Date): string {
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }

    const formattedAddedDate = formatDate(nowUTC)
    const formattedExpiryDate = formatDate(expiryUTC)

    try {
      const client = await clientPromise
      const db = client.db('DFXFileGeneration')

      const latestSubscription = await db
        .collection('all-subscriptions')
        .findOne(
          { user_id: objectUserId, status: 'active' },
          { sort: { added_on: -1 } },
        )

      if (latestSubscription) {
        console.log('Found latest active subscription:', latestSubscription)

        await db.collection('all-subscriptions').updateOne(
          { _id: latestSubscription._id },
          {
            $set: {
              expiry_on: nowUTC.toISOString(),
              expiry_date: nowUTC,
              status: 'expired',
            },
          },
        )
        console.log('Updated previous subscription to expired')
      } else {
        console.log(
          'No previous active subscription found. Creating a new one.',
        )
      }

      await db.collection('all-subscriptions').insertOne({
        user_id: objectUserId,
        customer_id,
        plan_name,
        subscription_id,
        charges: total,
        duration: 'Monthly',
        status: 'active',
        added_on: nowUTC.toISOString(),
        expiry_on: expiryUTC.toISOString(),
        added_date: nowUTC,
        expiry_date: expiryUTC,
      })
      await sendSubscriptionEmail(
        user_email,
        plan_name,
        formattedExpiryDate,
        formattedAddedDate,
        total,
        subTotal,
        user_name,
      )
      return NextResponse.json({ received: true })
    } catch (err) {
      return NextResponse.json(
        { error: 'Database insert failed', err },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ received: true })
}
