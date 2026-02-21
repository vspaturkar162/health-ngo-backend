// import mongoose, { Schema, Document } from "mongoose";

// export interface IVolunteer extends Document {
//   name: string;
//   email: string;
//   phone: string;
//   approved: boolean;
// }

// const VolunteerSchema = new Schema<IVolunteer>(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     approved: { type: Boolean, default: false }
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IVolunteer extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  role?: string;
  location?: string;
  status: "pending" | "approved" | "rejected";
}

const VolunteerSchema = new Schema<IVolunteer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String },
    role: { type: String },
    location: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);