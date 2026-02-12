# Make vs Buy Workflow

**Structured workflow for make vs buy cost analysis and decisions.**

## Trigger
- "Should we make or buy [item]?"
- "Outsourcing analysis for [process]"
- "Insourcing evaluation"

## Process

### Step 1: Define Scope

| Field | Value |
|-------|-------|
| Analysis ID | MVB-[Year]-[Seq] |
| Item/Process | [Description] |
| Current State | Make / Buy / New |
| Annual Volume | [Quantity] |
| Requested By | [Name] |
| Due Date | [Date] |

### Step 2: Quantify Make Cost

**Direct Costs:**

```markdown
## Make Cost Analysis

### Material Cost

| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| Raw material | [X] | £[X] | £[X] |
| Bought-out parts | [X] | £[X] | £[X] |
| Consumables | [X] | £[X] | £[X] |
| **Material Total** | | | **£[X]** |

### Labour Cost

| Operation | Time (min) | Rate (£/hr) | Cost |
|-----------|------------|-------------|------|
| [Op 10] | [X] | £[X] | £[X] |
| [Op 20] | [X] | £[X] | £[X] |
| [Op 30] | [X] | £[X] | £[X] |
| Setup (÷ batch) | [X] | £[X] | £[X] |
| **Labour Total** | [X] min | | **£[X]** |

### Variable Overhead

| Category | Basis | Rate | Cost |
|----------|-------|------|------|
| Machine overhead | [X] mh | £[X]/mh | £[X] |
| Variable utilities | [X] mh | £[X]/mh | £[X] |
| **Variable OH Total** | | | **£[X]** |
```

**Fixed Costs (if avoidable):**

```markdown
### Fixed Overhead (Avoidable)

| Category | Annual | Per Unit |
|----------|--------|----------|
| Supervision (dedicated) | £[X] | £[X] |
| Equipment depreciation | £[X] | £[X] |
| Floor space | £[X] | £[X] |
| **Fixed Total** | £[X] | **£[X]** |

Note: Only include fixed costs that would be ELIMINATED if outsourced
```

**Total Make Cost:**

| Element | Per Unit | Annual |
|---------|----------|--------|
| Material | £[X] | £[X] |
| Labour | £[X] | £[X] |
| Variable overhead | £[X] | £[X] |
| **Variable Cost** | **£[X]** | **£[X]** |
| Avoidable fixed | £[X] | £[X] |
| **Total Make Cost** | **£[X]** | **£[X]** |

### Step 3: Quantify Buy Cost

**Purchase Cost:**

```markdown
## Buy Cost Analysis

### Supplier Quotes

| Supplier | Unit Price | MOQ | Lead Time |
|----------|------------|-----|-----------|
| [Supplier A] | £[X] | [X] | [X] weeks |
| [Supplier B] | £[X] | [X] | [X] weeks |
| [Supplier C] | £[X] | [X] | [X] weeks |

**Selected Supplier:** [Name]
**Unit Price:** £[X]
```

**Additional Buy Costs:**

| Category | Calculation | Cost |
|----------|-------------|------|
| Purchase price | [Qty] × £[X] | £[X] |
| Freight (inbound) | [Method] | £[X] |
| Import duties | [If applicable] | £[X] |
| Incoming inspection | [X] min × £[X]/hr | £[X] |
| Inventory carrying | [X]% × £[X] | £[X] |
| Supplier management | [Allocation] | £[X] |
| Quality risk premium | [If applicable] | £[X] |
| **Total Buy Cost** | | **£[X]** |

### Step 4: Compare Costs

```markdown
## Cost Comparison

| Element | Make | Buy | Difference |
|---------|------|-----|------------|
| Material/Purchase | £[X] | £[X] | £[X] |
| Labour | £[X] | — | £[X] |
| Variable overhead | £[X] | — | £[X] |
| Freight/logistics | — | £[X] | £[X] |
| Incoming inspection | — | £[X] | £[X] |
| Other | £[X] | £[X] | £[X] |
| **Variable Cost** | **£[X]** | **£[X]** | **£[X]** |
| Avoidable fixed | £[X] | — | £[X] |
| **Total Relevant Cost** | **£[X]** | **£[X]** | **£[X]** |

**Cost Advantage:** [Make/Buy] by £[X] ([X]%)
```

### Step 5: Assess Qualitative Factors

```markdown
## Qualitative Assessment

| Factor | Make | Buy | Weight | Score |
|--------|------|-----|--------|-------|
| **Strategic** | | | | |
| Core competency | [H/M/L] | [H/M/L] | [1-3] | [X] |
| IP protection | [H/M/L] | [H/M/L] | [1-3] | [X] |
| Supplier dependency | N/A | [H/M/L] | [1-3] | [X] |
| **Operational** | | | | |
| Quality control | [H/M/L] | [H/M/L] | [1-3] | [X] |
| Lead time | [H/M/L] | [H/M/L] | [1-3] | [X] |
| Flexibility | [H/M/L] | [H/M/L] | [1-3] | [X] |
| Capacity utilization | [H/M/L] | N/A | [1-3] | [X] |
| **Risk** | | | | |
| Supply disruption | [H/M/L] | [H/M/L] | [1-3] | [X] |
| Quality risk | [H/M/L] | [H/M/L] | [1-3] | [X] |
| Cost stability | [H/M/L] | [H/M/L] | [1-3] | [X] |
| **Weighted Score** | **[X]** | **[X]** | | |

H = High (favourable), M = Medium, L = Low (unfavourable)
```

**Key Considerations:**

| Question | Make | Buy |
|----------|------|-----|
| Is this our core competency? | | |
| Do we have capacity? | | |
| Is quality critical? | | |
| Is IP at risk if outsourced? | | |
| Are there capable suppliers? | | |
| What's the supply chain risk? | | |

### Step 6: Break-Even Analysis

```
Break-Even Volume = Fixed Cost Difference / Variable Cost Difference

If Make has higher fixed but lower variable:
BEV = (Make Fixed - Buy Fixed) / (Buy Variable - Make Variable)
```

**Example:**
```markdown
## Break-Even Analysis

Make:
- Variable cost: £15/unit
- Fixed cost: £50,000/year

Buy:
- Variable cost: £22/unit
- Fixed cost: £5,000/year (incoming inspection setup)

Break-even = (£50,000 - £5,000) / (£22 - £15)
           = £45,000 / £7 = 6,429 units/year

At current volume of 10,000 units → Make is cheaper
Below 6,429 units → Buy is cheaper
```

### Step 7: Risk Assessment

```markdown
## Risk Analysis

### Make Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Capacity constraint | [H/M/L] | [H/M/L] | [Action] |
| Skill shortage | [H/M/L] | [H/M/L] | [Action] |
| Equipment failure | [H/M/L] | [H/M/L] | [Action] |
| Quality issues | [H/M/L] | [H/M/L] | [Action] |

### Buy Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Supplier failure | [H/M/L] | [H/M/L] | [Action] |
| Quality issues | [H/M/L] | [H/M/L] | [Action] |
| Price increases | [H/M/L] | [H/M/L] | [Action] |
| Lead time issues | [H/M/L] | [H/M/L] | [Action] |
| IP leakage | [H/M/L] | [H/M/L] | [Action] |
```

### Step 8: Make Recommendation

```markdown
## Recommendation

**Decision:** [MAKE / BUY]

### Justification

**Financial:**
- [Make/Buy] saves £[X] per unit (£[X] annually)
- Break-even volume: [X] units

**Strategic:**
- [Key strategic reason]

**Operational:**
- [Key operational reason]

**Risk:**
- [Key risk consideration]

### Implementation Plan

| Action | Owner | Due Date |
|--------|-------|----------|
| [Action 1] | [Name] | [Date] |
| [Action 2] | [Name] | [Date] |
| [Action 3] | [Name] | [Date] |

### Review

**Review Date:** [Date]
**Review Trigger:** Volume change >20%, price change >10%
```

## Output: Make vs Buy Analysis

```markdown
# Make vs Buy Analysis

**Analysis ID:** MVB-[Year]-[Seq]
**Item:** [Description]
**Date:** [Date]
**Analyst:** [Name]

## Summary

| | Make | Buy |
|-|------|-----|
| Unit cost | £[X] | £[X] |
| Annual cost | £[X] | £[X] |
| Savings | [Make/Buy] £[X] |

## Recommendation: [MAKE / BUY]

**Rationale:**
[Summary of key decision factors]

## Approval

| Role | Name | Date |
|------|------|------|
| Analyst | | |
| Operations | | |
| Finance | | |
| Approved by | | |
```

## Integration Points

- **SupplyChain:** Supplier evaluation and TCO
- **QuoteEstimator:** Make cost estimation
- **Capacity Planning:** Utilization impact
- **Quality:** Supplier quality assessment
