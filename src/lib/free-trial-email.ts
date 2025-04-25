import nodemailer from 'nodemailer'

const FreeTrialEmail = async (email: string, name: string, expiry: string) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Missing required email environment variables.')
  }

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
      
      <p style="color:#333333; font-size: 18px; font-weight: 600;">Dear ${name},</p>
      <div style="font-size: 16px;">
        <p style="margin-bottom: 30px;">We have exciting news for you! Your free trial of Lumashape is now active.</p>
        <p>For the next 7 days, enjoy full access to AI-powered DXF file creation and experience how Lumashape simplifies custom tool drawer insert design with unmatched precision and ease.</p>
        <p style="margin-top: 30px;">Your Free trial will expire on <strong>${expiry}</strong>. Upgrade anytime to continue enjoying these powerful features after your trial ends.</p>
        <p style="margin-top: 30px;">If you have any questions or need assistance, please contact our support team at 
          <a href="mailto:support@lumashape.com" style="color: #266CA8;">support@lumashape.com</a>
        </p>
        <p>Thank you for joining us & we hope you have a great experience on the app!</p>
      </div>
      <p style="margin-top: 60px;">
        <a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a>  
        <span style="color: #000000;"> | </span>     
        <a href="mailto:support@lumashape.com" style="color: #000000;">support@lumashape.com</a>
      </p>
    </div>
  `

  try {
    const mailOptions = {
      from: `"LumaShape" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Free Subscription',
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

export default FreeTrialEmail
