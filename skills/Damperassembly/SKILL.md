---
name: Damperassembly
description: Dept 71 damper assembly operations for DSSV (Dynamic Suspensions Spool Valve) dampers. Covers component receipt, sub-assembly, fluid fill, gas charging, functional testing, and troubleshooting. USE WHEN user says 'damper', 'Dept 71', 'DSSV', 'spool valve', 'damper assembly', 'damper test', 'dyno test', 'fluid fill', 'gas charge', or needs damper-specific guidance.
---

# DamperAssembly

Dept 71 damper assembly operations for Multimatic DSSV damper technology. Provides assembly guidance, testing procedures, and troubleshooting for precision damper manufacturing.

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **ComponentReceipt** | "damper components", "receipt inspection" | `Workflows/ComponentReceipt.md` |
| **AssemblyProcess** | "damper assembly", "build damper" | `Workflows/AssemblyProcess.md` |
| **FunctionalTesting** | "damper test", "dyno test" | `Workflows/FunctionalTesting.md` |
| **Troubleshooting** | "damper problem", "test failure" | `Workflows/Troubleshooting.md` |

## DSSV Technology Overview

### What is DSSV?

**Dynamic Suspensions Spool Valve** - Multimatic's patented damper technology using precision-machined spool valves instead of conventional shim stacks.

```
┌─────────────────────────────────────────────────────┐
│              DSSV vs CONVENTIONAL                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  CONVENTIONAL (Shim Stack)    DSSV (Spool Valve)   │
│  ┌─────────────────┐          ┌─────────────────┐  │
│  │  ═══════════    │          │  ┌───┐ ┌───┐    │  │
│  │  ═══════════    │  vs.     │  │ ○ │═│ ○ │    │  │
│  │  Flexible shims │          │  └───┘ └───┘    │  │
│  │  High variance  │          │  Spool valves   │  │
│  │  Temp sensitive │          │  ±3% repeatable │  │
│  └─────────────────┘          └─────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Key Technical Features

| Feature | DSSV Advantage |
|---------|----------------|
| **Spool Valves** | Hollow cylindrical sleeves with laser-cut port windows |
| **Dual Valves** | Independent compression and rebound tuning |
| **Repeatability** | ±3% valve-to-valve consistency |
| **Temperature Stability** | ~4% force change (30°C → 120°C) vs. 14-16% conventional |
| **Cavitation Resistance** | Proof by design, lower gas pressure required |
| **Revalving** | External cartridge swap without full disassembly |

### Applications

| Market | Examples |
|--------|----------|
| **OEM** | GM Camaro Z/28, Ford GT, Ferrari SF90, Mercedes AMG GT, Aston Martin |
| **Motorsport** | F1 (Red Bull), Le Mans, DTM, Porsche GT3 Cup |
| **Off-Road** | Chevrolet Colorado ZR2, Silverado ZR2, Ford Bronco DR |

## Dept 71 Process Overview

```
┌─────────────────────────────────────────────────────┐
│              DEPT 71 PROCESS FLOW                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────┐                                │
│  │ Component      │ WI-71-001                      │
│  │ Receipt        │ CP-71-001                      │
│  └───────┬────────┘                                │
│          ▼                                         │
│  ┌────────────────┐                                │
│  │ Sub-Assembly   │ WI-71-002                      │
│  │ Setup          │ CP-71-002                      │
│  └───────┬────────┘                                │
│          ▼                                         │
│  ┌────────────────┐                                │
│  │ Damper         │ WI-71-003  ◀── CRITICAL       │
│  │ Assembly       │ CP-71-003                      │
│  └───────┬────────┘                                │
│          ▼                                         │
│  ┌────────────────┐                                │
│  │ Functional     │ WI-71-004  ◀── CRITICAL       │
│  │ Testing        │ CP-71-004                      │
│  └───────┬────────┘                                │
│          ▼                                         │
│  ┌────────────────┐                                │
│  │ Final          │ WI-71-005                      │
│  │ Inspection     │ CP-71-005                      │
│  └───────┬────────┘                                │
│          ▼                                         │
│  ┌────────────────┐                                │
│  │ Packaging      │ WI-71-006                      │
│  │                │ CP-71-006                      │
│  └────────────────┘                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Critical Characteristics

### Assembly Critical Characteristics (CC)

| Characteristic | Specification | Verification |
|----------------|---------------|--------------|
| Rod insertion force | Per product spec | 100% press monitor |
| Seal installation | Orientation correct | Visual + press force |
| Fluid volume | ±1-2 ml | 100% fill system |
| Gas pressure | ±0.5 bar | 100% charge system |
| Torque values | ±10% | 100% electronic tool |
| Torque angle (yield) | ±5° | 100% angle monitor |

### Test Critical Characteristics (CC)

| Characteristic | Specification | Method |
|----------------|---------------|--------|
| Leak test | Zero leakage at test pressure | 100% pressure decay |
| Rebound force @ 0.3 m/s | ±8% of nominal | 100% dyno |
| Compression force @ 0.3 m/s | ±8% of nominal | 100% dyno |
| Force ratio | Within spec band | Calculated |

## Key Components

### Damper Component Identification

| Component | Function | Receipt Checks |
|-----------|----------|----------------|
| **Piston Rod** | Transmits force, houses valving | Surface finish, thread, diameter |
| **Piston** | Creates pressure differential | OD, port condition |
| **Spool Valve(s)** | Controls oil flow | Port windows, spring condition |
| **Seals** | Prevent fluid/gas leakage | Material, dimensions, no damage |
| **Housing/Tube** | Contains assembly | ID, surface, threads |
| **Damper Fluid** | Provides resistance | Type, cleanliness, temperature |
| **Nitrogen Gas** | Maintains pressure | Purity, pressure |

### Fluid Specifications

| Property | Typical Value | Importance |
|----------|---------------|------------|
| Viscosity | Per spec (cSt @ 40°C) | Damping force |
| Temperature range | -40°C to +120°C | Performance consistency |
| Cleanliness | NAS 6 or better | Valve function |
| Foaming | Low tendency | Cavitation prevention |

## Assembly Parameters

### Typical Torque Values

| Fastener | Torque | Thread Lock |
|----------|--------|-------------|
| M6 rod end | 8-10 Nm | Medium strength |
| M8 body | 20-25 Nm | Medium strength |
| M10 top cap | 35-45 Nm | Per spec |
| Gland nut | Per product spec | May require sealant |

### Fluid Fill Parameters

| Parameter | Typical Range |
|-----------|---------------|
| Vacuum level | <50 mbar |
| Fill volume | ±1-2 ml of spec |
| Temperature | 18-25°C |
| Dwell time | Per procedure |

### Gas Charge Parameters

| Parameter | Typical Range |
|-----------|---------------|
| Nitrogen purity | >99.95% |
| Charge pressure | Per product spec ±0.5 bar |
| Temperature compensation | Required |
| Stabilization time | Per procedure |

## Functional Test Parameters

### Standard Velocities

| Velocity (m/s) | Purpose |
|----------------|---------|
| 0.05 | Low-speed comfort |
| 0.1 | Low-speed control |
| 0.3 | **Primary test point (CC)** |
| 0.5 | Mid-speed |
| 1.0 | High-speed |

### Test Sequence

1. Mount damper in dyno fixture
2. Condition cycles (settle fluid/gas)
3. Measure at each velocity point
4. Record compression and rebound forces
5. Calculate force ratio
6. Compare to specification band
7. Pass/Fail determination

### Acceptance Criteria

| Measurement | Tolerance |
|-------------|-----------|
| Force at velocity point | ±8-10% of nominal |
| Force ratio (C/R) | Within spec band |
| Linearity | Per product spec |
| Hysteresis | Per product spec |

## Safety Requirements

### PPE for Damper Assembly

| Area | Required PPE |
|------|--------------|
| Component handling | Safety glasses, steel-toe boots |
| Assembly | + Nitrile gloves, apron |
| Fluid fill | + Face shield if splash risk |
| Gas charge | + High-pressure awareness |
| Testing | + Hearing protection |

### Key Hazards

| Hazard | Control |
|--------|---------|
| High-pressure fluid | Controlled fill system, PPE |
| Compressed gas | Trained operators, regulators |
| Spring energy | Controlled fixtures, procedures |
| Repetitive strain | Job rotation, ergonomic design |
| Test equipment | Guards, interlocks, two-hand start |

## Documentation References

| Document | Location |
|----------|----------|
| WI-71-001 to WI-71-006 | `~/projects/work/docs/work-instructions/dept-71/` |
| CP-71-001 to CP-71-006 | `~/projects/work/docs/work-instructions/control-plans/dept-71/` |
| PFMEA-71-001 | `~/projects/work/docs/work-instructions/pfmea/dept-71/` |
| DSSV Technology | `~/projects/work/research/Multimatic-DSSV-Damper-Technology.md` |

## Integration with Other Skills

| Skill | Integration Point |
|-------|-------------------|
| **Assemblyoperations** | General assembly practices, torque, traceability |
| **Pfmea** | PFMEA-71-001 for damper failure modes |
| **Controlplan** | CP-71-001 to CP-71-006 format |
| **Msa** | Dyno measurement system analysis |
| **Spc** | Force trending and capability |
| **Tribalknowledge** | Operator expertise capture |

## Examples

**Example 1: New damper variant setup**
```
User: "We're launching a new ZR2 damper variant"
→ Review product specification
→ Set up work instructions (WI-71-003)
→ Configure test parameters (WI-71-004)
→ Update control plan (CP-71-003, CP-71-004)
→ Train operators on variant differences
→ Run first article inspection
```

**Example 2: Test failure investigation**
```
User: "Damper failing rebound force test"
→ Use Workflows/Troubleshooting.md
→ Check fluid volume (underfill = low force)
→ Check gas pressure (low pressure = low force)
→ Verify seal condition (bypass = low force)
→ Review valve assembly (port obstruction)
→ Correlation check with master damper
```

**Example 3: Assembly defect**
```
User: "Seal damage during installation"
→ Review installation procedure
→ Check fixture condition
→ Verify seal orientation
→ Check lubrication application
→ Review operator technique
→ Update PFMEA if new failure mode
```
