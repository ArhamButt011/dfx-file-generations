import { NextResponse } from 'next/server'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

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

    const user = jwt.verify(token, SECRET_KEY)
    return NextResponse.json(user, { status: 200 })
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
