import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    cardNo: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    cvv: { type: String, required: true },
    address: { type: String, required: true },
    phoneNo: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose?.models.Payment ||
  mongoose.model("Payment", paymentSchema);
