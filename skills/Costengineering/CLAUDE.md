# CostEngineering - Extended Guidance

**Deep-dive content for complex cost analysis, rate setting, and reduction programmes.**

---

## Table of Contents

1. [Overhead Rate Development](#overhead-rate-development)
2. [Activity-Based Costing](#activity-based-costing)
3. [Variance Analysis Deep Dive](#variance-analysis-deep-dive)
4. [Cost Reduction Programme](#cost-reduction-programme)
5. [Target Costing Methodology](#target-costing-methodology)
6. [Cost of Quality Integration](#cost-of-quality-integration)
7. [Learning Curve Effects](#learning-curve-effects)
8. [Cost Estimation for New Products](#cost-estimation-for-new-products)

---

## Overhead Rate Development

### Annual Rate Setting Process

**Timeline:**
| Month | Activity |
|-------|----------|
| Oct | Gather departmental budgets |
| Nov | Estimate activity levels (hours) |
| Nov | Calculate preliminary rates |
| Dec | Management review and approval |
| Jan | Implement new rates |

### Manufacturing Overhead Budget

**Overhead Categories:**

| Category | Subcategory | Annual Budget |
|----------|-------------|---------------|
| **Indirect Labour** | | |
| | Supervisors | £120,000 |
| | Material handlers | £80,000 |
| | Maintenance technicians | £90,000 |
| | Quality inspectors | £70,000 |
| **Utilities** | | |
| | Electricity | £150,000 |
| | Gas | £30,000 |
| | Water/effluent | £15,000 |
| **Depreciation** | | |
| | Equipment | £200,000 |
| | Tooling | £50,000 |
| | Building improvements | £40,000 |
| **Maintenance** | | |
| | Repairs | £80,000 |
| | PM contracts | £45,000 |
| | Spare parts | £35,000 |
| **Consumables** | | |
| | Cutting tools | £100,000 |
| | Coolant/lubricants | £25,000 |
| | Abrasives | £15,000 |
| **Facility** | | |
| | Rent/rates | £180,000 |
| | Insurance | £40,000 |
| | Security | £20,000 |
| **Total Manufacturing Overhead** | | **£1,385,000** |

### Departmental Rate Calculation

**Machine Shop Example:**

```markdown
## Machine Shop Overhead Rate

**Annual Overhead Budget:** £850,000
**Estimated Machine Hours:** 22,000 hrs
**Estimated Direct Labour Hours:** 18,000 hrs

### Rate Options

| Method | Calculation | Rate |
|--------|-------------|------|
| Machine Hour | £850,000 / 22,000 | £38.64/mh |
| Labour Hour | £850,000 / 18,000 | £47.22/dlh |
| Combined | Weighted average | £42.50/hr |

### Selected Rate: Machine Hour Basis

**Rationale:** CNC operations are more machine-intensive than
labour-intensive. Machine hours better reflect resource consumption.

**Applied Rate:** £39.00/machine hour (rounded)
```

### Rate Validation

**Sanity Checks:**
| Check | Method | Acceptable Range |
|-------|--------|------------------|
| Historical comparison | vs. prior year | ±10% |
| Industry benchmark | vs. published data | ±20% |
| Recovery test | Apply to forecast volume | 95-105% absorbed |
| Margin test | Product cost vs. price | Target margin achieved |

---

## Activity-Based Costing

### ABC vs Traditional Costing

| Aspect | Traditional | ABC |
|--------|-------------|-----|
| Cost pools | Few (dept level) | Many (activity level) |
| Cost drivers | Volume-based | Activity-based |
| Accuracy | Lower for diverse products | Higher for diverse products |
| Complexity | Simple | Complex |
| Best for | Homogeneous products | Varied product mix |

### ABC Implementation

**Step 1: Identify Activities**

| Activity | Description |
|----------|-------------|
| Machine setup | Changeover between products |
| Machining | Actual cutting time |
| Inspection | Quality verification |
| Material handling | Moving materials/WIP |
| Engineering support | Process/quality engineering |
| Scheduling | Production planning |

**Step 2: Assign Costs to Activities**

| Activity | Annual Cost | Cost Driver |
|----------|-------------|-------------|
| Machine setup | £180,000 | Number of setups |
| Machining | £600,000 | Machine hours |
| Inspection | £120,000 | Inspection hours |
| Material handling | £80,000 | Number of moves |
| Engineering support | £150,000 | Engineering hours |
| Scheduling | £60,000 | Number of orders |

**Step 3: Calculate Activity Rates**

| Activity | Cost | Driver Volume | Rate |
|----------|------|---------------|------|
| Machine setup | £180,000 | 3,000 setups | £60/setup |
| Machining | £600,000 | 22,000 mh | £27.27/mh |
| Inspection | £120,000 | 4,000 hrs | £30/hr |
| Material handling | £80,000 | 8,000 moves | £10/move |
| Engineering support | £150,000 | 5,000 hrs | £30/hr |
| Scheduling | £60,000 | 2,500 orders | £24/order |

**Step 4: Apply to Products**

```markdown
## ABC Product Cost: Part XYZ

| Activity | Driver | Qty | Rate | Cost |
|----------|--------|-----|------|------|
| Setup | Setups | 0.1 | £60 | £6.00 |
| Machining | MH | 0.5 | £27.27 | £13.64 |
| Inspection | Hrs | 0.2 | £30 | £6.00 |
| Material handling | Moves | 3 | £10 | £30.00 |
| Engineering | Hrs | 0.05 | £30 | £1.50 |
| Scheduling | Orders | 0.02 | £24 | £0.48 |
| **Overhead Total** | | | | **£57.62** |

Traditional rate (£39 × 0.5 mh): £19.50
ABC reveals true cost driver: Material handling
```

---

## Variance Analysis Deep Dive

### Material Variances

**Price Variance:**
```
MPV = (Actual Price - Standard Price) × Actual Quantity Purchased

Example:
Standard price: £5.00/kg
Actual price: £5.25/kg
Quantity purchased: 1,000 kg

MPV = (£5.25 - £5.00) × 1,000 = £250 Unfavourable
```

**Causes of Material Price Variance:**
| Cause | Investigation |
|-------|---------------|
| Market price change | Compare to commodity index |
| Supplier change | Review sourcing decision |
| Quality specification | Check material specification |
| Order quantity | Check volume discount impact |
| Rush orders | Review planning effectiveness |

**Quantity/Usage Variance:**
```
MQV = (Actual Qty Used - Standard Qty Allowed) × Standard Price

Example:
Standard usage: 0.5 kg/unit
Actual usage: 0.55 kg/unit
Units produced: 2,000
Standard price: £5.00/kg

Standard allowed: 2,000 × 0.5 = 1,000 kg
Actual used: 2,000 × 0.55 = 1,100 kg
MQV = (1,100 - 1,000) × £5.00 = £500 Unfavourable
```

**Causes of Material Quantity Variance:**
| Cause | Investigation |
|-------|---------------|
| Scrap/yield | Review scrap reports |
| Machine issues | Check maintenance records |
| Operator skill | Review training records |
| Material quality | Check incoming inspection |
| Standard error | Validate standard accuracy |

### Labour Variances

**Rate Variance:**
```
LRV = (Actual Rate - Standard Rate) × Actual Hours

Example:
Standard rate: £50/hr (burdened)
Actual rate: £52/hr
Actual hours: 500

LRV = (£52 - £50) × 500 = £1,000 Unfavourable
```

**Causes of Labour Rate Variance:**
| Cause | Investigation |
|-------|---------------|
| Wage increase | Check payroll changes |
| Overtime premium | Review scheduling |
| Skill mix | Higher grade operators used |
| Benefit changes | Check HR records |

**Efficiency Variance:**
```
LEV = (Actual Hours - Standard Hours Allowed) × Standard Rate

Example:
Standard time: 0.25 hr/unit
Units produced: 2,000
Actual hours: 550
Standard rate: £50/hr

Standard allowed: 2,000 × 0.25 = 500 hrs
LEV = (550 - 500) × £50 = £2,500 Unfavourable
```

**Causes of Labour Efficiency Variance:**
| Cause | Investigation |
|-------|---------------|
| Learning curve | New product/operator |
| Machine downtime | Review OEE data |
| Setup time | Check changeover records |
| Rework | Review quality data |
| Standard error | Time study validation |

### Overhead Variances

**Two-Way Analysis:**
```
Spending Variance = Actual Overhead - Flexible Budget
Volume Variance = Flexible Budget - Applied Overhead

Example:
Actual overhead: £95,000
Budgeted overhead: £90,000
Actual hours: 2,400
Standard hours allowed: 2,200
Overhead rate: £40/hr

Flexible budget: Fixed £50,000 + (Variable £20 × 2,400) = £98,000
Applied overhead: 2,200 × £40 = £88,000

Spending: £95,000 - £98,000 = £3,000 Favourable
Volume: £98,000 - £88,000 = £10,000 Unfavourable
```

---

## Cost Reduction Programme

### Structured Approach

**Phase 1: Analysis (Weeks 1-2)**
1. Gather cost data by product/process
2. Pareto analysis (80/20)
3. Identify top cost drivers
4. Benchmark against targets

**Phase 2: Ideation (Weeks 3-4)**
1. Cross-functional team sessions
2. Apply VE/VA techniques
3. Generate cost reduction ideas
4. Initial feasibility assessment

**Phase 3: Evaluation (Weeks 5-6)**
1. Detailed cost-benefit analysis
2. Risk assessment
3. Prioritize by ROI/effort
4. Develop implementation plan

**Phase 4: Implementation (Ongoing)**
1. Assign owners and deadlines
2. Track progress weekly
3. Validate savings achieved
4. Sustain and standardize

### Cost Reduction Ideas by Category

**Material Cost Reduction:**
| Idea | Typical Savings | Effort |
|------|-----------------|--------|
| Alternative material | 5-20% | Medium |
| Negotiate with supplier | 3-10% | Low |
| Reduce scrap/yield loss | 2-8% | Medium |
| Consolidate purchasing | 5-15% | Medium |
| Reduce material specification | 3-10% | Low |

**Labour Cost Reduction:**
| Idea | Typical Savings | Effort |
|------|-----------------|--------|
| Improve cycle time | 5-15% | Medium |
| Reduce setup time (SMED) | 10-50% setup | High |
| Automation | 20-50% labour | High |
| Better tooling | 5-20% | Medium |
| Training/skill improvement | 5-10% | Low |

**Overhead Cost Reduction:**
| Idea | Typical Savings | Effort |
|------|-----------------|--------|
| Energy efficiency | 5-15% utilities | Medium |
| Preventive maintenance | 10-30% repairs | Medium |
| Consolidate equipment | 10-20% depreciation | High |
| Improve OEE | 5-15% per point | Medium |
| Reduce inventory | Carrying cost savings | Medium |

### Cost Reduction Tracking

```markdown
## Cost Reduction Register

| ID | Description | Category | Annual Savings | Status | Owner |
|----|-------------|----------|----------------|--------|-------|
| CR-001 | Renegotiate steel price | Material | £15,000 | Complete | Purchasing |
| CR-002 | SMED on Line 2 | Labour | £8,000 | In Progress | Production |
| CR-003 | LED lighting upgrade | Overhead | £5,000 | Planned | Facilities |

**YTD Savings Achieved:** £18,500
**YTD Target:** £25,000
**Gap:** £6,500 (26%)
```

---

## Target Costing Methodology

### Target Costing Process

```
Market Research → Target Price → Target Margin → Target Cost
       ↓              ↓              ↓              ↓
   Customer      Competitive     Strategy      Design to
   needs         pricing        requirement    cost target
```

### Target Cost Calculation

```markdown
## Target Cost Analysis

**Product:** New Widget Assembly
**Market Price (competitive):** £75.00
**Required Margin:** 30%

### Target Cost Derivation

| Element | Value |
|---------|-------|
| Target selling price | £75.00 |
| Required margin (30%) | £22.50 |
| **Target cost** | **£52.50** |

### Current Estimated Cost

| Element | Estimate | % of Total |
|---------|----------|------------|
| Material | £28.00 | 47% |
| Labour | £18.00 | 30% |
| Overhead | £14.00 | 23% |
| **Total** | **£60.00** | 100% |

### Cost Gap Analysis

| | Target | Estimate | Gap |
|-|--------|----------|-----|
| Total | £52.50 | £60.00 | £7.50 (12.5%) |

### Cost Reduction Targets by Element

| Element | Current | Target | Reduction |
|---------|---------|--------|-----------|
| Material | £28.00 | £25.00 | £3.00 (11%) |
| Labour | £18.00 | £15.00 | £3.00 (17%) |
| Overhead | £14.00 | £12.50 | £1.50 (11%) |
| **Total** | £60.00 | £52.50 | £7.50 (12.5%) |
```

### Design-to-Cost Techniques

| Technique | Application |
|-----------|-------------|
| DFM (Design for Manufacturability) | Reduce conversion cost |
| DFA (Design for Assembly) | Reduce assembly time |
| Modular design | Enable commonality |
| Material substitution | Reduce material cost |
| Tolerance optimization | Reduce process cost |
| Part count reduction | Reduce complexity |

---

## Cost of Quality Integration

### COQ Categories

| Category | Examples | Target % of Sales |
|----------|----------|-------------------|
| **Prevention** | Training, process control, supplier qual | 1-2% |
| **Appraisal** | Inspection, testing, calibration | 1-2% |
| **Internal Failure** | Scrap, rework, reinspection | <1% |
| **External Failure** | Warranty, returns, complaints | <0.5% |

### COQ Cost Drivers

**Link to PFMEA:**
| PFMEA Severity | Potential Cost Impact |
|----------------|----------------------|
| 9-10 | £10,000+ per occurrence |
| 7-8 | £1,000-10,000 |
| 5-6 | £100-1,000 |
| 1-4 | <£100 |

**Prevention Investment ROI:**
```
Every £1 spent on prevention typically saves £10 in failure costs

Example:
- SPC implementation cost: £5,000
- Scrap reduction achieved: 2%
- Annual scrap before: £100,000
- Annual savings: £2,000
- Simple payback: 2.5 years
- But: Avoids customer escapes worth £50,000+ risk
```

---

## Learning Curve Effects

### Learning Curve Theory

```
Yn = Y1 × n^b

Where:
Yn = Time for nth unit
Y1 = Time for first unit
n = Unit number
b = log(learning rate) / log(2)

For 80% learning curve: b = log(0.80) / log(2) = -0.322
```

### Learning Curve Table (80%)

| Unit | Time (% of first) | Cumulative Avg |
|------|-------------------|----------------|
| 1 | 100% | 100% |
| 2 | 80% | 90% |
| 4 | 64% | 78% |
| 8 | 51% | 67% |
| 16 | 41% | 58% |
| 32 | 33% | 50% |

### Application in Costing

**New Product Quote:**
```
First article time: 2.0 hours
Assumed learning: 80%
Quote quantity: 100 units

Steady-state time (after 32 units): 2.0 × 0.33 = 0.66 hrs
Blended average for 100 units: ~0.55 hrs

Quote at steady-state rate with learning curve adjustment
```

---

## Cost Estimation for New Products

### Analogous Estimating

```
New part cost ≈ Similar part cost × Complexity factor

Example:
Similar part cost: £25.00
Complexity adjustment:
- 20% more features: ×1.20
- Tighter tolerance: ×1.10
Estimated cost: £25 × 1.20 × 1.10 = £33.00
```

### Parametric Estimating

```
Cost = f(parameters)

Example for machined parts:
Cost = (Material × Weight) + (Complexity × Volume) + (Tolerance factor)

Where:
- Material factor: £/kg by material type
- Complexity: 1.0-3.0 based on features
- Tolerance factor: 1.0-2.0 based on tightest tolerance
```

### Bottom-Up Estimating

Build cost from detailed operations:

```markdown
## Detailed Estimate

| Op | Description | Machine | Time | Rate | Cost |
|----|-------------|---------|------|------|------|
| 10 | Cut bar stock | Saw | 2 min | £30 | £1.00 |
| 20 | Turn OD | CNC Lathe | 8 min | £85 | £11.33 |
| 30 | Mill features | VMC | 12 min | £90 | £18.00 |
| 40 | Deburr | Manual | 5 min | £50 | £4.17 |
| 50 | Inspect | CMM | 10 min | £60 | £10.00 |
| **Total Conversion** | | | 37 min | | **£44.50** |
```

---

## Key Reference Documents

| Document | Location |
|----------|----------|
| QuoteEstimator Skill | `~/.claude/skills/Quoteestimator/SKILL.md` |
| SupplyChain Skill | `~/.claude/skills/Supplychain/SKILL.md` |
| Should-Cost Template | `~/.claude/skills/Supplychain/templates/should-cost.md` |
| COQ Reduction Plan | `~/projects/work/docs/COQ-Reduction-Plan-2026.md` |
