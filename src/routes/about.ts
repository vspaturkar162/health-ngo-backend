import { Router } from "express";
import About from "../models/About";

const router = Router();

/* GET about content */
router.get("/", async (_req, res) => {
  const about = await About.findOne().sort({ createdAt: -1 });
  res.json(about);
});

/* UPDATE about content (admin) */
router.post("/", async (req, res) => {
  const about = new About(req.body);
  await about.save();
  res.json({ message: "About content saved" });
});

export default router;