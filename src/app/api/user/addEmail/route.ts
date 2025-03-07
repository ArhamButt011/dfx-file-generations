import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const SHEET_ID = process.env.GOOGLE_SHEET_ID as string
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') as string

const addToGoogleSheet = async (email: string) => {
    fetch(
        "https://script.google.com/macros/s/AKfycbzbM-WJjsenM-2AlUaeVrcswzLsd4aRVzohR7dq-qMdxgb7oYodsKJsyHU-U8mSKt5u/exec",
        {
            method: "POST",
            body: JSON.stringify({ email })
        }
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


export async function POST(req: Request) {
    try {
        const { email } = await req.json()
        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            )
        }

        const normalizedEmail = email.toLowerCase()
        const client = await clientPromise
        const db = client.db('DFXFileGeneration')

        const existingUser = await db.collection('promotions').findOne({ email: normalizedEmail })
        if (existingUser) {
            return NextResponse.json(
                { message: 'Email already exists' },
                { status: 400 }
            )
        }

        await db.collection('promotions').insertOne({
            email: normalizedEmail,
            createdAt: new Date(),
        })

        await addToGoogleSheet(normalizedEmail) // Save to Google Sheet

        return NextResponse.json(
            { message: 'Email Added Successfully' },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error Adding Email:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
