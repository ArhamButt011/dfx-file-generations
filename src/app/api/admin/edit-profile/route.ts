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
    const file = formData.get('file')

    if (!id) {
      return NextResponse.json({ status: 'fail', error: 'No _id provided' })
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const usersCollection = db.collection('users')

    const existingUser = await usersCollection.findOne({
      _id: new ObjectId(id),
    })
    if (!existingUser) {
      return NextResponse.json({ status: 'fail', error: 'User not found' })
    }

    const updateData: UpdateData = {}

    // Only update name if it's provided and different from existing
    if (name && name !== existingUser.name) {
      updateData.name = name
    }

    // Only update image if a new file is provided
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)
      const filePath = `/uploads/${file.name}`
      await fs.writeFile(`./public${filePath}`, buffer)
      updateData.image = filePath
    }

    // If no changes detected, return a success response without updating
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({
        status: 'success',
        message: 'No changes detected, user data remains the same',
        data: existingUser, // Return existing data
      })
    }

    // Perform the update in MongoDB
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json({ status: 'fail', error: 'No document updated' })
    }

    // Fetch the updated user data
    const updatedUser = await usersCollection.findOne({ _id: new ObjectId(id) })
    if (!updatedUser) {
      return NextResponse.json({
        status: 'fail',
        error: 'User not found after update',
      })
    }

    // Generate a new JWT token with updated user data
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
      data: updatedUser,
      token: newToken,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({
      status: 'fail',
      error: e instanceof Error ? e.message : 'Unknown error occurred',
    })
  }
}
