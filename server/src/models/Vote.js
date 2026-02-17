import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },

    vote: {
      type: String,
      enum: ["bullish", "bearish"],
      required: true,
    },

    // present if logged in
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // used for anonymous voting
    anonHash: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// prevent duplicate voting
voteSchema.index({ pollId: 1, userId: 1 }, { unique: true, sparse: true });
voteSchema.index({ pollId: 1, anonHash: 1 }, { unique: true, sparse: true });

export default mongoose.model("Vote", voteSchema);
