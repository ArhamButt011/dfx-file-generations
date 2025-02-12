import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { NextRequest } from 'next/server'

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

    // Convert id to ObjectId for cards collection query
    const userIdObject = new ObjectId(id)

    // Fetch all card details for the user
    const subscriptions = await db
      .collection('subscriptions')
      .find({ user_id: userIdObject })
      .toArray()

    if (!subscriptions) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 },
      )
    }

    // Return the merged data
    return NextResponse.json(
      {
        subscriptions,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching subscriptions details:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  }
}
