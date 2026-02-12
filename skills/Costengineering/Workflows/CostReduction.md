# Cost Reduction Workflow

**Structured workflow for identifying and implementing cost reduction opportunities.**

## Trigger
- "Cost reduction for [product/process]"
- "Value engineering analysis"
- "Reduce cost by [X]%"

## Process

### Step 1: Define Scope and Target

| Field | Value |
|-------|-------|
| Project ID | CR-[Year]-[Seq] |
| Scope | [Product / Process / Department] |
| Current Cost | £[X] per unit / £[X] annual |
| Target Reduction | [X]% or £[X] |
| Target Cost | £[X] |
| Timeline | [Start - End] |
| Sponsor | [Name] |

### Step 2: Analyze Current Cost Structure

**Cost Breakdown:**

```markdown
## Current Cost Analysis

### By Element

| Element | Cost | % of Total |
|---------|------|------------|
| Direct material | £[X] | [X]% |
| Direct labour | £[X] | [X]% |
| Manufacturing overhead | £[X] | [X]% |
| **Total** | **£[X]** | 100% |

### By Operation (if applicable)

| Operation | Material | Labour | OH | Total | % |
|-----------|----------|--------|-----|-------|---|
| [Op 10] | £[X] | £[X] | £[X] | £[X] | [X]% |
| [Op 20] | £[X] | £[X] | £[X] | £[X] | [X]% |
| [Op 30] | £[X] | £[X] | £[X] | £[X] | [X]% |
```

**Pareto Analysis:**
```
Rank cost drivers largest to smallest
Focus on top 20% that drive 80% of cost
```

| Rank | Cost Driver | Cost | Cumulative % |
|------|-------------|------|--------------|
| 1 | [Driver] | £[X] | [X]% |
| 2 | [Driver] | £[X] | [X]% |
| 3 | [Driver] | £[X] | [X]% |

### Step 3: Identify Reduction Opportunities

**Value Engineering Questions:**

For each major cost element, ask:
1. What function does it perform?
2. Is the function necessary?
3. What else could perform the function?
4. What does the alternative cost?

**Opportunity Categories:**

```markdown
## Material Cost Opportunities

| ID | Opportunity | Description | Est. Savings |
|----|-------------|-------------|--------------|
| M1 | Alternative material | [Details] | £[X] |
| M2 | Reduce scrap/yield | [Details] | £[X] |
| M3 | Negotiate pricing | [Details] | £[X] |
| M4 | Reduce specification | [Details] | £[X] |
| M5 | Consolidate suppliers | [Details] | £[X] |

## Labour Cost Opportunities

| ID | Opportunity | Description | Est. Savings |
|----|-------------|-------------|--------------|
| L1 | Reduce cycle time | [Details] | £[X] |
| L2 | SMED (setup reduction) | [Details] | £[X] |
| L3 | Automation | [Details] | £[X] |
| L4 | Better tooling | [Details] | £[X] |
| L5 | Process improvement | [Details] | £[X] |

## Overhead Cost Opportunities

| ID | Opportunity | Description | Est. Savings |
|----|-------------|-------------|--------------|
| O1 | Energy efficiency | [Details] | £[X] |
| O2 | Reduce floor space | [Details] | £[X] |
| O3 | Improve OEE | [Details] | £[X] |
| O4 | Reduce inventory | [Details] | £[X] |
| O5 | Preventive maintenance | [Details] | £[X] |
```

### Step 4: Apply VE Techniques

**ECSSS Framework:**

| Technique | Question | Ideas |
|-----------|----------|-------|
| **Eliminate** | Can we remove it entirely? | [Ideas] |
| **Combine** | Can we merge with another step? | [Ideas] |
| **Simplify** | Can we make it less complex? | [Ideas] |
| **Substitute** | Can we use alternatives? | [Ideas] |
| **Standardize** | Can we use common components? | [Ideas] |

**Value Analysis Matrix:**

| Feature | Function | Current Cost | Value (1-10) | Cost/Value | Action |
|---------|----------|--------------|--------------|------------|--------|
| [Feature] | [What it does] | £[X] | [1-10] | £[X] | [E/C/S/S/S] |

### Step 5: Evaluate and Prioritize

**For each opportunity:**

```markdown
## Opportunity Evaluation

**ID:** [CR-001]
**Description:** [What the opportunity is]

### Financial Analysis

| Metric | Value |
|--------|-------|
| Annual savings | £[X] |
| Implementation cost | £[X] |
| Simple payback | [X] months |
| NPV (3-year) | £[X] |
| ROI | [X]% |

### Feasibility Assessment

| Factor | Rating (1-5) | Notes |
|--------|--------------|-------|
| Technical feasibility | [X] | [Notes] |
| Resource availability | [X] | [Notes] |
| Time to implement | [X] | [Notes] |
| Risk level | [X] | [Notes] |
| Customer impact | [X] | [Notes] |
| **Average** | **[X]** | |

### Recommendation

Priority: [HIGH / MEDIUM / LOW]
```

**Prioritization Matrix:**

```
              IMPACT (Savings)
              Low    Medium   High
         ┌────────┬────────┬────────┐
    Low  │   4    │   3    │   2    │
 EFFORT  ├────────┼────────┼────────┤
  Medium │   5    │   3    │   1    │
         ├────────┼────────┼────────┤
    High │   6    │   4    │   2    │
         └────────┴────────┴────────┘

Priority 1 = Do first (high impact, low effort)
Priority 6 = Consider last
```

### Step 6: Develop Implementation Plan

```markdown
## Implementation Plan

### Quick Wins (0-3 months)

| ID | Action | Savings | Owner | Due |
|----|--------|---------|-------|-----|
| [ID] | [Action] | £[X] | [Name] | [Date] |

### Medium Term (3-6 months)

| ID | Action | Savings | Owner | Due |
|----|--------|---------|-------|-----|
| [ID] | [Action] | £[X] | [Name] | [Date] |

### Long Term (6-12 months)

| ID | Action | Savings | Owner | Due |
|----|--------|---------|-------|-----|
| [ID] | [Action] | £[X] | [Name] | [Date] |

### Resource Requirements

| Resource | Requirement | Cost |
|----------|-------------|------|
| Capital | [Equipment etc.] | £[X] |
| Labour | [Hours/FTEs] | £[X] |
| External | [Consultants etc.] | £[X] |
| **Total Investment** | | **£[X]** |
```

### Step 7: Implement and Track

**Implementation Tracking:**

```markdown
## Cost Reduction Tracker

| ID | Description | Target | Actual | Status |
|----|-------------|--------|--------|--------|
| CR-001 | [Description] | £[X] | £[X] | [Status] |
| CR-002 | [Description] | £[X] | £[X] | [Status] |
| CR-003 | [Description] | £[X] | £[X] | [Status] |
| **Total** | | **£[X]** | **£[X]** | |

**Status Key:**
- 🟢 Complete - savings verified
- 🟡 In progress - on track
- 🔴 At risk - behind plan
- ⚪ Not started
```

### Step 8: Verify Savings

**Savings Verification:**

```markdown
## Savings Verification

**ID:** CR-001
**Description:** [Description]

### Before/After Comparison

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Unit cost | £[X] | £[X] | £[X] |
| Cycle time | [X] min | [X] min | [X] min |
| Yield | [X]% | [X]% | [X]% |
| Annual cost | £[X] | £[X] | £[X] |

### Verification Method

- [ ] Standard cost update
- [ ] Actual cost comparison
- [ ] Time study
- [ ] Yield tracking
- [ ] Invoice comparison

### Sign-Off

| Role | Name | Date |
|------|------|------|
| Implemented by | | |
| Verified by | | |
| Finance approval | | |

**Verified Savings:** £[X] / year
```

## Output: Cost Reduction Summary

```markdown
# Cost Reduction Summary

**Project:** [Name]
**Period:** [Date range]
**Sponsor:** [Name]

## Results

| | Target | Achieved | % |
|-|--------|----------|---|
| Unit cost reduction | £[X] | £[X] | [X]% |
| Annual savings | £[X] | £[X] | [X]% |
| Implementation cost | £[X] | £[X] | |
| Net benefit (Year 1) | £[X] | £[X] | |

## Initiatives Completed

| ID | Initiative | Savings | Status |
|----|------------|---------|--------|
| CR-001 | [Description] | £[X] | ✓ |
| CR-002 | [Description] | £[X] | ✓ |

## Lessons Learned

- [Learning 1]
- [Learning 2]

## Sustainability

| Action to sustain | Owner |
|-------------------|-------|
| [Action] | [Name] |
| Update standards | Finance |
| Monitor monthly | Operations |
```

## Integration Points

- **QuoteEstimator:** Update rates after reduction
- **Variance Analysis:** Track improvement in variances
- **PFMEA:** Cost impact of failure modes
- **A3CriticalThinking:** Root cause for cost drivers
- **SupplyChain:** Supplier cost reduction
