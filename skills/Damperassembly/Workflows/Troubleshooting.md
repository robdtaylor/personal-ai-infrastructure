# Troubleshooting Workflow

**Structured workflow for diagnosing and resolving damper assembly and test issues.**

## Trigger
- "Damper test failure"
- "Troubleshoot damper problem"
- "Investigate damper defect"

## Process

### Step 1: Document the Problem

| Field | Value |
|-------|-------|
| Serial Number | [S/N] |
| Part Number | [P/N] |
| Build Date | [Date] |
| Operator | [Name] |
| Test Date | [Date] |
| Problem Type | Assembly / Test / Customer Return |

**Problem Description:**
- What was observed?
- When did it occur?
- How was it detected?

### Step 2: Classify the Issue

**Issue Categories:**

| Category | Examples |
|----------|----------|
| **Leak** | External fluid leak, gas leak |
| **Force Low** | Below spec at one or more velocities |
| **Force High** | Above spec at one or more velocities |
| **Force Unstable** | Inconsistent readings, noise |
| **Ratio Out** | C/R ratio outside band |
| **Assembly Defect** | Component damage, missing parts |

### Step 3: Gather Data

**Build Record Review:**
- [ ] Fluid volume recorded: [X] ml
- [ ] Gas pressure recorded: [X] bar
- [ ] All torques recorded and within spec
- [ ] Component lot numbers documented
- [ ] Any notes or deviations

**Test Data Review:**
- [ ] Leak test result
- [ ] Force at each velocity
- [ ] Comparison to specification
- [ ] Previous units from same batch

### Step 4: Troubleshooting by Symptom

---

### LEAK ISSUES

**External Fluid Leak:**

| Location | Possible Cause | Check | Action |
|----------|----------------|-------|--------|
| Rod seal | Seal damage | Visual, stroke test | Replace seal |
| Rod seal | Rod surface damage | Inspect rod | Replace rod |
| Body threads | Insufficient torque | Check torque | Retorque |
| Body threads | Thread damage | Inspect threads | Replace component |
| Body threads | Gasket damage | Remove, inspect | Replace gasket |
| Fill port | Cap not sealed | Inspect cap | Reseal/replace |

**Gas Leak:**

| Location | Possible Cause | Check | Action |
|----------|----------------|-------|--------|
| Charge valve | Valve damage | Soap test | Replace valve |
| Seals | Seal damage | Soap test, pressure decay | Replace seals |
| Welds/joints | Manufacturing defect | Soap test | Scrap/return |

---

### FORCE LOW (All Velocities)

```
Symptom: Force low across all test points
         Both compression and rebound affected

┌─────────────────────────────────────────┐
│           FORCE LOW - ALL               │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
┌────────┐  ┌──────────┐  ┌──────────┐
│ Fluid  │  │ Gas      │  │ Seal     │
│ Low    │  │ Low      │  │ Bypass   │
└────────┘  └──────────┘  └──────────┘
```

| Check | Method | If Found |
|-------|--------|----------|
| Fluid volume | Review build record, weigh unit | Top up or rebuild |
| Gas pressure | Check build record, measure | Recharge |
| Seal bypass | Strip, inspect seals | Replace seals |

---

### FORCE HIGH (All Velocities)

```
Symptom: Force high across all test points
         Both compression and rebound affected
```

| Check | Method | If Found |
|-------|--------|----------|
| Excess fluid | Review build record, weigh | Drain excess |
| High gas pressure | Check build record, measure | Bleed pressure |
| Port obstruction | Strip, inspect valves | Clean or replace |
| Wrong valve | Verify P/N vs specification | Replace with correct |

---

### FORCE LOW (Specific Velocity)

**Low Speed Only (0.05-0.1 m/s):**
- Check: Bleed orifice obstruction
- Check: Valve preload incorrect

**High Speed Only (0.5-1.0 m/s):**
- Check: Main valve stuck open
- Check: Port damage/enlargement

---

### FORCE UNSTABLE / NOISE

```
Symptom: Force readings inconsistent cycle-to-cycle
         Possible noise during operation
```

| Check | Method | If Found |
|-------|--------|----------|
| Air in fluid | Cycle damper, listen | Re-vacuum fill |
| Low gas pressure | Check pressure | Recharge |
| Valve sticking | Strip, inspect | Clean or replace |
| Contamination | Inspect fluid | Flush and refill |

---

### RATIO OUT OF SPECIFICATION

```
Symptom: Individual forces may be OK
         Compression/Rebound ratio outside band
```

| Check | Method | If Found |
|-------|--------|----------|
| Wrong comp. valve | Verify P/N | Replace |
| Wrong reb. valve | Verify P/N | Replace |
| Valve installed incorrectly | Strip, check orientation | Reinstall |
| Valve damage | Inspect ports | Replace |

---

### Step 5: Root Cause Analysis

**5 Whys:**

| Why | Question | Answer |
|-----|----------|--------|
| 1 | Why did the failure occur? | [Answer] |
| 2 | Why [Answer 1]? | [Answer] |
| 3 | Why [Answer 2]? | [Answer] |
| 4 | Why [Answer 3]? | [Answer] |
| 5 | Why [Answer 4]? | [Root Cause] |

**Root Cause Category:**
- [ ] Operator error
- [ ] Process issue
- [ ] Equipment issue
- [ ] Component defect
- [ ] Design issue
- [ ] Test error

### Step 6: Corrective Action

**Immediate (Containment):**

| Action | Owner | Complete |
|--------|-------|----------|
| [Action to contain issue] | [Name] | ☐ |

**Corrective (Fix root cause):**

| Action | Owner | Due Date |
|--------|-------|----------|
| [Action to prevent recurrence] | [Name] | [Date] |

### Step 7: Disposition

**Unit Disposition:**

| Option | Criteria | Action |
|--------|----------|--------|
| **Rework** | Repairable, cost-effective | Perform rework, retest |
| **Scrap** | Not repairable | Complete scrap form |
| **Deviation** | Out-of-spec but usable | Obtain engineering approval |
| **Return to Supplier** | Component issue | RMA process |

### Step 8: Documentation

**Complete NCR if Required:**
- Nonconformance description
- Root cause
- Corrective action
- Verification of effectiveness

**Update Records:**
- [ ] Build record annotated
- [ ] Test record annotated
- [ ] NCR created (if applicable)
- [ ] Trend data updated

## Output: Troubleshooting Report

```markdown
# Damper Troubleshooting Report

**Serial Number:** [S/N]
**Part Number:** [P/N]
**Date:** [Date]
**Investigator:** [Name]

## Problem Summary

**Symptom:** [Description]
**Detection Point:** [Assembly / Test / Customer]

## Investigation

### Data Reviewed

| Parameter | Specification | Actual |
|-----------|---------------|--------|
| Fluid volume | [X] ml | [Y] ml |
| Gas pressure | [X] bar | [Y] bar |
| Test result | [Spec] | [Actual] |

### Checks Performed

| Check | Result | Finding |
|-------|--------|---------|
| [Check 1] | [Result] | [Finding] |
| [Check 2] | [Result] | [Finding] |

## Root Cause

**Root Cause:** [Statement]

**Category:** [Operator / Process / Equipment / Component / Design]

## Corrective Action

| Action | Owner | Due | Status |
|--------|-------|-----|--------|
| [Action] | [Name] | [Date] | [Status] |

## Disposition

**Unit:** ☐ Rework ☐ Scrap ☐ Deviation ☐ Return

## Prevention

| Action to Prevent Recurrence | Owner | Due |
|------------------------------|-------|-----|
| [Action] | [Name] | [Date] |

**Report By:** _____________ Date: _______
**Reviewed By:** ____________ Date: _______
```

## Common Issues Quick Reference

| Symptom | First Check | Second Check | Third Check |
|---------|-------------|--------------|-------------|
| Leak at rod | Seal condition | Rod surface | Gland torque |
| Force low (all) | Fluid volume | Gas pressure | Seal bypass |
| Force high (all) | Excess fluid | High gas | Port blocked |
| Force unstable | Air in fluid | Gas pressure | Valve stick |
| Ratio out | Valve P/N | Valve orientation | Valve damage |
| Noise | Gas pressure | Air in fluid | Bearing wear |

## Reference Documents

- PFMEA-71-001: Damper Assembly PFMEA
- WI-71-003: Damper Assembly (for procedure verification)
- WI-71-004: Functional Testing (for test verification)
- A3CriticalThinking skill (for complex issues)
