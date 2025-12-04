import { generateToken } from "../utils/generateToken";

const DEMO_EMAIL = "admin@demo.com";
const DEMO_PASSWORD = "123456";

export function loginUser(req: any, res: any) {
  const { email, password } = req.body;

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken("demo-user-id");

  res.setHeader("Set-Cookie", [
    `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax`,
  ]);

  return res.status(200).json({ message: "Login successful" });
}

export function logoutUser(req: any, res: any) {
  res.setHeader("Set-Cookie", [
    `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`,
  ]);
  return res.status(200).json({ message: "Logged out" });
}
