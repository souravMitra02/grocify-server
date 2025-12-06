"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = verifyAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyAuth(req, res, next) {
    let token = req.cookies?.token;
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
    }
    if (!token) {
        return res.status(401).json({
            message: "Not authenticated",
            authenticated: false,
        });
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = { id: decoded.id };
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token",
            authenticated: false,
        });
    }
}
//# sourceMappingURL=verifyAuth.js.map