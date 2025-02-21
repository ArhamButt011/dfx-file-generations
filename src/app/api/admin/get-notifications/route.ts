import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const notificationsCollection = db.collection('notifications')
    const users = await db.collection('users').find().toArray()
    const allNotifications = []

    for (const user of users) {
      const filter = { userId: user._id }

      const notifications = await notificationsCollection
        .find(filter)
        .sort({ createdAt: -1 })
        .toArray()

      if (notifications.length > 0) {
        allNotifications.push(
          ...notifications.map((not) => ({
            _id: not._id,
            user_id: user._id,
            user_name: user.name,
            email: user.email,
            image: user.image,
            message: not.message,
            type: not.type,
            isReadable: not.isReadable,
            createdAt: not.createdAt,
          })),
        )
      }
    }

    return NextResponse.json({
      allNotifications,
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({
      status: 'fail',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
