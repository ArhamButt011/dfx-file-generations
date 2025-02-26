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
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // App password
    },
  })

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
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
          .subscriptions-date {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  font-size: 14px;
  color: #666;
  padding: 10px 0;
}

          .subscriptions {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .subscriptions th, .subscriptions td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          .subscriptions th {
            background: #f8f8f8;
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
  gap: 10px; /* Adjust spacing between links */
}

.footer a {
  
  text-decoration: none;
}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="/public/images/user/home/logo.svg" alt="Company Logo">
          </div>
          <div class="header">
            <p><strong>Dear ${user_name},</strong></p>
            <p>Thank you for subscribing with Lumashape. This email serves as a receipt for your recent purchase. Below, you will find the details of your subscriptions and payments</p>
          </div>
          <div class="invoice-date"><p>Invoice Date</p></div>
          <table width="100%">
  <tr>
    <td align="left">Your Subscriptions</td>
    <td align="right"><strong>${addedDate}</strong></td>
  </tr>
</table>

      
          <table class="subscriptions">
            <tr>
              <th>Subscription Name</th>
              <th>Exp Date</th>
              <th class="amount">Amount</th>
            </tr>
            <tr>
              <td><strong>${planName}</br>This payment is recurring and will charge every month if not cancelled beforehand (for subcriptions)</strong></td>
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
            <p>This payment is recurring and will charge every month if not cancelled beforehand (for subcriptions)</p>
            <p>This payment is for one-time use and to use this feature again, please make another payment on the app</p>
          
          <p>${`If this payment was not made by you please get in touch with our customer service team at ${
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
