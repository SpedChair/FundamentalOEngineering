# FE Reference Materials

This directory contains official NCEES FE exam reference materials and study resources.

## Files

### Official NCEES Documents
- **fe-handbook-10-5.pdf** - NCEES FE Reference Handbook v10.5 (Official exam reference)
- **FE-Other-Disciplines-CBT-specs (1).pdf** - FE Other Disciplines CBT Exam Specifications

### Study Materials
- **FE Prep Chemistry Controls.pptx** - Chemistry and Controls review
- **W1 FE Math.pptx** - Mathematics fundamentals
- **Design Capstone II - First Day.pptx** - Additional reference material

## How These Are Used

### Question Generation
The handbook is used to ensure all generated questions:
1. Use ONLY formulas from the FE Reference Handbook v10.5
2. Follow NCEES exam format and style
3. Reference handbook sections and Ctrl+F keywords
4. Match official exam difficulty and scope

### Question Validation
The `lib/handbook-validator.ts` module validates questions against handbook content:
- Checks that formulas exist in the handbook
- Verifies section alignment
- Ensures 2–4 minute solvability
- Validates distractor quality

### Future Enhancements
- **PDF Text Extraction**: Parse `fe-handbook-10-5.pdf` to extract all formulas programmatically
- **Formula Index**: Build searchable database of all handbook formulas
- **Automatic Validation**: Reject questions using non-handbook formulas
- **Ctrl+F Keyword Generation**: Auto-generate search keywords for each question

## Usage Notes

### For Developers
- The handbook PDF is referenced but not directly parsed (requires PDF library)
- Current implementation uses a manual formula database in `handbook-validator.ts`
- See `docs/NCEES_QUESTION_GUIDELINES.md` for complete standards

### For Students
- Download the official handbook from [NCEES.org](https://ncees.org/exams/fe-exam/)
- Practice using Ctrl+F to find formulas quickly
- The actual FE exam provides the handbook in searchable PDF format

## Copyright Notice

The NCEES FE Reference Handbook and exam specifications are copyrighted materials owned by the National Council of Examiners for Engineering and Surveying (NCEES). These materials are used for educational and exam preparation purposes only.

**Official Source**: https://ncees.org/exams/fe-exam/

## Version Control

- **Handbook Version**: 10.5 (Current as of February 2026)
- **Last Updated**: February 1, 2026

**Note**: Always verify you're using the most current version of the handbook. NCEES updates the handbook periodically.
