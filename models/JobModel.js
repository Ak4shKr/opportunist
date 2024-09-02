import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  noticePeriod: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "internship"],
    required: true,
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recruiter",
    // required: true,
  },
  jobfile: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  expiresin: {
    type: Number,
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
