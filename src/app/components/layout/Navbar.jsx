"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Scale, UserCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);
  const pathname = usePathname();

  // Don't render navbar on auth page
  if (pathname === "/auth") {
    return null;
  }

  // Fetch token and username from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = JSON.parse(
        localStorage.getItem("user") || '{"name": "User"}'
      );
      setToken(storedToken);
      setUsername(storedUser.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-teal-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Scale className="h-8 w-8 text-teal-600" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 text-transparent bg-clip-text">
              Nyay Connect
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              Features
            </a>
            <a
              href="/assistant"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              AI Assistant
            </a>
            <a
              href="/news"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              News
            </a>
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-teal-600"
                >
                  <UserCircle className="h-6 w-6" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {username}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/assistant"
                className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all transform hover:scale-105 cursor-pointer"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#features"
              className="block px-3 py-2 text-gray-600 hover:text-teal-600"
            >
              Features
            </a>
            <a
              href="#about"
              className="block px-3 py-2 text-gray-600 hover:text-teal-600"
            >
              About
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-600 hover:text-teal-600"
            >
              Contact
            </a>
            {token && (
              <>
                <div className="block px-3 py-2 text-gray-600 border-t">
                  <div className="px-3 py-2 text-sm font-medium">
                    {username}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
