# Contract Review Workflow

**Structured workflow for reviewing customer contracts and orders per IATF 8.2.3.**

## Trigger
- "Review contract for [customer]"
- "Contract review checklist"
- "Check terms for [order]"

## Process

### Step 1: Gather Documents

Collect all relevant documents:
- [ ] Customer purchase order/contract
- [ ] Engineering drawings (current revision)
- [ ] Specifications referenced
- [ ] Quality agreement (if exists)
- [ ] Customer-specific requirements
- [ ] Previous correspondence

### Step 2: Technical Review

**Engineering Assessment:**

| Item | Requirement | Feasible? | Notes |
|------|-------------|-----------|-------|
| Dimensions | [From drawing] | Y/N | |
| Tolerances | [Tightest tol] | Y/N | |
| GD&T | [Key callouts] | Y/N | |
| Material | [Spec] | Y/N | |
| Surface finish | [Ra/Rz] | Y/N | |
| Heat treatment | [If required] | Y/N | |
| Special processes | [List] | Y/N | |

**Sign-off:** Engineering ☐

### Step 3: Quality Review

**Quality Assessment:**

| Item | Requirement | Achievable? | Notes |
|------|-------------|-------------|-------|
| Cpk targets | CC: 1.67, SC: 1.33 | Y/N | |
| Special characteristics | [List CC/SC] | Y/N | |
| PPAP level | [Level X] | Y/N | |
| Inspection requirements | [Details] | Y/N | |
| Traceability | [Requirements] | Y/N | |
| Documentation | [Retention, format] | Y/N | |

**Sign-off:** Quality ☐

### Step 4: Capacity Review

**Production Assessment:**

| Item | Requirement | Achievable? | Notes |
|------|-------------|-------------|-------|
| Annual volume | [Qty] | Y/N | |
| Peak demand | [Qty/period] | Y/N | |
| Equipment | [Identified] | Y/N | |
| Lead time | [Customer need] | Y/N | |
| SOP date | [Date] | Y/N | |

**Sign-off:** Production ☐

### Step 5: Commercial Review

**Terms Assessment:**

| Term | Customer Position | MNMUK Position | Risk |
|------|-------------------|----------------|------|
| Price | £X.XX | [OK/Negotiate] | L/M/H |
| Payment terms | [Days] | [OK/Negotiate] | L/M/H |
| Liability | [Stated] | [OK/Negotiate] | L/M/H |
| Warranty | [Period] | [OK/Negotiate] | L/M/H |
| Termination | [Terms] | [OK/Negotiate] | L/M/H |
| Tooling | [Ownership] | [OK/Negotiate] | L/M/H |
| Price adjustments | [Terms] | [OK/Negotiate] | L/M/H |

**Sign-off:** Commercial ☐

### Step 6: Supply Chain Review

**Material Assessment:**

| Item | Requirement | Status | Notes |
|------|-------------|--------|-------|
| Material availability | [Spec] | OK/Issue | |
| Lead time | [Weeks] | OK/Issue | |
| Supplier approved | [Y/N] | OK/Issue | |
| Packaging spec | [Available] | OK/Issue | |
| Logistics | [Requirements] | OK/Issue | |

**Sign-off:** Supply Chain ☐

### Step 7: Consolidate and Decide

**Review Summary:**

| Function | Status | Open Items |
|----------|--------|------------|
| Engineering | ✓/✗ | [List] |
| Quality | ✓/✗ | [List] |
| Production | ✓/✗ | [List] |
| Commercial | ✓/✗ | [List] |
| Supply Chain | ✓/✗ | [List] |

**Decision:**
- [ ] **ACCEPT** - All requirements can be met
- [ ] **ACCEPT WITH EXCEPTIONS** - Deviations documented and agreed
- [ ] **REJECT** - Cannot meet requirements
- [ ] **CLARIFICATION REQUIRED** - Questions outstanding

### Step 8: Authorization

| Contract Value | Approver | Signature | Date |
|----------------|----------|-----------|------|
| <£10k | Commercial Mgr | | |
| £10-50k | AGM | | |
| >£50k | GM | | |

## Output: Contract Review Record

```markdown
# Contract Review Record

**Contract/PO:** [Number]
**Customer:** [Name]
**Part Number:** [P/N]
**Review Date:** [Date]

## Review Summary

| Area | Reviewer | Date | Status |
|------|----------|------|--------|
| Technical | [Name] | [Date] | PASS/FAIL |
| Quality | [Name] | [Date] | PASS/FAIL |
| Capacity | [Name] | [Date] | PASS/FAIL |
| Commercial | [Name] | [Date] | PASS/FAIL |
| Supply Chain | [Name] | [Date] | PASS/FAIL |

## Exceptions/Deviations

| Item | Customer Req | MNMUK Position | Agreed? |
|------|--------------|----------------|---------|
| [Item] | [Req] | [Position] | Y/N |

## Decision

**Overall Status:** ACCEPT / ACCEPT WITH EXCEPTIONS / REJECT

**Authorized By:** [Name]
**Date:** [Date]

## Notes
[Any additional notes or conditions]
```
