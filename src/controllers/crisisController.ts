import { Request, Response } from "express";
import CrisisRequest from "../models/CrisisRequest";

export const createCrisisRequest = async (req: Request, res: Response) => {
  try {
    const { name, phone, message } = req.body;

    const request = await CrisisRequest.create({
      name,
      phone,
      message,
    });

    res.status(201).json(request);
  } catch {
    res.status(500).json({ message: "Failed to submit crisis request" });
  }
};

export const getCrisisRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await CrisisRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch {
    res.status(500).json({ message: "Failed to fetch crisis requests" });
  }
};