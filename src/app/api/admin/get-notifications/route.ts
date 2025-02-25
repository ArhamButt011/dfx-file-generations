import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

interface Notification {
  _id: ObjectId
  userId: ObjectId
  message: string
  type: string
  isReadable: boolean
  createdAt: Date
}

interface User {
  _id: ObjectId
  name: string
  email: string
  image: string
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const notificationsCollection = db.collection<Notification>('notifications')
    const usersCollection = db.collection<User>('users')

    const users = await usersCollection.find().toArray()
    const allNotifications: Array<{
      _id: ObjectId
      user_id: ObjectId
      user_name: string
      email: string
      image: string
      message: string
      type: string
      isReadable: boolean
      createdAt: Date
    }> = []

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

    allNotifications.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

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
