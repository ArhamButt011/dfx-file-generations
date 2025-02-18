import { NextResponse, NextRequest } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID.' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const usersCollection = db.collection('users')
    const downloadsCollection = db.collection('all-downloads')
    const subscriptionsCollection = db.collection('all-subscriptions')
    const cardsCollection = db.collection('cards')

    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    await downloadsCollection.deleteMany({ user_id: new ObjectId(id) })

    await subscriptionsCollection.deleteMany({ user_id: new ObjectId(id) })

    await cardsCollection.deleteMany({ user_id: new ObjectId(id) })

    return NextResponse.json(
      { message: 'User and related data deleted successfully.' },
      { status: 200 },
    )
  } catch (error) {
    console.log('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user.' },
      { status: 500 },
    )
  }
}
