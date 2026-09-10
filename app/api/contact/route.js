import nodemailer from "nodemailer";

const clean = (value) => String(value || "").trim();
const safeSubject = (value) => clean(value).replace(/[\r\n]/g, " ");

export async function POST(request) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return Response.json(
      { success: false, message: "Email service is not configured yet." },
      { status: 500 },
    );
  }

  const query = Object.fromEntries(
    Object.entries(await request.json()).map(([key, value]) => [
      key,
      clean(value),
    ]),
  );
  const missing = ["name", "email", "message"].filter((field) => !query[field]);
  if (missing.length)
    return Response.json(
      {
        success: false,
        message: "Please complete all required fields.",
        missing,
      },
      { status: 400 },
    );

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `Posh Passage Limousines Website <${process.env.SMTP_USER}>`,
      to: process.env.BOOKING_EMAIL || process.env.SMTP_USER,
      replyTo: query.email,
      subject: `New Website Query - ${safeSubject(query.name)}`,
      text: [
        "NEW WEBSITE QUERY",
        "",
        "CUSTOMER INFORMATION",
        `Name: ${query.name}`,
        `Phone: ${query.phone || "Not provided"}`,
        `Email: ${query.email}`,
        "",
        "MESSAGE",
        query.message,
        "",
        "Posh Passage Limousines",
      ].join("\n"),
    });
    return Response.json(
      { success: true, message: "Your message has been sent." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact email failed:", error);
    return Response.json(
      { success: false, message: "Unable to send your message." },
      { status: 502 },
    );
  }
}
