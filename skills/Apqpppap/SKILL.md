---
name: Apqpppap
description: APQP phase gate management and PPAP documentation for automotive product launches. Covers all 5 APQP phases, phase gate checklists, PPAP 18 elements, PSW generation, timing plans, and open issues tracking. USE WHEN user says 'APQP', 'PPAP', 'phase gate', 'product launch', 'PSW', 'PPAP elements', 'launch readiness', 'timing plan', or 'program management'. Integrates with PFMEA, ControlPlan, and MSA skills.
---

# APQP/PPAP - Advanced Product Quality Planning & Production Part Approval

## When to Activate This Skill
- "What APQP phase are we in?"
- "Create a phase gate checklist"
- "What PPAP elements are required?"
- "Generate a PSW for [part]"
- "Create a timing plan for [program]"
- "Track open issues for [launch]"
- "What's needed for PPAP Level [X]?"
- "Run readiness review"

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **PhaseGate** | "phase gate review", "gate checklist" | `Workflows/PhaseGate.md` |
| **PpapPackage** | "PPAP elements", "PPAP submission" | `Workflows/PpapPackage.md` |
| **TimingPlan** | "timing plan", "launch schedule" | `Workflows/TimingPlan.md` |
| **OpenIssues** | "open issues", "issue tracker" | `Workflows/OpenIssues.md` |

---

## APQP Five Phases

### Phase 1: Plan and Define Program
**Purpose:** Determine customer needs and expectations

**Key Deliverables:**
| Deliverable | Description | Owner |
|-------------|-------------|-------|
| Voice of Customer | Customer requirements documented | Commercial |
| Business Plan | Program justification, capacity, investment | GM |
| Product/Process Assumptions | Initial feasibility assessment | Engineering |
| Product Assurance Plan | Quality objectives, reliability goals | Quality |
| Preliminary BOM | Initial bill of materials | Engineering |
| Preliminary Process Flow | High-level manufacturing concept | Mfg Eng |
| Preliminary Special Characteristics | Initial CC/SC identification | Quality |
| Management Support | Resource commitment | GM |

**Gate 1 Criteria:**
- [ ] Customer requirements documented and reviewed
- [ ] Feasibility assessment complete
- [ ] Resource plan approved
- [ ] Risk assessment performed
- [ ] Timing plan established

---

### Phase 2: Product Design and Development
**Purpose:** Develop design to near-final form

**Key Deliverables:**
| Deliverable | Description | Owner |
|-------------|-------------|-------|
| DFMEA | Design Failure Mode Effects Analysis | Design Eng |
| Design for Manufacturability (DFM) | Manufacturing input to design | Mfg Eng |
| Design Verification Plan | DVP&R creation | Design Eng |
| Engineering Drawings | Released with GD&T | Design Eng |
| Engineering Specifications | Material, performance specs | Design Eng |
| Prototype Build | Sample parts for validation | Multiple |
| Prototype Control Plan | Inspection plan for prototypes | Quality |
| Special Characteristics (Updated) | CC/SC finalized | Quality |

**Gate 2 Criteria:**
- [ ] DFMEA complete (RPN addressed)
- [ ] Design reviews completed
- [ ] Drawings released
- [ ] Prototypes built and validated
- [ ] Design verification results acceptable
- [ ] Special characteristics agreed with customer

**Note:** For contract manufacturing (MNMUK), Phase 2 is often customer-led. Focus on DFM feedback and prototype support.

---

### Phase 3: Process Design and Development
**Purpose:** Develop manufacturing process

**Key Deliverables:**
| Deliverable | Description | Owner |
|-------------|-------------|-------|
| Process Flow Diagram | All operations mapped | Mfg Eng |
| Floor Plan Layout | Equipment and flow layout | Mfg Eng |
| Characteristics Matrix | Link characteristics to operations | Quality |
| PFMEA | Process Failure Mode Effects Analysis | Quality/Mfg Eng |
| Pre-Launch Control Plan | Enhanced control for validation | Quality |
| Process Instructions | Operator work instructions | Mfg Eng |
| MSA Plan | Measurement system analysis plan | Quality |
| Preliminary Process Capability Plan | Cpk study plan | Quality |
| Packaging Standards | Pack spec developed | Logistics |
| Management Support (Updated) | Confirm resources | GM |

**Gate 3 Criteria:**
- [ ] Process flow complete and approved
- [ ] PFMEA complete (high RPNs addressed)
- [ ] Pre-launch control plan approved
- [ ] Work instructions drafted
- [ ] MSA plan established
- [ ] Tooling/equipment ordered or available
- [ ] Packaging spec approved

---

### Phase 4: Product and Process Validation
**Purpose:** Validate manufacturing process

**Key Deliverables:**
| Deliverable | Description | Owner |
|-------------|-------------|-------|
| Significant Production Run | PPAP quantity produced | Production |
| MSA Results | Gage R&R complete | Quality |
| Preliminary Process Capability | Initial Cpk/Ppk studies | Quality |
| Production Part Approval | PPAP package complete | Quality |
| Production Validation Testing | Performance testing | Quality |
| Production Control Plan | Final control plan | Quality |
| Quality Planning Sign-Off | Team approval | Cross-functional |
| PSW | Part Submission Warrant | Quality |

**Gate 4 Criteria:**
- [ ] Significant production run complete
- [ ] MSA acceptable (<10% GR&R for CC, <30% for SC)
- [ ] Process capability acceptable (Ppk ≥1.67 for CC, ≥1.33 for SC)
- [ ] PPAP package complete per customer level
- [ ] Customer approval (PSW signed)
- [ ] Production control plan implemented
- [ ] Operators trained

---

### Phase 5: Feedback, Assessment and Corrective Action
**Purpose:** Continuous improvement during production

**Key Activities:**
| Activity | Description | Frequency |
|----------|-------------|-----------|
| Variation Reduction | Reduce process variability | Ongoing |
| Customer Satisfaction | Monitor complaints, returns | Monthly |
| Delivery Performance | OTD tracking | Weekly |
| Lessons Learned | Capture and share | Per program |
| Control Plan Updates | Based on experience | As needed |
| PFMEA Updates | Based on field issues | As needed |

**Ongoing Requirements:**
- [ ] Customer complaints tracked and resolved
- [ ] Process capability maintained
- [ ] Control plans current
- [ ] Lessons learned documented
- [ ] Continuous improvement projects active

---

## PPAP Submission Levels

| Level | Requirements | When Used |
|-------|--------------|-----------|
| **Level 1** | PSW and Appearance Approval Report only | Customer trusts supplier |
| **Level 2** | PSW with product samples and limited data | Reduced documentation |
| **Level 3** | PSW with product samples and complete data | **Default** |
| **Level 4** | PSW with complete data (no samples) | Customer-specific |
| **Level 5** | PSW with product samples and complete data at supplier site | Customer review on-site |

**MNMUK Default:** Level 3 unless customer specifies otherwise.

---

## PPAP 18 Elements

### Element Checklist

| # | Element | Level 1 | Level 2 | Level 3 | Level 4 | Level 5 | Owner |
|---|---------|---------|---------|---------|---------|---------|-------|
| 1 | Design Records | R | S | S | * | R | Engineering |
| 2 | Authorized Engineering Change Documents | R | S | S | * | R | Engineering |
| 3 | Customer Engineering Approval | R | R | S | * | R | Commercial |
| 4 | Design FMEA | R | R | S | * | R | Engineering |
| 5 | Process Flow Diagram | R | R | S | * | R | Mfg Eng |
| 6 | Process FMEA | R | R | S | * | R | Quality |
| 7 | Control Plan | R | R | S | * | R | Quality |
| 8 | Measurement System Analysis | R | R | S | * | R | Quality |
| 9 | Dimensional Results | R | S | S | * | R | Quality |
| 10 | Material, Performance Test Results | R | S | S | * | R | Quality |
| 11 | Initial Process Studies | R | R | S | * | R | Quality |
| 12 | Qualified Laboratory Documentation | R | S | S | * | R | Quality |
| 13 | Appearance Approval Report (AAR) | S | S | S | * | R | Quality |
| 14 | Sample Production Parts | R | S | S | R | R | Quality |
| 15 | Master Sample | R | R | S | * | R | Quality |
| 16 | Checking Aids | R | R | S | * | R | Quality |
| 17 | Customer-Specific Requirements | R | R | S | * | R | Quality |
| 18 | Part Submission Warrant (PSW) | S | S | S | S | S | Quality |

**Legend:** S = Submit to customer | R = Retain at supplier | * = Retain and submit on request

---

## Element Details

### Element 1: Design Records
- Released engineering drawings
- CAD data if applicable
- Current revision level
- All engineering specifications referenced

### Element 2: Authorized Engineering Change Documents
- ECNs (Engineering Change Notices)
- Deviations approved by customer
- Temporary deviations with expiry dates

### Element 3: Customer Engineering Approval
- Evidence of customer approval for design
- Typically for proprietary designs
- Not required if customer-owned design

### Element 4: Design FMEA (DFMEA)
- Covers design failure modes
- Often customer responsibility for contract manufacturing
- MNMUK may not have access if design is proprietary

### Element 5: Process Flow Diagram
- All operations including rework/inspection
- Material flow indicated
- Must match Control Plan operations

### Element 6: Process FMEA (PFMEA)
- All process failure modes
- Current controls documented
- RPN/AP action items closed
- Special characteristics identified
- **Reference:** Load Pfmea skill

### Element 7: Control Plan
- Matches PFMEA and process flow
- All special characteristics controlled
- Appropriate sample sizes and frequencies
- Reaction plans defined
- **Reference:** Load Controlplan skill

### Element 8: Measurement System Analysis (MSA)
- Gage R&R for all variable gages
- Attribute agreement for attribute checks
- Acceptance: <10% for CC, <30% for SC
- **Reference:** Load Msa skill

### Element 9: Dimensional Results
- All drawing dimensions measured
- Sample size typically n=3-5 parts
- Include layout inspection report
- Mark CC/SC results

### Element 10: Material, Performance Test Results
- Material certifications
- Performance test results (DVP&R)
- Third-party test reports if required
- Traceability to material lots

### Element 11: Initial Process Studies
- Capability studies (Ppk/Cpk)
- Minimum 30 parts, 300 readings for SPC
- Acceptance: Ppk ≥1.67 (CC), ≥1.33 (SC)
- **Reference:** Load Spc skill

### Element 12: Qualified Laboratory Documentation
- Scope of lab accreditation
- ISO/IEC 17025 scope if applicable
- Third-party lab certifications

### Element 13: Appearance Approval Report (AAR)
- Required for appearance items only
- Color, grain, texture approval
- Customer-signed AAR form

### Element 14: Sample Production Parts
- Parts from significant production run
- Quantity per customer requirement (typically 3-10)
- Representative of normal production

### Element 15: Master Sample
- Retained production sample
- Same as submitted samples
- Stored per retention requirements

### Element 16: Checking Aids
- Custom gages, fixtures, templates
- Calibrated and identified
- Match Control Plan references

### Element 17: Customer-Specific Requirements
- OEM-specific PPAP requirements
- May include additional forms/checklists
- Check customer portal/manual

### Element 18: Part Submission Warrant (PSW)
- Summary of PPAP submission
- Weight, material declaration
- Customer-specific markings
- Authorized signatures

---

## PSW Generation Guide

### Required Information

```markdown
# Part Submission Warrant

## Part Information
| Field | Value |
|-------|-------|
| Part Number | [Customer P/N] |
| Part Name | [Description] |
| Drawing Number | [Dwg #] |
| Drawing Rev | [Rev Level] |
| Customer | [Customer Name] |
| Buyer/Code | [Buyer Name/Code] |

## Supplier Information
| Field | Value |
|-------|-------|
| Supplier Name | Multimatic Niche Manufacturing UK |
| Supplier Code | [Customer-assigned code] |
| Address | [MNMUK Address] |
| Contact | [Quality Manager] |
| Phone/Email | [Contact details] |

## Submission Details
| Field | Value |
|-------|-------|
| PPAP Level | [1-5] |
| Submission Reason | [Initial, Change, Re-submission] |
| Engineering Change Level | [ECN #] |
| Purchase Order | [PO #] |

## Weight Declaration
| Measured | Specified | Difference |
|----------|-----------|------------|
| [Actual kg] | [Nominal kg] | [± kg] |

## Material Information
| Field | Value |
|-------|-------|
| Material | [Material spec] |
| Supplier | [Material supplier] |
| IMDS/MDS ID | [If required] |

## Special Characteristics
| Char | Drawing Ref | Result |
|------|-------------|--------|
| CC | [Zone/Ref] | PASS/FAIL |
| SC | [Zone/Ref] | PASS/FAIL |

## Submission Checklist
- [ ] All required elements per submission level included
- [ ] Capability requirements met
- [ ] No open issues or deviations
- [ ] Customer-specific requirements addressed

## Disposition (Customer Use)
[ ] Approved
[ ] Interim Approval (expiry: _______)
[ ] Rejected (reason: _______)

## Authorization
| Role | Signature | Date |
|------|-----------|------|
| Quality Manager | __________ | ________ |
| Customer Rep | __________ | ________ |
```

---

## Timing Plan Elements

### Standard Milestones

| Milestone | APQP Phase | Typical Timing |
|-----------|------------|----------------|
| Program Kick-Off | 1 | T-24 weeks |
| Design Release | 2 | T-18 weeks |
| Tooling Order | 2 | T-16 weeks |
| Process Design Complete | 3 | T-12 weeks |
| Tooling Receive | 3 | T-10 weeks |
| First Article | 3 | T-8 weeks |
| PPAP Run | 4 | T-6 weeks |
| PPAP Submission | 4 | T-4 weeks |
| Customer Approval | 4 | T-2 weeks |
| SOP (Start of Production) | 5 | T-0 |

### MNMUK Program Phases

| Phase | Duration | Key Activities |
|-------|----------|----------------|
| Quotation | 1-2 weeks | RFQ response, feasibility |
| Award | 1 week | PO receipt, kick-off |
| Planning | 2-3 weeks | APQP plan, team formation |
| Development | 4-8 weeks | Process design, tooling |
| Validation | 2-4 weeks | PPAP run, capability |
| Approval | 1-2 weeks | PPAP submission, PSW |
| Launch | 1-2 weeks | Production ramp-up |

---

## Open Issues Management

### Issue Categories

| Category | Description | Example |
|----------|-------------|---------|
| Design | Drawing/specification issues | GD&T clarification needed |
| Process | Manufacturing capability | Cpk below target |
| Tooling | Equipment/fixture issues | Tool modification required |
| Quality | Inspection/testing gaps | MSA fail, need new gage |
| Supply | Material/supplier issues | Long lead material |
| Commercial | Contract/pricing issues | Scope change |

### Issue Status

| Status | Definition | Action |
|--------|------------|--------|
| Open | Issue identified, not resolved | Assign owner, target date |
| In Progress | Work underway | Track to completion |
| Pending | Waiting on external input | Follow up required |
| Closed | Issue resolved | Document resolution |
| Escalated | Risk to timing/quality | Management attention |

### Issue Tracking Format

```markdown
## Open Issues Log

| # | Issue | Category | Owner | Target | Status | Notes |
|---|-------|----------|-------|--------|--------|-------|
| 1 | [Description] | [Cat] | [Name] | [Date] | [Status] | [Notes] |
```

---

## Phase Gate Review Meeting

### Agenda Format

1. **Program Status** (5 min)
   - Timeline status (Green/Yellow/Red)
   - Budget status
   - Customer communication

2. **Deliverable Review** (20 min)
   - Checklist walkthrough
   - Evidence of completion
   - Identify gaps

3. **Risk Review** (10 min)
   - Open issues summary
   - Top 3 risks
   - Mitigation status

4. **Gate Decision** (5 min)
   - Pass / Conditional Pass / Fail
   - Actions if conditional
   - Next gate schedule

### Gate Decision Criteria

| Decision | Criteria | Action |
|----------|----------|--------|
| **Pass** | All deliverables complete, no critical issues | Proceed to next phase |
| **Conditional Pass** | Minor items open, clear path to close | Proceed with tracking |
| **Fail** | Critical items incomplete, significant risk | Hold, develop recovery plan |

---

## IATF 16949 Alignment

APQP/PPAP is a core requirement of IATF 16949 (Clause 8.3 - Design and Development).

### MNMUK IATF 16949 Context

**Certification Target:** November 2027
**Current Status:** ISO 9001 Certified, upgrading to IATF 16949

**Reference Documentation:**
- Compliance Plan: `~/projects/work/docs/compliance/IATF16949_Compliance_Plan.md`
- Quality Manual: `~/projects/work/docs/work-instructions/QM-001_Quality_Manual.md`

### IATF Requirements Addressed by This Skill

| IATF Clause | Requirement | APQP/PPAP Coverage |
|-------------|-------------|-------------------|
| 8.3.2.1 | Design and development planning (APQP) | Full 5-phase APQP |
| 8.3.3.1 | Product design inputs | Phase 1 & 2 deliverables |
| 8.3.3.2 | Manufacturing process design inputs | Phase 3 deliverables |
| 8.3.4.1 | Design outputs (DFMEA, Control Plan) | Phase 2-4 outputs |
| 8.3.5.2 | Manufacturing process validation | Phase 4 validation |
| 8.3.6.1 | Design and development changes | Re-submission triggers |
| 9.1.1.1 | Process capability monitoring | PPAP Element 11 |

### Capability Requirements (per QM-001)

| Characteristic | Ppk Minimum | Notes |
|----------------|-------------|-------|
| Critical (CC) | ≥1.67 | Safety/regulatory impact |
| Significant (SC) | ≥1.33 | Fit/function impact |
| Standard | ≥1.00 | All other characteristics |

### PMO Governance

APQP programs at MNMUK are managed through the Programme Management Office (PMO):
- Monthly IATF Steering Committee reviews program status
- Phase gate reviews align with IATF documentation requirements
- Lessons learned feed into quality system continuous improvement

---

## Integration with Related Skills

### PFMEA
PFMEA is PPAP Element 6:
- Required for all PPAP levels
- Must be complete before Gate 3
- High RPN items must be addressed

**Load:** `read ~/.claude/skills/Pfmea/SKILL.md`

### Control Plan
Control Plan is PPAP Element 7:
- Pre-launch for Gate 3
- Production for Gate 4
- Must align with PFMEA

**Load:** `read ~/.claude/skills/Controlplan/SKILL.md`

### MSA
MSA is PPAP Element 8:
- Plan at Gate 3
- Results at Gate 4
- All gages must pass

**Load:** `read ~/.claude/skills/Msa/SKILL.md`

### SPC
Initial process studies are PPAP Element 11:
- Capability studies at Gate 4
- Cpk/Ppk targets must be met

**Load:** `read ~/.claude/skills/Spc/SKILL.md`

### Internal Audit
APQP program audit requirements:
- Phase gate reviews documented
- PPAP records auditable
- Process effectiveness verified

**Load:** `read ~/.claude/skills/Internalaudit/SKILL.md`

---

## Examples

**Example 1: Check PPAP readiness**
```
User: "What PPAP elements do I need for Level 3?"
→ Lists all 18 elements with Submit/Retain status
→ Highlights elements to submit
→ Notes MNMUK-specific considerations
```

**Example 2: Run phase gate review**
```
User: "Run Gate 3 checklist for the XYZ project"
→ Loads PhaseGate workflow
→ Walks through Phase 3 deliverables
→ Identifies gaps and assigns actions
```

**Example 3: Generate PSW**
```
User: "Create a PSW for part 12345"
→ Collects required information
→ Generates PSW document
→ Includes all declarations and checklists
```

**Example 4: Track program timing**
```
User: "What's the timeline for our new damper launch?"
→ Loads TimingPlan workflow
→ Creates milestone schedule
→ Identifies critical path items
```

---

## Supplementary Resources

For detailed guidance:
`read ~/.claude/skills/Apqpppap/CLAUDE.md`

For templates:
`ls ~/.claude/skills/Apqpppap/templates/`

For phase gate checklists:
`read ~/.claude/skills/Apqpppap/reference/gate-checklists.md`

For PPAP element forms:
`read ~/.claude/skills/Apqpppap/reference/ppap-forms.md`
