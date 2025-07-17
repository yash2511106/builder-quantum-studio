import jwt from "jsonwebtoken";
import User from "../models/User.js";
import mongoose from "mongoose";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // For demo purposes, create a mock user when DB is not available
      req.user = {
        _id: decoded.userId,
        name: "Demo User",
        email: "demo@biasdetector.ai",
      };
      return next();
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
