import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { addNotification } from '@/lib/notifications'

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ message: 'Id is required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const objectId = new ObjectId(id)

    const user = await db.collection('users').findOne({ _id: objectId })

    if (!user) {
      return NextResponse.json(
        { message: 'User Does not Exist' },
        { status: 400 },
      )
    }

    const userData = {
      userId: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }

    const notificationData = {
      userId: objectId,
      message: `<b>${userData.name}</b> deleted their account.`,
      type: 'account_deletion',
      userData,
      createdAt: new Date(),
    }

    await db.collection('notifications').insertOne(notificationData)

    await addNotification(id, '', 'account_deletion')

    await db.collection('all-downloads').deleteMany({ user_id: objectId })
    await db.collection('all-subscriptions').deleteMany({ user_id: objectId })
    await db.collection('notifications').deleteMany({ user_id: objectId })
    const deleteResult = await db
      .collection('users')
      .deleteOne({ _id: objectId })

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'User Does not Exist' },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'User Deleted successfully' },
      { status: 201 },
    )
  } catch (error) {
    console.log('Error Deleting File:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
