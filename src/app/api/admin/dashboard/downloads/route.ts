import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 300 }) // Cache for 5 minutes

export async function GET() {
  try {
    const cacheKey = 'dxf_downloads'
    const cachedData = cache.get(cacheKey)

    if (cachedData) {
      return NextResponse.json({ success: true, ...cachedData })
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const downloadsCollection = db.collection('all-downloads')

    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const months: string[] = []
    const downloads: number[] = []

    // Use aggregation for a single efficient query
    const pipeline = [
      {
        $match: {
          downloaded_date: {
            $gte: new Date(currentYear - 1, currentMonth, 1), // Last 12 months
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$downloaded_date' },
            month: { $month: '$downloaded_date' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]

    const results = await downloadsCollection.aggregate(pipeline).toArray()

    const downloadCounts: Record<string, number> = {}
    results.forEach(({ _id, count }) => {
      const monthKey = `${_id.year}-${_id.month}`
      downloadCounts[monthKey] = count
    })

    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12
      const year = i > currentMonth ? currentYear - 1 : currentYear

      const monthKey = `${year}-${monthIndex + 1}`
      months.push(monthNames[monthIndex])
      downloads.push(downloadCounts[monthKey] || 0)
    }

    const responseData = { months, downloads }
    cache.set(cacheKey, responseData)

    return NextResponse.json({ success: true, ...responseData })
  } catch (error) {
    console.error('Error fetching DXF downloads data:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
