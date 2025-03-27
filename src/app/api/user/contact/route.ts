import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}mailLogo.jpg`

  try {
    // Parse the request body
    const data = await req.json()
    console.log(JSON.stringify(data, null, 2))

    // Configure the email transport using SMTP (for example, using Gmail)
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail', // Or any other SMTP service
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // })

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
      },
      debug: true,
    })

    // Create a dynamic HTML email template
    const emailTemplate = `
    <div
      style="
        padding-left: 10px;
        max-width: 100%;
        color: black;
        
      "
    >
       <div style=" text-align: center;">
          <img src="${logoUrl}" alt="Lumashape Logo" width="500" style="pointer-events: none; user-drag: none; -webkit-user-drag: none;" />
        </div>
     
       
      <p style="font-size: 30.59px; font-weight: 600; text-align: center;">Welcome to <span style="color: #266CA8;">Lumashape!</span></p>
      
  
      
  
      <div style=" ">
        <p
          style="
            font-size: 22px;
            font-weight: 600;
            color: black;
          "
        >
         Dear ${data.formData.first}${' '}${data.formData.last}
        </p>
      </div>

      <div style=" ">
        <p
          style="
            font-size: 22px;
            font-weight: 300;
            color: #00000099;
          "
        >
         Thank you for reaching out to us! We have received your inquiry and our team will review it shortly. 
        </p>
      </div>

      <p style="font-size: 25.59px; font-weight: 600;">Your Submitted Details</p>
      <hr/>

      <div style="display:flex; justify-content:start;">
        <p
          style="
            font-size: 22px;
            min-width: 300px;
            font-weight: 200;
            color: #00000080;
          "
        >
          Name:
        </p>
        <p style="font-size: 22px; font-weight: 500;">${
          data.formData.first
        }${' '}${data.formData.last}</p>
      </div>
  
      <div style="display:flex">
        <p
          style="
            font-size: 22px;
            min-width: 300px;
            font-weight: 200;
            color: #00000080;
          "
        >
          Email Address:
        </p>
        <p style="font-size: 22px; font-weight: 500; decoration:none">${
          data.formData.email
        }</p>
      </div>

  
      <div style=" ">
        <p
          style="
            font-size: 22px;
            min-width: 300px;
            font-weight: 200;
            color: #00000080;
          "
        >
          Message:
        </p>
        <p style="font-size: 22px; font-weight: 100;">${data.formData.message}
      </p>
      </div>
      <hr />
    
       <p style="margin-top: 30px;  font-size: 22px; font-weight: 300; color: #00000099;">
          If you have any questions or need assistance, please contact our support team at 
              <a href="mailto:sam.peterson@lumashape.com" style="color: #266CA8;">sam.peterson@lumashape.com</a></p>

        <p
          style="
            font-size: 22px;
            font-weight: 300;
            color: #00000099;
          "
        >
         Thank you for reaching out to us! We have received your inquiry and our team will review it shortly. 
        </p>
      

        <p style="margin-top: 60px;"><a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a> <span style="color: #000000;">  |  </span>     
            <a href="mailto:sam.peterson@lumashape.com" style="color: #000000;">sam.peterson@lumashape.com</a></p>
</div>


    </div>
  `

    // Set up email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.formData.email,
      subject: 'Contact',
      html: emailTemplate,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Data received and email sent successfully',
    })
  } catch (error) {
    // Cast error as `unknown`
    if (error instanceof Error) {
      // Check if error is an instance of Error
      console.error('Error sending email:', error)
      return NextResponse.json(
        { message: 'Error processing request', error: error.message },
        { status: 400 },
      )
    } else {
      console.error('Unexpected error:', error)
      return NextResponse.json(
        { message: 'Unexpected error', error: 'Unknown error occurred' },
        { status: 400 },
      )
    }
  }
}
