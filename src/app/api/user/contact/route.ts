import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}mailLogo.jpg`
  const linkedinUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}linkedin.jpg`
  const youtubeUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}youtube.jpg`
  const sendEmail = async (email: string, subject: string, html: string) => {
    const payload = {
      to: email,
      subject,
      body: html,
    }

    try {
      await axios.post(
        'https://aletheia.ai.ml-bench.com/api/send-microsoft-email',
        payload,
      )
    } catch {
      throw new Error('Failed to send email')
    }
  }

  try {
    const data = await req.json()
    console.log(JSON.stringify(data, null, 2))

    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.office365.com',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    //   tls: {
    //     ciphers: 'SSLv3',
    //   },
    //   debug: true,
    // })

    function formatDateUTC(date: Date) {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC',
        timeZoneName: 'short',
      }

      return new Intl.DateTimeFormat('en-US', options)
        .format(date)
        .replace('UTC', '(UTC)')
    }

    // Email template to the user
    const userEmailTemplate = `
    <div style="padding-left: 10px; max-width: 100%; color: black;">
      <div style="text-align: center;">
        <img src="${logoUrl}" alt="Lumashape Logo" width="200" style="pointer-events: none; user-drag: none; -webkit-user-drag: none;" />
      </div>

      <p style="font-size: 30.59px; font-weight: 600; text-align: center;">Welcome to <span style="color: #266CA8;">Lumashape!</span></p>

      <div>
        <p style="font-size: 22px; font-weight: 600; color: black;">Dear ${data.formData.first} ${data.formData.last}</p>
      </div>

      <div>
        <p style="font-size: 18px; font-weight: 300; color: #00000099;">Thank you for reaching out to us! We have received your inquiry and our team will review it shortly.</p>
      </div>

      <p style="font-size: 22px; font-weight: 600;">Your Submitted Details</p>
      <hr/>

 <table style="width: 100%; border-collapse: separate; border-spacing: 10px;">
  <tr>
    <td style="font-size: 20px; min-width: 150px; font-weight: 200; color: #00000080;">Name:</td>
    <td style="font-size: 20px; font-weight: 500;">${data.formData.first} ${data.formData.last}</td>
  </tr>
  <tr>
    <td style="font-size: 20px; min-width: 150px; font-weight: 200; color: #00000080;">Email Address:</td>
    <td style="font-size: 20px; font-weight: 500;">${data.formData.email}</td>
  </tr>

  <tr>
    <td style="font-size: 20px; min-width: 300px; font-weight: 200; color: #00000080; margin-bottom:0px;">Message:</td>
  </tr>
  <tr>
    <td style="font-size: 20px; font-weight: 100;">${data.formData.message}</td>
  </tr>
</table>



      
      <hr />

      <p style="margin-top: 30px; font-size: 18px; font-weight: 300; color: #00000099;">If you have any questions or need assistance, please contact our support team at 
        <a href="mailto:support@lumashape.com" style="color: #266CA8;">support@lumashape.com</a>.
      </p>

      <p style="font-size: 18px; font-weight: 300; color: #00000099;">Thank you for reaching out to us! We have received your inquiry and our team will review it shortly.</p>

      <p style="margin-top: 60px;">
        <a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a> 
        <span style="color: #000000;"> | </span>     
        <a href="mailto:support@lumashape.com" style="color: #000000;">support@lumashape.com</a>
      </p>

      <div style="text-align: start; margin-top: 10px;">
        <a href="https://www.linkedin.com/company/lumashape/" style="text-decoration: none;">
          <img src=${linkedinUrl} alt="LinkedIn" width="20" />
        </a>
         <a href="https://www.youtube.com/@Lumashape?app=desktop" style="text-decoration: none; margin-left: 20px;">
          <img src=${youtubeUrl} alt="youtube" width="20" />
        </a>
      </div>
    </div>`

    // Email template to Sam Peterson
    const internalEmailTemplate = `
    <div style="padding: 10px; color: black;">
      <div style="text-align: center;">
        <img src="${logoUrl}" alt="Lumashape Logo" width="200" style="pointer-events: none; user-drag: none; -webkit-user-drag: none;" />
      </div>

      <p style="font-size: 20px;">Hi Lumashape Team,</p>

      <p style="font-size: 16px; color: #666;">You've received a new inquiry through the Contact Us form on your website. Below are the details:</p>

   <div style="display: flex; justify-content: start; margin-bottom: 12px;">
  <p style="font-size: 18px; min-width: 300px; font-weight: 200; color: #00000080; margin: 0;">Name:</p>
  <p style="font-size: 18px; font-weight: 500; margin: 0;">${
    data.formData.first
  } ${data.formData.last}</p>
</div>

<div style="display: flex; justify-content: start;">
  <p style="font-size: 18px; min-width: 300px; font-weight: 200; color: #00000080; margin: 0;">Email Address:</p>
  <p style="font-size: 18px; font-weight: 500; margin: 0;">${
    data.formData.email
  }</p>
</div>

<div style="display: flex; flex-direction: column; justify-content: start; margin-bottom: 12px;">
  <p style="font-size: 18px; min-width: 300px; font-weight: 200; color: #00000080; margin-bottom: 12px;">Message:</p>
  <p style="font-size: 18px; font-weight: 100; margin: 0;">${
    data.formData.message
  }</p>
</div>

<div style="display: flex; justify-content: start; margin-bottom: 12px;">
  <p style="font-size: 18px; min-width: 300px; font-weight: 200; color: #00000080; margin: 0;">Submitted On:</p>
  <p style="font-size: 18px; font-weight: 500; margin: 0;">${formatDateUTC(
    new Date(),
  )}</p>
</div>



      <hr/>

      <p style="font-size: 14px; color: #666;">Please follow up with the user within 24 hours.</p>

      <p style="font-size: 14px;">Thank you,</p>

      <p style="margin-top: 30px;">
        <a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a> 
        <span style="color: #000000;"> | </span>     
        <a href="mailto:support@lumashape.com" style="color: #000000;">support@lumashape.com</a>
      </p>

      <div style="text-align: start; margin-top: 10px;">
        <a href="https://www.linkedin.com/company/lumashape/" style="text-decoration: none;">
          <img src=${linkedinUrl} alt="LinkedIn" width="20" />
        </a>
         <a href="https://www.youtube.com/@Lumashape?app=desktop" style="text-decoration: none; margin-left: 20px;">
          <img src=${youtubeUrl} alt="youtube" width="20" />
        </a>
      </div>
    </div>`

    // Send email to the user
    // await transporter.sendEmail({
    //   from: `"Lumashape" <${process.env.EMAIL_USER}>`,
    //   to: data.formData.email,
    //   subject: 'Thank you for contacting Lumashape!',
    //   html: userEmailTemplate,
    // })
    await sendEmail(
      data.formData.email,
      'Thank you for contacting Lumashape!',
      userEmailTemplate,
    )

    await sendEmail(
      'sam.peterson@lumashape.com',
      'New Inquiry Received',
      internalEmailTemplate,
    )

    // Send internal email to Sam Peterson
    // await transporter.sendMail({
    //   from: `"Lumashape" <${process.env.EMAIL_USER}>`,
    //   to: 'sam.peterson@lumashape.com',
    //   subject: 'New Inquiry Received',
    //   html: internalEmailTemplate,
    // })

    return NextResponse.json({
      success: true,
      message: 'Data received and both emails sent successfully',
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error processing request', error: error.message },
        { status: 400 },
      )
    } else {
      return NextResponse.json(
        { message: 'Unexpected error', error: 'Unknown error occurred' },
        { status: 400 },
      )
    }
  }
}
