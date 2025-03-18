"use client";
import React, { useState, useEffect } from "react";
import { Brain, BookOpen } from "lucide-react";
import withAuth from "@/app/utils/isAuth";
import api from "@/api/api";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const QuizPage = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [questionIds, setQuestionIds] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [answerResult, setAnswerResult] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirectQuiz, setIsDirectQuiz] = useState(false);
  const legalTopics = [
    "Constitutional Law",
    "Criminal Law",
    "Civil Law",
    "Corporate Law",
    "Family Law",
    "Human Rights",
    "Environmental Law",
    "Intellectual Property Law",
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topicFromUrl = params.get("topic");
    if (topicFromUrl) {
      setSelectedTopic(topicFromUrl);
      setIsDirectQuiz(true);
      handleStartQuizFromUrl(topicFromUrl);
    }
  }, []);

  const handleStartQuizFromUrl = async (topic) => {
    setIsLoading(true);
    try {
      const response = await api.post("/quiz/create-quiz", {
        topic: topic,
      });
      setQuizId(response.data.quizId);
      setQuestionIds(response.data.questionIds);
      await fetchQuestion(response.data.questionIds[0]);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error starting quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = async () => {
    if (!selectedTopic) {
      alert("Please select a topic first");
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post("/quiz/create-quiz", {
        topic: selectedTopic,
      });
      setQuizId(response.data.quizId);
      setQuestionIds(response.data.questionIds);
      await fetchQuestion(response.data.questionIds[0]);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error starting quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuestion = async (questionId) => {
    try {
      const response = await api.get(`/quiz/getone/${questionId}`);
      setCurrentQuestion(response.data.question);
      setAnswerSubmitted(false);
      setSelectedAnswer(null);
      setAnswerResult(null);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleAnswerSubmit = async () => {
    if (selectedAnswer === null) return;
    try {
      const response = await api.post("/quiz/submit-answer", {
        questionId: currentQuestion.id,
        answer: selectedAnswer,
        quizId: quizId,
      });
      setAnswerResult(response.data);
      setAnswerSubmitted(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleNextQuestion = async () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questionIds.length) {
      setCurrentQuestionIndex(nextIndex);
      await fetchQuestion(questionIds[nextIndex]);
    } else {
      // Quiz completed
      try {
        const response = await api.post("/quiz/quiz_result", {
          quizId: quizId,
        });
        setQuizScore(response.data.score);
        setQuizCompleted(true);
      } catch (error) {
        console.error("Error fetching quiz result:", error);
      }
    }
  };

  if (quizCompleted) {
    const data = [
      { name: "Correct", value: quizScore },
      { name: "Incorrect", value: 5 - quizScore },
    ];
    const COLORS = ["#14B8A6", "#EF4444"];

    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <div className="w-64 h-64 mx-auto mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-lg">Your Score: {quizScore}/5</p>
        <button
          onClick={() => {
            window.history.pushState({}, "", window.location.pathname);
            window.location.reload();
          }}
          className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Take Another Quiz
        </button>
      </div>
    );
  }

  if (quizStarted && currentQuestion) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            Question {currentQuestionIndex + 1}/5
          </h2>
          <p className="text-lg mb-4">{currentQuestion.questionText}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !answerSubmitted && setSelectedAnswer(index)}
                className={`w-full p-3 text-left rounded-md border ${
                  answerSubmitted
                    ? index === answerResult.correctIndex
                      ? "border-green-600 bg-green-50 text-green-700"
                      : index === selectedAnswer
                      ? "border-red-600 bg-red-50 text-red-700"
                      : "border-gray-300"
                    : selectedAnswer === index
                    ? "border-teal-600 bg-teal-50"
                    : "border-gray-300"
                } ${
                  answerSubmitted
                    ? "cursor-not-allowed"
                    : "hover:border-teal-600"
                }`}
                disabled={answerSubmitted}
              >
                {option}
              </button>
            ))}
          </div>

          {!answerSubmitted ? (
            <button
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              className={`mt-6 w-full py-3 px-4 rounded-md text-white font-medium cursor-pointer ${
                selectedAnswer !== null
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <div className="mt-6">
              <div
                className={`p-4 rounded-md mb-4 ${
                  answerResult.isCorrect ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <p className="font-bold">
                  {answerResult.isCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p className="mt-2">{answerResult.explanation}</p>
                {!answerResult.isCorrect && (
                  <p className="mt-2 font-medium">
                    Correct answer:{" "}
                    {currentQuestion.options[answerResult.correctIndex]}
                  </p>
                )}
              </div>
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 px-4 rounded-md text-white font-medium cursor-pointer bg-teal-600 hover:bg-teal-700"
              >
                {currentQuestionIndex === 4 ? "Finish Quiz" : "Next Question"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-100 border-t-teal-600"></div>
        <p className="mt-4 text-teal-600 text-lg font-medium">
          Preparing your quiz...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="h-12 w-12 text-teal-600" />
          <BookOpen className="h-12 w-12 text-teal-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Learn Indian Law Through Interactive Quizzes
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enhance your understanding of Indian law through engaging quizzes. Learn key concepts and principles while practicing with real-world scenarios!
        </p>
      </div>

      {!isDirectQuiz && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <label
              htmlFor="topic"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Topic
            </label>
            <select
              id="topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Choose a legal topic</option>
              {legalTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStartQuiz}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-300 ${
              selectedTopic
                ? "bg-teal-600 hover:bg-teal-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Start Quiz
          </button>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Each quiz contains 5 questions to test your knowledge</p>
          </div>
        </div>
      )}
    </div>
  );
};

const WrappedQuizPage = withAuth(QuizPage);
export default WrappedQuizPage;
