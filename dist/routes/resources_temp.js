"use strict";
// import { Router } from "express";
// const router = Router();
Object.defineProperty(exports, "__esModule", { value: true });
// router.get("/", async (_req, res) => {
//   res.json([
//     { title: "What is Domestic Violence?", category: "Violence", date: "2025" },
//     { title: "Maternal Nutrition Guide", category: "Health", date: "2025" }
//   ]);
// });
// export default router;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.json([
        {
            _id: "1",
            title: "What is Domestic Violence?",
            category: "Violence Prevention",
            date: "Nov 2025"
        },
        {
            _id: "2",
            title: "Maternal Nutrition Guide",
            category: "Maternal & Child Health",
            date: "Oct 2025"
        }
    ]);
});
exports.default = router;
//# sourceMappingURL=resources_temp.js.map