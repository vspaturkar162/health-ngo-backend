import { Request, Response } from "express";
import Donation from "../models/Donation";

export const createDonation = async (req: Request, res: Response) => {
  try {
    const { donorName, amount } = req.body;

    const donation = await Donation.create({
      donorName,
      amount,
      transactionId: "TXN_" + Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Donation recorded successfully",
      donation,
    });
  } catch {
    res.status(500).json({ message: "Donation failed" });
  }
};