import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema(
  {
    opponent1: String,
    opponent2: String,
    location: String,
    predictedWinner: String,
    matchDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Match", MatchSchema);
