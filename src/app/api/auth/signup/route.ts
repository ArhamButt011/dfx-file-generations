import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/mongodb'
// import nodemailer from 'nodemailer';
import EmailService from '@/app/api/emailService'
import { addNotification } from '@/lib/notifications'

export async function POST(req: Request) {
  try {
    const { newAccountFormData } = await req.json()
    const name = newAccountFormData.name,
      lastName = newAccountFormData.lastName,
      email = newAccountFormData.email,
      password = newAccountFormData.password,
      role = newAccountFormData.role

    if (!name || !lastName || !email || !password) {
      return NextResponse.json(
        { message: 'First name, Last name,email, and password are required' },
        { status: 400 },
      )
    }

    if (!role) {
      return NextResponse.json({ message: 'Role is required' }, { status: 400 })
    }

    if (name.trim() === '' || lastName.trim() === '') {
      return NextResponse.json(
        {
          message:
            'First name and Last Name cannot be empty or contain only spaces',
        },
        { status: 400 },
      )
    }

    const normalizedEmail = email.toLowerCase()
    const formattedRole = role.replace(/\s+/g, '').toLowerCase()

    const client = await clientPromise

    const db = client.db('DFXFileGeneration')

    const existingUser = await db
      .collection('users')
      .findOne({ email: normalizedEmail })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const randomOTP = generateFiveDigitNumber()

    const userInsertResult = await db.collection('users').insertOne({
      name: name.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      role: formattedRole,
      image: '',
      password: hashedPassword,
      otp: randomOTP,
      is_verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const userId = userInsertResult.insertedId.toString()
    await addNotification(userId, '', 'user_registration')

    await EmailService(email, randomOTP.toString())

    return NextResponse.json(
      { message: 'User created successfully' },
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

function generateFiveDigitNumber() {
  return Math.floor(10000 + Math.random() * 90000)
}

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
