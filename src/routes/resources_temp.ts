// import { Router } from "express";
// import Resource from "../models/Resource";
// import uploadPDF from "../middlewares/upload";

// const router = Router();

// /* ✅ GET all resources (public) */
// router.get("/", async (_req, res) => {
//   const resources = await Resource.find().sort({ createdAt: -1 });
//   res.json(resources);
// });

// /* ✅ CREATE resource (admin) */
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const { title, category, date } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "PDF file is required" });
//     }

//     const resource = await Resource.create({
//       title,
//       category,
//       date,
//       fileUrl: (req.file as any).path, // ✅ Cloudinary URL
//     });

//     res.status(201).json(resource);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to create resource" });
//   }
// });

// /* ✅ DELETE resource */
// router.delete("/:id", async (req, res) => {
//   await Resource.findByIdAndDelete(req.params.id);
//   res.json({ message: "Resource deleted" });
// });

// export default router;
// // import { Router } from "express";

// // const router = Router();

// // router.get("/", (_req, res) => {
// //   res.json([
// //     {
// //       _id: "1",
// //       title: "What is Domestic Violence?",
// //       category: "Violence Prevention",
// //       date: "Nov 2025"
// //     },
// //     {
// //       _id: "2",
// //       title: "Maternal Nutrition Guide",
// //       category: "Maternal & Child Health",
// //       date: "Oct 2025"
// //     }
// //   ]);
// // });

// // export default router;

import { Router } from "express";
import Resource from "../models/Resource";
import { uploadPDF } from "../middlewares/upload";

const router = Router();

/* GET resources */
router.get("/", async (_req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.json(resources);
});

/* CREATE resource (PDF upload) */
router.post("/", uploadPDF.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF upload failed" });
    }

    const resource = await Resource.create({
      title: req.body.title,
      category: req.body.category,
      date: req.body.date,
      fileUrl: (req.file as any).path, // Cloudinary URL
    });

    res.status(201).json(resource);
  } catch (error) {
    console.error("RESOURCE UPLOAD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  await Resource.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;