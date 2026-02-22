import express from "express";
import { createDonation } from "../controllers/donationController";

const router = express.Router();

router.post("/", createDonation);

export default router;