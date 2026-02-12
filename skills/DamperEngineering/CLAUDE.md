# DamperEngineering - Extended Engineering Knowledge

**Deep engineering content for hydraulic damper design, materials, seals, and customer application work.**

---

## Table of Contents

1. [Hydraulic Design Deep Dive](#hydraulic-design-deep-dive)
2. [Mechanical Engineering Calculations](#mechanical-engineering-calculations)
3. [Materials Specification Details](#materials-specification-details)
4. [Seal & O-Ring Engineering](#seal--o-ring-engineering)
5. [Slyde Ring / Piston Seal Design](#slyde-ring--piston-seal-design)
6. [Thermal Management](#thermal-management)
7. [Damping Curve Engineering](#damping-curve-engineering)
8. [Application Engineering Process](#application-engineering-process)

---

## Hydraulic Design Deep Dive

### Orifice Flow Fundamentals

**Sharp-Edged Orifice (Turbulent):**
```
Q = Cd × A × √(2 × ΔP / ρ)

Where:
Q  = Volumetric flow rate (m³/s)
Cd = Discharge coefficient (0.6-0.65 for sharp edge)
A  = Orifice area (m²)
ΔP = Pressure differential (Pa)
ρ  = Fluid density (kg/m³)
```

**Laminar Flow (Capillary/Annulus):**
```
Q = (π × ΔP × r⁴) / (8 × μ × L)    [Hagen-Poiseuille]

Where:
r = Radius (m)
μ = Dynamic viscosity (Pa·s)
L = Length (m)
```

**Damping Force Relationship:**
```
ORIFICE DAMPING

Force (N)
    ▲
    │                    ╱ F ∝ v²
    │                  ╱   (Turbulent)
    │                ╱
    │              ╱
    │            ╱
    │          ╱  ← F ∝ v
    │        ╱      (Laminar)
    │      ╱
    │    ╱
    │  ╱
    │╱
    └──────────────────────────▶ Velocity (m/s)

Transition occurs at Re ≈ 2000-4000
```

### Valve Pressure-Flow Characteristics

**DSSV Port Window Analysis:**

| Port Type | Flow Equation | Characteristic |
|-----------|---------------|----------------|
| Rectangular | Q = Cd × w × h × √(2ΔP/ρ) | Linear with spool position |
| Tapered | Q = Cd × w(x) × h × √(2ΔP/ρ) | Digressive |
| Metering groove | Q = f(groove geometry) | Progressive |

**Valve Flow Coefficient:**
```
Cv = Q × √(SG / ΔP)

Where:
Q  = Flow (GPM for US Cv, m³/h for Kv)
SG = Specific gravity (≈0.86 for damper oil)
ΔP = Pressure drop (psi for Cv, bar for Kv)

Kv = 0.865 × Cv
```

### Cavitation Prevention

**Cavitation occurs when:**
```
P_local < P_vapor

Risk factors:
- High velocity through restrictions
- Low gas charge pressure
- Low fluid temperature (higher viscosity)
- Air entrainment
```

**Minimum Gas Pressure Calculation:**
```
P_gas_min > (F_max / A_rod) + P_atmosphere + P_safety

Where:
F_max = Maximum damping force (N)
A_rod = Rod cross-sectional area (m²)
P_safety = 2-5 bar margin

Example:
F_max = 3000 N, Rod Ø20mm
A_rod = π × 0.01² = 3.14 × 10⁻⁴ m²
P_rod = 3000 / 3.14 × 10⁻⁴ = 9.55 MPa = 95.5 bar

P_gas_min = 95.5 + 1 + 5 = 101.5 bar (excessive!)

Reality: Piston area >> rod area, so actual pressure much lower
Typically P_gas = 10-25 bar for automotive dampers
```

### Fluid Selection

**Damper Oil Properties:**

| Property | Typical Range | Impact |
|----------|---------------|--------|
| Viscosity @40°C | 10-50 cSt | Damping force |
| Viscosity @100°C | 3-10 cSt | High-temp performance |
| VI (Viscosity Index) | 150-250 | Temperature stability |
| Pour point | -40 to -55°C | Cold start performance |
| Density | 0.82-0.88 kg/L | Force calculation |
| Foam tendency | Low | Cavitation resistance |

**Temperature-Viscosity Relationship:**
```
μ(T) = μ₀ × exp(B × (1/T - 1/T₀))   [Arrhenius approximation]

Or use Walther equation for better accuracy over wide range
```

---

## Mechanical Engineering Calculations

### Rod Sizing

**Tensile/Compressive Stress:**
```
σ = F / A = F / (π × d²/4)

Design limit: σ < 0.6 × Sy

Example:
F = 5000 N, Rod Ø16mm, 4140 steel (Sy = 700 MPa)
σ = 5000 / (π × 0.016²/4) = 24.9 MPa
Safety factor = 700 / 24.9 = 28 (very conservative)
```

**Buckling Analysis (Euler):**
```
P_critical = (π² × E × I) / (K × L)²

Where:
E = Young's modulus (Pa)
I = Second moment of area (m⁴) = π × d⁴/64
K = End condition factor (0.5-2.0)
L = Unsupported length (m)

For damper rod:
K ≈ 0.7 (guided ends)
L = stroke length

Safety factor > 3 required
```

**Combined Loading (Bending + Axial):**
```
σ_combined = (F/A) + (M × c / I)

Where:
M = Bending moment from side load
c = Distance to neutral axis (d/2)

Check: σ_combined < 0.5 × Sy for fatigue
```

### Tube Design

**Hoop Stress (Internal Pressure):**
```
σ_hoop = P × r / t     [Thin wall, t < 0.1 × r]

Or for thick wall:
σ_hoop = P × (r_i² + r_o²) / (r_o² - r_i²)   [At inner surface]
```

**Tube Wall Thickness Sizing:**
```
t_min = (P × r) / (S × E - 0.6 × P)   [ASME pressure vessel]

Where:
P = Design pressure (Pa)
r = Inner radius (m)
S = Allowable stress (Pa)
E = Joint efficiency (1.0 for seamless)
```

### Thread Design

**Thread Stripping:**
```
F_strip = π × d × L_e × τ_allowable

Where:
d = Nominal thread diameter (m)
L_e = Engaged thread length (m)
τ_allowable = 0.4 × Sy (shear allowable)

Minimum engagement: L_e > d
```

**Preload Calculation:**
```
T = K × d × F_preload

Where:
T = Torque (Nm)
K = Nut factor (0.15-0.20 for lubricated)
d = Nominal diameter (m)
F_preload = Target preload (N)

Target: F_preload = 0.7 × F_proof
```

### Fatigue Analysis

**S-N Curve Approximation:**
```
S = S_f × N^b

Where:
S_f = Fatigue strength coefficient
b = Fatigue strength exponent (-0.05 to -0.15)
N = Cycles to failure
```

**Fatigue Safety Factor:**
```
MODIFIED GOODMAN DIAGRAM

Alternating Stress (Sa)
         ▲
    Se   │╲
         │ ╲
         │  ╲
         │   ╲
         │    ╲  ← Safe region below line
         │     ╲
         └──────╲──────▶ Mean Stress (Sm)
                 Su

SF = 1 / (Sa/Se + Sm/Su)

Target SF > 2.0 for damper components
```

**Stress Concentration Factors:**

| Feature | Kt (Bending) | Kt (Axial) |
|---------|--------------|------------|
| Shoulder fillet r/d=0.1 | 1.8 | 1.6 |
| Shoulder fillet r/d=0.2 | 1.4 | 1.3 |
| Thread root | 2.5-3.5 | 2.5-3.5 |
| Keyway | 2.0-2.5 | 1.8-2.2 |
| Cross-hole | 2.0-2.5 | 2.0-2.5 |

---

## Materials Specification Details

### Aluminium Alloys - Full Specifications

**6061-T6:**
```
Composition: Al-Mg-Si
Si: 0.4-0.8%, Mg: 0.8-1.2%, Cu: 0.15-0.4%

Mechanical Properties:
- Tensile strength: 310 MPa
- Yield strength: 276 MPa
- Elongation: 12%
- Hardness: 95 HB
- Fatigue limit: 97 MPa (10⁷ cycles)
- E: 68.9 GPa, G: 26 GPa
- Density: 2.70 g/cm³

Applications: Tubes, bodies, end caps
Machinability: Excellent
Weldability: Good (strength reduced in HAZ)
Anodizing: Excellent
```

**7075-T6:**
```
Composition: Al-Zn-Mg-Cu
Zn: 5.1-6.1%, Mg: 2.1-2.9%, Cu: 1.2-2.0%

Mechanical Properties:
- Tensile strength: 572 MPa
- Yield strength: 503 MPa
- Elongation: 11%
- Hardness: 150 HB
- Fatigue limit: 159 MPa (10⁷ cycles)
- E: 71.7 GPa, G: 26.9 GPa
- Density: 2.81 g/cm³

Applications: High-stress components
Machinability: Good
Weldability: Poor (not recommended)
Anodizing: Good (hard anodize for wear)

CAUTION: Susceptible to stress corrosion cracking
Avoid sustained tensile stress in corrosive environment
```

**2024-T351:**
```
Composition: Al-Cu-Mg
Cu: 3.8-4.9%, Mg: 1.2-1.8%, Mn: 0.3-0.9%

Mechanical Properties:
- Tensile strength: 469 MPa
- Yield strength: 324 MPa
- Elongation: 19%
- Hardness: 120 HB
- Fatigue limit: 138 MPa (10⁷ cycles)
- E: 72.4 GPa

Applications: Fatigue-critical components
Machinability: Good
Weldability: Poor
Best fatigue properties of common Al alloys
```

### Steel Specifications

**4140 (AISI/SAE):**
```
Composition: 0.38-0.43%C, 0.75-1.0%Mn, 0.80-1.10%Cr, 0.15-0.25%Mo

Condition: Quenched & Tempered

Temper    Sy (MPa)   Su (MPa)   Elongation   Hardness
400°C     1100       1210       11%          38 HRC
500°C     860        970        15%          31 HRC
600°C     655        810        19%          25 HRC

Applications: Piston rods, shafts
Surface treatment: Hard chrome, nitride, QPQ
Machinability: Good when normalized
Weldability: Requires preheat (200-300°C)
```

**4340 (AISI/SAE):**
```
Composition: 0.38-0.43%C, 0.60-0.80%Mn, 0.70-0.90%Cr,
             0.20-0.30%Mo, 1.65-2.00%Ni

Condition: Quenched & Tempered

Temper    Sy (MPa)   Su (MPa)   Elongation   Hardness
400°C     1400       1550       10%          45 HRC
500°C     1100       1200       13%          38 HRC
600°C     860        950        16%          30 HRC

Applications: Premium piston rods, high-load
Superior fatigue life to 4140
Excellent toughness
More expensive than 4140
```

**17-4 PH (Stainless):**
```
Composition: 15-17.5%Cr, 3-5%Ni, 3-5%Cu, 0.15-0.45%Nb

Condition    Sy (MPa)   Su (MPa)   Hardness
H900         1170       1310       40 HRC
H1025        1000       1070       35 HRC
H1075        860        1000       32 HRC
H1150        725        930        28 HRC

Applications: Corrosive environments, marine
No chrome plating required
Good corrosion resistance
Heat treatable stainless
More expensive than carbon steel
```

### Surface Treatments for Rods

**Hard Chrome Plating:**
```
Properties:
- Thickness: 25-75 μm typical
- Hardness: 65-70 HRC
- Surface finish: Ra 0.1-0.2 μm (after grinding)
- Max operating temp: 400°C

Process: Electroplating from chromic acid bath
Advantages: Excellent wear, repairable
Disadvantages: Environmental concerns, hydrogen embrittlement risk
Post-treatment: Bake at 190-200°C for 8-24h (de-embrittlement)
```

**QPQ (Quench-Polish-Quench) / Nitrocarburizing:**
```
Properties:
- Case depth: 15-30 μm compound layer
- Total depth: 0.3-0.5 mm diffusion zone
- Surface hardness: 60-65 HRC
- Surface finish: Ra 0.2-0.4 μm

Process: Salt bath nitrocarburizing
Advantages: Excellent corrosion, no environmental issues
Disadvantages: Cannot be reworked, dimensional change
Best for: High-volume production
```

**DLC (Diamond-Like Carbon):**
```
Properties:
- Thickness: 2-5 μm typical
- Hardness: 70+ HRC (2000-3000 HV)
- Surface finish: Ra < 0.05 μm
- Friction coefficient: 0.05-0.15

Process: PVD/PACVD coating
Advantages: Extreme wear, very low friction
Disadvantages: Expensive, thin coating, adhesion critical
Best for: High-performance, motorsport
```

---

## Seal & O-Ring Engineering

### O-Ring Groove Design Calculations

**Groove Depth Calculation:**
```
G = CS - (CS × %squeeze / 100)

Where:
G = Groove depth (mm)
CS = O-ring cross-section diameter (mm)
%squeeze = Target compression (%)

Example (Dynamic rod seal):
CS = 3.53 mm (AS568-214)
%squeeze = 12%
G = 3.53 - (3.53 × 0.12) = 3.11 mm
```

**Groove Width Calculation:**
```
Static: W = 1.3 × CS to 1.4 × CS
Dynamic: W = 1.4 × CS to 1.5 × CS

Provides room for thermal expansion and prevents extrusion
```

**Gland Fill Calculation:**
```
Fill% = (O-ring volume / Groove volume) × 100

O-ring volume = (π² × CS² × ID) / 4
Groove volume = π × W × G × ID_groove

Target fill:
Static: 75-90%
Dynamic: 70-85%
```

### O-Ring Size Selection

**Standard Series:**

| Series | CS (mm) | Application |
|--------|---------|-------------|
| AS568-1xx | 1.78 | Light duty |
| AS568-2xx | 2.62 | Standard |
| AS568-3xx | 3.53 | Standard/heavy |
| AS568-4xx | 5.33 | Heavy duty |
| Metric | Various | Custom |

**ID Selection for Rod Seal:**
```
O-ring ID = Rod OD - (2 × stretch)

Target stretch: 2-5%
Max stretch: 8%

Example:
Rod Ø20mm, target 3% stretch
O-ring ID = 20 / 1.03 = 19.42 mm
Select nearest standard size
```

### Material Selection Guide

**NBR (Nitrile Rubber):**
```
Temperature: -30 to +100°C (short: +120°C)
Hardness: 70-90 Shore A (typically 70A for seals)
Compatible: Mineral oils, petroleum, water, silicone oils
Incompatible: Ozone, UV, ketones, esters
Compression set: Moderate
Cost: Low
Use for: Standard automotive dampers
```

**FKM (Fluoroelastomer / Viton):**
```
Temperature: -20 to +200°C (some grades to +250°C)
Hardness: 75-90 Shore A
Compatible: Most fluids, oils, fuels, acids
Incompatible: Ketones, amines, hot water
Compression set: Excellent
Cost: High (3-5× NBR)
Use for: High-temperature, motorsport
```

**HNBR (Hydrogenated NBR):**
```
Temperature: -30 to +150°C
Hardness: 70-90 Shore A
Compatible: Oils, refrigerants
Incompatible: Strong oxidizers
Compression set: Good
Cost: Medium (2× NBR)
Use for: Extended temperature range road cars
```

### Backup Ring Design

**When Required:**
```
Pressure > (hardness × 10) bar for dynamic seals

Example:
70 Shore A O-ring, max pressure without backup ≈ 70 bar

Above this, extrusion gap must be controlled
```

**Extrusion Gap Limits:**

| Pressure (bar) | Max Gap (mm) for 70A |
|----------------|----------------------|
| 35 | 0.15 |
| 70 | 0.10 |
| 140 | 0.05 |
| 210 | 0.025 |

**Backup Ring Materials:**
- PTFE: Standard, low friction
- PEEK: High pressure, temperature
- Nylon: Economy option

---

## Slyde Ring / Piston Seal Design

### Piston Seal Configurations

**Single-Acting Piston Seal:**
```
┌────────────────────────────────┐
│                                │
│  ┌────────────────────────┐   │
│  │     ████████████████   │   │
│  │     ████████████████   │   │
│  │     ↑ Slyde ring       │   │
│  │     Low friction       │   │
│  │     Bidirectional      │   │
│  └────────────────────────┘   │
│                                │
└────────────────────────────────┘

Suitable for monotube dampers
Seals gas from oil
```

**Energized Piston Seal:**
```
┌────────────────────────────────┐
│                                │
│  ┌────────────────────────┐   │
│  │  ███  ○○○  ███         │   │
│  │  ███  ○○○  ███         │   │
│  │   ↑    ↑    ↑          │   │
│  │ PTFE  O-ring PTFE      │   │
│  │ seal  energizer seal   │   │
│  └────────────────────────┘   │
│                                │
└────────────────────────────────┘

Better sealing at low pressure
More complex groove
```

### Slyde Ring Materials

**PTFE (Virgin):**
```
Properties:
- Friction: 0.04-0.10 (lowest)
- PV limit: 0.035 MPa·m/s
- Temperature: -200 to +260°C
- Wear: Moderate (high without filler)

Use for: Low load, dry running capability
Not suitable for high PV applications
```

**PTFE + 40% Bronze:**
```
Properties:
- Friction: 0.10-0.15
- PV limit: 0.46 MPa·m/s
- Temperature: -200 to +260°C
- Wear: Good

Use for: General purpose piston seals
Most common damper piston seal material
```

**PTFE + 25% Carbon + 5% Graphite:**
```
Properties:
- Friction: 0.08-0.12
- PV limit: 1.05 MPa·m/s
- Temperature: -200 to +260°C
- Wear: Very good

Use for: Higher duty, better wear life
Suitable for motorsport
```

**PEEK:**
```
Properties:
- Friction: 0.35-0.45 (needs lubrication)
- PV limit: 3.5 MPa·m/s
- Temperature: -60 to +250°C
- Wear: Excellent

Use for: Extreme conditions
Highest load capacity
Requires good lubrication (oil system)
```

### Slyde Ring Groove Design

**Key Dimensions:**
```
GROOVE CROSS-SECTION

     ← W →
    ┌─────┐
    │     │ ↑
    │     │ H
    │     │ ↓
    └─────┘

W = Ring width + clearance (0.05-0.15mm per side)
H = Ring thickness - interference (0.1-0.3mm)
```

**Interference Guidelines:**

| Ring Thickness | Radial Interference |
|----------------|---------------------|
| 2.0 mm | 0.1-0.15 mm |
| 2.5 mm | 0.15-0.20 mm |
| 3.0 mm | 0.20-0.25 mm |
| 4.0 mm | 0.25-0.30 mm |

**Diametral Clearance:**
```
Bore - Ring OD (when installed) = 0 to 0.05 mm

Slight interference ensures seal
Too much = increased friction/wear
Too little = blow-by risk
```

---

## Thermal Management

### Heat Generation in Dampers

**Power Dissipation:**
```
P = F × v

Where:
P = Power (W)
F = Damping force (N)
v = Velocity (m/s)

Example:
F = 2000 N at v = 1 m/s
P = 2000 × 1 = 2000 W
```

**Energy per Cycle:**
```
E = ∫ F × v dt   (over one cycle)

For sinusoidal motion:
E ≈ π × F_peak × v_peak × stroke / 4
```

**Temperature Rise:**
```
ΔT = E × n_cycles / (m × Cp)

Where:
m = Fluid mass (kg)
Cp = Specific heat (≈2000 J/kg·K for damper oil)
n_cycles = Number of cycles

Steady state depends on heat dissipation
```

### Heat Dissipation

**Heat Transfer Modes:**

| Mode | Path | Typical % |
|------|------|-----------|
| Convection | Tube to air | 60-80% |
| Conduction | Through mounts | 10-20% |
| Radiation | Tube surface | 5-15% |

**Convection Heat Transfer:**
```
Q = h × A × ΔT

Where:
h = Convection coefficient (5-25 W/m²K for natural, 25-250 for forced)
A = Surface area (m²)
ΔT = Temperature difference (°C)
```

### Temperature Limits

| Component | Max Temp | Limiting Factor |
|-----------|----------|-----------------|
| NBR seals | 100°C | Hardening, failure |
| FKM seals | 200°C | Material limit |
| Damper oil | 120-150°C | Viscosity breakdown |
| Chrome plating | 400°C | Cracking |
| Aluminium body | 150°C | Strength reduction |

### Thermal Design Guidelines

**Motorsport Considerations:**
- Continuous high-speed = high heat generation
- Remote reservoir adds oil volume (thermal mass)
- External coolers for endurance racing
- FKM seals mandatory

**Off-Road Considerations:**
- Intermittent high loads
- Dust/debris on tube (reduced convection)
- Wide ambient temperature range
- Consider cooling fins on reservoir

---

## Damping Curve Engineering

### Vehicle Dynamics Fundamentals

**Natural Frequency:**
```
fn = (1/2π) × √(k/m)

Where:
k = Wheel rate (N/m) = spring rate × MR²
m = Sprung mass at corner (kg)
MR = Motion ratio

Typical values:
Luxury: 1.0-1.2 Hz
Sport: 1.3-1.8 Hz
Race: 2.0-4.0 Hz (aero platforms higher)
```

**Critical Damping:**
```
Cc = 2 × √(k × m)

This is the damping required for no oscillation
Actual damping ratio ζ = C / Cc
```

**Damping Force Calculation:**
```
At wheel:
F_wheel = C × v_wheel

At damper:
F_damper = C × MR × v_wheel = C × v_damper

MR amplifies velocity, so:
C_damper = C_wheel / MR²
```

### Damping Ratio Guidelines

**Low-Speed (< 0.1 m/s):**
```
Controls body motion over road undulations
Higher = better body control, harsher ride
Lower = softer ride, more body roll

Comfort: ζ = 0.15-0.25
Sport: ζ = 0.25-0.40
Race: ζ = 0.40-0.60
```

**High-Speed (> 0.5 m/s):**
```
Controls wheel motion over sharp impacts
Higher = better wheel control, harsh impacts
Lower = better impact absorption, less control

Usually 30-60% of low-speed damping
Digressive curve shape typical
```

### Curve Shape Design

**Digressive:**
```
Force
  ▲
  │     ___________
  │    /
  │   /
  │  /
  │ /
  │/
  └──────────────▶ Velocity

High initial slope, flattens at speed
Comfort-oriented
Low-speed control, high-speed absorption
```

**Linear:**
```
Force
  ▲
  │              /
  │            /
  │          /
  │        /
  │      /
  │    /
  │  /
  │/
  └──────────────▶ Velocity

Constant damping coefficient
Predictable, baseline tuning
Racing: allows driver to feel limit
```

**Progressive:**
```
Force
  ▲
  │                 /
  │               /
  │             /
  │           /
  │         /
  │       /
  │    __/
  │ __/
  └──────────────▶ Velocity

Low initial slope, steepens at speed
High-speed control emphasis
Off-road: bottoming resistance
```

### Force Balance (Compression/Rebound Ratio)

**Typical Ratios (C/R):**

| Application | C/R Ratio | Reason |
|-------------|-----------|--------|
| Comfort | 0.6-0.8 | Soft compression for ride |
| Sport | 0.5-0.7 | Balanced |
| Race | 0.4-0.6 | Fast compression, slow rebound |
| Off-road | 0.6-0.8 | Compression for impacts |

**Why Lower Compression?**
- Wheels need to follow bumps quickly (absorb)
- Rebound controls return (body support)
- Too much compression = wheel loses contact

---

## Application Engineering Process

### Stage 1: Requirements Capture

**Customer Interview Checklist:**
```
□ Vehicle type and intended use
□ Current suspension setup (springs, bars, geometry)
□ Current damper (if replacing) - what's wrong?
□ Performance targets (ride, handling, durability)
□ Package constraints (length, diameter, mounts)
□ Environmental conditions
□ Budget and timeline
□ Quantity requirements
□ Service/rebuild requirements
```

### Stage 2: Analysis

**Suspension Geometry Analysis:**
- Motion ratio calculation
- Wheel rate from spring rate
- Damper stroke from wheel travel
- Installation angles and forces

**Damping Requirement Calculation:**
- Natural frequency from weight/rate
- Critical damping calculation
- Target damping ratio selection
- Force targets at key velocities

### Stage 3: Preliminary Design

**Sizing Decisions:**
- Rod diameter (load capacity)
- Tube diameter (oil volume, valve size)
- Stroke (travel requirement)
- Mounting style (eye, clevis, spherical)

**Valve Selection:**
- DSSV cartridge size
- Port window geometry
- Predicted force-velocity curve

### Stage 4: Detail Design

**Component Specifications:**
- Materials for all components
- Surface treatments
- Seal specifications
- Fluid specification
- Gas charge pressure

**Drawing Package:**
- Assembly drawing
- Component drawings
- BOM

### Stage 5: Validation Plan

**Testing Requirements:**
- Force-velocity characterization
- Temperature testing
- Durability testing
- Vehicle testing (if applicable)

### Deliverables Checklist

```markdown
## Engineering Deliverables

□ Requirements document (signed off)
□ Preliminary sizing calculations
□ Force-velocity prediction
□ Material specifications
□ Seal specifications
□ Assembly drawing
□ Component drawings
□ BOM with part numbers
□ Test specification
□ Validation plan
□ Quote (link to QuoteEstimator skill)
```

---

## Quick Reference Formulas

### Hydraulics
```
Q = Cd × A × √(2ΔP/ρ)     [Orifice flow]
F = C × v^n                [Damping force]
Re = ρvD/μ                 [Reynolds number]
```

### Mechanics
```
σ = F/A                    [Axial stress]
Pcr = π²EI/(KL)²          [Euler buckling]
σh = Pr/t                  [Hoop stress]
```

### Sealing
```
Squeeze% = (CS - G)/CS × 100  [O-ring compression]
Fill% = V_ring/V_groove × 100 [Gland fill]
```

### Dynamics
```
fn = (1/2π)√(k/m)          [Natural frequency]
Cc = 2√(km)                [Critical damping]
ζ = C/Cc                   [Damping ratio]
```
