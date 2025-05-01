// import nodemailer from 'nodemailer'

// const sendWelcomeEmail = async (email: string, name: string) => {
//   // const transporter = nodemailer.createTransport({
//   //   service: 'gmail',
//   //   auth: {
//   //     user: process.env.EMAIL_USER,
//   //     pass: process.env.EMAIL_PASS,
//   //   },
//   // })

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.office365.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       ciphers: 'SSLv3',
//     },
//     debug: true,
//   })

//   const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}mailLogo.jpg`
//   const linkedinUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}linkedin.jpg`
//   const youtubeUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}youtube.jpg`

//   try {
//     await transporter.sendMail({
//       from: `"Lumashape" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Welcome to Lumashape',
//       html: htmlContent,
//     })
//   } catch (error) {
//     console.error('Error sending email:', error)
//     throw new Error('Failed to send email')
//   }
// }

// export default sendWelcomeEmail

import axios from 'axios'

const sendWelcomeEmail = async (email: string, name: string) => {
  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}mailLogo.jpg`
  const linkedinUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}linkedin.jpg`
  const youtubeUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}youtube.jpg`

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
    <a href="mailto:support@lumashape.com" style="color: #266CA8;">support@lumashape.com</a></p>
 <p>Thank you for joining us & we hope you have a great experience on the app!</p>
 </div>

 <p style="margin-top: 60px;"><a href="https://www.lumashape.com" style="color: #000000; text-decoration: none;">www.lumashape.com</a> <span style="color: #000000;">  |  </span>
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
  const payload = {
    to: email,
    subject: 'Welcome to Lumashape',
    body: htmlContent,
  }

  try {
    await axios.post(
      'https://aletheia.ai.ml-bench.com/api/send-microsoft-email',
      payload,
    )
  } catch {
    throw new Error('Failed to send welcome email')
  }
}

export default sendWelcomeEmail
