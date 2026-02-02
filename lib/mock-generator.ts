import { Question } from "./types";

const DEFAULT_POOL_SIZE = 400;

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
      id: "math-004",
      section: "Mathematics",
      difficulty: "easy",
      type: "mcq",

      prompt: "Evaluate the integral: ∫ 4x dx",
      choices: ["A) 2x² + C", "B) 4x² + C", "C) 2x + C", "D) x² + C"],
      correctAnswer: "A",
      solutionOutline: "∫ 4x dx = 4 * (x²/2) + C = 2x² + C",
      explanationCorrect: "Apply the power rule for integration",
      explanationCommonWrong: [
        "Forgetting to divide by the new exponent",
        "Treating the integral like a derivative",
        "Dropping the constant of integration"
      ],
      tags: ["calculus", "integration"],
    },
    {
      id: "math-005",
      section: "Mathematics",
      difficulty: "easy",
      type: "mcq",
      prompt: "Solve for x: 5x − 15 = 0",
      choices: ["A) 0", "B) 3", "C) 5", "D) -3"],
      correctAnswer: "B",
      solutionOutline: "5x − 15 = 0 → 5x = 15 → x = 3",
      explanationCorrect: "Isolate x by adding 15, then divide by 5",
      explanationCommonWrong: [
        "Sign error when moving terms",
        "Dividing by the wrong coefficient",
        "Arithmetic mistake"
      ],
      tags: ["linear-equations", "algebra"],
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
      choices: ["A) 0.12", "B) 0.7", "C) 0.4", "D) 0.3"],
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
    {
      id: "stats-002",
      section: "Probability and Statistics",
      difficulty: "easy",
      type: "mcq",
      prompt: "A fair die is rolled once. What is the probability of rolling a number greater than 4?",
      choices: ["A) 1/6", "B) 1/3", "C) 1/2", "D) 2/3"],
      correctAnswer: "B",
      solutionOutline: "Outcomes >4 are {5,6} → 2 out of 6 = 1/3",
      explanationCorrect: "Count favorable outcomes over total outcomes",
      explanationCommonWrong: [
        "Counting only one favorable outcome",
        "Using 4 as a favorable outcome",
        "Inverting the fraction"
      ],
      tags: ["probability", "discrete"],
    },
    {
      id: "stats-003",
      section: "Probability and Statistics",
      difficulty: "medium",
      type: "mcq",
      prompt: "For a normal distribution, approximately what percentage of data lies within one standard deviation of the mean?",
      choices: ["A) 50%", "B) 68%", "C) 95%", "D) 99.7%"],
      correctAnswer: "B",
      solutionOutline: "Empirical rule: 68-95-99.7",
      explanationCorrect: "Within 1σ is about 68%",
      explanationCommonWrong: [
        "Confusing 1σ with 2σ",
        "Using the median rule instead of empirical rule",
        "Mixing up percentages"
      ],
      tags: ["statistics", "normal-distribution"],
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
        const pool = buildSectionPool(
          section,
          DEFAULT_POOL_SIZE,
          difficulty || "mixed"
        );

        if (pool.length === 0) return;

        const shuffledPool = shuffleArray(pool);
        const selected = shuffledPool.slice(0, targetCount);
        questions.push(...selected);
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
    {
      id: "chem-002",
      section: "Chemistry",
      difficulty: "medium",
      type: "mcq",
      prompt: "What is the pH of a solution with hydrogen ion concentration [H⁺] = 1×10⁻⁴ M?",
      choices: ["A) 2", "B) 3", "C) 4", "D) 10"],
      correctAnswer: "C",
      solutionOutline: "pH = −log10([H+]) = −log10(1×10⁻⁴) = 4",
      explanationCorrect: "Use the definition of pH",
      explanationCommonWrong: [
        "Using natural log instead of log10",
        "Dropping the negative sign",
        "Mistaking 10⁻⁴ for 10⁴"
      ],
      tags: ["chemistry", "ph"],
    },
  ],
  "Instrumentation and Controls": [
    {
      id: "inst-001",
      section: "Instrumentation and Controls",
      difficulty: "easy",
      type: "mcq",
      prompt: "A temperature sensor outputs 10 mV/°C. What voltage should it output at 25°C?",
      choices: ["A) 0.10 V", "B) 0.25 V", "C) 2.5 V", "D) 25 V"],
      correctAnswer: "B",
      solutionOutline: "V = (10 mV/°C) × 25°C = 250 mV = 0.25 V",
      explanationCorrect: "Multiply the sensitivity by temperature",
      explanationCommonWrong: [
        "Forgetting to convert mV to V",
        "Using 10 V/°C instead of 10 mV/°C",
        "Arithmetic error"
      ],
      tags: ["sensors", "calibration"],
    },
    {
      id: "inst-002",
      section: "Instrumentation and Controls",
      difficulty: "medium",
      type: "mcq",
      prompt: "A first-order system has time constant τ = 5 s. Approximately how long to reach 63.2% of final value?",
      choices: ["A) 1 s", "B) 5 s", "C) 10 s", "D) 15 s"],
      correctAnswer: "B",
      solutionOutline: "First-order response reaches 63.2% at t = τ",
      explanationCorrect: "Definition of time constant",
      explanationCommonWrong: [
        "Using 2τ or 3τ for 63.2%",
        "Confusing with 95% time",
        "Unit confusion"
      ],
      tags: ["controls", "first-order"],
    },
  ],
};

type Difficulty = "easy" | "medium" | "hard";
type TemplateFn = (seed: number, difficulty: Difficulty) => Question;

function mulberry32(seed: number) {
  let t = seed + 0x6d2b79f5;
  return function () {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, items: T[]): T {
  return items[Math.floor(rng() * items.length)];
}

function makeId(section: string, index: number) {
  const safe = section.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${safe}-${index}-${Date.now()}`;
}

function createMcqQuestion(params: {
  id: string;
  section: string;
  difficulty: Difficulty;
  prompt: string;
  choices: string[];
  correctIndex: number;
  solutionOutline: string;
  explanationCorrect: string;
  explanationCommonWrong: string[];
  tags: string[];
}): Question {
  const letters = ["A", "B", "C", "D"];
  return {
    id: params.id,
    section: params.section as Question["section"],
    difficulty: params.difficulty,
    type: "mcq",
    prompt: params.prompt,
    choices: params.choices.map((c, i) => `${letters[i]}) ${c}`),
    correctAnswer: letters[params.correctIndex],
    solutionOutline: params.solutionOutline,
    explanationCorrect: params.explanationCorrect,
    explanationCommonWrong: params.explanationCommonWrong,
    tags: params.tags,
    generatedAt: new Date().toISOString(),
  };
}

function createNumericQuestion(params: {
  id: string;
  section: string;
  difficulty: Difficulty;
  prompt: string;
  correctAnswer: number;
  tolerance: number;
  acceptedUnits: string[];
  solutionOutline: string;
  explanationCorrect: string;
  explanationCommonWrong: string[];
  tags: string[];
}): Question {
  return {
    id: params.id,
    section: params.section as Question["section"],
    difficulty: params.difficulty,
    type: "numeric",
    prompt: params.prompt,
    correctAnswer: params.correctAnswer,
    tolerance: params.tolerance,
    acceptedUnits: params.acceptedUnits,
    solutionOutline: params.solutionOutline,
    explanationCorrect: params.explanationCorrect,
    explanationCommonWrong: params.explanationCommonWrong,
    tags: params.tags,
    generatedAt: new Date().toISOString(),
  };
}

const sectionTemplates: Record<string, TemplateFn[]> = {
  "Mathematics": [
    (seed, difficulty) => {
      const rng = mulberry32(seed);
      const a = Math.floor(rng() * 8) + 2;
      const b = Math.floor(rng() * 12) + 1;
      const c = Math.floor(rng() * 10) + 1;
      const x = (c - b) / a;
      const choices = [x, x + 1, x - 1, x + 2].map((v) => v.toFixed(0));
      return createMcqQuestion({
        id: makeId("Mathematics", seed),
        section: "Mathematics",
        difficulty,
        prompt: `Solve for x: ${a}x + ${b} = ${c}`,
        choices,
        correctIndex: 0,
        solutionOutline: `${a}x + ${b} = ${c} → ${a}x = ${c - b} → x = ${(c - b) / a}`,
        explanationCorrect: "Isolate x by subtracting and dividing.",
        explanationCommonWrong: [
          "Forgetting to subtract b",
          "Dividing by the wrong coefficient",
          "Arithmetic error"
        ],
        tags: ["algebra", "linear-equations"],
      });
    },
    (seed, difficulty) => {
      const rng = mulberry32(seed);
      const k = Math.floor(rng() * 5) + 2;
      const choices = [`${2 * k}x`, `${k}x`, `${k}x^2`, `${2 * k}`];
      return createMcqQuestion({
        id: makeId("Mathematics", seed + 1),
        section: "Mathematics",
        difficulty,
        prompt: `What is the derivative of f(x) = ${k}x²?`,
        choices,
        correctIndex: 0,
        solutionOutline: `d/dx(${k}x²) = ${2 * k}x`,
        explanationCorrect: "Apply the power rule.",
        explanationCommonWrong: [
          "Forgetting the exponent",
          "Leaving x² unchanged",
          "Dropping the coefficient"
        ],
        tags: ["calculus", "derivatives"],
      });
    },
  ],
  "Probability and Statistics": [
    (seed, difficulty) => {
      const rng = mulberry32(seed);
      const p = (Math.floor(rng() * 5) + 2) / 10; // 0.2-0.6
      const q = (Math.floor(rng() * 4) + 2) / 10; // 0.2-0.5
      const correct = Number((p * q).toFixed(2));
      const choices = [correct, p + q, p, q].map((v) => v.toFixed(2));
      return createMcqQuestion({
        id: makeId("Probability and Statistics", seed),
        section: "Probability and Statistics",
        difficulty,
        prompt: `If P(A) = ${p} and P(B) = ${q}, and A and B are independent, what is P(A and B)?`,
        choices,
        correctIndex: 0,
        solutionOutline: `P(A∩B)=P(A)P(B)=${p}×${q}=${correct}`,
        explanationCorrect: "Independent events multiply.",
        explanationCommonWrong: [
          "Adding probabilities",
          "Using P(A) or P(B) only",
          "Confusing with union"
        ],
        tags: ["probability", "independence"],
      });
    },
    (seed, difficulty) => {
      const choices = ["50%", "68%", "95%", "99.7%"];
      return createMcqQuestion({
        id: makeId("Probability and Statistics", seed + 1),
        section: "Probability and Statistics",
        difficulty,
        prompt: "For a normal distribution, approximately what percentage of data lies within one standard deviation of the mean?",
        choices,
        correctIndex: 1,
        solutionOutline: "Empirical rule: 68-95-99.7",
        explanationCorrect: "Within 1σ is about 68%.",
        explanationCommonWrong: [
          "Using 2σ or 3σ instead",
          "Mixing the percentages",
          "Guessing without the rule"
        ],
        tags: ["statistics", "normal-distribution"],
      });
    },
  ],
  "Chemistry": [
    (seed, difficulty) => {
      const rng = mulberry32(seed);
      const mass = Math.floor(rng() * 20) + 10;
      const molar = 18;
      const n = Number((mass / molar).toFixed(2));
      const choices = [n, n + 0.5, n - 0.5, n + 1].map((v) => v.toFixed(2));
      return createMcqQuestion({
        id: makeId("Chemistry", seed),
        section: "Chemistry",
        difficulty,
        prompt: `How many moles are in ${mass} grams of water (H₂O)? (Molar mass = 18 g/mol)`,
        choices,
        correctIndex: 0,
        solutionOutline: `n = mass / molar mass = ${mass}/18 = ${n}`,
        explanationCorrect: "Use molar mass to convert grams to moles.",
        explanationCommonWrong: [
          "Multiplying instead of dividing",
          "Using wrong molar mass",
          "Arithmetic error"
        ],
        tags: ["stoichiometry", "molar-mass"],
      });
    },
    (seed, difficulty) => {
      const powers = [2, 3, 4, 5];
      const exp = powers[seed % powers.length];
      return createMcqQuestion({
        id: makeId("Chemistry", seed + 1),
        section: "Chemistry",
        difficulty,
        prompt: `What is the pH of a solution with hydrogen ion concentration [H⁺] = 1×10⁻${exp} M?`,
        choices: [String(exp - 1), String(exp), String(exp + 1), "10"],
        correctIndex: 1,
        solutionOutline: `pH = −log10(1×10⁻${exp}) = ${exp}`,
        explanationCorrect: "Use pH definition with log10.",
        explanationCommonWrong: [
          "Dropping the negative sign",
          "Using ln instead of log10",
          "Confusing exponent"
        ],
        tags: ["chemistry", "ph"],
      });
    },
  ],
  "Instrumentation and Controls": [
    (seed, difficulty) => {
      const rng = mulberry32(seed);
      const sensitivity = 5 + Math.floor(rng() * 6); // mV/°C
      const temp = 10 + Math.floor(rng() * 41); // °C
      const volts = (sensitivity * temp) / 1000;
      return createMcqQuestion({
        id: makeId("Instrumentation and Controls", seed),
        section: "Instrumentation and Controls",
        difficulty,
        prompt: `A temperature sensor outputs ${sensitivity} mV/°C. What voltage should it output at ${temp}°C?`,
        choices: [volts.toFixed(2), (volts * 10).toFixed(2), (volts / 10).toFixed(2), temp.toFixed(2)],
        correctIndex: 0,
        solutionOutline: `V = ${sensitivity} mV/°C × ${temp}°C = ${(sensitivity * temp)} mV = ${volts.toFixed(2)} V`,
        explanationCorrect: "Multiply sensitivity by temperature and convert mV to V.",
        explanationCommonWrong: [
          "Skipping mV→V conversion",
          "Multiplying by 10 instead of dividing",
          "Arithmetic error"
        ],
        tags: ["sensors", "calibration"],
      });
    },
    (seed, difficulty) => {
      const tau = 2 + (seed % 8);
      return createMcqQuestion({
        id: makeId("Instrumentation and Controls", seed + 1),
        section: "Instrumentation and Controls",
        difficulty,
        prompt: `A first-order system has time constant τ = ${tau} s. Approximately how long to reach 63.2% of final value?`,
        choices: ["1 s", `${tau} s`, `${2 * tau} s`, `${3 * tau} s`],
        correctIndex: 1,
        solutionOutline: "First-order response reaches 63.2% at t = τ",
        explanationCorrect: "Definition of time constant.",
        explanationCommonWrong: [
          "Using 2τ or 3τ",
          "Confusing with 95% time",
          "Unit confusion"
        ],
        tags: ["controls", "first-order"],
      });
    },
  ],
  "Engineering Economics": [
    (seed, difficulty) => {
      const rng = mulberry32(seed);
      const fv = 500 + Math.floor(rng() * 1500);
      const r = (5 + Math.floor(rng() * 6)) / 100;
      const n = 2 + (seed % 5);
      const pw = Number((fv / Math.pow(1 + r, n)).toFixed(2));
      return createNumericQuestion({
        id: makeId("Engineering Economics", seed),
        section: "Engineering Economics",
        difficulty,
        prompt: `Calculate the present worth of a $${fv} payment due in ${n} years at ${(r * 100).toFixed(0)}% annual interest.`,
        correctAnswer: pw,
        tolerance: 0.05,
        acceptedUnits: ["$"],
        solutionOutline: `PW = FV/(1+r)^n = ${fv}/(1+${r})^${n} = ${pw}`,
        explanationCorrect: "Use present worth formula.",
        explanationCommonWrong: [
          "Multiplying instead of dividing",
          "Using simple interest",
          "Power error"
        ],
        tags: ["economics", "present-worth"],
      });
    },
  ],
  "Statics": [
    (seed, difficulty) => {
      const rng = mulberry32(seed);
      const f = 50 + Math.floor(rng() * 100);
      const theta = [30, 45, 60][seed % 3];
      const fy = Number((f * Math.sin((theta * Math.PI) / 180)).toFixed(2));
      return createNumericQuestion({
        id: makeId("Statics", seed),
        section: "Statics",
        difficulty,
        prompt: `A ${f} N force acts at ${theta}° above the horizontal. What is the vertical component?`,
        correctAnswer: fy,
        tolerance: 0.05,
        acceptedUnits: ["N"],
        solutionOutline: `F_y = F sin(θ) = ${f} sin(${theta}°) = ${fy} N`,
        explanationCorrect: "Use sin for vertical component.",
        explanationCommonWrong: [
          "Using cos instead of sin",
          "Wrong angle reference",
          "Arithmetic error"
        ],
        tags: ["force-resolution", "components"],
      });
    },
  ],
  "Dynamics": [
    (seed, difficulty) => {
      const m = 2 + (seed % 8);
      const f = 10 + (seed % 10) * 5;
      const a = Number((f / m).toFixed(2));
      return createNumericQuestion({
        id: makeId("Dynamics", seed),
        section: "Dynamics",
        difficulty,
        prompt: `An object with mass ${m} kg experiences a net force of ${f} N. What is its acceleration?`,
        correctAnswer: a,
        tolerance: 0.05,
        acceptedUnits: ["m/s²"],
        solutionOutline: `a = F/m = ${f}/${m} = ${a} m/s²`,
        explanationCorrect: "Newton's second law.",
        explanationCommonWrong: [
          "Multiplying instead of dividing",
          "Unit confusion",
          "Arithmetic error"
        ],
        tags: ["newtons-laws", "kinematics"],
      });
    },
  ],
  "Strength of Materials": [
    (seed, difficulty) => {
      const area = 40 + (seed % 6) * 10;
      const stress = 150 + (seed % 6) * 25;
      const force = Number((stress * area).toFixed(0));
      return createNumericQuestion({
        id: makeId("Strength of Materials", seed),
        section: "Strength of Materials",
        difficulty,
        prompt: `A rod with cross-sectional area ${area} mm² experiences a tensile stress of ${stress} MPa. Calculate the tensile force.`,
        correctAnswer: force,
        tolerance: 0.05,
        acceptedUnits: ["N"],
        solutionOutline: `F = σA = ${stress} MPa × ${area} mm² = ${force} N`,
        explanationCorrect: "Stress is force per area.",
        explanationCommonWrong: [
          "Dividing instead of multiplying",
          "Unit conversion errors",
          "Arithmetic error"
        ],
        tags: ["stress", "tensile-force"],
      });
    },
  ],
  "Materials": [
    (seed, difficulty) => {
      return createMcqQuestion({
        id: makeId("Materials", seed),
        section: "Materials",
        difficulty,
        prompt: "Which material property is most directly related to resistance to deformation under load?",
        choices: ["Elastic modulus", "Thermal conductivity", "Electrical resistivity", "Density"],
        correctIndex: 0,
        solutionOutline: "Elastic modulus measures stiffness.",
        explanationCorrect: "Elastic modulus quantifies stiffness.",
        explanationCommonWrong: [
          "Confusing thermal and mechanical properties",
          "Selecting unrelated property",
          "Guessing"
        ],
        tags: ["materials", "stiffness"],
      });
    },
  ],
  "Fluid Mechanics": [
    (seed, difficulty) => {
      const v = 1 + (seed % 4);
      const d = 0.05 + (seed % 5) * 0.01;
      const area = Math.PI * (d / 2) * (d / 2);
      const q = Number((v * area).toFixed(4));
      return createNumericQuestion({
        id: makeId("Fluid Mechanics", seed),
        section: "Fluid Mechanics",
        difficulty,
        prompt: `Water flows through a pipe at velocity ${v} m/s. If the pipe diameter is ${(d * 1000).toFixed(0)} mm, calculate the volumetric flow rate.`,
        correctAnswer: q,
        tolerance: 0.05,
        acceptedUnits: ["m³/s"],
        solutionOutline: `Q = VA = ${v} × ${area.toFixed(4)} = ${q} m³/s`,
        explanationCorrect: "Volumetric flow rate is velocity times area.",
        explanationCommonWrong: [
          "Using diameter instead of radius",
          "Forgetting π",
          "Unit conversion errors"
        ],
        tags: ["flow-rate", "continuity"],
      });
    },
  ],
  "Basic Electrical Engineering": [
    (seed, difficulty) => {
      const v = 12 + (seed % 5) * 3;
      const r = 2 + (seed % 4) * 2;
      const i = Number((v / r).toFixed(2));
      return createNumericQuestion({
        id: makeId("Basic Electrical Engineering", seed),
        section: "Basic Electrical Engineering",
        difficulty,
        prompt: `A ${v} V source supplies current to a ${r} Ω resistor. What is the current?`,
        correctAnswer: i,
        tolerance: 0.05,
        acceptedUnits: ["A"],
        solutionOutline: `I = V/R = ${v}/${r} = ${i} A`,
        explanationCorrect: "Ohm's law.",
        explanationCommonWrong: [
          "Multiplying instead of dividing",
          "Unit confusion",
          "Arithmetic error"
        ],
        tags: ["ohms-law", "dc-circuits"],
      });
    },
  ],
  "Thermodynamics and Heat Transfer": [
    (seed, difficulty) => {
      const m = 2 + (seed % 6);
      const c = 4.18;
      const t1 = 20;
      const t2 = 40 + (seed % 4) * 10;
      const q = Number((m * c * (t2 - t1)).toFixed(0));
      return createNumericQuestion({
        id: makeId("Thermodynamics and Heat Transfer", seed),
        section: "Thermodynamics and Heat Transfer",
        difficulty,
        prompt: `Calculate heat transfer Q for ${m} kg of water heated from ${t1}°C to ${t2}°C. (c = 4.18 kJ/kg·K)`,
        correctAnswer: q,
        tolerance: 0.05,
        acceptedUnits: ["kJ"],
        solutionOutline: `Q = mcΔT = ${m}×4.18×(${t2}-${t1}) = ${q} kJ`,
        explanationCorrect: "Use Q = mcΔT.",
        explanationCommonWrong: [
          "Using wrong ΔT",
          "Forgetting mass",
          "Arithmetic error"
        ],
        tags: ["heat-transfer", "specific-heat"],
      });
    },
  ],
  "Engineering Ethics and Societal Impacts": [
    (seed, difficulty) => createMcqQuestion({
      id: makeId("Engineering Ethics and Societal Impacts", seed),
      section: "Engineering Ethics and Societal Impacts",
      difficulty,
      prompt: "An engineer discovers a design flaw that could endanger the public. What is the most appropriate action?",
      choices: [
        "Report the issue to supervisors and document findings",
        "Ignore it if it delays the project",
        "Keep it private to avoid conflict",
        "Wait for someone else to notice"
      ],
      correctIndex: 0,
      solutionOutline: "Engineers must hold public safety paramount.",
      explanationCorrect: "Ethics codes prioritize public safety.",
      explanationCommonWrong: [
        "Prioritizing schedule over safety",
        "Avoiding responsibility",
        "Lack of documentation"
      ],
      tags: ["ethics", "public-safety"],
    }),
  ],
  "Safety, Health, and Environment": [
    (seed, difficulty) => createMcqQuestion({
      id: makeId("Safety, Health, and Environment", seed),
      section: "Safety, Health, and Environment",
      difficulty,
      prompt: "Which action best reduces risk in a hazard analysis?",
      choices: [
        "Eliminate the hazard at the source",
        "Add warning labels only",
        "Rely on PPE alone",
        "Ignore low-probability hazards"
      ],
      correctIndex: 0,
      solutionOutline: "Hierarchy of controls prioritizes elimination.",
      explanationCorrect: "Elimination is the most effective control.",
      explanationCommonWrong: [
        "Overreliance on PPE",
        "Warning labels are weaker controls",
        "Ignoring hazards is unsafe"
      ],
      tags: ["safety", "risk"],
    }),
  ],
};

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeChoiceText(choice: string): string {
  return choice.trim().replace(/^[A-D]\s*[\.)]\s*/, "").trim();
}

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

  if (count <= 0 || sections.length === 0) {
    return [];
  }

  const perSectionCount = Math.floor(count / sections.length);
  const remainder = count % sections.length;

  const sectionCounts = sections.map((section, idx) =>
    idx < remainder ? perSectionCount + 1 : perSectionCount
  );

  sections.forEach((section, sIdx) => {
    const targetCount = sectionCounts[sIdx];
    const pool = buildSectionPool(
      section,
      DEFAULT_POOL_SIZE,
      difficulty || "mixed"
    );

    if (pool.length === 0) return;

    const shuffledPool = shuffleArray(pool);
    const selected = shuffledPool.slice(0, targetCount);
    questions.push(...selected);
  });

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
