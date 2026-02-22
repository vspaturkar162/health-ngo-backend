import mongoose, { Schema, Document } from "mongoose";

export interface ISocialLinks extends Document {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

const SocialLinksSchema = new Schema<ISocialLinks>(
  {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String,
  },
  { timestamps: true }
);

export default mongoose.model<ISocialLinks>("SocialLinks", SocialLinksSchema);