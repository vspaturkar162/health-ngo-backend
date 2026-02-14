import { Request, Response } from "express";
import Event from "../models/Event";

export const createEvent = async (req: Request, res: Response) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
};

export const getEvents = async (_: Request, res: Response) => {
  const events = await Event.find().sort({ startDate: 1 });
  res.json(events);
};