import { Schema, model, Document, Types } from "mongoose";

interface IDive extends Document {
  dive_site: Types.ObjectId;
  date: Date;
  duration?: number;
  depth?: number;
  participants: Types.ObjectId[];
  time_underwater: number;
  notes?: string;
  created_at: Date;
}

const DiveSchema = new Schema<IDive>({
  dive_site: { type: Schema.Types.ObjectId, ref: "DiveSite", required: true },
  date: { type: Date, required: true },
  duration: { type: Number },
  depth: { type: Number },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  time_underwater: {type: Number},
  notes: {type: String, required: false},
  created_at: { type: Date, default: Date.now },
});

const Dive = model<IDive>("Dive", DiveSchema);

export default Dive;
