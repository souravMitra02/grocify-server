const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "demo-secret";

function verifyAuth(req, res) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/token=([^;]+)/);
  const token = match ? match[1] : null;

  if (!token) throw new Error("Not authenticated");

  const decoded = jwt.verify(token, SECRET_KEY);
  req.user = { id: decoded.id };
}

module.exports = { verifyAuth };
