import multer from "multer";
import JobDescription from "../models/JobDescription.js";
import mongoose from "mongoose";
import {
  detectBias,
  calculateDiversityScore,
  generateInclusiveRewrite,
  getInclusiveSuggestions,
} from "../services/biasDetector.js";

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "text/plain",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only TXT, PDF, and DOCX files are allowed"));
    }
  },
});

export const analyzeText = async (req, res) => {
  try {
    const { text, title } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        message: "Text is required for analysis",
      });
    }

    // Detect bias in the text
    const biasItems = detectBias(text);
    const diversityScore = calculateDiversityScore(biasItems, text.length);

    let analysisId = "demo-analysis-" + Date.now();

    // Save analysis to database if connected
    if (mongoose.connection.readyState === 1) {
      try {
        const jobDescription = new JobDescription({
          originalText: text,
          biasList: biasItems,
          diversityScore,
          userId: req.user._id,
          title: title || "Job Description Analysis",
        });

        await jobDescription.save();
        analysisId = jobDescription._id;
      } catch (dbError) {
        console.warn("Database save failed, using demo mode:", dbError.message);
      }
    }

    res.json({
      id: analysisId,
      biasItems,
      diversityScore,
      totalBiasCount: biasItems.length,
      suggestions: getInclusiveSuggestions(),
      message: "Analysis completed successfully",
    });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      message: "Error during bias analysis",
    });
  }
};

export const rewriteText = async (req, res) => {
  try {
    const { text, jobId } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required for rewriting",
      });
    }

    // Detect bias and generate rewrite
    const biasItems = detectBias(text);
    const rewrittenText = generateInclusiveRewrite(text, biasItems);
    const diversityScore = calculateDiversityScore(
      detectBias(rewrittenText),
      rewrittenText.length,
    );

    // Update existing job description if jobId provided
    if (jobId) {
      await JobDescription.findByIdAndUpdate(jobId, {
        revisedText: rewrittenText,
        diversityScore,
      });
    }

    res.json({
      originalText: text,
      rewrittenText,
      biasItems,
      diversityScore,
      improvements: biasItems.length,
      message: "Text rewritten successfully",
    });
  } catch (error) {
    console.error("Rewrite error:", error);
    res.status(500).json({
      message: "Error during text rewriting",
    });
  }
};

export const calculateScore = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required for scoring",
      });
    }

    const biasItems = detectBias(text);
    const diversityScore = calculateDiversityScore(biasItems, text.length);

    // Categorize bias counts
    const biasCounts = {
      gender: biasItems.filter((item) => item.category === "gender").length,
      age: biasItems.filter((item) => item.category === "age").length,
      racial: biasItems.filter((item) => item.category === "racial").length,
    };

    const severityCounts = {
      high: biasItems.filter((item) => item.severity === "high").length,
      medium: biasItems.filter((item) => item.severity === "medium").length,
      low: biasItems.filter((item) => item.severity === "low").length,
    };

    res.json({
      diversityScore,
      totalBias: biasItems.length,
      biasCounts,
      severityCounts,
      recommendations: getInclusiveSuggestions().slice(0, 3),
    });
  } catch (error) {
    console.error("Scoring error:", error);
    res.status(500).json({
      message: "Error calculating diversity score",
    });
  }
};

// Simple text extraction (for demo purposes - in production, use proper libraries)
function extractTextFromFile(file) {
  if (file.mimetype === "text/plain") {
    return file.buffer.toString("utf-8");
  }
  // For PDF and DOCX, return placeholder text
  // In production, use libraries like pdf-parse, mammoth, etc.
  return `[File content extraction would require additional libraries for ${file.originalname}. Please paste the text directly for now.]`;
}

export const uploadFile = [
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const extractedText = extractTextFromFile(req.file);

      // Analyze the extracted text
      const biasItems = detectBias(extractedText);
      const diversityScore = calculateDiversityScore(
        biasItems,
        extractedText.length,
      );

      // Save to database
      const jobDescription = new JobDescription({
        originalText: extractedText,
        biasList: biasItems,
        diversityScore,
        userId: req.user._id,
        title: req.file.originalname,
      });

      await jobDescription.save();

      res.json({
        id: jobDescription._id,
        fileName: req.file.originalname,
        extractedText,
        biasItems,
        diversityScore,
        message: "File uploaded and analyzed successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({
        message: "Error processing uploaded file",
      });
    }
  },
];

export const getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobDescriptions = await JobDescription.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title originalText diversityScore biasList createdAt");

    const total = await JobDescription.countDocuments({
      userId: req.user._id,
    });

    res.json({
      jobDescriptions: jobDescriptions.map((job) => ({
        id: job._id,
        title: job.title,
        preview: job.originalText.substring(0, 150) + "...",
        diversityScore: job.diversityScore,
        biasCount: job.biasList.length,
        createdAt: job.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({
      message: "Error fetching job description history",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const jobDescription = await JobDescription.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!jobDescription) {
      return res.status(404).json({
        message: "Job description not found",
      });
    }

    res.json({
      message: "Job description deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      message: "Error deleting job description",
    });
  }
};
