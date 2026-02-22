import express from "express";
import CrisisRequest from "../models/CrisisRequest";

import {
  createCrisisRequest,
  getCrisisRequests,
} from "../controllers/crisisController";

const router = express.Router();

router.post("/", createCrisisRequest);
router.get("/", getCrisisRequests);

export default router;