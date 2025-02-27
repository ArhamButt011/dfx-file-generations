// import { NextResponse } from 'next/server'
// import clientPromise from '@/lib/mongodb'
// import jwt from 'jsonwebtoken'
// const SECRET_KEY = process.env.NEXT_JWT_SECRET as string
// export async function POST(req: Request) {
//   try {
//     const { email, otp } = await req.json()

//     if (!otp || !email) {
//       return NextResponse.json({ message: 'OTP is required' }, { status: 400 })
//     }

//     const normalizedEmail = email.toLowerCase()

//     const client = await clientPromise
//     const db = client.db('DFXFileGeneration')

//     const user = await db
//       .collection('users')
//       .findOne({ email: normalizedEmail })
//     if (user?.otp != otp) {
//       return NextResponse.json(
//         { message: 'OTP does not match' },
//         { status: 400 },
//       )
//     }

//     const token = jwt.sign(
//       {
//         email: user?.email,
//         id: user?._id,
//         role: user?.role,
//         username: user?.name,
//       },
//       SECRET_KEY,
//       { expiresIn: '24h' },
//     )

//     return NextResponse.json(
//       { message: 'User logged in successfully', token, name: user?.name },
//       { status: 201 },
//     )
//   } catch (error) {
//     console.log('Error creating user:', error)
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 },
//     )
//   }
// }

import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import jwt from 'jsonwebtoken'
import sendWelcomeEmail from '@/lib/welcome-email'

const SECRET_KEY = process.env.NEXT_JWT_SECRET as string

export async function POST(req: Request) {
  try {
    const { email, otp, otpTexts } = await req.json()

    if (!otp || !email) {
      return NextResponse.json(
        { message: 'OTP and Email is required' },
        { status: 400 },
      )
    }

    const normalizedEmail = email.toLowerCase()

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const user = await db
      .collection('users')
      .findOne({ email: normalizedEmail })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    if (user.otp !== otp) {
      return NextResponse.json(
        { message: 'OTP does not match' },
        { status: 400 },
      )
    }

    await db.collection('users').updateOne(
      { email: normalizedEmail },
      {
        $set: { is_verified: true, updatedAt: new Date() },
        $unset: { otp: '' },
      },
    )

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        role: user.role,
        username: user.name,
      },
      SECRET_KEY,
      { expiresIn: '24h' },
    )
    if (otpTexts === 'registration') {
      await sendWelcomeEmail(user.email, user.name)
    }

    return NextResponse.json(
      { message: 'Use2r verified successfully', token, name: user.name },
      { status: 200 },
    )
  } catch (error) {
    console.log('Error verifying OTP:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
