require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyAuth = (req:any, res:any, next:any) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "No token found. Please log in again."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (err) {
    console.error("JWT verification failed:", { error: err });
    
    return res.status(401).json({
      message: "Session expired or invalid token."
    });
  }
};

module.exports = { verifyAuth };
