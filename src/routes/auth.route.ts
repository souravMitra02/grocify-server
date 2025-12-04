import express from "express";
import { loginUser, logoutUser } from "../controllers/auth.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check", verifyAuth, (req, res) => {
  return res.json({
    authenticated: true,
    user: req.user || null,
  });
});

export default router;
