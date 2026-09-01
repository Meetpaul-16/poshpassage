import nodemailer from "nodemailer";

const clean = (value) => String(value || "").trim();

const safeSubject = (value) => clean(value).replace(/[\r\n]/g, " ");

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return response.status(500).json({
      success: false,
      message: "Email service is not configured yet.",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const query = Object.fromEntries(
      Object.entries(request.body || {}).map(([key, value]) => [
        key,
        clean(value),
      ]),
    );

    const missing = ["name", "email", "message"].filter(
      (field) => !query[field],
    );

    if (missing.length) {
      return response.status(400).json({
        success: false,
        message: "Please complete all required fields.",
        missing,
      });
    }

    const subject = `New Website Query – ${safeSubject(query.name)}`;

    const text = [
      "NEW WEBSITE QUERY",
      "─────────────────",
      "",
      "CUSTOMER INFORMATION",
      `Name: ${query.name}`,
      `Phone: ${query.phone || "Not provided"}`,
      `Email: ${query.email}`,
      "",
      "MESSAGE",
      query.message,
      "",
      "─────────────────",
      "Posh Passage Limousines",
      "Contact query received from website",
    ].join("\n");

    const info = await transporter.sendMail({
      from: `Posh Passage Limousines Website <${process.env.SMTP_USER}>`,
      to: process.env.BOOKING_EMAIL || process.env.SMTP_USER,
      replyTo: query.email,
      subject,
      text,
    });

    console.log("Contact email sent:", info.messageId);

    return response.status(201).json({
      success: true,
      message: "Your message has been sent.",
    });
  } catch (error) {
    console.error("Contact email failed:", error);

    return response.status(502).json({
      success: false,
      message: "Unable to send your message.",
    });
  }
}
