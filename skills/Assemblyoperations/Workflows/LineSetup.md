# Line Setup Workflow

**Structured workflow for production line setup and changeover using SMED principles.**

## Trigger
- "Line setup for [product]"
- "Changeover procedure"
- "SMED improvement"

## Process

### Step 1: Changeover Planning

Document the changeover:

| Field | Value |
|-------|-------|
| Line | [Line ID] |
| Current Product | [Current P/N] |
| New Product | [Target P/N] |
| Scheduled Time | [Date/Time] |
| Target Duration | [Minutes] |
| Changeover Lead | [Name] |

### Step 2: Pre-Changeover Preparation (External Setup)

**While Line Still Running:**

| Activity | Owner | Status |
|----------|-------|--------|
| Stage incoming materials | Materials | ☐ |
| Prepare tools/fixtures | Setup tech | ☐ |
| Verify work instructions at hand | Supervisor | ☐ |
| Confirm first article inspector available | Quality | ☐ |
| Pre-set adjustable tooling | Setup tech | ☐ |
| Load program (if applicable) | Setup tech | ☐ |
| Notify operators of timing | Supervisor | ☐ |

**Material Staging:**
```markdown
## Pre-Staged Materials

| Item | Quantity | Location | Verified |
|------|----------|----------|----------|
| [Kit/component] | [Qty] | [Where] | ☐ |
| [Fixture] | [#] | [Where] | ☐ |
| [Tooling] | [#] | [Where] | ☐ |
| Work instructions | [Rev] | [Where] | ☐ |
```

### Step 3: Line Stop and Clear

**Shutdown Sequence:**

1. Complete last unit in process
2. Stop line at defined point
3. Clear all in-process WIP
4. Remove outgoing product materials
5. Clear fixtures and tools

**Clearance Verification:**
- [ ] All previous product removed from line
- [ ] Work area cleaned
- [ ] No mixed product risk

### Step 4: Internal Setup Activities

**Fixture/Tooling Changes:**

| Station | Remove | Install | Time Est |
|---------|--------|---------|----------|
| 1 | [Item] | [Item] | [Min] |
| 2 | [Item] | [Item] | [Min] |
| 3 | [Item] | [Item] | [Min] |

**Changeover Steps:**

```markdown
## Changeover Checklist

**Station 1:**
- [ ] Remove fixture A, store in rack
- [ ] Install fixture B from staging
- [ ] Verify fixture seated and locked
- [ ] Connect pneumatic/electrical (if applicable)

**Station 2:**
- [ ] Remove tooling, return to crib
- [ ] Install new tooling per setup sheet
- [ ] Set torque tool to [X] Nm
- [ ] Verify tool operation

**Station 3:**
- [ ] Update HMI for new product
- [ ] Verify program loaded
- [ ] Check safety interlocks

**All Stations:**
- [ ] Update work instructions displayed
- [ ] Verify product identification labels
- [ ] Reset counters
```

### Step 5: Settings and Adjustments

**Parameter Settings:**

| Station | Parameter | Setting | Method |
|---------|-----------|---------|--------|
| 1 | Fixture height | [Value] | Gage block |
| 2 | Torque setting | [Nm] | Tool display |
| 3 | Test parameters | [Values] | HMI entry |

**Adjustment Minimization:**
- Use standardized fixture heights
- Pre-set tooling where possible
- Color-code settings by product
- Document all settings for repeatability

### Step 6: Poka-Yoke Verification

**Verify All Error-Proofing:**

| Station | Device | Test Method | Pass |
|---------|--------|-------------|------|
| 1 | Presence sensor | Block with hand | ☐ |
| 2 | Wrong part detect | Present wrong part | ☐ |
| 3 | Sequence interlock | Skip step | ☐ |

**All poka-yoke must pass before production release.**

### Step 7: First Article Run

**First Article Procedure:**

1. Run first unit through line
2. Full inspection at each station
3. Complete all quality checks
4. Document all measurements
5. Compare to specification
6. Obtain quality sign-off

**First Article Record:**
```markdown
## First Article Inspection

**Product:** [P/N]
**Serial:** [First unit S/N]
**Date:** [Date]

| Characteristic | Specification | Actual | Pass |
|----------------|---------------|--------|------|
| [Dim 1] | [Spec] | [Measured] | ☐ |
| [Dim 2] | [Spec] | [Measured] | ☐ |
| [Torque] | [Spec] | [Actual] | ☐ |
| [Function] | [Requirement] | [Result] | ☐ |

**Quality Approval:** ____________ Date: ______
**Production Release:** ☐
```

### Step 8: Production Release

**Release Criteria:**
- [ ] All setup complete
- [ ] Poka-yoke verified
- [ ] First article approved
- [ ] Operators briefed
- [ ] Materials staged
- [ ] Documentation current

**Release Authorization:**
```
Production released by: [Supervisor name]
Date/Time: [DateTime]
First production serial: [S/N]
```

## Output: Changeover Summary

```markdown
# Changeover Summary

**Line:** [Line ID]
**From:** [Previous product]
**To:** [New product]
**Date:** [Date]

## Timing

| Phase | Planned | Actual | Variance |
|-------|---------|--------|----------|
| Pre-setup (external) | [Min] | [Min] | [Min] |
| Internal changeover | [Min] | [Min] | [Min] |
| First article | [Min] | [Min] | [Min] |
| **Total** | **[Min]** | **[Min]** | **[Min]** |

## Verification

- [ ] Setup complete
- [ ] Poka-yoke verified
- [ ] First article approved
- [ ] Production released

## Issues Encountered

| Issue | Resolution | Time Impact |
|-------|------------|-------------|
| [Issue] | [Fix] | [+/- Min] |

## Improvement Opportunities

- [Observation for future SMED]

**Completed By:** [Setup Lead]
**Verified By:** [Supervisor]
```

## SMED Improvement Process

### Current State Analysis

**Video the Changeover:**
1. Record entire changeover
2. Document each activity
3. Classify as internal or external
4. Time each activity

**Activity Classification:**
```markdown
| Step | Activity | Internal/External | Time |
|------|----------|-------------------|------|
| 1 | Get tools | External | 5 min |
| 2 | Remove fixture | Internal | 3 min |
| 3 | Find next fixture | External | 4 min |
| 4 | Install fixture | Internal | 3 min |
```

### Convert Internal to External

| Internal Activity | External Alternative |
|-------------------|---------------------|
| Get tools | Pre-stage tool cart |
| Find fixture | Pre-position at line |
| Program change | Pre-load on spare controller |
| Adjustment | Pre-set on setup fixture |

### Streamline Internal Activities

| Technique | Application |
|-----------|-------------|
| Quick-release | Replace bolts with cams/clamps |
| Parallel operations | Two-person changeover |
| One-touch setting | Eliminate adjustment |
| Standardization | Common fixture heights |

### Target Setting

| Stage | Target |
|-------|--------|
| Current state | Document baseline |
| Quick wins | 50% reduction |
| Optimized | Single-digit minutes |
| Ideal | Zero changeover |

## Integration Points

- **Control Plan:** Changeover verification requirements
- **Work Instructions:** Setup sheet maintenance
- **Training:** Operator changeover qualification
- **Maintenance:** Fixture and tooling PM
