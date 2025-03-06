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

    const startDate = new Date(currentYear, currentMonth - 11, 1)

    const paymentsData = await subscriptionsCollection
      .aggregate([
        {
          $match: {
            added_date: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$added_date' },
              month: { $month: '$added_date' },
            },
            totalAmount: { $sum: '$charges' },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ])
      .toArray()

    const months: string[] = []
    const payments: number[] = []
    let totalCharges = 0
    let currentMonthTotal = 0
    let previousMonthTotal = 0

    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12
      const year = i > currentMonth ? currentYear - 1 : currentYear
      months.push(allMonths[monthIndex])

      const paymentEntry = paymentsData.find(
        (entry) =>
          entry._id.year === year && entry._id.month === monthIndex + 1,
      )

      const monthTotal = paymentEntry?.totalAmount ?? 0
      payments.push(monthTotal)
      totalCharges += monthTotal

      if (monthIndex === currentMonth) {
        currentMonthTotal = monthTotal
      } else if (monthIndex === (currentMonth - 1 + 12) % 12) {
        previousMonthTotal = monthTotal
      }
    }

    const calculatePercentage = (value: number, total: number) =>
      total ? ((value / total) * 100).toFixed(2) + '%' : '0%'

    return NextResponse.json({
      success: true,
      months,
      payments,
      totalCharges,
      currentMonthAvg: calculatePercentage(currentMonthTotal, totalCharges),
      previousMonthAvg: calculatePercentage(previousMonthTotal, totalCharges),
    })
  } catch (error) {
    console.error('Error fetching subscription payments:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
