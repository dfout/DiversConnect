import { Schema, model, Document } from "mongoose";

interface IDiveSite extends Document {
  name: string;
  location: {
    country: string;
    region?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  depth_range: {
    min_depth: number;
    max_depth: number;
  };
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
  description?: string;
  marine_life?: string[];
  safety_rating?: number;
  dive_conditions: {
    visibility: string;
    current: string;
  };
  created_at: Date;
  updated_at: Date;
}

const DiveSiteSchema = new Schema<IDiveSite>({
  name: { type: String, required: true },
  location: {
    country: { type: String, required: true },
    region: { type: String },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  depth_range: {
    min_depth: { type: Number, required: true },
    max_depth: { type: Number, required: true },
  },
  difficulty_level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  description: { type: String },
  marine_life: [{ type: String }],
  safety_rating: { type: Number, min: 1, max: 5 },
  dive_conditions: {
    visibility: { type: String },
    current: { type: String },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const DiveSite = model<IDiveSite>("DiveSite", DiveSiteSchema);

export default DiveSite;
