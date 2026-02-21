// import express from "express";
// import { registerVolunteer, approveVolunteer } from "../controllers/volunteerController";
// import { authenticate, authorizeAdmin } from "../middlewares/auths";

// const router = express.Router();

// router.post("/", registerVolunteer);
// router.put("/:id/approve", authenticate, authorizeAdmin, approveVolunteer);

// export default router;

import express from "express";
import {
  registerVolunteer,
  getVolunteers,
  approveVolunteer,
  rejectVolunteer
} from "../controllers/volunteerController";
import { authenticate, authorizeAdmin } from "../middlewares/auths";

const router = express.Router();

/* Public */
router.post("/", registerVolunteer);

/* Admin */
router.get("/", authenticate, authorizeAdmin, getVolunteers);
router.put("/:id/approve", authenticate, authorizeAdmin, approveVolunteer);
router.delete("/:id", authenticate, authorizeAdmin, rejectVolunteer);

export default router;