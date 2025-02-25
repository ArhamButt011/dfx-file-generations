import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb';


export async function POST(req: Request) {
    try {
        const { file_name, url, userId } = await req.json()


        if (!file_name || !url || !userId) {
            return NextResponse.json(
                { message: 'file_name, url, userId are required' },
                { status: 400 },
            )
        }



        const client = await clientPromise

        const db = client.db('DFXFileGeneration')

        const objectId = ObjectId.createFromHexString(userId);

        const existingUser = await db.collection('users').findOne({ _id: objectId });

        if (!existingUser) {
            return NextResponse.json(
                { message: 'User does not exist' },
                { status: 400 },
            )
        }

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date().toLocaleDateString('en-US', options);
        
    
        await db.collection('all-downloads').insertOne({
            user_id: new ObjectId(userId),  
            file_name:file_name,
            file_url:url,
            downloaded_on:formattedDate,
            downloaded_date:new Date()
        })


        return NextResponse.json(
          { message: 'FIle Downloaded successfully' },
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

