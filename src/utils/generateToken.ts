import jwt from "jsonwebtoken";

export function generateToken(userId: string) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(" JWT_SECRET is missing");
  }

  return jwt.sign({ id: userId }, secret, {
    expiresIn: "7d",
  });
}
