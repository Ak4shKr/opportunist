import mongoose from "mongoose";

const applyByJobSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  status: {
    type: String,
    enum: ["applied", "rejected", "shortlisted"],
    default: "applied",
  },
});

const ApplyByJob = mongoose.model("ApplyByJob", applyByJobSchema);
export default ApplyByJob;
