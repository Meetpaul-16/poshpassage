import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT || 3001);
const requiredEnvironment = ["SMTP_USER", "SMTP_PASS"];

app.use(express.json({ limit: "20kb" }));

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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

app.post("/api/booking", async (request, response) => {
  const booking = Object.fromEntries(
    Object.entries(request.body || {}).map(([key, value]) => [
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
    return response.status(400).json({
      success: false,
      message: "Please complete all required fields.",
    });

  if (requiredEnvironment.some((key) => !process.env[key])) {
    console.error(
      "Missing SMTP configuration. Add SMTP_USER and SMTP_PASS to .env.",
    );
    return response.status(500).json({
      success: false,
      message: "Email service is not configured yet.",
    });
  }

  const subject = `New Ride Booking – ${safeSubject(booking.name)} – ${formatDate(booking["pickup-date"])}`;
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

  try {
    await transporter.sendMail({
      from: `Posh Passage Limousines Website <${process.env.SMTP_USER}>`,
      to: process.env.BOOKING_EMAIL || process.env.SMTP_USER,
      replyTo: booking.email,
      subject,
      text,
    });
    return response.status(201).json({ success: true });
  } catch (error) {
    console.error("Booking email failed:", error.message);
    return response
      .status(502)
      .json({ success: false, message: "Unable to send booking email." });
  }
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.join(__dirname, "dist");
app.use(express.static(distDirectory));
app.get("*", (_request, response) =>
  response.sendFile(path.join(distDirectory, "index.html")),
);

app.listen(port, () => console.log(`Booking API listening on port ${port}`));
