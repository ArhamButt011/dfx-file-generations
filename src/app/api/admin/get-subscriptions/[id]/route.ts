import { NextResponse } from 'next/server'
import { ObjectId, Filter } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { NextRequest } from 'next/server'

interface Subscription {
  _id: ObjectId
  user_id: ObjectId
  plan_name: string
  status: string
  added_on?: string
  expiry_date?: string
  duration?: string
  charges?: number
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid User ID format' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const userIdObject = new ObjectId(id)

    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const skip = (page - 1) * limit

    const searchQuery = url.searchParams.get('search') || ''
    let filter: Filter<Subscription> = { user_id: userIdObject }

    if (searchQuery) {
      const searchRegex = { $regex: searchQuery, $options: 'i' }
      const searchNumber = parseFloat(searchQuery)

      filter = {
        ...filter,
        $or: [
          { plan_name: searchRegex },
          { added_on: searchRegex },
          { expiry_date: searchRegex },
          { duration: searchRegex },
          ...(isNaN(searchNumber) ? [] : [{ charges: searchNumber }]),
        ],
      }
    }

    const subscriptions = await db
      .collection<Subscription>('all-subscriptions')
      .find(filter)
      .sort({ added_on: -1 })
      .toArray()

    const currentDate = new Date()

    subscriptions.forEach((subscription) => {
      if (
        subscription.status === 'Current' &&
        subscription.expiry_date &&
        new Date(subscription.expiry_date) < currentDate
      ) {
        subscription.status = 'Past'
      }
    })

    subscriptions.sort(
      (a, b) =>
        new Date(b.added_on || '').getTime() -
        new Date(a.added_on || '').getTime(),
    )

    const paginatedSubscriptions = subscriptions.slice(skip, skip + limit)

    const totalSubscriptions = subscriptions.length

    return NextResponse.json(
      {
        subscriptions: paginatedSubscriptions,
        totalSubscriptions,
        page,
        totalPages: Math.ceil(totalSubscriptions / limit),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  }
}
