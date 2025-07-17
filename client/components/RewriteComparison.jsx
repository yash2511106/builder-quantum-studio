import React, { useState } from "react";
import {
  Download,
  Copy,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const RewriteComparison = ({ original, rewritten, improvements }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rewritten);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([rewritten], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "inclusive-job-description.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Inclusive Rewrite
          </h3>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
            {improvements} improvements made
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <h4 className="font-semibold text-gray-900">Original Version</h4>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg max-h-80 overflow-y-auto">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {original}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div className="lg:hidden flex justify-center my-4">
          <ArrowRight className="w-6 h-6 text-gray-400" />
        </div>

        {/* Rewritten */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h4 className="font-semibold text-gray-900">Inclusive Version</h4>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg max-h-80 overflow-y-auto">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {rewritten}
            </p>
          </div>
        </div>
      </div>

      {/* Improvement Summary */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">What was improved:</h4>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Removed gendered language
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Eliminated age bias
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Enhanced inclusivity
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Professional tone
          </span>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Ready to use:</h4>
        <p className="text-sm text-gray-600">
          This inclusive version is ready to post on job boards. The rewritten
          text maintains the original meaning while using language that welcomes
          candidates from all backgrounds.
        </p>
      </div>
    </div>
  );
};

export default RewriteComparison;
