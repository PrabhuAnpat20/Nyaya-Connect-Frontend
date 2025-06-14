"use client";
import React from "react";
import { Users, MessageSquare, FileText, GraduationCap } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import Link from "next/link";

export default function Features() {
  const { t } = useLanguage();

  return (
    <div className="py-16 bg-gradient-to-b from-white to-teal-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold text-gray-900 sm:text-4xl">
            {t("completeLegal")}
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {/* Lawyer Connect Feature */}
            <Link href="/lawyers">
              <div className="relative group">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white transform transition-transform group-hover:scale-110">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-16 group-hover:translate-x-2 transition-transform">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    {t("lawyerConnect")}
                  </p>
                  <p className="mt-2 text-base text-gray-500">
                    {t("lawyerConnectDesc")}
                  </p>
                </div>
              </div>
            </Link>

            {/* AI Chatbot Feature */}
            <Link href="/assistant">
              <div className="relative group">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white transform transition-transform group-hover:scale-110">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div className="ml-16 group-hover:translate-x-2 transition-transform">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    {t("aiAssistantFeature")}
                  </p>
                  <p className="mt-2 text-base text-gray-500">
                    {t("aiAssistantDesc")}
                  </p>
                </div>
              </div>
            </Link>

            {/* Document Simplifier Feature */}
            <Link href="/doc">
              <div className="relative group">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white transform transition-transform group-hover:scale-110">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="ml-16 group-hover:translate-x-2 transition-transform">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    {t("documentSimplifier")}
                  </p>
                  <p className="mt-2 text-base text-gray-500">
                    {t("documentSimplifierDesc")}
                  </p>
                </div>
              </div>
            </Link>

            {/* Quiz Feature */}
            <Link href="/quiz">
              <div className="relative group">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white transform transition-transform group-hover:scale-110">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="ml-16 group-hover:translate-x-2 transition-transform">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    {t("interactiveQuizzes")}
                  </p>
                  <p className="mt-2 text-base text-gray-500">
                    {t("interactiveQuizzesDesc")}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
