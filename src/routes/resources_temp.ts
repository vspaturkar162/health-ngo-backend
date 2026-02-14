// import { Router } from "express";
// const router = Router();

// router.get("/", async (_req, res) => {
//   res.json([
//     { title: "What is Domestic Violence?", category: "Violence", date: "2025" },
//     { title: "Maternal Nutrition Guide", category: "Health", date: "2025" }
//   ]);
// });

// export default router;
import { Router } from "express";

const router = Router();

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

export default router;