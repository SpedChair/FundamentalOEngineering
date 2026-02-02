# NCEES-Style FE Exam Question Development Guidelines

## Overview
This document defines the rules and constraints for generating practice questions for the FE (Other Disciplines) exam that match NCEES standards.

## Primary Constraints

### Must-Follow Rules
1. **Generate ONLY FE-style multiple-choice questions**
2. **Solvability**: Every question must be solvable in approximately 2–4 minutes
3. **Handbook Dependency**: Each question must rely on a formula, principle, or definition that exists in the **FE Reference Handbook v10.5**
4. **Formula Rejection**: If a question would require a formula NOT found in the Handbook → **DO NOT generate that question**
5. **One-Concept Rule**: Each problem should test **1 core concept** or at most **2 short logical steps**
6. **Avoid Complexity**: No long derivations, multi-page setups, or multi-part problems

---

## Question Design Rules

### Structure
- Follow the "one-concept" rule: test ONE primary engineering principle
- Use realistic FE wording: **short engineering context + numeric values**
- Be solvable quickly (2–4 minutes maximum)
- Favor **application over theory**
- Test **understanding, not memorization**

### Wording Best Practices
**Good FE-style wording:**
- "Determine the magnitude of…"
- "What is the most likely value of…"
- "Which of the following best represents…"
- "Calculate the required…"

**Avoid:**
- Long storytelling or unnecessary narrative
- Vague phrasing
- Ambiguous variable definitions
- Over-explanation in the prompt itself

---

## Multiple-Choice Structure (A–D)

### Requirements
- **Exactly 4 answer options** (A, B, C, D)
- **Exactly ONE correct answer**
- **Randomize correct answer position** — do NOT always make it option A

### Distractor Design (Wrong Answers)
Distractors MUST be based on **common FE mistakes**:
- ❌ Forgetting unit conversion (e.g., °C vs K, mm vs m)
- ❌ Sign errors (positive vs negative)
- ❌ Using diameter instead of radius
- ❌ Using an incorrect but common formula
- ❌ Forgetting conversion factors (π, g, ½, etc.)
- ❌ Order-of-magnitude errors

### Distractor Quality Rules
1. Wrong answers should **NOT be obviously wrong** by inspection
2. Numeric choices should be close enough that **rounding/precision matters**
3. Each distractor should represent a **specific, plausible engineering mistake**
4. Distractors should be mistakes that competent engineers might make under time pressure

---

## Units & Formatting

### Unit System Rules
- Use **either SI or USCS units** — do NOT mix systems within a single question
- **Exception**: Mix units ONLY when unit conversion is the learning objective
- Unit conversion IS a tested skill
- Always specify units clearly
- Avoid ambiguous or obscure conversions

### SI vs USCS
- If using USCS, required conversion factors **must be in the handbook**
- Use realistic engineering units (e.g., kN, MPa, m/s, not unusual combinations)

---

## Reference Handbook Dependency

### Handbook Alignment (CRITICAL)
Every problem must be solvable using **ONLY the NCEES FE Reference Handbook v10.5** as reference:
- ✅ Use equations commonly included in the handbook
- ✅ Assume examinee can search handbook electronically (Ctrl+F)
- ✅ Questions reward: knowing where to look, recognizing which equation applies
- ❌ DO NOT require long formula memorization
- ❌ DO NOT invent constants, coefficients, or formulas
- ❌ Avoid specialized content not in the handbook

### Source Citation Format
When conceptually referencing the handbook, provide:
- **Section name** (e.g., Mathematics → Linear Algebra, Thermodynamics → First Law)
- **Suggested Ctrl+F keywords** for finding the formula
- **NOT page numbers** (handbook is searchable, not paginated for exam use)

---

## Numeric Answer Questions

When generating numeric questions:
- **Expected value** must be clearly defined
- Allow reasonable **tolerance** (typically ±5% relative error)
- **Units must be specified** or clearly implied
- Accept **equivalent units** (e.g., 5 kN = 5000 N)
- Still solvable in **2–4 minutes**
- Test **setup accuracy** more than calculation difficulty
- Use **straightforward arithmetic** once set up

---

## Difficulty Calibration

### Easy Questions
- Straightforward application of **one principle**
- Minimal setup required
- Most examinees solve quickly

### Medium Questions
- Require **recognizing correct principle** among several
- May require setting up an equation or checking assumptions
- Require **one clear calculation step**

### Hard Questions
- **Conceptually subtle** (not mathematically intense)
- May test judgment, misdirection, or subtle setup issues
- Typical hard question: engineer recognizes the trap/subtlety and avoids it

### How to Adjust Difficulty
Adjust difficulty by:
- ✅ Subtlety of setup and concept recognition
- ✅ Quality of distractors (how plausible are the traps?)
- ✅ Interpretation requirements
- ❌ NOT by calculation complexity

---

## Novelty & Variety

### Uniqueness Requirements
Never repeat topics or scenarios:
- ✅ Each question must be **UNIQUE in subject matter**
- ✅ Do NOT just shuffle numbers — **change the scenario, equipment, context**
- ✅ Vary numerical values WIDELY (different ranges, units, calculation depths)
- ✅ Use different geometries, failure modes, applications
- ✅ Mix real-world contexts: different industries, equipment types, challenges

### Example: Statics Section
**Bad** (repetitive):
- Question 1: Truss analysis with method of joints
- Question 2: Truss analysis with method of sections
- Question 3: Truss analysis with zero-force members

**Good** (varied):
- Question 1: Truss analysis (50 kN loads)
- Question 2: Beam bending moment (cantilever, 2.3 kN/m)
- Question 3: Friction on inclined plane (75 lbf, μ = 0.35)
- Question 4: Centroid of composite area (L-beam section)

---

## Blueprint-Based Generation

### Template Strategy
- Use **predefined question templates ("blueprints")** per topic
- **Randomize numerical values** while preserving the same engineering principle
- Ensure numeric values are **reasonable and hand-calculable**
- Do NOT repeat the same question template consecutively

### Section Distribution Logic
- Distribute questions **evenly across sections** unless weights are specified
- Total number of questions (N) divided across selected sections
- Avoid clustering multiple questions from the same narrow subtopic

---

## Explanation Quality

### Post-Answer Explanations
Post-answer explanations should:
- Keep **SHORT and instructional** (3–8 lines)
- Focus on the **decision process**
- Highlight the **mistake behind each wrong choice**
- Avoid over-teaching or long derivations

### Good Explanation Answers:
1. **Why is the correct answer correct?**
2. **Why might a reasonable engineer pick each wrong answer?**
3. **What conceptual mistake does each wrong answer represent?**

---

## JSON Output Format

### Required Schema
```json
{
  "id": "unique-id",
  "section": "Section name",
  "difficulty": "easy" | "medium" | "hard",
  "type": "mcq" | "numeric",
  "prompt": "Full, concise question text with units",
  "choices": ["A) Option", "B) Option", "C) Option", "D) Option"],
  "correctAnswer": "A" (letter for MCQ) or number (for numeric),
  "tolerance": 0.05,
  "acceptedUnits": ["kN", "N"],
  "solutionOutline": "Step 1: ... Step 2: ... Step 3: ...",
  "explanationCorrect": "Why this answer is correct",
  "explanationCommonWrong": [
    "Option A trap: specific mistake",
    "Option B trap: specific mistake",
    "Option C trap: specific mistake"
  ],
  "tags": ["core-topic", "subtopic", "skill"],
  "generatedAt": "2026-02-01T12:00:00Z"
}
```

### Metadata Tags (Required)
- **section**: The FE exam section (e.g., Engineering Mechanics, Thermodynamics)
- **subtopic**: The specific engineering concept tested
- **difficulty**: Easy / Medium / Hard
- **estimatedTime**: Typical solve time in seconds (120–240)

---

## Important Implementation Note

### Deterministic Distractor Calculation
- All numerical answers and distractors should be **computed deterministically**
- For MCQ distractors, **explicitly calculate** what each wrong answer represents:
  - ❌ Wrong formula applied to the same inputs
  - ❌ Correct formula with a sign error
  - ❌ Correct formula but forgot unit conversion
  - ❌ Correct formula but used diameter instead of radius
- This ensures distractors are **mathematically consistent** and **pedagogically meaningful**

### LLM Role
- If an LLM is used, it should generate **wording ONLY**
- All numerical answers and distractors should be **computed deterministically in code**
- LLM provides context, wording, and explanation
- Code ensures mathematical accuracy and consistency

---

## Non-Negotiable Requirements

### Every Question MUST:
✅ Look and feel like a real FE exam question from NCEES  
✅ Be solvable in **2–4 minutes maximum**  
✅ Use **ONLY** formulas from FE Reference Handbook v10.5  
✅ Test understanding, not memorization or advanced derivation  
✅ Avoid unnecessary complexity or multi-step derivations  
✅ Respect FE formatting and tone (concise, direct, technical)  
✅ Have **EXACTLY ONE correct answer** (MCQ) with exactly **4 choices (A–D)**  
✅ Be solvable with reference handbook only  
✅ Have unique topic/scenario (not repeating other questions in the set)  
✅ Include plausible distractors that are **NOT obviously wrong**  
✅ Base distractors on specific, common engineering mistakes  
✅ Follow the **"one-concept" rule**: test ONE primary concept per question  

---

## Question Rejection Criteria

### DO NOT GENERATE if:
❌ Question requires formulas **NOT in the FE Reference Handbook v10.5**  
❌ Question would take **>4 minutes** to solve  
❌ Distractors are **obviously wrong** by inspection  
❌ Question would **frustrate a competent engineer** due to ambiguity or excessive setup  
❌ Question requires advanced derivations or multi-page calculations  
❌ Question tests obscure edge cases rather than core engineering principles  

---

## What the FE Is NOT Testing

Intentionally **AVOID**:
- ❌ Long symbolic derivations
- ❌ Multi-page calculations
- ❌ Advanced numerical methods
- ❌ Proofs
- ❌ Deep theoretical physics
- ❌ Research-level edge cases
- ❌ Problems requiring >4–5 equations chained together
- ❌ Problems requiring equation derivation from fundamentals
- ❌ Assumptions not stated or not standard

---

## Topic Coverage

### Breadth Over Depth
The exam covers MANY topics shallowly, not a few topics deeply:
- Each question should test **ONE primary concept**
- Avoid combining multiple topics unless standard/expected
- Do not nest sub-questions
- Do not require prior answers to solve the next question
- Use diverse topics across questions — vary the subject matter, not just numbers

---

## Conceptual Emphasis

### Understanding Over Brute Force
The FE emphasizes:
- ✅ Recognizing governing principles
- ✅ Knowing which variables matter
- ✅ Understanding engineering judgment
- ✅ Applying common-sense checks (order of magnitude, sign, reasonableness)

Many questions can be answered faster by:
- ✅ Eliminating implausible options
- ✅ Estimating instead of fully calculating
- ✅ Recognizing physical impossibilities

Design questions so **understanding helps more than brute force math**.

---

## Information Design

### What to Include
FE questions follow strict information rules:
- ✅ ALL necessary information is explicitly given OR available in the Reference Handbook
- ✅ No external knowledge or obscure memorization required
- ✅ Extra information may be included on purpose to test conceptual understanding
- ✅ Some information may be implicit but standard (e.g., steady-state, rigid body, incompressible flow)

### What to Avoid
DO NOT:
- ❌ Require the test taker to derive formulas
- ❌ Require searching for obscure constants
- ❌ Include parameters that cannot be used to solve the problem
- ❌ Use specialized correlations not in the handbook

---

## Summary Checklist

Before finalizing any question, verify:

- [ ] Solvable in 2–4 minutes
- [ ] Uses ONLY FE Handbook v10.5 formulas
- [ ] Tests ONE core concept (one-concept rule)
- [ ] Has exactly 4 choices (A–D)
- [ ] Has exactly 1 correct answer
- [ ] Distractors are plausible and based on specific mistakes
- [ ] Units are clear and consistent (SI or USCS, not mixed)
- [ ] Wording is concise and FE-style
- [ ] Question is unique (not repeating other questions)
- [ ] Explanation is short and instructional
- [ ] Handbook reference includes section name and Ctrl+F keywords

---

## Version History

- **v1.0** (2026-02-01): Initial NCEES-style guidelines integrated from ChatGPT recommendations
