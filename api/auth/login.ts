const { loginUser } = require("../../src/controllers/auth.controller");

module.exports = async function handler(req:any, res:any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await loginUser(req, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
