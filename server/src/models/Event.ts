import { Schema, model, Document, Types } from "mongoose";

interface IEvent extends Document {
  organizer: Types.ObjectId;
  event_type: "in-search-of" | "event";
  location: string;
  date: Date;
  time: string;
  description?: string;
  requirements?: string[];
  gear?: string[];
  skill_level?: string;
  safety_rating?: number;
  min_skill_level?: string;
  min_dive_hours?: number;
  attendees?: Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
}

const EventSchema = new Schema<IEvent>({
  organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  event_type: { type: String, enum: ["in-search-of", "event"], required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String },
  requirements: [{ type: String }],
  gear: [{ type: String }],
  skill_level: { type: String },
  safety_rating: { type: Number, min: 1, max: 5 },
  min_skill_level: { type: String },
  min_dive_hours: { type: Number, default: 0 },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

const Event = model<IEvent>("Event", EventSchema);

export default Event;
