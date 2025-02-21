// import { NextResponse } from 'next/server';
// import { MongoClient, ObjectId } from 'mongodb';
// import clientPromise from '@/lib/mongodb';

// const uri = process.env.mongodbString as string;
// const client = new MongoClient(uri);

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const { plan_name, duration, user_id, added_on, expiry_date, charges, added_date, expiry_on } = body;

//         if (
//             !plan_name ||
//             !duration ||
//             !user_id ||
//             !added_on ||
//             !expiry_date ||
//             typeof charges !== "number" ||
//             !added_date ||
//             !expiry_on
//         ) {
//             return NextResponse.json(
//                 { error: 'All fields are required' },
//                 { status: 400 }
//             );
//         }

//         // Convert user_id to ObjectId
//         const userIdObject = new ObjectId(user_id);

//         // Connect to the database
//         const client = await clientPromise;
//         const db = client.db('DFXFileGeneration');
//         const subscriptionsCollection = db.collection('all-subscriptions');

//         const addedDate = new Date(added_date);
//         const expiryDate = new Date(expiry_date);

//         const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };

//         const addedOnFormatted = new Date(added_on).toLocaleDateString('en-US', options);
//         const expiryOnFormatted = new Date(expiry_on).toLocaleDateString('en-US', options);

//         // Insert the new subscription
//         await subscriptionsCollection.insertOne({
//             plan_name,
//             duration,
//             user_id: userIdObject,
//             added_on: addedOnFormatted,
//             expiry_on: expiryOnFormatted,
//             charges,
//             added_date: addedDate,
//             expiry_date: expiryDate,
//         });

//         return NextResponse.json(
//             { message: 'Subscription successfully created' },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error('Error:', error);
//         return NextResponse.json(
//             { error: 'An error occurred while processing the request' },
//             { status: 500 }
//         );
//     } finally {
//         await client.close();
//     }
// }

import { NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { addNotification } from '../../admin/notifications/route'

const uri = process.env.mongodbString as string
const client = new MongoClient(uri)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      plan_name,
      duration,
      user_id,
      added_on,
      expiry_date,
      charges,
      added_date,
      expiry_on,
    } = body

    if (
      !plan_name ||
      !duration ||
      !user_id ||
      !added_on ||
      !expiry_date ||
      typeof charges !== 'number' ||
      !added_date ||
      !expiry_on
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      )
    }

    // Convert user_id to ObjectId
    const userIdObject = new ObjectId(user_id)

    // Connect to the database
    const client = await clientPromise
    const db = client.db('DFXFileGeneration')
    const subscriptionsCollection = db.collection('all-subscriptions')

    // Check if the user already has a free plan
    const existingFreePlan = await subscriptionsCollection.findOne({
      user_id: userIdObject,
      charges: 0, // Checking for free plans
    })

    // If a free plan exists, silently return success without inserting
    if (existingFreePlan) {
      return NextResponse.json(
        {
          message:
            'Subscription already exists (skipped adding duplicate free plan)',
        },
        { status: 200 },
      )
    }

    const addedDate = new Date(added_date)
    const expiryDate = new Date(expiry_date)

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }

    const addedOnFormatted = new Date(added_on).toLocaleDateString(
      'en-US',
      options,
    )
    const expiryOnFormatted = new Date(expiry_on).toLocaleDateString(
      'en-US',
      options,
    )

    // Insert the new subscription
    await subscriptionsCollection.insertOne({
      plan_name,
      duration,
      user_id: userIdObject,
      added_on: addedOnFormatted,
      expiry_on: expiryOnFormatted,
      charges,
      added_date: addedDate,
      expiry_date: expiryDate,
    })
    await addNotification(user_id, '', 'free_subscription')

    return NextResponse.json(
      { message: 'Subscription successfully created' },
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
