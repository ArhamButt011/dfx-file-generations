import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json()
        console.log(id)

        if (!id) {
            return NextResponse.json(
                { message: 'Id is required' },
                { status: 400 },
            )
        }

        const client = await clientPromise

        const db = client.db('DFXFileGeneration')

        const existingFile = await db
            .collection('all-downloads')
            .findOneAndDelete({_id:id})
        if (!existingFile) {
            return NextResponse.json(
                { message: 'File Does not Exist' },
                { status: 400 },
            )
        }

        return NextResponse.json(
            { message: 'File Deleted successfully' },
            { status: 201 },
        )
    } catch (error) {
        console.log('Error Deleting File:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 },
        )
    }

}