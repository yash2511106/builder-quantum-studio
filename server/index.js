import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

// Import route handlers
import { register, login } from "./routes/auth.js";
import {
  analyzeText,
  rewriteText,
  calculateScore,
  uploadFile,
  getHistory,
  deleteJob,
} from "./routes/analysis.js";
import { authenticateToken } from "./middleware/auth.js";

dotenv.config();

export function createServer() {
  const app = express();

  // Connect to MongoDB
  connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Public routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Bias Detector API is running!" });
  });

  // Auth routes
  app.post("/api/register", register);
  app.post("/api/login", login);

  // Protected routes
  app.post("/api/analyze", authenticateToken, analyzeText);
  app.post("/api/rewrite", authenticateToken, rewriteText);
  app.post("/api/score", authenticateToken, calculateScore);
  app.post("/api/upload", authenticateToken, uploadFile);
  app.get("/api/history", authenticateToken, getHistory);
  app.delete("/api/job/:id", authenticateToken, deleteJob);

  return app;
}
