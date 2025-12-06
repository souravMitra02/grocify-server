import { Request, Response } from "express";
import { generateToken } from "../utils/generateToken";

const DEMO_EMAIL = "admin@demo.com";
const DEMO_PASSWORD = "123456";

export function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({ 
    id: "demo-user-id", 
    email: DEMO_EMAIL, 
    role: "admin" 
  });

  const isProd = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  return res.status(200).json({
    message: "Login successful",
    authenticated: true,
    user: { email: DEMO_EMAIL, role: "admin" },
  });
}

export function logoutUser(req: Request, res: Response) {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    expires: new Date(0),
    path: "/",
  });

  return res.status(200).json({ 
    message: "Logged out successfully", 
    authenticated: false 
  });
}