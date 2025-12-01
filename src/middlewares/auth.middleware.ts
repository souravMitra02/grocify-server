const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    jwt.verify(token, "jwt_secret_key");
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { verifyAuth };
