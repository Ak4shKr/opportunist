import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  experiance: {
    type: Number,
    required: true,
  },
  currentCompany: {
    type: String,
    // required: true,
  },
  currentDesignation: {
    type: String,
    // required: true,
  },
  noticePeriod: {
    type: Number,
    required: true,
    default: 0,
  },
  skills: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    // required: true,
  },
  linkedin: {
    type: String,
    // required: true,
  },
  github: {
    type: String,
    // required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
    // required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    // required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
