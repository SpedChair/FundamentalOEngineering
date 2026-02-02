/**
 * FE Reference Handbook v10.5 Validator
 * 
 * This module validates that generated questions use ONLY formulas
 * and concepts from the official NCEES FE Reference Handbook.
 */

import { Question } from "./types";

/**
 * Handbook sections and their common formulas/concepts
 * Based on official NCEES FE Other Disciplines CBT specifications (Effective July 2020)
 * 14 knowledge areas, 110 questions, 6 hours
 */
export const HANDBOOK_SECTIONS = {
  "Mathematics": {
    subsections: [
      "Analytic geometry and trigonometry",
      "Differential equations",
      "Numerical methods",
      "Linear algebra",
      "Single-variable calculus"
    ],
    keywords: [
      "derivative",
      "integral",
      "matrix",
      "vector",
      "differential equation",
      "numerical methods",
      "roots of equations",
      "trigonometry",
      "calculus",
      "convergence",
    ],
    commonFormulas: [
      "d/dx(x^n) = nx^(n-1)",
      "∫x^n dx = x^(n+1)/(n+1)",
      "sin²θ + cos²θ = 1",
      "det(A)",
      "A^(-1)",
      "Newton-Raphson method",
    ],
    questionCount: "8–12",
  },
  "Probability and Statistics": {
    subsections: [
      "Estimation (point, confidence intervals)",
      "Expected value and expected error in decision making",
      "Sample distributions and sizes",
      "Goodness of fit"
    ],
    keywords: [
      "mean",
      "variance",
      "standard deviation",
      "probability",
      "confidence interval",
      "hypothesis testing",
      "correlation",
      "R-squared",
      "expected value",
    ],
    commonFormulas: [
      "μ = Σx/n",
      "σ² = Σ(x-μ)²/n",
      "z = (x-μ)/σ",
      "R²",
      "confidence interval",
    ],
    questionCount: "5–8",
  },
  "Chemistry": {
    subsections: [
      "Oxidation and reduction",
      "Acids and bases",
      "Chemical reactions"
    ],
    keywords: [
      "oxidation",
      "reduction",
      "corrosion",
      "pH",
      "buffer",
      "stoichiometry",
      "equilibrium",
      "bioconversion",
      "acid",
      "base",
    ],
    commonFormulas: [
      "pH = -log[H+]",
      "K_eq = [products]/[reactants]",
      "stoichiometric ratios",
      "n = m/M",
    ],
    questionCount: "4–6",
  },
  "Instrumentation and Controls": {
    subsections: [
      "Sensors",
      "Data acquisition",
      "Logic diagrams"
    ],
    keywords: [
      "sensor",
      "temperature",
      "pressure",
      "pH",
      "data acquisition",
      "sampling rate",
      "A/D conversion",
      "D/A conversion",
      "signal processing",
      "logic diagram",
      "filtering",
      "amplification",
    ],
    commonFormulas: [
      "sampling theorem",
      "signal-to-noise ratio",
      "amplification gain",
    ],
    questionCount: "5–8",
  },
  "Engineering Ethics and Societal Impacts": {
    subsections: [
      "Codes of ethics",
      "Public protection issues",
      "Societal impacts"
    ],
    keywords: [
      "ethics",
      "professional responsibility",
      "public protection",
      "licensing",
      "sustainability",
      "life-cycle analysis",
      "environmental impact",
      "public safety",
      "economic impact",
    ],
    commonFormulas: [],
    questionCount: "6–9",
  },
  "Safety, Health, and Environment": {
    subsections: [
      "Industrial hygiene",
      "Basic safety equipment",
      "Gas detection and monitoring",
      "Electrical safety",
      "Confined space entry and ventilation rates",
      "Hazard communications"
    ],
    keywords: [
      "safety",
      "toxicology",
      "exposure limits",
      "radiation",
      "biohazard",
      "PPE",
      "pressure relief valve",
      "fire prevention",
      "gas detection",
      "confined space",
      "ventilation",
      "SDS",
      "OSHA",
    ],
    commonFormulas: [
      "ventilation rate calculations",
      "exposure limits",
      "half-life",
    ],
    questionCount: "6–9",
  },
  "Engineering Economics": {
    subsections: [
      "Time value of money",
      "Cost analysis",
      "Economic analyses",
      "Uncertainty",
      "Project selection"
    ],
    keywords: [
      "present worth",
      "future worth",
      "annual worth",
      "rate of return",
      "depreciation",
      "break-even",
      "benefit-cost",
      "NPV",
      "IRR",
      "cash flow",
    ],
    commonFormulas: [
      "F = P(1+i)^n",
      "P = F/(1+i)^n",
      "A = P(A/P,i,n)",
      "NPV",
      "IRR",
    ],
    questionCount: "9–14",
  },
  "Statics": {
    subsections: [
      "Vector analysis",
      "Force systems",
      "Force couple systems",
      "Equilibrium of rigid bodies",
      "Internal forces in rigid bodies",
      "Area properties",
      "Static friction",
      "Free-body diagrams",
      "Weight and mass computations"
    ],
    keywords: [
      "equilibrium",
      "moment",
      "force",
      "resultant",
      "couple",
      "truss",
      "frame",
      "centroid",
      "moment of inertia",
      "friction",
      "free body diagram",
    ],
    commonFormulas: [
      "ΣF = 0",
      "ΣM = 0",
      "F_f = μN",
      "M = r × F",
      "I = ∫r²dA",
      "parallel axis theorem",
    ],
    questionCount: "9–14",
  },
  "Dynamics": {
    subsections: [
      "Particle and rigid-body kinematics",
      "Linear motion",
      "Angular motion",
      "Mass moment of inertia",
      "Impulse and momentum",
      "Work, energy, and power",
      "Dynamic friction",
      "Vibrations"
    ],
    keywords: [
      "kinematics",
      "velocity",
      "acceleration",
      "force",
      "mass",
      "torque",
      "inertia",
      "momentum",
      "impulse",
      "work",
      "energy",
      "power",
      "vibration",
      "natural frequency",
    ],
    commonFormulas: [
      "v = u + at",
      "s = ut + ½at²",
      "F = ma",
      "τ = Iα",
      "KE = ½mv²",
      "PE = mgh",
      "W = F·d",
      "P = F·v",
      "ω_n = √(k/m)",
    ],
    questionCount: "9–14",
  },
  "Strength of Materials": {
    subsections: [
      "Stress types",
      "Combined loading",
      "Stress and strain",
      "Shear and moment diagrams",
      "Analysis of beams, trusses, frames, and columns",
      "Loads and deformations",
      "Stress transformation and principal stresses",
      "Material failure"
    ],
    keywords: [
      "stress",
      "strain",
      "normal stress",
      "shear stress",
      "bending",
      "torsion",
      "axial load",
      "shear diagram",
      "moment diagram",
      "deflection",
      "superposition",
      "Mohr's circle",
      "principal stress",
      "von Mises",
      "Tresca",
      "buckling",
      "fatigue",
      "creep",
      "factor of safety",
    ],
    commonFormulas: [
      "σ = F/A",
      "ε = ΔL/L",
      "E = σ/ε",
      "τ = V/A",
      "σ = My/I",
      "τ = Tr/J",
      "δ = PL/AE",
      "P_cr = π²EI/(KL)²",
      "Mohr's circle equations",
    ],
    questionCount: "9–14",
  },
  "Materials": {
    subsections: [
      "Physical properties of materials",
      "Mechanical properties of materials",
      "Chemical properties of materials",
      "Thermal properties of materials",
      "Electrical properties of materials",
      "Material selection"
    ],
    keywords: [
      "phase diagram",
      "alloy",
      "yield strength",
      "ultimate strength",
      "ductility",
      "hardness",
      "toughness",
      "modulus",
      "thermal expansion",
      "conductivity",
      "resistivity",
      "material properties",
    ],
    commonFormulas: [
      "E = σ/ε",
      "ν = -ε_lateral/ε_axial",
      "G = E/(2(1+ν))",
      "α (thermal expansion)",
      "k (thermal conductivity)",
    ],
    questionCount: "6–9",
  },
  "Fluid Mechanics": {
    subsections: [
      "Fluid properties",
      "Dimensionless numbers",
      "Laminar and turbulent flow",
      "Fluid statics",
      "Energy, impulse, and momentum equations",
      "Pipe and duct flow and friction losses",
      "Open-channel flow",
      "Fluid transport systems",
      "Flow measurement",
      "Turbomachinery",
      "Ideal gas law",
      "Real gas law"
    ],
    keywords: [
      "density",
      "viscosity",
      "pressure",
      "Reynolds number",
      "Froude number",
      "Mach number",
      "laminar",
      "turbulent",
      "Bernoulli",
      "continuity",
      "head loss",
      "Manning",
      "pump",
      "turbine",
      "compressor",
    ],
    commonFormulas: [
      "ρ = m/V",
      "Re = ρvD/μ",
      "Fr = v/√(gL)",
      "Ma = v/c",
      "P = ρgh",
      "P + ½ρv² + ρgh = constant",
      "A₁v₁ = A₂v₂",
      "h_L = f(L/D)(v²/2g)",
      "Q = (1/n)AR^(2/3)S^(1/2)",
      "PV = nRT",
    ],
    questionCount: "9–14",
  },
  "Basic Electrical Engineering": {
    subsections: [
      "Electrical fundamentals",
      "Current and voltage laws",
      "AC and DC circuits",
      "Measuring devices",
      "Three-phase power"
    ],
    keywords: [
      "voltage",
      "current",
      "resistance",
      "power",
      "energy",
      "Kirchhoff",
      "Ohm's law",
      "AC",
      "DC",
      "impedance",
      "reactance",
      "capacitance",
      "inductance",
      "RLC",
      "power factor",
      "three-phase",
    ],
    commonFormulas: [
      "V = IR",
      "P = VI = I²R = V²/R",
      "Q = CV",
      "V_L = L(di/dt)",
      "Z = R + jX",
      "S = P + jQ",
      "PF = cos φ",
      "P_3φ = √3 V_L I_L cos φ",
    ],
    questionCount: "6–9",
  },
  "Thermodynamics and Heat Transfer": {
    subsections: [
      "Thermodynamic laws",
      "Thermodynamic equilibrium",
      "Thermodynamic properties",
      "Thermodynamic processes",
      "Heat transfer",
      "Mass and energy balances",
      "Property and phase diagrams",
      "Combustion and combustion products",
      "Psychrometrics"
    ],
    keywords: [
      "first law",
      "second law",
      "entropy",
      "enthalpy",
      "heat capacity",
      "isothermal",
      "adiabatic",
      "reversible",
      "irreversible",
      "conduction",
      "convection",
      "radiation",
      "energy balance",
      "T-s diagram",
      "P-h diagram",
      "combustion",
      "humidity",
      "psychrometric",
    ],
    commonFormulas: [
      "ΔU = Q - W",
      "PV = nRT",
      "η = W/Q_in",
      "Δh = c_p ΔT",
      "Δs = Q/T",
      "q = -kA(dT/dx)",
      "q = hAΔT",
      "q = εσAT⁴",
      "ṁ_in = ṁ_out",
      "Ė_in = Ė_out",
    ],
    questionCount: "12–18",
  },
} as const;

/**
 * Validation levels for handbook compliance
 */
export enum ValidationLevel {
  STRICT = "strict", // Must match handbook exactly
  MODERATE = "moderate", // Must use handbook concepts
  RELAXED = "relaxed", // General engineering principles
}

/**
 * Validation result for a question
 */
export interface ValidationResult {
  isValid: boolean;
  level: ValidationLevel;
  warnings: string[];
  errors: string[];
  handbookReferences: string[];
  suggestions: string[];
}

/**
 * Validate a question against the FE Handbook
 */
export function validateQuestion(
  question: Question,
  level: ValidationLevel = ValidationLevel.MODERATE
): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    level,
    warnings: [],
    errors: [],
    handbookReferences: [],
    suggestions: [],
  };

  // Check if section is valid
  const sectionData = HANDBOOK_SECTIONS[question.section as keyof typeof HANDBOOK_SECTIONS];
  if (!sectionData) {
    result.errors.push(`Section "${question.section}" not found in handbook`);
    result.isValid = false;
    return result;
  }

  // Check for handbook keywords in prompt
  const promptLower = question.prompt.toLowerCase();
  const foundKeywords = sectionData.keywords.filter((keyword) =>
    promptLower.includes(keyword.toLowerCase())
  );

  if (foundKeywords.length === 0) {
    result.warnings.push(
      `No handbook keywords found in prompt. Expected keywords: ${sectionData.keywords.slice(0, 5).join(", ")}`
    );
  } else {
    result.handbookReferences.push(
      `Keywords: ${foundKeywords.join(", ")}`
    );
  }

  // Check solution outline for formula references
  const solutionLower = question.solutionOutline.toLowerCase();
  const hasFormulaReference =
    solutionLower.includes("equation") ||
    solutionLower.includes("formula") ||
    solutionLower.includes("handbook") ||
    /[=+\-*/^()]/g.test(question.solutionOutline);

  if (!hasFormulaReference) {
    result.warnings.push(
      "Solution outline should reference handbook formulas or equations"
    );
  }

  // Check tags for section alignment
  const hasRelevantTags = question.tags.some((tag) =>
    sectionData.keywords.some((keyword) =>
      tag.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  if (!hasRelevantTags) {
    result.suggestions.push(
      `Add tags related to: ${sectionData.keywords.slice(0, 3).join(", ")}`
    );
  }

  // Validate solve time (should be 2-4 minutes)
  // Estimate based on prompt length and complexity
  const estimatedTime = estimateSolveTime(question);
  if (estimatedTime > 240) {
    result.errors.push(
      `Estimated solve time (${Math.round(estimatedTime / 60)} min) exceeds 4-minute limit`
    );
    result.isValid = false;
  } else if (estimatedTime < 60) {
    result.warnings.push(
      `Question may be too simple (estimated ${Math.round(estimatedTime)} seconds)`
    );
  }

  // Check distractor quality (for MCQ)
  if (question.type === "mcq" && question.choices) {
    if (question.choices.length !== 4) {
      result.errors.push(
        `MCQ must have exactly 4 choices, found ${question.choices.length}`
      );
      result.isValid = false;
    }

    if (!question.explanationCommonWrong || question.explanationCommonWrong.length < 3) {
      result.warnings.push(
        "MCQ should explain why each wrong answer is a common mistake"
      );
    }
  }

  // Check numeric question tolerance
  if (question.type === "numeric") {
    if (!question.tolerance) {
      result.warnings.push("Numeric question should specify tolerance (typically ±5%)");
    }
    if (!question.acceptedUnits || question.acceptedUnits.length === 0) {
      result.warnings.push("Numeric question should specify accepted units");
    }
  }

  return result;
}

/**
 * Estimate solve time for a question (in seconds)
 * Based on prompt length, complexity indicators, and question type
 */
function estimateSolveTime(question: Question): number {
  let baseTime = 120; // 2 minutes baseline

  // Adjust for prompt length
  const wordCount = question.prompt.split(/\s+/).length;
  if (wordCount > 100) baseTime += 60; // Long prompt
  if (wordCount > 150) baseTime += 60; // Very long prompt

  // Adjust for difficulty
  if (question.difficulty === "medium") baseTime += 30;
  if (question.difficulty === "hard") baseTime += 60;

  // Adjust for question type
  if (question.type === "numeric") baseTime += 30; // Calculations take longer

  // Check for complexity indicators
  const complexityIndicators = [
    "derive",
    "prove",
    "multiple",
    "complex",
    "advanced",
    "iterative",
  ];
  const hasComplexity = complexityIndicators.some((indicator) =>
    question.prompt.toLowerCase().includes(indicator)
  );
  if (hasComplexity) baseTime += 60;

  return baseTime;
}

/**
 * Get handbook reference hints for a section
 */
export function getHandbookHints(section: string): string[] {
  const sectionData = HANDBOOK_SECTIONS[section as keyof typeof HANDBOOK_SECTIONS];
  if (!sectionData) return [];

  return [
    `Section: ${section}`,
    `Subsections: ${sectionData.subsections.join(", ")}`,
    `Search keywords: ${sectionData.keywords.slice(0, 5).join(", ")}`,
  ];
}

/**
 * Check if a formula appears in the handbook
 * (Simplified - full implementation would parse PDF)
 */
export function isFormulaInHandbook(formula: string, section: string): boolean {
  const sectionData = HANDBOOK_SECTIONS[section as keyof typeof HANDBOOK_SECTIONS];
  if (!sectionData) return false;

  // Normalize formula (remove spaces, case-insensitive)
  const normalizedFormula = formula.replace(/\s/g, "").toLowerCase();

  return sectionData.commonFormulas.some((handbookFormula) => {
    const normalizedHandbook = handbookFormula.replace(/\s/g, "").toLowerCase();
    return (
      normalizedFormula.includes(normalizedHandbook) ||
      normalizedHandbook.includes(normalizedFormula)
    );
  });
}

/**
 * Suggest handbook sections for a topic
 */
export function suggestHandbookSection(topic: string): string[] {
  const topicLower = topic.toLowerCase();
  const matches: string[] = [];

  Object.entries(HANDBOOK_SECTIONS).forEach(([section, data]) => {
    const hasMatch = data.keywords.some((keyword) =>
      topicLower.includes(keyword.toLowerCase())
    );
    if (hasMatch) matches.push(section);
  });

  return matches;
}
