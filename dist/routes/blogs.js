"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Blog_1 = __importDefault(require("../models/Blog"));
const router = (0, express_1.Router)();
/**
 * GET all blogs (public)
 */
router.get("/", async (_req, res) => {
    const blogs = await Blog_1.default.find().sort({ createdAt: -1 });
    res.json(blogs);
});
/**
 * GET blog by ID (public)
 */
router.get("/:id", async (req, res) => {
    const blog = await Blog_1.default.findById(req.params.id);
    if (!blog)
        return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
});
/**
 * CREATE blog (admin)
 */
router.post("/", async (req, res) => {
    const blog = new Blog_1.default(req.body);
    await blog.save();
    res.status(201).json(blog);
});
/**
 * UPDATE blog (admin)
 */
router.put("/:id", async (req, res) => {
    const blog = await Blog_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(blog);
});
/**
 * DELETE blog (admin)
 */
router.delete("/:id", async (req, res) => {
    await Blog_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
});
exports.default = router;
//# sourceMappingURL=blogs.js.map