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

    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()

    const getMonthRange = (year: number, month: number) => ({
      start: new Date(year, month, 1),
      end: new Date(year, month + 1, 0, 23, 59, 59),
    })

    const getMonthlyData = async (
      collection: Collection,
      dateField: string,
    ): Promise<number[]> => {
      const monthlyData: number[] = []
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(currentYear, currentMonth - i)
        const range = getMonthRange(
          monthDate.getFullYear(),
          monthDate.getMonth(),
        )

        const count = await collection.countDocuments({
          [dateField]: { $gte: range.start, $lte: range.end },
        })

        monthlyData.push(count)
      }
      return monthlyData
    }

    const monthlyUsers = await getMonthlyData(usersCollection, 'createdAt')
    const monthlyDownloads = await getMonthlyData(
      downloadsCollection,
      'downloaded_date',
    )
    const monthlySubscriptions = await getMonthlyData(
      subscriptionsCollection,
      'added_date',
    )
    const monthlyContours = await getMonthlyData(
      contoursCollection,
      'createdAt',
    )

    const totalUsers = monthlyUsers.reduce((sum, count) => sum + count, 0)
    const totalDownloads = monthlyDownloads.reduce(
      (sum, count) => sum + count,
      0,
    )
    const totalSubscriptions = monthlySubscriptions.reduce(
      (sum, count) => sum + count,
      0,
    )
    const totalContours = monthlyContours.reduce((sum, count) => sum + count, 0)

    const calculatePercentage = (value: number, total: number): number => {
      return total > 0 ? parseFloat(((value / total) * 100).toFixed(2)) : 0
    }

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
