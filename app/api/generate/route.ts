import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Quiz } from "@/lib/types";
import { validateQuestionJSON } from "@/lib/utils";
import {
  validateQuestion,
  ValidationLevel,
  getHandbookHints,
} from "@/lib/handbook-validator";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an NCEES-style exam item developer building practice questions for the FE (Other Disciplines) exam.

====== PRIMARY CONSTRAINTS ======

CRITICAL — YOU MUST FOLLOW THESE RULES:
- Generate ONLY FE-style multiple-choice questions
- Every question must be solvable in approximately 2–4 minutes
- Each question must rely on a formula, principle, or definition that exists in the FE Reference Handbook v10.5
- If a question would require a formula NOT found in the Handbook, DO NOT generate that question
- Questions must test ONE core concept or at most 2 short logical steps (one-concept rule)
- Avoid long derivations, multi-page setups, or multi-part problems

====== FUNDAMENTAL FE PHILOSOPHY ======

The FE is NOT a test of advanced derivations or academic proofs. It tests minimum competency of a practicing general engineer.

Every question you generate must:
- Test core engineering principles, not edge cases
- Favor application over theory
- Be solvable quickly (2–4 minutes per problem)
- Avoid long derivations
- Use ONLY formulas from the NCEES FE Reference Handbook v10.5
- Feel like it belongs on the real exam, not an academic exercise

====== INFORMATION GIVEN VS OMITTED ======

FE questions follow strict information rules:
- ALL necessary information is explicitly given OR available in the Reference Handbook
- No external knowledge or obscure memorization required
- Extra information may be included on purpose to test conceptual understanding (NOT to confuse)
- Some information may be implicit but standard (e.g., steady-state, rigid body, incompressible flow)

DO NOT:
- Require the test taker to derive formulas
- Require searching for obscure constants
- Include parameters that cannot be used to solve the problem
- Use specialized correlations not in the handbook

====== QUESTION LENGTH, TONE, AND CLARITY ======

FE questions are:
- CONCISE (not verbose word problems)
- Written in plain technical English
- Free of unnecessary narrative
- Direct: state what is being asked immediately

GOOD FE-STYLE WORDING:
- "Determine the magnitude of…"
- "What is the most likely value of…"
- "Which of the following best represents…"
- "Calculate the required…"

AVOID:
- Long storytelling
- Vague phrasing
- Ambiguous variable definitions
- Over-explanation in the prompt itself

The solution path should be clear to a trained engineer once read.

====== MULTIPLE CHOICE (A–D) STRUCTURE ======

Exactly 4 answer options (A–D). CRITICAL rules:

1. Exactly ONE correct answer
2. Wrong answers (distractors) MUST be based on common FE mistakes:
   - Forgetting unit conversion (e.g., °C vs K, mm vs m)
   - Sign errors (positive vs negative)
   - Using diameter instead of radius
   - Using an incorrect but common formula
   - Forgetting conversion factors (π, g, ½, etc.)
   - Order-of-magnitude errors
3. Wrong answers should NOT be obviously wrong by inspection
4. Numeric choices should be close enough that rounding/precision matters
5. Randomize correct answer position — NOT always A

ANSWER CHOICE FORMATTING:
- Each choice is self-contained and complete
- Each choice is a plausible trap for a reasonable engineer (not obviously wrong)
- Distractors should represent mistakes that competent engineers might make under time pressure
- Explanations later will explain WHY each distractor represents a specific mistake

====== NUMERIC ANSWER QUESTIONS ======

When generating numeric questions:
- Expected value must be clearly defined
- Allow reasonable tolerance (typically ±5% relative error)
- Units must be specified or clearly implied
- Accept equivalent units (e.g., 5 kN = 5000 N)
- Still solvable in 2–3 minutes
- Test setup accuracy more than calculation difficulty
- Use straightforward arithmetic once set up

====== UNITS & WORDING (CRITICAL) ======

The FE uses BOTH SI and USCS units:
- Use either SI or USCS units — do NOT mix unit systems within a single question
- Occasionally mix units ONLY when unit conversion is the learning objective
- Unit conversion IS a tested skill
- If using USCS, required conversion factors must be in the handbook
- Always specify units clearly
- Avoid ambiguous or obscure conversions
- Use realistic FE wording: short engineering context + numeric values

GOOD FE-STYLE WORDING:
- "Determine the magnitude of…"
- "What is the most likely value of…"
- "Which of the following best represents…"
- "Calculate the required…"

AVOID:
- Long storytelling
- Vague phrasing
- Ambiguous variable definitions
- Over-explanation in the prompt itself

====== REFERENCE HANDBOOK DEPENDENCY ======

Every problem must be solvable using ONLY the NCEES FE Reference Handbook v10.5 as reference:
- Use equations commonly included in the handbook
- Assume examinee can search handbook electronically (Ctrl+F)
- Do NOT require long formula memorization
- Questions reward: knowing where to look, recognizing which equation applies, understanding application
- Avoid specialized content not in the handbook
- DO NOT invent constants, coefficients, or formulas

SOURCE ALIGNMENT:
- Use terminology, symbols, and conventions consistent with the FE Reference Handbook
- When conceptually referencing the handbook, provide:
  - The SECTION name (e.g., Mathematics → Linear Algebra, Thermodynamics → First Law)
  - Suggested Ctrl+F keywords for finding the formula
  - NOT page numbers (handbook is searchable, not paginated for exam use)

====== WHAT THE FE IS NOT TESTING ======

Intentionally AVOID:
- Long symbolic derivations
- Multi-page calculations
- Advanced numerical methods
- Proofs
- Deep theoretical physics
- Research-level edge cases
- Problems requiring >4–5 equations chained together
- Problems requiring equation derivation from fundamentals
- Assumptions not stated or standard

====== CONCEPTUAL EMPHASIS ======

The FE emphasizes:
- Recognizing governing principles
- Knowing which variables matter
- Understanding engineering judgment
- Applying common-sense checks (order of magnitude, sign, reasonableness)

Many questions can be answered faster by:
- Eliminating implausible options
- Estimating instead of fully calculating
- Recognizing physical impossibilities

Design questions so understanding helps more than brute force math.

====== DIFFICULTY CALIBRATION ======

EASY questions:
- Straightforward application of one principle
- Minimal setup required
- Most examiners solve quickly

MEDIUM questions:
- Require recognizing correct principle among several
- May require setting up an equation or checking assumptions
- Require one clear calculation step

HARD questions:
- Conceptually subtle (not mathematically intense)
- May test judgment, misdirection, or subtle setup issues
- Typical hard question: engineer recognizes the trap/subtlety and avoids it

Adjust difficulty by:
- Subtlety of setup and concept recognition
- Quality of distractors (how plausible are the traps?)
- Interpretation requirements, NOT by calculation complexity

====== EXPLANATION QUALITY ======

Post-answer explanations:
- Keep SHORT and instructional
- Focus on the decision process
- Highlight the mistake behind each wrong choice
- Avoid over-teaching or derivation

Good explanation answers:
1. Why is the correct answer correct?
2. Why might a reasonable engineer pick each wrong answer?
3. What conceptual mistake does each wrong answer represent?

====== TOPIC COVERAGE ======

The exam covers MANY topics shallowly, not a few topics deeply:
- Each question should test ONE primary concept
- Avoid combining multiple topics unless standard/expected
- Do not nest sub-questions
- Do not require prior answers to solve the next question
- Use diverse topics across questions — vary the subject matter, not just numbers

====== BLUEPRINT-BASED GENERATION & DISTRIBUTION ======

SECTION SELECTION LOGIC:
- Questions will be distributed evenly across requested sections unless weights are specified
- Do NOT repeat the same question template consecutively
- Use predefined question templates ("blueprints") per topic
- Randomize numerical values while preserving the same engineering principle
- Ensure numeric values are reasonable and hand-calculable

QUESTION DESIGN RULES:
- Follow the "one-concept" rule: each problem should test 1 core concept or at most 2 short logical steps
- Avoid long derivations, multi-page setups, or multi-part problems
- Use realistic FE wording: short engineering context + numeric values
- Each question must be UNIQUE in subject matter

====== NOVELTY & VARIETY (CRITICAL) ======

Never repeat topics or scenarios:
- Each question must be UNIQUE in subject matter
- Do NOT just shuffle numbers — change the scenario, equipment, context
- Vary numerical values WIDELY (different ranges, units, calculation depths)
- Different geometries, failure modes, applications
- Mix real-world contexts: different industries, equipment types, challenges

Example for Statics: Do NOT repeat truss problems — try beam bending, member stress, moment equilibrium, suspension systems, cables, friction, etc. Vary from 50 kN to 2.3 MN to 75 lbf. Use cantilever, simply supported, overhanging, compound structures.

====== JSON OUTPUT SCHEMA (STRICT) ======

Return ONLY this JSON structure. No markdown, no extra text:

{
  "id": "unique-id",
  "section": "Section name here",
  "difficulty": "easy" | "medium" | "hard",
  "type": "mcq" | "numeric",
  "prompt": "Full, concise question text with units where applicable",
  "choices": ["A) Option text", "B) Option text", "C) Option text", "D) Option text"] — FOR MCQ ONLY,
  "correctAnswer": "A" (letter for MCQ) or number (for numeric),
  "tolerance": 0.05 (for numeric only; 5% = 0.05),
  "acceptedUnits": ["kN", "N"] (for numeric if applicable),
  "solutionOutline": "Step 1: Description. Step 2: Description. Step 3: Description.",
  "explanationCorrect": "Why this answer is correct (1–2 sentences)",
  "explanationCommonWrong": [
    "Option A trap: why engineers pick it and what mistake it represents",
    "Option B trap: ...",
    "Option C trap: ..."
  ] (3 bullets for MCQ; omit for numeric),
  "tags": ["core-topic", "subtopic", "skill"],
  "generatedAt": "2026-02-01T12:00:00Z"
}

METADATA TAGS (REQUIRED FOR EVERY QUESTION):
- section: The FE exam section (Engineering Mechanics, Thermodynamics, etc.)
- subtopic: The specific engineering concept tested
- difficulty: Easy / Medium / Hard
- estimated time: Typical solve time in seconds (120–240)

IMPORTANT IMPLEMENTATION NOTE:
- All numerical answers and distractors should be computed deterministically
- For MCQ distractors, explicitly calculate what each wrong answer represents:
  - Wrong formula applied to the same inputs
  - Correct formula with a sign error
  - Correct formula but forgot unit conversion
  - Correct formula but used diameter instead of radius, etc.
- This ensures distractors are mathematically consistent and pedagogically meaningful

====== NON-NEGOTIABLE REQUIREMENTS ======

Every question you generate MUST:
✓ Look and feel like a real FE exam question from NCEES
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

    const questions: unknown[] = [];
    const mcqCount = Math.round((typeDistribution?.mcq || 0.8) * count);
    const numericCount = count - mcqCount;

    // Generate MCQ questions
    for (let i = 0; i < mcqCount; i++) {
      const section = sections[i % sections.length];
      const question = await generateQuestion(section, difficulty, "mcq");
      if (question) questions.push(question);
    }

    // Generate numeric questions
    for (let i = 0; i < numericCount; i++) {
      const section = sections[i % sections.length];
      const question = await generateQuestion(section, difficulty, "numeric");
      if (question) questions.push(question);
    }

    // Ensure we have enough questions
    if (questions.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate any valid questions. Check API key and try again." },
        { status: 500 }
      );
    }

    // Validate questions against FE Handbook standards
    const validatedQuestions = (questions.slice(0, count) as any[])
      .map((q) => {
        const question = validateQuestionJSON(q);
        const validation = validateQuestion(question, ValidationLevel.MODERATE);
        
        // Log validation warnings/errors for quality monitoring
        if (validation.warnings.length > 0 || validation.errors.length > 0) {
          console.log(`Question validation for ${question.id}:`, {
            errors: validation.errors,
            warnings: validation.warnings,
            suggestions: validation.suggestions,
          });
        }
        
        return question;
      })
      .filter((q) => {
        // Filter out questions that fail strict validation
        const validation = validateQuestion(q, ValidationLevel.MODERATE);
        return validation.isValid;
      });

    // Build quiz object
    const quiz: Quiz = {
      id: `quiz-${Date.now()}`,
      sections,
      mode: mode || "practice",
      questions: validatedQuestions,
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

async function generateQuestion(
  section: string,
  difficulty: string,
  type: "mcq" | "numeric"
) {
  try {
    // Get handbook hints for this section
    const handbookHints = getHandbookHints(section);
    const handbookContext = handbookHints.length > 0
      ? `\n\nFE HANDBOOK REFERENCE FOR ${section.toUpperCase()}:\n${handbookHints.join("\n")}`
      : "";

    const userPrompt =
      type === "mcq"
        ? `Generate a multiple-choice FE exam question for the "${section}" section at "${difficulty}" difficulty level.${handbookContext}\n\nReturn ONLY the JSON object with no markdown or extra text.`
        : `Generate a numeric answer FE exam question for the "${section}" section at "${difficulty}" difficulty level.${handbookContext}\n\nReturn ONLY the JSON object with no markdown or extra text.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 1500,
      temperature: 0.9, // Higher temperature for more diverse questions
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.warn(`Empty response for ${section} question`);
      return generateMockQuestion(section, difficulty, type);
    }

    // Parse JSON response - handle markdown code blocks
    let jsonStr = content.trim();
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    } else if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```\n?/, "").replace(/\n?```$/, "");
    }

    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn(`No JSON found in response for ${section}`);
      return generateMockQuestion(section, difficulty, type);
    }

    const questionData = JSON.parse(jsonMatch[0]);

    // Validate against schema
    const validatedQuestion = validateQuestionJSON(questionData);
    return validatedQuestion;
  } catch (error) {
    console.error(`Failed to generate question for ${section}:`, error);
    // Fall back to mock question
    return generateMockQuestion(section, difficulty, type);
  }
}

function generateMockQuestion(
  section: string,
  difficulty: string,
  type: "mcq" | "numeric"
) {
  const mockId = `mock-${section}-${Date.now()}-${Math.random()}`;

  // Topic pools for variety
  const topicPools: { [key: string]: string[] } = {
    Statics: [
      "truss analysis",
      "beam bending moments",
      "shear force diagrams",
      "equilibrium of rigid bodies",
      "center of gravity",
      "friction and static equilibrium",
      "stress and strain",
      "torsion in circular shafts",
    ],
    Dynamics: [
      "kinematics of particles",
      "Newton's second law",
      "work-energy theorem",
      "momentum and impulse",
      "rotational dynamics",
      "vibration analysis",
      "collision problems",
      "systems of particles",
    ],
    Thermodynamics: [
      "first law of thermodynamics",
      "second law and entropy",
      "ideal gas law",
      "thermodynamic cycles",
      "heat transfer modes",
      "phase diagrams",
      "entropy production",
      "exergy analysis",
    ],
    "Heat Transfer": [
      "conduction heat transfer",
      "convection coefficients",
      "radiation between surfaces",
      "fin efficiency",
      "heat exchangers",
      "transient conduction",
      "combined heat transfer",
      "thermal resistance networks",
    ],
    "Power Systems": [
      "three-phase power",
      "power factor correction",
      "transformer operation",
      "generator characteristics",
      "motor starting methods",
      "load flow analysis",
      "fault calculations",
      "power transmission efficiency",
    ],
  };

  const selectedTopic =
    topicPools[section]?.[Math.floor(Math.random() * (topicPools[section]?.length || 1))] ||
    `${section} topic ${Math.floor(Math.random() * 100)}`;

  if (type === "mcq") {
    // Generate varied MCQ based on difficulty
    const scenarios = [
      "A structural member is subjected to",
      "In a system experiencing",
      "For a component under",
      "When analyzing",
      "Consider a scenario where",
      "An engineer must determine",
      "What is the primary effect of",
      "Under these conditions, the most likely",
    ];

    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    const loads = ["combined loading", "cyclic stress", "temperature variation", "dynamic forces"];
    const load = loads[Math.floor(Math.random() * loads.length)];

    // Randomize correct answer position
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    const correctAnswerLetter = ["A", "B", "C", "D"][correctAnswerIndex];

    const baseChoices = [
      "Elastic buckling or instability failure",
      "Plastic yielding under stress",
      "Fatigue fracture from repeated cycles",
      "Brittle fracture from stress concentration",
    ];

    // Shuffle choices but track correct answer
    const shuffled = baseChoices
      .map((choice, idx) => ({ choice, original: idx }))
      .sort(() => Math.random() - 0.5);

    const choices = shuffled.map((item) => item.choice);
    const correctIndex = shuffled.findIndex((item) => item.original === correctAnswerIndex);
    const correctAnswer = ["A", "B", "C", "D"][correctIndex];

    return {
      id: mockId,
      section,
      difficulty: difficulty as "easy" | "medium" | "hard",
      type: "mcq" as const,
      prompt: `${scenario} ${load}. Considering ${selectedTopic}, which of the following best describes the failure mechanism?\n\nA) ${choices[0]}\nB) ${choices[1]}\nC) ${choices[2]}\nD) ${choices[3]}`,
      choices: choices.map((c, i) => `${["A", "B", "C", "D"][i]}) ${c}`),
      correctAnswer,
      solutionOutline: `Step 1: Identify ${selectedTopic} principles\nStep 2: Apply relevant failure criteria\nStep 3: Compare stress state to material properties\nStep 4: Determine governing failure mode`,
      explanationCorrect: `${correctAnswer} is correct: This failure mode governs under these ${load} conditions.`,
      explanationCommonWrong: [
        `Common mistake: Overlooking the role of ${load}`,
        `Misconception: Ignoring stress concentration factors in ${selectedTopic}`,
        `Error: Not considering material properties for this loading type`,
      ],
      tags: [section.toLowerCase(), selectedTopic, "failure analysis"],
      generatedAt: new Date().toISOString(),
    };
  } else {
    // Generate varied numeric questions
    const numericScenarios = [
      {
        base: "A fluid flows through a pipe",
        units: "m/s",
        factor: 3,
      },
      {
        base: "A beam experiences a distributed load",
        units: "kN/m",
        factor: 15,
      },
      {
        base: "Heat is transferred across a surface",
        units: "W",
        factor: 500,
      },
      {
        base: "Torque is applied to a circular shaft",
        units: "N·m",
        factor: 250,
      },
      {
        base: "A pressure vessel contains gas",
        units: "kPa",
        factor: 100,
      },
    ];

    const scenario = numericScenarios[Math.floor(Math.random() * numericScenarios.length)];
    const randomValue = (Math.random() * scenario.factor + scenario.factor * 0.5).toFixed(2);
    const correctAnswer = parseFloat(
      (parseFloat(randomValue) * (0.8 + Math.random() * 0.4)).toFixed(2)
    );

    return {
      id: mockId,
      section,
      difficulty: difficulty as "easy" | "medium" | "hard",
      type: "numeric" as const,
      prompt: `${scenario.base} with a characteristic value of ${randomValue} ${scenario.units}. Based on ${selectedTopic}, calculate the resulting quantity in SI units.`,
      correctAnswer,
      tolerance: 0.05,
      acceptedUnits: [scenario.units],
      solutionOutline: `Step 1: Identify governing equations for ${selectedTopic}\nStep 2: Convert units as needed\nStep 3: Apply calculation methodology\nStep 4: Verify answer using dimensional analysis`,
      explanationCorrect: `The calculation yields ${correctAnswer} using the standard formulas for ${selectedTopic}.`,
      explanationCommonWrong: [
        "Common error: Unit conversion mistakes",
        "Misconception: Forgetting proportionality factors",
        "Mistake: Arithmetic errors in multi-step calculations",
      ],
      tags: [section.toLowerCase(), selectedTopic, "calculation"],
      generatedAt: new Date().toISOString(),
    };
  }
}
