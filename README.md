# FE Exam Practice Platform

A web application for practicing the NCEES Fundamentals of Engineering (FE) Other Disciplines exam with **NCEES-style question generation** following official exam standards.

## Features

- **NCEES-Style AI Questions**: Questions follow official FE Reference Handbook v10.5 and NCEES exam design principles
- **Quality Standards**: Every question is 2–4 minute solvable, handbook-based, single-concept focused
- **Multiple Topics**: Practice across 10+ FE sections including Engineering Mechanics, Thermodynamics, Power Systems, etc.
- **Flexible Modes**:
  - Practice Mode: Immediate per-question feedback
  - Exam Mode: Timed, full review after submission
- **Question Types**:
  - Multiple Choice (A–D) with pedagogically-sound distractors
  - Numeric answers with tolerance handling
- **Detailed Feedback**: Per-question explanations, section scores, overall performance metrics
- **Session Management**: Attempt history stored locally, performance tracking by section

## Question Quality Standards

This platform follows **strict NCEES-style exam development guidelines** to ensure authentic FE exam preparation:

✅ Every question uses **ONLY formulas from FE Reference Handbook v10.5**  
✅ Questions are solvable in **2–4 minutes**  
✅ One-concept rule: test **1 core principle** per question  
✅ Distractors based on **common engineering mistakes** (unit errors, sign errors, wrong formulas)  
✅ Realistic wording and engineering context  
✅ No obscure formulas, long derivations, or multi-page setups  

📄 **See [docs/NCEES_QUESTION_GUIDELINES.md](docs/NCEES_QUESTION_GUIDELINES.md) for complete question development standards**

## Tech Stack

- **Frontend**: Next.js 16 with React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Validation**: Zod for strict schema validation + FE Handbook validator
- **AI Integration**: OpenAI API (pluggable for local LLM)
- **Storage**: localStorage for attempt history
- **Reference Materials**: Official NCEES FE Reference Handbook v10.5

## Project Structure

```
fe-exam-platform/
├── app/
│   ├── api/
│   │   ├── generate/route.ts      # POST /api/generate - Question generation
│   │   └── grade/route.ts         # POST /api/grade - Quiz grading
│   ├── select-section/page.tsx    # Section/mode selector
│   ├── quiz/page.tsx              # Quiz interface
│   ├── results/page.tsx           # Results review
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home
│   └── globals.css                # Global styles
├── components/
│   └── QuestionCard.tsx           # Question renderer (MCQ/numeric)
├── lib/
│   ├── types.ts                   # TypeScript interfaces & Zod schemas
│   ├── ai-provider.ts             # AI provider abstraction
│   ├── handbook-validator.ts      # FE Handbook compliance validator
│   └── utils.ts                   # Grading, validation utilities
├── reference/
│   ├── fe-handbook-10-5.pdf       # Official NCEES FE Reference Handbook
│   ├── FE-Other-Disciplines-CBT-specs (1).pdf  # Exam specifications
│   └── README.md                  # Reference materials documentation
├── docs/
│   ├── NCEES_QUESTION_GUIDELINES.md  # Complete question standards
│   └── INTEGRATION_SUMMARY.md     # Integration documentation
├── .env.local                     # Environment variables (not in git)
└── package.json
```

## Setup & Running

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   # .env.local
   OPENAI_API_KEY=sk-...
   ```

4. Start dev server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Data Models

### Question
```typescript
{
  id: string;
  section: string;
  difficulty: "easy" | "medium" | "hard";
  type: "mcq" | "numeric";
  prompt: string;
  choices?: string[];           // For MCQ
  correctAnswer: string | number;
  tolerance?: number;           // For numeric
  acceptedUnits?: string[];
  solutionOutline: string;
  explanationCorrect: string;
  explanationCommonWrong: string[];
  tags: string[];
  generatedAt: string;
}
```

### Attempt
```typescript
{
  id: string;
  quizId: string;
  sections: string[];
  mode: "practice" | "exam";
  answers: UserAnswer[];
  overallScore: number;          // 0-100
  sectionScores: Record<string, number>;
  submittedAt: string;
}
```

## API Endpoints

### POST /api/generate
Generate a quiz with AI-generated questions.

**Request:**
```json
{
  "sections": ["Statics", "Dynamics"],
  "difficulty": "medium",
  "count": 10,
  "mode": "practice",
  "typeDistribution": { "mcq": 0.8, "numeric": 0.2 }
}
```

**Response:** Quiz object with array of Questions

### POST /api/grade
Grade submitted quiz answers.

**Request:**
```json
{
  "quizId": "quiz-123",
  "questions": [...],
  "answers": [
    { "questionId": "q1", "userAnswer": "A" },
    { "questionId": "q2", "userAnswer": 45.3 }
  ],
  "sections": ["Statics"],
  "mode": "practice"
}
```

**Response:**
```json
{
  "attempt": { ... },
  "answers": [
    {
      "questionId": "q1",
      "userAnswer": "A",
      "isCorrect": true,
      "explanation": "..."
    }
  ]
}
```

## Grading Logic

### MCQ
- Case-insensitive letter matching (A/B/C/D)

### Numeric
- Tolerance-based checking (default 5%)
- Support for unit equivalence (e.g., kN ↔ N)
- Relative error calculation

## Future Enhancements

- [ ] Local LLM provider integration
- [ ] Database-backed history (MongoDB/Postgres)
- [ ] Advanced analytics (heatmaps, weak topic detection)
- [ ] Reference document upload & calibration
- [ ] Exam simulation with full CBT interface
- [ ] Mobile-responsive quiz UI
- [ ] Keyboard navigation & accessibility
- [ ] Export results (PDF, CSV)

## Development

### Run tests
```bash
npm test
```

### Build for production
```bash
npm run build
npm start
```

## Architecture Notes

- **AI Provider Abstraction**: `/lib/ai-provider.ts` defines an interface for pluggable AI backends. Currently implements OpenAI; local LLM can be added without changing core logic.
- **Schema Validation**: All AI outputs validated against Zod schemas before use.
- **Session Management**: Quiz and attempt data stored in sessionStorage during a session, moved to localStorage for history.
- **Grading**: Server-side grading ensures answer keys never exposed to client.

## License

ISC

## Author

SpedChair
