"use client";

import { Question } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  answer: string | number | undefined;
  onAnswerChange: (answer: string | number) => void;
  mode: "practice" | "exam";
}

export default function QuestionCard({
  question,
  answer,
  onAnswerChange,
  mode,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      {/* Topic Tag */}
      <div className="flex gap-2 flex-wrap">
        {question.tags?.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            question.difficulty === "easy"
              ? "bg-green-100 text-green-800"
              : question.difficulty === "medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {question.difficulty.charAt(0).toUpperCase() +
            question.difficulty.slice(1)}{" "}
          Difficulty
        </span>
      </div>

      {/* Question Prompt */}
      <div>
        <p className="text-lg text-gray-900 whitespace-pre-wrap font-semibold">
          {question.prompt}
        </p>
      </div>

      {/* Answer Input */}
      {question.type === "mcq" ? (
        <div className="space-y-3">
          <p className="font-medium text-gray-700">Select your answer:</p>
          <div className="space-y-2">
            {question.choices?.map((choice, idx) => {
              const choiceLetters = ["A", "B", "C", "D"];
              const letter = choiceLetters[idx];
              
              // Clean choice - remove any leading letter prefix
              let text = choice.trim();
              text = text.replace(/^[A-D]\s*[\.\)]\s*/, "").trim();

              return (
                <div
                  key={idx}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition flex items-start gap-4 ${
                    answer === letter
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-300 bg-white hover:border-indigo-400"
                  }`}
                  onClick={() => onAnswerChange(letter)}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={letter}
                    checked={answer === letter}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    className="mt-1 flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <div className="flex items-baseline gap-2">
                      <span className="inline-block font-bold text-indigo-600 text-lg">
                        {letter}.
                      </span>
                      <span className="text-gray-900">{text}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Numeric input
        <div className="space-y-3">
          <p className="font-medium text-gray-700">
            Enter your numerical answer:
          </p>
          <input
            type="number"
            step="any"
            value={answer ?? ""}
            onChange={(e) => onAnswerChange(e.target.value ? Number(e.target.value) : "")}
            placeholder="Enter your answer"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
          />
          <p className="text-sm text-gray-500">
            {question.acceptedUnits &&
              `Accepted units: ${question.acceptedUnits.join(", ")}`}
          </p>
        </div>
      )}

      {/* Hint for Practice Mode */}
      {mode === "practice" && (
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-sm text-blue-900">
          <strong>Tip:</strong> In practice mode, you'll see detailed feedback
          after answering each question.
        </div>
      )}
    </div>
  );
}
