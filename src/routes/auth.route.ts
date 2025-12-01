const express = require("express");
const { loginUser, logoutUser } = require("../controllers/auth.controller");
const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check", verifyAuth, (req, res) => {
  res.json({ message: "Authenticated" });
});

module.exports = router;
