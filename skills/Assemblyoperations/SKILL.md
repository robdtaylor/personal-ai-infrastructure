---
name: Assemblyoperations
description: Assembly operations guidance for LVA (Low Volume Assembly) and FML (Full Manufacturing Line) departments. Covers kitting, torque operations, poka-yoke verification, line balancing, SMED changeovers, and serialized traceability. USE WHEN user says 'assembly', 'LVA', 'FML', 'kitting', 'torque operation', 'line balancing', 'takt time', 'poka-yoke', 'work instruction', 'build sequence', or needs assembly process guidance.
---

# AssemblyOperations

Expert guidance for MNMUK assembly departments - Low Volume Assembly (LVA) and Full Manufacturing Line (FML).

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **Kitting** | "kitting process", "kit preparation" | `Workflows/Kitting.md` |
| **TorqueOperations** | "torque process", "fastening" | `Workflows/TorqueOperations.md` |
| **LineSetup** | "line setup", "SMED", "changeover" | `Workflows/LineSetup.md` |
| **Traceability** | "serial number", "traceability", "build record" | `Workflows/Traceability.md` |

## Department Overview

### LVA (Low Volume Assembly)

**Characteristics:**
- Manual and semi-automated assembly
- High-mix, low-volume production
- Skilled operator dependency
- Flexible workstation configuration

**Core Processes:**
| Process | WI Reference | Description |
|---------|--------------|-------------|
| Kitting | WI-LVA-001 | Component staging and verification |
| Assembly Sequence | WI-LVA-002 | Step-by-step build instructions |
| Torque Operations | WI-LVA-003 | Fastener installation and verification |
| Electrical Assembly | WI-LVA-004 | Harness routing and connection |
| Functional Verification | WI-LVA-005 | In-process and final testing |
| Traceability | WI-LVA-006 | Serial number and build record management |

### FML (Full Manufacturing Line)

**Characteristics:**
- Paced production line
- Takt time driven
- Higher automation level
- Standardized work critical

**Core Processes:**
| Process | WI Reference | Description |
|---------|--------------|-------------|
| Line Setup/Changeover | WI-FML-001 | SMED methodology |
| Takt Time Monitoring | WI-FML-002 | Cycle time tracking and alerts |
| Error-Proofing Verification | WI-FML-003 | Poka-yoke checks |
| End-of-Line Test | WI-FML-004 | Final inspection and release |

## Key Concepts

### Torque Operations

**Critical Requirements:**
- Torque tools calibrated per MSA skill requirements
- Joint classification: Safety Critical / Critical / Standard
- Torque sequence specified for multi-fastener patterns
- Angle monitoring for yield-controlled fasteners

**Torque Verification:**
| Joint Class | Verification Method | Frequency |
|-------------|---------------------|-----------|
| Safety Critical | 100% electronic monitoring + audit | Every joint |
| Critical | Electronic monitoring | Every joint |
| Standard | Operator verification | Per WI |

### Poka-Yoke (Error-Proofing)

**Categories:**
| Type | Description | Example |
|------|-------------|---------|
| Prevention | Physically prevents error | Keyed connectors |
| Detection | Detects error before next step | Vision system |
| Warning | Alerts operator to potential error | Light/sound alarm |

**Verification Requirements:**
- Daily poka-yoke verification at shift start
- Documented on verification log
- Failed poka-yoke = line stop until resolved

### Line Balancing

**Takt Time Calculation:**
```
Takt Time = Available Production Time / Customer Demand

Example:
- Available time: 450 min/shift (7.5 hrs minus breaks)
- Demand: 50 units/shift
- Takt time: 9 minutes/unit
```

**Balancing Principles:**
1. No station cycle time exceeds takt
2. Minimize operator waiting time
3. Balance workload across stations
4. Identify and address bottlenecks

### SMED (Single Minute Exchange of Die)

**Changeover Phases:**
| Phase | Activities | Target |
|-------|------------|--------|
| External Setup | Done while line running | Maximize |
| Internal Setup | Done while line stopped | Minimize |
| Adjustment | Fine-tuning after restart | Eliminate |

**SMED Steps:**
1. Document current changeover
2. Separate internal vs external activities
3. Convert internal to external where possible
4. Streamline remaining internal activities
5. Standardize and practice

## IATF 16949 Alignment

| IATF Clause | Requirement | Assembly Coverage |
|-------------|-------------|-------------------|
| 7.1.3.1 | Plant, facility, and equipment planning | Line layout, workstation design |
| 7.1.4 | Environment for operation | Assembly area conditions |
| 8.5.1.1 | Control plan | Assembly control plan elements |
| 8.5.1.2 | Standardized work | Work instructions, operator instructions |
| 8.5.1.3 | Verification of job setups | Setup verification procedures |
| 8.5.1.5 | Total productive maintenance | Equipment maintenance |
| 8.5.1.6 | Management of production tooling | Tool/fixture control |
| 8.5.2 | Identification and traceability | Serial numbers, build records |
| 8.5.6.1 | Control of changes | Change implementation |
| 8.6.2 | Layout inspection | First article inspection |

**Reference:** `~/projects/work/docs/compliance/IATF16949_Compliance_Plan.md`

## Integration with Other Skills

| Skill | Integration Point |
|-------|-------------------|
| AutomotiveManufacturing | Process documentation standards |
| Pfmea | Assembly PFMEA development |
| Controlplan | Assembly control plan elements |
| Msa | Torque tool calibration studies |
| Spc | In-process monitoring charts |
| Tribalknowledge | Operator expertise capture |
| Skillsmatrix | Operator competency tracking |

## Work Instruction Structure

Standard format for assembly work instructions:

```markdown
# WI-[DEPT]-[SEQ]: [Title]

**Revision:** [Rev]
**Effective Date:** [Date]
**Applies To:** [Part numbers / product families]

## Purpose
[Brief description of operation]

## Safety Requirements
- [ ] PPE required: [list]
- [ ] Hazards: [list]
- [ ] Emergency procedures: [reference]

## Materials and Tools
| Item | Specification | Qty |
|------|---------------|-----|
| [Component] | [P/N] | [#] |
| [Tool] | [Description] | [#] |

## Procedure
1. [Step with photo/diagram]
   - Torque: [value] Nm
   - Quality check: [description]

2. [Next step...]

## Quality Checkpoints
| Step | Check | Method | Acceptance |
|------|-------|--------|------------|
| [#] | [What] | [How] | [Criteria] |

## Traceability
- Serial number location: [where]
- Data to record: [list]
- System entry: [how]
```

## Common Assembly Issues

| Issue | Likely Cause | Resolution |
|-------|--------------|------------|
| Torque not achieved | Worn fastener, cross-thread | Inspect, replace fastener |
| Component interference | Tolerance stack-up | Check dimensions, escalate to engineering |
| Missing component | Kit error | Return to kitting, add poka-yoke |
| Connector not seated | Alignment issue | Verify orientation, check for damage |
| Test failure | Assembly error or component | Follow troubleshooting tree |

## Examples

**Example 1: New product assembly setup**
```
User: "We're starting production of a new damper variant next week"
-> Review BOM and assembly sequence
-> Verify kitting process (Workflows/Kitting.md)
-> Confirm torque specifications
-> Set up traceability in system
-> Create/update work instructions
-> Train operators (link to Skillsmatrix)
```

**Example 2: Line balancing issue**
```
User: "Station 3 is bottlenecking the line"
-> Calculate current takt time
-> Document cycle times at each station
-> Identify tasks that can be redistributed
-> Update line balance chart
-> Revise work instructions
-> Re-train affected operators
```

**Example 3: Changeover improvement**
```
User: "Changeover is taking too long on Line 2"
-> Document current changeover (Workflows/LineSetup.md)
-> Video the changeover
-> Separate internal vs external activities
-> Convert internal to external where possible
-> Create standardized changeover procedure
-> Practice and time improvements
```
