import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const subscriptionsCollection = db.collection('all-subscriptions')

    const basicCount = await subscriptionsCollection.countDocuments({
      plan_name: 'Basic',
    })
    const freeCount = await subscriptionsCollection.countDocuments({
      plan_name: 'Free',
    })
    const premiumCount = await subscriptionsCollection.countDocuments({
      plan_name: 'Premium',
    })

    const totalSubscriptions = basicCount + freeCount + premiumCount

    const calculatePercentage = (count: number, total: number): number =>
      total > 0 ? parseFloat(((count / total) * 100).toFixed(2)) : 0

    const subscriptionPercentages = [
      calculatePercentage(basicCount, totalSubscriptions),
      calculatePercentage(freeCount, totalSubscriptions),
      calculatePercentage(premiumCount, totalSubscriptions),
    ]
    const subscriptionCount = [basicCount, freeCount, premiumCount]

    return NextResponse.json({
      success: true,
      subscriptionsPercentage: subscriptionPercentages,
      subscriptions: subscriptionCount,
      totalSubscriptions,
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
