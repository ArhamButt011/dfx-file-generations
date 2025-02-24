import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const subscriptionsCollection = db.collection('all-subscriptions')

    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()

    const allMonths = [
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
    const payments: number[] = []
    let totalCharges = 0

    let currentMonthTotal = 0
    let previousMonthTotal = 0

    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12
      const year = i > currentMonth ? currentYear - 1 : currentYear

      months.push(allMonths[monthIndex])

      const startDate = new Date(year, monthIndex, 1)
      const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59)

      const totalPayments = await subscriptionsCollection
        .aggregate([
          {
            $match: {
              added_date: { $gte: startDate, $lte: endDate },
            },
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: '$charges' },
            },
          },
        ])
        .toArray()

      const monthTotal = totalPayments[0]?.totalAmount ?? 0
      payments.push(monthTotal)
      totalCharges += monthTotal

      if (monthIndex === currentMonth) {
        currentMonthTotal = monthTotal
      } else if (monthIndex === (currentMonth - 1 + 12) % 12) {
        previousMonthTotal = monthTotal
      }
    }

    const currentMonthAvg = totalCharges
      ? (currentMonthTotal / totalCharges) * 100
      : 0
    const previousMonthAvg = totalCharges
      ? (previousMonthTotal / totalCharges) * 100
      : 0

    return NextResponse.json({
      success: true,
      months,
      payments,
      totalCharges,
      currentMonthAvg: currentMonthAvg.toFixed(2) + '%',
      previousMonthAvg: previousMonthAvg.toFixed(2) + '%',
    })
  } catch (error) {
    console.error('Error fetching subscription payments:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
