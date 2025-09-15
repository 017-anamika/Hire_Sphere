import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hire Sphere API");
});

const MONGO =
  process.env.MONGODB_URI || "mongodb://localhost:27017/hire_sphere";
mongoose
  .connect(MONGO)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default app;
