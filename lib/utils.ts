import { QuestionSchema } from "./types";

export function validateQuestionJSON(data: unknown) {
  try {
    return QuestionSchema.parse(data);
  } catch (error) {
    console.error("Invalid question schema:", error);
    throw new Error("Generated question failed validation");
  }
}

export function sanitizePrompt(text: string): string {
  // Remove potentially harmful content, keep math
  return text.replace(/<script|<iframe|javascript:/gi, "");
}

export function calculateScore(
  correct: number,
  total: number
): number {
  return Math.round((correct / total) * 100);
}

export function calculateSectionScores(
  answers: Array<{ section: string; isCorrect: boolean }>,
  sections: string[]
): Record<string, number> {
  const sectionAnswers: Record<string, { correct: number; total: number }> =
    {};

  sections.forEach((section) => {
    sectionAnswers[section] = { correct: 0, total: 0 };
  });

  answers.forEach(({ section, isCorrect }) => {
    if (sectionAnswers[section]) {
      sectionAnswers[section].total++;
      if (isCorrect) sectionAnswers[section].correct++;
    }
  });

  const scores: Record<string, number> = {};
  Object.entries(sectionAnswers).forEach(([section, { correct, total }]) => {
    scores[section] = total > 0 ? Math.round((correct / total) * 100) : 0;
  });

  return scores;
}

export function checkNumericAnswer(
  userAnswer: number,
  correctAnswer: number,
  tolerance: number = 0.05
): boolean {
  const percentageTolerance = Math.abs(
    (userAnswer - correctAnswer) / correctAnswer
  );
  return percentageTolerance <= tolerance;
}
