import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb' // Adjust path based on your project structure

export async function PUT() {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const notificationsCollection = db.collection('notifications')

    await notificationsCollection.updateMany(
      { isReadable: false },
      { $set: { isReadable: true } },
    )

    return NextResponse.json({
      success: true,
      message: 'Notifications updated successfully',
      //   modifiedCount: result.modifiedCount,
    })
  } catch (error) {
    console.error('Error updating notifications:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}
