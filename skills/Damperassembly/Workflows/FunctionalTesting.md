# Functional Testing Workflow

**Structured workflow for damper dynamometer testing and acceptance.**

## Trigger
- "Test damper [serial number]"
- "Dyno test procedure"
- "Damper acceptance test"

## Process

### Step 1: Pre-Test Preparation

**Dyno Verification:**

| Check | Status |
|-------|--------|
| Master damper correlation complete | ☐ |
| Load cell calibration current | ☐ |
| Position transducer verified | ☐ |
| Fixturing clean and correct | ☐ |
| Test program loaded | ☐ |
| Safety guards in place | ☐ |

**Master Damper Correlation:**

| Parameter | Master Value | Measured | Δ% | Pass (±2%) |
|-----------|--------------|----------|-----|------------|
| Rebound @ 0.3 m/s | [X] N | [Y] N | [Z]% | ☐ |
| Compression @ 0.3 m/s | [X] N | [Y] N | [Z]% | ☐ |

### Step 2: Unit Preparation

**Pre-Test Checks:**

| Check | Requirement | Result |
|-------|-------------|--------|
| Serial number verified | Matches build record | ☐ |
| Visual inspection | No damage, leaks | ☐ |
| Build record complete | All CCs verified | ☐ |
| Labeling correct | Per specification | ☐ |

**Mount in Dyno:**
1. [ ] Select correct fixture
2. [ ] Mount damper (orientation per spec)
3. [ ] Connect load cell
4. [ ] Verify secure mounting
5. [ ] Close safety guards
6. [ ] Verify interlocks engaged

### Step 3: Leak Test

**Pressure Decay Test:**

| Parameter | Specification | Actual | Pass |
|-----------|---------------|--------|------|
| Test pressure | [X] bar | [Actual] | ☐ |
| Hold time | [X] seconds | [Actual] | ☐ |
| Pressure decay | <[X] bar | [Actual] | ☐ |
| Result | Zero leakage | | ☐ Pass ☐ Fail |

**If Leak Detected:**
- Stop test
- Remove unit
- Quarantine for investigation
- Record on NCR

### Step 4: Conditioning Cycles

**Purpose:** Stabilize fluid temperature and distribute throughout damper

| Parameter | Specification |
|-----------|---------------|
| Velocity | [X] m/s |
| Stroke | Full stroke |
| Cycles | [X] cycles |
| Wait time after | [X] seconds |

### Step 5: Force-Velocity Test

**Test Sequence:**

```markdown
## F-V Test Sequence

For each velocity point:
1. Set velocity
2. Run [X] cycles
3. Measure compression force (peak)
4. Measure rebound force (peak)
5. Record data
6. Proceed to next velocity

Velocity Sequence: 0.05 → 0.1 → 0.3 → 0.5 → 1.0 m/s
```

**Data Recording:**

| Velocity (m/s) | Comp. Spec (N) | Comp. Actual | Δ% | Pass |
|----------------|----------------|--------------|-----|------|
| 0.05 | [X] ±10% | [Actual] | [%] | ☐ |
| 0.1 | [X] ±10% | [Actual] | [%] | ☐ |
| **0.3 (CC)** | **[X] ±8%** | [Actual] | [%] | ☐ |
| 0.5 | [X] ±10% | [Actual] | [%] | ☐ |
| 1.0 | [X] ±10% | [Actual] | [%] | ☐ |

| Velocity (m/s) | Reb. Spec (N) | Reb. Actual | Δ% | Pass |
|----------------|---------------|-------------|-----|------|
| 0.05 | [X] ±10% | [Actual] | [%] | ☐ |
| 0.1 | [X] ±10% | [Actual] | [%] | ☐ |
| **0.3 (CC)** | **[X] ±8%** | [Actual] | [%] | ☐ |
| 0.5 | [X] ±10% | [Actual] | [%] | ☐ |
| 1.0 | [X] ±10% | [Actual] | [%] | ☐ |

### Step 6: Calculate Ratios

**Force Ratio (SC):**
```
Compression/Rebound Ratio @ 0.3 m/s = Compression Force / Rebound Force

Specification: [X] to [Y]
Actual: [Calculated]
Result: ☐ Pass ☐ Fail
```

### Step 7: Evaluate Results

**Pass Criteria:**
- [ ] Leak test: PASS
- [ ] All force points within tolerance
- [ ] 0.3 m/s Compression: Within ±8% (CC)
- [ ] 0.3 m/s Rebound: Within ±8% (CC)
- [ ] Force ratio: Within specification band

**Overall Result:**
- [ ] **PASS** - Proceed to final inspection
- [ ] **FAIL** - Quarantine for investigation

### Step 8: Failure Response

**If Test Fails:**

```markdown
## Test Failure Record

**Serial Number:** [S/N]
**Test Point Failed:** [Which parameter]
**Specification:** [What it should be]
**Actual:** [What was measured]
**Deviation:** [% or absolute]

### Initial Assessment

| Possible Cause | Check | Result |
|----------------|-------|--------|
| Low fluid | Review build record | ☐ |
| Low gas pressure | Review build record | ☐ |
| Seal issue | Visual (no external leak) | ☐ |
| Valve issue | Compare to similar units | ☐ |
| Test error | Retest | ☐ |

### Disposition

- [ ] Retest (suspected test error)
- [ ] Rework (issue identified)
- [ ] Engineering review (unclear cause)
- [ ] Scrap (unrepairable)

**Recorded By:** _____________ Date: _______
```

### Step 9: Post-Test Actions

**For Passing Units:**
1. [ ] Remove from dyno
2. [ ] Apply test pass label
3. [ ] Update system with test data
4. [ ] Place in final inspection queue

**For Failing Units:**
1. [ ] Remove from dyno
2. [ ] Apply quarantine tag
3. [ ] Complete NCR
4. [ ] Place in quarantine area
5. [ ] Notify supervisor

## Output: Test Report

```markdown
# Damper Test Report

**Serial Number:** [S/N]
**Part Number:** [P/N]
**Test Date:** [Date]
**Operator:** [Name]
**Dyno ID:** [Equipment ID]

## Leak Test

| Test | Specification | Result | Status |
|------|---------------|--------|--------|
| Pressure decay | <[X] bar | [Actual] | PASS/FAIL |

## Force-Velocity Results

| Vel. | Comp. Spec | Comp. Act | Reb. Spec | Reb. Act | Status |
|------|------------|-----------|-----------|----------|--------|
| 0.05 | [X] | [Y] | [X] | [Y] | P/F |
| 0.1 | [X] | [Y] | [X] | [Y] | P/F |
| 0.3 | [X] | [Y] | [X] | [Y] | P/F |
| 0.5 | [X] | [Y] | [X] | [Y] | P/F |
| 1.0 | [X] | [Y] | [X] | [Y] | P/F |

## Calculations

| Parameter | Specification | Actual | Status |
|-----------|---------------|--------|--------|
| C/R Ratio @ 0.3 | [X]-[Y] | [Actual] | P/F |

## Overall Result

**Status:** ☐ PASS ☐ FAIL

**Operator:** _____________ Date: _______

## F-V Curve

[Attach or reference graph if available]
```

## Reference Documents

- WI-71-004: Functional Testing
- CP-71-004: Functional Testing Control Plan
- Equipment calibration records
- Product specifications
