import { Question } from "./types";

// Mock question templates per FE section - no API calls needed
const questionPools: Record<string, Question[]> = {
  "Mathematics": [
    {
      id: "math-001",
      section: "Mathematics",
      difficulty: "easy",
      type: "mcq",
      prompt: "Solve for x: 2x + 5 = 13",
      choices: ["A) 2", "B) 4", "C) 6", "D) 8"],
      correctAnswer: "B",
      solutionOutline: "2x + 5 = 13 → 2x = 8 → x = 4",
      explanationCorrect: "Subtract 5 from both sides, then divide by 2",
      explanationCommonWrong: [
        "Forgetting to subtract 5 first",
        "Dividing 13 by 2 instead of solving step-by-step",
        "Sign error when subtracting"
      ],
      tags: ["linear-equations", "algebra"],
    },
    {
      id: "math-002",
      section: "Mathematics",
      difficulty: "medium",
      type: "mcq",
      prompt: "What is the derivative of f(x) = 3x² + 2x + 1?",
      choices: ["A) 6x + 1", "B) 6x + 2", "C) 3x + 2", "D) 9x + 2"],
      correctAnswer: "B",
      solutionOutline: "Apply power rule: d/dx(3x²) = 6x, d/dx(2x) = 2, d/dx(1) = 0",
      explanationCorrect: "Power rule: d/dx(x^n) = nx^(n-1)",
      explanationCommonWrong: [
        "Forgetting constant term disappears",
        "Miscounting coefficient in power rule",
        "Leaving constant coefficient in result"
      ],
      tags: ["calculus", "derivatives"],
    },
    {
      id: "math-003",
      section: "Mathematics",
      difficulty: "hard",
      type: "numeric",
      prompt: "A matrix A = [[2, 1], [1, 2]]. Calculate the determinant of A.",
      correctAnswer: 3,
      tolerance: 0.01,
      acceptedUnits: [],
      solutionOutline: "det(A) = (2)(2) - (1)(1) = 4 - 1 = 3",
      explanationCorrect: "For 2×2 matrix [[a,b],[c,d]], det = ad - bc",
      explanationCommonWrong: [
        "Confusing determinant formula with matrix multiplication",
        "Sign error in subtraction",
        "Incorrect element selection"
      ],
      tags: ["linear-algebra", "matrices"],
    },
  ],
  "Probability and Statistics": [
    {
      id: "stats-001",
      section: "Probability and Statistics",
      difficulty: "easy",
      type: "mcq",
      prompt: "If P(A) = 0.3 and P(B) = 0.4, and A and B are independent, what is P(A and B)?",
      choices: ["A) 0.12", "B) 0.7", "C) 0.7", "D) 0.12"],
      correctAnswer: "A",
      solutionOutline: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.3 × 0.4 = 0.12",
      explanationCorrect: "Independent events multiply their probabilities",
      explanationCommonWrong: [
        "Adding probabilities instead of multiplying",
        "Confusing with union (or) instead of intersection (and)",
        "Not recognizing independence condition"
      ],
      tags: ["probability", "independence"],
    },
  ],
  "Engineering Economics": [
    {
      id: "econ-001",
      section: "Engineering Economics",
      difficulty: "medium",
      type: "numeric",
      prompt: "Calculate the present worth of a $1000 payment due in 3 years at 5% annual interest rate.",
      correctAnswer: 863.84,
      tolerance: 0.05,
      acceptedUnits: ["$"],
      solutionOutline: "PW = FV / (1 + r)^n = 1000 / (1.05)^3 = 1000 / 1.1576 ≈ 863.84",
      explanationCorrect: "Use present worth formula for future amount",
      explanationCommonWrong: [
        "Multiplying instead of dividing by discount factor",
        "Using wrong interest rate formula",
        "Miscalculating compound interest"
      ],
      tags: ["economics", "present-worth"],
    },
  ],
  "Statics": [
    {
      id: "statics-001",
      section: "Statics",
      difficulty: "medium",
      type: "numeric",
      prompt: "A 100 N force acts at 30° above the horizontal. What is the vertical component?",
      correctAnswer: 50,
      tolerance: 0.05,
      acceptedUnits: ["N"],
      solutionOutline: "F_y = F × sin(θ) = 100 × sin(30°) = 100 × 0.5 = 50 N",
      explanationCorrect: "Use sin for vertical (y) component",
      explanationCommonWrong: [
        "Using cos instead of sin",
        "Confusing angle reference (measured from horizontal vs vertical)",
        "Using wrong angle in calculation"
      ],
      tags: ["force-resolution", "components"],
    },
  ],
  "Dynamics": [
    {
      id: "dynamics-001",
      section: "Dynamics",
      difficulty: "easy",
      type: "mcq",
      prompt: "An object with mass 5 kg experiences a net force of 20 N. What is its acceleration?",
      choices: ["A) 2 m/s²", "B) 4 m/s²", "C) 100 m/s²", "D) 0.25 m/s²"],
      correctAnswer: "B",
      solutionOutline: "F = ma → a = F/m = 20 N / 5 kg = 4 m/s²",
      explanationCorrect: "Newton's second law: F = ma",
      explanationCommonWrong: [
        "Multiplying force and mass instead of dividing",
        "Unit confusion (kg vs N)",
        "Wrong formula order"
      ],
      tags: ["newtons-laws", "kinematics"],
    },
  ],
  "Strength of Materials": [
    {
      id: "som-001",
      section: "Strength of Materials",
      difficulty: "medium",
      type: "numeric",
      prompt: "A steel rod with cross-sectional area 50 mm² experiences a tensile stress of 200 MPa. Calculate the tensile force.",
      correctAnswer: 10000,
      tolerance: 0.05,
      acceptedUnits: ["N"],
      solutionOutline: "Stress = Force / Area → F = σ × A = 200 MPa × 50 mm² = 10,000 N",
      explanationCorrect: "Stress is force per unit area",
      explanationCommonWrong: [
        "Dividing stress by area instead of multiplying",
        "Unit conversion errors (MPa to Pa)",
        "Using wrong area formula"
      ],
      tags: ["stress", "tensile-force"],
    },
  ],
  "Fluid Mechanics": [
    {
      id: "fluid-001",
      section: "Fluid Mechanics",
      difficulty: "medium",
      type: "numeric",
      prompt: "Water flows through a pipe at velocity 2 m/s. If the pipe diameter is 100 mm, calculate the volumetric flow rate.",
      correctAnswer: 0.0157,
      tolerance: 0.05,
      acceptedUnits: ["m³/s"],
      solutionOutline: "Q = V × A = 2 m/s × π(0.05)² = 2 × 0.00785 ≈ 0.0157 m³/s",
      explanationCorrect: "Volumetric flow rate is velocity times cross-sectional area",
      explanationCommonWrong: [
        "Using diameter instead of radius in area calculation",
        "Forgetting π in circular area formula",
        "Unit conversion errors"
      ],
      tags: ["flow-rate", "continuity"],
    },
  ],
  "Thermodynamics and Heat Transfer": [
    {
      id: "thermo-001",
      section: "Thermodynamics and Heat Transfer",
      difficulty: "medium",
      type: "numeric",
      prompt: "Calculate heat transfer Q for 5 kg of water heated from 20°C to 80°C. (c = 4.18 kJ/kg·K)",
      correctAnswer: 1254,
      tolerance: 0.05,
      acceptedUnits: ["kJ"],
      solutionOutline: "Q = m × c × ΔT = 5 × 4.18 × (80-20) = 5 × 4.18 × 60 = 1,254 kJ",
      explanationCorrect: "Heat transfer: Q = mcΔT",
      explanationCommonWrong: [
        "Using temperature difference as Celsius instead of Kelvin",
        "Wrong specific heat value",
        "Forgetting to multiply by mass"
      ],
      tags: ["heat-transfer", "specific-heat"],
    },
  ],
  "Basic Electrical Engineering": [
    {
      id: "elec-001",
      section: "Basic Electrical Engineering",
      difficulty: "easy",
      type: "mcq",
      prompt: "A 12V battery supplies current to a 4Ω resistor. What is the current?",
      choices: ["A) 2 A", "B) 3 A", "C) 4 A", "D) 6 A"],
      correctAnswer: "B",
      solutionOutline: "V = IR → I = V/R = 12V / 4Ω = 3 A",
      explanationCorrect: "Ohm's Law: V = IR",
      explanationCommonWrong: [
        "Multiplying voltage and resistance instead of dividing",
        "Wrong formula arrangement",
        "Unit confusion"
      ],
      tags: ["ohms-law", "dc-circuits"],
    },
  ],
  "Chemistry": [
    {
      id: "chem-001",
      section: "Chemistry",
      difficulty: "easy",
      type: "mcq",
      prompt: "How many moles are in 18 grams of water (H₂O)? (Molar mass = 18 g/mol)",
      choices: ["A) 0.5 mol", "B) 1 mol", "C) 2 mol", "D) 18 mol"],
      correctAnswer: "B",
      solutionOutline: "n = mass / molar mass = 18 g / 18 g/mol = 1 mol",
      explanationCorrect: "Use molar mass to convert grams to moles",
      explanationCommonWrong: [
        "Confusing grams with moles directly",
        "Using wrong molar mass",
        "Dividing incorrectly"
      ],
      tags: ["stoichiometry", "molar-mass"],
    },
  ],
};

/**
 * Generate deterministic mock questions (no API calls)
 * Useful for free testing and demo purposes
 */
export function generateMockQuestions(
  sections: string[],
  count: number,
  difficulty?: "easy" | "medium" | "hard" | "mixed"
): Question[] {
  const questions: Question[] = [];
  
  // Gather all questions from selected sections
  const availableQuestions = sections
    .flatMap((section) => questionPools[section] || [])
    .filter((q) => {
      if (!difficulty || difficulty === "mixed") return true;
      return q.difficulty === difficulty;
    });

  // Cycle through available questions to fill count
  for (let i = 0; i < count; i++) {
    const idx = i % Math.max(availableQuestions.length, 1);
    const baseQuestion = availableQuestions[idx];
    
    // Randomize numeric questions with slight variations
    let question = { ...baseQuestion };
    if (question.type === "numeric") {
      const variation = 0.95 + Math.random() * 0.1; // ±5% variation
      question.correctAnswer = typeof question.correctAnswer === "number" 
        ? question.correctAnswer * variation 
        : question.correctAnswer;
    }
    
    questions.push(question);
  }

  return questions.slice(0, count);
}

/**
 * Get all available sections for mock generator
 */
export function getMockSections(): string[] {
  return Object.keys(questionPools);
}

/**
 * Get question count by section
 */
export function getMockQuestionCount(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [section, questions] of Object.entries(questionPools)) {
    counts[section] = questions.length;
  }
  return counts;
}
