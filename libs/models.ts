import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },          // ✅ now required
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError in hot-reload environments
const Data = mongoose.models.Data || mongoose.model("Data", dataSchema);

export default Data;
