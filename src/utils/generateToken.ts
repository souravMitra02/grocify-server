const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "demo-secret";

function generateToken(userId) {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "7d" });
}

module.exports = { generateToken };
