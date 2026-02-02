import { NextRequest, NextResponse } from "next/server";
import { Quiz } from "@/lib/types";
import { generateMockQuestions } from "@/lib/mock-generator";
import { z } from "zod";

export async function POST(request: NextRequest) {
✓ Be solvable in 2–4 minutes maximum
✓ Use ONLY formulas, principles, or definitions from the FE Reference Handbook v10.5
✓ Test understanding, not memorization or advanced derivation
✓ Avoid unnecessary complexity or multi-step derivations
✓ Respect FE formatting and tone (concise, direct, technical)
✓ Have EXACTLY ONE correct answer (MCQ) with exactly 4 choices (A–D)
✓ Be solvable with reference handbook only (no external knowledge required)
✓ Have unique topic/scenario (not repeating other questions in the set)
✓ Include plausible distractors that are NOT obviously wrong
✓ Base distractors on specific, common engineering mistakes
✓ Follow the "one-concept" rule: test ONE primary concept per question

QUESTION REJECTION CRITERIA:
- If a question requires formulas NOT in the FE Reference Handbook v10.5 → DO NOT GENERATE
- If a question would take >4 minutes to solve → DO NOT GENERATE
- If distractors are obviously wrong by inspection → REVISE
- If the question would frustrate a competent engineer due to ambiguity or excessive setup → DO NOT GENERATE

Return ONLY the JSON object. No extra text, no markdown, no explanation.`;

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
