

const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const htmlContent  = (resetPasswordUrl, UserName)=>{ 
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 10px;
        }
        .header {
            text-align: center;
            margin: 20px;
        }
        .header img {
            max-width: 300px;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
        }
        .content p {
            margin-bottom: 20px;
        }
        .content a {
            color: #1a73e8;
            text-decoration: none;
            font-weight: bold;
        }
        .content a.button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #1a73e8;
            color: #ffffff;
            border-radius: 5px;
            text-decoration: none;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777777;
        }
        .footer a {
            color: #1a73e8;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
    <div class="content">
    <div class="header">
        <img src="https://mybucket-seyasj3hj3.s3.amazonaws.com/mydocument/logo-wavw.png" alt="Your Company Logo">
    </div>
            <p>Hi ${UserName},</p>

            <p>We received a request to reset your password for your account. If you made this request, please click the button below to reset your password:</p>

            <p><a href="${resetPasswordUrl}" class="button">Reset Your Password</a></p>

            <p>If the button above does not work, you can copy and paste the following link into your browser:</p>

            <p><a href="${resetPasswordUrl}">${resetPasswordUrl}</a></p>

            <p>If you did not request a password reset, please ignore this email or <a href="mailto:support@yourcompany.com">contact us</a> if you have any questions.</p>

            <p>Thank you,<br>
            <strong>Your Company Name</strong></p>
        </div>
        <div class="footer">
            <p>You are receiving this email because you requested a password reset for your account on <a href="https://yourcompany.com">yourcompany.com</a>.</p>
            <p>If you no longer wish to receive these emails, you can <a href="https://yourcompany.com/unsubscribe">unsubscribe</a> at any time.</p>
            <p>Your Company Name, 123 Your Street, City, Country</p>
        </div>
    </div>
</body>
</html>
`};
  // 2) Define the email options
  const mailOptions = {
    from: `WaveTrack App <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html:htmlContent(options.resetURL, options.userName)
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error.message);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
  
};

module.exports = sendEmail;
