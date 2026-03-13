import { Request, Response } from "express";
import {
  requestOTP,
  verifyOTP,
  verifyGoogleAuth,
  logout,
} from "../services/auth.service.js";
import { AuthRequest } from "../middleware/auth.js";

// Request OTP for login
export async function requestAdminOTP(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    await requestOTP(email);

    res.json({
      message: "OTP sent to your email",
      email: email.toLowerCase(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send OTP";
    res.status(400).json({ error: message });
  }
}

// Verify OTP
export async function verifyAdminOTP(req: Request, res: Response) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const { token, sessionId } = await verifyOTP(email, otp);

    // Set session cookie
    res.cookie("sessionToken", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      message: "Login successful",
      token,
      sessionId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "OTP verification failed";
    res.status(400).json({ error: message });
  }
}

// Verify Google OAuth
export async function verifyAdminGoogle(req: Request, res: Response) {
  try {
    const { email, googleId } = req.body;

    if (!email || !googleId) {
      return res
        .status(400)
        .json({ error: "Email and Google ID are required" });
    }

    const { token, sessionId } = await verifyGoogleAuth(email, googleId);

    // Set session cookie
    res.cookie("sessionToken", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      message: "Google login successful",
      token,
      sessionId,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Google auth verification failed";
    res.status(400).json({ error: message });
  }
}

// Logout
export async function adminLogout(req: AuthRequest, res: Response) {
  try {
    if (req.sessionToken) {
      await logout(req.sessionToken);
    }

    // Clear session cookie
    res.clearCookie("sessionToken");

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
}

// Get current admin info
export async function getCurrentAdmin(req: AuthRequest, res: Response) {
  try {
    if (!req.adminEmail) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    res.json({
      email: req.adminEmail,
      isAuthenticated: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get admin info" });
  }
}
