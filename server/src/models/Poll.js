import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["asset", "general"],
      default: "asset",
    },

    market: {
      type: String,
      enum: ["forex", "stocks", "crypto", "futures"],
      required: true,
    },

    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
    },

    timeframe: {
      type: String,
      enum: ["1D", "1W", "1M"],
      default: "1W",
    },

    source: {
      type: String,
      enum: ["system", "user"],
      default: "system",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    bullishCount: {
      type: Number,
      default: 0,
    },

    bearishCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Helpful indexes for fast queries
pollSchema.index({ assetId: 1, status: 1 });
pollSchema.index({ market: 1, status: 1, expiresAt: 1 });

export default mongoose.model("Poll", pollSchema);
