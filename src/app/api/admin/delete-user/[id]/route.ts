import { NextResponse, NextRequest } from 'next/server'
import { ObjectId, ClientSession } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export async function DELETE(req: NextRequest) {
  let session: ClientSession | undefined // ✅ Change null to undefined

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
    const notificationsCollection = db.collection('notifications')

    // Start a session
    session = client.startSession()

    await session.withTransaction(async () => {
      // ✅ Delete related data first
      await downloadsCollection.deleteMany(
        { user_id: new ObjectId(id) },
        { session },
      )
      await subscriptionsCollection.deleteMany(
        { user_id: new ObjectId(id) },
        { session },
      )
      await cardsCollection.deleteMany(
        { user_id: new ObjectId(id) },
        { session },
      )
      await notificationsCollection.deleteMany(
        { userId: new ObjectId(id) },
        { session },
      )

      // ✅ Delete from parent table
      const result = await usersCollection.deleteOne(
        { _id: new ObjectId(id) },
        { session },
      )

      if (result.deletedCount === 0) {
        throw new Error('User not found') // Trigger rollback
      }
    })

    return NextResponse.json(
      { message: 'User and related data deleted successfully.' },
      { status: 200 },
    )
  } catch (error) {
    console.log('Error deleting user:', error)

    if (session) {
      await session.abortTransaction() // ✅ Rollback changes if any step fails
    }

    return NextResponse.json(
      { error: 'Failed to delete user and related data.' },
      { status: 500 },
    )
  } finally {
    if (session) {
      await session.endSession() // ✅ Clean up session
    }
  }
}
