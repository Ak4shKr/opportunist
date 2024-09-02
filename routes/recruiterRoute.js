import express from "express";
import {
  recruiterRegister,
  recruiterLogin,
  jobpost,
  alljobpostbyrecruiter,
  deletejob,
} from "../controllers/recruiterController.js";
const router = express.Router();

router.post("/register", recruiterRegister);
router.post("/login", recruiterLogin);
router.post("/jobpost", jobpost);
router.post("alljobpostbyrecruiter", alljobpostbyrecruiter);
router.delete("deletejob/:id", deletejob);
export default router;
