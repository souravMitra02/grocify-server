import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "demo-secret";

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "7d" });
}
