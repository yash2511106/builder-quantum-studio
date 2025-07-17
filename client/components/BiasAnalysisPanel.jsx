import React from "react";
import { TrendingUp, AlertTriangle, CheckCircle, Info } from "lucide-react";

const BiasAnalysisPanel = ({
  diversityScore,
  biasCount,
  biasItems = [],
  suggestions = [],
}) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Analysis Summary
      </h3>

      {/* Diversity Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Diversity Score
          </span>
          <span
            className={`text-2xl font-bold ${getScoreColor(diversityScore)}`}
          >
            {diversityScore}/100
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${getScoreBgColor(diversityScore)}`}
            style={{ width: `${diversityScore}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {diversityScore >= 80
            ? "Excellent! Very inclusive language"
            : diversityScore >= 60
              ? "Good, but room for improvement"
              : "Needs significant improvement"}
        </p>
      </div>

      {/* Total Bias Count */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <span className="font-medium text-gray-900">Bias Detected</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{biasCount}</div>
        <div className="text-sm text-gray-600">
          {biasCount === 0
            ? "No bias detected"
            : `${biasCount} biased term${biasCount > 1 ? "s" : ""} found`}
        </div>
      </div>

      {/* Bias Breakdown */}
      {biasCount > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Bias Categories
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Gender</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                {biasCounts.gender}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Age</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                {biasCounts.age}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Racial</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                {biasCounts.racial}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Severity Breakdown */}
      {biasCount > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Severity Levels
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">High</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                {severityCounts.high}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Medium</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                {severityCounts.medium}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Low</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium">
                {severityCounts.low}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500" />
            Recommendations
          </h4>
          <div className="space-y-2">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Updates Indicator */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live analysis active</span>
        </div>
      </div>
    </div>
  );
};

export default BiasAnalysisPanel;
