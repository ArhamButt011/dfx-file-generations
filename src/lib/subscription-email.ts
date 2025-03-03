import nodemailer from 'nodemailer'

export const sendSubscriptionEmail = async (
  toEmail: string,
  planName: string,
  expiryDate: string,
  addedDate: string,
  total: number,
  subTotal: number,
  user_name: string,
) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}mailLogo.jpg`

  const mailOptions = {
    from: `"DFX File Generation" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Subscription Activated: ${planName}`,

    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Subscription Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #666;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
          }
          .logo {
            padding: 10px 0;
          }
          .header {
            text-align: start;
            padding: 10px 0;
          }
          .invoice-date {
            text-align: right;
            font-size: 14px;
            color: #666;
          }
          .subscriptions {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .subscriptions th, .subscriptions td {
            padding: 10px;
            text-align: left;
          }
          .amount {
            text-align: right;
          }
          .total {
            font-weight: bold;
          }
          .important-info {
            margin-top: 20px;
            padding: 10px;
          }
          .footer {
            text-align: left;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
          }
          .footer-links {
            display: flex;
            justify-content: flex-start;
            gap: 10px;
          }
          .footer a {
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
              <img src="${logoUrl}" alt="Lumashape Logo" width="250" />
          </div>
          <div class="header">
            <p><strong>Dear ${user_name},</strong></p>
            <p>Thank you for subscribing with Lumashape. This email serves as a receipt for your recent purchase. Below, you will find the details of your subscriptions and payments.</p>
          </div>
          <div class="invoice-date"><p>Invoice Date</p></div>
          <table width="100%">
            <tr>
              <td align="left" style="font-size: 25px;" class="your-subscription"><strong>Your Subscriptions</strong></td>
              <td align="right"><strong>${addedDate}</strong></td>
            </tr>
          </table>
          <table class="subscriptions">
            <tr>
              <th style="color: #666;">Subscription Name</th>
              <th>Exp Date</th>
              <th class="amount">Amount</th>
            </tr>
            <tr>
              <td><strong>${planName}</strong></td>
              <td>${expiryDate}</td>
              <td class="amount">$${total}</td>
            </tr>
          </table>
          <table class="subscriptions">
            <tr>
              <td class="total">Sub Total:</td>
              <td class="amount">$${subTotal}</td>
            </tr>
            <tr>
              <td class="total">Total:</td>
              <td class="amount">$${total}</td>
            </tr>
          </table>
          <div class="important-info">
            <p><strong>Important Information</strong></p>
            <p>This payment is recurring and will charge every month if not cancelled beforehand (for subscriptions).</p>
            <p>This payment is for one-time use and to use this feature again, please make another payment on the app.</p>
            <p>${`If this payment was not made by you, please get in touch with our customer service team at ${
              planName === 'Premium' ? 'sam.peterson@lumashape.com' : ''
            }`}</p>
          </div>
          <div class="footer">
            <div class="footer-links">
              <a href="https://www.lumashape.com" target="_blank">www.lumashape.com</a> | 
              <a href="mailto:sam.peterson@lumashape.com">sam.peterson@lumashape.com</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
