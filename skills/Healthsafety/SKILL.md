---
name: Healthsafety
description: UK health and safety management for manufacturing operations. Covers risk assessments, COSHH, PPE, incident reporting, LOTO, manual handling, and emergency procedures. Aligned with UK HSE regulations and IATF 16949 clause 7.1.4. USE WHEN user says 'health and safety', 'risk assessment', 'COSHH', 'PPE', 'accident', 'incident', 'LOTO', 'lockout tagout', 'manual handling', 'emergency procedure', or needs safety compliance guidance.
---

# HealthSafety

UK health and safety management for MNMUK manufacturing operations, aligned with the Health and Safety at Work Act 1974, UK HSE regulations, and IATF 16949.

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **RiskAssessment** | "risk assessment", "hazard assessment" | `Workflows/RiskAssessment.md` |
| **IncidentReporting** | "accident", "incident", "near miss" | `Workflows/IncidentReporting.md` |
| **CoshhAssessment** | "COSHH", "chemical", "hazardous substance" | `Workflows/CoshhAssessment.md` |
| **SafetyAudit** | "safety audit", "inspection" | `Workflows/SafetyAudit.md` |

## Legal Framework (UK)

### Primary Legislation

| Act/Regulation | Requirement | MNMUK Application |
|----------------|-------------|-------------------|
| **Health and Safety at Work Act 1974** | General duty of care | Foundation of all H&S |
| **Management of Health and Safety at Work Regulations 1999** | Risk assessment, competent persons | Risk assessment programme |
| **COSHH Regulations 2002** | Control of hazardous substances | Chemical management |
| **PUWER 1998** | Provision and use of work equipment | Machine safety |
| **Manual Handling Operations Regulations 1992** | Reduce manual handling risks | Lifting assessments |
| **PPE at Work Regulations 1992** | Provide appropriate PPE | PPE programme |
| **RIDDOR 2013** | Report specified injuries/incidents | Incident reporting |

### Enforcement

| Body | Role |
|------|------|
| Health and Safety Executive (HSE) | Primary enforcement authority |
| Local Authority | Certain workplace types |
| Environment Agency | Environmental hazards |

## IATF 16949 Alignment

| IATF Clause | Requirement | H&S Coverage |
|-------------|-------------|--------------|
| 7.1.4 | Environment for operation | Physical, psychological, social factors |
| 7.1.4.1 | Cleanliness of premises | Housekeeping, 5S, safety |
| 8.5.1.5 | Total productive maintenance | Equipment safety maintenance |
| 7.2 | Competence | H&S training requirements |

**Reference:** `~/projects/work/docs/work-instructions/procedures/hr/HRP-004_Health_Safety.md`

## Risk Assessment Framework

### Hazard Categories

| Category | Examples | Assessment Approach |
|----------|----------|---------------------|
| **Mechanical** | Moving parts, nip points, ejection | Machine-specific assessment |
| **Chemical** | Coolants, solvents, oils | COSHH assessment |
| **Physical** | Noise, vibration, temperature | Environmental monitoring |
| **Ergonomic** | Repetitive motion, posture, lifting | Workstation assessment |
| **Electrical** | Shock, arc flash | Electrical safety programme |

### Risk Matrix

```
              LIKELIHOOD
              Low    Medium   High
         ┌────────┬────────┬────────┐
    High │ Medium │  High  │Critical│
SEVERITY ├────────┼────────┼────────┤
  Medium │  Low   │ Medium │  High  │
         ├────────┼────────┼────────┤
    Low  │  Low   │  Low   │ Medium │
         └────────┴────────┴────────┘
```

### Risk Response

| Risk Level | Response Required | Timeframe |
|------------|-------------------|-----------|
| **Critical** | Stop work, immediate action | Immediate |
| **High** | Implement controls before work | Within 24 hours |
| **Medium** | Plan and implement controls | Within 1 week |
| **Low** | Document and monitor | Ongoing |

## PPE Requirements

### PPE by Area

| Area | Minimum PPE | Additional as Required |
|------|-------------|------------------------|
| Manufacturing floor | Safety glasses, safety footwear | Hearing protection |
| Machine operation | + Hearing protection | Face shield for grinding |
| Chemical handling | + Chemical-resistant gloves | Face shield, apron |
| Welding areas | Welding helmet, leather gloves | Fire-resistant clothing |
| Overhead work | Hard hat | Fall protection |

### PPE Management

| Requirement | Frequency |
|-------------|-----------|
| Issue and record | At hire / as needed |
| Condition inspection | Daily by user |
| Replacement | When damaged or worn |
| Training on use | At issue |

## Machine Safety

### Key Requirements (PUWER)

| Requirement | Standard |
|-------------|----------|
| Guarding | All nip points, moving parts guarded |
| Interlocks | Guards interlocked where practical |
| Emergency stops | Accessible within reach |
| Maintenance | Safe systems, isolation |

### Lockout/Tagout (LOTO)

**8-Step LOTO Procedure:**

1. **Notify** - Inform affected employees
2. **Identify** - Identify all energy sources
3. **Isolate** - Shut down equipment normally
4. **Lock/Tag** - Apply personal lock and tag
5. **Release** - Release stored energy
6. **Verify** - Attempt start to confirm isolation
7. **Perform** - Complete maintenance work
8. **Restore** - Remove locks/tags, restore energy

**Energy Types:**
- Electrical
- Pneumatic
- Hydraulic
- Mechanical (springs, gravity)
- Thermal
- Chemical

## COSHH Management

### Hazardous Substances at MNMUK

| Category | Examples | Controls |
|----------|----------|----------|
| Cutting fluids | Coolants, neat oils | LEV, PPE, skin care |
| Cleaning solvents | Degreasers, IPA | Ventilation, PPE |
| Lubricants | Oils, greases | Skin protection |
| Welding fumes | Metal fumes | LEV, respiratory protection |

### COSHH Requirements

| Requirement | Action |
|-------------|--------|
| Assessment | For each substance/process |
| Control measures | Hierarchy of controls |
| Health surveillance | Where required by assessment |
| Information/training | All exposed employees |
| SDS availability | At point of use |

## Manual Handling

### Assessment Triggers

| Factor | Assessment Required |
|--------|---------------------|
| Weight | >10kg regular handling |
| Frequency | Repeated lifting |
| Posture | Twisting, bending, reaching |
| Environment | Space constraints |
| Individual | Known conditions |

### Control Hierarchy

1. **Eliminate** - Remove need for manual handling
2. **Mechanise** - Hoists, trolleys, conveyors
3. **Reduce** - Lighter loads, team lifting
4. **Train** - Proper technique

## Incident Management

### Reportable Incidents (RIDDOR)

| Category | Examples | Reporting |
|----------|----------|-----------|
| **Fatal** | Any workplace death | Immediate |
| **Specified injuries** | Fractures, amputations, loss of sight | Within 10 days |
| **Over 7-day incapacitation** | Unable to work >7 days | Within 15 days |
| **Occupational diseases** | As specified in RIDDOR | When diagnosed |
| **Dangerous occurrences** | Near misses as specified | Within 10 days |

### Investigation Process

1. **Immediate** - Secure scene, care for injured
2. **Report** - Complete incident form
3. **Investigate** - Gather facts, interview witnesses
4. **Root cause** - 5 Whys, fishbone analysis
5. **Actions** - Corrective and preventive
6. **Close** - Verify effectiveness

## Emergency Procedures

### Emergency Types

| Emergency | Response |
|-----------|----------|
| **Fire** | Alarm, evacuate, assemble, account |
| **Medical** | First aid, call 999, assist responders |
| **Chemical spill** | Evacuate area, contain if safe, notify |
| **Gas leak** | Evacuate, no ignition sources, notify |

### Emergency Equipment

| Equipment | Location | Inspection |
|-----------|----------|------------|
| Fire extinguishers | Throughout facility | Monthly visual, annual service |
| First aid kits | Each department | Monthly check |
| AED | Main entrance, production | Monthly check |
| Eye wash stations | Chemical areas | Weekly flush |
| Spill kits | Chemical storage, machines | Monthly check |

### Drill Schedule

| Drill | Frequency |
|-------|-----------|
| Fire evacuation | Quarterly |
| First aid response | Annual |
| Chemical spill | Annual |

## Safety Training

### Training Matrix

| Training | Who | When | Refresher |
|----------|-----|------|-----------|
| General safety induction | All employees | At hire | Annual |
| Job-specific hazards | Affected employees | At assignment | As needed |
| PPE use | All employees | At hire/issue | As needed |
| LOTO | Authorized personnel | Initial | Annual |
| First aid | Designated responders | Initial | Biennial |
| Fire warden | Designated wardens | Initial | Annual |
| Forklift/MHE | Operators | Initial | Triennial |
| COSHH | Exposed employees | At assignment | Annual |

## Safety Audits

### Audit Programme

| Audit Type | Frequency | Scope |
|------------|-----------|-------|
| Department inspection | Weekly | Area-specific hazards |
| Safety committee | Monthly | Rotating areas |
| Management review | Quarterly | Programme effectiveness |
| External audit | Annual | Full compliance |

### Audit Focus Areas

- Housekeeping and 5S
- PPE compliance
- Machine guarding
- Chemical storage
- Emergency equipment
- Documentation currency

## Performance Metrics

| Metric | Target | Frequency |
|--------|--------|-----------|
| Recordable incident rate | <2.0 | Monthly |
| Lost time incident rate | <1.0 | Monthly |
| Near miss reports | >5/month | Monthly |
| Training completion | 100% | Monthly |
| Audit score | >90% | Monthly |
| Open actions | <5 overdue | Weekly |

## Record Retention

| Record | Retention Period |
|--------|------------------|
| Risk assessments | 3 years (or while valid) |
| Training records | Employment + 7 years |
| Incident reports | 10 years |
| RIDDOR reports | 10 years |
| COSHH assessments | 40 years |
| Health surveillance | 40 years |
| Audit records | 3 years |

## Integration with Other Skills

| Skill | Integration Point |
|-------|-------------------|
| AutomotiveManufacturing | Process safety in procedures |
| Pfmea | Safety failure modes |
| Assemblyoperations | Assembly-specific hazards |
| Maintenancepm | Equipment safety checks |
| Tribalknowledge | Safety practices capture |

## Examples

**Example 1: New machine installation**
```
User: "We're installing a new CNC lathe"
→ Conduct risk assessment (Workflows/RiskAssessment.md)
→ Verify guarding per PUWER
→ Develop LOTO procedure
→ Train operators
→ Update department risk assessment
```

**Example 2: Chemical spill incident**
```
User: "We had a coolant spill in Machine Shop"
→ Ensure immediate response complete
→ Complete incident report (Workflows/IncidentReporting.md)
→ Investigate root cause
→ Review COSHH assessment
→ Implement corrective actions
```

**Example 3: New substance introduction**
```
User: "We want to use a new degreaser"
→ Obtain SDS from supplier
→ Conduct COSHH assessment (Workflows/CoshhAssessment.md)
→ Determine controls required
→ Train affected employees
→ Update chemical register
```
