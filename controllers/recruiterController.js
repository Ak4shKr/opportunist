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
