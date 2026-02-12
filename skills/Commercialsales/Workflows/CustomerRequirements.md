# Customer Requirements Workflow

**Structured workflow for capturing and managing customer-specific requirements.**

## Trigger
- "What are [customer]'s requirements?"
- "CSR register for [customer]"
- "Customer-specific requirements"

## Process

### Step 1: Identify Requirement Sources

Check all sources for customer requirements:

| Source | Location | Checked |
|--------|----------|---------|
| Quality Agreement | Customer file | ☐ |
| Supplier Manual | Customer portal | ☐ |
| Drawing notes | Drawing package | ☐ |
| Purchase Order | Order file | ☐ |
| Specifications | Spec register | ☐ |
| Email/correspondence | Communication log | ☐ |
| Customer portal | Online | ☐ |
| Previous PPAP feedback | PPAP file | ☐ |

### Step 2: Extract Requirements

For each source, extract specific requirements:

**Categories:**
- APQP/Timing
- PPAP
- Quality targets
- Labeling
- Packaging
- Shipping
- Systems/EDI
- Traceability
- Documentation
- Special processes

### Step 3: Document in CSR Register

```markdown
# Customer-Specific Requirements Register

**Customer:** [Name]
**Supplier Code:** [Code]
**Last Updated:** [Date]
**Next Review:** [Date]

## APQP/Timing Requirements

| # | Requirement | Source | Evidence | Status |
|---|-------------|--------|----------|--------|
| 1 | [Requirement] | [Document] | [Evidence] | Compliant |

## PPAP Requirements

| # | Requirement | Source | Evidence | Status |
|---|-------------|--------|----------|--------|
| 1 | Level 3 default | SQM §4.2 | PPAP procedure | Compliant |
| 2 | [Requirement] | [Document] | [Evidence] | [Status] |

## Quality Requirements

| # | Requirement | Source | Evidence | Status |
|---|-------------|--------|----------|--------|
| 1 | Cpk ≥1.67 for CC | SQM §5.1 | Capability studies | Compliant |
| 2 | [Requirement] | [Document] | [Evidence] | [Status] |

## Labeling Requirements

| # | Requirement | Source | Evidence | Status |
|---|-------------|--------|----------|--------|
| 1 | [Label format] | [Document] | [Label spec] | [Status] |

## Packaging Requirements

| # | Requirement | Source | Evidence | Status |
|---|-------------|--------|----------|--------|
| 1 | [Container spec] | [Document] | [Pack spec] | [Status] |

## Shipping/Logistics Requirements

| # | Requirement | Source | Evidence | Status |
|---|-------------|--------|----------|--------|
| 1 | ASN via EDI 856 | Logistics Manual | EDI setup | Compliant |

## System Requirements

| # | Requirement | Source | Evidence | Status |
|---|-------------|--------|----------|--------|
| 1 | Portal registration | Supplier setup | Access confirmed | Compliant |

## Traceability Requirements

| # | Requirement | Source | Evidence | Status |
|---|-------------|--------|----------|--------|
| 1 | [Lot traceability] | [Document] | [Procedure] | [Status] |

## Documentation Requirements

| # | Requirement | Source | Evidence | Status |
|---|-------------|--------|----------|--------|
| 1 | 15-year retention | SQM §8.1 | Retention policy | Compliant |
```

### Step 4: Assess Compliance

For each requirement:
1. Identify current state
2. Determine compliance status
3. Document evidence
4. Flag any gaps

**Compliance Status:**
| Status | Definition |
|--------|------------|
| Compliant | Fully meeting requirement |
| Partial | Meeting but needs improvement |
| Gap | Not currently meeting |
| N/A | Not applicable to our supply |

### Step 5: Gap Closure

For any gaps identified:

| Gap | Action Required | Owner | Target | Status |
|-----|-----------------|-------|--------|--------|
| [Gap] | [Action] | [Name] | [Date] | [Status] |

### Step 6: Flowdown

Ensure requirements flow to:
- [ ] APQP timing plan
- [ ] PFMEA
- [ ] Control Plan
- [ ] Work Instructions
- [ ] Inspection plans
- [ ] Supplier requirements

### Step 7: Periodic Review

Schedule regular reviews:
- **Quarterly:** Check for updates to customer manuals
- **Annually:** Full CSR register review
- **Event-driven:** After customer audit or complaint

## Output: CSR Summary

```markdown
# CSR Summary - [Customer]

**Total Requirements:** [#]
**Compliant:** [#]
**Gaps:** [#]
**Last Review:** [Date]

## Key Requirements

| Category | Key Points |
|----------|------------|
| PPAP | Level 3, [specific elements] |
| Quality | Cpk ≥1.67 CC, ≥1.33 SC |
| Labeling | [Format], 2D barcode |
| Shipping | ASN required, [carrier] |

## Open Gaps

| Gap | Action | Due |
|-----|--------|-----|
| [Gap] | [Action] | [Date] |

## Next Review: [Date]
```
