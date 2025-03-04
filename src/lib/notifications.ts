import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { database, ref, update } from '@/firebase'
interface User {
  _id: ObjectId
  name?: string
}

export async function addNotification(
  userId: string,
  action: string,
  type: string,
) {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const usersCollection = db.collection('users')
    const inactiveUsersCollection = db.collection('inactive-accounts')
    const notificationsCollection = db.collection('notifications')

    let user: User | null = null
    let inactiveUser: User | null = null

    if (type === 'account_deletion') {
      inactiveUser = await inactiveUsersCollection.findOne({
        _id: new ObjectId(userId),
      })
    } else {
      user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    }

    if (type === 'account_deletion' && !inactiveUser) {
      console.error('Inactive user not found for notification.')
      return
    }

    if (type !== 'account_deletion' && !user) {
      console.error('User not found for notification.')
      return
    }

    // Ensure userName is safely accessed
    const userName = inactiveUser?.name ?? user?.name ?? 'Unknown User'

    let message = ''
    switch (type) {
      case 'user_registration':
        message = `New user <b>${userName}</b> registered on the platform.`
        break
      case 'profile_update':
        message = `<b>${userName}</b> updated their profile information.`
        break
      case 'account_deletion':
        message = `<b>${userName}</b> deleted their account.`
        break
      case 'file_download':
        message = `<b>${userName}</b> downloaded "${action}" file.`
        break
      case 'free_subscription':
        message = `<b>${userName}</b> subscribed to a free subscription plan.`
        break
      case 'subscription_upgrade':
        message = `<b>${userName}</b> upgraded their subscription plan from ${action}.`
        break
      case 'basic_subscription':
        message = `<b>${userName}</b> subscribed to the basic subscription plan.`
        break
      default:
        message = `<b>${userName}</b> performed an action.`
    }

    const notificationData = {
      userId: new ObjectId(userId),
      message,
      type,
      createdAt: new Date(),
    }

    await notificationsCollection.insertOne(notificationData)
    console.log('Notification added successfully:', message)

    const notificationRef = ref(database, 'notifications')
    await update(notificationRef, { isNewNotification: true })
  } catch (error) {
    console.error('Error adding notification:', error)
  }
}
