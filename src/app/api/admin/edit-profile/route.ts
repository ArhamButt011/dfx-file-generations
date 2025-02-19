import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'

const SECRET_KEY = process.env.NEXT_JWT_SECRET as string

export const config = { runtime: 'experimental-edge' }
type UpdateData = {
  name?: string
  image?: string
}

export async function PUT(req: Request) {
  try {
    const formData = await req.formData()
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const file = formData.get('file') as File

    if (!id) {
      return NextResponse.json({ status: 'fail', error: 'No _id provided' })
    }

    const updateData: UpdateData = {}
    if (name) updateData.name = name

    if (file) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)
      const filePath = `/uploads/${file.name}`
      await fs.writeFile(`./public${filePath}`, buffer)
      updateData.image = filePath
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const usersCollection = db.collection('users')

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json({ status: 'fail', error: 'No document updated' })
    }

    const updatedUser = await usersCollection.findOne({ _id: new ObjectId(id) })
    if (!updatedUser) {
      return NextResponse.json({ status: 'fail', error: 'User not found' })
    }

    const newToken = jwt.sign(
      {
        id: updatedUser._id.toString(),
        username: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      SECRET_KEY,
      { expiresIn: '1h' },
    )

    return NextResponse.json({
      status: 'success',
      message: 'User updated successfully',
      data: updateData,
      token: newToken, // Include the new token in the response
    })
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return NextResponse.json({ status: 'fail', error: e.message })
    }
    return NextResponse.json({
      status: 'fail',
      error: 'Unknown error occurred',
    })
  }
}
