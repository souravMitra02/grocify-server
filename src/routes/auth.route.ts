import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/auth.controller";
import { verifyAuth } from "../middlewares/verifyAuth";

const router = Router();

router.post("/login", loginUser);
router.post("/logout", verifyAuth, logoutUser);

router.get("/check", verifyAuth, (req, res) => {
  return res.json({
    authenticated: true,
    user: (req as any).user || null,
  });
});

export default router;
