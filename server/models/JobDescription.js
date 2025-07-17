import mongoose from "mongoose";

const biasItemSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["gender", "age", "racial"],
    required: true,
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  suggestion: {
    type: String,
    required: true,
  },
  position: {
    start: Number,
    end: Number,
  },
});

const jobDescriptionSchema = new mongoose.Schema(
  {
    originalText: {
      type: String,
      required: true,
    },
    revisedText: {
      type: String,
    },
    biasList: [biasItemSchema],
    diversityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "Job Description Analysis",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("JobDescription", jobDescriptionSchema);
