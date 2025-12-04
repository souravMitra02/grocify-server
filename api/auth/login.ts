const { loginUser } = require("../../../controllers/auth.controller");

module.exports = async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await loginUser(req, res);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
