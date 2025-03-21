"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Translations
const translations = {
  en: {
    // Navbar
    home: "Home",
    lawsToKnow: "Laws To Know",
    aiAssistant: "AI Assistant",
    documentAssistant: "Document Assistant",
    Lawyers: "Lawyers",
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
    lawyerConnect: "Lawyer Connect",
    lawyerConnectDesc: "For professional legal consultation and guidance",

    // CTA
    readyToStart: "Ready to start learning through interactive quizzes?",
    beginJourney: "Begin your journey to knowledge today.",
    giveQuiz: "Give Quiz",

    // Footer
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    allRightsReserved: "© 2024 Nyay Connect. All rights reserved.",
    //doc
    documentChatAssistant: "Document Chat Assistant",
    uploadAndChat: "Upload a document and chat with AI about its contents",
    startChattingPrompt:
      "Upload a document to start chatting about its contents",
    askAboutDocument: "Ask about the document...",
    uploadPDF: "Upload PDF",
    chooseFile: "Choose File",
    //assistant
    legalAIAssistant: "Legal AI Assistant",
    legalGuide: "Your trusted legal information guide",
    howCanIHelp: "How can I assist you with legal information today?",
    typeLegalQuestion: "Type your legal question here...",
    tenantRights: "What are my rights as a tenant?",
    smallClaims: "How do I file a small claims case?",
    carAccident: "What should I do after a car accident?",
    intellectualProperty: "How can I protect my intellectual property?",
  },
  hi: {
    // Navbar
    home: "होम",
    lawsToKnow: "जानने योग्य कानून",
    aiAssistant: "AI सहायक",
    documentAssistant: "दस्तावेज़ सहायक",
    news: "समाचार",
    Lawyers: "वकील",
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
    lawyerConnect: "वकील कनेक्ट",
    lawyerConnectDesc: " मार्गदर्शन के लिए अनुभवी वकीलों से जुड़ें",
    // CTA
    readyToStart:
      "इंटरैक्टिव क्विज़ के माध्यम से सीखना शुरू करने के लिए तैयार हैं?",
    beginJourney: "आज ही ज्ञान की यात्रा शुरू करें।",
    giveQuiz: "क्विज़ दें",

    // Footer
    privacy: "गोपनीयता",
    terms: "शर्तें",
    contact: "संपर्क",
    allRightsReserved: "© 2024 न्याय कनेक्ट। सर्वाधिकार सुरक्षित।",
    //assistnat
    legalAIAssistant: "कानूनी AI सहायक",
    legalGuide: "आपका विश्वसनीय कानूनी जानकारी मार्गदर्शक",
    howCanIHelp: "मैं आज आपकी कानूनी जानकारी में कैसे मदत कर सकता हूं?",
    typeLegalQuestion: "अपना कानूनी प्रश्न यहां टाइप करें...",
    tenantRights: "किरायेदार के रूप में मेरे क्या अधिकार हैं?",
    smallClaims: "छोटे दावों का मामला कैसे दर्ज करें?",
    carAccident: "कार दुर्घटना के बाद क्या करना चाहिए?",
    intellectualProperty: "मैं अपनी बौद्धिक संपदा की रक्षा कैसे कर सकता हूं?",

    //doc
    documentChatAssistant: "दस्तावेज़ चैट सहायक",
    uploadAndChat:
      "दस्तावेज़ अपलोड करें और AI के साथ इसकी सामग्री के बारे में चैट करें",
    startChattingPrompt:
      "सामग्री के बारे में चैट करने के लिए एक दस्तावेज़ अपलोड करें",
    askAboutDocument: "दस्तावेज़ के बारे में पूछें...",
    uploadPDF: "पीडीएफ अपलोड करें",
    chooseFile: "फ़ाइल चुनें",
  },
  mr: {
    // Navbar
    home: "मुख्यपृष्ठ",
    lawsToKnow: "जाणून घेण्यासाठी कायदे",
    aiAssistant: "AI सहाय्यक",
    documentAssistant: "दस्तावेज़ सहाय्यक",
    news: "बातम्या",
    Lawyers: "वकील",
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
    documentSimplifier: "दस्तावेज़ सुलभकर्ता",
    documentSimplifierDesc: "सहज समजण्यायोग्य कायदेशीर दस्तावेज.",
    interactiveQuizzes: "इंटरॅक्टिव्ह क्विझेस",
    interactiveQuizzesDesc: "आकर्षक कायदेशीर क्विझेसद्वारे शिका.",
    lawyerConnect: "वकील कनेक्ट",
    lawyerConnectDesc: " मार्गदर्शनासाठी अनुभवी वकिलांशी संपर्क साधा",
    // CTA
    readyToStart: "इंटरॅक्टिव्ह क्विझेसद्वारे शिकण्यास तयार आहात?",
    beginJourney: "आजच तुमची ज्ञानाची यात्रा सुरू करा.",
    giveQuiz: "क्विझ द्या",

    // Footer
    privacy: "गोपनीयता",
    terms: "अटी",
    contact: "संपर्क",
    allRightsReserved: "© 2024 न्याय कनेक्ट. सर्व हक्क राखीव.",
    //assistnat
    legalAIAssistant: "कायदेशीर AI सहाय्यक",
    legalGuide: "तुमचा विश्वसनीय कायदेशीर माहिती मार्गदर्शक",
    howCanIHelp: "मी आज तुम्हाला कायदेशीर माहितीमध्ये कशी मदत करू शकतो?",
    typeLegalQuestion: "तुमचा कायदेशीर प्रश्न येथे टाइप करा...",
    tenantRights: "भाडेकरू म्हणून माझे हक्क काय आहेत?",
    smallClaims: "लहान दावा कसा दाखल करावा?",
    carAccident: "कार अपघातानंतर काय करावे?",
    intellectualProperty: "मी माझी बौद्धिक संपदा कशी संरक्षित करू शकतो?",

    //doc
    documentChatAssistant: "दस्तऐवज चॅट सहाय्यक",
    uploadAndChat:
      "दस्तऐवज अपलोड करा आणि त्याच्या सामग्रीबद्दल AI सोबत चॅट करा",
    startChattingPrompt: "सामग्रीबद्दल चॅट करण्यासाठी दस्तऐवज अपलोड करा",
    askAboutDocument: "दस्तऐवजाबद्दल विचारा...",
    uploadPDF: "पीडीएफ अपलोड करा",
    chooseFile: "फाईल निवडा",
  },
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
