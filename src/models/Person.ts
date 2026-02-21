import mongoose, { Schema, Document } from "mongoose";

export interface IPerson extends Document {
  name: string;
  role: string;
  department: string;
  email?: string;
  phone?: string;
}

const PersonSchema = new Schema<IPerson>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: {
      type: String,
      enum: ["Leadership", "Programs", "Research", "Operations"],
      required: true,
    },
    email: String,
    phone: String,
  },
  { timestamps: true }
);

export default mongoose.model<IPerson>("Person", PersonSchema);