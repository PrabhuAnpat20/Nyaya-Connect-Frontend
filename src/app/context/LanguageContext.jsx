"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';

// Translations
const translations = {
  en: {
    // Navbar
    home: "Home",
    lawsToKnow: "Laws To Know",
    aiAssistant: "AI Assistant",
    news: "News",
    getStarted: "Get Started",
    logout: "Logout",
    language: "Language",
    
    // Hero
    masterLegal: "Master Legal Knowledge",
    throughInteractive: "Through Interactive Learning",
    
    // Features
    completeLegal: "Your Complete Legal Learning Platform",
    knowledgeBase: "Knowledge Base",
    knowledgeBaseDesc: "Comprehensive legal information and resources.",
    aiAssistantFeature: "AI Assistant",
    aiAssistantDesc: "Get instant answers to legal questions.",
    documentSimplifier: "Document Simplifier",
    documentSimplifierDesc: "Easy-to-understand legal documents.",
    interactiveQuizzes: "Interactive Quizzes",
    interactiveQuizzesDesc: "Learn through engaging legal quizzes.",
    
    // CTA
    readyToStart: "Ready to start learning through interactive quizzes?",
    beginJourney: "Begin your journey to knowledge today.",
    giveQuiz: "Give Quiz",
    
    // Footer
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    allRightsReserved: "© 2024 Nyay Connect. All rights reserved."
  },
  hi: {
    // Navbar
    home: "होम",
    lawsToKnow: "जानने योग्य कानून",
    aiAssistant: "AI सहायक",
    news: "समाचार",
    getStarted: "शुरू करें",
    logout: "लॉग आउट",
    language: "भाषा",
    
    // Hero
    masterLegal: "कानूनी ज्ञान में महारत हासिल करें",
    throughInteractive: "इंटरैक्टिव लर्निंग के माध्यम से",
    
    // Features
    completeLegal: "आपका संपूर्ण कानूनी शिक्षा मंच",
    knowledgeBase: "ज्ञान आधार",
    knowledgeBaseDesc: "व्यापक कानूनी जानकारी और संसाधन।",
    aiAssistantFeature: "AI सहायक",
    aiAssistantDesc: "कानूनी प्रश्नों के तुरंत उत्तर प्राप्त करें।",
    documentSimplifier: "दस्तावेज़ सरलीकरण",
    documentSimplifierDesc: "आसानी से समझने योग्य कानूनी दस्तावेज़।",
    interactiveQuizzes: "इंटरैक्टिव क्विज़",
    interactiveQuizzesDesc: "आकर्षक कानूनी क्विज़ के माध्यम से सीखें।",
    
    // CTA
    readyToStart: "इंटरैक्टिव क्विज़ के माध्यम से सीखना शुरू करने के लिए तैयार हैं?",
    beginJourney: "आज ही ज्ञान की यात्रा शुरू करें।",
    giveQuiz: "क्विज़ दें",
    
    // Footer
    privacy: "गोपनीयता",
    terms: "शर्तें",
    contact: "संपर्क",
    allRightsReserved: "© 2024 न्याय कनेक्ट। सर्वाधिकार सुरक्षित।"
  },
  mr: {
    // Navbar
    home: "मुख्यपृष्ठ",
    lawsToKnow: "जाणून घेण्यासाठी कायदे",
    aiAssistant: "AI सहाय्यक",
    news: "बातम्या",
    getStarted: "सुरू करा",
    logout: "बाहेर पडा",
    language: "भाषा",
    
    // Hero
    masterLegal: "कायदेशीर ज्ञानात प्रावीण्य मिळवा",
    throughInteractive: "इंटरॅक्टिव्ह शिक्षणाद्वारे",
    
    // Features
    completeLegal: "तुमचे संपूर्ण कायदेशीर शिक्षण व्यासपीठ",
    knowledgeBase: "ज्ञान आधार",
    knowledgeBaseDesc: "सर्वसमावेशक कायदेशीर माहिती आणि संसाधने.",
    aiAssistantFeature: "AI सहाय्यक",
    aiAssistantDesc: "कायदेशीर प्रश्नांची त्वरित उत्तरे मिळवा.",
    documentSimplifier: "दस्तऐवज सुलभकर्ता",
    documentSimplifierDesc: "सहज समजण्यायोग्य कायदेशीर दस्तऐवज.",
    interactiveQuizzes: "इंटरॅक्टिव्ह क्विझेस",
    interactiveQuizzesDesc: "आकर्षक कायदेशीर क्विझेसद्वारे शिका.",
    
    // CTA
    readyToStart: "इंटरॅक्टिव्ह क्विझेसद्वारे शिकण्यास तयार आहात?",
    beginJourney: "आजच तुमची ज्ञानाची यात्रा सुरू करा.",
    giveQuiz: "क्विझ द्या",
    
    // Footer
    privacy: "गोपनीयता",
    terms: "अटी",
    contact: "संपर्क",
    allRightsReserved: "© 2024 न्याय कनेक्ट. सर्व हक्क राखीव."
  }
};

// Create the language context
const LanguageContext = createContext();

// Create a provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  
  useEffect(() => {
    // Get the stored language preference or default to English
    const storedLanguage = localStorage.getItem("language") || "en";
    setLanguage(storedLanguage);
  }, []);

  // Function to change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Get text based on current language
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}