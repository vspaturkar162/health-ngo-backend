import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    fileUrl: { type: String }, // optional for now
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", ResourceSchema);