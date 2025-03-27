import nodemailer from 'nodemailer'

const sendWelcomeEmail = async (email: string, name: string) => {
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
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

  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}mailLogo.jpg`

  const htmlContent = `
   <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
   <div style="text-align:center">
      <img src="${logoUrl}" alt="Lumashape Logo" width="250" />

  </div>
  <h2 style="text-align:center;">Welcome to <span style="color: #266CA8;">Lumashape!</span></h2>
  <p style="color:#333333; font-size: 18px; font-weight: 600;">Dear ${name},</p>
  <div style="font-size: 16px;">
  <p style="margin-bottom: 30px;">Welcome to Lumashape where precision meets automation!</p>
  <p>Our AI-powered platform makes it effortless to create highly accurate DXF files for custom tool drawer inserts—whether you're a hobbyist or a professional. Say goodbye to tedious manual design work and hello to seamless, efficient workflows!</p>
  <p style="margin-top: 30px;">If you have any questions or need assistance, please contact our support team at 
     <a href="mailto:sam.peterson@lumashape.com" style="color: #266CA8;">sam.peterson@lumashape.com</a></p>
  <p>Thank you for joining us & we hope you have a great experience on the app!</p>
  </div>
  <p style="margin-top: 60px;"><a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a> <span style="color: #000000;">  |  </span>     
     <a href="mailto:sam.peterson@lumashape.com" style="color: #000000;">sam.peterson@lumashape.com</a></p>
</div>

  `

  try {
    await transporter.sendMail({
      from: `"LumaShape" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Lumashape',
      html: htmlContent,
    })
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

export default sendWelcomeEmail
