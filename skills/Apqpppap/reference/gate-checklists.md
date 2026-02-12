# APQP Phase Gate Checklists

**Detailed checklists for each APQP phase gate review.**

---

## Gate 1: Program Approval

### Prerequisites
- [ ] Customer RFQ or order received
- [ ] Initial feasibility discussed

### Deliverables Checklist

| # | Item | Evidence Required | Owner | Status |
|---|------|-------------------|-------|--------|
| 1.1 | Customer requirements documented | Spec sheet, drawing, CSR | Commercial | |
| 1.2 | Feasibility assessment | Signed feasibility form | Mfg Eng | |
| 1.3 | Capacity analysis | Capacity calculation | Production | |
| 1.4 | Preliminary BOM | BOM draft | Engineering | |
| 1.5 | Cost estimate approved | Quotation/cost model | Commercial | |
| 1.6 | Risk assessment | Risk register (initial) | Quality | |
| 1.7 | Timing plan | Milestone schedule | PM | |
| 1.8 | Resource plan | Team assignments | PM | |
| 1.9 | Investment approval | CapEx form (if required) | GM | |
| 1.10 | Contract terms reviewed | Contract review form | Commercial | |
| 1.11 | Kick-off meeting held | Meeting minutes | PM | |
| 1.12 | Special characteristics (preliminary) | SC list draft | Quality | |

### Gate 1 Decision

| Status | Criteria |
|--------|----------|
| PASS | All items complete, no critical risks |
| CONDITIONAL | Minor items open, clear plan to close |
| FAIL | Significant gaps, feasibility concerns |

---

## Gate 2: Design Release

### Prerequisites
- [ ] Gate 1 passed
- [ ] Design concept agreed with customer

### Deliverables Checklist

| # | Item | Evidence Required | Owner | Status |
|---|------|-------------------|-------|--------|
| 2.1 | Engineering drawings released | Controlled drawing (signed) | Engineering | |
| 2.2 | GD&T complete | Drawing with GD&T applied | Engineering | |
| 2.3 | Material specification | Material spec document | Engineering | |
| 2.4 | DFM review complete | DFM feedback form | Mfg Eng | |
| 2.5 | DFM concerns addressed | Response to DFM issues | Engineering | |
| 2.6 | Special characteristics finalized | SC list (customer agreed) | Quality | |
| 2.7 | DFMEA available | DFMEA document | Engineering* | |
| 2.8 | Prototype parts produced | Sample parts | Production | |
| 2.9 | Prototype validation complete | Test results | Quality | |
| 2.10 | Tooling/equipment specified | Tool list, specifications | Mfg Eng | |
| 2.11 | Supplier identification | Approved supplier list | Purchasing | |
| 2.12 | Preliminary process concept | Process flow draft | Mfg Eng | |

*DFMEA may be customer responsibility for contract manufacturing

### Gate 2 Decision

| Status | Criteria |
|--------|----------|
| PASS | Design released, DFM complete, prototypes validated |
| CONDITIONAL | Minor design clarifications pending |
| FAIL | Significant design issues, prototype failures |

---

## Gate 3: Process Design Complete

### Prerequisites
- [ ] Gate 2 passed
- [ ] Design frozen

### Deliverables Checklist

| # | Item | Evidence Required | Owner | Status |
|---|------|-------------------|-------|--------|
| 3.1 | Process Flow Diagram | Signed PFD | Mfg Eng | |
| 3.2 | Floor plan layout | Layout drawing | Mfg Eng | |
| 3.3 | Characteristics matrix | Char matrix linking to ops | Quality | |
| 3.4 | PFMEA complete | PFMEA document | Quality | |
| 3.5 | High RPN actions closed | Action log (closed items) | Quality | |
| 3.6 | Pre-launch Control Plan | Signed CP | Quality | |
| 3.7 | Work instructions drafted | WI documents | Mfg Eng | |
| 3.8 | Tooling received | Tool receipt record | Mfg Eng | |
| 3.9 | Tooling qualified | First article results | Quality | |
| 3.10 | Equipment qualified | Equipment validation | Mfg Eng | |
| 3.11 | MSA plan | MSA schedule | Quality | |
| 3.12 | Training plan | Training matrix | HR | |
| 3.13 | Packaging spec approved | Pack spec (signed) | Logistics | |
| 3.14 | Supplier PPAP status | Supplier tracking log | Purchasing | |

### Gate 3 Decision

| Status | Criteria |
|--------|----------|
| PASS | Process fully designed, tooling qualified |
| CONDITIONAL | Minor tooling adjustments, training in progress |
| FAIL | Major process issues, tooling delays |

---

## Gate 4: Production Validated

### Prerequisites
- [ ] Gate 3 passed
- [ ] All tooling and equipment available

### Deliverables Checklist

| # | Item | Evidence Required | Owner | Status |
|---|------|-------------------|-------|--------|
| 4.1 | Significant production run complete | Run record, quantity | Production | |
| 4.2 | MSA complete | GR&R reports (all gages) | Quality | |
| 4.3 | MSA acceptable | All GR&R <10% (CC) or <30% (SC) | Quality | |
| 4.4 | Ppk studies complete | Capability reports | Quality | |
| 4.5 | Ppk acceptable | ≥1.67 (CC), ≥1.33 (SC) | Quality | |
| 4.6 | Dimensional results | Layout reports (all parts) | Quality | |
| 4.7 | Material certifications | Certs for production run | Quality | |
| 4.8 | PPAP package complete | All elements per level | Quality | |
| 4.9 | PPAP submitted | Submission record | Quality | |
| 4.10 | Customer approval (PSW) | Signed PSW | Quality | |
| 4.11 | Production Control Plan | Signed CP (production) | Quality | |
| 4.12 | Control Plan at workstation | Verified at point of use | Quality | |
| 4.13 | Operators trained | Training records | HR | |
| 4.14 | Work instructions finalized | WI at workstation | Mfg Eng | |
| 4.15 | Lessons learned captured | Lessons learned form | PM | |

### Gate 4 Decision

| Status | Criteria |
|--------|----------|
| PASS | Customer approved, capable, ready for production |
| CONDITIONAL | Interim approval with containment |
| FAIL | PPAP rejected, capability not achieved |

---

## Gate 5: Production Sustained (Ongoing)

### Prerequisites
- [ ] Gate 4 passed
- [ ] Production released

### Ongoing Requirements Checklist

| # | Item | Evidence Required | Frequency | Owner |
|---|------|-------------------|-----------|-------|
| 5.1 | Customer complaints tracked | Complaint log | Per event | Quality |
| 5.2 | Complaints resolved | 8D reports | Per event | Quality |
| 5.3 | Process capability maintained | SPC charts | Ongoing | Quality |
| 5.4 | OTD performance monitored | Delivery metrics | Weekly | Logistics |
| 5.5 | Control Plan current | Revision control | As needed | Quality |
| 5.6 | PFMEA updated | Revision log | As needed | Quality |
| 5.7 | Lessons learned shared | Lessons database | Per program | PM |
| 5.8 | Continuous improvement | CI project list | Ongoing | All |
| 5.9 | Annual PPAP review | Review record | Annual | Quality |

---

## IATF 16949 Documentation Requirements

Each gate review generates evidence for IATF compliance:

| Gate | IATF Clause | Documentation |
|------|-------------|---------------|
| 1 | 8.3.2.1 | APQP plan, timing, resources |
| 2 | 8.3.3.1 | Design inputs, requirements |
| 3 | 8.3.3.2 | Process design inputs, PFMEA |
| 4 | 8.3.5.2 | Validation results, capability |
| 5 | 9.1.1.1 | Ongoing capability, monitoring |

**Retention:** All gate review records retained for life of part + 1 year per QM-001.

---

## Gate Review Meeting Template

```markdown
# APQP Gate [X] Review

**Program:** [Name]
**Part Number:** [P/N]
**Customer:** [Customer]
**Date:** [Date]
**Attendees:** [List]

## 1. Program Status (5 min)
- Timeline: [GREEN/YELLOW/RED]
- Budget: [On track / Over / Under]
- Customer communication: [Last contact, issues]

## 2. Checklist Review (20 min)
[Walk through checklist items]

| Item | Status | Notes |
|------|--------|-------|
| [Item] | Complete/Open/NA | [Notes] |

## 3. Risk Review (10 min)
### Top 3 Risks
1. [Risk] - Mitigation: [Action]
2. [Risk] - Mitigation: [Action]
3. [Risk] - Mitigation: [Action]

### Open Issues Summary
- Total open: [#]
- Critical: [#]
- Target closures: [List]

## 4. Gate Decision (5 min)

**Decision:** [ ] PASS  [ ] CONDITIONAL  [ ] FAIL

**Conditions (if applicable):**
- [ ] [Condition 1] - Owner: [Name] - Due: [Date]
- [ ] [Condition 2] - Owner: [Name] - Due: [Date]

**Next Gate:** Gate [X+1] - Target: [Date]

## Approvals

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Program Manager | | | |
| Quality Manager | | | |
| Manufacturing Manager | | | |
| General Manager* | | | |

*GM approval required for Gate 1 and Gate 4
```
