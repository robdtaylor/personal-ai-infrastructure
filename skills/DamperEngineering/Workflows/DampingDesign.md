# DampingDesign Workflow

Engineering process for designing damping curves based on vehicle dynamics requirements. Covers force-velocity characterisation, curve shaping, and DSSV valve specification.

## Workflow Overview

```
┌─────────────────────────────────────────────────────────┐
│              DAMPING DESIGN PROCESS                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────────────┐                                    │
│  │ 1. VEHICLE     │ Mass, spring rate, geometry        │
│  │    DYNAMICS    │                                    │
│  └───────┬────────┘                                    │
│          ▼                                              │
│  ┌────────────────┐                                    │
│  │ 2. CRITICAL    │ Cc = 2√(km)                        │
│  │    DAMPING     │                                    │
│  └───────┬────────┘                                    │
│          ▼                                              │
│  ┌────────────────┐                                    │
│  │ 3. DAMPING     │ ζ selection by application         │
│  │    RATIO       │                                    │
│  └───────┬────────┘                                    │
│          ▼                                              │
│  ┌────────────────┐                                    │
│  │ 4. FORCE       │ F = C × v at key velocities        │
│  │    TARGETS     │                                    │
│  └───────┬────────┘                                    │
│          ▼                                              │
│  ┌────────────────┐                                    │
│  │ 5. CURVE       │ Digressive / Linear / Progressive  │
│  │    SHAPING     │                                    │
│  └───────┬────────┘                                    │
│          ▼                                              │
│  ┌────────────────┐                                    │
│  │ 6. VALVE       │ Port window design                 │
│  │    SPEC        │                                    │
│  └────────────────┘                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Step 1: Vehicle Dynamics Input

### Required Data

```markdown
## Vehicle Dynamics Data

### Per Corner (specify Front/Rear)

| Parameter | Front | Rear | Units |
|-----------|-------|------|-------|
| Sprung mass (m) | | | kg |
| Unsprung mass | | | kg |
| Spring rate at wheel (k) | | | N/mm |
| Motion ratio (MR) | | | - |
| Wheel travel (bump) | | | mm |
| Wheel travel (droop) | | | mm |

### Derived Values

| Parameter | Front | Rear | Units |
|-----------|-------|------|-------|
| Wheel rate | | | N/mm |
| Natural frequency (fn) | | | Hz |
| Damper stroke | | | mm |
| Damper velocity ratio | | | - |
```

### Natural Frequency Calculation

```
fn = (1 / 2π) × √(k / m)

Where:
k = Wheel rate (N/m) = Spring rate × MR²
m = Sprung mass per corner (kg)

Convert spring rate:
k (N/m) = k (N/mm) × 1000
```

**Target Natural Frequencies:**

| Application | Front (Hz) | Rear (Hz) | Notes |
|-------------|------------|-----------|-------|
| Luxury | 1.0-1.2 | 1.2-1.4 | Rear slightly higher |
| Sport road | 1.3-1.6 | 1.4-1.8 | Tighter body control |
| Track day | 1.6-2.2 | 1.8-2.4 | Flat ride priority |
| Race (no aero) | 2.0-3.0 | 2.2-3.2 | Mechanical grip |
| Race (high aero) | 3.0-5.0 | 3.5-6.0 | Platform stability |
| Off-road | 1.2-1.8 | 1.4-2.0 | Wheel travel priority |

---

## Step 2: Critical Damping Calculation

### Formula

```
Cc = 2 × √(k × m)

Where:
Cc = Critical damping coefficient (Ns/m)
k = Wheel rate (N/m)
m = Sprung mass per corner (kg)

This is the damping required for zero oscillation (ζ = 1.0)
```

### Example Calculation

```
Given:
- Sprung mass: 350 kg per corner
- Spring rate: 60 N/mm at wheel
- Motion ratio: 0.75

Wheel rate: k = 60 × 0.75² = 33.75 N/mm = 33,750 N/m

Natural frequency:
fn = (1/2π) × √(33750/350) = 1.56 Hz ✓ (sport road)

Critical damping:
Cc = 2 × √(33750 × 350) = 6,873 Ns/m at wheel
```

---

## Step 3: Damping Ratio Selection

### Damping Ratio (ζ) Guidelines

```
ζ = C / Cc

Where:
C = Actual damping coefficient
Cc = Critical damping coefficient

ζ < 1.0 = Underdamped (oscillates)
ζ = 1.0 = Critically damped (no oscillation, slowest return)
ζ > 1.0 = Overdamped (slow return, no oscillation)

Automotive always underdamped (ζ = 0.15-0.80)
```

### Application-Based Selection

| Application | ζ Rebound | ζ Compression | C/R Ratio |
|-------------|-----------|---------------|-----------|
| **Luxury road** | 0.20-0.30 | 0.15-0.25 | 0.6-0.8 |
| **Sport road** | 0.30-0.45 | 0.20-0.35 | 0.5-0.7 |
| **Track day** | 0.40-0.55 | 0.30-0.45 | 0.5-0.7 |
| **Club race** | 0.50-0.65 | 0.35-0.50 | 0.5-0.7 |
| **Pro race** | 0.60-0.80 | 0.45-0.65 | 0.5-0.7 |
| **Rally/off-road** | 0.35-0.50 | 0.25-0.40 | 0.6-0.8 |

### Why Different Rebound vs Compression?

```
COMPRESSION (Bump):
- Wheel hitting obstacle
- Want wheel to move up quickly (absorb)
- Lower damping = better absorption
- Too low = bottoming, poor control

REBOUND (Droop):
- Wheel returning after bump
- Want controlled return (body support)
- Higher damping = better support
- Too high = wheel can't follow road

Typical: Compression = 50-70% of Rebound
```

---

## Step 4: Force Target Calculation

### Damping Coefficient

```
C = ζ × Cc

Example (continuing from above):
Sport road, ζ_rebound = 0.40, ζ_compression = 0.28

C_rebound = 0.40 × 6873 = 2749 Ns/m at wheel
C_compression = 0.28 × 6873 = 1924 Ns/m at wheel
```

### Force at Velocity

```
F = C × v

At standard test velocities:
```

| Velocity | What It Represents |
|----------|-------------------|
| 0.025 m/s | Parking, very slow |
| 0.05 m/s | Slow roll, comfort |
| 0.1 m/s | Normal road driving |
| 0.3 m/s | **Primary control point** |
| 0.5 m/s | Aggressive road |
| 1.0 m/s | Kerb strike, pothole |
| 2.0+ m/s | Severe impact |

### Force Calculation Example

```
At wheel (v = 0.3 m/s):
F_rebound = 2749 × 0.3 = 825 N
F_compression = 1924 × 0.3 = 578 N

At damper (MR = 0.75):
v_damper = v_wheel × MR = 0.3 × 0.75 = 0.225 m/s
F_damper = F_wheel / MR

F_rebound_damper = 825 / 0.75 = 1100 N at 0.225 m/s
F_compression_damper = 578 / 0.75 = 771 N at 0.225 m/s
```

### Force Target Template

```markdown
## Damping Force Targets

**Position:** [Front / Rear]
**Reference velocity:** At damper

| Velocity (m/s) | Rebound (N) | Compression (N) | C/R |
|----------------|-------------|-----------------|-----|
| 0.05 | | | |
| 0.1 | | | |
| 0.3 | | | |
| 0.5 | | | |
| 1.0 | | | |

**Notes:**
- Primary control point: 0.3 m/s
- Tolerance: ±8% at 0.3 m/s (CC), ±10% other velocities
```

---

## Step 5: Curve Shaping

### Curve Types

**Linear:**
```
Force
  ▲
  │              /
  │            /
  │          /
  │        /      F = C × v
  │      /        Constant slope
  │    /
  │  /
  │/
  └──────────────▶ Velocity

Advantages:
- Predictable, consistent feel
- Easy to model/simulate
- Driver can feel limit approaching

Use for:
- Baseline development
- Racing (driver feedback)
- Reference curves
```

**Digressive:**
```
Force
  ▲
  │     ___________
  │    /
  │   /
  │  /              High slope at low speed
  │ /               Flattens at high speed
  │/
  └──────────────▶ Velocity

Advantages:
- Good low-speed control
- Comfortable over sharp impacts
- Body control without harshness

Use for:
- Road cars (comfort priority)
- Luxury/GT applications
- Daily drivers

Typical knee point: 0.1-0.3 m/s
High-speed force: 60-80% of linear projection
```

**Progressive:**
```
Force
  ▲
  │                 /
  │               /
  │             /
  │           /      Low slope at low speed
  │         /        Steepens at high speed
  │       /
  │    __/
  │ __/
  └──────────────▶ Velocity

Advantages:
- Soft over small bumps
- Strong high-speed control
- Bottoming resistance

Use for:
- Off-road (travel management)
- High-speed stability
- Aero cars (platform control)

Typical knee point: 0.3-0.5 m/s
```

### Blended Curves

**Digressive Low-Speed + Linear High-Speed:**
```
Most common for performance road cars

Force
  ▲
  │              /
  │            /
  │          /
  │        /     ← Linear above knee
  │      /
  │    ╱         ← Digressive below knee
  │  ╱
  │╱
  └──────────────▶ Velocity

Knee point: 0.1-0.2 m/s
Provides comfort + predictability
```

---

## Step 6: DSSV Valve Specification

### Port Window Design Principles

**Rectangular Ports:**
```
┌─────────────────────────────────────┐
│                                     │
│    ┌──────┐  ┌──────┐  ┌──────┐   │
│    │      │  │      │  │      │   │
│    │      │  │      │  │      │   │
│    └──────┘  └──────┘  └──────┘   │
│                                     │
│    Equal width ports                │
│    → Linear flow vs spool position  │
│    → Linear force-velocity          │
│                                     │
└─────────────────────────────────────┘
```

**Tapered Ports (Digressive):**
```
┌─────────────────────────────────────┐
│                                     │
│    ╱────╲    ╱────╲    ╱────╲     │
│   ╱      ╲  ╱      ╲  ╱      ╲    │
│  ╱        ╲╱        ╲╱        ╲   │
│                                     │
│    Wide at top, narrow at bottom    │
│    → High initial area gain         │
│    → Diminishing area at travel     │
│    → Digressive characteristic      │
│                                     │
└─────────────────────────────────────┘
```

**Progressive Slots:**
```
┌─────────────────────────────────────┐
│                                     │
│    │    │    │    │    │    │     │
│    │    │    │    │    │    │     │
│    ╲    ╱╲    ╱╲    ╱╲    ╱╲    ╱  │
│     ╲  ╱  ╲  ╱  ╲  ╱  ╲  ╱  ╲  ╱   │
│      ╲╱    ╲╱    ╲╱    ╲╱    ╲╱    │
│                                     │
│    Narrow at top, wide at bottom    │
│    → Low initial area               │
│    → Increasing area at travel      │
│    → Progressive characteristic     │
│                                     │
└─────────────────────────────────────┘
```

### Valve Sizing Matrix

| Damper OD | Valve OD | Port Area Range | Force Range @0.3m/s |
|-----------|----------|-----------------|---------------------|
| 36mm | 20mm | 8-20 mm² | 200-600 N |
| 46mm | 25mm | 15-35 mm² | 400-1200 N |
| 60mm | 32mm | 25-60 mm² | 800-2500 N |
| 70mm+ | 40mm | 40-100 mm² | 1500-4000 N |

### Valve Specification Template

```markdown
## DSSV Valve Specification

**Damper:** [P/N or project name]
**Position:** [Front / Rear]

### Compression Valve

| Parameter | Value |
|-----------|-------|
| Valve OD | mm |
| Number of ports | |
| Port shape | [Rectangular/Tapered/Progressive] |
| Total port area | mm² |
| Spring preload | N |
| Target force @ 0.3 m/s | N |

### Rebound Valve

| Parameter | Value |
|-----------|-------|
| Valve OD | mm |
| Number of ports | |
| Port shape | [Rectangular/Tapered/Progressive] |
| Total port area | mm² |
| Spring preload | N |
| Target force @ 0.3 m/s | N |

### Predicted Force-Velocity

| Velocity (m/s) | Rebound (N) | Compression (N) |
|----------------|-------------|-----------------|
| 0.05 | | |
| 0.1 | | |
| 0.3 | | |
| 0.5 | | |
| 1.0 | | |
```

---

## Complete Design Example

### Input Data

```
Vehicle: Lightweight track day car
Front corner:
- Sprung mass: 280 kg
- Spring rate: 70 N/mm (at wheel)
- Motion ratio: 0.70
- Wheel travel: 80mm bump, 100mm droop

Application: Track day with some road use
Target character: Sport-biased with comfort
```

### Calculations

```
Step 1: Natural Frequency
Wheel rate: 70 × 0.70² = 34.3 N/mm = 34,300 N/m
fn = (1/2π) × √(34300/280) = 1.76 Hz ✓ (track day range)

Step 2: Critical Damping
Cc = 2 × √(34300 × 280) = 6,199 Ns/m

Step 3: Damping Ratio
Track day: ζ_rebound = 0.50, ζ_compression = 0.35

Step 4: Force Targets (at wheel)
C_rebound = 0.50 × 6199 = 3,100 Ns/m
C_compression = 0.35 × 6199 = 2,170 Ns/m

At v = 0.3 m/s (wheel):
F_rebound = 3100 × 0.3 = 930 N
F_compression = 2170 × 0.3 = 651 N
C/R ratio = 651/930 = 0.70 ✓

At damper (MR = 0.70):
v_damper = 0.3 × 0.70 = 0.21 m/s
F_rebound = 930 / 0.70 = 1,329 N
F_compression = 651 / 0.70 = 930 N

Step 5: Curve Shape
Digressive low-speed for road comfort
Linear high-speed for track predictability
Knee point: 0.15 m/s

Step 6: Valve Selection
46mm damper body → 25mm valve
Tapered ports for digressive character
```

### Output Specification

```markdown
## Front Damper - Force Targets

| Velocity (m/s) | Rebound (N) | Compression (N) |
|----------------|-------------|-----------------|
| 0.05 | 350 | 245 |
| 0.1 | 600 | 420 |
| 0.21 (0.3 wheel) | 1,329 | 930 |
| 0.35 (0.5 wheel) | 1,850 | 1,295 |
| 0.70 (1.0 wheel) | 2,800 | 1,960 |

Curve shape: Digressive below 0.15 m/s, linear above
C/R ratio: 0.70
Valve: 25mm OD, tapered ports
```

---

## Validation Checklist

```markdown
## Damping Design Validation

□ Natural frequency in target range for application
□ Damping ratio appropriate for use case
□ C/R ratio within 0.5-0.8 range
□ Force targets achievable with selected valve size
□ Curve shape matches intended character
□ Motion ratio correctly applied
□ Wheel vs damper velocities clearly stated
□ Tolerances defined (±8% at 0.3 m/s)
□ Cross-checked with similar applications
□ Customer sign-off on targets
```
