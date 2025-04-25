import nodemailer from 'nodemailer'

const GetConnectedEmail = async (email: string) => {
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // })
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.office365.com',
  //   port: 587,
  //   secure: false, // Use TLS
  //   auth: {
  //     user: 'noreply@lumashape.com', // Your Microsoft 365 email
  //     pass: 'Flocohoco1!', // Your email password
  //   },
  //   tls: {
  //     ciphers: 'SSLv3', // Ensure secure connection
  //   },
  // })

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: 'noreply@lumashape.com',
      pass: 'Flocohoco1!',
    },
    tls: {
      ciphers: 'SSLv3',
    },
  })

  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}mailLogo.jpg`

  const htmlContent = `
   <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
   <div style="text-align:center">
      <img src="${logoUrl}" alt="Lumashape Logo" width="250" />

  </div>
  <p style="color:#333333; font-size: 18px; font-weight: 600;">Hi there,</p>
  <div style="font-size: 16px;">
  <p style="margin-bottom: 30px;">Thank you for subscribing to Lumashape! You’re now on our exclusive list for the latest updates, special announcements, and early access to new features.</p>
  <p style="margin-top: 30px;">If you have any questions or need assistance, please contact our support team at
     <a href="mailto:support@lumashape.com" style="color: #266CA8;">support@lumashape.com</a></p>

  </div>
  <p style="margin-top: 60px;"><a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a> <span style="color: #000000;">  |  </span>
     <a href="mailto:support@lumashape.com" style="color: #000000;">support@lumashape.com</a></p>
</div>
  `

  try {
    await transporter.sendMail({
      from: '"LumaShape" <noreply@lumashape.com>',
      to: email,
      subject: 'Thanks for Signing Up!',
      html: htmlContent,
    })
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

export default GetConnectedEmail
