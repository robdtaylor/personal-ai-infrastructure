# Overhead Calculation Workflow

**Structured workflow for calculating and validating overhead/burden rates.**

## Trigger
- "Calculate overhead rate"
- "Set burden rate for [department]"
- "Labour rate build-up"

## Process

### Step 1: Define Scope

| Field | Value |
|-------|-------|
| Rate Period | [Year/Quarter] |
| Department/Cost Centre | [Name] |
| Rate Type | Machine Hour / Labour Hour / Combined |
| Preparer | [Name] |
| Date | [Date] |

### Step 2: Gather Overhead Budget

**Manufacturing Overhead Categories:**

```markdown
## Overhead Budget - [Cost Centre]

| Category | Monthly | Annual |
|----------|---------|--------|
| **Indirect Labour** | | |
| Supervisors | £[X] | £[X] |
| Material handlers | £[X] | £[X] |
| Maintenance | £[X] | £[X] |
| Quality/inspection | £[X] | £[X] |
| **Subtotal** | £[X] | £[X] |
| | | |
| **Utilities** | | |
| Electricity | £[X] | £[X] |
| Gas | £[X] | £[X] |
| Water | £[X] | £[X] |
| **Subtotal** | £[X] | £[X] |
| | | |
| **Depreciation** | | |
| Equipment | £[X] | £[X] |
| Tooling | £[X] | £[X] |
| Leasehold improvements | £[X] | £[X] |
| **Subtotal** | £[X] | £[X] |
| | | |
| **Maintenance** | | |
| Repairs | £[X] | £[X] |
| PM contracts | £[X] | £[X] |
| Spare parts | £[X] | £[X] |
| **Subtotal** | £[X] | £[X] |
| | | |
| **Consumables** | | |
| Cutting tools | £[X] | £[X] |
| Coolant/lubricants | £[X] | £[X] |
| Abrasives | £[X] | £[X] |
| **Subtotal** | £[X] | £[X] |
| | | |
| **Facility Allocation** | | |
| Rent/rates | £[X] | £[X] |
| Insurance | £[X] | £[X] |
| Security | £[X] | £[X] |
| **Subtotal** | £[X] | £[X] |
| | | |
| **TOTAL OVERHEAD** | **£[X]** | **£[X]** |
```

### Step 3: Estimate Activity Level

**Capacity Analysis:**

| Metric | Calculation | Value |
|--------|-------------|-------|
| Available hours/machine | Days × Shifts × Hours | [X] |
| Number of machines | [Count] | [X] |
| Total available hours | Available × Machines | [X] |
| Utilization target | [%] | [X]% |
| **Practical capacity** | Total × Utilization | **[X] hrs** |

**Labour Hours:**

| Metric | Calculation | Value |
|--------|-------------|-------|
| FTEs in department | [Count] | [X] |
| Hours per FTE/year | 52 weeks × [X] hrs - holidays | [X] |
| Total labour hours | FTEs × Hours | [X] hrs |
| Productive time | [%] | [X]% |
| **Direct labour hours** | Total × Productive % | **[X] hrs** |

### Step 4: Calculate Overhead Rate

**Option A: Machine Hour Rate**
```
Machine Hour Rate = Annual Overhead / Annual Machine Hours

£[Annual Overhead] / [Machine Hours] = £[X.XX]/machine hour
```

**Option B: Labour Hour Rate**
```
Labour Hour Rate = Annual Overhead / Annual Direct Labour Hours

£[Annual Overhead] / [DLH] = £[X.XX]/direct labour hour
```

**Option C: Combined Rate**
```
Consider: Which cost driver better reflects resource consumption?

- Capital-intensive operations → Machine hour rate
- Labour-intensive operations → Labour hour rate
- Mixed → Weighted combination
```

### Step 5: Build Burdened Labour Rate

**Labour Rate Build-Up:**

```markdown
## Burdened Labour Rate

| Component | Calculation | Value |
|-----------|-------------|-------|
| Base hourly wage | [Average] | £[X.XX] |
| + Employer NI (13.8%) | Base × 13.8% | £[X.XX] |
| + Pension contribution | Base × [X]% | £[X.XX] |
| + Holiday accrual | Base × [X]% | £[X.XX] |
| + Sick pay provision | Base × [X]% | £[X.XX] |
| + Training allowance | [Amount] | £[X.XX] |
| **= Direct Labour Rate** | | **£[X.XX]** |
| | | |
| + Manufacturing overhead | [OH Rate] × [Factor] | £[X.XX] |
| **= Burdened Labour Rate** | | **£[X.XX]** |
| | | |
| + SG&A allocation | Burdened × [X]% | £[X.XX] |
| **= Fully Burdened Rate** | | **£[X.XX]** |
```

### Step 6: Validate Rates

**Validation Checks:**

| Check | Method | Result |
|-------|--------|--------|
| Prior year comparison | New vs. old rate | [+/- X]% |
| Industry benchmark | vs. published data | Within range? |
| Recovery test | Rate × Forecast volume | [X]% absorbed |
| Product cost test | Apply to key products | Margins reasonable? |

**Recovery Calculation:**
```
Forecast machine hours: [X] hrs
Calculated rate: £[X]/hr
Expected absorption: [Hours] × £[Rate] = £[X]

vs. Budgeted overhead: £[X]
Difference: £[X] ([X]%)

Target: 98-102% absorption
```

### Step 7: Approval and Implementation

**Approval:**

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Prepared by | | | |
| Reviewed by | | | |
| Approved by | | | |

**Implementation:**
- [ ] Update ERP system rates
- [ ] Communicate to estimating/quoting
- [ ] Update product cost standards
- [ ] Effective date: [Date]

## Output: Rate Summary

```markdown
# Overhead Rate Summary

**Cost Centre:** [Name]
**Effective Period:** [Date range]
**Approved By:** [Name]
**Date:** [Date]

## Rates

| Rate Type | Value |
|-----------|-------|
| Machine hour rate | £[X.XX]/mh |
| Direct labour rate | £[X.XX]/hr |
| Burdened labour rate | £[X.XX]/hr |
| Fully burdened rate | £[X.XX]/hr |

## Key Assumptions

| Assumption | Value |
|------------|-------|
| Annual machine hours | [X] hrs |
| Annual direct labour hours | [X] hrs |
| Utilization rate | [X]% |
| Total overhead budget | £[X] |

## Comparison to Prior Year

| Rate | Prior | Current | Change |
|------|-------|---------|--------|
| Machine hour | £[X] | £[X] | [+/-X]% |
| Burdened labour | £[X] | £[X] | [+/-X]% |

## Review Schedule

**Next Review:** [Date]
**Review Triggers:** Volume change >10%, major cost change
```

## Monthly Reconciliation

Track actual vs absorbed overhead monthly:

```markdown
## Overhead Reconciliation - [Month]

| | Budget | Actual | Variance |
|-|--------|--------|----------|
| Overhead incurred | £[X] | £[X] | £[X] |
| Hours worked | [X] | [X] | [X] |
| Overhead absorbed | £[X] | £[X] | £[X] |
| **Over/(Under) absorption** | | | **£[X]** |

**Variance Analysis:**
- Spending variance: £[X] [Fav/Unfav]
- Volume variance: £[X] [Fav/Unfav]
```

## Integration Points

- **QuoteEstimator:** Use rates in quotes
- **Product Costing:** Standard cost calculation
- **Variance Analysis:** Monthly absorption tracking
- **Budgeting:** Annual planning cycle
