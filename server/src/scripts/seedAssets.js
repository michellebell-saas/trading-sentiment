import dotenv from "dotenv";
import mongoose from "mongoose";
import Asset from "../models/Asset.js";

dotenv.config();

const assets = [
  // Crypto
  { market: "crypto", symbol: "BTC", name: "Bitcoin" },
  { market: "crypto", symbol: "ETH", name: "Ethereum" },
  { market: "crypto", symbol: "SOL", name: "Solana" },

  // Forex
  { market: "forex", symbol: "EURUSD", name: "EUR/USD" },
  { market: "forex", symbol: "GBPUSD", name: "GBP/USD" },
  { market: "forex", symbol: "USDJPY", name: "USD/JPY" },

  // Stocks
  { market: "stocks", symbol: "SPY", name: "SPDR S&P 500 ETF" },
  { market: "stocks", symbol: "NVDA", name: "NVIDIA" },
  { market: "stocks", symbol: "TSLA", name: "Tesla" },

  // Futures / Commodities
  { market: "futures", symbol: "ES", name: "S&P 500 E-mini Futures" },
  { market: "futures", symbol: "NQ", name: "Nasdaq E-mini Futures" },
  { market: "futures", symbol: "CL", name: "Crude Oil WTI" },
  { market: "futures", symbol: "XAUUSD", name: "Gold Spot (XAU/USD)" },
];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");

  await mongoose.connect(uri);

  // upsert = insert if missing, update if exists
  for (const a of assets) {
    await Asset.updateOne(
      { market: a.market, symbol: a.symbol },
      { $set: a },
      { upsert: true }
    );
  }

  console.log(`✅ Seeded ${assets.length} assets`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
