import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcryptjs'
export async function POST(req: Request) {
  try {
    const { email, ResetFormData } = await req.json()
    const password = ResetFormData.password

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const normalizedEmail = email.toLowerCase()
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.collection('users').findOneAndUpdate(
      { email: normalizedEmail },
      { $set: { password: hashedPassword } },
      { returnDocument: 'after' }, // Optionally, specify to return the document after the update);
    )

    if (!user) {
      return NextResponse.json(
        { message: 'User not found or invalid role' },
        { status: 404 },
      )
    }

    return NextResponse.json(
      { message: 'Password reset successful' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
