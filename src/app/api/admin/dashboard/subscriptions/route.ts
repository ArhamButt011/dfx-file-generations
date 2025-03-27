import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const subscriptionsCollection = db.collection('all-subscriptions')

    const aggregationPipeline = [
      {
        $group: {
          _id: '$plan_name',
          count: { $sum: 1 },
        },
      },
    ]

    const subscriptionData = await subscriptionsCollection
      .aggregate(aggregationPipeline)
      .toArray()

    const subscriptionCounts: Record<string, number> = {
      Basic: 0,
      Free: 0,
      Premium: 0,
    }

    subscriptionData.forEach(({ _id, count }) => {
      if (_id in subscriptionCounts) {
        subscriptionCounts[_id] = count
      }
    })

    const { Basic, Free, Premium } = subscriptionCounts
    const totalSubscriptions = Basic + Free + Premium

    const calculatePercentage = (count: number, total: number): number =>
      total > 0 ? parseFloat(((count / total) * 100).toFixed(2)) : 0

    return NextResponse.json({
      success: true,
      subscriptionsPercentage: [
        calculatePercentage(Basic, totalSubscriptions),
        calculatePercentage(Free, totalSubscriptions),
        calculatePercentage(Premium, totalSubscriptions),
      ],
      subscriptions: [Basic, Free, Premium],
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
