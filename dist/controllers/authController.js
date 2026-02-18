"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const register = async (req, res) => {
    const hashed = await bcryptjs_1.default.hash(req.body.password, 12);
    const user = await User_1.default.create({ ...req.body, password: hashed });
    res.status(201).json(user);
};
exports.register = register;
const login = async (req, res) => {
    const user = await User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(401).json({ message: "Invalid credentials" });
    const match = await bcryptjs_1.default.compare(req.body.password, user.password);
    if (!match)
        return res.status(401).json({ message: "Invalid credentials" });
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
};
exports.login = login;
//# sourceMappingURL=authController.js.map