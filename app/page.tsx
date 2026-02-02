"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to FE Exam Practice
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Prepare for the NCEES Fundamentals of Engineering exam with
          AI-generated practice questions.
        </p>
        <Link
          href="/select-section"
          className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition"
        >
          Start Practice Session
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            📚 Diverse Topics
          </h3>
          <p className="text-gray-600">
            Practice across all FE Other Disciplines exam sections.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            🤖 AI-Generated
          </h3>
          <p className="text-gray-600">
            Novel, FE-style questions generated on-demand.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            ✅ Detailed Feedback
          </h3>
          <p className="text-gray-600">
            Per-question explanations and section-by-section scoring.
          </p>
        </div>
      </div>
    </div>
  );
}
