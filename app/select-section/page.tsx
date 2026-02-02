"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FE_SECTIONS } from "@/lib/types";

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy (30%)", description: "Fundamental concepts" },
  {
    value: "medium",
    label: "Medium (50%)",
    description: "Core competency level",
  },
  { value: "hard", label: "Hard (20%)", description: "Advanced application" },
];

const MODE_OPTIONS = [
  {
    value: "practice",
    label: "Practice Mode",
    description: "Immediate feedback per question",
  },
  {
    value: "exam",
    label: "Exam Mode",
    description: "Timed, full review after submission",
  },
];

export default function SectionSelector() {
  const router = useRouter();
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("medium");
  const [mode, setMode] = useState("practice");
  const [questionCount, setQuestionCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSectionToggle = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleStartQuiz = async () => {
    if (selectedSections.length === 0) {
      setError("Please select at least one section");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call API to generate quiz
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sections: selectedSections,
          difficulty,
          count: questionCount,
          mode,
          typeDistribution: { mcq: 0.8, numeric: 0.2 }, // 80% MCQ, 20% numeric
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate quiz");
      }

      const quiz = await response.json();

      // Store quiz in session/local storage
      sessionStorage.setItem("currentQuiz", JSON.stringify(quiz));

      // Navigate to quiz page
      router.push("/quiz");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate quiz"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Select Practice Sections
        </h2>

        {/* Sections Grid */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            FE Topics ({selectedSections.length} selected)
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {FE_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => handleSectionToggle(section)}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  selectedSections.includes(section)
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300 bg-white hover:border-indigo-400"
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSections.includes(section)}
                    onChange={() => handleSectionToggle(section)}
                    className="mr-3"
                  />
                  <span className="font-medium text-gray-900">{section}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Mode
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {MODE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setMode(option.value)}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  mode === option.value
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300 bg-white hover:border-indigo-400"
                }`}
              >
                <div className="font-medium text-gray-900">{option.label}</div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Difficulty Mix
          </label>
          <div className="grid md:grid-cols-3 gap-3">
            {DIFFICULTY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setDifficulty(option.value)}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  difficulty === option.value
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300 bg-white hover:border-indigo-400"
                }`}
              >
                <div className="font-medium text-gray-900">{option.label}</div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Question Count */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Number of Questions: {questionCount}
          </label>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-2">
            5 - 50 questions per session
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={handleStartQuiz}
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Generating Quiz..." : "Start Quiz"}
        </button>
      </div>
    </div>
  );
}
