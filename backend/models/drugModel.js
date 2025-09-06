import mongoose from "mongoose";

const drugSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    description: { type: String, required: true },
    prescriptionRequired: { type: Boolean, default: false },
    expiryDate: { type: Date, required: true },
    image: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
  },
  { minimize: false }
);

const drugModel = mongoose.models.drug || mongoose.model("drug", drugSchema);

export default drugModel;