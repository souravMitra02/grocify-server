const { generateToken } = require("../utils/generateToken");

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const demoEmail = "admin@demo.com";
  const demoPassword = "123456";

  if (email !== demoEmail || password !== demoPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken("demo-user-id");

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({ message: "Login successful" });
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

module.exports = { loginUser, logoutUser };
