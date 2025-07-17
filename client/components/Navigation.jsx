import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              BiasDetector
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  History
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    <User className="w-4 h-4" />
                    {user?.name || "Account"}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      <div className="px-3 py-2 text-sm text-gray-500">
                        {user?.email}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/history"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    History
                  </Link>
                  <div className="border-t pt-2 mt-2">
                    <div className="px-3 py-2 text-sm text-gray-500">
                      {user?.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-red-600 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium mx-3 mt-2 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
