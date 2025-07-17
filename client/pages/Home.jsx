import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Brain,
  Users,
  CheckCircle,
  ArrowRight,
  Eye,
  Target,
  Zap,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 pt-20 pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8">
              Eliminate{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bias
              </span>{" "}
              in Hiring
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI-powered bias detection for job descriptions. Create inclusive,
              diverse workplaces with intelligent analysis and recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Free Analysis
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="mt-20 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-sm text-gray-500 font-medium">
                    bias-detector.ai/dashboard
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Job Description Analysis
                </h3>
              </div>

              <div className="text-left text-gray-700 leading-relaxed">
                <p className="mb-4">
                  We are looking for a{" "}
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded border-l-4 border-blue-500">
                    rock star
                  </span>{" "}
                  developer who is{" "}
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded border-l-4 border-orange-500">
                    young
                  </span>{" "}
                  and{" "}
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded border-l-4 border-blue-500">
                    aggressive
                  </span>{" "}
                  to join our team. The ideal candidate should be{" "}
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded border-l-4 border-red-500">
                    articulate
                  </span>{" "}
                  and a{" "}
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded border-l-4 border-red-500">
                    cultural fit
                  </span>
                  .
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">42</div>
                  <div className="text-sm text-gray-600">Diversity Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <div className="text-sm text-gray-600">Bias Terms Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">AI</div>
                  <div className="text-sm text-gray-600">Suggestions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Inclusive Hiring
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI detection, real-time scoring, and actionable insights
              to build diverse teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Bias Detection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced algorithms detect gender, age, and racial bias in
                real-time with color-coded highlights and severity levels.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Diversity Scoring
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get instant diversity scores (0-100) with detailed breakdowns
                and actionable recommendations for improvement.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Instant Rewrites
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered inclusive rewrites with side-by-side comparisons and
                export capabilities for immediate use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Build More Diverse Teams
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Reduce Unconscious Bias
                    </h3>
                    <p className="text-gray-600">
                      Identify and eliminate subtle biases that can deter
                      qualified candidates from applying.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Increase Application Rates
                    </h3>
                    <p className="text-gray-600">
                      Inclusive language attracts 42% more candidates from
                      underrepresented groups.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Improve Team Performance
                    </h3>
                    <p className="text-gray-600">
                      Diverse teams show 35% better performance and increased
                      innovation in problem-solving.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold text-gray-900">
                      Bias Analysis Report
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gender Bias</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      3 detected
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Age Bias</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      1 detected
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Racial Bias</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      2 detected
                    </span>
                  </div>
                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">
                        Diversity Score
                      </span>
                      <span className="text-2xl font-bold text-orange-500">
                        42/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full w-[42%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Inclusive Job Descriptions?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of HR professionals using AI to build more diverse
            and inclusive teams. Start your free analysis today.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
