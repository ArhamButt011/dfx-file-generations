import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export async function PUT(req: NextRequest) {
  try {
    const { id, text, fileName } = await req.json()

    console.log('id->> ', fileName)

    if (!id || !text) {
      return NextResponse.json(
        {
          success: false,
          message: 'ID and text are required',
        },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const downloadsCollection = db.collection('all-downloads')

    let updateField = {}
    if (text === 'outlineImage') updateField = { outline_url: '' }
    else if (text === 'overlayImage') updateField = { overlay_url: '' }
    else if (text === 'maskImage') updateField = { mask_url: '' }
    else if (text === 'fileName') updateField = { file_name: fileName }
    else {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid text value',
        },
        { status: 400 },
      )
    }
    const objectId = new ObjectId(id)
    const result = await downloadsCollection.updateOne(
      { _id: objectId },
      { $set: updateField },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No document found with the given ID',
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Field updated successfully',
    })
  } catch (error) {
    console.error('Error updating document:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      { status: 500 },
    )
  }
}
