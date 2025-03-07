import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'


export async function POST(req: Request) {
    try {
        const { email } = await req.json()
        console.log(email);
        if (!email) {
            return NextResponse.json(
                { message: 'email is required' },
                { status: 400 },
            )
        }


        const normalizedEmail = email.toLowerCase()

        const client = await clientPromise

        const db = client.db('DFXFileGeneration')

        const existingUser = await db
            .collection('promotions')
            .findOne({ email: normalizedEmail })
        if (existingUser) {
            return NextResponse.json(
                { message: 'email already exists' },
                { status: 400 },
            )
        }



        await db.collection('promotions').insertOne({
            email: normalizedEmail,
            createdAt: new Date(),
        })

        return NextResponse.json(
            { message: 'Email Added Successfully' },
            { status: 201 },
        )
    } catch (error) {
        console.log('Error Adding Email:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 },
        )
    }
}


