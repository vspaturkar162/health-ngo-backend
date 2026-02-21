import { Router } from "express";
import Resource from "../models/Resource";

const router = Router();

/* ✅ GET all resources (public) */
router.get("/", async (_req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.json(resources);
});

/* ✅ CREATE resource (admin) */
router.post("/", async (req, res) => {
  const resource = new Resource(req.body);
  await resource.save();
  res.status(201).json(resource);
});

/* ✅ DELETE resource (admin) */
router.delete("/:id", async (req, res) => {
  await Resource.findByIdAndDelete(req.params.id);
  res.json({ message: "Resource deleted" });
});

export default router;
// import { Router } from "express";

// const router = Router();

// router.get("/", (_req, res) => {
//   res.json([
//     {
//       _id: "1",
//       title: "What is Domestic Violence?",
//       category: "Violence Prevention",
//       date: "Nov 2025"
//     },
//     {
//       _id: "2",
//       title: "Maternal Nutrition Guide",
//       category: "Maternal & Child Health",
//       date: "Oct 2025"
//     }
//   ]);
// });

// export default router;