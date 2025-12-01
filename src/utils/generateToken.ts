const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "jwt_secret_key", { expiresIn: "7d" });
};

module.exports = { generateToken };
