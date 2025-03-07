import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop()
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid User ID format' },
        { status: 400 },
      )
    }
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const files = await db
      .collection('all-downloads')
      .findOne({ _id: new ObjectId(id) })

    return files
      ? NextResponse.json(files, { status: 200 })
      : NextResponse.json({ error: 'User not found' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
