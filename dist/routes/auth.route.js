"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyAuth_1 = require("../middlewares/verifyAuth");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.loginUser);
router.post("/logout", verifyAuth_1.verifyAuth, auth_controller_1.logoutUser);
router.get("/check", verifyAuth_1.verifyAuth, (req, res) => {
    return res.json({
        authenticated: true,
        user: req.user || null,
    });
});
exports.default = router;
//# sourceMappingURL=auth.route.js.map