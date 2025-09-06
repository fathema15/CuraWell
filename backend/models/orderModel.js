import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  drugs: [
    {
      drugId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "drug",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // price per unit at time of order
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;