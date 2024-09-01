import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
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
  company: {
    type: String,
    // required: true,
  },
  workingField: {
    type: String,
    enum: [
      "IT",
      "BUSINESS",
      "SALES",
      "MANAGEMENT",
      "AI/ML",
      "ELECTRONICS",
      "FINANCE",
    ],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Recruiter = mongoose.model("Recruiter", recruiterSchema);
export default Recruiter;
