import React, { useState, useRef } from "react";
import {
  Upload,
  Scan,
  RotateCcw,
  Download,
  AlertTriangle,
  TrendingUp,
  Eye,
  FileText,
  Loader2,
} from "lucide-react";
import axios from "axios";
import BiasAnalysisPanel from "../components/BiasAnalysisPanel";
import RewriteComparison from "../components/RewriteComparison";

const Dashboard = () => {
  const [jobText, setJobText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [rewriteResult, setRewriteResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRewrite, setShowRewrite] = useState(false);
  const fileInputRef = useRef(null);

  const handleAnalyze = async () => {
    if (!jobText.trim()) {
      setError("Please enter job description text to analyze");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysisResult(null);
    setRewriteResult(null);
    setShowRewrite(false);

    try {
      const response = await axios.post("/api/analyze", {
        text: jobText,
        title: "Dashboard Analysis",
      });

      setAnalysisResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to analyze job description",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRewrite = async () => {
    if (!jobText.trim()) {
      setError("Please enter job description text to rewrite");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/rewrite", {
        text: jobText,
        jobId: analysisResult?.id,
      });

      setRewriteResult(response.data);
      setShowRewrite(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to rewrite job description",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setJobText(response.data.extractedText);
      setAnalysisResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setJobText("");
    setAnalysisResult(null);
    setRewriteResult(null);
    setShowRewrite(false);
    setError("");
  };

  const getBiasHighlights = (text, biasItems) => {
    if (!biasItems || biasItems.length === 0) return text;

    // Sort bias items by position (end to start) to avoid index shifting
    const sortedItems = [...biasItems].sort(
      (a, b) => b.position.end - a.position.end,
    );

    let highlightedText = text;

    sortedItems.forEach((item) => {
      const { term, category, severity, position } = item;
      const colorClass =
        category === "gender"
          ? "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
          : category === "age"
            ? "bg-orange-100 text-orange-800 border-l-4 border-orange-500"
            : "bg-red-100 text-red-800 border-l-4 border-red-500";

      const before = highlightedText.substring(0, position.start);
      const after = highlightedText.substring(position.end);
      const highlight = `<span class="inline-block px-2 py-1 rounded ${colorClass} font-medium" title="${category} bias (${severity}): ${item.suggestion}">${term}</span>`;

      highlightedText = before + highlight + after;
    });

    return highlightedText;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bias Analysis Dashboard
          </h1>
          <p className="text-gray-600">
            Upload or paste job descriptions to detect and eliminate bias with
            AI
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Job Description Input
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Upload File
                  </button>
                  <button
                    onClick={resetAnalysis}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />

              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Paste your job description here or upload a file (TXT, PDF, DOCX)..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !jobText.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Scan className="w-4 h-4" />
                  )}
                  {loading ? "Analyzing..." : "Analyze for Bias"}
                </button>

                {analysisResult && (
                  <button
                    onClick={handleRewrite}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RotateCcw className="w-4 h-4" />
                    )}
                    {loading ? "Rewriting..." : "Generate Inclusive Version"}
                  </button>
                )}
              </div>
            </div>

            {/* Analysis Results */}
            {analysisResult && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Bias Analysis Results
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>

                <div className="prose max-w-none">
                  <div
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: getBiasHighlights(
                        jobText,
                        analysisResult.biasItems,
                      ),
                    }}
                  />
                </div>

                {/* Bias Legend */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 border-l-4 border-blue-500 rounded"></div>
                    <span className="text-gray-600">Gender Bias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-100 border-l-4 border-orange-500 rounded"></div>
                    <span className="text-gray-600">Age Bias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 border-l-4 border-red-500 rounded"></div>
                    <span className="text-gray-600">Racial Bias</span>
                  </div>
                </div>

                {/* Bias Items List */}
                {analysisResult.biasItems.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Detected Bias Terms ({analysisResult.biasItems.length})
                    </h4>
                    <div className="space-y-2">
                      {analysisResult.biasItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2 py-1 rounded text-sm font-medium ${
                                item.category === "gender"
                                  ? "bg-blue-100 text-blue-800"
                                  : item.category === "age"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              "{item.term}"
                            </span>
                            <span className="text-sm text-gray-600">
                              {item.category} • {item.severity}
                            </span>
                          </div>
                          <span className="text-sm text-green-600 font-medium">
                            → "{item.suggestion}"
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Rewrite Comparison */}
            {showRewrite && rewriteResult && (
              <RewriteComparison
                original={jobText}
                rewritten={rewriteResult.rewrittenText}
                improvements={rewriteResult.improvements}
              />
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {analysisResult && (
              <BiasAnalysisPanel
                diversityScore={analysisResult.diversityScore}
                biasCount={analysisResult.totalBiasCount}
                biasItems={analysisResult.biasItems}
                suggestions={analysisResult.suggestions}
              />
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      View History
                    </div>
                    <div className="text-sm text-gray-600">
                      See past analyses
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Best Practices
                    </div>
                    <div className="text-sm text-gray-600">
                      Learn inclusive writing
                    </div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Analytics Dashboard
                    </div>
                    <div className="text-sm text-gray-600">Track progress</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
