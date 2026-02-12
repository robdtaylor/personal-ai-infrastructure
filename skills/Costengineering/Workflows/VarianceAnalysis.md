# Variance Analysis Workflow

**Structured workflow for analyzing and investigating cost variances.**

## Trigger
- "Analyze cost variance"
- "Investigate material/labour variance"
- "Monthly variance report"

## Process

### Step 1: Gather Data

| Field | Value |
|-------|-------|
| Analysis Period | [Month/Quarter] |
| Cost Centre | [Department] |
| Product(s) | [All or specific] |
| Analyst | [Name] |
| Date | [Date] |

### Step 2: Calculate Material Variances

**Material Price Variance (MPV):**
```
MPV = (Actual Price - Standard Price) × Actual Quantity Purchased

Data Needed:
- Standard price: £[X.XX]/unit (from cost standards)
- Actual price: £[X.XX]/unit (from invoices)
- Actual quantity: [X] units (from receiving)
```

| Material | Std Price | Act Price | Act Qty | Variance |
|----------|-----------|-----------|---------|----------|
| [Mat A] | £[X] | £[X] | [X] | £[X] |
| [Mat B] | £[X] | £[X] | [X] | £[X] |
| **Total MPV** | | | | **£[X]** |

**Material Quantity Variance (MQV):**
```
MQV = (Actual Qty Used - Standard Qty Allowed) × Standard Price

Standard Qty Allowed = Units Produced × Standard Qty per Unit
```

| Material | Std Qty | Act Qty | Std Price | Variance |
|----------|---------|---------|-----------|----------|
| [Mat A] | [X] | [X] | £[X] | £[X] |
| [Mat B] | [X] | [X] | £[X] | £[X] |
| **Total MQV** | | | | **£[X]** |

### Step 3: Calculate Labour Variances

**Labour Rate Variance (LRV):**
```
LRV = (Actual Rate - Standard Rate) × Actual Hours

Data Needed:
- Standard rate: £[X]/hr (burdened rate)
- Actual rate: Actual labour cost / Actual hours
- Actual hours: From time records
```

| Dept | Std Rate | Act Rate | Act Hours | Variance |
|------|----------|----------|-----------|----------|
| [Dept] | £[X] | £[X] | [X] | £[X] |
| **Total LRV** | | | | **£[X]** |

**Labour Efficiency Variance (LEV):**
```
LEV = (Actual Hours - Standard Hours Allowed) × Standard Rate

Standard Hours Allowed = Units Produced × Standard Time per Unit
```

| Product | Std Hrs | Act Hrs | Std Rate | Variance |
|---------|---------|---------|----------|----------|
| [Prod A] | [X] | [X] | £[X] | £[X] |
| [Prod B] | [X] | [X] | £[X] | £[X] |
| **Total LEV** | | | | **£[X]** |

### Step 4: Calculate Overhead Variances

**Spending Variance:**
```
Spending Variance = Actual Overhead - Flexible Budget

Flexible Budget = Fixed OH + (Variable rate × Actual activity)
```

**Volume Variance:**
```
Volume Variance = Flexible Budget - Applied Overhead

Applied Overhead = Standard hours × Predetermined rate
```

| Overhead | Budget | Actual | Absorbed | Spend Var | Vol Var |
|----------|--------|--------|----------|-----------|---------|
| Mfg OH | £[X] | £[X] | £[X] | £[X] | £[X] |
| **Total** | £[X] | £[X] | £[X] | **£[X]** | **£[X]** |

### Step 5: Summarize Variances

```markdown
## Variance Summary - [Period]

| Category | Variance | Fav/Unfav | % of Std |
|----------|----------|-----------|----------|
| Material Price | £[X] | [F/U] | [X]% |
| Material Quantity | £[X] | [F/U] | [X]% |
| **Total Material** | **£[X]** | [F/U] | [X]% |
| Labour Rate | £[X] | [F/U] | [X]% |
| Labour Efficiency | £[X] | [F/U] | [X]% |
| **Total Labour** | **£[X]** | [F/U] | [X]% |
| OH Spending | £[X] | [F/U] | [X]% |
| OH Volume | £[X] | [F/U] | [X]% |
| **Total Overhead** | **£[X]** | [F/U] | [X]% |
| **NET VARIANCE** | **£[X]** | [F/U] | [X]% |
```

### Step 6: Identify Investigation Priorities

**Investigation Thresholds:**

| Variance Type | Threshold | Current | Investigate? |
|---------------|-----------|---------|--------------|
| Material Price | >5% or >£500 | [X]% / £[X] | Y/N |
| Material Quantity | >3% or >£300 | [X]% / £[X] | Y/N |
| Labour Rate | >3% or >£200 | [X]% / £[X] | Y/N |
| Labour Efficiency | >5% or >£500 | [X]% / £[X] | Y/N |
| Overhead | >£1,000 | £[X] | Y/N |

### Step 7: Investigate Root Causes

**For each variance exceeding threshold:**

```markdown
## Variance Investigation

**Variance:** [Type - Amount]
**Product/Area:** [Where occurred]

### 5 Whys Analysis

| Why | Question | Answer |
|-----|----------|--------|
| 1 | Why did variance occur? | |
| 2 | Why? | |
| 3 | Why? | |
| 4 | Why? | |
| 5 | Why? | |

**Root Cause:** [Statement]

### Contributing Factors

- [ ] Process issue
- [ ] Material issue
- [ ] Equipment issue
- [ ] Training/skill gap
- [ ] Standard inaccurate
- [ ] External factor
- [ ] Other: [specify]

### Evidence

[What data supports the root cause?]
```

**Common Causes Reference:**

| Variance | Common Causes |
|----------|---------------|
| Material Price (U) | Market increase, rush order, supplier change |
| Material Price (F) | Negotiation, alternative source, volume discount |
| Material Qty (U) | Scrap, yield loss, machine issue, operator error |
| Material Qty (F) | Process improvement, better material quality |
| Labour Rate (U) | Overtime, skill mix, wage increase |
| Labour Rate (F) | Lower grade operators, efficiency bonus |
| Labour Eff (U) | Downtime, rework, learning curve, setup issues |
| Labour Eff (F) | Process improvement, operator skill, better tooling |
| OH Spending (U) | Maintenance, utilities, unexpected costs |
| OH Volume (U) | Low production volume |

### Step 8: Recommend Actions

```markdown
## Corrective Actions

| Variance | Root Cause | Action | Owner | Due |
|----------|------------|--------|-------|-----|
| [Type] | [Cause] | [Action] | [Name] | [Date] |

## Standard Updates Required

| Standard | Current | Proposed | Justification |
|----------|---------|----------|---------------|
| [Material X price] | £[X] | £[X] | [Reason] |
| [Labour std time] | [X] hrs | [X] hrs | [Reason] |
```

## Output: Variance Report

```markdown
# Monthly Cost Variance Report

**Period:** [Month Year]
**Prepared By:** [Name]
**Date:** [Date]

## Executive Summary

| | Favourable | Unfavourable | Net |
|-|------------|--------------|-----|
| Material | £[X] | £[X] | £[X] |
| Labour | £[X] | £[X] | £[X] |
| Overhead | £[X] | £[X] | £[X] |
| **Total** | **£[X]** | **£[X]** | **£[X]** |

**Key Findings:**
1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

## Detailed Analysis

[Include variance calculations and investigation findings]

## Actions

| # | Action | Owner | Due | Status |
|---|--------|-------|-----|--------|
| 1 | | | | |

## Trends

| Variance | M-3 | M-2 | M-1 | Current |
|----------|-----|-----|-----|---------|
| Material | £[X] | £[X] | £[X] | £[X] |
| Labour | £[X] | £[X] | £[X] | £[X] |
| Overhead | £[X] | £[X] | £[X] | £[X] |

**Distribution:**
- Finance Manager
- Operations Manager
- Department Supervisors
```

## Integration Points

- **A3CriticalThinking:** Root cause analysis format
- **SupplyChain:** Material price investigations
- **Production:** Efficiency investigations
- **Maintenance:** Overhead spending analysis
