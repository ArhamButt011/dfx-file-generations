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

    const inactiveUserData = {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      image: user.image,
      password: user.password,
      otp: user.otp,
      is_verified: user.is_verified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: new Date(),
    }

    await db.collection('inactive-accounts').insertOne(inactiveUserData)
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
      { message: 'User deleted successfully and moved to inactive accounts' },
      { status: 201 },
    )
  } catch (error) {
    console.log('Error Deleting User:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
