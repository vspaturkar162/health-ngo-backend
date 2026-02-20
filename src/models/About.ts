import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    story: String,
    howWeWork: String,
    research: String,
    impact: String,
  },
  { timestamps: true }
);

export default mongoose.model("About", AboutSchema);