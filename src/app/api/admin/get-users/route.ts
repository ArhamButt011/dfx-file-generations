import { NextResponse } from 'next/server'
import { Filter } from 'mongodb'
import clientPromise from '@/lib/mongodb'

interface User {
  name?: string
  email?: string
}

export async function GET(req: Request) {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const usersCollection = db.collection('users')
    const downloadsCollection = db.collection('all-downloads')
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const skip = (page - 1) * limit
    const searchQuery = url.searchParams.get('search') || ''
    let filter: Filter<User> = { role: 'user' }

    if (searchQuery) {
      const searchRegex = { $regex: searchQuery, $options: 'i' }
      filter = {
        ...filter,
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { createdAt: searchRegex },
        ],
      }
    }

    const users = await usersCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    const totalUsers = await usersCollection.countDocuments(filter)
    const userIds = users.map((user) => user._id)
    const downloads = await downloadsCollection
      .aggregate([
        { $match: { user_id: { $in: userIds } } },
        { $group: { _id: '$user_id', count: { $sum: 1 } } },
      ])
      .toArray()

    const downloadsMap = downloads.reduce((acc, curr) => {
      acc[curr._id.toString()] = curr.count
      return acc
    }, {} as Record<string, number>)

    // Attach download count to users
    const usersWithDownloadCount = users.map((user) => ({
      ...user,
      downloadsCount: downloadsMap[user._id.toString()] || 0,
    }))

    return NextResponse.json(
      {
        users: usersWithDownloadCount,
        totalUsers,
        page,
        totalPages: Math.ceil(totalUsers / limit),
      },
      { status: 200 },
    )
  } catch (error) {
    console.log('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users.' },
      { status: 500 },
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json({ allowedMethods: ['GET'] })
}
