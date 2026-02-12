# ValveSpecification Workflow

DSSV (Dynamic Suspensions Spool Valve) specification and sizing for hydraulic damper applications. Covers valve selection, port window design, and force-velocity prediction.

## DSSV Technology Overview

### How DSSV Works

```
┌─────────────────────────────────────────────────────────┐
│              DSSV SPOOL VALVE OPERATION                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   AT REST (No Flow)                                    │
│   ┌───────────────────────────────────────────┐        │
│   │        ┌─────────────────────┐            │        │
│   │        │ ████  ░░░░  ████   │ ← Spool    │        │
│   │        │ ████  ░░░░  ████   │   (ports   │        │
│   │        │      blocked       │    closed) │        │
│   │        └─────────────────────┘            │        │
│   │              ↓ Spring                     │        │
│   └───────────────────────────────────────────┘        │
│                                                         │
│   FLOW CONDITION (Compression or Rebound)              │
│   ┌───────────────────────────────────────────┐        │
│   │        ┌─────────────────────┐            │        │
│   │        │ ████        ████   │ ← Spool    │        │
│   │ Flow → │ ████  ════  ████   │   shifted  │        │
│   │        │      ↑ open ports  │            │        │
│   │        └─────────────────────┘            │        │
│   │              ↓ Spring + ΔP                │        │
│   └───────────────────────────────────────────┘        │
│                                                         │
│   Flow through ports creates pressure drop              │
│   Pressure drop × piston area = damping force          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Key Advantages Over Shim Stacks

| Feature | Shim Stack | DSSV |
|---------|------------|------|
| Repeatability | ±15-20% | ±3% |
| Temperature sensitivity | 14-16% (30-120°C) | ~4% |
| Tuning precision | Limited steps | Infinite via ports |
| Revalving | Full disassembly | Cartridge swap |
| Cavitation | Requires high gas | By design resistant |
| Consistency | Degrades over time | Stable |

---

## Valve Sizing

### Damper Size to Valve Size

| Damper Body OD | Piston OD | Valve OD | Typical Application |
|----------------|-----------|----------|---------------------|
| 36 mm | 30-32 mm | 20 mm | Compact, motorcycle |
| 46 mm | 40-42 mm | 25 mm | Standard automotive |
| 60 mm | 52-54 mm | 32 mm | Heavy duty, off-road |
| 70 mm | 62-64 mm | 40 mm | Truck, industrial |

### Port Area Guidelines

```
FORCE RELATIONSHIP:

F = ΔP × A_piston

Where:
ΔP = f(Q, A_port, Cd)
Q = v × A_annular

At given velocity, smaller ports = higher ΔP = higher force
```

**Port Area Ranges by Application:**

| Valve OD | Soft (N @ 0.3m/s) | Medium | Firm |
|----------|-------------------|--------|------|
| 20 mm | 15-20 mm² (200-400N) | 10-15 mm² (400-600N) | 6-10 mm² (600-800N) |
| 25 mm | 25-35 mm² (400-700N) | 15-25 mm² (700-1000N) | 10-15 mm² (1000-1400N) |
| 32 mm | 40-60 mm² (800-1200N) | 25-40 mm² (1200-1800N) | 15-25 mm² (1800-2500N) |
| 40 mm | 60-100 mm² (1500-2500N) | 40-60 mm² (2500-3500N) | 25-40 mm² (3500-4500N) |

---

## Port Window Design

### Port Shapes and Characteristics

**Rectangular Ports (Linear):**
```
┌─────────────────────────────────────┐
│                                     │
│    ┌──────┐  ┌──────┐  ┌──────┐   │
│    │      │  │      │  │      │   │
│    │      │  │      │  │      │   │
│    │      │  │      │  │      │   │
│    └──────┘  └──────┘  └──────┘   │
│                                     │
│    Equal width throughout           │
│                                     │
│    Area = n × w × h                │
│    (n ports, width w, height h)     │
│                                     │
└─────────────────────────────────────┘

CHARACTERISTIC:
- Linear area vs spool position
- Linear flow vs spool position
- Linear force-velocity curve

USE FOR:
- Baseline/reference valves
- Racing (predictable feel)
- Where linear response needed
```

**Tapered Ports (Digressive):**
```
┌─────────────────────────────────────┐
│                                     │
│    ╱────╲    ╱────╲    ╱────╲     │
│   ╱      ╲  ╱      ╲  ╱      ╲    │
│  ╱        ╲╱        ╲╱        ╲   │
│                                     │
│    Wide at entry, narrow at full   │
│                                     │
│    Initial area gain: HIGH          │
│    Later area gain: LOW             │
│                                     │
└─────────────────────────────────────┘

CHARACTERISTIC:
- Rapid initial area opening
- Area gain reduces with travel
- Digressive force-velocity curve

USE FOR:
- Comfort-oriented dampers
- Low-speed control priority
- Road car applications

DESIGN PARAMETERS:
- Entry width (w1): Controls initial response
- Exit width (w2): Controls high-speed
- Taper angle: Controls transition
- w1/w2 ratio: 2:1 to 4:1 typical
```

**Progressive Slots (Progressive):**
```
┌─────────────────────────────────────┐
│                                     │
│    │    │    │    │    │    │     │
│    │    │    │    │    │    │     │
│    │    │    │    │    │    │     │
│    ╲    ╱╲    ╱╲    ╱╲    ╱╲    ╱  │
│     ╲  ╱  ╲  ╱  ╲  ╱  ╲  ╱  ╲  ╱   │
│      ╲╱    ╲╱    ╲╱    ╲╱    ╲╱    │
│                                     │
│    Narrow at entry, wide at full   │
│                                     │
│    Initial area gain: LOW           │
│    Later area gain: HIGH            │
│                                     │
└─────────────────────────────────────┘

CHARACTERISTIC:
- Gradual initial area opening
- Area gain increases with travel
- Progressive force-velocity curve

USE FOR:
- High-speed control emphasis
- Off-road (bottoming resistance)
- Aero car platform control

DESIGN PARAMETERS:
- Entry width (w1): Controls low-speed
- Exit width (w2): Controls high-speed
- w2/w1 ratio: 2:1 to 5:1 typical
```

**Metering Grooves (Fine Control):**
```
┌─────────────────────────────────────┐
│                                     │
│    ──────────────────────────────   │
│    │  │  │  │  │  │  │  │  │  │   │
│    │  │  │  │  │  │  │  │  │  │   │
│    ──────────────────────────────   │
│                                     │
│    Multiple narrow grooves          │
│    Very precise flow control        │
│                                     │
└─────────────────────────────────────┘

USE FOR:
- Very low speed control
- Precise bleed adjustment
- Combined with main ports
```

### Port Design Calculations

**Total Port Area:**
```
A_total = n × A_port

For rectangular:
A_port = w × h

For tapered:
A_port = h × (w1 + w2) / 2  [average]

n = number of ports (typically 3-8)
```

**Hydraulic Diameter:**
```
D_h = 4 × A / P

Where:
A = Cross-sectional area
P = Wetted perimeter

For rectangular port:
D_h = 2 × w × h / (w + h)

Affects flow coefficient and regime
```

**Flow Coefficient:**
```
Sharp-edge orifice: Cd = 0.60-0.65
Rounded entry: Cd = 0.70-0.80
Smooth channel: Cd = 0.85-0.95

DSSV ports typically: Cd = 0.65-0.75
```

---

## Force-Velocity Prediction

### Basic Flow Equation

```
Q = Cd × A × √(2 × ΔP / ρ)

Rearranged for ΔP:
ΔP = (Q / (Cd × A))² × ρ / 2

Where:
Q = Flow rate = v × A_annular
Cd = Discharge coefficient
A = Port area
ρ = Fluid density (~860 kg/m³)
```

### Force Calculation

```
F = ΔP × A_piston + F_spring

At low velocity (spool not fully open):
- Area is fraction of full open
- Spring preload dominates

At high velocity (spool fully open):
- Full port area available
- Quadratic relationship

Transition zone:
- Blended behavior
- Depends on spring rate
```

### Simplified Force Model

```
Low-speed (linear region):
F = C_low × v + F_preload

High-speed (orifice region):
F = C_high × v² + F_transition

Blended model:
F = F_preload + C_low × v + C_high × v²
```

### Example Calculation

```
GIVEN:
- 46mm damper, 25mm valve
- Piston area: 1320 mm² (after rod)
- Annular area: 380 mm² (flow area)
- Port area (full open): 20 mm²
- Cd: 0.70
- Fluid density: 860 kg/m³
- Spring preload: 50 N

AT v = 0.3 m/s:

Flow rate:
Q = 0.3 × 380×10⁻⁶ = 1.14×10⁻⁴ m³/s

Pressure drop (full open):
ΔP = (1.14×10⁻⁴ / (0.70 × 20×10⁻⁶))² × 860 / 2
ΔP = (8.14)² × 430 = 28,500 Pa = 0.285 bar

Force:
F = 28500 × 1320×10⁻⁶ = 37.6 N (from flow only)

With spring and spool dynamics:
F_total ≈ 800-1000 N typical

(Actual requires spool position modeling)
```

---

## Valve Configuration

### Dual Valve System

```
┌─────────────────────────────────────────────────────────┐
│              TYPICAL DUAL VALVE LAYOUT                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   REBOUND VALVE          COMPRESSION VALVE              │
│   ┌─────────────┐        ┌─────────────┐               │
│   │             │        │             │               │
│   │  Controls   │        │  Controls   │               │
│   │  extension  │        │  compression│               │
│   │  (droop)    │        │  (bump)     │               │
│   │             │        │             │               │
│   │  Higher     │        │  Lower      │               │
│   │  force      │        │  force      │               │
│   │             │        │             │               │
│   └─────────────┘        └─────────────┘               │
│                                                         │
│   Independently tunable                                 │
│   Different port geometry each                          │
│   Different spring rates                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Base Valve vs Piston Valve

**Monotube (Piston Valve Only):**
```
┌─────────────────────────────────────┐
│   GAS                               │
│   ═══                               │
│   ───────────────────               │
│   │                 │               │
│   │   OIL           │               │
│   │                 │               │
│   │   ┌─────────┐   │               │
│   │   │ PISTON  │   │ ← All valving │
│   │   │ VALVE   │   │    in piston  │
│   │   └─────────┘   │               │
│   │                 │               │
│   │   OIL           │               │
│   │                 │               │
│   └─────────────────┘               │
│                                     │
└─────────────────────────────────────┘
```

**Twin-Tube (Base + Piston):**
```
┌─────────────────────────────────────┐
│   ┌───────────────────────┐         │
│   │ ┌───────────────────┐ │         │
│   │ │                   │ │         │
│   │ │   ┌───────────┐   │ │         │
│   │ │   │  PISTON   │   │ │         │
│   │ │   │  VALVE    │   │ │         │
│   │ │   └───────────┘   │ │         │
│   │ │                   │ │         │
│   │ │                   │ │         │
│   │ └───────────────────┘ │         │
│   │ ┌───────────────────┐ │         │
│   │ │   BASE VALVE      │ │ ← Comp  │
│   │ └───────────────────┘ │         │
│   └───────────────────────┘         │
│   RESERVOIR                         │
└─────────────────────────────────────┘
```

---

## Valve Tuning Parameters

### Spring Rate Selection

```
SPOOL SPRING FUNCTION:
- Sets breakaway force (bleed threshold)
- Controls spool opening rate
- Affects low-speed vs high-speed blend

SPRING RATE EFFECTS:
┌────────────────────────────────────────┐
│                                        │
│  Higher spring rate:                   │
│  - Higher low-speed damping            │
│  - Later transition to high-speed      │
│  - More "knee" in curve                │
│                                        │
│  Lower spring rate:                    │
│  - Lower low-speed damping             │
│  - Earlier transition                  │
│  - Smoother curve                      │
│                                        │
└────────────────────────────────────────┘

Typical range: 5-50 N/mm
```

### Preload Adjustment

```
PRELOAD EFFECTS:
- Higher preload = more force at very low speed
- Creates "bleed" threshold
- Affects ride quality at slow speeds

Preload range: 0-100 N typical
Fine adjustment for low-speed feel
```

### Shim Stacks (Hybrid Systems)

```
Some DSSV systems combine:
- Spool valve for main damping
- Bleed shim for very low speed
- Blow-off shim for extreme velocity

Allows full curve customization
```

---

## Valve Specification Template

```markdown
## DSSV Valve Specification

**Project:** [Name]
**Damper P/N:** [Number]
**Position:** [Front/Rear]
**Date:** [Date]
**Revision:** [Rev]

---

### Valve Assembly

| Parameter | Compression | Rebound |
|-----------|-------------|---------|
| Valve OD | mm | mm |
| Valve length | mm | mm |
| Cartridge P/N | | |

### Port Geometry

| Parameter | Compression | Rebound |
|-----------|-------------|---------|
| Number of ports | | |
| Port shape | [Rect/Taper/Prog] | |
| Port width (entry) | mm | mm |
| Port width (exit) | mm | mm |
| Port height | mm | mm |
| Total area (full open) | mm² | mm² |

### Spring Configuration

| Parameter | Compression | Rebound |
|-----------|-------------|---------|
| Spring rate | N/mm | N/mm |
| Spring preload | N | N |
| Free length | mm | mm |
| Installed length | mm | mm |

### Target Performance

| Velocity (m/s) | Compression (N) | Rebound (N) | C/R |
|----------------|-----------------|-------------|-----|
| 0.025 | | | |
| 0.05 | | | |
| 0.1 | | | |
| 0.3 | | | |
| 0.5 | | | |
| 1.0 | | | |

### Curve Character

| Parameter | Compression | Rebound |
|-----------|-------------|---------|
| Low-speed | [Dig/Lin/Prog] | |
| High-speed | [Dig/Lin/Prog] | |
| Knee velocity | m/s | m/s |

---

### Notes

[Special requirements, adjustment range, etc.]

---

**Approved:** _____________ Date: _______
```

---

## Valve Kit Options

### Adjustability Levels

| Level | What Changes | Adjustment Method |
|-------|--------------|-------------------|
| **Fixed** | Nothing | No adjustment |
| **Preload adjust** | Spring preload | External adjuster |
| **Cartridge swap** | Complete valve | Remove/install |
| **Full revalve** | Ports + springs | Machine shop |

### Valve Kit Contents (Typical)

```markdown
## Valve Tuning Kit

**Base Kit:**
- 3× Compression cartridges (Soft/Med/Firm)
- 3× Rebound cartridges (Soft/Med/Firm)
- Installation tools
- Specification sheet

**Extended Kit (add):**
- 2× Additional compression options
- 2× Additional rebound options
- Spring set (3 rates per valve)
- Dyno test data for each

**Pro Kit (add):**
- Blank cartridge bodies
- Port design service
- Custom spring winding
- Dyno development time
```

---

## Validation

### Dyno Testing

```
STANDARD TEST SEQUENCE:
1. Condition cycles (10-20 cycles, 0.3 m/s)
2. Low-speed sweep (0.01-0.1 m/s)
3. Mid-speed sweep (0.1-0.5 m/s)
4. High-speed sweep (0.5-2.0 m/s)
5. Repeat at temperature (40°C, 80°C, 120°C)

ACCEPTANCE:
- Force at 0.3 m/s: ±8% of target (CC)
- Other velocities: ±10% of target
- Temperature variation: <±5% (30-100°C)
- Consistency: <±3% unit-to-unit
```

### Correlation Checklist

```markdown
## Valve Validation Checklist

□ Force at all velocity points measured
□ Compression/rebound ratio verified
□ Temperature sweep completed
□ Curve shape matches intent
□ Consistency across sample size
□ Comparison to prediction
□ Customer sign-off on targets
```
