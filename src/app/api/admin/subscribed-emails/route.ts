import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { NextRequest } from 'next/server'

interface Emails {
  _id: ObjectId
  email: string
  createdAt: string
}

interface Filter {
  email?: { $regex: string; $options: string }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const skip = (page - 1) * limit
    const searchQuery = url.searchParams.get('search') || ''

    let filter: Filter = {}

    if (searchQuery) {
      const searchRegex = { $regex: searchQuery, $options: 'i' }
      filter = { email: searchRegex }
    }

    const emails = await db
      .collection<Emails>('promotions')
      .find(filter)
      .sort({ createdAt: -1, _id: -1 }) // Sort by creation time (latest first) and tie-breaker on _id
      .skip(skip)
      .limit(limit)
      .toArray()

    const totalEmails = await db
      .collection<Emails>('promotions')
      .countDocuments(filter)

    return NextResponse.json(
      {
        emails,
        totalEmails,
        page,
        totalPages: Math.ceil(totalEmails / limit),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching subscribed emails:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  }
}
