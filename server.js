import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const app = express();
app.use(express.json());

//environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// db configuration
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

//routes
import userRoutes from "./routes/userRoutes.js";
import recruiterRoutes from "./routes/recruiterRoute.js";
// import AdminRoutes from "./routes/AdminRoutes.js";
app.use("/api/user", userRoutes);
app.use("/api/recruiter", recruiterRoutes);
// app.use("/api/admin", AdminRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
