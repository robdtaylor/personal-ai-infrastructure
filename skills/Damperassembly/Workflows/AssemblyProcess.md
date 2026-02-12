# Assembly Process Workflow

**Structured workflow for DSSV damper assembly operations.**

## Trigger
- "Assemble damper [part number]"
- "Damper build procedure"
- "Production assembly"

## Process

### Step 1: Preparation

**Verify Setup:**

| Check | Status |
|-------|--------|
| Workstation clean | ☐ |
| Fixtures verified | ☐ |
| Tools calibrated | ☐ |
| PPE worn | ☐ |
| Work instruction at station | ☐ |
| Product-specific setup sheet | ☐ |

**Gather Components:**

| Component | P/N | Lot | Qty | Staged |
|-----------|-----|-----|-----|--------|
| Piston rod | [P/N] | [Lot] | 1 | ☐ |
| Piston | [P/N] | [Lot] | 1 | ☐ |
| Spool valve(s) | [P/N] | [Lot] | [#] | ☐ |
| Rod seal | [P/N] | [Lot] | 1 | ☐ |
| Piston seals | [P/N] | [Lot] | [#] | ☐ |
| Housing | [P/N] | [Lot] | 1 | ☐ |
| Fasteners | [P/N] | [Lot] | [#] | ☐ |
| Thread lock | [Type] | [Lot] | As req | ☐ |

**Fluid Preparation:**
- Fluid type: [Specification]
- Temperature: [X]°C (target 18-25°C)
- Cleanliness: NAS 6 verified

### Step 2: Sub-Assembly

**Valve Assembly (if applicable):**

1. [ ] Inspect spool valve components
2. [ ] Verify spring installation
3. [ ] Assemble per work instruction
4. [ ] Check free movement
5. [ ] Record sub-assembly data

**Piston Assembly:**

1. [ ] Install piston seals (correct orientation)
2. [ ] Verify seal seating
3. [ ] Install piston on rod
4. [ ] Torque to specification
5. [ ] Apply witness mark

### Step 3: Main Assembly Sequence

```markdown
## Assembly Sequence

### Step 3.1: Rod Installation

1. Place housing in fixture
2. Apply lubricant to rod seal area
3. Install rod seal (lip facing correct direction)
4. Insert rod assembly into housing
5. Press to specified depth
6. **VERIFY:** Press force within limits (CC)
7. Record data

### Step 3.2: Valve Installation

1. Install compression valve cartridge
2. Install rebound valve cartridge
3. Verify orientation marks aligned
4. **VERIFY:** Valves seated correctly

### Step 3.3: Fluid Fill

1. Place assembly in fill fixture
2. Create vacuum (<50 mbar)
3. Hold vacuum [X] seconds
4. Introduce fluid
5. Fill to volume: [X] ml ±1 ml
6. **VERIFY:** Volume reading (CC)
7. Release vacuum slowly
8. Allow settle time
9. Record fill data

### Step 3.4: Gas Charge

1. Connect charge fitting
2. Set regulator to: [X] bar
3. Open valve slowly
4. Allow pressure to stabilize
5. **VERIFY:** Pressure within ±0.5 bar (CC)
6. Leak check
7. Disconnect and cap
8. Record charge data

### Step 3.5: Final Assembly

1. Install gland/cap
2. Apply thread lock where specified
3. Torque in sequence:
   - Fastener 1: [X] Nm
   - Fastener 2: [X] Nm
   - [Continue as specified]
4. **VERIFY:** All torques recorded (CC)
5. Apply torque marks

### Step 3.6: Labeling

1. Generate serial number
2. Apply label per specification
3. Scan to confirm
4. Record in system
```

### Step 4: In-Process Verification

**Critical Characteristic Verification:**

| Characteristic | Specification | Actual | Pass |
|----------------|---------------|--------|------|
| Rod press force | [X-Y] N | [Actual] | ☐ |
| Seal orientation | Per WI | Visual | ☐ |
| Fluid volume | [X] ±1 ml | [Actual] | ☐ |
| Gas pressure | [X] ±0.5 bar | [Actual] | ☐ |
| Torque 1 | [X] ±10% | [Actual] | ☐ |
| Torque 2 | [X] ±10% | [Actual] | ☐ |
| Torque angle | [X] ±5° | [Actual] | ☐ |

### Step 5: Documentation

**Build Record:**

```markdown
## Damper Build Record

**Serial Number:** [S/N]
**Part Number:** [P/N]
**Build Date:** [Date]
**Operator:** [Name]

### Component Traceability

| Component | Part Number | Lot/Serial |
|-----------|-------------|------------|
| Rod | [P/N] | [Lot] |
| Piston | [P/N] | [Lot] |
| Valve(s) | [P/N] | [Lot] |
| Seals | [P/N] | [Lot] |
| Housing | [P/N] | [Lot] |
| Fluid | [Type] | [Lot] |

### Process Data

| Parameter | Specification | Actual |
|-----------|---------------|--------|
| Fluid volume | [X] ml | [X] ml |
| Gas pressure | [X] bar | [X] bar |
| Torque values | [List] | [Actuals] |

### Verification

- [ ] All CCs verified
- [ ] Data recorded
- [ ] Ready for test

**Operator:** _____________ Time: _______
```

### Step 6: Transfer to Test

1. [ ] Build record complete
2. [ ] Unit labeled with serial
3. [ ] Scanned into test queue
4. [ ] Placed in test staging area
5. [ ] FIFO maintained

## Output: Assembly Summary

```markdown
# Assembly Summary

**Shift:** [Date/Shift]
**Operator:** [Name]
**Product:** [P/N]

## Production

| Serial | Start | End | Status |
|--------|-------|-----|--------|
| [S/N] | [Time] | [Time] | Complete |
| [S/N] | [Time] | [Time] | Complete |

## Issues

| Serial | Issue | Action |
|--------|-------|--------|
| [S/N] | [Issue] | [Action taken] |

## Consumables Used

| Item | Lot | Qty |
|------|-----|-----|
| Fluid | [Lot] | [L] |
| Thread lock | [Lot] | [Units] |

**Shift Complete:** ☐
```

## Reference Documents

- WI-71-002: Sub-Assembly Setup
- WI-71-003: Damper Assembly
- CP-71-002: Sub-Assembly Control Plan
- CP-71-003: Damper Assembly Control Plan
