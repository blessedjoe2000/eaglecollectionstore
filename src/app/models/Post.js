import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, require },
    photoUrl: { type: String, require },
    desc: { type: String },

    category: {
      type: String,
      required: true,
      enum: [
        "Laces",
        "Georges",
        "Jewelry",
        "Bags",
        "Head Gear",
        "Accessories",
        "Shoes",
        "Bags",
        "Ankara",
        "Asoke",
        "Wax",
        "Handmade",
        "Matching Set",
        "Slippers",
        "Clutches",
      ],
    },
    size: {
      sown: { type: String, enum: ["S", "M", "L", "XL"] },
      shoe: { type: Number, enum: [36, 37, 38, 39, 40, 41, 42, 43] },
      material: { type: String, enum: ["yard", "cm"] },
    },
    prompt: { type: { String }, enum: ["new", "low", "sale"] },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Admin",
    },
    likes: { type: Number },
  },
  { timestamps: true }
);

export default mongoose?.models?.Post || mongoose.model("Post", postSchema);
