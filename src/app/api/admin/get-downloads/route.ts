import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { NextRequest } from 'next/server'
import { ObjectId, Filter } from 'mongodb'

interface Downloads {
  file_name?: string
  _id: ObjectId
  downloaded_on?: string
}

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const skip = (page - 1) * limit
    const searchQuery = url.searchParams.get('search') || ''

    const users = await db.collection('users').find().toArray()
    const allDownloads = []

    for (const user of users) {
      let filter: Filter<Downloads> = { user_id: user._id }

      if (searchQuery) {
        const searchRegex = { $regex: searchQuery, $options: 'i' }
        filter = {
          ...filter,
          $or: [{ file_name: searchRegex }, { downloaded_on: searchRegex }],
        }

        if (
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          filter = { user_id: user._id }
        }
      }

      const downloads = await db
        .collection('all-downloads')
        .find(filter)
        .sort({ downloaded_on: -1 })
        .toArray()

      if (downloads.length > 0) {
        allDownloads.push(
          ...downloads.map((download) => ({
            user_id: user._id,
            user_name: user.name,
            email: user.email,
            image: user.image,
            file_name: download.file_name,
            downloaded_on: download.downloaded_on,
          })),
        )
      }
    }

    allDownloads.sort(
      (a, b) =>
        new Date(b.downloaded_on).getTime() -
        new Date(a.downloaded_on).getTime(),
    )

    const paginatedDownloads = allDownloads.slice(skip, skip + limit)
    const totalDownloads = allDownloads.length

    return NextResponse.json(
      {
        allDownloads: paginatedDownloads,
        totalDownloads,
        page,
        totalPages: Math.ceil(totalDownloads / limit),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching downloads:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  }
}
