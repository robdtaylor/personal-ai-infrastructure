# Torque Operations Workflow

**Structured workflow for torque-controlled fastening operations in assembly.**

## Trigger
- "Torque operation for [joint]"
- "Fastening specification"
- "Torque verification"

## Process

### Step 1: Joint Identification

Document the joint:

| Field | Value |
|-------|-------|
| Assembly | [Assembly name] |
| Joint ID | [Unique identifier] |
| Drawing Reference | [Drawing/position] |
| Classification | Safety Critical / Critical / Standard |

### Step 2: Torque Specification

**Gather Joint Parameters:**

| Parameter | Value | Source |
|-----------|-------|--------|
| Fastener | [M size, grade, coating] | Drawing |
| Torque specification | [X ± Y Nm] | Engineering |
| Angle specification | [If applicable, X ± Y°] | Engineering |
| Sequence | [Order if multiple fasteners] | Engineering |
| Tool | [Tool ID, type] | Control Plan |

**Joint Classification Criteria:**

| Class | Definition | Requirements |
|-------|------------|--------------|
| **Safety Critical** | Failure could cause injury | 100% monitoring, angle, audit |
| **Critical** | Failure affects function | 100% monitoring |
| **Standard** | General assembly | Calibrated tool, operator check |

### Step 3: Tool Selection and Verification

**Tool Selection:**

| Joint Class | Recommended Tool | Monitoring |
|-------------|------------------|------------|
| Safety Critical | DC electric, angle capable | Real-time + data logging |
| Critical | DC electric or pulse | Real-time + data logging |
| Standard | Click wrench or pulse | Operator verification |

**Pre-Operation Checks:**
- [ ] Tool calibration current (check sticker)
- [ ] Correct socket/bit attached
- [ ] Tool setting matches specification
- [ ] Reaction arm in place (if required)
- [ ] Data connection active (if electronic)

### Step 4: Torque Operation

**Standard Procedure:**

1. **Prepare Joint**
   - Verify components aligned
   - Confirm fastener correct (grade, length)
   - Check thread condition (no damage, debris)

2. **Position Fastener**
   - Start threads by hand (prevents cross-threading)
   - Run down to snug (finger tight + 1/4 turn)

3. **Apply Final Torque**
   - Position tool perpendicular to fastener
   - Apply smooth, continuous pull
   - Hold at torque for 1 second
   - Release

4. **Verify**
   - Electronic: Confirm OK signal
   - Click wrench: Confirm click felt
   - Visual: Apply torque mark if required

**Multi-Fastener Pattern:**

```
Pattern Example (4-bolt):
        1          Sequence: 1-2-3-4
    4       2      (Cross pattern)
        3

Torque in stages:
Pass 1: 50% torque
Pass 2: 100% torque
Pass 3: Final verify (sequential)
```

### Step 5: Torque Verification

**Verification Methods:**

| Method | Application | Frequency |
|--------|-------------|-----------|
| Electronic feedback | Primary verification | 100% |
| Mark and visual | Audit trail | 100% |
| Breakaway audit | Sampling verification | Per Control Plan |
| Ultrasonic | Critical joints | As specified |

**Breakaway Audit Procedure:**
1. Select sample per control plan
2. Apply breakaway torque wrench
3. Record peak torque at first movement
4. Compare to specification (typically 80-120%)
5. Re-torque to specification
6. Document result

### Step 6: Torque Documentation

**Data Recording:**

| Data Element | Method | Retention |
|--------------|--------|-----------|
| Torque value | Electronic/manual | Unit record |
| Angle (if applicable) | Electronic | Unit record |
| Operator ID | Badge scan/sign | Unit record |
| Tool ID | System/manual | Unit record |
| Date/time | Automatic | Unit record |

**Torque Record:**
```markdown
## Torque Record

**Serial Number:** [Unit S/N]
**Assembly:** [Name]
**Date:** [Date]

| Joint ID | Spec (Nm) | Actual | Angle | Tool | Status |
|----------|-----------|--------|-------|------|--------|
| J001 | 25±2 | 24.8 | 45° | T-001 | PASS |
| J002 | 25±2 | 25.1 | 48° | T-001 | PASS |
| J003 | 40±3 | 39.5 | - | T-002 | PASS |

**Operator:** [Name]
**Verification:** ☐ All joints within specification
```

### Step 7: Reaction to Failures

**Out-of-Specification Response:**

| Condition | Immediate Action | Root Cause Check |
|-----------|------------------|------------------|
| Under-torque | Re-torque (once) | Thread, lubrication |
| Over-torque | Replace fastener | Tool setting, technique |
| Angle out of spec | Replace fastener | Joint condition |
| No click (manual) | Investigate | Tool calibration |

**Failure Investigation:**
1. Isolate affected unit
2. Document condition found
3. Investigate root cause
4. Determine disposition (rework/scrap)
5. Verify fix before continuing
6. Log on defect tracker

## Output: Torque Operation Summary

```markdown
# Torque Operation Summary

**Assembly:** [Name]
**Unit S/N:** [Serial Number]
**Date:** [Date]

## Joint Summary

| Class | Total | Pass | Fail |
|-------|-------|------|------|
| Safety Critical | [#] | [#] | [#] |
| Critical | [#] | [#] | [#] |
| Standard | [#] | [#] | [#] |

## Verification

- [ ] All joints torqued per specification
- [ ] All torque marks applied
- [ ] Data recorded and saved
- [ ] Audit sample complete (if applicable)

## Deviations

| Joint | Issue | Disposition |
|-------|-------|-------------|
| [ID] | [Issue] | [Action] |

**Completed By:** [Name]
**Verified By:** [Name]
```

## Torque Tool Management

### Calibration Schedule

| Tool Type | Frequency | Trigger for Interim |
|-----------|-----------|---------------------|
| Electronic | 6 months | Drop, damage, suspect |
| Click wrench | 6 months / 5000 cycles | Drop, no click |
| Dial type | 6 months | Damage, suspect reading |

### Tool Assignment

```markdown
## Tool Assignment Log

| Tool ID | Type | Range | Station | Calibration Due |
|---------|------|-------|---------|-----------------|
| T-001 | DC electric | 5-50 Nm | LVA-3 | [Date] |
| T-002 | Click | 20-100 Nm | LVA-4 | [Date] |
```

## Integration Points

- **MSA Skill:** Torque tool calibration and R&R studies
- **Control Plan:** Torque monitoring requirements
- **Traceability:** Link torque data to serial number
- **SPC:** Torque trending and capability
