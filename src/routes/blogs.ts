import { Router } from "express";
import Blog from "../models/Blog";
import upload from "../middlewares/upload";
const router = Router();

/**
 * GET all blogs (public)
 */
router.get("/", async (_req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

/**
 * GET blog by ID (public)
 */
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
});

/**
 * CREATE blog (admin)
 */
router.post("/", upload.single("image"), async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    excerpt: req.body.excerpt,
    content: req.body.content,
    image: req.file?.path, // Cloudinary URL
  });

  await blog.save();
  res.status(201).json(blog);
});

/**
 * UPDATE blog (admin)
 */
router.put("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(blog);
});

/**
 * DELETE blog (admin)
 */
router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

export default router;