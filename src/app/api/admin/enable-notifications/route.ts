import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { NextRequest } from 'next/server'

export async function PUT(req: NextRequest) {
  try {
    const { isActive } = await req.json()

    if (typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'Please provide a valid isActive status' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const notificationsCollection = db.collection('enable-notifications')

    // Update the single document (assumes only one document exists)
    const updateResult = await notificationsCollection.updateOne(
      {},
      { $set: { isActive } },
    )

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Failed to update isActive status' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: 'Notification status updated successfully', isActive },
      { status: 200 },
    )
  } catch (error) {
    console.error(`Error updating notification status: ${error}`)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  }
}
