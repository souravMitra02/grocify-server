const express = require("express");
const { loginUser, logoutUser } = require("../controllers/auth.controller");
const { verifyAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", loginUser);


router.post("/logout", logoutUser);

router.get("/check", verifyAuth, (req:any, res:any) => {
  return res.json({
    authenticated: true,
    user: req.user || null, 
  });
});

module.exports = router;
