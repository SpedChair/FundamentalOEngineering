# NCEES-Style Question Integration Summary

## What Changed

The FE Exam Practice Platform now follows **strict NCEES exam development standards** for question generation.

### Updated Files

1. **[app/api/generate/route.ts](../app/api/generate/route.ts)**
   - Enhanced `SYSTEM_PROMPT` with comprehensive NCEES guidelines
   - Enforces FE Reference Handbook v10.5 dependency
   - Implements one-concept rule (2–4 minute solvability)
   - Requires deterministic distractor calculation
   - Emphasizes quality over quantity

2. **[docs/NCEES_QUESTION_GUIDELINES.md](NCEES_QUESTION_GUIDELINES.md)** (NEW)
   - Complete reference guide for question development
   - Covers all NCEES standards and best practices
   - Includes examples, checklists, and rejection criteria

3. **[README.md](../README.md)**
   - Updated to highlight NCEES-style quality standards
   - References new guidelines document

---

## Key Improvements

### Before
- Generic "FE-style" questions
- No explicit handbook constraint
- Vague distractor requirements
- No time limit enforcement

### After
- **Strict NCEES standards**: Must use FE Reference Handbook v10.5 formulas ONLY
- **Time constraint**: 2–4 minutes maximum per question
- **One-concept rule**: Test 1 core principle, not multiple chained concepts
- **Pedagogical distractors**: Each wrong answer represents a specific, common mistake
- **Quality gates**: Reject questions that require non-handbook formulas or >4 minutes

---

## How It Works

### AI Provider System Prompt

The OpenAI API now receives a comprehensive system prompt that includes:

1. **Primary Constraints**
   - Handbook-only formulas
   - 2–4 minute solvability
   - One-concept per question

2. **Question Design Rules**
   - Realistic FE wording (short context + numbers)
   - SI or USCS units (not mixed unless conversion is the objective)
   - Exactly 4 choices (A–D)

3. **Distractor Requirements**
   - Based on specific mistakes: unit errors, sign errors, wrong formulas
   - Plausible (not obviously wrong)
   - Deterministically calculated when possible

4. **Reference Handbook Alignment**
   - Section name + Ctrl+F keywords (not page numbers)
   - No invented formulas or coefficients

5. **Quality Rejection Criteria**
   - DO NOT generate if formula not in handbook
   - DO NOT generate if >4 minutes to solve
   - DO NOT use obviously wrong distractors

---

## Example: Good vs Bad Questions

### ❌ Bad Question (Would Now Be Rejected)
```
A complex thermal system with 15 components operates under non-ideal 
conditions. Using advanced thermodynamic optimization theory not found 
in the handbook, derive the maximum possible efficiency considering 
entropy generation, exergy destruction, and heat transfer irreversibility 
across multiple stages. (Estimated time: 12+ minutes)
```

**Why rejected:**
- Requires formulas not in FE Handbook
- Takes >4 minutes
- Tests multiple concepts (violates one-concept rule)
- Requires advanced derivation

### ✅ Good Question (NCEES-Style)
```
A rigid beam is simply supported at both ends and carries a uniformly 
distributed load of 5 kN/m over a 6 m span. Determine the maximum 
bending moment in the beam.

A) 18.75 kN·m
B) 22.5 kN·m
C) 30 kN·m
D) 45 kN·m

Correct: B) 22.5 kN·m
Time: ~2 minutes
```

**Why good:**
- Uses handbook formula: M_max = wL²/8 (Mechanics section)
- Solvable in 2 minutes
- Tests 1 concept: bending moment for simply supported beam with UDL
- Distractors represent specific mistakes:
  - A: Forgot factor of 8, used wL²/10
  - C: Used wL (wrong formula)
  - D: Used wL² (forgot denominator)

---

## Testing the Changes

### 1. Generate Questions
```bash
npm run dev
# Navigate to http://localhost:3000
# Select sections, click "Generate Questions"
```

### 2. Expected Behavior
- Questions should reference FE Handbook concepts
- Prompts should be concise (not verbose)
- Distractors should be close in value (not wildly different)
- Solution outlines should be 3–8 lines (not essays)

### 3. Quality Checks
- [ ] Can you solve each question in 2–4 minutes?
- [ ] Does each question test 1 core concept?
- [ ] Are distractors plausible mistakes?
- [ ] Would you find the formula in FE Handbook v10.5?

---

## Future Enhancements

### Phase 2: Deterministic Distractor Engine
Currently, the LLM generates distractors. Future improvement:
- **Calculate distractors in code** (not LLM wording)
- Example: If correct answer is `wL²/8`, distractors are:
  - `wL²/10` (wrong denominator)
  - `wL` (forgot square)
  - `-wL²/8` (sign error)

This ensures **mathematical consistency** and prevents implausible distractors.

### Phase 3: Handbook Reference Integration
- Upload FE Reference Handbook v10.5 PDF
- Extract formulas and create searchable index
- Validate every generated question against handbook
- Auto-reject questions using non-handbook formulas

### Phase 4: Question Blueprint Library
- Predefine 10+ question templates per section
- Randomize numerical values only
- Ensure deterministic, high-quality questions
- Reduce dependency on LLM for core logic

---

## Benefits

### For Students
- ✅ More realistic exam preparation
- ✅ Questions match actual FE exam style
- ✅ Learn to use the handbook effectively
- ✅ Practice time management (2–4 min per question)

### For Development
- ✅ Clear quality standards
- ✅ Reproducible question generation
- ✅ Easy to validate question quality
- ✅ Scalable to local LLM (less dependency on OpenAI)

---

## Resources

- **[NCEES FE Reference Handbook v10.5](https://ncees.org/exams/fe-exam/)** (Official source)
- **[docs/NCEES_QUESTION_GUIDELINES.md](NCEES_QUESTION_GUIDELINES.md)** (Complete guidelines)
- **[app/api/generate/route.ts](../app/api/generate/route.ts)** (Implementation)

---

## Questions?

If questions don't match expected quality:
1. Check that `OPENAI_API_KEY` is set in `.env.local`
2. Review generated questions against checklist in `NCEES_QUESTION_GUIDELINES.md`
3. Consider increasing temperature (0.9) or switching to GPT-4 for better quality
4. Use the rejection criteria to filter out bad questions

---

**Last Updated**: February 1, 2026  
**Version**: 1.0 (NCEES Integration)
