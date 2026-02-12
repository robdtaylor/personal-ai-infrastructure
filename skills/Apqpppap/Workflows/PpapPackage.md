# PPAP Package Workflow

**Structured workflow for assembling and reviewing PPAP submissions.**

## Trigger
- "PPAP elements for [part]"
- "PPAP submission checklist"
- "What's needed for Level [X] PPAP"

## Process

### Step 1: Determine Submission Level
1. Check customer requirements
2. Default to Level 3 if not specified
3. Confirm with customer if unclear

### Step 2: Load Element Checklist
Reference the 18 elements table in SKILL.md:
- S = Submit to customer
- R = Retain at supplier
- * = Submit on request

### Step 3: Gather Elements

**Engineering-Owned:**
- Element 1: Design records (drawings)
- Element 2: ECN documents
- Element 4: DFMEA (if applicable)

**Quality-Owned:**
- Element 5: Process Flow Diagram
- Element 6: PFMEA
- Element 7: Control Plan
- Element 8: MSA results
- Element 9: Dimensional results
- Element 10: Material/performance results
- Element 11: Process capability studies
- Element 12: Lab documentation
- Element 13: AAR (if appearance item)
- Element 14: Sample parts
- Element 15: Master sample
- Element 16: Checking aids
- Element 17: CSRs
- Element 18: PSW

### Step 4: Verify Completeness
For each required element:
1. Confirm document exists
2. Verify current revision
3. Check signatures/approvals
4. Validate data (capability, MSA)

### Step 5: Compile Package
1. Organize per customer format
2. Include cover sheet/index
3. Generate PSW

### Step 6: Review and Submit
1. Internal review (Quality Manager)
2. Submit to customer
3. Track approval status

## Output Format

```markdown
# PPAP Package Status

**Part:** [P/N]
**Customer:** [Name]
**Level:** [1-5]
**Target Date:** [Date]

## Element Status

| # | Element | Required | Status | Notes |
|---|---------|----------|--------|-------|
| 1 | Design Records | S/R | [Status] | |
| 2 | ECN Documents | S/R | [Status] | |
...
| 18 | PSW | S | [Status] | |

## Capability Summary
| Characteristic | Type | Ppk | Status |
|----------------|------|-----|--------|
| [Char] | CC/SC | [Value] | PASS/FAIL |

## Gaps/Actions
| Element | Gap | Action | Owner | Due |
|---------|-----|--------|-------|-----|
| [#] | [Gap] | [Action] | [Name] | [Date] |
```

## Customer-Specific Notes
- GM: Check GPDS requirements
- Ford: Use APQP Status Report
- JLR: Check Q-SIM requirements
- All: Verify portal submission requirements
