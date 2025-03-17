"use client";
import React, { useState } from "react";
import { Menu, X, Scale } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-600 hover:text-teal-600 transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors">
              Contact
            </a>
            <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-teal-600">
              Features
            </a>
            <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-teal-600">
              About
            </a>
            <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-teal-600">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}