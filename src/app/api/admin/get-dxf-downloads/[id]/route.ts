import { NextResponse } from 'next/server'
import { ObjectId, Filter } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { NextRequest } from 'next/server'

interface Downloads {
  _id: ObjectId
  user_id: ObjectId
  file_name: string
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid User ID format' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const userIdObject = new ObjectId(id)

    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const skip = (page - 1) * limit
    const searchQuery = url.searchParams.get('search') || ''
    let filter: Filter<Downloads> = { user_id: userIdObject }

    if (searchQuery) {
      const searchRegex = { $regex: searchQuery, $options: 'i' }
      filter = {
        ...filter,
        $or: [{ file_name: searchRegex }, { downloaded_on: searchRegex }],
      }
    }

    const downloads = await db
      .collection<Downloads>('all-downloads')
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray()

    const totalDxfDownloads = await db
      .collection<Downloads>('all-downloads')
      .countDocuments(filter)

    return NextResponse.json(
      {
        downloads,
        totalDxfDownloads,
        page,
        totalPages: Math.ceil(totalDxfDownloads / limit),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  }
}
