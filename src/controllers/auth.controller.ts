const { generateToken } = require("../utils/generateToken");

const DEMO_EMAIL = "admin@demo.com";
const DEMO_PASSWORD = "123456";

const loginUser = (req:any, res:any) => {
  const { email, password } = req.body;

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken("demo-user-id");

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,        
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({ message: "Login successful" });
};

const logoutUser = (req:any, res:any) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
};

module.exports = { loginUser, logoutUser };
