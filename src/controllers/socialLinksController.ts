import { Request, Response } from "express";
import SocialLinks from "../models/SocialLinks";

export const getSocialLinks = async (_: Request, res: Response) => {
  let links = await SocialLinks.findOne();

  if (!links) {
    links = await SocialLinks.create({
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
    });
  }

  res.json(links);
};

export const updateSocialLinks = async (req: Request, res: Response) => {
  const links = await SocialLinks.findOneAndUpdate(
    {},
    req.body,
    { new: true, upsert: true }
  );

  res.json(links);
};