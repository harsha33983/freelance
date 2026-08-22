import nodemailer from "nodemailer";

// Create reusable transporter
function createTransporter() {
  // Use SMTP env vars — supports Gmail, SendGrid, Resend SMTP, Mailgun, etc.
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const FROM = `"Bhagavad Gita Vishwa Mahotsav 2027" <${process.env.SMTP_USER || "noreply@bgvmahotsav2027.org"}>`;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@bgvmahotsav2027.org";

// ── Email templates ────────────────────────────────────────────────────────

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Inter, Arial, sans-serif; background: #FAF8F3; color: #2B2B2B; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 2px; overflow: hidden; border: 1px solid #e5e7eb; }
    .header { background: #0A0A0A; padding: 32px 40px; text-align: center; }
    .header h1 { color: #C9A227; font-family: Georgia, serif; font-size: 20px; margin: 0 0 4px; }
    .header p { color: #9CA3AF; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .gold-bar { height: 3px; background: linear-gradient(90deg, #D4AF37, #B8860B); }
    .body { padding: 40px; }
    .body p { line-height: 1.7; margin: 0 0 16px; }
    .cta { display: inline-block; padding: 12px 28px; background: #C9A227; color: #111; font-weight: 600; text-decoration: none; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; border-radius: 2px; margin: 16px 0; }
    .footer { background: #F9F9F9; border-top: 1px solid #E5E7EB; padding: 20px 40px; text-align: center; color: #9CA3AF; font-size: 11px; }
    .gold { color: #C9A227; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Bhagavad Gita Vishwa Mahotsav</h1>
      <p>2027 &nbsp;•&nbsp; 18 Countries &nbsp;•&nbsp; 18 Chapters &nbsp;•&nbsp; 18 Languages</p>
    </div>
    <div class="gold-bar"></div>
    <div class="body">${content}</div>
    <div class="footer">
      <p>© 2026–27 Bhagavad Gita Vishwa Mahotsav Trust. All Rights Reserved.</p>
      <p>Bengaluru, Karnataka, India &nbsp;|&nbsp; info@bgvmahotsav2027.org</p>
    </div>
  </div>
</body>
</html>`;
}

// ── Public-facing send functions ───────────────────────────────────────────

export async function sendRegistrationConfirmation(data: {
  name: string;
  email: string;
  type: string;
  country: string;
}) {
  if (!process.env.SMTP_USER) return; // Skip if not configured
  const transporter = createTransporter();

  const content = `
    <p>Hare Krishna, <strong class="gold">${data.name}</strong>!</p>
    <p>Your registration for the <strong>Bhagavad Gita Vishwa Mahotsav 2027</strong> has been successfully received.</p>
    <table style="width:100%; border-collapse:collapse; margin:20px 0;">
      <tr><td style="padding:8px 0; color:#6B7280; font-size:13px;">Registration Type</td><td style="padding:8px 0; font-weight:600; font-size:13px; text-transform:capitalize">${data.type}</td></tr>
      <tr><td style="padding:8px 0; color:#6B7280; font-size:13px;">Country</td><td style="padding:8px 0; font-weight:600; font-size:13px;">${data.country}</td></tr>
      <tr><td style="padding:8px 0; color:#6B7280; font-size:13px;">Event Date</td><td style="padding:8px 0; font-weight:600; font-size:13px;">27 February 2027</td></tr>
    </table>
    <p>We will send you further information about the event schedule, accommodation, and logistics as the date approaches.</p>
    <p style="text-align:center"><a href="https://bgvmahotsav2027.org" class="cta">Explore the Mahotsav</a></p>
    <p>With warm regards and Jai Shri Krishna,<br/><strong>The Mahotsav Team</strong></p>
  `;

  await transporter.sendMail({
    from: FROM,
    to: data.email,
    subject: "Registration Confirmed — Bhagavad Gita Vishwa Mahotsav 2027 🔱",
    html: baseTemplate(content),
  });

  // Notify admin
  await transporter.sendMail({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Registration: ${data.type} — ${data.name} (${data.country})`,
    text: `New registration received:\nName: ${data.name}\nEmail: ${data.email}\nType: ${data.type}\nCountry: ${data.country}`,
  });
}

export async function sendVolunteerConfirmation(data: {
  name: string;
  email: string;
  area: string;
}) {
  if (!process.env.SMTP_USER) return;
  const transporter = createTransporter();

  const content = `
    <p>Hare Krishna, <strong>${data.name}</strong>!</p>
    <p>Thank you for offering your seva to the <strong>Bhagavad Gita Vishwa Mahotsav 2027</strong>. Your volunteer application for the <strong>${data.area}</strong> area has been received.</p>
    <p>Our volunteer coordinator will review your application and contact you within 5 working days with next steps.</p>
    <p>Your contribution — however large or small — is an act of karma yoga that helps bring the Gita's wisdom to the world.</p>
    <p>With warm regards,<br/><strong>The Mahotsav Volunteer Team</strong></p>
  `;

  await transporter.sendMail({ from: FROM, to: data.email, subject: "Volunteer Application Received — Bhagavad Gita Vishwa Mahotsav 2027", html: baseTemplate(content) });
  await transporter.sendMail({ from: FROM, to: ADMIN_EMAIL, subject: `New Volunteer: ${data.name} — ${data.area}`, text: `Name: ${data.name}\nEmail: ${data.email}\nArea: ${data.area}` });
}

export async function sendHostParayanaConfirmation(data: {
  contactPerson: string;
  email: string;
  communityName: string;
  city: string;
}) {
  if (!process.env.SMTP_USER) return;
  const transporter = createTransporter();

  const content = `
    <p>Hare Krishna, <strong>${data.contactPerson}</strong>!</p>
    <p>Thank you for your interest in hosting a Bhagavad Gita Parayana through the <strong>Vishwa Mahotsav 2027</strong>.</p>
    <p>Your request for <strong>${data.communityName}</strong> in <strong>${data.city}</strong> has been received. Our team will contact you within 5 working days with the official Parayana Hosting Kit.</p>
    <p>With warm regards,<br/><strong>The Mahotsav Team</strong></p>
  `;

  await transporter.sendMail({ from: FROM, to: data.email, subject: "Parayana Host Request Received — Bhagavad Gita Vishwa Mahotsav 2027", html: baseTemplate(content) });
  await transporter.sendMail({ from: FROM, to: ADMIN_EMAIL, subject: `New Parayana Host: ${data.communityName} — ${data.city}`, text: `Contact: ${data.contactPerson}\nEmail: ${data.email}\nOrg: ${data.communityName}\nCity: ${data.city}` });
}

export async function sendPartnershipConfirmation(data: {
  contactPerson: string;
  email: string;
  orgName: string;
  interestArea: string;
}) {
  if (!process.env.SMTP_USER) return;
  const transporter = createTransporter();

  const content = `
    <p>Dear <strong>${data.contactPerson}</strong>,</p>
    <p>Thank you for expressing interest in partnering with the <strong>Bhagavad Gita Vishwa Mahotsav 2027</strong>.</p>
    <p>Your proposal from <strong>${data.orgName}</strong> regarding <strong>${data.interestArea}</strong> has been received. Our Partnerships team will respond within 3 working days.</p>
    <p>With warm regards,<br/><strong>The Mahotsav Partnerships Team</strong></p>
  `;

  await transporter.sendMail({ from: FROM, to: data.email, subject: "Partnership Proposal Received — Bhagavad Gita Vishwa Mahotsav 2027", html: baseTemplate(content) });
  await transporter.sendMail({ from: FROM, to: ADMIN_EMAIL, subject: `New Partnership Proposal: ${data.orgName} — ${data.interestArea}`, text: `Contact: ${data.contactPerson}\nEmail: ${data.email}\nOrg: ${data.orgName}\nInterest: ${data.interestArea}` });
}

export async function sendContactConfirmation(data: {
  name: string;
  email: string;
  category: string;
}) {
  if (!process.env.SMTP_USER) return;
  const transporter = createTransporter();

  const content = `
    <p>Dear <strong>${data.name}</strong>,</p>
    <p>Thank you for contacting the Bhagavad Gita Vishwa Mahotsav team.</p>
    <p>Your message regarding <strong>${data.category}</strong> has been received. We aim to respond within 2 working days.</p>
    <p>With warm regards,<br/><strong>The Mahotsav Team</strong></p>
  `;

  await transporter.sendMail({ from: FROM, to: data.email, subject: "Message Received — Bhagavad Gita Vishwa Mahotsav 2027", html: baseTemplate(content) });
  await transporter.sendMail({ from: FROM, to: ADMIN_EMAIL, subject: `New Contact: ${data.name} — ${data.category}`, text: `Name: ${data.name}\nEmail: ${data.email}\nCategory: ${data.category}` });
}

export async function sendNewsletterWelcome(email: string) {
  if (!process.env.SMTP_USER) return;
  const transporter = createTransporter();

  const content = `
    <p>Hare Krishna!</p>
    <p>You've successfully subscribed to updates from the <strong>Bhagavad Gita Vishwa Mahotsav 2027</strong>.</p>
    <p>We'll keep you informed about event announcements, programme highlights, registration openings, and inspiring stories from the global Gita community.</p>
    <p style="text-align:center"><a href="https://bgvmahotsav2027.org" class="cta">Explore the Mahotsav</a></p>
    <p>With warm regards,<br/><strong>The Mahotsav Team</strong></p>
  `;

  await transporter.sendMail({ from: FROM, to: email, subject: "Welcome to the Mahotsav Newsletter 🔱", html: baseTemplate(content) });
}
