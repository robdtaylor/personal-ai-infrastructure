# SealDesign Workflow

O-ring and slyde ring design for hydraulic damper applications. Covers groove design, material selection, and compression requirements.

## Quick Reference

### O-Ring Compression Summary

| Application | Compression % | Fill % | Key Consideration |
|-------------|---------------|--------|-------------------|
| Static face seal | 15-25% | 75-90% | Prevent leak path |
| Static radial | 12-20% | 75-85% | Easy assembly |
| Dynamic rod (slow) | 10-16% | 70-85% | Balance seal vs friction |
| Dynamic rod (fast) | 8-14% | 70-80% | Minimize friction/heat |
| High pressure static | 12-20% | 80-90% | Prevent extrusion |

### Material Quick Selection

| Condition | Material | Reason |
|-----------|----------|--------|
| Standard damper, road | NBR 70A | Cost, compatibility |
| High temperature >100°C | FKM 75A | Heat resistance |
| Extended temp range | HNBR 70A | Better than NBR |
| Aggressive fluids | FKM 75A | Chemical resistance |
| Extreme cold <-40°C | EPDM (check fluid!) | Low temp performance |

---

## O-Ring Design Process

### Step 1: Define Application

```markdown
## Seal Application

Location: [Rod seal / Piston seal / Body seal / Static face]

Type:
- [ ] Static (no relative motion)
- [ ] Dynamic - reciprocating
- [ ] Dynamic - rotary

Motion parameters (if dynamic):
- Stroke: ___ mm
- Velocity: ___ m/s (max)
- Frequency: ___ Hz

Pressure:
- Operating: ___ bar
- Maximum: ___ bar
- Vacuum exposure: [Yes/No]

Temperature:
- Operating range: ___ to ___ °C
- Maximum (short term): ___ °C

Fluid:
- Type: [Mineral oil / Synthetic / Specify]
- Viscosity: ___ cSt @ 40°C
```

### Step 2: Select O-Ring Size

**For Rod Seals (Internal Pressure):**
```
O-ring ID = Rod OD × (1 - stretch%)

Target stretch: 2-5% (max 8%)

Example:
Rod Ø20 mm, target 3% stretch
O-ring ID = 20 / 1.03 = 19.42 mm
→ Select AS568-214 (ID = 19.99 mm, CS = 3.53 mm)
   Actual stretch = (20 - 19.99) / 19.99 = 0.05% (minimal)
→ Or metric 20 × 3.5 (ID = 20 mm, CS = 3.5 mm)
```

**For Bore Seals (External Pressure):**
```
O-ring OD = Bore ID × (1 + squeeze%)

The O-ring sits in a groove on the male part
Groove OD contacts bore ID
```

**Standard Cross-Sections:**

| Series | CS (mm) | Typical Use |
|--------|---------|-------------|
| 1.78 | 1.78 | Light duty, small |
| 2.62 | 2.62 | Medium duty |
| 3.53 | 3.53 | Standard |
| 5.33 | 5.33 | Heavy duty |
| 6.99 | 6.99 | Large/high pressure |

### Step 3: Calculate Groove Dimensions

**Groove Depth (G):**
```
G = CS × (1 - compression%/100)

Static: compression = 15-25%
Dynamic: compression = 8-16%

Example (dynamic rod seal):
CS = 3.53 mm, target 12% compression
G = 3.53 × (1 - 0.12) = 3.11 mm
```

**Groove Width (W):**
```
Static: W = 1.30 × CS to 1.40 × CS
Dynamic: W = 1.40 × CS to 1.50 × CS

Example:
CS = 3.53 mm (dynamic)
W = 1.45 × 3.53 = 5.12 mm
```

**Verify Gland Fill:**
```
O-ring area = π × (CS/2)² = π × CS²/4
Groove area = W × G

Fill% = (O-ring area / Groove area) × 100

Example:
O-ring area = π × 3.53²/4 = 9.79 mm²
Groove area = 5.12 × 3.11 = 15.92 mm²
Fill% = 9.79 / 15.92 × 100 = 61.5%

Target: 70-85% for dynamic
→ Adjust groove dimensions
```

**Groove Tolerance:**

| Dimension | Tolerance |
|-----------|-----------|
| Groove depth | ±0.05 mm |
| Groove width | ±0.10 mm |
| Surface finish (bottom) | Ra 1.6 μm max |
| Surface finish (sides) | Ra 3.2 μm max |
| Corner radius | 0.2-0.4 mm |

### Step 4: Select Material

**NBR (Nitrile) - Standard Choice:**
```
Temperature: -30°C to +100°C
Hardness: 70 Shore A (standard)
Compatible: Mineral oils, petroleum, water
NOT compatible: Ozone, UV, ketones, esters
Compression set: Moderate
Use for: Standard damper applications
```

**FKM (Viton) - High Performance:**
```
Temperature: -20°C to +200°C
Hardness: 75 Shore A (typical for seals)
Compatible: Most chemicals, oils, fuels
NOT compatible: Ketones, hot water, steam
Compression set: Excellent
Use for: Motorsport, high-temperature
Cost: 3-5× NBR
```

**HNBR - Enhanced NBR:**
```
Temperature: -30°C to +150°C
Hardness: 70-90 Shore A
Compatible: Oils, some refrigerants
Compression set: Good
Use for: Extended temperature range
Cost: 2× NBR
```

### Step 5: Check for Backup Ring Need

**Extrusion Gap Limits (70 Shore A):**

| Pressure (bar) | Max Gap without Backup |
|----------------|------------------------|
| 35 | 0.15 mm |
| 70 | 0.10 mm |
| 140 | 0.05 mm |
| 210 | Backup required |

**If backup ring needed:**
- Install on low-pressure side
- PTFE or PEEK material
- Gap-filling design

---

## Rod Seal Design Example

### Application
```
Damper rod seal
Rod OD: 16 mm
Bore ID: 22 mm
Max pressure: 80 bar
Operating velocity: 0-2 m/s
Temperature: -30°C to +100°C
Fluid: Mineral damper oil
```

### Design Solution

**O-Ring Selection:**
```
Target: AS568-016 or metric 16 × 2

AS568-016:
- ID: 15.60 mm (stretch = 2.5%)
- CS: 1.78 mm

Check: Stretch = (16 - 15.60) / 15.60 = 2.6% ✓
```

**Groove Design:**
```
Target compression: 12% (dynamic)
Groove depth: G = 1.78 × 0.88 = 1.57 mm
Groove width: W = 1.78 × 1.45 = 2.58 mm

Verify fill:
O-ring area = π × 1.78²/4 = 2.49 mm²
Groove area = 2.58 × 1.57 = 4.05 mm²
Fill = 2.49 / 4.05 = 61.5%

Adjust - reduce width:
W = 2.30 mm
Groove area = 2.30 × 1.57 = 3.61 mm²
Fill = 2.49 / 3.61 = 69% ✓
```

**Material:**
```
NBR 70A - suitable for temperature range and fluid
Alternative: HNBR for improved heat resistance
```

**Extrusion Check:**
```
Diametral gap = 22 - 16 - 2×1.57 = 2.86 mm
Gap per side = 1.43 mm

At 80 bar: Max gap 0.10 mm
Actual gap: 1.43 mm >> 0.10 mm

BACKUP RING REQUIRED
→ Add PTFE anti-extrusion ring
```

---

## Slyde Ring / Piston Seal Design

### Application Types

**Single Slyde Ring:**
```
┌─────────────────────────────────────┐
│        SINGLE SLYDE RING            │
├─────────────────────────────────────┤
│                                     │
│     ┌───────────────────────┐      │
│     │    ██████████████     │ ← Tube wall
│     │    ██████████████     │
│     │         ↑             │
│     │    PTFE-Bronze ring   │
│     │    Self-lubricating   │
│     │    Low friction       │
│     └───────────────────────┘      │
│                                     │
│  Use: Monotube pistons              │
│  Seals gas from oil                 │
│  Bidirectional                      │
│                                     │
└─────────────────────────────────────┘
```

**Energized Seal (O-Ring + Slyde):**
```
┌─────────────────────────────────────┐
│        ENERGIZED PISTON SEAL        │
├─────────────────────────────────────┤
│                                     │
│     ┌───────────────────────┐      │
│     │  ███  ○○○  ███        │ ← Tube wall
│     │  ███  ○○○  ███        │
│     │   ↑    ↑    ↑         │
│     │ PTFE  O-ring PTFE     │
│     │       energizer       │
│     └───────────────────────┘      │
│                                     │
│  Better low-pressure sealing        │
│  O-ring provides preload            │
│  More complex groove                │
│                                     │
└─────────────────────────────────────┘
```

### Slyde Ring Materials

| Material | PV Limit (MPa·m/s) | Friction | Application |
|----------|-------------------|----------|-------------|
| Virgin PTFE | 0.035 | 0.04-0.10 | Low load only |
| PTFE + 40% Bronze | 0.46 | 0.10-0.15 | General purpose |
| PTFE + Carbon/Graphite | 1.05 | 0.08-0.12 | Higher duty |
| PEEK | 3.5 | 0.35-0.45 | Maximum load |
| PEEK + Carbon | 10+ | 0.25-0.35 | Extreme |

### Slyde Ring Groove Design

**Key Dimensions:**
```
GROOVE CROSS-SECTION

        ←─── W ───→
       ┌───────────┐
       │           │ ↑
       │           │ H
       │           │ ↓
       └───────────┘

W = Ring width + side clearance (0.05-0.15 mm per side)
H = Ring thickness - radial interference (0.1-0.3 mm)
```

**Interference Guidelines:**

| Ring Thickness | Radial Interference |
|----------------|---------------------|
| 2.0 mm | 0.10-0.15 mm |
| 2.5 mm | 0.15-0.20 mm |
| 3.0 mm | 0.20-0.25 mm |
| 4.0 mm | 0.25-0.30 mm |

**Example Calculation:**
```
Piston bore: Ø46 mm
Ring thickness: 2.5 mm
Ring width: 5.0 mm

Groove H = 2.5 - 0.18 = 2.32 mm (target interference)
Groove W = 5.0 + 0.25 = 5.25 mm (0.125 per side)

Ring OD (free state) = 46 + 0.5 = 46.5 mm (pre-tensioned)
Ring OD (installed) = 46 mm (contacts bore)
```

### Piston Seal Selection Guide

| Condition | Recommendation |
|-----------|----------------|
| Standard damper | PTFE + 40% Bronze, single ring |
| High frequency | PTFE + Carbon, energized |
| Motorsport | PEEK + Carbon, energized |
| Cost sensitive | PTFE + Bronze, single ring |
| High gas pressure | Double ring arrangement |

---

## Common Seal Failures

### Failure Mode Analysis

| Symptom | Cause | Solution |
|---------|-------|----------|
| Leak past rod | Seal wear | Check surface finish, replace |
| Leak past rod | Scored rod | Refinish or replace rod |
| Leak past rod | Under-compression | Check groove depth |
| High friction | Over-compression | Increase groove depth |
| Seal extrusion | Gap too large | Add backup ring |
| Seal hardening | Heat damage | Upgrade to FKM |
| Rapid wear | Contamination | Improve filtration |
| Seal swell | Fluid incompatibility | Change seal material |

### Prevention Checklist

```markdown
## Seal Installation Checklist

Pre-installation:
□ Inspect seal for damage (cuts, nicks, deformation)
□ Verify correct part number
□ Check orientation marking (if applicable)
□ Verify groove dimensions
□ Clean groove thoroughly
□ Check mating surface finish

Installation:
□ Lubricate seal with compatible grease/oil
□ Use installation tool (if required)
□ Avoid stretching beyond 8%
□ Do not roll or twist O-ring
□ Verify seal seated correctly
□ Check for pinching

Post-installation:
□ Visual inspection
□ Check for damage during assembly
□ Verify component movement (if dynamic)
□ Initial leak test
```

---

## Design Outputs

### Seal Specification Template

```markdown
## Seal Specification

**Application:** [Location, function]
**Part Number:** [Internal P/N]
**Drawing:** [Drawing number]

### O-Ring Specification

| Parameter | Value |
|-----------|-------|
| Size | [AS568-XXX or metric] |
| ID | [X.XX] mm |
| CS | [X.XX] mm |
| Material | [NBR/FKM/HNBR] |
| Hardness | [XX] Shore A |
| Supplier | [Approved supplier] |
| Supplier P/N | [If applicable] |

### Groove Specification

| Parameter | Value | Tolerance |
|-----------|-------|-----------|
| Groove depth | [X.XX] mm | ±0.05 |
| Groove width | [X.XX] mm | ±0.10 |
| Surface finish (bottom) | Ra [X.X] μm | max |
| Surface finish (sides) | Ra [X.X] μm | max |
| Corner radius | [X.X] mm | min |

### Performance

| Parameter | Value |
|-----------|-------|
| Compression | [XX]% |
| Stretch | [XX]% |
| Fill | [XX]% |
| Max pressure | [XX] bar |
| Temperature range | [XX] to [XX] °C |

### Notes
[Any special instructions or requirements]
```
