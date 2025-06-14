"use client";
import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Loader2,
  Mic,
  Volume2,
  VolumeX,
} from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import withAuth from "@/app/utils/isAuth";
import remarkGfm from "remark-gfm"; // Add this import at the top
import { useLanguage } from "@/app/context/LanguageContext";
import { GenAiURL } from "@/api/api";
function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const { language, t } = useLanguage();

  // Update common questions with translations
  const commonQuestions = [
    t("tenantRights") || "What are my rights as a tenant?",
    t("smallClaims") || "How do I file a small claims case?",
    t("carAccident") || "What should I do after a car accident?",
    t("intellectualProperty") || "How can I protect my intellectual property?",
  ];

  // Check if speech recognition is supported
  useEffect(() => {
    const isSpeechRecognitionSupported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    setSpeechSupported(isSpeechRecognitionSupported);
  }, []);

  // Update speech recognition language
  const startListening = () => {
    if (!speechSupported) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang =
      language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Update text-to-speech language
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang =
        language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-US";
      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error", event);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Update API call to include language
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      setIsLoading(true);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "question",
          content: { question: message },
        },
      ]);

      try {
        const response = await axios.post(`${GenAiURL}/api/chat`, {
          query: message,
          language:
            language === "hi"
              ? "hindi"
              : language === "mr"
              ? "marathi"
              : "english",
        });

        setChatHistory((prev) => [
          ...prev,
          {
            type: "answer",
            content: response.data.response.trim(),
          },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setChatHistory((prev) => [
          ...prev,
          {
            type: "answer",
            content: "Sorry, I encountered an error processing your request.",
          },
        ]);
      } finally {
        setIsLoading(false);
        setMessage("");
      }
    }
  };

  return (
    <div className="px-6">
      {/* Header */}
      <div className="text-center mb-4 pt-8">
        <h1 className="text-4xl font-bold text-teal-800 mb-2">
          {t("legalAIAssistant") || "Legal AI Assistant"}
        </h1>
        <p className="text-teal-700">
          {t("legalGuide") || "Your trusted legal information guide"}
        </p>
      </div>

      {/* Chat Interface */}
      <div className="rounded-lg">
        <div className="p-4 space-y-6">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-600">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-lg mb-2">
                {t("howCanIHelp") ||
                  "How can I assist you with legal information today?"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {commonQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="bg-teal-100 hover:bg-teal-100 rounded-lg p-4 text-left text-sm transition-colors border border-teal-100"
                    onClick={() => setMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Update the chat display section
            chatHistory.map((msg, index) => (
              <div key={index} className="mb-6">
                {msg.type === "question" ? (
                  <div className="bg-teal-100 p-4 rounded-lg mb-4 w-fit ml-auto">
                    <p className="text-gray-800">{msg.content.question}</p>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-teal-800 rounded-full flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Response
                      </h2>
                      {/* Text-to-speech button */}
                      {!isSpeaking ? (
                        <button
                          onClick={() => speakText(msg.content)}
                          className="ml-auto text-teal-600 hover:text-teal-800 transition-colors"
                          title="Read aloud"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={stopSpeaking}
                          className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                          title="Stop reading"
                        >
                          <VolumeX className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="prose prose-sm md:prose-base lg:prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:underline max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-2xl font-bold mb-4"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-xl font-bold mt-6 mb-3"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc pl-6 mb-4" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-1" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mb-4" {...props} />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-bold text-gray-900"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        {/* Message Input - enhanced styling */}
        <div className="px-6 pb-6">
          <form
            onSubmit={handleSendMessage}
            className="px-8 py-6 bg-opacity-50 backdrop-blur-sm"
          >
            <div className="flex gap-4 max-w-5xl mx-auto">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  t("typeLegalQuestion") || "Type your legal question here..."
                }
                className="flex-1 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all text-base"
                disabled={isLoading}
              />
              {/* Speech recognition button */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={startListening}
                  className={`text-teal-500 hover:text-teal-600 transition-colors disabled:opacity-50 ${
                    isListening ? "animate-pulse text-red-500" : ""
                  }`}
                  disabled={isLoading || isListening}
                  title="Speak your question"
                >
                  <Mic className="w-7 h-7" />
                </button>
              )}
              <button
                type="submit"
                className="text-teal-500 hover:text-teal-600 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : (
                  <Send className="w-7 h-7" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuth(App);
