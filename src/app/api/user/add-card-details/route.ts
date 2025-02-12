import { NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

const uri = process.env.mongodbString as string
const client = new MongoClient(uri)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { user_id, card_no, holder_name, expiry_date, cvv } = body

    // Validate input fields
    if (!user_id || !card_no || !holder_name || !expiry_date || !cvv) {
      return NextResponse.json(
        {
          error:
            'All fields (id, card_no, holder_name, expiry_date) are required',
        },
        { status: 400 },
      )
    }

    // Convert user_id to ObjectId
    const userIdObject = new ObjectId(user_id)

    // Connect to the database
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const cardsCollection = db.collection('cards')

    // Check if the card number already exists
    const existingCard = await cardsCollection.findOne({ card_no })

    if (existingCard) {
      return NextResponse.json(
        { error: 'Card number must be unique' },
        { status: 409 }, // Conflict status code
      )
    }

    // Insert the new card with user_id as ObjectId
    await cardsCollection.insertOne({
      user_id: userIdObject,
      card_no,
      holder_name,
      expiry_date,
      cvv,
    })

    return NextResponse.json(
      {
        message: 'Card successfully added',
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 },
    )
  } finally {
    await client.close()
  }
}
