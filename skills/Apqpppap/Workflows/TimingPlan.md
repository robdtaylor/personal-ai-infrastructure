# Timing Plan Workflow

**Structured workflow for creating and managing APQP program timing plans.**

## Trigger
- "Create timing plan for [project]"
- "Launch schedule for [part]"
- "Program milestones"

## Process

### Step 1: Gather Inputs
1. Customer SOP (Start of Production) date
2. Customer PPAP due date
3. Lead times (tooling, materials)
4. Resource availability

### Step 2: Work Backwards from SOP
Standard timing (adjust based on complexity):

| Milestone | Weeks Before SOP |
|-----------|------------------|
| Customer Approval | T-2 |
| PPAP Submission | T-4 |
| PPAP Run | T-6 |
| First Article | T-8 |
| Tooling Receive | T-10 |
| Process Design Complete | T-12 |
| Tooling Order | T-16 |
| Design Release | T-18 |
| Program Kick-Off | T-24 |

### Step 3: Identify Critical Path
1. Tooling lead time
2. Material lead time
3. Customer approval cycles
4. Resource constraints

### Step 4: Add Dependencies
Link milestones:
- Gate 1 → Tooling Order
- Design Release → Gate 2
- Tooling Receive → Gate 3
- PPAP Submission → Gate 4

### Step 5: Assign Owners
Each milestone needs:
- Owner (single person)
- Due date
- Predecessor(s)
- Successor(s)

### Step 6: Create Visual
Generate Gantt chart or milestone table.

## Output Format

```markdown
# Program Timing Plan

**Program:** [Name]
**Part Number:** [P/N]
**Customer:** [Customer]
**SOP:** [Date]

## Key Dates

| Milestone | Target Date | Owner | Status |
|-----------|-------------|-------|--------|
| Kick-Off | [Date] | PM | |
| Gate 1 | [Date] | PM | |
| Design Release | [Date] | Eng | |
| Gate 2 | [Date] | PM | |
| Tooling Order | [Date] | Mfg Eng | |
| Tooling Receive | [Date] | Mfg Eng | |
| Gate 3 | [Date] | PM | |
| First Article | [Date] | Quality | |
| PPAP Run | [Date] | Production | |
| PPAP Submit | [Date] | Quality | |
| Gate 4 | [Date] | PM | |
| Customer Approval | [Date] | Quality | |
| SOP | [Date] | Production | |

## Critical Path Items
1. [Item] - Lead time: [X] weeks
2. [Item] - Lead time: [X] weeks

## Risks to Timing
| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk] | [Impact] | [Action] |
```

## MNMUK Program Phases

| Phase | Typical Duration | Key Activities |
|-------|------------------|----------------|
| Quotation | 1-2 weeks | RFQ, feasibility |
| Award | 1 week | PO, kick-off |
| Planning | 2-3 weeks | APQP plan, team |
| Development | 4-8 weeks | Process, tooling |
| Validation | 2-4 weeks | PPAP run |
| Approval | 1-2 weeks | Submission, PSW |
| Launch | 1-2 weeks | Ramp-up |

## Low Volume Adjustments
For low volume programs (<100 pcs/year):
- Combine phases where practical
- Reduce PPAP run quantity
- Consider prototype tooling
- Document any deviations
