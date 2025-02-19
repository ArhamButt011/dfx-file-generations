import { NextResponse } from "next/server";

import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { user_id } = body;

        if (!user_id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const userIdObject = new ObjectId(user_id);
        const client = await clientPromise;
        const db = client.db('DFXFileGeneration');
        const subscriptionsCollection = db.collection('all-subscriptions');

        // Fetch the latest plan for the user (sort by added_date descending)
        const subscription = await subscriptionsCollection.findOne(
            { user_id: userIdObject },
            { sort: { added_date: -1 } } // Get the most recent plan
        );

        return NextResponse.json({ subscription }, { status: 200 });
    } catch (error) {
        console.error('Error fetching subscription:', error);
        return NextResponse.json({ error: 'Error fetching subscription' }, { status: 500 });
    }
}
