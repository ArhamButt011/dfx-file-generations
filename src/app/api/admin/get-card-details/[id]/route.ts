import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: 'Invalid User ID format' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    // Fetch user details based on _id
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Fetch all card details for the user
    const cards = await db
      .collection('cards')
      .find({ user_id: userId })
      .toArray()

    // Return the merged data
    return NextResponse.json(
      {
        ...user,
        cards,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching user and card details:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  }
}
