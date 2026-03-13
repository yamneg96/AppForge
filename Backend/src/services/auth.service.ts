import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/env.js";
import { AdminAuth, OTPSession, AdminSession } from "../models/AdminAuth.js";
import { sendOTPEmail, sendWelcomeEmail } from "./email.service.js";

const VALID_ADMIN_EMAIL = "yamlaknegash96@gmail.com";

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateToken(email: string): string {
  return jwt.sign({ email }, config.jwtSecret, {
    expiresIn: config.jwtExpiry,
  });
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function requestOTP(email: string): Promise<boolean> {
  // Validate email
  if (email.toLowerCase() !== VALID_ADMIN_EMAIL.toLowerCase()) {
    throw new Error("Invalid admin email");
  }

  // Generate OTP
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Delete any existing OTP for this email
  await OTPSession.deleteMany({ email: email.toLowerCase() });

  // Create new OTP session
  const otpSession = new OTPSession({
    email: email.toLowerCase(),
    otp,
    attempts: 0,
    expiresAt,
  });

  await otpSession.save();

  // Send OTP via email
  const emailSent = await sendOTPEmail(email, otp);
  if (!emailSent) {
    throw new Error("Failed to send OTP email");
  }

  return true;
}

export async function verifyOTP(
  email: string,
  otp: string,
): Promise<{ token: string; sessionId: string }> {
  // Validate email
  if (email.toLowerCase() !== VALID_ADMIN_EMAIL.toLowerCase()) {
    throw new Error("Invalid admin email");
  }

  // Find OTP session
  const otpSession = await OTPSession.findOne({
    email: email.toLowerCase(),
    expiresAt: { $gt: new Date() },
  });

  if (!otpSession) {
    throw new Error("OTP expired or not found");
  }

  // Check attempts (max 5 attempts)
  if (otpSession.attempts >= 5) {
    await OTPSession.deleteOne({ _id: otpSession._id });
    throw new Error("Too many failed attempts");
  }

  // Verify OTP
  if (otpSession.otp !== otp) {
    otpSession.attempts += 1;
    await otpSession.save();
    throw new Error("Invalid OTP");
  }

  // Find or create admin auth record
  let admin = await AdminAuth.findOne({ email: email.toLowerCase() });
  if (!admin) {
    admin = new AdminAuth({
      email: email.toLowerCase(),
      isVerified: true,
    });
    await admin.save();
  } else if (!admin.isVerified) {
    admin.isVerified = true;
    await admin.save();
  }

  // Delete used OTP
  await OTPSession.deleteOne({ _id: otpSession._id });

  // Create session token
  const sessionToken = generateSessionToken();
  const sessionExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const adminSession = new AdminSession({
    adminId: admin._id,
    token: sessionToken,
    expiresAt: sessionExpiresAt,
  });

  await adminSession.save();

  // Send welcome email
  await sendWelcomeEmail(email);

  // Generate JWT token
  const jwtToken = generateToken(email);

  return {
    token: jwtToken,
    sessionId: sessionToken,
  };
}

export async function verifyGoogleAuth(
  email: string,
  googleId: string,
): Promise<{ token: string; sessionId: string }> {
  // Validate email
  if (email.toLowerCase() !== VALID_ADMIN_EMAIL.toLowerCase()) {
    throw new Error("Invalid admin email");
  }

  // Find or create admin auth record
  let admin = await AdminAuth.findOne({
    $or: [{ email: email.toLowerCase() }, { googleId }],
  });

  if (!admin) {
    admin = new AdminAuth({
      email: email.toLowerCase(),
      googleId,
      isVerified: true,
    });
    await admin.save();
  } else {
    // Update googleId if not set
    if (!admin.googleId) {
      admin.googleId = googleId;
    }
    if (!admin.isVerified) {
      admin.isVerified = true;
    }
    await admin.save();
  }

  // Create session token
  const sessionToken = generateSessionToken();
  const sessionExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const adminSession = new AdminSession({
    adminId: admin._id,
    token: sessionToken,
    expiresAt: sessionExpiresAt,
  });

  await adminSession.save();

  // Send welcome email
  await sendWelcomeEmail(email);

  // Generate JWT token
  const jwtToken = generateToken(email);

  return {
    token: jwtToken,
    sessionId: sessionToken,
  };
}

export async function verifyToken(token: string): Promise<{ email: string }> {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { email: string };
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export async function logout(sessionToken: string): Promise<boolean> {
  const result = await AdminSession.deleteOne({ token: sessionToken });
  return result.deletedCount > 0;
}

export async function validateAdminSession(token: string): Promise<boolean> {
  const session = await AdminSession.findOne({
    token,
    expiresAt: { $gt: new Date() },
  });

  return !!session;
}
