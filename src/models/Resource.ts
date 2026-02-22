// import mongoose from "mongoose";

// const ResourceSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     category: { type: String, required: true },
//     fileUrl: { type: String }, // optional for now
//     date: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Resource", ResourceSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IResource extends Document {
  title: string;
  category: string;
  date: string;
  fileUrl: string; // ✅ ADD THIS
}

const ResourceSchema = new Schema<IResource>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  fileUrl: { type: String, required: true }, // ✅ ADD THIS
});

export default mongoose.model<IResource>("Resource", ResourceSchema);