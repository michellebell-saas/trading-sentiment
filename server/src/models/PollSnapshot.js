import mongoose from "mongoose";

const pollSnapshotSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },

    timestamp: {
      type: Date,
      required: true,
    },

    bullishCount: {
      type: Number,
      required: true,
    },

    bearishCount: {
      type: Number,
      required: true,
    },

    totalVotes: {
      type: Number,
      required: true,
    },

    bullishPct: Number,
    bearishPct: Number,
  },
  { timestamps: true }
);

// prevent duplicate snapshots at same time
pollSnapshotSchema.index({ pollId: 1, timestamp: 1 }, { unique: true });

export default mongoose.model("PollSnapshot", pollSnapshotSchema);
