# COSHH Assessment Workflow

**Structured workflow for Control of Substances Hazardous to Health assessments.**

## Trigger
- "COSHH assessment for [substance]"
- "New chemical assessment"
- "Hazardous substance review"

## Process

### Step 1: Identify the Substance

Gather substance information:

| Field | Value |
|-------|-------|
| Assessment ID | COSHH-[Seq] |
| Substance Name | [Commercial name] |
| Supplier | [Company] |
| Product Code | [Supplier code] |
| SDS Date | [Revision date] |
| Use Location | [Department/area] |
| Assessor | [Name] |
| Assessment Date | [Date] |

### Step 2: Obtain and Review SDS

**Safety Data Sheet Sections:**

| Section | Key Information |
|---------|-----------------|
| 1 | Identification, supplier |
| 2 | **Hazards identification** |
| 3 | Composition/ingredients |
| 4 | First aid measures |
| 5 | Fire-fighting measures |
| 6 | Accidental release |
| 7 | Handling and storage |
| 8 | **Exposure controls/PPE** |
| 9 | Physical/chemical properties |
| 10 | Stability and reactivity |
| 11 | **Toxicological information** |
| 12 | Ecological information |
| 13 | Disposal considerations |
| 14 | Transport information |
| 15 | Regulatory information |
| 16 | Other information |

**Record Hazard Classifications:**

| Hazard | Present? | Details |
|--------|----------|---------|
| Toxic | ☐ | |
| Harmful | ☐ | |
| Corrosive | ☐ | |
| Irritant | ☐ | |
| Sensitiser | ☐ | |
| Carcinogen | ☐ | |
| Mutagen | ☐ | |
| Toxic to reproduction | ☐ | |
| Flammable | ☐ | |
| Oxidising | ☐ | |
| Environmental hazard | ☐ | |

### Step 3: Describe the Process

**How is the substance used?**

| Question | Answer |
|----------|--------|
| What tasks involve this substance? | [List tasks] |
| How is it applied/used? | [Method] |
| What quantity is used per task? | [Amount] |
| How often is it used? | [Frequency] |
| Duration of exposure? | [Time] |
| Is it heated/sprayed/aerosolised? | Y/N |

### Step 4: Identify Who is Exposed

| Group | Exposed? | How? | Duration |
|-------|----------|------|----------|
| Operators | ☐ | | |
| Maintenance | ☐ | | |
| Cleaners | ☐ | | |
| Contractors | ☐ | | |
| Others nearby | ☐ | | |

**Vulnerable Groups:**
- [ ] Young workers
- [ ] Pregnant/breastfeeding workers
- [ ] Workers with existing conditions (skin, respiratory)

### Step 5: Assess Exposure Routes

| Route | Possible? | How? |
|-------|-----------|------|
| **Inhalation** | ☐ | Vapour, mist, dust, fume |
| **Skin contact** | ☐ | Splash, immersion, contaminated surfaces |
| **Eye contact** | ☐ | Splash, vapour |
| **Ingestion** | ☐ | Contaminated hands, food/drink |

### Step 6: Check Workplace Exposure Limits

**From SDS Section 8:**

| Substance/Component | WEL 8-hr TWA | WEL STEL (15 min) |
|---------------------|--------------|-------------------|
| [Component 1] | [ppm or mg/m³] | [ppm or mg/m³] |
| [Component 2] | [ppm or mg/m³] | [ppm or mg/m³] |

**Exposure Assessment:**
- [ ] Below WEL
- [ ] At or near WEL
- [ ] Above WEL
- [ ] WEL not established - use professional judgement

### Step 7: Evaluate Current Controls

**Control Hierarchy Assessment:**

| Level | Control | In Place? | Adequate? |
|-------|---------|-----------|-----------|
| 1 | **Elimination** - Can we remove the substance? | ☐ | |
| 2 | **Substitution** - Can we use less hazardous? | ☐ | |
| 3 | **Engineering** - Enclosure, LEV, containment | ☐ | |
| 4 | **Administrative** - Procedures, training, signage | ☐ | |
| 5 | **PPE** - Appropriate PPE provided and used | ☐ | |

**Current Controls Detail:**

| Control Type | Description | Condition |
|--------------|-------------|-----------|
| Ventilation | [Type, location] | [Good/Poor] |
| Containment | [Description] | [Good/Poor] |
| Procedures | [Reference] | [Current?] |
| Training | [What training] | [Current?] |
| PPE | [Type] | [Adequate?] |

### Step 8: Determine Risk Level

**Risk Assessment:**

| Factor | Rating | Notes |
|--------|--------|-------|
| Hazard severity | H / M / L | Based on SDS hazards |
| Exposure potential | H / M / L | Based on use and controls |
| **Overall Risk** | H / M / L | Combined assessment |

### Step 9: Additional Controls Required

**If risk not adequately controlled:**

| # | Additional Control | Type | Owner | Due Date |
|---|-------------------|------|-------|----------|
| 1 | [Control measure] | [Eng/Admin/PPE] | [Name] | [Date] |
| 2 | [Control measure] | [Type] | [Name] | [Date] |

### Step 10: Define Control Measures

**PPE Requirements:**

| PPE Type | Specification | Standard |
|----------|---------------|----------|
| Gloves | [Material, thickness] | EN 374 |
| Eye protection | [Type] | EN 166 |
| Respiratory | [Type, filter] | EN 14387 |
| Clothing | [Type] | [Standard] |

**Storage Requirements:**
- Location: [Where]
- Conditions: [Temperature, ventilation]
- Segregation: [From what]
- Maximum quantity: [Amount]
- Container requirements: [Type]

**Emergency Procedures:**
- Spill response: [Procedure reference]
- First aid: [Key actions]
- Fire: [Extinguisher type]
- Disposal: [Method]

### Step 11: Health Surveillance

**Health Surveillance Required?**

| Condition | Surveillance | Frequency |
|-----------|--------------|-----------|
| Skin sensitiser/irritant | Skin checks | [Frequency] |
| Respiratory sensitiser | Respiratory questionnaire | [Frequency] |
| Other | [Specify] | [Frequency] |

### Step 12: Training Requirements

| Training | Who | When | Record |
|----------|-----|------|--------|
| Hazard awareness | All users | Before first use | Training record |
| Safe handling | All users | Before first use | Training record |
| PPE use | All users | Before first use | Training record |
| Emergency response | All users | Before first use | Training record |
| Health surveillance | If required | [Frequency] | OH records |

### Step 13: Review Schedule

| Review Trigger | Action |
|----------------|--------|
| Scheduled (max 12 months) | Full review |
| Incident involving substance | Immediate review |
| Process change | Review affected sections |
| New information (SDS update) | Review hazard assessment |
| Control found ineffective | Review and revise controls |

## Output: COSHH Assessment Record

```markdown
# COSHH Assessment

**Assessment ID:** COSHH-[Seq]
**Substance:** [Name]
**Supplier:** [Company]
**SDS Revision:** [Date]

## Hazard Summary

| Hazard | Risk Phrase |
|--------|-------------|
| [Hazard] | [H-statement] |

## Use Details

| Parameter | Value |
|-----------|-------|
| Task(s) | [Description] |
| Location | [Area] |
| Quantity used | [Amount] |
| Frequency | [How often] |
| Duration | [Time per use] |

## Exposure Assessment

| Route | Risk Level | Controls |
|-------|------------|----------|
| Inhalation | H/M/L | [Controls] |
| Skin | H/M/L | [Controls] |
| Eye | H/M/L | [Controls] |
| Ingestion | H/M/L | [Controls] |

## Required Controls

### PPE
| Type | Specification |
|------|---------------|
| Gloves | [Type] |
| Eye | [Type] |
| Respiratory | [Type] |

### Other Controls
- [Control 1]
- [Control 2]

## Storage
[Requirements]

## Emergency
- Spill: [Procedure]
- First aid: [Key actions]

## Health Surveillance
[Requirements or "Not required"]

## Training
[Requirements]

## Assessment Details

| Role | Name | Date |
|------|------|------|
| Assessed by | | |
| Reviewed by | | |
| Approved by | | |

**Next Review:** [Date]
```

## Chemical Register

Maintain a register of all hazardous substances:

```markdown
# MNMUK Chemical Register

| ID | Substance | Supplier | Location | SDS Date | COSHH Ref | Review Due |
|----|-----------|----------|----------|----------|-----------|------------|
| 1 | [Name] | [Supplier] | [Area] | [Date] | COSHH-001 | [Date] |
| 2 | [Name] | [Supplier] | [Area] | [Date] | COSHH-002 | [Date] |
```

## Integration Points

- **Risk Assessment:** General workplace assessment
- **Training Records:** COSHH training completion
- **Purchasing:** Approve new substances before purchase
- **Emergency Procedures:** Spill response plans
