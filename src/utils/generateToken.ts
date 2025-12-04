import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "demo-secret";

export function generateToken(id: string) {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "7d" });
}
