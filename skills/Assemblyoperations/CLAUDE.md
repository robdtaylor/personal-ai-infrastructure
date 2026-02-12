# AssemblyOperations - Extended Guidance

**Deep-dive content for complex assembly scenarios, troubleshooting, and process optimization.**

---

## Table of Contents

1. [LVA Deep Dive](#lva-deep-dive)
2. [FML Deep Dive](#fml-deep-dive)
3. [Torque Engineering](#torque-engineering)
4. [Error-Proofing Systems](#error-proofing-systems)
5. [Line Balancing Techniques](#line-balancing-techniques)
6. [Assembly Troubleshooting](#assembly-troubleshooting)
7. [Operator Training](#operator-training)
8. [Assembly Quality Tools](#assembly-quality-tools)

---

## LVA Deep Dive

### Workstation Design Principles

**Ergonomic Considerations:**
| Factor | Guideline | Verification |
|--------|-----------|--------------|
| Reach envelope | All components within 600mm | Reach study |
| Working height | Elbow height ±50mm | Adjustable bench |
| Lifting | <15kg single person | Weight marking |
| Repetition | Rotate tasks every 2 hours | Schedule |

**5S Standards:**
| Element | LVA Application |
|---------|-----------------|
| Sort | Only current job materials at station |
| Set in order | Dedicated location for each tool/component |
| Shine | Daily cleaning routine |
| Standardize | Visual controls, shadow boards |
| Sustain | Weekly 5S audit |

### Kitting Best Practices

**Kit Accuracy:**
- Target: 99.9% kit accuracy (1 error per 1000 kits)
- Verification: Barcode scan each component
- Visual: Photo of complete kit in work instruction

**Kitting Methods:**
| Method | When to Use | Pros | Cons |
|--------|-------------|------|------|
| Pre-kitting | High volume, stable BOM | Efficient, reduces line-side inventory | WIP, space |
| Point-of-use | Low volume, frequent changes | Flexible, no WIP | Operator time |
| Kanban-controlled | Repetitive, medium volume | Pull system, visual | Requires discipline |

### Assembly Sequence Documentation

**Sequence Development:**
1. Review BOM and exploded view
2. Identify logical sub-assemblies
3. Consider fastener access
4. Plan for inspection points
5. Optimize for one-piece flow
6. Document in work instruction

**Sequence Validation:**
- First article build with engineering
- Time study for balancing
- Operator feedback incorporation
- Quality gate verification

---

## FML Deep Dive

### Takt Time Management

**Takt vs. Cycle Time:**
| Term | Definition | Target |
|------|------------|--------|
| Takt time | Customer demand rate | Given by demand |
| Cycle time | Actual operation time | ≤ Takt time |
| Buffer | Takt - Cycle | >0 always |

**Takt Time Monitoring:**
```
Visual Display:
┌─────────────────────────────────┐
│ STATION 3 - FINAL ASSEMBLY      │
│                                 │
│ Takt Time:     9:00             │
│ Current Cycle: 8:45 ✓           │
│ Units Today:   47 / 50          │
│                                 │
│ [■■■■■■■■■■░░░░░] 94%          │
└─────────────────────────────────┘
```

**Andon System:**
| Color | Meaning | Response |
|-------|---------|----------|
| Green | Normal operation | Continue |
| Yellow | Behind takt, assistance needed | Team lead responds |
| Red | Line stop | Supervisor + support |

### Line Stop Authority

**Who Can Stop the Line:**
- Any operator detecting quality issue
- Team lead for process deviation
- Quality for escaping defect
- Safety for hazard

**Line Stop Protocol:**
1. Pull andon cord / press button
2. Complete current cycle if safe
3. Verbally announce issue
4. Team lead responds within 30 seconds
5. Assess: fix in takt or escalate
6. Document on production log

### SMED Advanced Techniques

**Internal to External Conversion:**
| Internal Activity | External Alternative |
|-------------------|---------------------|
| Get tools | Pre-stage tool cart |
| Adjust settings | Pre-set on spare tooling |
| Program change | Pre-load programs |
| First article inspection | Prepare inspection fixtures |

**Parallel Operations:**
- Two-person changeover for large setups
- Checklist-driven to ensure nothing missed
- Video standard changeover for training

**Elimination Techniques:**
| Technique | Application |
|-----------|-------------|
| Quick-release clamps | Replace bolts |
| Standardized heights | Eliminate shimming |
| Intermediate jigs | Reduce alignment time |
| Color coding | Reduce selection time |

---

## Torque Engineering

### Joint Classification

**Safety Critical (SC):**
- Failure could cause injury
- Example: Suspension fasteners, brake components
- Requirement: 100% electronic monitoring, angle verification

**Critical (C):**
- Failure affects function
- Example: Structural connections
- Requirement: Electronic monitoring

**Standard:**
- General assembly
- Requirement: Calibrated tool, operator verification

### Torque Specification Development

**Factors in Torque Calculation:**
| Factor | Consideration |
|--------|---------------|
| Fastener grade | Yield strength |
| Thread size | Stress area |
| Surface finish | Friction coefficient |
| Lubrication | K-factor adjustment |
| Joint type | Hard vs. soft joint |

**Torque-Angle Monitoring:**
```
Torque-Angle Curve:
     Torque
       │
       │         ╱──── Yield
       │        ╱
       │       ╱
       │      ╱
       │     ╱  ← Target angle
       │    ╱
       │   ╱
       │  ╱
       │ ╱
       └──────────────────── Angle
          Snug    Target
```

### Torque Tool Management

**Calibration Requirements:**
| Tool Type | Calibration Frequency | Tolerance |
|-----------|----------------------|-----------|
| Electronic | 6 months + after repair | ±2% |
| Click-type | 6 months + 5000 cycles | ±4% |
| Dial-type | 6 months | ±4% |

**Tool Selection by Application:**
| Application | Recommended Tool |
|-------------|------------------|
| Safety critical | DC electric, transducer-equipped |
| Critical, high volume | Pulse tool with monitoring |
| Standard, low volume | Click-type torque wrench |
| Audit verification | Dial-type torque wrench |

### Torque Verification

**Verification Methods:**
| Method | Use Case | Frequency |
|--------|----------|-----------|
| Mark and visual | Post-assembly check | 100% |
| Breakaway test | Audit verification | Sampling |
| Ultrasonic | Critical joints | As specified |
| Data download | Electronic tools | Every assembly |

**Audit Protocol:**
1. Select sample per control plan
2. Apply breakaway torque
3. Record peak torque
4. Compare to specification
5. Document results
6. React to failures per reaction plan

---

## Error-Proofing Systems

### Poka-Yoke Design Levels

**Level 1 - Prevention (Best):**
- Error cannot physically occur
- Example: Asymmetric connector, keyed fixture

**Level 2 - Detection Before:**
- Error detected before proceeding
- Example: Presence sensor confirms component

**Level 3 - Detection After:**
- Error detected after occurrence
- Example: Vision inspection after assembly

### Poka-Yoke Verification

**Daily Verification Checklist:**
```markdown
## Poka-Yoke Daily Verification

**Date:** [Date]
**Line:** [Line ID]
**Operator:** [Name]

| Station | Device | Test Method | Pass? | Notes |
|---------|--------|-------------|-------|-------|
| 1 | Presence sensor | Present known-bad | ☐ | |
| 1 | Label scanner | Scan wrong part | ☐ | |
| 2 | Vision system | Present defect sample | ☐ | |
| 3 | Torque monitor | Run with error | ☐ | |

**All Pass:** ☐ **Supervisor:** ____________
```

**Failed Poka-Yoke Response:**
1. Stop production at that station
2. Notify maintenance and quality
3. Verify containment of suspect units
4. Do not restart until repaired and re-verified

### Common Poka-Yoke Applications

| Assembly Error | Poka-Yoke Solution |
|----------------|-------------------|
| Wrong part | Barcode verification |
| Missing part | Parts presence sensors |
| Wrong orientation | Asymmetric design/fixture |
| Incomplete torque | Electronic tool interlock |
| Sequence skip | Process interlock |
| Wrong quantity | Count sensors/pick-to-light |

---

## Line Balancing Techniques

### Yamazumi Chart (Stack Chart)

**Creating a Yamazumi:**
1. List all tasks at each station
2. Measure time for each task
3. Stack tasks to show total cycle time
4. Compare to takt time
5. Identify imbalance

```
Time (sec)
60 │ ─ ─ ─ ─ ─ Takt ─ ─ ─ ─ ─ ─ ─
   │ ┌───┐
50 │ │ D │ ┌───┐
   │ ├───┤ │ F │ ┌───┐
40 │ │ C │ ├───┤ │ G │ ┌───┐
   │ ├───┤ │ E │ ├───┤ │ I │
30 │ │ B │ ├───┤ │ H │ ├───┤
   │ ├───┤ │ D │ └───┘ │ J │
20 │ │   │ └───┘       ├───┤
   │ │ A │             │ K │
10 │ ├───┤             └───┘
   │ └───┘
 0 └──────────────────────────────
     Sta 1  Sta 2  Sta 3  Sta 4
```

### Rebalancing Process

**When to Rebalance:**
- Takt time change (demand change)
- Productivity improvement
- Product mix change
- Quality issue at bottleneck

**Rebalancing Steps:**
1. Current state time study
2. Create Yamazumi chart
3. Identify redistribution options
4. Simulate new balance
5. Update work instructions
6. Train operators
7. Trial run and adjust

### Multi-Product Line Balancing

**Mixed Model Production:**
| Product | Takt | Daily Qty | Sequence |
|---------|------|-----------|----------|
| A | 9 min | 30 | AABAA... |
| B | 9 min | 20 | ...B...B |

**Heijunka (Leveling):**
- Spread product variants across shift
- Avoid long runs of single variant
- Reduces changeover batching
- Balances workload

---

## Assembly Troubleshooting

### Troubleshooting Decision Tree

```
Issue Detected
      │
      ▼
┌─────────────┐    Yes    ┌──────────────┐
│ Safety risk? │────────▶│ STOP. Isolate │
└─────────────┘          │ Call safety   │
      │ No               └──────────────┘
      ▼
┌─────────────┐    Yes    ┌──────────────┐
│ Can fix in  │────────▶│ Fix and       │
│ takt time?  │          │ continue      │
└─────────────┘          └──────────────┘
      │ No
      ▼
┌─────────────┐    Yes    ┌──────────────┐
│ Affects     │────────▶│ Pull andon    │
│ downstream? │          │ Tag and hold  │
└─────────────┘          └──────────────┘
      │ No
      ▼
┌─────────────────────────────┐
│ Complete, move unit to      │
│ rework area. Log issue.     │
└─────────────────────────────┘
```

### Common Issues and Solutions

**Fit/Interference Issues:**
| Symptom | Check | Action |
|---------|-------|--------|
| Component won't seat | Dimension, burrs | Inspect, deburr, escalate |
| Excessive force needed | Tolerance stack | Measure, sort, escalate |
| Inconsistent fit | Supplier variation | Incoming inspection |

**Torque Issues:**
| Symptom | Check | Action |
|---------|-------|--------|
| Can't achieve torque | Thread condition | Inspect, replace fastener |
| Torque achieved early | Lubrication | Check spec, verify coating |
| Angle out of spec | Joint condition | Inspect mating surfaces |

**Test Failures:**
| Test | Common Cause | Resolution |
|------|--------------|------------|
| Leak test | Seal damage, wrong seal | Inspect seal, replace |
| Electrical | Connector not seated | Verify click, re-seat |
| Functional | Assembly sequence error | Review WI compliance |

---

## Operator Training

### Training Program Structure

**New Operator Path:**
| Week | Focus | Verification |
|------|-------|--------------|
| 1 | Safety, quality basics, 5S | Quiz |
| 2-3 | Work instruction review | Written test |
| 4-6 | Supervised assembly | Direct observation |
| 7-8 | Solo with monitoring | Quality metrics |
| 9+ | Independent | Ongoing metrics |

**Skill Level Progression:**
| Level | Criteria | Badge |
|-------|----------|-------|
| Trainee | In training | White |
| Qualified | Can perform solo | Green |
| Certified | Can train others | Blue |
| Expert | Process improvement | Gold |

### On-the-Job Training

**Training Documentation:**
```markdown
## OJT Record

**Trainee:** [Name]
**Trainer:** [Name]
**Operation:** [WI Number]
**Date Started:** [Date]

### Training Steps

| Step | Demonstrated | Practiced | Verified | Date |
|------|-------------|-----------|----------|------|
| 1 | ☐ | ☐ | ☐ | |
| 2 | ☐ | ☐ | ☐ | |
| 3 | ☐ | ☐ | ☐ | |

### Competency Assessment

| Criteria | Pass | Fail | Notes |
|----------|------|------|-------|
| Follows WI sequence | ☐ | ☐ | |
| Quality checkpoint adherence | ☐ | ☐ | |
| Takt time compliance | ☐ | ☐ | |
| Traceability recording | ☐ | ☐ | |

**Trainer Sign-off:** ____________ **Date:** ______
**Quality Sign-off:** ____________ **Date:** ______
```

### Retraining Triggers

| Trigger | Retraining Scope |
|---------|------------------|
| Quality escape | Specific operation |
| Extended absence (>30 days) | Full station |
| Process change | Affected steps |
| New product introduction | Full product |
| Failed audit | As identified |

---

## Assembly Quality Tools

### In-Process Verification

**Verification Points:**
| Stage | What to Verify | Method |
|-------|----------------|--------|
| Kit received | Component presence, quantity | Visual, scan |
| Sub-assembly | Critical dimensions | Go/no-go gage |
| Main assembly | Torque, connections | Electronic feedback |
| End-of-line | Function, leak, electrical | Automated test |

### Defect Logging

**Standard Defect Categories:**
| Code | Category | Examples |
|------|----------|----------|
| D01 | Damaged | Scratch, dent, crack |
| D02 | Missing | Component absent |
| D03 | Wrong part | Incorrect variant |
| D04 | Torque | Under/over specification |
| D05 | Fit | Interference, gap |
| D06 | Test fail | Leak, electrical, function |
| D07 | Cosmetic | Surface, appearance |

### First Article Inspection

**FAI Requirements:**
| When | Scope |
|------|-------|
| Start of shift | First unit all characteristics |
| After changeover | First unit all characteristics |
| After break (>30 min) | Critical characteristics |
| After tool change | Affected characteristics |

**FAI Documentation:**
- Record inspection results
- Retain sample for shift comparison
- Sign-off before production release

---

## Continuous Improvement

### Assembly Kaizen Focus Areas

| Area | Target | Method |
|------|--------|--------|
| Cycle time | Reduce variation | Motion study |
| Quality | Zero defects | Poka-yoke enhancement |
| Changeover | SMED | Time study, parallel ops |
| Ergonomics | Reduce strain | Workstation redesign |
| 5S | Sustain standards | Audit and action |

### Daily Problem Solving

**Shift Start Meeting:**
- Review previous shift issues
- Confirm poka-yoke verification
- Discuss day's priorities
- Quality alerts/reminders

**End-of-Shift:**
- Summarize issues encountered
- Update defect log
- Communicate to next shift
- Close out production log

---

## Key Metrics

### Assembly KPIs

| KPI | Calculation | Target | Frequency |
|-----|-------------|--------|-----------|
| First pass yield | Good / Total attempted | >98% | Daily |
| Takt attainment | Units / Target units | >95% | Hourly |
| OEE | Availability × Performance × Quality | >85% | Daily |
| Defect rate | Defects / Units | <0.5% | Daily |
| Kit accuracy | Correct kits / Total kits | >99.9% | Weekly |
| Changeover time | Actual vs. standard | Within standard | Per event |

### Visual Management

**Production Board:**
```
┌────────────────────────────────────────────┐
│ LINE 2 - FML ASSEMBLY                      │
├────────────────────────────────────────────┤
│ Hour │ Plan │ Actual │ Cumulative │ Status │
│──────┼──────┼────────┼────────────┼────────│
│ 06-07│   6  │   6    │     6      │  ✓     │
│ 07-08│   6  │   5    │    11      │  ✗     │
│ 08-09│   6  │   7    │    18      │  ✓     │
├────────────────────────────────────────────┤
│ Issues: Station 2 - component fit (08:15)  │
│ Action: Engineering notified               │
└────────────────────────────────────────────┘
```
