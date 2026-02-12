---
name: Damperengineering
description: Hydraulic damper design engineering for customer applications. Mechanical and hydraulic engineering, materials selection (aluminium/steel), seal/O-ring design, DSSV valve specification. USE WHEN user says 'damper design', 'application engineering', 'damper spec', 'customer application', 'damping curve', 'valve sizing', 'seal design', 'O-ring', 'slyde ring', or needs to capture customer damper requirements.
---

# DamperEngineering

Hydraulic damper design engineering skill for customer application capture and specification. Combines mechanical engineering, hydraulic design, materials expertise, and sealing technology for DSSV-based damper solutions.

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **ApplicationCapture** | "new customer", "application requirements" | `Workflows/ApplicationCapture.md` |
| **DampingDesign** | "damping curve", "force-velocity" | `Workflows/DampingDesign.md` |
| **MaterialSelection** | "material", "aluminium", "steel" | `Workflows/MaterialSelection.md` |
| **SealDesign** | "O-ring", "seal", "slyde ring" | `Workflows/SealDesign.md` |
| **ValveSpecification** | "valve sizing", "DSSV spec" | `Workflows/ValveSpecification.md` |

## Core Engineering Disciplines

### 1. Hydraulic Engineering

**Damper Hydraulics Fundamentals:**

```
┌─────────────────────────────────────────────────────────┐
│              DAMPER HYDRAULIC CIRCUIT                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   COMPRESSION STROKE                                    │
│   ┌─────────────┐                                       │
│   │    Rod      │ ↓ Velocity                           │
│   │    ────     │                                       │
│   │   Piston    │ → Pressure builds below piston       │
│   │    ════     │                                       │
│   │             │ → Oil forced through valve ports     │
│   │   ┌───┐     │                                       │
│   │   │ V │     │ ← Compression valve controls flow    │
│   │   └───┘     │                                       │
│   └─────────────┘                                       │
│                                                         │
│   F = ΔP × A    (Force = Pressure drop × Piston area)  │
│   Q = V × A     (Flow = Velocity × Annular area)       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key Hydraulic Relationships:**

| Parameter | Formula | Units |
|-----------|---------|-------|
| Damping force | F = C × v^n | N |
| Flow rate | Q = A × v | m³/s |
| Pressure drop | ΔP = f(Q, orifice) | Pa |
| Reynolds number | Re = (ρ × v × D) / μ | dimensionless |
| Valve coefficient | Cv = Q × √(SG/ΔP) | varies |

**Flow Regimes:**

| Re | Regime | Damping Characteristic |
|----|--------|------------------------|
| < 2000 | Laminar | Linear (F ∝ v) |
| 2000-4000 | Transition | Mixed |
| > 4000 | Turbulent | Quadratic (F ∝ v²) |

### 2. Mechanical Engineering

**Load Path Analysis:**

```
┌─────────────────────────────────────────────────────────┐
│              DAMPER LOAD PATH                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Vehicle Body                                          │
│        │                                                │
│        ▼                                                │
│   ┌─────────────┐                                       │
│   │  Top Mount  │ ← Bearing/bushing loads              │
│   │  (M10-M12)  │                                       │
│   └──────┬──────┘                                       │
│          │                                              │
│   ┌──────┴──────┐                                       │
│   │  Piston Rod │ ← Tension/compression, bending       │
│   │  (Ø16-25mm) │    Column buckling check             │
│   └──────┬──────┘                                       │
│          │                                              │
│   ┌──────┴──────┐                                       │
│   │   Piston    │ ← Pressure differential loads        │
│   │  (Ø30-50mm) │                                       │
│   └──────┬──────┘                                       │
│          │                                              │
│   ┌──────┴──────┐                                       │
│   │    Tube     │ ← Hoop stress, thread loads          │
│   │  (Ø40-60mm) │                                       │
│   └──────┬──────┘                                       │
│          │                                              │
│   ┌──────┴──────┐                                       │
│   │ Bottom Eye  │ ← Pin bearing, fatigue               │
│   │  (M10-M14)  │                                       │
│   └─────────────┘                                       │
│        │                                                │
│        ▼                                                │
│   Suspension Arm                                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Stress Calculations:**

| Component | Stress Type | Formula | Limit |
|-----------|-------------|---------|-------|
| Rod | Axial | σ = F/A | < 0.6 × Sy |
| Rod | Buckling | Pcr = π²EI/L² | SF > 3 |
| Tube | Hoop | σh = P×r/t | < 0.5 × Sy |
| Thread | Shear | τ = F/(π×d×Le) | < 0.4 × Sy |
| Eye | Bearing | σb = F/(d×t) | < Sy |

**Fatigue Considerations:**

| Application | Typical Cycles | Design Life |
|-------------|----------------|-------------|
| Road car | 10⁷-10⁸ | 200,000 km |
| Motorsport | 10⁵-10⁶ | Season/rebuild |
| Off-road | 10⁶-10⁷ | 100,000 km |

### 3. Materials Engineering

**High-Grade Aluminium Alloys:**

| Alloy | Temper | Sy (MPa) | Application | Notes |
|-------|--------|----------|-------------|-------|
| 6061 | T6 | 276 | Tubes, bodies | Good machinability, anodizes well |
| 6082 | T6 | 310 | Structural | Higher strength than 6061 |
| 7075 | T6 | 503 | High-load components | Caution: stress corrosion |
| 2024 | T351 | 324 | Fatigue-critical | Good fatigue life |

**High-Grade Steels:**

| Steel | Condition | Sy (MPa) | Application | Notes |
|-------|-----------|----------|-------------|-------|
| 4140 | QT | 655-860 | Piston rods | Chrome-plated, ground |
| 4340 | QT | 860-1100 | High-load rods | Premium fatigue |
| 17-4 PH | H900 | 1170 | Corrosion-critical | Stainless, hard chrome alternative |
| Nitriding steel | Nitrided | Surface 60 HRC | Wear surfaces | Case hardened |

**Rod Surface Treatments:**

| Treatment | Ra (μm) | Hardness | Wear | Corrosion |
|-----------|---------|----------|------|-----------|
| Hard chrome | 0.1-0.2 | 65-70 HRC | Excellent | Good |
| Nikasil | 0.1-0.2 | 55-60 HRC | Very good | Very good |
| QPQ/Nitride | 0.2-0.4 | 60-65 HRC | Good | Excellent |
| DLC | <0.1 | 70+ HRC | Excellent | Excellent |

### 4. Sealing Technology

**O-Ring Design Parameters:**

```
┌─────────────────────────────────────────────────────────┐
│              O-RING GROOVE DESIGN                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   STATIC SEAL (Face)          DYNAMIC SEAL (Rod)       │
│   ┌─────────────────┐         ┌─────────────────┐      │
│   │     ████████    │         │  │    ███    │  │      │
│   │  ▲  ████████    │         │  │    ███    │  │      │
│   │  │  ████████    │         │  └────███────┘  │      │
│   │  │             │         │       ███ ←Rod   │      │
│   │  Groove        │         │       ▲          │      │
│   │  depth         │         │       │          │      │
│   └─────────────────┘         │  Radial squeeze │      │
│                               └─────────────────┘      │
│                                                         │
│   Static: 15-25% compression    Dynamic: 8-16%         │
│   Fill: 75-90%                  Fill: 70-85%           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**O-Ring Compression Guidelines:**

| Application | Compression % | Stretch % | Fill % |
|-------------|---------------|-----------|--------|
| Static face | 15-25 | 0-5 | 75-90 |
| Static radial | 12-20 | 1-5 | 75-85 |
| Dynamic (slow) | 10-16 | 2-5 | 70-85 |
| Dynamic (fast) | 8-14 | 2-5 | 70-80 |
| High pressure | 12-20 | 1-3 | 80-90 |

**Common O-Ring Materials:**

| Material | Temp Range | Fluid Compatibility | Application |
|----------|------------|---------------------|-------------|
| NBR (Nitrile) | -30 to +100°C | Mineral oils, petroleum | Standard damper |
| FKM (Viton) | -20 to +200°C | Most fluids, heat | High-temp, motorsport |
| HNBR | -30 to +150°C | Oils, improved heat | Performance road |
| EPDM | -50 to +150°C | NOT petroleum based | Synthetic fluids only |
| PTFE | -200 to +260°C | Universal | Special applications |

**Slyde Ring / Piston Seal Design:**

```
┌─────────────────────────────────────────────────────────┐
│              SLYDE RING CONFIGURATION                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   SINGLE SLYDE RING           DUAL SLYDE + ENERGIZER   │
│   ┌─────────────────┐         ┌─────────────────┐      │
│   │  │ ██████████ │ │         │  │ ████ ○ ████ │ │      │
│   │  │ ██████████ │ │         │  │ ████ ○ ████ │ │      │
│   │  │ ←PTFE/Bronze│ │        │  │ PTFE  O-ring│ │      │
│   │  │            │ │         │  │      ↑      │ │      │
│   │  └────────────┘ │         │  │  Energizer  │ │      │
│   │     Tube wall   │         │  └─────────────┘ │      │
│   └─────────────────┘         └─────────────────┘      │
│                                                         │
│   Low friction                 Better sealing at       │
│   Self-lubricating             low pressure            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Slyde Ring Materials:**

| Material | Friction | Wear | Pressure | Application |
|----------|----------|------|----------|-------------|
| PTFE | Very low | Moderate | Low-med | Standard |
| PTFE + Bronze | Low | Good | Medium | General |
| PTFE + Carbon | Low | Very good | Med-high | High duty |
| PEEK | Low | Excellent | High | Motorsport |

## Application Requirements Capture

### Customer Questionnaire

```markdown
## Damper Application Requirements

### 1. Vehicle Information
- Vehicle type: [Road car / Race car / Off-road / Industrial]
- Make/Model:
- Year:
- Suspension type: [MacPherson / Double wishbone / Multi-link / Solid axle]
- Existing damper (if replacing): [Make/Model/P/N]

### 2. Weight & Load
- Sprung mass per corner (kg):
- Unsprung mass per corner (kg):
- Weight distribution F/R (%):
- Max payload (kg):

### 3. Geometry
- Wheel travel (mm): Bump: ___  Droop: ___
- Motion ratio:
- Damper length (mm): Extended: ___ Compressed: ___
- Stroke (mm):
- Mounting: Top: [Type] Bottom: [Type]

### 4. Performance Requirements
- Primary use: [Comfort / Sport / Race / Off-road]
- Max damper velocity (m/s):
- Operating temperature range (°C):
- Environment: [Road / Track / Desert / Mud/water]

### 5. Damping Targets (if known)
- Rebound @ 0.3 m/s (N):
- Compression @ 0.3 m/s (N):
- Force ratio (C/R):
- Low-speed character: [Linear / Digressive]
- High-speed character: [Linear / Progressive]

### 6. Durability
- Expected life (km or hours):
- Service interval:
- Rebuild capability required: [Yes / No]

### 7. Constraints
- Max diameter (mm):
- Max weight (g):
- Budget range:
- Certification requirements:
```

### Damping Curve Design Process

```
┌─────────────────────────────────────────────────────────┐
│           DAMPING CURVE DESIGN PROCESS                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. VEHICLE DYNAMICS INPUT                              │
│     ├── Sprung/unsprung mass                           │
│     ├── Spring rate                                    │
│     └── Target ride frequency                          │
│              │                                          │
│              ▼                                          │
│  2. CRITICAL DAMPING CALCULATION                        │
│     Cc = 2 × √(k × m)                                  │
│              │                                          │
│              ▼                                          │
│  3. DAMPING RATIO SELECTION                             │
│     ├── Comfort: ζ = 0.2-0.3                           │
│     ├── Sport: ζ = 0.3-0.5                             │
│     └── Race: ζ = 0.5-0.8                              │
│              │                                          │
│              ▼                                          │
│  4. FORCE TARGET CALCULATION                            │
│     C = ζ × Cc (damping coefficient)                   │
│     F @ 0.3 m/s = C × 0.3                              │
│              │                                          │
│              ▼                                          │
│  5. CURVE SHAPE DESIGN                                  │
│     ├── Digressive: Low-speed comfort                  │
│     ├── Linear: Predictable                            │
│     └── Progressive: High-speed control                │
│              │                                          │
│              ▼                                          │
│  6. VALVE SPECIFICATION                                 │
│     └── DSSV port window design                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Damping Ratio Guidelines

| Application | ζ Rebound | ζ Compression | Ratio C/R |
|-------------|-----------|---------------|-----------|
| Luxury road | 0.20-0.30 | 0.15-0.25 | 0.6-0.8 |
| Sport road | 0.30-0.45 | 0.20-0.35 | 0.5-0.7 |
| Track day | 0.40-0.60 | 0.30-0.45 | 0.5-0.7 |
| Race (aero) | 0.60-0.80 | 0.40-0.60 | 0.5-0.7 |
| Rally/off-road | 0.35-0.50 | 0.25-0.40 | 0.6-0.8 |

## DSSV Valve Selection

**Valve Sizing Matrix:**

| Damper OD | Valve OD | Port Area Range | Force Range @0.3m/s |
|-----------|----------|-----------------|---------------------|
| 36mm | 20mm | 8-20 mm² | 200-600 N |
| 46mm | 25mm | 15-35 mm² | 400-1200 N |
| 60mm | 32mm | 25-60 mm² | 800-2500 N |

**Port Window Shapes:**

| Shape | Curve | Application | Tuning Range |
|-------|-------|-------------|--------------|
| Rectangular | Linear | Baseline, predictable | Moderate |
| Tapered | Digressive | Comfort, ride quality | Wide |
| Progressive slots | Progressive | High-speed control | Moderate |
| Variable | Custom | Application-specific | Maximum |

## Integration with Other Skills

| Skill | Integration Point |
|-------|-------------------|
| **DamperAssembly** | Manufacturing handoff, assembly specs |
| **PlantCapability** | Machining feasibility check |
| **QuoteEstimator** | Cost estimation for custom designs |
| **CuttingParams** | Machining parameters for components |
| **MaterialSelection** | Cross-reference for specifications |
| **APQPPPAP** | Product development process |

## Examples

**Example 1: New customer application**
```
User: "Customer wants dampers for a lightweight track day car"
→ Run ApplicationCapture workflow
→ Gather vehicle data, geometry, performance targets
→ Calculate damping requirements
→ Specify DSSV valve configuration
→ Generate preliminary specification
```

**Example 2: Seal design query**
```
User: "What O-ring compression for a 20mm rod dynamic seal?"
→ Reference seal design tables
→ Recommend 10-14% compression for dynamic
→ Specify groove dimensions
→ Recommend NBR or FKM material
→ Note lubrication requirements
```

**Example 3: Material selection**
```
User: "Need a lightweight piston rod material"
→ Review load requirements
→ Consider 17-4 PH stainless (high strength-to-weight)
→ Or 4340 with DLC coating
→ Check fatigue requirements
→ Provide specification
```
