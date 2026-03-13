import nodemailer from "nodemailer";
import { config } from "../config/env.js";

// Create transporter
const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465, // true for 465, false for other ports
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("✉️ Email service ready");
  }
});

export async function sendContactNotification(
  contactInfo: {
    name: string;
    email: string;
    message: string;
  },
  adminEmail: string,
): Promise<boolean> {
  try {
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${contactInfo.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${contactInfo.email}">${contactInfo.email}</a></p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${contactInfo.message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        Submitted at: ${new Date().toLocaleString()}
      </p>
    `;

    await transporter.sendMail({
      from: config.email.senderEmail,
      to: adminEmail,
      subject: `New Contact Form Submission from ${contactInfo.name}`,
      text: `New message from ${contactInfo.name} (${contactInfo.email}): ${contactInfo.message}`,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Failed to send contact notification:", error);
    return false;
  }
}

export async function sendOTPEmail(
  email: string,
  otp: string,
): Promise<boolean> {
  try {
    const htmlContent = `
      <h2>Your AppForge Admin Login OTP</h2>
      <p>Your One-Time Password (OTP) is:</p>
      <h1 style="color: #6467f2; letter-spacing: 3px;">${otp}</h1>
      <p style="color: #666;">This OTP will expire in 10 minutes.</p>
      <p style="color: #999; font-size: 12px;">
        If you didn't request this, please ignore this email.
      </p>
    `;

    await transporter.sendMail({
      from: config.email.senderEmail,
      to: email,
      subject: "AppForge Admin Login - OTP",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string): Promise<boolean> {
  try {
    const htmlContent = `
      <h2>Welcome to AppForge Admin</h2>
      <p>You have successfully logged in to the AppForge Admin Dashboard.</p>
      <p>You can now manage your apps, screenshots, and view contact messages.</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        Login time: ${new Date().toLocaleString()}
      </p>
    `;

    await transporter.sendMail({
      from: config.email.senderEmail,
      to: email,
      subject: "Welcome to AppForge Admin",
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
}

export default transporter;
