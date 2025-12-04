const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "demo-secret";

module.exports = function handler(req:any, res:any) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const cookie = req.headers.cookie || "";
    const match = cookie.match(/token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    return res.json({
      authenticated: true,
      user: { id: decoded.id },
    });

  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
};
