import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  donorName: string;
  amount: number;
  transactionId: string;
}

const DonationSchema = new Schema<IDonation>(
  {
    donorName: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IDonation>("Donation", DonationSchema);