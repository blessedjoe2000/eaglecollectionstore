import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: { true: "name is required" } },
    email: { type: String, required: { true: "email is required" } },
    password: { type: String, required: { true: "password is required" } },
    forgetPassword: { type: String },
  },
  { timestamps: true }
);

export default mongoose?.models?.User || mongoose.model("User", userSchema);
