const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "demo-secret";

function verifyAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = { id: decoded.id };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { verifyAuth };
