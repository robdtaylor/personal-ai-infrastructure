# Open Issues Workflow

**Structured workflow for tracking and managing APQP program issues.**

## Trigger
- "Track open issues for [project]"
- "Issue log for [program]"
- "What's blocking [launch]"

## Process

### Step 1: Identify Issues
Sources of issues:
- Gate review gaps
- Design clarifications needed
- Tooling/equipment problems
- Capability concerns
- Supplier delays
- Resource constraints

### Step 2: Categorize
| Category | Examples |
|----------|----------|
| Design | Drawing errors, GD&T clarification |
| Process | Capability, cycle time, scrap |
| Tooling | Modification, delay, qualification |
| Quality | MSA fail, capability below target |
| Supply | Material lead time, supplier PPAP |
| Commercial | Scope change, pricing, contract |

### Step 3: Assign and Prioritize
For each issue:
1. Assign single owner
2. Set target date
3. Assess impact (High/Medium/Low)
4. Link to program timing

### Step 4: Track Status
| Status | Definition |
|--------|------------|
| Open | Identified, not started |
| In Progress | Work underway |
| Pending | Waiting on external input |
| Closed | Resolved and verified |
| Escalated | Risk to timing, needs management |

### Step 5: Report
Regular reporting:
- Weekly: Team review
- Bi-weekly: Customer update (if required)
- Gate reviews: Full status

### Step 6: Close Out
To close an issue:
1. Verify resolution
2. Document evidence
3. Update status
4. Archive record

## Output Format

```markdown
# Open Issues Log

**Program:** [Name]
**Part Number:** [P/N]
**Last Updated:** [Date]

## Summary
| Status | Count |
|--------|-------|
| Open | [#] |
| In Progress | [#] |
| Pending | [#] |
| Escalated | [#] |
| Closed (this period) | [#] |

## Active Issues

| # | Issue | Category | Impact | Owner | Target | Status |
|---|-------|----------|--------|-------|--------|--------|
| 1 | [Description] | [Cat] | H/M/L | [Name] | [Date] | [Status] |
| 2 | [Description] | [Cat] | H/M/L | [Name] | [Date] | [Status] |

## Escalated Items (Management Attention)

| # | Issue | Impact | Mitigation | Decision Needed |
|---|-------|--------|------------|-----------------|
| [#] | [Issue] | [Impact] | [Action] | [Decision] |

## Recently Closed

| # | Issue | Resolution | Closed Date |
|---|-------|------------|-------------|
| [#] | [Issue] | [How resolved] | [Date] |
```

## Issue Escalation Criteria

Escalate when:
- Issue threatens SOP date
- Cost impact >£5k
- Customer satisfaction at risk
- Safety/compliance concern
- Resource conflict unresolved

## Integration

Issues flow into:
- Gate review checklists
- Customer updates
- Lessons learned (at closure)
- Risk register updates
