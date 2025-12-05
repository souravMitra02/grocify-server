"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
const generateToken_1 = require("../utils/generateToken");
const DEMO_EMAIL = "admin@demo.com";
const DEMO_PASSWORD = "123456";
function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = (0, generateToken_1.generateToken)("demo-user-id");
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });
    return res.status(200).json({ message: "Login successful" });
}
function logoutUser(req, res) {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
        path: "/",
    });
    return res.status(200).json({ message: "Logged out" });
}
//# sourceMappingURL=auth.controller.js.map