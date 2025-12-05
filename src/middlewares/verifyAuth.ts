import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export function verifyAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  let token = req.cookies?.token;

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

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, secret) as { id: string };
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      authenticated: false,
    });
  }
}