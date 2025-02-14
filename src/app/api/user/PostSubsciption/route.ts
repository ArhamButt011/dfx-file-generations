import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
// import nodemailer from 'nodemailer';
// import EmailService from "@/app/api/emailService"/

export async function POST(req: Request) {
    try {
        const { subscriptionData } = await req.json();
        const userid = subscriptionData.userid, plan = subscriptionData.plan, charges = subscriptionData.charges, bilingDate = subscriptionData.bilingDate, ExpiryDate = subscriptionData.ExpiryDate, duration= subscriptionData.duration;
        let cardName = subscriptionData.cardName
        if (!plan || !charges || !bilingDate || !ExpiryDate || !userid) {
            return NextResponse.json(
                { message: "plan, charges, userID, bilingDate and ExpiryDate are required" },
                { status: 400 }
            );
        }

        if (!cardName) {
            cardName = ""
        }

        // if (name.trim() === "") {
        //     return NextResponse.json(
        //         { message: "Name cannot be empty or contain only spaces" },
        //         { status: 400 }
        //     );
        // }

        // const normalizedEmail = email.toLowerCase();
        // const formattedRole = role.replace(/\s+/g, '').toLowerCase();

        const client = await clientPromise;

        const db = client.db("DFXFileGeneration");

        const existingUser = await db.collection("users").findOne({ _id: userid });
        if (!existingUser) {
            return NextResponse.json(
                { message: "User does not exist" },
                { status: 400 }
            );
        }

        await db.collection("subscriptions").insertOne({
            added_on: bilingDate,
            charges: charges,
            duration: duration,
            expiry_date: ExpiryDate,
            plan_name: plan,
            status: "Current",
            createdAt: userid,

        });

        // await EmailService(email, randomOTP.toString());

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error creating user:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// function generateFiveDigitNumber() {
//     return Math.floor(10000 + Math.random() * 90000);
// }

// const sendEmail = async (email: string, message: string) => {
//     // Create a transporter
//     let transporter = nodemailer.createTransport({
//         service: 'gmail', // Or any other SMTP service
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });

//     // Send the email
//     try {
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: "OTP",
//             text: message,
//         });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         throw new Error('Failed to send email');
//     }
// };