import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

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
