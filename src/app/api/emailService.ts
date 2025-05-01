// import nodemailer from 'nodemailer'

// const sendEmail = async (email: string, message: string) => {
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
//   })

//   // Send the email
//   try {
//     await transporter.sendMail({
//       from: `"Lumashape" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Your Verification Code',
//       html: message,
//     })
//     console.log('Email sent successfully')
//   } catch (error) {
//     console.error('Error sending email:', error)
//     throw new Error('Failed to send email')
//   }
// }

// export default sendEmail

import axios, { AxiosError } from 'axios'

const sendEmail = async (email: string, message: string) => {
  const payload = {
    to: email,
    subject: 'Your Verification Code',
    body: message,
  }

  try {
    await axios.post(
      'https://aletheia.ai.ml-bench.com/api/send-microsoft-email',
      payload,
    )
  } catch (error) {
    const err = error as AxiosError
    console.error('Error sending email:', err.response?.data || err.message)
    throw new Error('Failed to send email')
  }
}

export default sendEmail
