---
name: Msoffice
description: Create MS Word and PowerPoint documents on any topic.  USE WHEN user wants: documents, reports, word docs, presentations, slides, powerpoint, decks.
effort: medium
---

# MS Office Document Generator

Creates professional Word (.docx) and PowerPoint (.pptx) documents.

## Workflow Selection

| User Intent | Workflow | Output |
|-------------|----------|--------|
| "document", "report", "word", "write up" | Templates/Word.md | .docx |
| "presentation", "slides", "powerpoint", "deck" | Templates/PowerPoint.md | .pptx |

## Quick Reference

**Tool Location**: `~/.claude/Skills/MSOffice/Tools/generate.py`
**Python Interpreter**: `~/.claude/Skills/MSOffice/venv/bin/python`
**Output Directory**: `~/Downloads/` (for review before delivery)

## Usage Pattern

1. **Understand** the user's topic and document requirements
2. **Research** the topic if needed (use Research skill for comprehensive content)
3. **Structure** content into the appropriate JSON format — build the COMPLETE JSON in your thinking before running any command
4. **Generate** document using the CLI tool — pass the FULL content in a single command
5. **Verify** the command completed successfully (exit code 0, file exists)
6. **Inform** user of file location

## ⚠️ CRITICAL: Preventing Truncation

JSON content passed via `--content` must be **fully complete** before execution. Never truncate or abbreviate content mid-generation.

**For Word documents**: Include ALL sections with full prose text. Minimum for business reports: executive summary, findings (numbered), metrics/KPIs, actions (with owner + due date), conclusion.

**For PowerPoint**: Include ALL slides fully defined. Minimum for business presentations: title, agenda, problem, solution, financials/ROI, risks, recommendation, next steps (8+ slides). **MANDATORY**: Write the COMPLETE JSON for ALL slides as a visible code block in your response, count the slides to confirm 8+, verify no slide is truncated mid-content, THEN execute the command. Never start the command until every slide object is fully closed with `}`.

**If content is large**: Write the entire JSON structure in your response first as a code block, verify it is complete, THEN execute the command with that exact content. Do not run the command with placeholder or abbreviated content.

## Document Delivery

Files are saved to `~/Downloads/` by default. User can:
- Access locally on Mac
- Download via Kai Mobile App (browse to ~/Downloads/, tap file, download)

## CLI Usage

```bash
# Word document
~/.claude/Skills/MSOffice/venv/bin/python ~/.claude/Skills/MSOffice/Tools/generate.py \
  --type word \
  --title "Document Title" \
  --content '{"sections": [...]}' \
  --output ~/Downloads/filename.docx

# PowerPoint
~/.claude/Skills/MSOffice/venv/bin/python ~/.claude/Skills/MSOffice/Tools/generate.py \
  --type powerpoint \
  --title "Presentation Title" \
  --content '{"slides": [...]}' \
  --output ~/Downloads/filename.pptx
```
