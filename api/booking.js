import nodemailer from "nodemailer";

const clean = (value) => String(value || "").trim();

const safeSubject = (value) => clean(value).replace(/[\r\n]/g, " ");

const formatDate = (value) => {
  if (!value) return "Not provided";

  const date = new Date(`${value}T12:00:00`);

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  const requiredEnvironment = ["SMTP_USER", "SMTP_PASS"];

  const missingEnvironment = requiredEnvironment.filter(
    (key) => !process.env[key],
  );

  if (missingEnvironment.length) {
    console.error(
      `Missing environment variables: ${missingEnvironment.join(", ")}`,
    );

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

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  try {
    const booking = Object.fromEntries(
      Object.entries(request.body || {}).map(([key, value]) => [
        key,
        clean(value),
      ]),
    );

    console.log("Booking received:", {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      pickup: booking.pickup,
      dropoff: booking.dropoff,
    });

    const missing = [
      "name",
      "phone",
      "email",
      "pickup-date",
      "pickup-time",
      "pickup",
    ].filter((field) => !booking[field]);

    if (missing.length) {
      return response.status(400).json({
        success: false,
        message: "Please complete all required fields.",
        missing,
      });
    }

    const subject = `New Ride Booking – ${safeSubject(
      booking.name,
    )} – ${formatDate(booking["pickup-date"])}`;

    const text = [
      "NEW RIDE BOOKING REQUEST",
      "────────────────────────",
      "",
      "CUSTOMER INFORMATION",
      `Name: ${booking.name}`,
      `Phone: ${booking.phone}`,
      `Email: ${booking.email}`,
      "",
      "TRIP DETAILS",
      `Occasion: ${booking.occasion || "Not provided"}`,
      `Vehicle: ${booking.vehicle || "Not provided"}`,
      `Passengers: ${booking.passengers || "Not provided"}`,
      `Trip Type: ${booking["trip-type"] || "Not provided"}`,
      "",
      `Pickup Date: ${formatDate(booking["pickup-date"])}`,
      `Pickup Time: ${booking["pickup-time"] || "Not provided"}`,
      "",
      "PICKUP LOCATION",
      booking.pickup,
      "",
      "DROP-OFF LOCATION",
      booking.dropoff || "Not provided",
      "",
      "SPECIAL REQUESTS",
      booking.notes || "None",
      "",
      "────────────────────────",
      "Posh Passage Limousines",
      "Booking request received from website",
    ].join("\n");

    const info = await transporter.sendMail({
      from: `Posh Passage Limousines Website <${process.env.SMTP_USER}>`,
      to: process.env.BOOKING_EMAIL || process.env.SMTP_USER,
      replyTo: booking.email,
      subject,
      text,
    });

    console.log("Booking email sent:", info.messageId);

    return response.status(201).json({
      success: true,
      message: "Booking submitted successfully.",
    });
  } catch (error) {
    console.error("Booking email failed:", error);

    return response.status(502).json({
      success: false,
      message: "Unable to send booking email.",
    });
  }
}
