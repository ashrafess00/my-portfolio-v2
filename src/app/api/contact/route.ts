import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const htmlEmail = (name: string, email: string, message: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      color: #333333;
    }
    p {
      line-height: 1.5;
      color: #555555;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Message from ${name}</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>

    <div class="footer">
      This message was sent from your website contact form.
    </div>
  </div>
</body>
</html>
`;

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();
  console.log(name, email, subject, message);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: subject || "New Message from Portfolio",
    text: message,
    html: htmlEmail(name, email, message),
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
