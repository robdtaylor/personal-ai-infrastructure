---
name: Costengineering
description: Manufacturing cost accounting, analysis, and reduction for automotive operations. Covers overhead/burden rate calculation, variance analysis, make vs buy decisions, value engineering, and cycle time to cost conversion. USE WHEN user says 'cost analysis', 'overhead rate', 'burden rate', 'variance analysis', 'make vs buy', 'value engineering', 'cost reduction', 'should cost', 'labour rate', or needs manufacturing cost guidance.
---

# CostEngineering

Manufacturing cost accounting, analysis, and reduction methodologies for MNMUK operations. Complements QuoteEstimator (quick quotes) and SupplyChain (strategic sourcing) with detailed cost engineering.

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **OverheadCalculation** | "overhead rate", "burden rate", "labour rate" | `Workflows/OverheadCalculation.md` |
| **VarianceAnalysis** | "cost variance", "variance investigation" | `Workflows/VarianceAnalysis.md` |
| **MakeVsBuy** | "make vs buy", "insource", "outsource" | `Workflows/MakeVsBuy.md` |
| **CostReduction** | "cost reduction", "value engineering" | `Workflows/CostReduction.md` |

## Cost Accounting Fundamentals

### Cost Structure

```
┌─────────────────────────────────────────────────────┐
│                 TOTAL PRODUCT COST                  │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐   │
│  │           MANUFACTURING COST                │   │
│  │  ┌───────────────────────────────────────┐  │   │
│  │  │         PRIME COST                    │  │   │
│  │  │  ┌─────────────┐  ┌─────────────┐    │  │   │
│  │  │  │  Direct     │  │  Direct     │    │  │   │
│  │  │  │  Material   │  │  Labour     │    │  │   │
│  │  │  └─────────────┘  └─────────────┘    │  │   │
│  │  └───────────────────────────────────────┘  │   │
│  │  ┌───────────────────────────────────────┐  │   │
│  │  │      Manufacturing Overhead           │  │   │
│  │  │  (Indirect labour, utilities,         │  │   │
│  │  │   depreciation, maintenance)          │  │   │
│  │  └───────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │              SG&A Overhead                  │   │
│  │  (Sales, admin, quality, engineering)      │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Cost Categories

| Category | Examples | Behaviour |
|----------|----------|-----------|
| **Direct Material** | Raw material, bought-out components | Variable |
| **Direct Labour** | Operator time on product | Variable |
| **Manufacturing Overhead** | Supervision, utilities, depreciation | Mixed |
| **SG&A** | Sales, admin, quality | Fixed |

### Labour Rate Structure

| Rate Type | Components | Use |
|-----------|------------|-----|
| **Direct Labour Rate** | Wages + benefits | Actual operator cost |
| **Burdened Labour Rate** | Direct + manufacturing overhead | Product costing |
| **Fully Burdened Rate** | Burdened + SG&A allocation | Pricing |

**MNMUK Labour Rate Build-Up:**
```
Base Hourly Wage                    £15.00
+ Employer NI (13.8%)               £ 2.07
+ Pension (5%)                      £ 0.75
+ Holiday accrual                   £ 1.44
+ Training allowance                £ 0.50
─────────────────────────────────────────
= Direct Labour Rate                £19.76

+ Manufacturing Overhead (150%)     £29.64
─────────────────────────────────────────
= Burdened Labour Rate              £49.40

+ SG&A (25%)                        £12.35
─────────────────────────────────────────
= Fully Burdened Rate               £61.75
```

### Machine Hour Rates

| Cost Centre | Machine Rate | Labour Rate | Combined |
|-------------|--------------|-------------|----------|
| CNC Turning | £35/hr | £50/hr | £85/hr |
| CNC Milling | £40/hr | £50/hr | £90/hr |
| 5-Axis | £65/hr | £55/hr | £120/hr |
| Swiss | £55/hr | £55/hr | £110/hr |
| EDM | £45/hr | £50/hr | £95/hr |
| Assembly | £10/hr | £50/hr | £60/hr |

## Overhead Rate Calculation

### Manufacturing Overhead Components

| Category | Examples | Allocation Base |
|----------|----------|-----------------|
| Indirect Labour | Supervisors, material handlers | Direct labour hours |
| Utilities | Electric, gas, water | Machine hours |
| Depreciation | Equipment, tooling | Machine hours |
| Maintenance | Repairs, PM | Machine hours |
| Consumables | Cutting tools, coolant | Machine hours |
| Facility | Rent, rates, insurance | Floor space |

### Overhead Rate Formula

```
Predetermined Overhead Rate = Estimated Overhead / Estimated Activity

Example:
Annual Manufacturing Overhead:    £1,200,000
Estimated Machine Hours:          30,000 hrs
────────────────────────────────────────────
Overhead Rate:                    £40/machine hour
```

### Absorption vs Actual

| Term | Definition |
|------|------------|
| **Absorbed Overhead** | Hours worked × Predetermined rate |
| **Actual Overhead** | Real costs incurred |
| **Over-absorption** | Absorbed > Actual (favourable) |
| **Under-absorption** | Absorbed < Actual (unfavourable) |

## Product Cost Calculation

### Standard Cost Build

```markdown
## Product Cost Sheet

**Part Number:** [P/N]
**Description:** [Name]
**Effective Date:** [Date]

### Material Cost

| Component | Qty | Unit Cost | Extended |
|-----------|-----|-----------|----------|
| Raw material | [kg] | £[X]/kg | £[X.XX] |
| Bought-out parts | [#] | £[X.XX] | £[X.XX] |
| **Material Total** | | | **£[X.XX]** |

### Conversion Cost

| Operation | Time (min) | Rate (£/hr) | Cost |
|-----------|------------|-------------|------|
| Op 10 - Turn | [X] | £85 | £[X.XX] |
| Op 20 - Mill | [X] | £90 | £[X.XX] |
| Op 30 - Inspect | [X] | £60 | £[X.XX] |
| **Conversion Total** | [X] min | | **£[X.XX]** |

### Cost Summary

| Element | Cost | % |
|---------|------|---|
| Material | £[X.XX] | [X]% |
| Conversion | £[X.XX] | [X]% |
| **Standard Cost** | **£[X.XX]** | 100% |
```

### Yield and Scrap Impact

```
Gross Material Cost = Net Material × (1 / Yield %)

Example:
Net material required:     0.5 kg
Material yield:           85%
Gross material:           0.5 / 0.85 = 0.588 kg
Scrap cost:               0.088 kg × £5/kg = £0.44
```

## Variance Analysis

### Variance Types

| Variance | Formula | Favourable When |
|----------|---------|-----------------|
| **Material Price** | (Actual - Standard Price) × Actual Qty | Actual < Standard |
| **Material Quantity** | (Actual - Standard Qty) × Standard Price | Actual < Standard |
| **Labour Rate** | (Actual - Standard Rate) × Actual Hours | Actual < Standard |
| **Labour Efficiency** | (Actual - Standard Hours) × Standard Rate | Actual < Standard |
| **Overhead Spending** | Actual - Budgeted | Actual < Budget |
| **Overhead Volume** | Budgeted - Absorbed | Absorbed > Budget |

### Investigation Thresholds

| Variance Type | Investigate If |
|---------------|----------------|
| Material Price | >5% or >£500 |
| Material Quantity | >3% or >£300 |
| Labour Rate | >3% or >£200 |
| Labour Efficiency | >5% or >£500 |
| Overhead | >£1,000/month |

## Make vs Buy Analysis

### Decision Framework

```
┌────────────────────────────────────────┐
│          MAKE VS BUY DECISION          │
├────────────────────────────────────────┤
│                                        │
│  Make Cost = Variable + (Fixed/Volume) │
│  Buy Cost = Purchase Price + Logistics │
│                                        │
│  If Make < Buy AND Capacity Available  │
│     → MAKE                             │
│  If Buy < Make OR No Capacity          │
│     → BUY                              │
│                                        │
└────────────────────────────────────────┘
```

### Cost Comparison Template

| Element | Make | Buy |
|---------|------|-----|
| Material | £[X] | Included |
| Direct Labour | £[X] | — |
| Variable Overhead | £[X] | — |
| Purchase Price | — | £[X] |
| Freight/logistics | — | £[X] |
| Incoming inspection | — | £[X] |
| **Variable Cost** | **£[X]** | **£[X]** |
| Fixed Overhead (avoidable) | £[X] | — |
| **Total Relevant Cost** | **£[X]** | **£[X]** |

### Qualitative Factors

| Factor | Make | Buy |
|--------|------|-----|
| Capacity utilization | Increases | No change |
| Quality control | Direct | Relies on supplier |
| Lead time | Internal control | Supplier-dependent |
| IP protection | Better | Risk of exposure |
| Flexibility | Higher | Lower |
| Capital requirement | Higher | Lower |

## Cost Reduction Methodologies

### Value Engineering (VE)

**FAST Diagram Approach:**
- **F**unction - What does it do?
- **A**nalysis - Why is it needed?
- **S**ystem - How does it work?
- **T**echnique - Can it be done differently?

**VE Questions:**
1. What is the function?
2. What does it cost?
3. What else can perform the function?
4. What does the alternative cost?

### Cost Reduction Techniques

| Technique | Application | Typical Savings |
|-----------|-------------|-----------------|
| **Eliminate** | Remove unnecessary features | 5-20% |
| **Combine** | Merge operations | 3-10% |
| **Simplify** | Reduce complexity | 5-15% |
| **Substitute** | Alternative materials/processes | 5-25% |
| **Standardize** | Use common components | 3-10% |

### Target Costing

```
Target Cost = Market Price - Required Margin

Example:
Market price:          £50.00
Required margin:       25%
Target cost:           £37.50
Current cost:          £42.00
Cost gap:              £4.50 (12% reduction needed)
```

## Integration with Other Skills

| Skill | Integration |
|-------|-------------|
| **QuoteEstimator** | Use cycle times, apply overhead rates |
| **SupplyChain** | Should-cost analysis, TCO |
| **Pfmea** | Cost impact of failure modes |
| **Controlplan** | Inspection cost allocation |
| **Spc** | Cost of variation |
| **A3criticalthinking** | Root cause of cost variances |

## Key Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Conversion cost ratio | Conversion / Total cost | <60% |
| Material yield | Good output / Input | >95% |
| Labour efficiency | Standard / Actual hours | >90% |
| Overhead absorption | Absorbed / Actual | 98-102% |
| Cost variance | (Actual - Standard) / Standard | <±5% |

## Examples

**Example 1: Calculate product cost**
```
User: "What's the full cost for part ABC-123?"
→ Gather material cost (raw + BOPs)
→ Calculate conversion (cycle time × rates)
→ Apply overhead absorption
→ Build standard cost sheet
→ Compare to quote price for margin
```

**Example 2: Investigate cost variance**
```
User: "Labour efficiency is 85% this month - why?"
→ Pull actual vs standard hours by product
→ Identify largest variances
→ Analyze root causes (setup, rework, learning)
→ Recommend corrective actions
→ Update standards if appropriate
```

**Example 3: Make vs Buy decision**
```
User: "Should we outsource the grinding operation?"
→ Calculate internal cost (variable + avoidable fixed)
→ Gather supplier quotes
→ Include logistics and quality costs
→ Assess capacity impact
→ Consider qualitative factors
→ Make recommendation with payback
```
