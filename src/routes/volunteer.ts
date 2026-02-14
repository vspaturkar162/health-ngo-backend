import express from "express";
import { registerVolunteer, approveVolunteer } from "../controllers/volunteerController";
import { authenticate, authorizeAdmin } from "../middlewares/auths";

const router = express.Router();

router.post("/", registerVolunteer);
router.put("/:id/approve", authenticate, authorizeAdmin, approveVolunteer);

export default router;