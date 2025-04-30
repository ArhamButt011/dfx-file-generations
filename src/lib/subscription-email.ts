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

  const mailOptions = {
    from: `"Lumashape" <${process.env.EMAIL_USER}>`,
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
            text-align: center;
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
            padding-top: 10px;
            padding-bottom: 10px;
            padding-right: 10px;
            padding-left: 0px;
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
          .summary-table td {
            text-align: right;
          }
        </style>
      </head>
      <body>
        <div class="container">
         <div class="logo">
          <img src="${logoUrl}" alt="Lumashape Logo" width="250" style="pointer-events: none; user-drag: none; -webkit-user-drag: none;" />
        </div>

          <div class="header">
            <p><strong>Dear ${user_name},</strong></p>
            <p>Thank you for subscribing with Lumashape. This email serves as a receipt for your recent purchase. Below, you will find the details of your subscriptions and payments.</p>
          </div>
          <div class="invoice-date"><p>Invoice Date</p></div>
          <table width="100%" style="border-bottom: 1px solid #0000001A;">
           <tr >
  <td align="left" style="font-size: 25px;">
    <strong>Your Subscriptions</strong>
  </td>
  <td align="right"><strong>${addedDate}</strong></td>
</tr>
          </table>
          <table style="width: 100%; border-collapse: collapse; margin-top: 14px; ">
            <tr>
              <th align="left" style="color: #666;">SUBSCRIPTION NAME</th>
              <th align="right">RENEWAL DATE</th>
              <th align="right">AMOUNT</th>
            </tr>
            <tr style="border-bottom: 1px solid #0000001A;">
              <td style="padding-top: 16px;" align="left"><strong>${planName}</strong></td>
              <td align="right">${expiryDate}</td>
              <td align="right">$${total}</td>
            </tr>
          </table>
<table class="summary-table" width="100%" style="margin-top: 20px;">
    <tr>
        <td colspan="2"></td>
        <td class="total" align="right" style="padding-right: 20px; padding-bottom:8px;">
            Sub Total:
        </td>
        <td class="amount" style="text-align: right; border-bottom: 1px solid #0000001A;">
            $${subTotal}
        </td>
    </tr>
    <tr>
        <td colspan="2"></td> <!-- Empty cell to align properly -->
        <td class="total" align="right" style="padding-right: 20px; padding-top:8px;">
            Total:
        </td>
        <td class="amount" style="text-align: right;">
            $${total}
        </td>
    </tr>
</table>


          <div class="important-info">
            <p><strong>Important Information</strong></p>
            
            <p>${`This is a monthly subscription that will renew automatically unless canceled. You can manage or cancel your subscription anytime from your account settings. For questions or assistance, please contact our support team at ${
              planName === 'Premium' ? 'support@lumashape.com' : ''
            }`}</p>
          </div>
          <div class="footer">
            <div class="footer-links">
            <a href="https://www.lumashape.com" target="_blank">www.lumashape.com</a> &nbsp; | &nbsp;  
<a href="mailto:support@lumashape.com">support@lumashape.com</a>

            </div>
          </div>
          <div style="text-align: start; margin-top: 10px;">
        <a href="https://www.linkedin.com/company/lumashape/" style="text-decoration: none;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="20" />
        </a>
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
