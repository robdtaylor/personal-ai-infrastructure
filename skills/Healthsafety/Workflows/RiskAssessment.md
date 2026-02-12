# Risk Assessment Workflow

**Structured workflow for conducting workplace risk assessments per UK HSE guidance.**

## Trigger
- "Risk assessment for [activity/area]"
- "Hazard assessment"
- "New process risk assessment"

## Process

### Step 1: Define Scope

Document the assessment scope:

| Field | Value |
|-------|-------|
| Assessment ID | RA-[Dept]-[Seq] |
| Activity/Area | [What is being assessed] |
| Location | [Where] |
| Assessor | [Name] |
| Date | [Date] |
| Review Date | [Date + 1 year or earlier] |

### Step 2: Identify Hazards

Walk the area and identify all hazards:

**Hazard Categories Checklist:**

| Category | Hazards Present | Details |
|----------|-----------------|---------|
| **Mechanical** | ☐ Moving parts | |
| | ☐ Nip points | |
| | ☐ Cutting/shearing | |
| | ☐ Ejection | |
| **Chemical** | ☐ Hazardous substances | |
| | ☐ Fumes/vapours | |
| | ☐ Dust/mist | |
| **Physical** | ☐ Noise | |
| | ☐ Vibration | |
| | ☐ Temperature extremes | |
| | ☐ Radiation | |
| **Ergonomic** | ☐ Manual handling | |
| | ☐ Repetitive motion | |
| | ☐ Awkward posture | |
| **Electrical** | ☐ Shock risk | |
| | ☐ Arc flash | |
| **Environmental** | ☐ Slips/trips | |
| | ☐ Falls from height | |
| | ☐ Falling objects | |
| | ☐ Poor lighting | |

### Step 3: Identify Who is at Risk

| Group | Exposed? | How? |
|-------|----------|------|
| Operators | ☐ | [Description] |
| Maintenance | ☐ | [Description] |
| Supervisors | ☐ | [Description] |
| Contractors | ☐ | [Description] |
| Visitors | ☐ | [Description] |
| Vulnerable persons | ☐ | [Description] |

**Vulnerable persons include:**
- Young workers (<18)
- Pregnant workers
- Workers with disabilities
- Lone workers
- Inexperienced workers

### Step 4: Evaluate Risks

**Severity Scale:**
| Score | Severity | Description |
|-------|----------|-------------|
| 5 | Catastrophic | Death or permanent disability |
| 4 | Major | Serious injury, long-term illness |
| 3 | Moderate | Injury requiring medical treatment |
| 2 | Minor | First aid treatment only |
| 1 | Negligible | No injury expected |

**Likelihood Scale:**
| Score | Likelihood | Description |
|-------|------------|-------------|
| 5 | Almost certain | Expected to occur |
| 4 | Likely | Will probably occur |
| 3 | Possible | May occur occasionally |
| 2 | Unlikely | Not expected to occur |
| 1 | Rare | Only in exceptional circumstances |

**Risk Score = Severity × Likelihood**

| Score | Level | Action Required |
|-------|-------|-----------------|
| 17-25 | Critical | Stop work. Immediate action. |
| 10-16 | High | Urgent action within 24 hours |
| 5-9 | Medium | Planned action within 1 week |
| 1-4 | Low | Monitor and review |

### Step 5: Record Current Controls

For each hazard:

| Hazard | Current Controls | Adequate? |
|--------|------------------|-----------|
| [Hazard 1] | [Existing controls] | Y/N |
| [Hazard 2] | [Existing controls] | Y/N |

**Control types:**
- Elimination
- Substitution
- Engineering controls (guards, LEV)
- Administrative controls (procedures, training)
- PPE

### Step 6: Assess Risk with Current Controls

```markdown
## Risk Register

| # | Hazard | Who at Risk | S | L | Risk | Current Controls |
|---|--------|-------------|---|---|------|------------------|
| 1 | [Hazard] | [Who] | [1-5] | [1-5] | [Score] | [Controls] |
| 2 | [Hazard] | [Who] | [1-5] | [1-5] | [Score] | [Controls] |
```

### Step 7: Identify Additional Controls

For risks not adequately controlled, apply hierarchy:

| Priority | Control Type | Examples |
|----------|--------------|----------|
| 1st | Eliminate | Remove hazard, change process |
| 2nd | Substitute | Less hazardous material |
| 3rd | Engineering | Guards, enclosures, ventilation |
| 4th | Administrative | Procedures, training, signs |
| 5th | PPE | As last resort |

### Step 8: Action Plan

```markdown
## Additional Controls Required

| # | Hazard | Additional Control | Owner | Due Date | Status |
|---|--------|-------------------|-------|----------|--------|
| 1 | [Hazard] | [Control] | [Name] | [Date] | Open |
| 2 | [Hazard] | [Control] | [Name] | [Date] | Open |
```

### Step 9: Reassess Residual Risk

After additional controls implemented:

| # | Hazard | S | L | Residual Risk | Acceptable? |
|---|--------|---|---|---------------|-------------|
| 1 | [Hazard] | [1-5] | [1-5] | [Score] | Y/N |

**Acceptable risk:** Generally Low (1-4), sometimes Medium (5-9) with monitoring.

### Step 10: Communicate and Review

**Communication:**
- [ ] Share with affected employees
- [ ] Brief supervisors
- [ ] Display in work area (if appropriate)
- [ ] Include in training

**Review Triggers:**
- After any incident
- When process changes
- When new equipment introduced
- When controls found ineffective
- At scheduled review date

## Output: Risk Assessment Record

```markdown
# Risk Assessment

**Assessment ID:** RA-[Dept]-[Seq]
**Activity/Area:** [Description]
**Location:** [Where]
**Date:** [Date]
**Assessor:** [Name]
**Review Date:** [Date]

## Persons at Risk
[List groups exposed]

## Risk Register

| # | Hazard | Who | S | L | Risk | Controls | S | L | Residual |
|---|--------|-----|---|---|------|----------|---|---|----------|
| 1 | | | | | | | | | |
| 2 | | | | | | | | | |

## Action Plan

| # | Action | Owner | Due | Status |
|---|--------|-------|-----|--------|
| 1 | | | | |

## Sign-Off

**Assessed By:** _____________ Date: _______
**Reviewed By:** _____________ Date: _______
**Approved By:** _____________ Date: _______

## Review History

| Date | Reviewed By | Changes Made |
|------|-------------|--------------|
| | | |
```

## Common Assessment Types

| Type | Specific Considerations |
|------|------------------------|
| Machine operation | Guarding, LOTO, maintenance access |
| Manual handling | Weight, frequency, posture, individual factors |
| Chemical use | COSHH assessment required (separate workflow) |
| Work at height | Fall prevention, rescue plan |
| Hot work | Fire risk, permits |
| Confined space | Atmosphere, access, rescue |
| Lone working | Communication, emergency response |
| New/expectant mothers | Specific regulations, assessment required |

## Integration Points

- **COSHH Assessment:** For hazardous substances
- **PFMEA:** Process failure mode risks
- **Work Instructions:** Reference controls
- **Training Records:** Competency requirements
