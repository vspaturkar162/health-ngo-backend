import { Request, Response } from "express";
import Volunteer from "../models/Volunteer";

export const registerVolunteer = async (req: Request, res: Response) => {
  const volunteer = await Volunteer.create(req.body);
  res.status(201).json(volunteer);
};

export const approveVolunteer = async (req: Request, res: Response) => {
  const volunteer = await Volunteer.findByIdAndUpdate(
    req.params.id,
    { approved: true },
    { new: true }
  );
  res.json(volunteer);
};