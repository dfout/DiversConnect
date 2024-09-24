import { Schema, model, Document, Types } from "mongoose";

interface IPost extends Document {
  author: Types.ObjectId;
  title: string;
  description: string;
  images?: string[];
  comments?: {
    author: Types.ObjectId;
    text: string;
    created_at: Date;
  }[];
  likes?: Types.ObjectId[];
  posted_at: Date;
  updated_at?: Date;
  location?: string;
  dive?: Types.ObjectId;
}

const PostSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: {type: String},
  description: {type: String},
  images: [{ type: String }],
  comments: [
    {
      author: { type: Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      created_at: { type: Date, default: Date.now },
    },
  ],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posted_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  location: { type: String, nullable: true },
  dive: { type: Schema.Types.ObjectId, ref: "Dive", nullable: true },
});

const Post = model<IPost>("Post", PostSchema);

export default Post;
