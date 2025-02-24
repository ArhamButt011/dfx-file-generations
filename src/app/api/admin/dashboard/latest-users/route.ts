import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Db, Collection } from 'mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db: Db = client.db('DFXFileGeneration')
    const usersCollection: Collection = db.collection('users')

    const latestUsers = await usersCollection
      .find({ is_verified: true, role: 'user' })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()

    return NextResponse.json({ success: true, data: latestUsers })
  } catch (error) {
    console.error('Error fetching latest users:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
