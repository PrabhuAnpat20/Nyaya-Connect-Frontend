"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function CTA() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-gradient-to-r from-teal-500 to-emerald-500">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">
            {t('readyToStart')}
          </span>
          <span className="block text-teal-100">
            {t('beginJourney')}
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-full shadow">
            <a
              href="/quiz"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-teal-600 bg-white hover:bg-teal-50 transition-colors"
            >
              {t('giveQuiz')}
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
