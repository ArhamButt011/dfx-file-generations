import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
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

    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12
      const year = i > currentMonth ? currentYear - 1 : currentYear

      months.push(monthNames[monthIndex])

      const startDate = new Date(year, monthIndex, 1)
      const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59)

      const count = await downloadsCollection.countDocuments({
        downloaded_date: { $gte: startDate, $lte: endDate },
      })

      downloads.push(count)
    }

    return NextResponse.json({
      success: true,
      months: months,
      downloads: downloads,
    })
  } catch (error) {
    console.error('Error fetching DXF downloads data:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
