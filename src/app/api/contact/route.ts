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

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ success: false, error: "Invalid JSON" }, 400);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !message || !EMAIL_RE.test(email) || name.length > 200 || email.length > 320 || subject.length > 200 || message.length > 5000) {
    return json({ success: false, error: "Invalid input" }, 400);
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("[contact] EMAIL_USER / EMAIL_PASS are not set");
    return json({ success: false, error: "Mail is not configured" }, 500);
  }

  const transporter = nodemailer.createTransport({
    // Port 587 + STARTTLS rather than the "gmail" preset (465): the VPS
    // blocks outbound 465.
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Fail fast instead of hanging past the reverse proxy's timeout (-> 504)
    // when outbound SMTP is blocked or slow.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    await transporter.sendMail({
      // Gmail only sends as the authenticated account; the visitor goes in Reply-To.
      from: `"Portfolio contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: subject || "New Message from Portfolio",
      text: `${name} <${email}>\n\n${message}`,
      html: htmlEmail(escapeHtml(name), escapeHtml(email), escapeHtml(message).replace(/\n/g, "<br>")),
    });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return json({ success: false, error: "Failed to send message" }, 502);
  }

  return json({ success: true }, 200);
}
