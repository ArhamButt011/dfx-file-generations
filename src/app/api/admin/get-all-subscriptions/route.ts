import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { NextRequest } from 'next/server'
import { ObjectId, Filter } from 'mongodb'

interface Subscriptions {
  _id?: ObjectId
  plan_name?: string
  added_on?: string
  duration?: string
  user_id?: ObjectId
  expiry_date?: string
  charges?: number
}

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const skip = (page - 1) * limit
    const searchQuery = url.searchParams.get('search') || ''

    const users = await db.collection('users').find().toArray()
    const allDownloads = []

    for (const user of users) {
      let filter: Filter<Subscriptions> = {
        user_id: user._id,
      }

      if (searchQuery) {
        const searchRegex = { $regex: searchQuery, $options: 'i' }
        const searchNumber = parseFloat(searchQuery)

        filter = {
          ...filter,
          $or: [
            { plan_name: searchRegex },
            { added_on: searchRegex },
            { expiry_on: searchRegex },
            { duration: searchRegex },
            ...(isNaN(searchNumber) ? [] : [{ charges: searchNumber }]),
          ],
        }

        if (
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          filter = { user_id: user._id }
        }
      }

      const subscription = await db
        .collection('all-subscriptions')
        .find(filter)
        .sort({ added_on: -1 })
        .toArray()

      if (subscription.length > 0) {
        allDownloads.push(
          ...subscription.map((subscription) => ({
            user_id: user._id,
            user_name: user.name,
            email: user.email,
            image: user.image,
            plan_name: subscription.plan_name,
            status: subscription.status,
            duration: subscription.duration,
            added_on: subscription.added_on,
            expiry_on: subscription.expiry_on,
            expiry_date: subscription.expiry_date,
            charges: subscription.charges,
          })),
        )
      }
    }
    allDownloads.sort(
      (a, b) => new Date(b.added_on).getTime() - new Date(a.added_on).getTime(),
    )

    const paginatedSubscriptions = allDownloads.slice(skip, skip + limit)

    const totalSubscriptions = allDownloads.length

    return NextResponse.json(
      {
        allSubscriptions: paginatedSubscriptions,
        totalSubscriptions,
        page,
        totalPages: Math.ceil(totalSubscriptions / limit),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching downloads:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  }
}
