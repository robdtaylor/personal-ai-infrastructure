# MaterialSelection Workflow

Materials engineering for hydraulic damper components. Covers high-grade aluminium alloys, steels, surface treatments, and selection criteria.

## Quick Reference

### Material Selection Matrix

| Component | Standard | Performance | Motorsport |
|-----------|----------|-------------|------------|
| **Tube/Body** | 6061-T6 Al | 6082-T6 Al | 7075-T6 Al |
| **Piston Rod** | 4140 + Chrome | 4340 + Chrome | 17-4PH or 4340 + DLC |
| **Piston** | 6061-T6 Al | 7075-T6 Al | 7075-T6 or Steel |
| **End Caps** | 6061-T6 Al | 6082-T6 Al | 7075-T6 Al |
| **Reservoir** | 6061-T6 Al | 6061-T6 Al | 6061-T6 Al |

---

## Aluminium Alloys

### 6061-T6 (Workhorse Alloy)

```
COMPOSITION:
Al-Mg-Si alloy
Si: 0.4-0.8%, Mg: 0.8-1.2%, Cu: 0.15-0.4%

MECHANICAL PROPERTIES:
┌────────────────────────────────────┐
│ Property          │ Value          │
├───────────────────┼────────────────┤
│ Tensile strength  │ 310 MPa        │
│ Yield strength    │ 276 MPa        │
│ Elongation        │ 12%            │
│ Hardness          │ 95 HB          │
│ Fatigue limit     │ 97 MPa (10⁷)   │
│ Elastic modulus   │ 68.9 GPa       │
│ Shear modulus     │ 26 GPa         │
│ Density           │ 2.70 g/cm³     │
│ Thermal expansion │ 23.6 μm/m·°C   │
└────────────────────────────────────┘

APPLICATIONS:
- Damper tubes/bodies (standard)
- End caps and fittings
- Reservoirs
- Low-stress structural

ADVANTAGES:
✓ Excellent machinability
✓ Good weldability
✓ Excellent anodizing response
✓ Good corrosion resistance
✓ Cost-effective
✓ Readily available

LIMITATIONS:
✗ Lower strength than 7-series
✗ Not suitable for high-stress applications

HEAT TREATMENT:
- Solution: 530°C, water quench
- Age: 175°C for 8 hours
- T6 = Solution + artificial age
```

### 6082-T6 (Structural Upgrade)

```
COMPOSITION:
Al-Mg-Si alloy (higher Mn than 6061)
Si: 0.7-1.3%, Mg: 0.6-1.2%, Mn: 0.4-1.0%

MECHANICAL PROPERTIES:
┌────────────────────────────────────┐
│ Property          │ Value          │
├───────────────────┼────────────────┤
│ Tensile strength  │ 340 MPa        │
│ Yield strength    │ 310 MPa        │
│ Elongation        │ 10%            │
│ Hardness          │ 100 HB         │
│ Fatigue limit     │ 105 MPa        │
│ Elastic modulus   │ 70 GPa         │
│ Density           │ 2.70 g/cm³     │
└────────────────────────────────────┘

APPLICATIONS:
- Higher-stress tubes/bodies
- Structural components
- European standard structural alloy

ADVANTAGES:
✓ 12% higher yield than 6061
✓ Better fatigue properties
✓ Good machinability
✓ Good weldability (strength reduced in HAZ)

NOTES:
- Common in European specifications
- Direct upgrade path from 6061
- Similar processing to 6061
```

### 7075-T6 (High Strength)

```
COMPOSITION:
Al-Zn-Mg-Cu alloy
Zn: 5.1-6.1%, Mg: 2.1-2.9%, Cu: 1.2-2.0%

MECHANICAL PROPERTIES:
┌────────────────────────────────────┐
│ Property          │ Value          │
├───────────────────┼────────────────┤
│ Tensile strength  │ 572 MPa        │
│ Yield strength    │ 503 MPa        │
│ Elongation        │ 11%            │
│ Hardness          │ 150 HB         │
│ Fatigue limit     │ 159 MPa        │
│ Elastic modulus   │ 71.7 GPa       │
│ Density           │ 2.81 g/cm³     │
└────────────────────────────────────┘

APPLICATIONS:
- High-stress damper bodies
- Lightweight pistons
- Motorsport components
- Aerospace-grade applications

ADVANTAGES:
✓ Highest strength common Al alloy
✓ Excellent strength-to-weight
✓ Good fatigue properties
✓ Good machinability

⚠️ CRITICAL LIMITATIONS:
✗ POOR WELDABILITY - avoid welding
✗ STRESS CORROSION CRACKING susceptible
  - Avoid sustained tensile stress in corrosive environment
  - T73 temper improves SCC resistance (lower strength)
✗ Reduced corrosion resistance vs 6-series
✗ More expensive

DESIGN NOTES:
- Use with protective coating in harsh environments
- Avoid sustained tensile loading >50% yield
- Consider T7351 for improved SCC resistance
- Hard anodize for wear surfaces
```

### 2024-T351 (Fatigue Critical)

```
COMPOSITION:
Al-Cu-Mg alloy
Cu: 3.8-4.9%, Mg: 1.2-1.8%, Mn: 0.3-0.9%

MECHANICAL PROPERTIES:
┌────────────────────────────────────┐
│ Property          │ Value          │
├───────────────────┼────────────────┤
│ Tensile strength  │ 469 MPa        │
│ Yield strength    │ 324 MPa        │
│ Elongation        │ 19%            │
│ Hardness          │ 120 HB         │
│ Fatigue limit     │ 138 MPa        │
│ Elastic modulus   │ 72.4 GPa       │
│ Density           │ 2.78 g/cm³     │
└────────────────────────────────────┘

APPLICATIONS:
- Fatigue-critical components
- Aircraft-grade applications
- High-cycle loading

ADVANTAGES:
✓ Best fatigue properties of common alloys
✓ High elongation (damage tolerant)
✓ Good machinability

LIMITATIONS:
✗ Poor weldability
✗ Poor corrosion resistance (needs protection)
✗ Higher cost than 6-series

NOTES:
- T351 = Solution + stress relieved + natural age
- Often Alclad for corrosion protection
- Used where fatigue life is critical
```

### Aluminium Selection Decision Tree

```
START
  │
  ▼
┌─────────────────────────┐
│ High stress / lightweight│
│ requirement?            │
└───────────┬─────────────┘
            │
     Yes ───┼─── No
            │      │
            ▼      ▼
    ┌───────────┐  ┌───────────┐
    │ Welding   │  │ 6061-T6   │
    │ required? │  │ (default) │
    └─────┬─────┘  └───────────┘
          │
   Yes ───┼─── No
          │      │
          ▼      ▼
  ┌───────────┐  ┌───────────────┐
  │ 6082-T6   │  │ Corrosive     │
  │           │  │ environment?  │
  └───────────┘  └───────┬───────┘
                         │
                  Yes ───┼─── No
                         │      │
                         ▼      ▼
                 ┌───────────┐  ┌───────────┐
                 │ 6082-T6   │  │ 7075-T6   │
                 │ + coating │  │           │
                 └───────────┘  └───────────┘
```

---

## Steel Grades

### 4140 (Standard Rod Material)

```
COMPOSITION:
Cr-Mo alloy steel
C: 0.38-0.43%, Mn: 0.75-1.0%, Cr: 0.80-1.10%, Mo: 0.15-0.25%

MECHANICAL PROPERTIES (Quenched & Tempered):

Temper    │ Sy (MPa) │ Su (MPa) │ Elong │ Hardness
──────────┼──────────┼──────────┼───────┼─────────
400°C     │ 1100     │ 1210     │ 11%   │ 38 HRC
500°C     │ 860      │ 970      │ 15%   │ 31 HRC
600°C     │ 655      │ 810      │ 19%   │ 25 HRC

Typical for damper rods: 500-550°C temper (28-35 HRC)

APPLICATIONS:
- Standard piston rods
- Shafts
- Medium-duty structural

ADVANTAGES:
✓ Good balance of strength/toughness
✓ Good machinability (normalized)
✓ Readily available
✓ Cost-effective
✓ Accepts chrome plating well
✓ Good weldability (with preheat)

SURFACE TREATMENTS:
- Hard chrome plating (standard)
- QPQ / Nitrocarburizing
- Induction hardening (localized)

HEAT TREATMENT:
- Normalize: 870°C, air cool
- Austenitize: 845°C
- Quench: Oil
- Temper: 400-600°C (adjust for hardness)

WELDING:
- Preheat: 200-300°C
- PWHT recommended
- E8018-B2 or ER80S-B2 filler
```

### 4340 (Premium Rod Material)

```
COMPOSITION:
Ni-Cr-Mo alloy steel
C: 0.38-0.43%, Mn: 0.60-0.80%, Cr: 0.70-0.90%
Mo: 0.20-0.30%, Ni: 1.65-2.00%

MECHANICAL PROPERTIES (Quenched & Tempered):

Temper    │ Sy (MPa) │ Su (MPa) │ Elong │ Hardness
──────────┼──────────┼──────────┼───────┼─────────
400°C     │ 1400     │ 1550     │ 10%   │ 45 HRC
500°C     │ 1100     │ 1200     │ 13%   │ 38 HRC
600°C     │ 860      │ 950      │ 16%   │ 30 HRC

APPLICATIONS:
- High-performance piston rods
- Motorsport dampers
- High-load / high-fatigue applications

ADVANTAGES:
✓ Superior fatigue life to 4140
✓ Higher strength at same toughness
✓ Excellent impact resistance
✓ Deep hardening capability
✓ Better high-stress performance

LIMITATIONS:
✗ 20-30% more expensive than 4140
✗ Slightly reduced machinability

NOTES:
- Preferred for motorsport
- Use where fatigue life is critical
- Often specified for F1, Le Mans, etc.
- AMS 6415 aerospace spec common
```

### 17-4 PH (Stainless Option)

```
COMPOSITION:
Precipitation hardening stainless
Cr: 15-17.5%, Ni: 3-5%, Cu: 3-5%, Nb: 0.15-0.45%

MECHANICAL PROPERTIES:

Condition │ Sy (MPa) │ Su (MPa) │ Hardness
──────────┼──────────┼──────────┼─────────
H900      │ 1170     │ 1310     │ 40 HRC
H1025     │ 1000     │ 1070     │ 35 HRC
H1075     │ 860      │ 1000     │ 32 HRC
H1150     │ 725      │ 930      │ 28 HRC

APPLICATIONS:
- Corrosive environments
- Marine applications
- No chrome plating required
- Food/medical applications

ADVANTAGES:
✓ Good corrosion resistance
✓ High strength (heat treatable)
✓ No surface treatment required
✓ Can be polished to seal-compatible finish

LIMITATIONS:
✗ 2-3× cost of 4140
✗ Lower fatigue strength than 4340
✗ Requires careful heat treatment
✗ Galling risk (use anti-gall coating)

NOTES:
- H1025 or H1075 typical for rods
- Consider anti-gall coating for seal interface
- Common in marine and special applications
```

### Nitriding Steels (38CrMoAl, etc.)

```
COMPOSITION (38CrMoAl example):
C: 0.35-0.42%, Cr: 1.35-1.65%, Mo: 0.15-0.25%, Al: 0.70-1.10%

SURFACE PROPERTIES (After Nitriding):
- Case depth: 0.3-0.6 mm
- Surface hardness: 900-1100 HV (65-70 HRC equivalent)
- Core hardness: 28-35 HRC

APPLICATIONS:
- Alternative to chrome plating
- High-wear surfaces
- Corrosion resistance required

ADVANTAGES:
✓ Extremely hard surface
✓ Excellent wear resistance
✓ Good corrosion resistance
✓ No dimensional change (diffusion process)
✓ No environmental concerns (vs chrome)

LIMITATIONS:
✗ Specialized steel required
✗ Long process time (24-72 hours)
✗ Cannot be reworked/refinished
✗ Limited availability

NITRIDING PROCESS:
- Gas nitriding: 500-530°C, 24-72 hours
- Plasma nitriding: 400-580°C, faster
- Salt bath: 565°C, 1-4 hours (QPQ)
```

### Steel Selection Decision Tree

```
START
  │
  ▼
┌─────────────────────────┐
│ Corrosion critical      │
│ (marine/harsh env)?     │
└───────────┬─────────────┘
            │
     Yes ───┼─── No
            │      │
            ▼      ▼
    ┌───────────┐  ┌───────────────┐
    │ 17-4 PH   │  │ High fatigue  │
    │           │  │ requirement?  │
    └───────────┘  └───────┬───────┘
                           │
                    Yes ───┼─── No
                           │      │
                           ▼      ▼
                   ┌───────────┐  ┌───────────┐
                   │ 4340      │  │ 4140      │
                   │           │  │ (standard)│
                   └───────────┘  └───────────┘
```

---

## Surface Treatments

### Hard Chrome Plating

```
PROCESS:
Electroplating from chromic acid bath

PROPERTIES:
┌────────────────────────────────────┐
│ Property          │ Value          │
├───────────────────┼────────────────┤
│ Thickness         │ 25-75 μm       │
│ Hardness          │ 65-70 HRC      │
│ Surface finish    │ Ra 0.1-0.2 μm  │
│ Max temperature   │ 400°C          │
│ Friction (lubed)  │ 0.10-0.15      │
└────────────────────────────────────┘

ADVANTAGES:
✓ Excellent wear resistance
✓ Good corrosion resistance
✓ Repairable / re-plateable
✓ Well-understood process
✓ Seal-compatible surface

LIMITATIONS:
✗ Environmental concerns (Cr⁶⁺)
✗ Hydrogen embrittlement risk
✗ Requires post-bake (190°C, 8-24h)
✗ Micro-cracking possible

SPECIFICATION:
- AMS 2406 (general)
- AMS 2460 (low hydrogen embrittlement)
- Thickness per application
- Post-plate bake mandatory for high-strength steel
```

### QPQ / Nitrocarburizing

```
PROCESS:
Salt bath nitrocarburizing + oxidation + polish + re-oxidation

PROPERTIES:
┌────────────────────────────────────┐
│ Property          │ Value          │
├───────────────────┼────────────────┤
│ Compound layer    │ 15-30 μm       │
│ Diffusion zone    │ 0.3-0.5 mm     │
│ Surface hardness  │ 60-65 HRC      │
│ Surface finish    │ Ra 0.2-0.4 μm  │
│ Friction (lubed)  │ 0.10-0.12      │
└────────────────────────────────────┘

ADVANTAGES:
✓ Excellent corrosion resistance
✓ No environmental Cr⁶⁺ issues
✓ Minimal distortion
✓ Good wear resistance
✓ Cost-effective for volume

LIMITATIONS:
✗ Cannot be reworked
✗ Dimensional change (build-up)
✗ Not as hard as chrome
✗ Black appearance (cosmetic)

SPECIFICATION:
- Specify compound layer thickness
- Specify diffusion depth
- Surface finish after process
```

### DLC (Diamond-Like Carbon)

```
PROCESS:
PVD or PACVD coating

PROPERTIES:
┌────────────────────────────────────┐
│ Property          │ Value          │
├───────────────────┼────────────────┤
│ Thickness         │ 2-5 μm         │
│ Hardness          │ 2000-3000 HV   │
│ Surface finish    │ Ra < 0.05 μm   │
│ Max temperature   │ 300-400°C      │
│ Friction (dry)    │ 0.05-0.15      │
└────────────────────────────────────┘

ADVANTAGES:
✓ Extremely low friction
✓ Extreme hardness
✓ Excellent wear resistance
✓ Chemically inert
✓ Biocompatible

LIMITATIONS:
✗ Expensive (3-5× chrome)
✗ Thin coating (substrate critical)
✗ Adhesion sensitive
✗ Cannot be repaired
✗ Limited temperature

SPECIFICATION:
- Coating type (a-C:H, ta-C, etc.)
- Thickness
- Substrate preparation critical
- Adhesion testing required
```

### Surface Treatment Comparison

| Treatment | Hardness | Wear | Corrosion | Friction | Cost |
|-----------|----------|------|-----------|----------|------|
| Hard Chrome | 70 HRC | ★★★★ | ★★★ | ★★★ | ★★ |
| QPQ | 65 HRC | ★★★ | ★★★★★ | ★★★ | ★★ |
| Gas Nitride | 70 HRC | ★★★★ | ★★★★ | ★★★ | ★★★ |
| DLC | 80+ HRC | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★ |

---

## Material Specification Template

```markdown
## Component Material Specification

**Component:** [Name]
**Part Number:** [P/N]
**Application:** [Damper type/position]

### Base Material

| Property | Specification |
|----------|---------------|
| Material | [Alloy designation] |
| Spec | [AMS/ASTM/BS number] |
| Condition | [Temper/heat treat] |
| Hardness | [Range] |
| Certificate | [Required: Yes/No] |

### Surface Treatment

| Property | Specification |
|----------|---------------|
| Treatment | [Chrome/QPQ/DLC/None] |
| Thickness | [μm] |
| Hardness | [HV or HRC] |
| Surface finish | Ra [μm] |
| Spec | [AMS/process spec] |

### Dimensional Notes

| Feature | Requirement |
|---------|-------------|
| Critical surfaces | [List] |
| Thread class | [e.g., 6H/6g] |
| Geometric tolerance | [Per drawing] |

### Verification

| Test | Requirement |
|------|-------------|
| Material cert | [Yes/No] |
| Hardness test | [Location, frequency] |
| Surface finish | [Ra check] |
| Coating thickness | [Method] |
```

---

## Cost Considerations

### Relative Material Costs

| Material | Relative Cost | Notes |
|----------|---------------|-------|
| 6061-T6 | 1.0× | Baseline |
| 6082-T6 | 1.1× | Slight premium |
| 7075-T6 | 1.5-2.0× | Depends on form |
| 4140 | 1.0× | Steel baseline |
| 4340 | 1.3× | Premium alloy |
| 17-4 PH | 2.5-3.0× | Stainless premium |

### Relative Treatment Costs

| Treatment | Relative Cost | Notes |
|-----------|---------------|-------|
| Hard Chrome | 1.0× | Baseline |
| QPQ | 0.8-1.0× | Volume dependent |
| Gas Nitride | 1.2× | Long process time |
| DLC | 3-5× | Premium coating |
