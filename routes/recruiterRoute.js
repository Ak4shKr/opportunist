import express from "express";
import {
  recruiterRegister,
  recruiterLogin,
} from "../controllers/recruiterController.js";
const router = express.Router();

router.post("/register", recruiterRegister);
router.post("/login", recruiterLogin);
export default router;
