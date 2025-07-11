import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { headers } from 'next/headers'
import { ObjectId } from 'mongodb'
import { sendSubscriptionEmail } from '@/lib/subscription-email'
import { addNotification } from '@/lib/notifications'

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
    console.error('Error in webhook route:', err)
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

      // Check if the user already has an active free plan
      const existingFreePlan = await db
        .collection('all-subscriptions')
        .findOne({
          user_id: objectUserId,
          plan_name: 'Free',
          status: 'Current',
        })

      if (existingFreePlan) {
        await db.collection('all-subscriptions').updateOne(
          { _id: existingFreePlan._id },
          {
            $set: {
              status: 'Past',
              expiry_on: nowUTC.toISOString(),
              expiry_date: nowUTC,
            },
          },
        )
      }

      await db.collection('all-subscriptions').insertOne({
        user_id: objectUserId,
        customer_id,
        plan_name,
        subscription_id,
        charges: total,
        duration: 'Monthly',
        status: 'Current',
        added_on: nowUTC.toISOString(),
        expiry_on: expiryUTC.toISOString(),
        added_date: nowUTC,
        expiry_date: expiryUTC,
      })

      // Send confirmation email
      await sendSubscriptionEmail(
        user_email,
        plan_name,
        formattedExpiryDate,
        formattedAddedDate,
        total,
        subTotal,
        user_name,
      )

      await addNotification(user_id, '', 'basic_subscription')

      return NextResponse.json({ received: true })
    } catch (err) {
      return NextResponse.json(
        { error: 'Database insert failed', err },
        { status: 500 },
      )
    }
  } else if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const subscriptionId = subscription.id
    const customer_id = subscription.customer as string
    const cancelingDate = subscription.canceled_at ?? 0

    if (!cancelingDate || !subscriptionId || !customer_id) {
      return NextResponse.json(
        {
          error: 'Missing cancelingDate, subscription_id, or customer_id',
        },
        { status: 400 },
      )
    }
    function formatDateToISO(date: number): string {
      return new Date(date * 1000).toISOString()
    }

    const expiryOn = formatDateToISO(cancelingDate)
    const expiryDate = new Date(cancelingDate * 1000)

    try {
      const client = await clientPromise
      const db = client.db('DFXFileGeneration')

      await db.collection('all-subscriptions').updateOne(
        {
          subscription_id: subscriptionId,
          status: 'Current',
        },
        {
          $set: {
            status: 'Canceled',
            expiry_on: expiryOn,
            expiry_date: expiryDate,
          },
        },
      )

      return NextResponse.json({ received: true })
    } catch (err) {
      return NextResponse.json(
        { error: 'Database update failed', err },
        { status: 500 },
      )
    }
  } else if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice
    const subscriptionId = invoice.subscription as string
    const customerId = invoice.customer as string
    const invoiceId = invoice.id
    const total = invoice.amount_paid / 100
    const billingReason = invoice.billing_reason
    const startDate = new Date(invoice.lines.data[0].period.start * 1000)
    const endDate = new Date(invoice.lines.data[0].period.end * 1000)

    try {
      const client = await clientPromise
      const db = client.db('DFXFileGeneration')

      // Fetch user_id and plan_name using subscription_id
      const existingSubscription = await db
        .collection('all-subscriptions')
        .findOne({
          subscription_id: subscriptionId,
        })

      if (!existingSubscription) {
        return NextResponse.json(
          { error: 'Subscription not found' },
          { status: 404 },
        )
      }

      const user_id = existingSubscription.user_id
      const plan_name = existingSubscription.plan_name

      if (billingReason === 'subscription_cycle') {
        await db.collection('all-subscriptions').updateOne(
          { subscription_id: subscriptionId, status: 'Current' },
          {
            $set: {
              status: 'Past',
              expiry_on: startDate.toISOString(),
              expiry_date: startDate,
            },
          },
        )
      } else if (billingReason === 'subscription_create') {
        return NextResponse.json({ received: true })
      }

      await db.collection('all-subscriptions').insertOne({
        user_id,
        customer_id: customerId,
        plan_name,
        subscription_id: subscriptionId,
        charges: total,
        duration: 'Monthly',
        status: 'Current',
        added_on: startDate.toISOString(),
        expiry_on: endDate.toISOString(),
        added_date: startDate,
        expiry_date: endDate,
        invoice_id: invoiceId,
      })

      return NextResponse.json({ received: true })
    } catch (err) {
      console.error('Database update failed:', err)
      return NextResponse.json(
        { error: 'Database update failed', err },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ received: true })
}
