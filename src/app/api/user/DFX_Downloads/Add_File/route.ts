import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { addNotification } from '@/lib/notifications'

export async function POST(req: Request) {
  try {
    const { file_name, url, userId } = await req.json()

    if (!file_name || !url || !userId) {
      return NextResponse.json(
        { message: 'file_name, url, and userId are required' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const objectId = ObjectId.createFromHexString(userId)

    const existingUser = await db.collection('users').findOne({ _id: objectId })

    if (!existingUser) {
      return NextResponse.json(
        { message: 'User does not exist' },
        { status: 400 },
      )
    }

    const existingDownload = await db.collection('all-downloads').findOne({
      user_id: objectId,
      file_name: file_name,
      file_url: url,
    })

    if (!existingDownload) {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
      const formattedDate = new Date().toLocaleDateString('en-US', options)

      await db.collection('all-downloads').insertOne({
        user_id: objectId,
        file_name,
        file_url: url,
        downloaded_on: formattedDate,
        downloaded_date: new Date(),
      })
    }
    addNotification(userId, file_name, 'file_download')

    return NextResponse.json(
      { message: 'File downloaded successfully' },
      { status: 201 },
    )
  } catch (error) {
    console.log('Error creating user:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
