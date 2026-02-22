import express from "express";
import CrisisRequest from "../models/CrisisRequest";

const router = express.Router();

// Create crisis request
router.post("/", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    const request = await CrisisRequest.create({
      name,
      phone,
      message,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Failed to submit request" });
  }
});

// Get all crisis requests (Admin)
router.get("/", async (req, res) => {
  try {
    const requests = await CrisisRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

export default router;