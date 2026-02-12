# ApplicationCapture Workflow

Structured process for capturing customer damper application requirements and generating preliminary specifications.

## Workflow Stages

```
┌─────────────────────────────────────────────────────────┐
│           APPLICATION CAPTURE WORKFLOW                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────────────┐                                    │
│  │ 1. CUSTOMER    │ Who, what, why                     │
│  │    CONTEXT     │                                    │
│  └───────┬────────┘                                    │
│          ▼                                              │
│  ┌────────────────┐                                    │
│  │ 2. VEHICLE     │ Type, weight, suspension           │
│  │    DATA        │                                    │
│  └───────┬────────┘                                    │
│          ▼                                              │
│  ┌────────────────┐                                    │
│  │ 3. GEOMETRY    │ Travel, mounting, package          │
│  │    & PACKAGE   │                                    │
│  └───────┬────────┘                                    │
│          ▼                                              │
│  ┌────────────────┐                                    │
│  │ 4. PERFORMANCE │ Targets, environment, life         │
│  │    REQUIREMENTS│                                    │
│  └───────┬────────┘                                    │
│          ▼                                              │
│  ┌────────────────┐                                    │
│  │ 5. CONSTRAINTS │ Budget, timeline, certification    │
│  │                │                                    │
│  └───────┬────────┘                                    │
│          ▼                                              │
│  ┌────────────────┐                                    │
│  │ 6. PRELIMINARY │ Sizing, force targets, quote       │
│  │    SPEC OUTPUT │                                    │
│  └────────────────┘                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Stage 1: Customer Context

### Questions to Ask

```markdown
## Customer Context

1. **Company/Contact**
   - Company name:
   - Contact name:
   - Email/Phone:
   - Location/Region:

2. **Application Type**
   - [ ] OEM production
   - [ ] Motorsport team
   - [ ] Aftermarket performance
   - [ ] Prototype/R&D
   - [ ] Other: ___

3. **Project Background**
   - What are they building?
   - Why do they need custom dampers?
   - What's the current solution (if any)?
   - What problem are they solving?

4. **Relationship Type**
   - [ ] New customer inquiry
   - [ ] Existing customer - new project
   - [ ] RFQ response
   - [ ] Engineering consultation
```

---

## Stage 2: Vehicle Data

### Vehicle Information Template

```markdown
## Vehicle Specification

### Basic Information
| Parameter | Value | Notes |
|-----------|-------|-------|
| Make/Model | | |
| Year/Platform | | |
| Vehicle type | [Road/Race/Off-road/Industrial] | |
| Production status | [Prototype/Pre-production/Production] | |

### Mass Properties
| Parameter | Front (kg) | Rear (kg) | Notes |
|-----------|------------|-----------|-------|
| Sprung mass/corner | | | |
| Unsprung mass/corner | | | |
| Total vehicle mass | | (total) | |
| Max payload | | | |
| Weight distribution | % | % | |

### Current Suspension
| Parameter | Front | Rear | Notes |
|-----------|-------|------|-------|
| Type | [MacPherson/DW/Multi-link/SLA] | | |
| Spring rate (N/mm) | | | At wheel |
| Spring preload (mm) | | | |
| ARB rate (N/mm) | | | |
| Current damper | | | Make/model |
| Why replacing? | | | |
```

### Common Suspension Types

| Type | Typical Motion Ratio | Notes |
|------|---------------------|-------|
| MacPherson strut | 0.9-1.0 | Damper is spring axis |
| Double wishbone (outboard) | 0.65-0.80 | Pushrod common in race |
| Double wishbone (pushrod) | 0.5-0.7 | Rocker multiplies |
| Multi-link (road) | 0.7-0.9 | Varies by geometry |
| Solid axle | 0.9-1.0 | Usually near wheel |

---

## Stage 3: Geometry & Package

### Damper Geometry Template

```markdown
## Geometry Specification

### Travel & Stroke
| Parameter | Front | Rear | Notes |
|-----------|-------|------|-------|
| Wheel travel - bump (mm) | | | |
| Wheel travel - droop (mm) | | | |
| Total wheel travel (mm) | | | |
| Motion ratio (MR) | | | Damper/wheel |
| Damper stroke (mm) | | | = Travel × MR |

### Damper Dimensions
| Parameter | Front | Rear | Notes |
|-----------|-------|------|-------|
| Extended length (mm) | | | Eye-to-eye |
| Compressed length (mm) | | | Eye-to-eye |
| Max body OD (mm) | | | Package limit |
| Mounting - top | [Eye/Stem/Spherical] | | |
| Mounting - bottom | [Eye/Stem/Spherical] | | |
| Top mount thread | | | If stem |
| Bottom mount bore | | | If eye |

### Installation
| Parameter | Front | Rear | Notes |
|-----------|-------|------|-------|
| Installation angle (°) | | | From vertical |
| Side load expected? | [Yes/No] | | Strut applications |
| Articulation required? | [Yes/No] | | Degree of misalignment |
| Remote reservoir? | [Required/Preferred/No] | | |
| Reservoir mount location | | | If required |
```

### Motion Ratio Calculation

```
If customer doesn't know MR:

MR = Damper displacement / Wheel displacement

Measure or calculate from:
- Geometry software output
- Physical measurement (move wheel, measure damper)
- Estimate from suspension type (table above)

Damper stroke = Wheel travel × MR
Damper velocity = Wheel velocity × MR
Damper force = Wheel force / MR
```

---

## Stage 4: Performance Requirements

### Performance Template

```markdown
## Performance Requirements

### Primary Use Case
- [ ] Daily road driving (comfort priority)
- [ ] Enthusiast road driving (sport bias)
- [ ] Track day / club racing
- [ ] Professional motorsport
- [ ] Off-road recreation
- [ ] Off-road competition
- [ ] Industrial/commercial

### Performance Targets
| Parameter | Target | Priority |
|-----------|--------|----------|
| Ride quality | [1-10] | |
| Body control | [1-10] | |
| Wheel control | [1-10] | |
| Impact absorption | [1-10] | |

### Damping Preferences (if known)
| Parameter | Front | Rear | Notes |
|-----------|-------|------|-------|
| Rebound @ 0.3 m/s (N) | | | |
| Compression @ 0.3 m/s (N) | | | |
| Desired C/R ratio | | | |
| Low-speed character | [Digressive/Linear] | | |
| High-speed character | [Linear/Progressive] | | |

### Operating Environment
| Parameter | Value | Notes |
|-----------|-------|-------|
| Min ambient temp (°C) | | |
| Max ambient temp (°C) | | |
| Max damper temp (°C) | | Expected |
| Exposure | [Road/Track/Dust/Mud/Salt] | |
| Service interval | | Hours or km |

### Durability Requirements
| Parameter | Value | Notes |
|-----------|-------|-------|
| Design life | | km or hours |
| Warranty requirement | | |
| Rebuild capability | [Yes/No] | |
| Expected rebuild interval | | |
```

### Damping Force Estimation

If customer doesn't have targets:

```
Step 1: Calculate natural frequency
fn = target ride frequency (Hz)
Typical: 1.0-1.5 Hz road, 1.5-2.5 Hz sport, 2.5-4.0 Hz race

Step 2: Calculate critical damping
Cc = 2 × √(k × m)
Where k = spring rate at wheel (N/m), m = sprung mass per corner (kg)

Step 3: Select damping ratio
ζ = 0.2-0.3 comfort, 0.3-0.5 sport, 0.5-0.8 race

Step 4: Calculate damping coefficient
C = ζ × Cc (Ns/m at wheel)

Step 5: Calculate force at velocity
F @ v = C × v
F @ 0.3 m/s = C × 0.3

Step 6: Convert to damper
F_damper = F_wheel / MR
v_damper = v_wheel × MR
```

---

## Stage 5: Constraints

### Constraints Template

```markdown
## Project Constraints

### Commercial
| Parameter | Value | Notes |
|-----------|-------|-------|
| Budget range per damper | | |
| Target price point | | |
| Annual volume | | |
| First delivery date | | |

### Technical
| Parameter | Value | Notes |
|-----------|-------|-------|
| Weight limit per damper | | grams |
| Must match existing mount | [Yes/No] | |
| Reference damper P/N | | If replacement |
| Fluid type restriction | | |
| Certification required | | E-mark, FIA, etc. |

### Supply Chain
| Parameter | Value | Notes |
|-----------|-------|-------|
| Delivery location | | |
| Packaging requirements | | |
| Labeling requirements | | |
| Documentation required | | Test certs, etc. |
```

---

## Stage 6: Preliminary Specification Output

### Auto-Generated Spec Template

```markdown
# Damper Preliminary Specification

**Project:** [Project name]
**Customer:** [Company]
**Date:** [Date]
**Revision:** A
**Status:** PRELIMINARY - For discussion

---

## 1. Application Summary

| Parameter | Value |
|-----------|-------|
| Vehicle | [Make/Model/Year] |
| Position | [Front/Rear/All] |
| Quantity | [Per set] |
| Application | [Road/Race/Off-road] |

## 2. Key Dimensions

| Parameter | Front | Rear |
|-----------|-------|------|
| Extended length (mm) | | |
| Compressed length (mm) | | |
| Stroke (mm) | | |
| Body OD (mm) | | |
| Rod OD (mm) | | |
| Top mount | | |
| Bottom mount | | |

## 3. Performance Targets

| Parameter | Front | Rear |
|-----------|-------|------|
| Rebound @ 0.05 m/s (N) | | |
| Rebound @ 0.3 m/s (N) | | |
| Rebound @ 1.0 m/s (N) | | |
| Compression @ 0.05 m/s (N) | | |
| Compression @ 0.3 m/s (N) | | |
| Compression @ 1.0 m/s (N) | | |
| C/R ratio | | |

## 4. Construction

| Component | Specification |
|-----------|---------------|
| Body material | [6061-T6 / Steel] |
| Rod material | [4140 / 17-4PH] |
| Rod treatment | [Chrome / QPQ / DLC] |
| Rod seals | [NBR / FKM] |
| Piston seals | [PTFE-Bronze / PEEK] |
| Valve type | DSSV |
| Fluid | [Type] |
| Gas pressure | [X] bar ±0.5 |

## 5. Operating Conditions

| Parameter | Value |
|-----------|-------|
| Temperature range | [Min] to [Max] °C |
| Max damper velocity | [X] m/s |
| Design life | [X] km / hours |
| Service interval | [X] km / hours |

## 6. Deliverables

| Item | Included |
|------|----------|
| Damper assemblies | [Qty] |
| Spare seal kit | [Yes/No] |
| Test data | [Yes/No] |
| CAD data | [Yes/No] |
| Valve kit options | [Yes/No] |

## 7. Next Steps

1. Review and confirm requirements
2. Detailed engineering design
3. Quotation (link to QuoteEstimator)
4. Customer approval
5. Prototype build
6. Validation testing
7. Production

---

**Prepared by:** [Name]
**Contact:** [Email/Phone]

*This is a preliminary specification for discussion purposes.
Final specification subject to detailed engineering review.*
```

---

## Workflow Automation

### When to Use This Workflow

Trigger phrases:
- "New customer application"
- "Capture damper requirements"
- "Application engineering"
- "Customer wants dampers for..."
- "Quote request for dampers"

### Integration Points

| Stage | Integration |
|-------|-------------|
| After Stage 5 | → QuoteEstimator skill for pricing |
| After Stage 6 | → APQPPPAP skill for product launch |
| Design phase | → PlantCapability for manufacturing |
| Production | → DamperAssembly for build process |

### Output Locations

Save captured requirements to:
```
~/projects/work/damper-engineering/
├── applications/
│   └── [customer]-[project]/
│       ├── requirements.md
│       ├── preliminary-spec.md
│       └── correspondence/
```
