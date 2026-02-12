# Component Receipt Workflow

**Structured workflow for receiving and inspecting damper components.**

## Trigger
- "Damper components received"
- "Receipt inspection for [component]"
- "Incoming damper parts"

## Process

### Step 1: Receive Delivery

| Field | Value |
|-------|-------|
| Date Received | [Date] |
| Supplier | [Name] |
| Delivery Note | [Number] |
| PO Reference | [PO Number] |
| Receiver | [Name] |

### Step 2: Verify Delivery Contents

**Delivery Verification:**

| Item | P/N | Ordered | Received | Match? |
|------|-----|---------|----------|--------|
| [Component] | [P/N] | [Qty] | [Qty] | ☐ |
| [Component] | [P/N] | [Qty] | [Qty] | ☐ |

**Documentation Check:**
- [ ] Delivery note present
- [ ] Certificate of Conformance (CoC)
- [ ] Material certificates (if required)
- [ ] Lot/batch traceability information

### Step 3: Component-Specific Inspection

**Piston Rods:**

| Check | Method | Acceptance | Result |
|-------|--------|------------|--------|
| Surface finish | Visual, comparator | No scratches, correct Ra | ☐ Pass ☐ Fail |
| Thread condition | Go/No-Go gauge | Threads complete, no damage | ☐ Pass ☐ Fail |
| Diameter | Micrometer | Per drawing ±tol | ☐ Pass ☐ Fail |
| Length | Caliper | Per drawing ±tol | ☐ Pass ☐ Fail |
| Straightness | V-block, dial indicator | Within spec | ☐ Pass ☐ Fail |

**Spool Valves:**

| Check | Method | Acceptance | Result |
|-------|--------|------------|--------|
| Port windows | Visual, magnification | Clean cut, no burrs | ☐ Pass ☐ Fail |
| Dimensions | Calibrated gauge | Per drawing ±tol | ☐ Pass ☐ Fail |
| Spring condition | Visual | No damage, correct ID | ☐ Pass ☐ Fail |
| Free movement | Functional | Smooth travel | ☐ Pass ☐ Fail |

**Seals:**

| Check | Method | Acceptance | Result |
|-------|--------|------------|--------|
| Part number | Visual | Correct P/N | ☐ Pass ☐ Fail |
| Material | CoC verification | Per spec | ☐ Pass ☐ Fail |
| Dimensions | Calibrated gauge | Per drawing | ☐ Pass ☐ Fail |
| Visual condition | 100% visual | No cuts, nicks, deformation | ☐ Pass ☐ Fail |

**Housing/Tubes:**

| Check | Method | Acceptance | Result |
|-------|--------|------------|--------|
| ID | Bore gauge | Per drawing ±tol | ☐ Pass ☐ Fail |
| Surface finish | Visual, comparator | No scratches, correct hone | ☐ Pass ☐ Fail |
| Thread condition | Go/No-Go gauge | Threads complete | ☐ Pass ☐ Fail |
| Length | Caliper | Per drawing ±tol | ☐ Pass ☐ Fail |

**Damper Fluid:**

| Check | Method | Acceptance | Result |
|-------|--------|------------|--------|
| Type | CoC | Correct specification | ☐ Pass ☐ Fail |
| Cleanliness | NAS sample | NAS 6 or better | ☐ Pass ☐ Fail |
| Container sealed | Visual | No leaks, cap intact | ☐ Pass ☐ Fail |
| Expiry date | Label | Within date | ☐ Pass ☐ Fail |

### Step 4: Sampling Plan

**AQL Sampling (per CP-71-001):**

| Lot Size | Sample Size | Accept | Reject |
|----------|-------------|--------|--------|
| 2-8 | All | 0 | 1 |
| 9-15 | 5 | 0 | 1 |
| 16-25 | 8 | 0 | 1 |
| 26-50 | 13 | 0 | 1 |
| 51-90 | 20 | 1 | 2 |
| 91-150 | 32 | 1 | 2 |
| 151-280 | 50 | 2 | 3 |
| 281-500 | 80 | 3 | 4 |

### Step 5: Disposition

**Inspection Result:**

| Disposition | Action |
|-------------|--------|
| **ACCEPT** | Move to stock, update system |
| **REJECT** | Quarantine, NCR, notify supplier |
| **CONDITIONAL** | Deviation required, obtain approval |

### Step 6: Storage and FIFO

**Storage Requirements:**

| Component | Storage Condition | Shelf Life |
|-----------|-------------------|------------|
| Metal parts | Clean, dry, protected | N/A |
| Seals | Cool, dark, original packaging | Check expiry |
| Fluid | Climate controlled, sealed | Check expiry |
| Valves | Protected, orientation marked | N/A |

**FIFO Management:**
- [ ] Mark receipt date on container
- [ ] Place behind existing stock
- [ ] Update inventory system
- [ ] Record lot traceability

## Output: Receipt Inspection Record

```markdown
# Component Receipt Record

**Date:** [Date]
**Supplier:** [Name]
**Delivery Note:** [Number]
**Inspected By:** [Name]

## Components Received

| P/N | Description | Qty | Lot | Result |
|-----|-------------|-----|-----|--------|
| [P/N] | [Desc] | [#] | [Lot] | PASS/FAIL |

## Inspection Summary

| Check Category | Pass | Fail |
|----------------|------|------|
| Dimensional | [#] | [#] |
| Visual | [#] | [#] |
| Documentation | [#] | [#] |

## Disposition

- [ ] Accepted to stock
- [ ] Rejected (NCR #: _______)
- [ ] Conditional (Deviation #: _______)

## Traceability

| Component | Lot/Batch | Storage Location |
|-----------|-----------|------------------|
| [Desc] | [Lot] | [Location] |

**Signature:** _____________ Date: _______
```

## Reference Documents

- WI-71-001: Damper Component Receipt
- CP-71-001: Component Receipt Control Plan
- Supplier quality agreements
