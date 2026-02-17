import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    market: {
      type: String,
      enum: ["forex", "stocks", "crypto", "futures"],
      required: true,
    },

    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicates like BTC twice
assetSchema.index({ market: 1, symbol: 1 }, { unique: true });

export default mongoose.model("Asset", assetSchema);
