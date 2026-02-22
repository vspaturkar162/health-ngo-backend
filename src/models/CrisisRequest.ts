import mongoose, { Schema, Document } from "mongoose";

export interface ICrisisRequest extends Document {
  name: string;
  phone: string;
  message: string;
  status: string;
}

const CrisisRequestSchema = new Schema<ICrisisRequest>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model<ICrisisRequest>(
  "CrisisRequest",
  CrisisRequestSchema
);