import Application from "../models/ApplicationModel.js";
import Contact from "../models/ContactModel.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/emailService.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, mobile, interested, password } = req.body;
    if (!name || !email || !mobile || !interested || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({
      name,
      email,
      mobile,
      interested,
      password,
    });
    await user.save();
    res
      .status(201)
      .json({ message: "Badhai Ho 😎, aapka registration ho gya hai!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "Login Successful as User!", token, user: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const userApplication = async (req, res) => {
  try {
    const {
      name,
      experiance,
      currentCompany,
      currentDesignation,
      noticePeriod,
      skills,
      email,
      mobile,
      linkedin,
      github,
      resume,
      coverLetter,
    } = req.body;
    if (
      !name ||
      !experiance ||
      !currentCompany ||
      !currentDesignation ||
      !noticePeriod ||
      !skills ||
      !email ||
      !mobile ||
      !linkedin ||
      !github ||
      !resume ||
      !coverLetter
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const application = new Application({
      name,
      experiance,
      currentCompany,
      currentDesignation,
      noticePeriod,
      skills,
      email,
      mobile,
      linkedin,
      github,
      resume,
      coverLetter,
    });
    await application.save();
    res
      .status(201)
      .json({ message: "Badhai Ho 😎, aapka application submit ho gya hai" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const contactQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const contact = new Contact({
      name,
      email,
      message,
    });
    await contact.save();
    // const sendEmailres = await sendEmail({
    //   email: "21001008006@jcboseust.ac.in",
    //   subject: "OTP for password reset",
    //   text: `Your OTP is 5555, for your password reset. it is valid for only 2 minute.
    //   \nTeam: CatchCorruption`,
    // });
    // console.log(sendEmailres);
    res
      .status(201)
      .json({ message: "Badhai Ho 😎, aapki baatein ham tak pahuch gyi hai!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
