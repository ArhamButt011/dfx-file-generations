import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb';

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
        const objectId = ObjectId.createFromHexString(id);


        const existingFile = await db
            .collection('all-downloads')
            .deleteMany({ user_id: objectId });



        if (!existingFile) {
            return NextResponse.json(
                { message: 'File Does not Exist' },
                { status: 400 },
            )
        }

        const existingsubscriptions = await db
            .collection('all-subscriptions')
            .deleteMany({ user_id: objectId });

        if (!existingsubscriptions) {
            return NextResponse.json(
                { message: 'File Does not Exist' },
                { status: 400 },
            )
        }


        const existingnotifications = await db
            .collection('notifications')
            .deleteMany({ user_id: objectId });

        if (!existingnotifications) {
            return NextResponse.json(
                { message: 'File Does not Exist' },
                { status: 400 },
            )
        }

        const existingusers = await db
            .collection('users')
            .deleteMany({ _id: objectId });

        if (existingusers.deletedCount === 0) {
            return NextResponse.json(
                { message: 'User Does not Exist' },
                { status: 400 },
            )
        }

        console.log("Deleted: ", existingusers.deletedCount);


        return NextResponse.json(
            { message: 'USer Deleted successfully' },
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