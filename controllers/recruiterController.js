import ApplyByJob from "../models/ApplyByJobModel.js";
import Job from "../models/JobModel.js";
import Recruiter from "../models/RecruiterModel.js";
import jwt from "jsonwebtoken";
export const recruiterRegister = async (req, res) => {
  try {
    const { name, email, mobile, company, workingField, password } = req.body;
    if (!name || !email || !mobile || !company || !workingField || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const recruiterExists = await Recruiter.findOne({ email });
    if (recruiterExists) {
      return res.status(400).json({ message: "Recruiter already exists" });
    }
    const recruiter = new Recruiter({
      name,
      email,
      mobile,
      company,
      workingField,
      password,
    });
    await recruiter.save();
    res.status(201).json({ message: "Badhai ho 😎, registered successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const recruiterLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(400).json({ message: "Recruiter does not exist" });
    }
    if (recruiter.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { email: recruiter.email, id: recruiter._id },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "Login Successful as a Recruiter!",
      token,
      recruiter: recruiter,
      token,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const jobpost = async (req, res) => {
  try {
    const {
      title,
      salary,
      eligibility,
      location,
      noticePeriod,
      experience,
      skills,
      description,
      jobType,
      recruiterId,
      jobfile,
    } = req.body;

    if (
      !title ||
      !salary ||
      !eligibility ||
      !location ||
      !noticePeriod ||
      !experience ||
      !skills ||
      !description ||
      !jobType
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const job = new Job({
      title,
      salary,
      eligibility,
      location,
      noticePeriod,
      experience,
      skills,
      description,
      jobType,
      recruiterId,
      jobfile,
    });
    await job.save();
    res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const alljobpostbyrecruiter = async () => {
  try {
    const recruiterId = req.body;
    const jobs = await Job.find({ recruiterId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletejob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (job) {
      job.status = "inactive";
      await job.save();
    } else {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const viewApplicantsByJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (job) {
      const applicants = await Application.find({ jobId });
      res.status(200).json(applicants);
    } else {
      return res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const shortlist = async () => {
  try {
    const { jobId, applicationId } = req.params.id;
    const applyByJob = await ApplyByJob.findOne({ jobId, applicationId });
    if (applyByJob) {
      applyByJob.status = "shortlisted";
      await applyByJob.save();
    } else {
      return res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
