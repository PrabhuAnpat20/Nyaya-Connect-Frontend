"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Scale, UserCircle, LogOut, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { language, changeLanguage, t } = useLanguage();
  const { user, logout, loading } = useAuth(); // Add loading here

  // Remove hasReloaded state since we don't need it
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const token = localStorage.getItem("token");
      if (token && !user && pathname === "/") {
        window.location.reload(); // Force a full page reload when on home page
      }
    }
  }, [mounted, user, pathname]);

  // Remove the duplicate useEffects below
  const [hasReloaded, setHasReloaded] = useState(false);

  // Remove hasReloaded state
  useEffect(() => {
    setMounted(true);

    // Check if token exists in local storage
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token && !user) {
        // Only redirect to home if not already there
        if (pathname !== "/") {
          router.push("/");
        }
      }
    };

    checkToken();
  }); // loading is now defined

  // Add a separate effect to track user changes
  useEffect(() => {
    // This effect will run whenever the user state changes
    // No need to do anything inside, just having user as a dependency
    // will cause the component to re-render
  }, []);

  // Don't render navbar on auth page and before mounting
  if (!mounted || pathname === "/auth" || loading) {
    // Add loading check
    return null;
  }

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push("/auth");
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsLanguageOpen(false);
  };

  // Language options
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
  ];

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
            <Link
              href="/"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              href="/laws"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              {t("lawsToKnow")}
            </Link>
            <Link
              href="/doc"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              {t("documentAssistant")}
            </Link>
            <Link
              href="/assistant"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              {t("aiAssistant")}
            </Link>
            <Link
              href="/news"
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              {t("news")}
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-teal-600"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm">
                  {languages.find((lang) => lang.code === language)?.name ||
                    "English"}
                </span>
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-sm text-left ${
                        language === lang.code
                          ? "text-teal-600 bg-gray-50"
                          : "text-gray-700"
                      } hover:bg-gray-100 flex items-center`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-teal-600"
                >
                  <UserCircle className="h-6 w-6" />
                  <span className="text-sm">
                    {user?.name ||
                      JSON.parse(localStorage.getItem("user"))?.name ||
                      "User"}
                  </span>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all transform hover:scale-105 cursor-pointer"
              >
                {t("getStarted")}
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
            <Link
              href="/"
              className="block px-3 py-2 text-gray-600 hover:text-teal-600"
            >
              {t("home")}
            </Link>
            <Link
              href="/laws"
              className="block px-3 py-2 text-gray-600 hover:text-teal-600"
            >
              {t("lawsToKnow")}
            </Link>
            <Link
              href="/doc"
              className="block px-3 py-2 text-gray-600 hover:text-teal-600"
            >
              {t("documentAssistant")}
            </Link>
            <Link
              href="/assistant"
              className="block px-3 py-2 text-gray-600 hover:text-teal-600"
            >
              {t("aiAssistant")}
            </Link>
            <Link
              href="/news"
              className="block px-3 py-2 text-gray-600 hover:text-teal-600"
            >
              {t("news")}
            </Link>

            {/* Language Selector for Mobile */}
            <div className="block px-3 py-2 text-gray-600 border-t">
              <div className="px-3 py-2 text-sm font-medium">
                {t("language")}
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center w-full px-3 py-2 text-sm ${
                    language === lang.code
                      ? "text-teal-600 font-medium"
                      : "text-gray-700"
                  } hover:bg-gray-100`}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            {user && (
              <>
                <div className="block px-3 py-2 text-gray-600 border-t">
                  <div className="px-3 py-2 text-sm font-medium">
                    {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("logout")}
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
