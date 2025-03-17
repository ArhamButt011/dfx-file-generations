import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import GetConnectedEmail from '@/lib/get-connected-emial'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 },
      )
    }

    const normalizedEmail = email.toLowerCase()
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const existingUser = await db
      .collection('promotions')
      .findOne({ email: normalizedEmail })
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 },
      )
    }

    await db.collection('promotions').insertOne({
      email: normalizedEmail,
      createdAt: new Date(),
    })
    console.log('emial user->> ', email)

    await GetConnectedEmail(email)

    return NextResponse.json(
      { message: 'Email Added Successfully' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error Adding Email:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
