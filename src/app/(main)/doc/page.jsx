"use client";
import React, { useState } from "react";
import api from "@/api/api";
import { Send, Loader2, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import withAuth from "@/app/utils/isAuth";

function Page() {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await api.post("/pdf/process-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const pdfObjectUrl = URL.createObjectURL(file);
      setPdfUrl(pdfObjectUrl);

      setChatHistory([
        {
          type: "answer",
          content: data.explanation,
        },
      ]);
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
    setLoading(false);
  };

  const handleChat = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setChatHistory((prev) => [
      ...prev,
      {
        type: "question",
        content: { question: query },
      },
    ]);

    try {
      const { data } = await api.post("/pdf/chat", { query });
      setChatHistory((prev) => [
        ...prev,
        {
          type: "answer",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error("Error chatting:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "answer",
          content: "Sorry, I encountered an error processing your request.",
        },
      ]);
    }
    setLoading(false);
    setQuery("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col">
      <div className="text-center mb-4 pt-4">
        <h1 className="text-4xl font-bold text-teal-800 mb-2">
          Document Chat Assistant
        </h1>
        <p className="text-teal-700">
          Upload a document and chat with AI about its contents
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 px-6 pb-6">
        {/* Left Column - PDF Upload and View */}
        <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col h-[calc(100vh-16rem)]">
          {loading && !pdfUrl ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-teal-600 mb-4" />
              <p className="text-teal-700 text-lg font-medium">
                Processing your document...
              </p>
              <p className="text-gray-500 text-sm mt-2">
                This may take a few moments
              </p>
            </div>
          ) : !pdfUrl ? (
            <div className="mb-4">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                accept=".pdf"
              />
              <button
                onClick={handleFileUpload}
                disabled={!file || loading}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 disabled:bg-gray-400 w-full"
              >
                Upload PDF
              </button>
            </div>
          ) : (
            <div className="flex-1 h-full">
              <iframe
                src={pdfUrl}
                className="w-full h-full border rounded"
                title="PDF Viewer"
              />
            </div>
          )}
        </div>

        {/* Right Column - Chat Interface */}
        <div className="rounded-lg border flex flex-col h-[calc(100vh-16rem)]">
          <div className="p-4 space-y-6 flex-1 overflow-y-auto">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-600">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-lg mb-2">
                  Upload a document to start chatting about its contents
                </p>
              </div>
            ) : (
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

          <div className="p-4 border-t bg-white">
            <form onSubmit={handleChat} className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about the document..."
                className="flex-1 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all text-base"
                disabled={!pdfUrl || loading}
              />
              <button
                type="submit"
                className="text-teal-500 hover:text-teal-600 transition-colors disabled:opacity-50"
                disabled={!pdfUrl || loading}
              >
                {loading ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : (
                  <Send className="w-7 h-7" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Page);
