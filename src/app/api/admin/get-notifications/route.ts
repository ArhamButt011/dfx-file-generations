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
    const inactiveUsersCollection = db.collection<User>('inactive-accounts')

    const activeUsers = await usersCollection.find().toArray()
    const inactiveUsers = await inactiveUsersCollection.find().toArray()

    const userMap = new Map<string, User>()
    activeUsers.forEach((user) => userMap.set(user._id.toString(), user))
    inactiveUsers.forEach((user) => userMap.set(user._id.toString(), user))

    const notifications = await notificationsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray()

    const allNotifications = notifications.map((not) => {
      const user = userMap.get(not.userId.toString())

      return {
        _id: not._id,
        user_id: not.userId,
        user_name: user?.name || 'Unknown User',
        email: user?.email || '',
        image: user?.image || '',
        message: not.message,
        type: not.type,
        isReadable: not.isReadable,
        createdAt: not.createdAt,
      }
    })

    return NextResponse.json({ allNotifications })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({
      status: 'fail',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
