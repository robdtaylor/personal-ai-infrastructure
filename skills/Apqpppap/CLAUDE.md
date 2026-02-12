# APQP/PPAP - Extended Guidance

**Deep-dive content for complex APQP program management and PPAP submission scenarios.**

---

## Table of Contents

1. [APQP Team Structure](#apqp-team-structure)
2. [Phase Gate Deep Dive](#phase-gate-deep-dive)
3. [PPAP Element Details](#ppap-element-details)
4. [Significant Production Run Requirements](#significant-production-run-requirements)
5. [Process Capability Requirements](#process-capability-requirements)
6. [Customer-Specific Requirements](#customer-specific-requirements)
7. [Common PPAP Rejection Reasons](#common-ppap-rejection-reasons)
8. [Re-Submission Triggers](#re-submission-triggers)
9. [Interim Approval Management](#interim-approval-management)
10. [Record Retention](#record-retention)

---

## APQP Team Structure

### Core Team Roles

| Role | Responsibility | MNMUK Position |
|------|----------------|----------------|
| Program Manager | Overall timeline, resources, customer interface | AGM or designated PM |
| Quality Engineer | PPAP package, PFMEA, Control Plan, capability | Quality Engineer |
| Manufacturing Engineer | Process design, work instructions, tooling | Manufacturing Engineer |
| Production | Trial runs, operator feedback | Cell Leader |
| Purchasing | Supplier management, materials | Purchasing |
| Commercial | Customer requirements, contracts | Commercial Manager |

### Extended Team (As Needed)

| Role | When Involved |
|------|---------------|
| Design Engineer | If MNMUK has design responsibility |
| Maintenance | Equipment capability, PM requirements |
| Logistics | Packaging, shipping requirements |
| Finance | Cost tracking, investment approval |

### Meeting Cadence

| Meeting | Frequency | Duration | Attendees |
|---------|-----------|----------|-----------|
| Program Review | Weekly during active launch | 30 min | Core team |
| Gate Review | At each phase gate | 60 min | Core + Management |
| Customer Update | Bi-weekly or as required | 30 min | PM + Quality + Customer |
| Risk Review | Bi-weekly | 30 min | Core team |

---

## Phase Gate Deep Dive

### Gate 1: Program Approval

**Objective:** Confirm feasibility and commitment

**Detailed Checklist:**

| Item | Evidence Required | Responsible |
|------|-------------------|-------------|
| Customer requirements documented | Specification, drawing, CSR | Commercial |
| Feasibility assessment complete | Feasibility form signed | Engineering |
| Capacity analysis | Equipment, headcount analysis | Production |
| Cost estimate | Quote/cost breakdown | Commercial |
| Risk assessment | Initial risk register | Quality |
| Timing plan draft | Milestone schedule | PM |
| Resource plan | Team assignments | PM |
| Investment approval (if required) | CapEx approval | GM |
| Contract review | T&Cs reviewed | Commercial |
| Kick-off meeting held | Meeting minutes | PM |

**Red Flags at Gate 1:**
- Unclear specifications
- Unproven technology
- Capacity constraints not addressed
- Unrealistic timing
- Unfavorable contract terms

---

### Gate 2: Design Release

**Objective:** Confirm design is manufacturable

**Detailed Checklist:**

| Item | Evidence Required | Responsible |
|------|-------------------|-------------|
| Engineering drawings released | Controlled document | Engineering |
| DFM review complete | DFM feedback form | Mfg Eng |
| Special characteristics identified | SC list, customer agreement | Quality |
| Material specification confirmed | Material spec, IMDS if required | Engineering |
| Prototype parts produced | Part samples | Production |
| Prototype validation complete | Test results | Quality |
| DFMEA available (if applicable) | DFMEA document | Engineering |
| Tooling/equipment specified | Tool list, quotes | Mfg Eng |
| Supplier identification | Approved supplier list | Purchasing |
| Preliminary process concept | Process flow draft | Mfg Eng |

**Red Flags at Gate 2:**
- Frequent drawing changes
- DFM concerns not addressed
- SC agreement not reached
- Material availability issues
- Prototype failures

---

### Gate 3: Process Design Complete

**Objective:** Manufacturing process fully designed

**Detailed Checklist:**

| Item | Evidence Required | Responsible |
|------|-------------------|-------------|
| Process Flow Diagram | Signed PFD | Mfg Eng |
| PFMEA complete | PFMEA with RPN actions closed | Quality |
| Pre-launch Control Plan | Signed CP | Quality |
| Work instructions drafted | WI documents | Mfg Eng |
| Floor plan finalized | Layout drawing | Mfg Eng |
| Tooling received/qualified | First articles, gage trials | Mfg Eng |
| Equipment qualified | Equipment validation | Mfg Eng |
| MSA plan | MSA schedule | Quality |
| Training plan | Training matrix | HR/Production |
| Packaging spec approved | Pack spec, customer approval | Logistics |
| Supplier PPAP status | Supplier tracking | Purchasing |

**Red Flags at Gate 3:**
- High PFMEA RPNs unresolved
- Tooling delays
- Equipment issues
- Supplier PPAP at risk
- Training not scheduled

---

### Gate 4: Production Validated

**Objective:** Process capable and PPAP approved

**Detailed Checklist:**

| Item | Evidence Required | Responsible |
|------|-------------------|-------------|
| Significant production run complete | Run record, quantities | Production |
| MSA complete and acceptable | GR&R reports | Quality |
| Process capability demonstrated | Ppk/Cpk studies | Quality |
| All PPAP elements complete | PPAP package | Quality |
| PPAP submitted to customer | Submission record | Quality |
| Customer approval (PSW signed) | Signed PSW | Quality |
| Production Control Plan implemented | Signed CP at workstation | Quality |
| Operators trained and certified | Training records | HR |
| Production equipment validated | Equipment checklist | Mfg Eng |
| Lessons learned captured | Lessons learned form | PM |

**Red Flags at Gate 4:**
- Capability below target
- PPAP elements incomplete
- Customer concerns/rejects
- Operator training gaps
- Equipment reliability issues

---

## PPAP Element Details

### Element 9: Dimensional Results

**Sample Requirements:**
- Minimum 3 parts from significant production run
- Parts consecutively numbered
- All dimensions measured per drawing
- GD&T features fully evaluated

**Report Format:**
```
Part Number: [P/N]
Drawing Rev: [Rev]
Sample Size: [n] parts
Measurement Date: [Date]
Equipment: [CMM/Gage ID]

| Char | Nominal | Tol | Part 1 | Part 2 | Part 3 | Min | Max | Status |
|------|---------|-----|--------|--------|--------|-----|-----|--------|
| 1.1  | 25.00   | ±0.05 | 25.02 | 24.98 | 25.01 | 24.98 | 25.02 | PASS |
```

### Element 11: Initial Process Studies

**Data Requirements:**
- Minimum 30 consecutive parts
- Or 300 individual readings if SPC subgroups
- Calculated from significant production run
- Stable process (no special causes)

**Capability Indices:**

| Index | Formula | Use |
|-------|---------|-----|
| Pp | (USL-LSL)/(6σ) | Overall performance |
| Ppk | min[(USL-x̄)/(3σ), (x̄-LSL)/(3σ)] | Performance vs limits |
| Cp | (USL-LSL)/(6σ_within) | Potential capability |
| Cpk | min[(USL-x̄)/(3σ_within), (x̄-LSL)/(3σ_within)] | Capability vs limits |

**Acceptance Criteria:**

| Characteristic | Ppk/Cpk Minimum | Action if Below |
|----------------|-----------------|-----------------|
| Critical (CC) | ≥1.67 | 100% inspect, improve process |
| Significant (SC) | ≥1.33 | Enhanced control, improvement |
| Standard | ≥1.00 | Monitor, control plan adequate |

---

## Significant Production Run Requirements

### Definition

A significant production run is a production run that:
- Uses production tooling, equipment, and environment
- Uses production operators (trained)
- Runs at production rate
- Produces minimum required quantity

### Quantity Guidelines

| Customer/Situation | Minimum Quantity | Notes |
|--------------------|------------------|-------|
| AIAG Default | 300 pieces | Or 1-8 hours of production |
| Low Volume (<1000/year) | 30-50 pieces | Document justification |
| GM | 300 pieces | Or 1 production day |
| Ford | 300 pieces | Or production shift |
| Stellantis (FCA) | 300 pieces | Or 2 hours production |
| Prototype PPAP | As agreed | Typically 5-30 pieces |

### MNMUK Guidelines

| Annual Volume | Significant Run Qty | Rationale |
|---------------|---------------------|-----------|
| <100 pcs/year | 5-10 pieces | Very low volume |
| 100-500/year | 10-30 pieces | Low volume |
| 500-2000/year | 30-50 pieces | Moderate volume |
| >2000/year | 50-100 pieces | Higher volume |

**Always confirm with customer if not specified.**

---

## Process Capability Requirements

### Initial vs Ongoing

| Metric | Initial (PPAP) | Ongoing (Production) |
|--------|----------------|----------------------|
| Index Used | Ppk (performance) | Cpk (capability) |
| Sample Size | 30+ parts | Subgroups over time |
| Target CC | ≥1.67 | ≥1.67 |
| Target SC | ≥1.33 | ≥1.33 |
| Target Std | ≥1.00 | ≥1.00 |

### When Capability Cannot Be Met

**Option 1: 100% Inspection**
- Inspect every part
- Document on Control Plan
- Submit deviation request

**Option 2: Error-Proofing**
- Implement poka-yoke
- Prove effectiveness
- Document in PFMEA/CP

**Option 3: Process Improvement**
- Identify root cause
- Implement improvement
- Re-study capability

**Option 4: Interim Approval**
- Request interim from customer
- Define containment
- Improvement plan with timing

---

## Customer-Specific Requirements

### GM

- GPDS (Global Product Development System) milestones
- Supplier Quality Manual requirements
- BIQS (Built-In Quality Standards)
- GM1927 capability requirements
- Run@Rate verification

### Ford

- APQP Status Report (Phased PPAP)
- Q1 requirements
- CMMS (Concern Management)
- WERS (Warranty) interface
- Safe Launch requirements

### Stellantis (FCA)

- Quality Planning Sign-Off
- Supplier Quality Assurance Manual
- Mopar requirements if aftermarket
- Special process (CQI) audits

### JLR (Jaguar Land Rover)

- GPDS milestones
- Q-SIM (Supplier Improvement Manager)
- Launch Support Agreement
- Component Sign-Off process

### General OEM Requirements

Always check:
- Customer-specific PPAP forms
- Additional elements beyond 18
- Safe launch/containment requirements
- Capability targets (may exceed AIAG)
- Run@Rate requirements

---

## Common PPAP Rejection Reasons

### Documentation Issues

| Issue | Prevention |
|-------|------------|
| Wrong revision level | Verify drawing revision before submission |
| Missing signatures | Use checklist, verify before shipping |
| Incomplete forms | Use standard templates with all fields |
| Poor quality copies | Use digital submission where possible |
| Missing elements | Use checklist per submission level |

### Technical Issues

| Issue | Prevention |
|-------|------------|
| Dimensions out of spec | Layout all parts, verify before submission |
| Capability below target | Run capability study early, improve |
| MSA failure | Complete MSA before production run |
| PFMEA incomplete | Review against all operations |
| Control Plan gaps | Cross-reference to PFMEA, process flow |

### Process Issues

| Issue | Prevention |
|-------|------------|
| Not from production tooling | Verify tooling is production intent |
| Not at production rate | Time the run, document rate |
| Operators not trained | Complete training before run |
| Wrong material | Verify material certification matches spec |

---

## Re-Submission Triggers

### Mandatory Re-Submission

PPAP must be re-submitted when:

| Change | Level | Notes |
|--------|-------|-------|
| Engineering change | Full | Unless waived by customer |
| Material change | Full | New material certification |
| Supplier change (material) | Full | New material PPAP required |
| Process change | As agreed | Significant changes require full |
| Tooling change | As agreed | New tool = new PPAP typically |
| Location change | Full | Different manufacturing site |
| Corrective action | As required | Customer may request |
| After quality issue | As required | Based on severity |
| 12+ months inactive | Notify customer | May require re-validation |

### Notification Only (Possible)

Some changes may only require notification:
- Minor process parameter adjustment (within range)
- Tooling refurbishment (same tool)
- Equipment maintenance

**Always check customer-specific requirements.**

---

## Interim Approval Management

### When to Request

Interim approval is appropriate when:
- PPAP deadline approaching
- One or more elements not complete
- Clear plan to resolve
- Customer production need

### Interim Request Content

```markdown
## Interim Approval Request

**Part Number:** [P/N]
**Issue:** [What is not complete/compliant]
**Root Cause:** [Why it's not ready]
**Containment:** [How defects will be prevented]
**Resolution Plan:** [Actions to achieve full approval]
**Target Date:** [When full approval expected]

### Proposed Containment
- [ ] 100% inspection of [characteristic]
- [ ] Additional verification at [operation]
- [ ] Reduced lot sizes
- [ ] Customer notification of shipments

### Risk Assessment
- Production risk: [Low/Med/High]
- Quality risk: [Low/Med/High]
- Delivery risk: [Low/Med/High]

### Authorization Request
Requesting interim approval until [date] to allow continued supply while [issue] is resolved.
```

### Interim Tracking

| Part | Issue | Containment | Target | Status |
|------|-------|-------------|--------|--------|
| [P/N] | [Issue] | [Actions] | [Date] | [Status] |

---

## Record Retention

### PPAP Records

| Record | Retention Period | Location |
|--------|------------------|----------|
| PSW (approved) | Life of part + 1 year | Quality files |
| PPAP package | Life of part + 1 year | Quality files |
| Dimensional results | Life of part + 1 year | Quality files |
| Capability studies | Life of part + 1 year | Quality files |
| MSA records | Life of part + 1 year | Quality files |
| Master sample | Life of part or as required | Sample storage |

### APQP Records

| Record | Retention Period | Location |
|--------|------------------|----------|
| Gate review minutes | 3 years | Program files |
| Timing plans | Life of program | Program files |
| Open issues log | Life of program | Program files |
| Feasibility assessments | Life of part | Engineering files |
| Lessons learned | Permanent | Quality system |

### Customer-Specific

Always check customer requirements—some require longer retention:
- Automotive typically: Life of part + 1 year
- Some safety items: 15+ years
- Some OEMs: 25 years

---

## MNMUK-Specific Guidance

### Contract Manufacturing Considerations

As a contract manufacturer, MNMUK typically:
- Does NOT create DFMEA (customer responsibility)
- DOES create PFMEA (our process)
- May not have access to full design records
- Relies on customer for DVP&R results

### Typical PPAP Responsibilities

| Element | Responsibility | Notes |
|---------|----------------|-------|
| 1. Design Records | Customer provides | MNMUK maintains controlled copy |
| 2. ECN Documents | Customer provides | MNMUK incorporates |
| 3. Customer Eng Approval | Customer provides | If required |
| 4. DFMEA | Customer provides | May not be shared |
| 5. Process Flow | MNMUK creates | Full responsibility |
| 6. PFMEA | MNMUK creates | Full responsibility |
| 7. Control Plan | MNMUK creates | Full responsibility |
| 8. MSA | MNMUK performs | Full responsibility |
| 9. Dimensional | MNMUK performs | Full responsibility |
| 10. Material/Perf Tests | Mixed | Material certs MNMUK, perf tests may be customer |
| 11. Process Studies | MNMUK performs | Full responsibility |
| 12. Lab Documentation | MNMUK provides | If using external lab |
| 13. AAR | MNMUK/Customer | If appearance items |
| 14. Sample Parts | MNMUK provides | Full responsibility |
| 15. Master Sample | MNMUK retains | Full responsibility |
| 16. Checking Aids | MNMUK provides | If custom gages |
| 17. CSR | MNMUK complies | Per customer requirements |
| 18. PSW | MNMUK submits | Customer approves |

---

## Templates Reference

Templates available in `~/.claude/skills/Apqpppap/templates/`:

- `psw-template.md` - Part Submission Warrant
- `timing-plan-template.md` - Program timing plan
- `open-issues-template.md` - Issue tracking log
- `gate-review-template.md` - Gate review agenda/minutes
- `feasibility-template.md` - Feasibility assessment form
- `capability-report-template.md` - Initial process study report
