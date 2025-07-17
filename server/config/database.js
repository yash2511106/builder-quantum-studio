import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // Default to in-memory MongoDB if no URI provided or connection fails
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/bias-detector";

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn("⚠️  MongoDB connection failed:", error.message);
    console.warn("⚠️  Running without database - some features may not work");
    // Don't exit process, let the app run without database for demo purposes
  }
};

export default connectDB;
