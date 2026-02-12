---
name: Commercialsales
description: Customer relationship and contract management for automotive manufacturing. Covers RFQ processing, contract review, customer requirements management, order handling, customer communication, complaint escalation, and satisfaction monitoring per IATF 16949 requirements. USE WHEN user says 'RFQ', 'quotation', 'contract review', 'customer requirements', 'CSR', 'customer complaint', 'customer satisfaction', 'order management', or 'customer communication'. Integrates with QuoteEstimator, Apqpppap, and EightD skills.
---

# CommercialSales - Customer & Contract Management

## When to Activate This Skill
- "Process this RFQ"
- "Review contract terms for [customer]"
- "What are the customer requirements?"
- "Handle customer complaint from [customer]"
- "What's our customer satisfaction status?"
- "Manage CSRs for [customer]"
- "Process customer order"
- "Customer communication template"

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **RfqProcess** | "RFQ", "enquiry", "new quote request" | `Workflows/RfqProcess.md` |
| **ContractReview** | "contract review", "terms review" | `Workflows/ContractReview.md` |
| **CustomerRequirements** | "customer requirements", "CSR" | `Workflows/CustomerRequirements.md` |
| **ComplaintEscalation** | "customer complaint", "escalate issue" | `Workflows/ComplaintEscalation.md` |

---

## IATF 16949 Compliance Overview

This skill addresses key IATF 16949 clauses for commercial operations:

| IATF Clause | Requirement | Coverage |
|-------------|-------------|----------|
| 8.2.1.1 | Customer Communication (supplemental) | Communication protocols |
| 8.2.2.1 | Determination of Requirements (supplemental) | Requirements capture |
| 8.2.3.1.1 | Review of Requirements (supplemental) | Contract review |
| 8.2.3.1.2 | Customer-Designated Special Characteristics | SC identification |
| 8.2.3.1.3 | Organization Manufacturing Feasibility | Feasibility assessment |
| 8.7.1.6 | Customer Notification | Nonconformance notification |
| 9.1.2.1 | Customer Satisfaction (supplemental) | Satisfaction monitoring |
| 10.2.5 | Warranty Management | Warranty analysis |
| 10.2.6 | Customer Complaints & Field Failure | Complaint handling |

**Reference:** `~/projects/work/docs/compliance/IATF16949_Compliance_Plan.md`

---

## RFQ Processing

### Enquiry Receipt and Registration

**Sources of Enquiries:**
- Email (direct customer contact)
- Customer portals (Covisint, SupplyOn, etc.)
- Phone enquiries (documented immediately)
- RFI (Request for Information) - preliminary

**Registration Requirements:**
| Field | Description | Example |
|-------|-------------|---------|
| Enquiry ID | Unique identifier | ENQ-2026-0042 |
| Customer | Customer name | Jaguar Land Rover |
| Part Description | Brief description | Suspension link bracket |
| Drawing Number | If provided | JLR-12345-A |
| Quantity | Annual volume | 5,000 pcs/year |
| Target Price | Customer target (if stated) | £15.00/part |
| Target SOP | Required start date | Q3 2027 |
| Response Due | Quote deadline | 15-Feb-2026 |

### Multi-Functional Review

Before quoting, involve all relevant functions:

| Function | Review Focus | Sign-off |
|----------|--------------|----------|
| Manufacturing Engineering | Technical feasibility, process capability | ☐ |
| Production | Capacity, equipment availability | ☐ |
| Quality | Quality requirements, special characteristics | ☐ |
| Supply Chain | Material availability, lead times | ☐ |
| Commercial | Pricing, terms, margin | ☐ |

### Feasibility Assessment

**IATF 8.2.3.1.3 Requirement:** Manufacturing feasibility must be assessed before commitment.

**Feasibility Responses:**
| Response | Meaning | Action |
|----------|---------|--------|
| Feasible | Can meet all requirements | Proceed to quote |
| Conditionally Feasible | Can meet with noted exceptions | Document exceptions, customer agreement required |
| Not Feasible | Cannot meet requirements | Decline or propose alternatives |

**Feasibility Checklist:**
- [ ] Dimensional capability (tolerances within equipment capability)
- [ ] Material availability (standard stock or special order)
- [ ] Capacity availability (equipment time, headcount)
- [ ] Tooling requirements (standard or special)
- [ ] Surface finish requirements (achievable with process)
- [ ] Special processes (heat treat, plating - supplier capability)
- [ ] Quality requirements (Cpk targets achievable)
- [ ] Timing requirements (lead time realistic)

### Quotation Preparation

**Quote Components:**
1. **Material Cost** - Weight × £/kg × waste factor (1.3-1.5)
2. **Labor Cost** - Cycle time × hourly rate × quantity
3. **Setup Cost** - Setup time × rate ÷ batch quantity
4. **Overhead** - Applied per company formula
5. **Margin** - Typically 25-40% depending on risk
6. **Tooling** - If customer-funded, separate line item

**For detailed costing, use:** `load QuoteEstimator skill`

**Quote Validity:** Standard 30 days unless otherwise stated

---

## Contract Review (IATF 8.2.3)

### Contract Review Checklist

**IATF 8.2.3.1.1 requires review of:**

| Category | Review Items | Reviewer |
|----------|--------------|----------|
| **Technical** | Drawings current, tolerances achievable, GD&T understood | Engineering |
| **Quality** | Cpk targets, special characteristics, PPAP level | Quality |
| **Capacity** | Volume achievable, equipment available, lead time OK | Production |
| **Timing** | SOP date realistic, PPAP timeline achievable | PMO |
| **Commercial** | Price acceptable, payment terms, liability | Commercial |
| **Packaging** | Pack spec available, customer-specific requirements | Logistics |
| **Regulatory** | REACH, RoHS, IMDS requirements | Quality |

### Terms and Conditions Review

**Standard Terms to Verify:**

| Term | MNMUK Position | Risk if Unfavorable |
|------|----------------|---------------------|
| Payment terms | Net 30-60 preferred | Cash flow impact |
| Liability cap | Limited to order value | Unlimited exposure |
| Warranty period | 12-24 months | Extended liability |
| Tooling ownership | Customer-owned if funded | Asset retention |
| IP/Confidentiality | Reasonable scope | Business restriction |
| Termination | Reasonable notice | Stranded inventory |
| Price adjustments | Annual review clause | Material cost exposure |
| Quality chargebacks | Capped, root cause based | Unreasonable deductions |

### Special Characteristics Agreement

**IATF 8.2.3.1.2 Requirement:** Customer-designated special characteristics must be agreed.

**Special Characteristic Types:**
| Symbol | Type | Definition | Control Requirement |
|--------|------|------------|---------------------|
| CC | Critical | Safety/regulatory impact | Cpk ≥1.67, 100% or SPC |
| SC | Significant | Fit/function impact | Cpk ≥1.33, SPC recommended |
| S | Safety | Safety-related | Enhanced controls |

**Agreement Process:**
1. Identify all CC/SC from customer drawing
2. Confirm capability to meet enhanced requirements
3. Document in Control Plan and PFMEA
4. Obtain customer sign-off on classification

### Contract Award Acceptance

**Decision Authority:**
| Contract Value | Approval Authority |
|----------------|-------------------|
| <£10,000 annual | Commercial Manager |
| £10,000 - £50,000 | AGM |
| >£50,000 | General Manager |

---

## Customer Requirements Management

### Sources of Customer Requirements

| Source | Content | Where Documented |
|--------|---------|------------------|
| Engineering Drawings | Dimensions, tolerances, GD&T | Drawing register |
| Specifications | Material, performance, test | Spec register |
| Purchase Orders | Quantity, delivery, price | ERP system |
| Quality Agreements | Quality expectations, targets | QA file |
| CSR Documents | Customer-specific requirements | CSR register |
| Industry Standards | ISO, ASTM, SAE requirements | Referenced in specs |

### Customer-Specific Requirements (CSRs)

**Common CSR Categories:**

| Category | Examples |
|----------|----------|
| APQP/Timing | Phase gate requirements, milestone dates |
| PPAP | Submission level, additional elements |
| Quality Targets | PPM targets, Cpk requirements |
| Labeling | Label format, barcode requirements |
| Packaging | Specific containers, dunnage, quantities |
| Shipping | Carrier requirements, ASN, routing |
| Systems | EDI, portal, supplier scorecards |
| Traceability | Lot traceability, serialization |
| Documentation | Retention periods, format requirements |

### CSR Register

Maintain a register of all customer-specific requirements:

```markdown
# Customer-Specific Requirements Register

**Customer:** [Name]
**Last Updated:** [Date]

| # | Requirement | Source | Responsibility | Compliance Status |
|---|-------------|--------|----------------|-------------------|
| 1 | PPAP Level 3 required | Quality Manual | Quality | Compliant |
| 2 | ASN via EDI 856 | Logistics Manual | Supply Chain | Compliant |
| 3 | 2D barcode on label | Pack Spec | Logistics | Compliant |
| 4 | Cpk ≥1.67 for CC | SQM | Quality | Compliant |
```

### Requirements Flowdown

Requirements must flow through the product realization process:

```
Customer Requirements
        ↓
   Contract Review → Feasibility confirmed
        ↓
   APQP Planning → Requirements in timing plan
        ↓
   PFMEA → Failure modes address requirements
        ↓
   Control Plan → Controls ensure requirements met
        ↓
   Work Instructions → Operators know requirements
        ↓
   Inspection → Verification requirements met
        ↓
   PPAP → Evidence of compliance submitted
```

---

## Customer Order Management

### Order Receipt

**Order Channels:**
- EDI (Electronic Data Interchange)
- Customer portal download
- Email/fax (manual entry)
- Phone (immediate documentation required)

### Order Review Checklist

| Check | Verification | Action if Issue |
|-------|--------------|-----------------|
| Part number correct | Match to master data | Query customer |
| Revision current | Match to latest drawing | Clarify before proceed |
| Quantity feasible | Check capacity/inventory | Propose alternative |
| Delivery date achievable | Check lead time | Negotiate if needed |
| Price matches quote | Compare to contract | Resolve before confirm |
| Packaging specified | Check pack spec | Confirm with customer |
| Special requirements | Check for deviations | Document and agree |

### Order Acknowledgment

**Response Time:** Within 24 hours

**Acknowledgment Content:**
- Customer order number
- MNMUK order/reference number
- Part number and revision
- Quantity confirmed
- Delivery date confirmed
- Price confirmed
- Any deviations noted

### Lead Time Guidelines

| Scenario | Typical Lead Time |
|----------|-------------------|
| Stock item | 2-3 days |
| Made to order (materials available) | 1-2 weeks |
| Made to order (materials required) | 3-4 weeks |
| New part (tooling/setup required) | 6-12 weeks |
| Complex/new development | 12-24 weeks |

### Order Changes

**Change Management:**
1. Log change request with timestamp
2. Assess feasibility within 24 hours
3. Calculate cost impact (if any)
4. Obtain internal approval
5. Confirm change to customer
6. Update system records

---

## Customer Communication (IATF 8.2.1.1)

### Communication Types

| Type | Trigger | Responsibility | Timeline |
|------|---------|----------------|----------|
| **Proactive** | Status updates, scorecards | Commercial | Scheduled |
| **Reactive** | Customer queries | Commercial | Within 24 hrs |
| **Issue Notification** | Quality/delivery problem | Quality/Logistics | Immediate |
| **PPAP Submission** | Part approval required | Quality | Per timing |

### Customer Notification Requirements

**IATF 8.7.1.6 - Nonconformance Notification:**

Customers must be notified when:
- Nonconforming product has been shipped
- Product does not meet specification
- Suspect product may have been delivered

**Notification Content:**
- Part number and description
- Quantity affected
- Date range of shipments
- Nature of nonconformance
- Containment actions taken
- Investigation status
- Contact for questions

### Communication Templates

**Quality Issue Notification:**
```markdown
Subject: Quality Notification - [Part Number] - [Brief Description]

Dear [Customer Contact],

We are writing to inform you of a quality issue affecting [Part Number].

**Issue Summary:**
- Part Number: [P/N]
- Description: [Issue description]
- Quantity Potentially Affected: [Qty]
- Shipment Dates: [Date range]

**Containment Actions:**
- [Action 1]
- [Action 2]

**Next Steps:**
- [Investigation timeline]
- [Expected resolution]

We apologize for any inconvenience and will provide updates as our investigation progresses.

Please contact [Name] at [Phone/Email] with any questions.

Regards,
[Name]
Quality Manager
Multimatic Niche Manufacturing UK
```

---

## Customer Satisfaction Monitoring (IATF 9.1.2.1)

### Satisfaction Indicators

| Indicator | Metric | Target | Frequency |
|-----------|--------|--------|-----------|
| Delivered Part Quality | Customer PPM | <50 PPM | Monthly |
| Customer Disruptions | Line stops, holds | 0 | Per event |
| Delivery Performance | On-Time Delivery | >98% | Weekly |
| Premium Freight | Incidents | 0 | Monthly |
| Customer Complaints | Count | Reducing trend | Monthly |
| Customer Scorecard | Rating | Green/Preferred | Quarterly |

### Customer Scorecard Review

**Monthly Actions:**
1. Download scorecards from customer portals
2. Review metrics vs. targets
3. Identify any Red/Yellow items
4. Initiate corrective actions for issues
5. Report to management review

**Scorecard Response:**
| Rating | Status | Action Required |
|--------|--------|-----------------|
| Green/Preferred | Meeting expectations | Maintain performance |
| Yellow/Conditional | Marginal performance | Improvement plan |
| Red/New Business Hold | Poor performance | Immediate escalation |

### Customer Feedback Channels

| Channel | Type | Response Requirement |
|---------|------|----------------------|
| Customer portal | Formal | Per portal SLA |
| Email complaint | Semi-formal | 24-hour acknowledgment |
| Phone call | Informal | Document and follow up |
| Site visit feedback | Formal | Action log required |
| Survey response | Formal | Management review |

---

## Customer Complaint Handling

### Complaint vs. Technical Issue

| Type | Ownership | Process |
|------|-----------|---------|
| **Customer Complaint** | Commercial (escalation owner) | This skill |
| **Technical Investigation** | Quality (8D owner) | EightD skill |

Commercial manages the customer relationship; Quality manages the technical investigation.

### Complaint Escalation Process

**Step 1: Receipt and Acknowledgment**
- Log complaint immediately
- Acknowledge to customer within 4 hours
- Assign internal owner

**Step 2: Initial Assessment**
- Classify severity (Critical/Major/Minor)
- Determine if 8D required
- Identify containment needs

**Step 3: Customer Communication Plan**
| Severity | Update Frequency | Escalation Level |
|----------|------------------|------------------|
| Critical | Daily | GM + Customer leadership |
| Major | Every 2-3 days | Commercial Manager |
| Minor | Weekly | Commercial team |

**Step 4: Resolution Tracking**
- Monitor 8D progress (if applicable)
- Communicate milestones to customer
- Confirm customer satisfaction with resolution

**Step 5: Closure**
- Obtain customer acceptance
- Document lessons learned
- Update PFMEA/Control Plan if needed
- Close complaint record

### Complaint Metrics

| Metric | Calculation | Target |
|--------|-------------|--------|
| Response Time | Time to acknowledge | <4 hours |
| Resolution Time | Time to close | <30 days (standard) |
| Repeat Complaints | Same issue recurrence | 0 |
| Customer Satisfaction | Closure rating | ≥4/5 |

---

## Warranty Management (IATF 10.2.5)

### Warranty Analysis Requirements

When warranty returns occur:
1. Log return with all available data
2. Conduct failure analysis (including NTF)
3. Link to 8D if actionable cause found
4. Track warranty costs
5. Report trends to management

### NTF (No Trouble Found) Analysis

**IATF Requirement:** Analyze warranty returns even when no defect found.

| NTF Category | Possible Cause | Action |
|--------------|----------------|--------|
| Application error | Customer installation | Improve installation instructions |
| Misdiagnosis | Field diagnosis error | Training for service techs |
| Intermittent | Condition-dependent failure | Enhanced testing |
| Specification gap | Works but doesn't meet expectation | Specification review |

---

## Integration with Related Skills

### QuoteEstimator
For technical costing during RFQ:
- Cycle time estimation
- Material cost calculation
- Machine rate application

**Load:** `read ~/.claude/skills/Quoteestimator/SKILL.md`

### Apqpppap
For program management post-award:
- APQP phase gates
- PPAP submission
- Customer approval

**Load:** `read ~/.claude/skills/Apqpppap/SKILL.md`

### EightD
For technical problem solving on complaints:
- Root cause analysis
- Corrective action
- Verification

**Load:** `read ~/.claude/skills/Eightd/SKILL.md`

### SupplyChain
For supplier-related customer issues:
- Material nonconformance
- Supplier development
- Sub-tier management

**Load:** `read ~/.claude/skills/Supplychain/SKILL.md`

---

## Key Documents Reference

| Document | Purpose | Location |
|----------|---------|----------|
| PMOP-004 | Customer Requirements Management | QMS |
| SCP-007 | Customer Order Management | QMS |
| QP-008 | Customer Complaints (8D) | QMS |
| F-COM-001 | Customer Enquiry Log | Forms |
| F-COM-002 | Quotation Template | Forms |
| F-COM-003 | Contract Review Checklist | Forms |
| F-COM-004 | CSR Register | Forms |

---

## Examples

**Example 1: Process new RFQ**
```
User: "We received an RFQ from JLR for a suspension bracket"
→ Loads RfqProcess workflow
→ Walks through registration, feasibility, quotation
→ Generates quote package
```

**Example 2: Contract review**
```
User: "Review the contract terms for the new BMW order"
→ Loads ContractReview workflow
→ Checks technical, quality, commercial requirements
→ Identifies risks and required clarifications
```

**Example 3: Customer complaint**
```
User: "Customer complaint from Ford about dimensional issue"
→ Loads ComplaintEscalation workflow
→ Registers complaint, classifies severity
→ Links to 8D for technical investigation
→ Sets up communication cadence
```

**Example 4: CSR management**
```
User: "What are JLR's customer-specific requirements?"
→ Loads CustomerRequirements workflow
→ Returns CSR register for JLR
→ Highlights any compliance gaps
```

---

## Supplementary Resources

For detailed guidance:
`read ~/.claude/skills/Commercialsales/CLAUDE.md`

For templates:
`ls ~/.claude/skills/Commercialsales/templates/`

For contract review checklist:
`read ~/.claude/skills/Commercialsales/reference/contract-review.md`

For customer portal guides:
`read ~/.claude/skills/Commercialsales/reference/customer-portals.md`
