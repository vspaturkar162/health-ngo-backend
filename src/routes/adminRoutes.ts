import express from "express";
import Donation from "../models/Donation";

const router = express.Router();
router.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch {
    res.status(500).json({ message: "Failed to fetch donations" });
  }
});
export default router;