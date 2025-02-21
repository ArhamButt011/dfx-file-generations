import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function addNotification(
  userId: string,
  action: string,
  type: string,
  isReadable: boolean = false,
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
        message = `<span style="color: #00000066;">New user </span>
                   <b style="color: #000000;">${userName}</b>
                   <span style="color: #00000066;"> registered on the platform.</span>`
        break
      case 'profile_update':
        message = `<span style="color: #000000;">${userName}</span>
                   <span style="color: #00000066;"> updated their profile information.</span>`
        break
      case 'account_deletion':
        message = `<span style="color: #000000;">${userName}</span>
                   <span style="color: #00000066;"> deleted their account.</span>`
        break
      case 'file_download':
        message = `<span style="color: #000000;">${userName}</span>
                   <span style="color: #00000066;"> downloaded "${action}" file.</span>`
        break
      case 'free_subscription':
        message = `<span style="color: #000000;">${userName}</span>
                   <span style="color: #00000066;"> subscribed to a free subscription plan.</span>`
        break
      case 'subscription_upgrade':
        message = `<span style="color: #000000;">${userName}</span>
                   <span style="color: #00000066;"> upgraded their subscription plan from ${action}.</span>`
        break
      default:
        message = `<span style="color: #000000;">${userName}</span>
                   <span style="color: #00000066;"> performed an action.</span>`
    }

    const notificationData = {
      userId: new ObjectId(userId),
      message,
      type,
      isReadable,
      createdAt: new Date(),
    }

    await notificationsCollection.insertOne(notificationData)

    console.log('Notification added successfully:', message)
  } catch (error) {
    console.error('Error adding notification:', error)
  }
}
