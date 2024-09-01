import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  interested: {
    type: String,
    // enum: ["web", "mobile", "devops", "ml", "ai", "iot", "blockchain"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isadmin: {
    default: false,
    type: Boolean,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
