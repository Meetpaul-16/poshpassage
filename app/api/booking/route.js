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

export async function POST(request) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return Response.json(
      { success: false, message: "Email service is not configured yet." },
      { status: 500 },
    );
  }

  const booking = Object.fromEntries(
    Object.entries(await request.json()).map(([key, value]) => [
      key,
      clean(value),
    ]),
  );
  const missing = [
    "name",
    "phone",
    "email",
    "pickup-date",
    "pickup-time",
    "pickup",
  ].filter((field) => !booking[field]);
  if (missing.length)
    return Response.json(
      {
        success: false,
        message: "Please complete all required fields.",
        missing,
      },
      { status: 400 },
    );

  const text = [
    "NEW RIDE BOOKING REQUEST",
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
    "Posh Passage Limousines",
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `Posh Passage Limousines Website <${process.env.SMTP_USER}>`,
      to: process.env.BOOKING_EMAIL || process.env.SMTP_USER,
      replyTo: booking.email,
      subject: `New Ride Booking - ${safeSubject(booking.name)} - ${formatDate(booking["pickup-date"])}`,
      text,
    });
    return Response.json(
      { success: true, message: "Booking submitted successfully." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Booking email failed:", error);
    return Response.json(
      { success: false, message: "Unable to send booking email." },
      { status: 502 },
    );
  }
}
