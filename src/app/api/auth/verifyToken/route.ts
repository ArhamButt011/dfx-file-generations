import { NextResponse } from 'next/server'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const SECRET_KEY = process.env.NEXT_JWT_SECRET as string

if (!SECRET_KEY) {
  throw new Error('Missing NEXT_JWT_SECRET in environment variables')
}

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json(
        { message: 'Token is required' },
        { status: 400 },
      )
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string }
    const userId = decoded.id

    // Fetch user details from MongoDB
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const usersCollection = db.collection('users')

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Include user image in the response
    return NextResponse.json(
      {
        id: user._id.toString(),
        username: user.name,
        email: user.email,
        role: user.role,
        image: user.image ? user.image : null, // Send image if available
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Token verification error:', error)

    if (error instanceof TokenExpiredError) {
      console.error('Token expired at:', error.expiredAt)
      return NextResponse.json(
        { message: 'Token expired. Please log in again.' },
        { status: 401 },
      )
    }

    if (error instanceof JsonWebTokenError) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 },
    )
  }
}
