"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogs = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const createBlog = async (req, res) => {
    const blog = await Blog_1.default.create(req.body);
    res.status(201).json(blog);
};
exports.createBlog = createBlog;
const getBlogs = async (_, res) => {
    const blogs = await Blog_1.default.find().sort({ createdAt: -1 });
    res.json(blogs);
};
exports.getBlogs = getBlogs;
//# sourceMappingURL=blogController.js.map