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
  let token = req.cookies?.token as string | undefined;

  // fallback to Authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

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

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      authenticated: false,
    });
  }
}
