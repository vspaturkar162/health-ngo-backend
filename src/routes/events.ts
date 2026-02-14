import express from "express";
import { createEvent, getEvents } from "../controllers/eventController";
import { authenticate, authorizeAdmin } from "../middlewares/auths";

const router = express.Router();

router.get("/", getEvents);
router.post("/", authenticate, authorizeAdmin, createEvent);

export default router;