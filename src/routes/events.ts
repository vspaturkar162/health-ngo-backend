// import express from "express";
// import { createEvent, getEvents } from "../controllers/eventController";
// import { authenticate, authorizeAdmin } from "../middlewares/auths";
// import EventModel from "../models/Event";
// const router = express.Router();

// router.get("/", getEvents);
// router.post("/", authenticate, authorizeAdmin, createEvent);
// router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
//   await Event.findByIdAndDelete(req.params.id);
//   res.json({ message: "Event deleted" });
// });

// export default router;
import express from "express";
import { createEvent, getEvents } from "../controllers/eventController";
import { authenticate, authorizeAdmin } from "../middlewares/auths";
import EventModel from "../models/Event"; // ✅ RENAMED

const router = express.Router();

router.get("/", getEvents);

router.post("/", authenticate, authorizeAdmin, createEvent);

router.delete(
  "/:id",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
    await EventModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  }
);

export default router;