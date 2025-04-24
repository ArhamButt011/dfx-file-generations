import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

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

    // Attempt to send the email first
    // try {
    //   await GetConnectedEmail(email)
    // } catch (emailError) {
    //   console.error('Error Sending Email:', emailError)
    //   return NextResponse.json(
    //     { message: 'Failed to send email' },
    //     { status: 500 },
    //   )
    // }

    // If email is sent successfully, insert into the database
    await db.collection('promotions').insertOne({
      email: normalizedEmail,
      createdAt: new Date(),
    })

    return NextResponse.json(
      { message: 'Email Sent Successfully' },
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
