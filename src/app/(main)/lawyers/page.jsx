"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import api from "@/api/api";

export default function LawyersPage() {
  const [query, setQuery] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setMessage("");
    try {
      const response = await api.post("/pdf/findlawers", { query });

      const data = response.data;
      setLawyers(data.answer);

      if (data.answer && data.answer.length === 0) {
        setMessage(
          "✨ Try different keywords to find the perfect lawyer for your needs!"
        );
      } else if (data.answer && data.answer.length > 0) {
        setMessage(`🎯 Great news! We found  lawyers matching your criteria.`);
      }
    } catch (error) {
      console.error("Error searching lawyers:", error);
      setMessage(
        "⚠️ Oops! Something went wrong. Please try again in a moment."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-teal-700">
        Find Your Legal Expert
      </h1>

      <div className="max-w-xl mx-auto mb-8">
        <div className="flex gap-4">
          <Input
            placeholder="Enter keywords (e.g., divorce, criminal, civil)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 focus:ring-teal-500 focus:border-teal-500"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {message && (
        <div className="max-w-xl mx-auto mb-6 p-4 bg-teal-50 text-teal-700 rounded-md text-center font-medium shadow-sm">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers &&
          lawyers.map((lawyer, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow border-teal-100"
            >
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-teal-700">
                  {lawyer.name}
                </h2>

                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin size={16} />
                  <span>{lawyer.place}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Mail size={16} />
                  <a
                    href={`mailto:${lawyer.email}`}
                    className="hover:text-blue-600"
                  >
                    {lawyer.email}
                  </a>
                </div>

                {lawyer.contact_number &&
                  lawyer.contact_number !== "Not Available" && (
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Phone size={16} />
                      <a
                        href={`tel:${lawyer.contact_number}`}
                        className="hover:text-blue-600"
                      >
                        {lawyer.contact_number}
                      </a>
                    </div>
                  )}

                <div>
                  <h3 className="font-semibold mb-2">Expertise:</h3>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
