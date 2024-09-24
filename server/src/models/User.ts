import { Schema, model, Document, Types } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  location?: string;
  dive_hours?: number;
  certifications?: string[];
  posts?: Types.ObjectId[];
  friends?: Types.ObjectId[];
  karma?: number;
  bio?: string;
  profile_picture?: string;
  banner_image?: string;
  badges?: string[];
  achievements?: string[];
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  dive_hours: { type: Number, default: 0 },
  certifications: { type: [String] },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  karma: { type: Number, default: 0 },
  bio: { type: String },
  profile_picture: { type: String },
  banner_image: { type: String },
  badges: [{ type: String }],
  achievements: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = model<IUser>("User", UserSchema);

export default User;
