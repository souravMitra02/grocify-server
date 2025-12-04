import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "demo-secret";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export function verifyAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
