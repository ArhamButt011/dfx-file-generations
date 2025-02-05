import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
// import jwt from "jsonwebtoken";
import EmailService from '@/app/api/emailService'
// const SECRET_KEY = process.env.NEXT_JWT_SECRET as string;
export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 },
      )
    }

    const randomOTP = generateFiveDigitNumber()
    const normalizedEmail = email.toLowerCase()

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const user = await db.collection('users').findOneAndUpdate(
      { email: normalizedEmail },
      { $set: { otp: randomOTP } },
      { returnDocument: 'after' }, // Optionally, specify to return the document after the update
    )

    await EmailService(email, randomOTP.toString())

    if (!user) {
      return NextResponse.json({ message: 'Invalid Email' }, { status: 400 })
    }

    // const token = jwt.sign(
    //     { email: user?.email, id: user?._id, role: user?.role, username: user?.name },
    //     SECRET_KEY,
    //     { expiresIn: "24h" }
    // );

    return NextResponse.json({ message: 'New OTP sent' }, { status: 201 })
  } catch (error) {
    console.log('Error creating user:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}

function generateFiveDigitNumber() {
  return Math.floor(10000 + Math.random() * 90000)
}
