import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const data = await req.json();
    console.log(JSON.stringify(data, null, 2))

    // Configure the email transport using SMTP (for example, using Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or any other SMTP service
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    

    // Create a dynamic HTML email template
    const emailTemplate = `
    <div
      style="
        
       
        padding-left: 10px;
        max-width: 900px;
        color: black;
        
      "
    >
     
       
      <p style="font-size: 38.59px; font-weight: 600; margin-top: 40px;">Contact Details</p>
      
  
      <div style=" ">
        <p
          style="
            font-size: 22px;
            min-width: 300px;
            font-weight: 700;
            color: black;
          "
        >
          Created on:
        </p>
        <p style="font-size: 22px; font-weight: 100;">${new Date().toLocaleDateString()}</p>
      </div>
  
      <div style=" ">
        <p
          style="
            font-size: 22px;
            min-width: 300px;
            font-weight: 700;
            color: black;
          "
        >
          Name:
        </p>
        <p style="font-size: 22px; font-weight: 100;">${data.formData.first}${" "}${data.formData.last}</p>
      </div>
  
      <div style=" ">
        <p
          style="
            font-size: 22px;
            min-width: 300px;
            font-weight: 700;
            color: black;
          "
        >
          Email Address:
        </p>
        <p style="font-size: 22px; font-weight: 100;">${data.formData.email}</p>
      </div>
  
      <div style=" ">
  <p
    style="
      font-size: 22px;
      min-width: 300px;
      font-weight: 700;
      color: black;
    "
  >
    Message:
  </p>
  <p style="font-size: 22px; font-weight: 100;">${data.formData.message}
  </p>
</div>
    
  
      
</div>


    </div>
  `;

    // Set up email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Contact",
        html: emailTemplate,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Data received and email sent successfully",
    });
  } catch (error: unknown) {
    // Cast error as `unknown`
    if (error instanceof Error) {
      // Check if error is an instance of Error
      console.error("Error sending email:", error);
      return NextResponse.json(
        { message: "Error processing request", error: error.message },
        { status: 400 }
      );
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { message: "Unexpected error", error: "Unknown error occurred" },
        { status: 400 }
      );
    }
  }
}
