import { NextRequest, NextResponse } from "next/server";
import { Quiz } from "@/lib/types";
import { generateMockQuestions } from "@/lib/mock-generator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sections, difficulty, count, typeDistribution, mode } = body;

    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid sections" },
        { status: 400 }
      );
    }

    // Use free mock generator (no API calls needed)
    const mockQuestions = generateMockQuestions(
      sections,
      count,
      difficulty || "mixed"
    );

    if (mockQuestions.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate questions for selected sections" },
        { status: 500 }
      );
    }

    // Build quiz object
    const quiz: Quiz = {
      id: `quiz-${Date.now()}`,
      sections,
      mode: mode || "practice",
      questions: mockQuestions,
      timeLimit: mode === "exam" ? 360 : undefined, // 6 hours for exam
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate quiz",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
