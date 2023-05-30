import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: { true: "name is required" } },
    email: {
      type: String,
      required: { true: "email is required" },
      unique: true,
    },
    password: { type: String, required: { true: "password is required" } },
    forgetPassword: { type: String },
  },
  { timestamps: true }
);

export default mongoose?.models?.Admins || mongoose.model("Admin", adminSchema);
