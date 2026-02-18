"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(403).json({ message: "Invalid token" });
    }
};
exports.authenticate = authenticate;
const authorizeAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
//# sourceMappingURL=auths.js.map