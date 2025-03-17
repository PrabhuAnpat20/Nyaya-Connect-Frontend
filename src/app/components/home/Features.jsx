"use client";
import React from "react";
import { BookOpen, MessageSquare, FileText, GraduationCap } from "lucide-react";

export default function Features() {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-teal-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold text-gray-900 sm:text-4xl">
            Your Complete Legal Learning Platform
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {/* Legal Knowledge Feature */}
            <div className="relative group">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white transform transition-transform group-hover:scale-110">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="ml-16 group-hover:translate-x-2 transition-transform">
                <p className="text-lg leading-6 font-medium text-gray-900">
                  Knowledge Base
                </p>
                <p className="mt-2 text-base text-gray-500">
                  Comprehensive legal information and resources.
                </p>
              </div>
            </div>

            {/* AI Chatbot Feature */}
            <div className="relative group">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white transform transition-transform group-hover:scale-110">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div className="ml-16 group-hover:translate-x-2 transition-transform">
                <p className="text-lg leading-6 font-medium text-gray-900">
                  AI Assistant
                </p>
                <p className="mt-2 text-base text-gray-500">
                  Get instant answers to legal questions.
                </p>
              </div>
            </div>

            {/* Document Simplifier Feature */}
            <div className="relative group">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white transform transition-transform group-hover:scale-110">
                <FileText className="h-6 w-6" />
              </div>
              <div className="ml-16 group-hover:translate-x-2 transition-transform">
                <p className="text-lg leading-6 font-medium text-gray-900">
                  Document Simplifier
                </p>
                <p className="mt-2 text-base text-gray-500">
                  Easy-to-understand legal documents.
                </p>
              </div>
            </div>

            {/* Quiz Feature */}
            <div className="relative group">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white transform transition-transform group-hover:scale-110">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="ml-16 group-hover:translate-x-2 transition-transform">
                <p className="text-lg leading-6 font-medium text-gray-900">
                  Interactive Quizzes
                </p>
                <p className="mt-2 text-base text-gray-500">
                  Learn through engaging legal quizzes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
