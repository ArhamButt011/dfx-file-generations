import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/mongodb'
// import nodemailer from 'nodemailer';
import EmailService from '@/app/api/emailService'
import { addNotification } from '@/lib/notifications'
const generateEmailBody = (otp: string, name: string) => {
  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}mailLogo.jpg`
  const linkedinUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}linkedin.jpg`
  const youtubeUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}youtube.jpg`

  return `
    <div style="font-family: Arial, sans-serif; padding: 30px; max-width: 600px; margin: auto; border: 1px solid #eee;">
      <div style="text-align: center;">
        <img src="${logoUrl}" alt="Lumashape Logo" width="250" style="margin-bottom: 20px;" />
      </div>
      <p style="font-size: 16px; color: #333;">Dear ${name},</p>
      <p style="font-size: 14px; color: #666;">
        Welcome to Lumashape! To complete your account setup, please verify your email address using the verification code below. </p>
         <p style="font-size: 14px; color: #666;">
        This code is valid for 1 minute only. Please do not share it with anyone.
      </p>
      <p style="font-size: 16px; font-weight: bold; color: #000; margin-top: 20px;">Your Verification Code Is</p>
      <div style="text-align: center; font-size: 28px; font-weight: bold; color: #000; margin: 20px 0;">
        ${otp}
      </div>
      <hr style="border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 13px; color: #555;">
        If you have any questions or need assistance, please contact our support team at
        <a href="mailto:support@lumashape.com" style="color: #266CA8;">support@lumashape.com</a>
      </p>
      <p style="font-size: 13px; color: #555;">Thank you for joining us & we hope you have a great experience on the app!</p>
      <p style="margin-top: 30px;"><a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a> <span style="color: #000000;">&nbsp;  |   &nbsp;</span>
     <a href="mailto:support@lumashape.com" style="color: #000000;">support@lumashape.com</a></p>
       <div style="text-align: start; margin-top: 10px;">
        <a href="https://www.linkedin.com/company/lumashape/" style="text-decoration: none;">
          <img src=${linkedinUrl} alt="LinkedIn" width="20" />
        </a>
         <a href="https://www.youtube.com/@Lumashape?app=desktop" style="text-decoration: none; margin-left: 20px;">
          <img src=${youtubeUrl} alt="youtube" width="20" />
        </a>
      </div>
    </div>
  `
}

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

    await EmailService(email, generateEmailBody(randomOTP.toString(), name))

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
