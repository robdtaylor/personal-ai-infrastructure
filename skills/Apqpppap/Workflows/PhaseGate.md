# Phase Gate Review Workflow

**Structured workflow for conducting APQP phase gate reviews.**

## Trigger
- "Run gate review"
- "Phase gate checklist"
- "Gate [X] review for [project]"

## Process

### Step 1: Identify Gate and Project
1. Determine which gate (1-5)
2. Identify project/part number
3. Gather attendees

### Step 2: Load Checklist
```
read ~/.claude/skills/Apqpppap/reference/gate-checklists.md
```

Navigate to appropriate gate section.

### Step 3: Review Each Item
For each checklist item:
1. Request evidence
2. Verify completion
3. Note status (Complete/Open/NA)
4. Document gaps

### Step 4: Risk Assessment
1. Identify open issues
2. Assess impact on timing/quality
3. Define mitigation actions

### Step 5: Gate Decision
Based on checklist completion:
- **PASS:** All items complete, proceed
- **CONDITIONAL:** Minor items open, proceed with tracking
- **FAIL:** Critical gaps, develop recovery plan

### Step 6: Document
1. Complete gate review template
2. Record decision and conditions
3. Schedule next gate
4. Distribute minutes

## Output Format

```markdown
# Gate [X] Review Summary

**Project:** [Name]
**Part:** [P/N]
**Date:** [Date]
**Decision:** [PASS/CONDITIONAL/FAIL]

## Checklist Status
| Category | Complete | Open | NA |
|----------|----------|------|-----|
| [Category] | [#] | [#] | [#] |

## Open Items
| Item | Owner | Target |
|------|-------|--------|
| [Item] | [Name] | [Date] |

## Conditions (if applicable)
1. [Condition]
2. [Condition]

## Next Gate
- Gate [X+1] scheduled: [Date]
```

## Integration
- Links to PFMEA skill for Element 6 review
- Links to ControlPlan skill for Element 7 review
- Links to MSA skill for Element 8 review
