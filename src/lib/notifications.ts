import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { database, ref, update } from '@/firebase' // Import Firebase

export async function addNotification(
  userId: string,
  action: string,
  type: string,
  // isReadable: boolean = false,
) {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const usersCollection = db.collection('users')
    const notificationsCollection = db.collection('notifications')

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (!user) {
      console.error('User not found for notification.')
      return
    }

    const userName = user.name

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
      default:
        message = `<b>${userName}</b> performed an action.`
    }

    // ✅ Insert Notification into MongoDB
    const notificationData = {
      userId: new ObjectId(userId),
      message,
      type,

      createdAt: new Date(),
    }

    await notificationsCollection.insertOne(notificationData)
    console.log('Notification added successfully:', message)

    // ✅ Update Firebase Global `isNewNotification` Field
    const notificationRef = ref(database, 'notifications') // Fixed path
    await update(notificationRef, { isNewNotification: true })

    console.log(`Updated isNewNotification to true globally`)
  } catch (error) {
    console.error('Error adding notification:', error)
  }
}
