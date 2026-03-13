import { Request, Response, NextFunction } from "express";
import { verifyToken, validateAdminSession } from "../services/auth.service.js";

export interface AuthRequest extends Request {
  adminEmail?: string;
  sessionToken?: string;
}

export async function authenticateAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    // Get token from header or cookie
    const authHeader = req.headers.authorization;
    const sessionToken =
      req.cookies?.sessionToken || req.headers["x-session-token"];

    if (!authHeader || !sessionToken) {
      return res
        .status(401)
        .json({ error: "Missing authentication credentials" });
    }

    // Extract Bearer token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    // Verify JWT token
    const decoded = await verifyToken(token);

    // Validate session token
    const sessionValid = await validateAdminSession(sessionToken as string);
    if (!sessionValid) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    // Attach admin email to request
    req.adminEmail = decoded.email;
    req.sessionToken = sessionToken as string;

    next();
  } catch (error) {
    return res.status(401).json({
      error: error instanceof Error ? error.message : "Authentication failed",
    });
  }
}

export function optionalAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const sessionToken =
    req.cookies?.sessionToken || req.headers["x-session-token"];

  if (authHeader && sessionToken) {
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    verifyToken(token)
      .then((decoded) => {
        req.adminEmail = decoded.email;
        req.sessionToken = sessionToken as string;
      })
      .catch(() => {
        // Silent fail for optional auth
      });
  }

  next();
}
