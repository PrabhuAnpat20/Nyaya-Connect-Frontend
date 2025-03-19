"use client";
import React from "react";
import { Scale, Github } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white border-t border-teal-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Scale className="h-8 w-8 text-teal-600" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 text-transparent bg-clip-text">
              Nyay Connect
            </span>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-teal-500 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a
              href="#"
              className="text-gray-400 hover:text-teal-600 transition-colors"
            >
              {t('privacy')}
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-600 transition-colors"
            >
              {t('terms')}
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-600 transition-colors"
            >
              {t('contact')}
            </a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}