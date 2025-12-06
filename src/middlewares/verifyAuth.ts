import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string | undefined;
    role?: string | undefined;
  };
}

export function verifyAuth(req: AuthRequest, res: Response, next: NextFunction) {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }
  if (!token) {
    token = req.cookies?.token as string | undefined;
  }

  console.log("Auth check - Token found:", !!token);
  console.log("Auth check - From header:", !!authHeader);
  console.log("Auth check - From cookie:", !!req.cookies?.token);

  if (!token) {
    return res.status(401).json({
      message: "Not authenticated",
      authenticated: false,
    });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not defined!");
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  try {
    const decoded = jwt.verify(token, secret) as {
      id: string;
      email?: string;
      role?: string;
    };

    req.user = {
      id: decoded.id,
      email: decoded.email ?? undefined,
      role: decoded.role ?? undefined,
    };

    console.log("Auth successful for user:", decoded.email);
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).json({
      message: "Invalid or expired token",
      authenticated: false,
    });
  }
}