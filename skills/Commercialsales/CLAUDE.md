# CommercialSales - Extended Guidance

**Deep-dive content for complex commercial scenarios and customer management.**

---

## Table of Contents

1. [Customer Relationship Tiers](#customer-relationship-tiers)
2. [Advanced Contract Negotiation](#advanced-contract-negotiation)
3. [Customer Portal Management](#customer-portal-management)
4. [Scorecard Recovery Plans](#scorecard-recovery-plans)
5. [Escalation Matrix](#escalation-matrix)
6. [Commercial Risk Management](#commercial-risk-management)
7. [Customer Audit Preparation](#customer-audit-preparation)
8. [Premium Freight Management](#premium-freight-management)

---

## Customer Relationship Tiers

### Customer Classification

| Tier | Criteria | Relationship Owner | Review Frequency |
|------|----------|-------------------|------------------|
| **Strategic** | >£500k/year, growth potential | General Manager | Quarterly |
| **Key** | £100k-500k/year | Commercial Manager | Monthly |
| **Standard** | <£100k/year | Commercial Team | As needed |
| **Development** | New, high potential | Commercial Manager | Monthly |

### Tier-Based Service Levels

| Service Element | Strategic | Key | Standard |
|-----------------|-----------|-----|----------|
| Dedicated contact | Named account manager | Commercial team | Shared |
| Response time | 4 hours | 8 hours | 24 hours |
| Issue escalation | Immediate GM visibility | AGM review | Manager review |
| Business reviews | Quarterly | Semi-annual | Annual |
| Capacity priority | First allocation | Standard | As available |

---

## Advanced Contract Negotiation

### Automotive Contract Structures

| Contract Type | Characteristics | Risk Level |
|---------------|-----------------|------------|
| **LTA (Long-Term Agreement)** | Multi-year, volume commitment | Medium |
| **Blanket PO** | Annual, releases by schedule | Low |
| **Spot Order** | One-time, specific quantity | Variable |
| **Development Contract** | NRE, prototype, tooling | High |

### Negotiation Points by Customer Type

**OEM Direct:**
- Standard terms typically non-negotiable
- Focus on capacity commitments
- Negotiate tooling payment terms
- Clarify change order process

**Tier 1 Supplier:**
- More flexibility on terms
- Negotiate liability caps
- Push back on flow-down clauses
- Clarify sub-tier requirements

### High-Risk Contract Terms

| Term | Risk | Mitigation |
|------|------|------------|
| **Unlimited liability** | Catastrophic exposure | Cap at annual volume value |
| **Lifetime warranty** | Extended obligation | Define specific period |
| **Price reduction clauses** | Margin erosion | Tie to volume increases |
| **Immediate termination** | Stranded costs | Require notice period, cost recovery |
| **Exclusive supply** | Customer dependency | Limit to specific programs |
| **Flow-down to sub-tiers** | Uncontrollable risk | Limit to reasonable terms |

### Change Order Management

**Engineering Changes:**
1. Receive ECN from customer
2. Assess cost/timing impact within 5 days
3. Submit quote for additional costs
4. Negotiate and agree
5. Implement only after approval
6. Track recovery of one-time costs

**Commercial Changes:**
| Change Type | Response Required |
|-------------|-------------------|
| Volume increase | Capacity confirmation, pricing review |
| Volume decrease | Cost impact assessment, inventory exposure |
| Timing change | Schedule impact, premium costs if expedited |
| Scope change | Full re-quote, feasibility review |

---

## Customer Portal Management

### Common Automotive Portals

| Portal | Primary Users | Key Functions |
|--------|---------------|---------------|
| **Covisint** | GM, Ford, Stellantis | Orders, ASN, scorecards |
| **SupplyOn** | BMW, VW Group | Orders, quality, invoicing |
| **Ariba** | Multiple | Procurement, invoicing |
| **IATF GlobalOversite** | All IATF | Certification lookup |
| **IMDS** | All OEMs | Material data submission |

### Portal Best Practices

1. **Access Management**
   - Document all portal credentials
   - Assign backup users
   - Regular access review (quarterly)
   - Immediate revocation for leavers

2. **Daily Checks**
   - New orders/releases
   - Schedule changes
   - Quality notifications
   - Scorecard updates

3. **Response Deadlines**
   - Order acknowledgment: 24 hours
   - RFQ response: Per stated deadline
   - Quality response: Per severity (4-48 hours)
   - Scorecard disputes: Within review window

### ASN (Advance Shipping Notice)

**IATF Requirement:** Many customers require EDI 856 ASN.

| ASN Element | Requirement |
|-------------|-------------|
| Ship date/time | Actual departure |
| Carrier | PRO number, carrier code |
| Quantities | By line item |
| Container ID | License plate/SSCC |
| PO reference | Customer PO number |

**ASN Timing:** Must be sent before or at shipment, never after delivery.

---

## Scorecard Recovery Plans

### Scorecard Red Flag Response

**Immediate Actions (Within 24 Hours):**
1. Acknowledge issue to customer
2. Escalate internally to GM
3. Assign recovery owner
4. Begin root cause analysis

**Week 1:**
1. Complete containment actions
2. Identify root causes
3. Draft improvement plan
4. Schedule customer call

**Week 2-4:**
1. Implement corrective actions
2. Provide weekly updates
3. Demonstrate improvement
4. Request scorecard review

### Recovery Plan Template

```markdown
# Customer Scorecard Recovery Plan

**Customer:** [Name]
**Current Status:** [Red/Yellow]
**Issue Date:** [Date]
**Target Recovery:** [Date]

## Current Performance

| Metric | Target | Current | Gap |
|--------|--------|---------|-----|
| Quality PPM | <50 | 250 | -200 |
| OTD | >98% | 85% | -13% |

## Root Cause Analysis

| Issue | Root Cause | Evidence |
|-------|------------|----------|
| [Issue 1] | [Cause] | [Data] |
| [Issue 2] | [Cause] | [Data] |

## Corrective Actions

| # | Action | Owner | Due | Status |
|---|--------|-------|-----|--------|
| 1 | [Action] | [Name] | [Date] | [Status] |
| 2 | [Action] | [Name] | [Date] | [Status] |

## Milestones

| Week | Target | Measure |
|------|--------|---------|
| 1 | Containment complete | Zero escapes |
| 2 | Actions implemented | All complete |
| 4 | Performance improved | Within 20% of target |
| 8 | Target achieved | Green status |

## Communication Plan

| Frequency | Audience | Format |
|-----------|----------|--------|
| Daily (Week 1) | Customer SQE | Email update |
| Weekly (Weeks 2-4) | Customer quality | Call + report |
| Bi-weekly (ongoing) | Customer purchasing | Status report |
```

---

## Escalation Matrix

### Internal Escalation

| Severity | Initial Contact | 4-Hour Escalation | 24-Hour Escalation |
|----------|-----------------|-------------------|-------------------|
| Critical | Quality Manager | AGM | GM |
| Major | Supervisor | Quality Manager | AGM |
| Minor | Team Lead | Supervisor | Quality Manager |

### External Communication Authority

| Communication Type | Authority Level |
|--------------------|-----------------|
| Technical response | Quality Engineer |
| Commercial response | Commercial Manager |
| Formal quality notification | Quality Manager |
| Containment/recall | GM only |
| Contract commitment | GM only |
| Media/public | GM only (via Multimatic) |

### Customer Escalation Contacts

Maintain escalation contact list for each key customer:

```markdown
## Customer Escalation Contacts

**Customer:** [Name]

| Level | Role | Name | Contact |
|-------|------|------|---------|
| L1 | Buyer | [Name] | [Email/Phone] |
| L2 | Commodity Manager | [Name] | [Email/Phone] |
| L3 | SQE | [Name] | [Email/Phone] |
| L4 | Supplier Quality Manager | [Name] | [Email/Phone] |
| L5 | Purchasing Director | [Name] | [Email/Phone] |
```

---

## Commercial Risk Management

### Risk Categories

| Category | Examples | Impact |
|----------|----------|--------|
| **Customer** | Single customer dependency, credit risk | Revenue, cash flow |
| **Program** | Launch delays, volume shortfall | Utilization, recovery |
| **Commercial** | Price erosion, unfavorable terms | Margin |
| **Operational** | Capacity constraints, supplier issues | Delivery |
| **Compliance** | Certification loss, regulatory | Market access |

### Risk Indicators

**Early Warning Signs:**
- Payment delays (>10 days)
- Frequent schedule changes
- Unusual quality scrutiny
- Personnel changes at customer
- Market/industry news
- Competitor activity

### Customer Concentration Risk

| Concentration | Risk Level | Mitigation |
|---------------|------------|------------|
| Any customer >40% | High | Actively diversify |
| Any customer 25-40% | Medium | Monitor, seek growth elsewhere |
| No customer >25% | Low | Maintain balance |

---

## Customer Audit Preparation

### Audit Types

| Type | Frequency | Scope | Lead Time |
|------|-----------|-------|-----------|
| Initial qualification | Once | Full QMS | 4-6 weeks |
| Surveillance | Annual | Process focus | 2-4 weeks |
| Special/triggered | As needed | Issue-focused | 1-2 weeks |
| IATF certification | Every 3 years | Full IATF | 8-12 weeks |

### Pre-Audit Checklist

**Documentation:**
- [ ] Quality manual current
- [ ] Procedures up to date
- [ ] Work instructions at workstations
- [ ] Training records complete
- [ ] Calibration current
- [ ] PPAP files organized

**Process Areas:**
- [ ] Customer-specific requirements documented
- [ ] Special characteristics identified and controlled
- [ ] PFMEA and Control Plans aligned
- [ ] Nonconformance records available
- [ ] Corrective actions closed
- [ ] Customer scorecard performance documented

**Personnel:**
- [ ] Audit coordinator assigned
- [ ] Area owners briefed
- [ ] Operators prepared for questions
- [ ] Management available for opening/closing

### Common Audit Findings

| Finding | Prevention |
|---------|------------|
| CSRs not documented | Maintain CSR register, review quarterly |
| Special characteristics not controlled | Audit Control Plan vs. drawing |
| PFMEA/CP mismatch | Conduct cross-reference review |
| Training gaps | Maintain skills matrix, verify coverage |
| Calibration overdue | Automated reminders, buffer scheduling |
| Record retention issues | Clear retention policy, regular archive |

---

## Premium Freight Management

### Premium Freight Prevention

**Root Causes:**
| Cause | Prevention |
|-------|------------|
| Late production | Buffer stock, capacity management |
| Quality escape | Enhanced detection, containment |
| Supplier late | Supplier management, safety stock |
| Planning error | System checks, order review |
| Customer change | Change order lead time requirements |

### Premium Freight Recovery

**Customer-Caused:**
1. Document customer change/delay
2. Calculate additional freight cost
3. Submit claim within 30 days
4. Track recovery

**MNMUK-Caused:**
1. Document root cause
2. Calculate cost
3. Charge to responsible function
4. Include in quality cost tracking

### Cost Tracking

| Category | Metric | Target |
|----------|--------|--------|
| Premium freight (customer-caused) | £/month | Track, recover |
| Premium freight (internal) | £/month | <£500 |
| Premium freight (supplier) | £/month | Recover from supplier |

---

## Customer Development Activities

### New Customer Qualification

**Steps to Approved Supplier:**
1. Initial contact and capability presentation
2. Self-assessment questionnaire
3. Facility audit (if required)
4. Trial order/prototype work
5. PPAP approval
6. Approved supplier list inclusion

### Existing Customer Growth

**Account Development Plan:**
1. Understand customer roadmap
2. Identify new program opportunities
3. Propose capability extensions
4. Participate in early sourcing
5. Quote competitively
6. Win and execute flawlessly

### Customer Business Reviews

**Quarterly Review Agenda:**
1. Performance review (quality, delivery, cost)
2. Open issues status
3. New business pipeline
4. Capacity and investment plans
5. Continuous improvement initiatives
6. Relationship feedback

---

## Appendix: Customer Communication Templates

### Templates Available

| Template | Use Case | File |
|----------|----------|------|
| Quote cover letter | RFQ response | `templates/quote-cover.md` |
| Order acknowledgment | Order confirmation | `templates/order-ack.md` |
| Quality notification | Issue communication | `templates/quality-notify.md` |
| Delivery delay notice | Late shipment | `templates/delay-notice.md` |
| Business review agenda | QBR preparation | `templates/qbr-agenda.md` |
| Recovery plan | Scorecard improvement | `templates/recovery-plan.md` |

---

## Key Performance Indicators

### Commercial KPIs

| KPI | Calculation | Target | Review |
|-----|-------------|--------|--------|
| Quote win rate | Won / Quoted | >30% | Monthly |
| Quote response time | Days to submit | <5 days | Weekly |
| Contract review cycle | Days to sign | <10 days | Monthly |
| Customer satisfaction | Survey score | >4/5 | Quarterly |
| Revenue concentration | Top customer % | <40% | Monthly |
| New customer acquisition | Count/year | ≥2 | Annual |

### Relationship Health Dashboard

| Customer | Revenue | Quality | Delivery | Scorecard | Trend |
|----------|---------|---------|----------|-----------|-------|
| [Name] | £Xk | PPM | OTD% | G/Y/R | ↑↓→ |
