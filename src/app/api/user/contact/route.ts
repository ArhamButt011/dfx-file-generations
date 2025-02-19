import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const data = await req.json();
    console.log(JSON.stringify(data, null, 2))

    // Configure the email transport using SMTP (for example, using Gmail)
    const transporter = nodemailer.createTransport({
      host: "smtp.titan.email",
      port: 465,
      secure: true,
      auth: {
        user: "info@innate-nw.com",
        pass: "Innate@123",
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
            font-weight: 500;
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
            font-weight: 500;
            color: black;
          "
        >
          Name:
        </p>
        <p style="font-size: 22px; font-weight: 100;">${data.first}${" "}${data.last}</p>
      </div>
  
      <div style=" ">
        <p
          style="
            font-size: 22px;
            min-width: 300px;
            font-weight: 500;
            color: black;
          "
        >
          Email Address:
        </p>
        <p style="font-size: 22px; font-weight: 100;">${data.email}</p>
      </div>
  
      <div style=" ">
  <p
    style="
      font-size: 22px;
      min-width: 300px;
      font-weight: 500;
      color: black;
    "
  >
    Message:
  </p>
  <p style="font-size: 22px; font-weight: 100;">${data.phone}
  </p>
</div>

  
     <div style=" ">
        <p
          style="
            font-size: 22px;
            min-width: 300px;
            font-weight: 500;
            color: black;
          "
        >
          Project Address:
        </p>
        <p style="font-size: 22px; font-weight: 100;">${data.projectAddress}</p>
      </div>
  
      <div style=" ">
        <p
          style="
            font-size: 22px;
            min-width: 300px;
            font-weight: 500;
            color: black;
          "
        >
          Project Type:
        </p>
        <p style="font-size: 22px; font-weight: 100;">${data.projectType}</p>
      </div>
  
      <div style="">
        <p
          style="
            font-size: 22px;
            min-width: 300px;
            font-weight: 500;
            color: black;
          "
        >
         Message:
        </p>
        <p style="font-size: 22px; font-weight: 100;">${data.message}</p>
      </div>
      
  
      
</div>


    </div>
  `;

    // Set up email options
    const mailOptions = {
      from: "info@innate-nw.com", // Sender's email (from form submission)
      to: "info@innate-nw.com",
      subject: "New Form Submission",
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
