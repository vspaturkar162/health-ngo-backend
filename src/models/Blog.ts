import mongoose, { Document, Schema, Types } from 'mongoose';
export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: Types.ObjectId;// user id
  tags: string[];
  publishedAt?: Date;
}
const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  slug: { type: String, required: true, index: true, unique: true },
  content: { type: String, required: true },
  excerpt: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  publishedAt: Date
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);