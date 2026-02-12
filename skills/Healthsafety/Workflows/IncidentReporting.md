# Incident Reporting Workflow

**Structured workflow for reporting and investigating workplace incidents.**

## Trigger
- "Report an accident"
- "Incident occurred"
- "Near miss report"
- "RIDDOR report needed"

## Process

### Step 1: Immediate Response

**Priority Actions:**

| Priority | Action | Who |
|----------|--------|-----|
| 1 | Ensure scene is safe | First responder |
| 2 | Administer first aid / call 999 | First aider |
| 3 | Preserve the scene | Supervisor |
| 4 | Identify witnesses | Supervisor |
| 5 | Notify management | Supervisor |

**Scene Preservation:**
- Do not move equipment (unless for safety)
- Take photos immediately
- Cordon off area if needed
- Note positions of people/equipment

### Step 2: Classify the Incident

| Type | Definition | Reporting |
|------|------------|-----------|
| **Fatality** | Death of any person | RIDDOR immediate, HSE notified |
| **Specified injury** | As per RIDDOR list | RIDDOR within 10 days |
| **Over 7-day** | >7 days incapacitation | RIDDOR within 15 days |
| **Recordable** | Medical treatment required | Internal record |
| **First aid** | First aid only | Internal record |
| **Near miss** | No injury but potential | Internal record |
| **Property damage** | Equipment/facility damage | Internal record |

### Step 3: Complete Incident Report

```markdown
## Incident Report Form

**Report Number:** IR-[YEAR]-[SEQ]
**Date/Time of Incident:** [DateTime]
**Date/Time Reported:** [DateTime]
**Location:** [Specific location]

### Injured Person (if applicable)

| Field | Value |
|-------|-------|
| Name | |
| Job Title | |
| Department | |
| Length of Service | |
| Normal Shift | |

### Incident Details

**What happened:** (Factual description)
[Describe what happened in sequence]

**Injury/Illness:** (If applicable)
| Body Part | Nature of Injury |
|-----------|------------------|
| [Part] | [Description] |

**Treatment Given:**
- [ ] First aid on site
- [ ] Sent to hospital
- [ ] Sent home
- [ ] Returned to work
- [ ] Other: [specify]

**Witnesses:**
| Name | Department | Contact |
|------|------------|---------|
| | | |

### Equipment/Materials Involved

| Item | Description | Condition |
|------|-------------|-----------|
| | | |

### Environmental Conditions

- Lighting: Good / Poor / Dark
- Floor: Dry / Wet / Oily / Uneven
- Weather (if outdoor): [Describe]
- Other factors: [Describe]

**Reported By:** [Name]
**Date:** [Date]
**Supervisor:** [Name]
```

### Step 4: RIDDOR Assessment

**Is this RIDDOR reportable?**

**Specified Injuries (Report within 10 days):**
- [ ] Fracture (except fingers, thumbs, toes)
- [ ] Amputation
- [ ] Permanent loss/reduction of sight
- [ ] Crush injury to head or torso
- [ ] Burns >10% body or affecting eyes/respiratory
- [ ] Scalping
- [ ] Loss of consciousness (head injury/asphyxia)
- [ ] Acute illness from chemical exposure

**Over 7-Day Incapacitation (Report within 15 days):**
- [ ] Unable to perform normal work for >7 consecutive days (excluding day of accident)

**If RIDDOR Reportable:**
1. Report online: www.hse.gov.uk/riddor
2. Obtain reference number
3. Keep copy with incident report
4. Notify H&S Manager immediately

### Step 5: Investigation

**Investigation Level:**

| Incident Type | Investigation Level | Lead |
|---------------|---------------------|------|
| Fatal/specified | Full investigation | External/Senior Mgmt |
| Over 7-day | Detailed investigation | H&S Manager |
| Recordable | Standard investigation | Supervisor + H&S |
| First aid/near miss | Basic investigation | Supervisor |

**Investigation Steps:**

1. **Gather Evidence**
   - [ ] Photographs taken
   - [ ] Physical evidence preserved
   - [ ] Documents collected (procedures, training records)
   - [ ] Equipment condition noted

2. **Interview Witnesses**
   - [ ] Injured person (when appropriate)
   - [ ] Eyewitnesses
   - [ ] Others with relevant knowledge
   - Use PEACE model, open questions

3. **Timeline Reconstruction**
   | Time | Event |
   |------|-------|
   | [Time] | [What happened] |

### Step 6: Root Cause Analysis

**Immediate Cause:** What directly caused the incident?
[Description]

**5 Whys Analysis:**
| Why | Question | Answer |
|-----|----------|--------|
| 1 | Why did [immediate cause] happen? | |
| 2 | Why? | |
| 3 | Why? | |
| 4 | Why? | |
| 5 | Why? | |

**Root Cause Category:**
- [ ] Unsafe act (procedural breach)
- [ ] Unsafe condition (physical hazard)
- [ ] Lack of training/competence
- [ ] Inadequate procedure
- [ ] Equipment failure
- [ ] Management system failure
- [ ] Other: [specify]

**Contributing Factors:**
- [ ] Time pressure
- [ ] Fatigue
- [ ] Distraction
- [ ] Inadequate supervision
- [ ] Communication failure
- [ ] Environmental factors
- [ ] Other: [specify]

### Step 7: Corrective Actions

**Immediate Actions (Containment):**

| Action | Owner | Completed |
|--------|-------|-----------|
| [Action] | [Name] | [Date] |

**Corrective Actions (Address root cause):**

| # | Action | Owner | Due Date | Status |
|---|--------|-------|----------|--------|
| 1 | | | | |
| 2 | | | | |

**Preventive Actions (Prevent similar incidents):**

| # | Action | Owner | Due Date | Status |
|---|--------|-------|----------|--------|
| 1 | | | | |

### Step 8: Close Out

**Verification:**
- [ ] All actions completed
- [ ] Effectiveness verified
- [ ] Risk assessment updated
- [ ] Procedures updated (if needed)
- [ ] Training provided (if needed)
- [ ] Similar areas/processes reviewed

**Closure Sign-Off:**

| Role | Name | Date |
|------|------|------|
| Investigator | | |
| H&S Manager | | |
| Department Manager | | |

## Output: Investigation Summary

```markdown
# Incident Investigation Summary

**Report Number:** IR-[YEAR]-[SEQ]
**Date of Incident:** [Date]
**Location:** [Where]
**Type:** [Classification]
**RIDDOR:** Yes/No (Ref: [if applicable])

## Summary
[Brief description of incident]

## Root Cause
[Root cause statement]

## Contributing Factors
- [Factor 1]
- [Factor 2]

## Actions

| # | Action | Type | Owner | Due | Status |
|---|--------|------|-------|-----|--------|
| 1 | | Corrective | | | |
| 2 | | Preventive | | | |

## Lessons Learned
[Key learnings to share]

## Status: OPEN / CLOSED
**Closed Date:** [Date]
**Closed By:** [Name]
```

## Near Miss Reporting

**Near Miss Definition:** An unplanned event that did not result in injury, illness, or damage but had the potential to do so.

**Encourage Reporting:**
- No blame culture
- Simple reporting process
- Feedback on actions taken
- Recognition for reporting

**Near Miss Report (Simplified):**
```markdown
## Near Miss Report

**Date:** [Date]
**Location:** [Where]
**Reported By:** [Name]

**What happened:**
[Brief description]

**What could have happened:**
[Potential consequence]

**Suggested action:**
[If any]
```

## Integration Points

- **Risk Assessment:** Update after incident
- **Training Records:** Verify competence
- **PFMEA:** Consider failure mode
- **Safety Audit:** Include in findings
