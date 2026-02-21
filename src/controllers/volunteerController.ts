// import { Request, Response } from "express";
// import Volunteer from "../models/Volunteer";

// export const registerVolunteer = async (req: Request, res: Response) => {
//   const volunteer = await Volunteer.create(req.body);
//   res.status(201).json(volunteer);
// };

// export const approveVolunteer = async (req: Request, res: Response) => {
//   const volunteer = await Volunteer.findByIdAndUpdate(
//     req.params.id,
//     { approved: true },
//     { new: true }
//   );
//   res.json(volunteer);
// };
import { Request, Response } from "express";
import Volunteer from "../models/Volunteer";

/* Volunteer applies (PUBLIC) */
export const registerVolunteer = async (req: Request, res: Response) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json(volunteer);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit application" });
  }
};

/* Admin fetches all applications */
export const getVolunteers = async (_req: Request, res: Response) => {
  const volunteers = await Volunteer.find().sort({ createdAt: -1 });
  res.json(volunteers);
};

/* Admin approves */
export const approveVolunteer = async (req: Request, res: Response) => {
  const volunteer = await Volunteer.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );
  res.json(volunteer);
};

/* Admin rejects */
export const rejectVolunteer = async (req: Request, res: Response) => {
  await Volunteer.findByIdAndDelete(req.params.id);
  res.json({ message: "Application rejected" });
};