import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
// import jwt from "jsonwebtoken";
import EmailService from '@/app/api/emailService'
// const SECRET_KEY = process.env.NEXT_JWT_SECRET as string;
const generateEmailBody = (otp: string, name: string) => {
  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}mailLogo.jpg`

  return `
    <div style="font-family: Arial, sans-serif; padding: 30px; max-width: 600px; margin: auto; border: 1px solid #eee;">
      <div style="text-align: center;">
        <img src="${logoUrl}" alt="Lumashape Logo" width="250" style="margin-bottom: 20px;" />
      </div>
      <p style="font-size: 16px; color: #333;">Dear ${name},</p>
      <p style="font-size: 14px; color: #666;">
        To change your password, you need to add a verification code; otherwise, you can't change your password.
      </p>
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="20" />
        </a>
      </div>
    </div>
  `
}
export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 },
      )
    }

    const randomOTP = generateFiveDigitNumber()
    const normalizedEmail = email.toLowerCase()

    const client = await clientPromise
    const db = client.db('DFXFileGeneration')

    const user = await db
      .collection('users')
      .findOneAndUpdate(
        { email: normalizedEmail },
        { $set: { otp: randomOTP } },
        { returnDocument: 'after' },
      )

    const userDetails = await db
      .collection('users')
      .findOne({ email: normalizedEmail })

    if (!userDetails) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    await EmailService(
      email,
      generateEmailBody(randomOTP.toString(), userDetails.name),
    )

    if (!user) {
      return NextResponse.json({ message: 'Invalid Email' }, { status: 400 })
    }

    // const token = jwt.sign(
    //     { email: user?.email, id: user?._id, role: user?.role, username: user?.name },
    //     SECRET_KEY,
    //     { expiresIn: "24h" }
    // );

    return NextResponse.json({ message: 'New OTP sent' }, { status: 201 })
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
