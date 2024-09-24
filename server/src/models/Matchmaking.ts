import { Schema, model, Document, Types } from "mongoose";

interface IMatchmaking extends Document {
  user: Types.ObjectId;
  potential_matches: {
    match: Types.ObjectId;
    match_score: number;
    common_interests: string[];
    match_date: Date;
  }[];
  updated_at: Date;
}

const MatchmakingSchema = new Schema<IMatchmaking>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  potential_matches: [
    {
      match: { type: Schema.Types.ObjectId, ref: "User" },
      match_score: { type: Number, required: true },
      common_interests: [{ type: String }],
      match_date: { type: Date, default: Date.now },
    },
  ],
  updated_at: { type: Date, default: Date.now },
});

const Matchmaking = model<IMatchmaking>("Matchmaking", MatchmakingSchema);

export default Matchmaking;
