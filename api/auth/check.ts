const { verifyAuth } = require("../../../middlewares/auth.middleware");

module.exports = async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await verifyAuth(req, res);
    res.status(200).json({ authenticated: true, user: req.user || null });
  } catch (err) {
    res.status(401).json({ authenticated: false });
  }
};
