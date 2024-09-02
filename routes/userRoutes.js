import express from "express";
import {
  userRegister,
  userLogin,
  userApplication,
  contactQuery,
} from "../controllers/userController.js";
import { sendEmail } from "../services/emailService.js";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/application", userApplication);
router.post("/contact", contactQuery);


export default router;
