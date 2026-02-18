"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post("/register", authController_1.register);
router.post("/login", (_req, res) => {
    res.json({ message: "Auth route OK" });
});
exports.default = router;
//# sourceMappingURL=auth.js.map