import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.NEXT_JWT_SECRET as string

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

    return NextResponse.json(
      user,

      { status: 200 },
    )
  } catch (error) {
    console.error('Token verification error:', error)

    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status: 401 },
    )
  }
}
