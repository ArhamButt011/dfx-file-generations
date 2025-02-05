import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET as string

export async function POST(req: Request) {
  try {
    const { loginForm } = await req.json()
    const email = loginForm.email,
      password = loginForm.password,
      role = loginForm.role

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const normalizedEmail = email.toLowerCase()
    const formattedRole = role.replace(/\s+/g, '').toLowerCase()

    const user = await db.collection('users').findOne({
      email: normalizedEmail,
      ...(formattedRole ? { role: formattedRole } : {}),
    })

    console.log(formattedRole)

    if (!user) {
      return NextResponse.json(
        { message: 'User not found or invalid role' },
        { status: 404 },
      )
    }

    if (!role && user.role === 'admin') {
      return NextResponse.json(
        { message: 'Admins cannot log in as users.' },
        { status: 403 },
      )
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 },
      )
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role, username: user.name },
      SECRET_KEY,
      { expiresIn: '24h' },
    )

    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        name: user.name,
        email: user.email,
        id: user._id,
      },
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
