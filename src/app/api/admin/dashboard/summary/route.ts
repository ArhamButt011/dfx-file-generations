import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Collection, Db } from 'mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db: Db = client.db('DFXFileGeneration')

    const usersCollection = db.collection('users')
    const downloadsCollection = db.collection('all-downloads')
    const subscriptionsCollection = db.collection('all-subscriptions')
    const contoursCollection = db.collection('contours')

    // const today = new Date()
    // const currentYear = today.getFullYear()
    // const currentMonth = today.getMonth()

    const getMonthRange = (year: number, month: number) => ({
      start: new Date(year, month, 1),
      end: new Date(year, month + 1, 0, 23, 59, 59),
    })

    const getMonthlyData = async (
      collection: Collection,
      dateField: string,
      roleFilter?: object, // Optional filter for users
    ): Promise<number[]> => {
      const monthlyData: number[] = []
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth() - i,
        )
        const range = getMonthRange(
          monthDate.getFullYear(),
          monthDate.getMonth(),
        )

        const pipeline = [
          {
            $match: {
              [dateField]: { $gte: range.start, $lte: range.end },
              ...(roleFilter || {}), // Apply role filter if provided
            },
          },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
        ]

        const result = await collection.aggregate(pipeline).toArray()
        monthlyData.push(result[0]?.count || 0)
      }
      return monthlyData
    }

    const [
      monthlyUsers,
      monthlyDownloads,
      monthlySubscriptions,
      monthlyContours,
    ] = await Promise.all([
      getMonthlyData(usersCollection, 'createdAt', { role: 'user' }), // Filter users by role
      getMonthlyData(downloadsCollection, 'downloaded_date'),
      getMonthlyData(subscriptionsCollection, 'added_date'),
      getMonthlyData(contoursCollection, 'createdAt'),
    ])

    const calculateTotals = (monthlyData: number[]) =>
      monthlyData.reduce((sum, count) => sum + count, 0)

    const totalUsers = calculateTotals(monthlyUsers)
    const totalDownloads = calculateTotals(monthlyDownloads)
    const totalSubscriptions = calculateTotals(monthlySubscriptions)
    const totalContours = calculateTotals(monthlyContours)

    const calculatePercentage = (value: number, total: number): number =>
      total > 0 ? parseFloat(((value / total) * 100).toFixed(2)) : 0

    const summary = {
      totalUsers,
      totalDownloads,
      totalSubscriptions,
      totalContours,
      monthlyUsers,
      monthlyDownloads,
      monthlySubscriptions,
      monthlyContours,
      currentMonthAvg: {
        users: calculatePercentage(monthlyUsers[5], totalUsers),
        downloads: calculatePercentage(monthlyDownloads[5], totalDownloads),
        subscriptions: calculatePercentage(
          monthlySubscriptions[5],
          totalSubscriptions,
        ),
        contours: calculatePercentage(monthlyContours[5], totalContours),
      },
      lastMonthAvg: {
        users: calculatePercentage(monthlyUsers[4], totalUsers),
        downloads: calculatePercentage(monthlyDownloads[4], totalDownloads),
        subscriptions: calculatePercentage(
          monthlySubscriptions[4],
          totalSubscriptions,
        ),
        contours: calculatePercentage(monthlyContours[4], totalContours),
      },
    }

    return NextResponse.json({ success: true, data: summary })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
