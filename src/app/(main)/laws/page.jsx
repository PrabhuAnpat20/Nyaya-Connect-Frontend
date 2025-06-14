"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Scale, BookOpen } from "lucide-react"; // Add this import at the top
import withAuth from "@/app/utils/isAuth";

function LawsPage() {
  const [laws, setLaws] = useState([]);
  const [selectedLaw, setSelectedLaw] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const response = await api.post("/law/user-laws");
        setLaws(response.data.data);
      } catch (error) {
        console.error("Error fetching laws:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaws();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-100 border-t-teal-600"></div>
        <p className="mt-4 text-teal-600 text-lg font-medium">
          Loading laws...
        </p>
      </div>
    );
  }

  const handleStartQuiz = (lawTitle) => {
    router.push(`/quiz?topic=${encodeURIComponent(lawTitle)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Scale className="h-10 w-10 text-teal-600" />
          <BookOpen className="h-10 w-10 text-teal-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Legal Knowledge Hub
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore comprehensive information about Indian laws and regulations.
          Click on any law to learn more about its provisions and relevance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {laws.map((law) => (
          <div
            key={law.id}
            onClick={() => setSelectedLaw(law)}
            className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white hover:bg-teal-50 group"
          >
            <h2 className="text-sm font-medium text-gray-800 group-hover:text-teal-600 line-clamp-2">
              {law.lawTitle}
            </h2>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedLaw} onOpenChange={() => setSelectedLaw(null)}>
        {selectedLaw && (
          <DialogContent className="max-w-2xl bg-teal-100">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-teal-600">
                {selectedLaw.lawTitle}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Description</h3>
                <p className="text-gray-600">{selectedLaw.lawContent}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Relevance</h3>
                <p className="text-gray-600">{selectedLaw.relevance}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Key Provisions</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedLaw.key_provisions.map((provision, index) => (
                    <li key={index}>{provision}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleStartQuiz(selectedLaw.lawTitle)}
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
              >
                Take Quiz on This Topic
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
export default withAuth(LawsPage);
