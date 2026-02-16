import mongoose from "mongoose";

interface IAdmin extends mongoose.Document {
  email: string;
  password: string;
  role: "admin";
}

const AdminSchema = new mongoose.Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// ❌ REMOVE the pre-save hook - you're already hashing in the controller
// This was causing double hashing and the TypeScript errors

const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;