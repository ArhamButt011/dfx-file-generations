import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const enableNotificationsCollection = db.collection('enable-notifications')

    // Fetch the document (assuming only one document exists)
    const enableNotification = await enableNotificationsCollection.findOne({})

    // Check if the document exists
    if (!enableNotification) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 })
    }

    return NextResponse.json(enableNotification, { status: 200 }) // ✅ Returning only the fetched document
  } catch (error) {
    console.error('Error fetching enable notifications:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  }
}
