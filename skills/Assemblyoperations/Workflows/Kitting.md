# Kitting Workflow

**Structured workflow for kit preparation and verification in assembly operations.**

## Trigger
- "Kitting process for [product]"
- "Kit preparation"
- "Component staging"

## Process

### Step 1: Kit Definition

Gather kit requirements:

| Field | Value |
|-------|-------|
| Product | [Product name/number] |
| BOM Revision | [Current revision] |
| Kit Number | KIT-[Product]-[Seq] |
| Line/Station | [Destination] |
| Quantity | [Units to kit] |

### Step 2: BOM Review

Verify bill of materials:

```markdown
## Kit BOM

| Line | Part Number | Description | Qty/Kit | Location | Notes |
|------|-------------|-------------|---------|----------|-------|
| 1 | [P/N] | [Desc] | [Qty] | [Bin] | |
| 2 | [P/N] | [Desc] | [Qty] | [Bin] | |
```

**Check for:**
- [ ] Revision currency
- [ ] All components available
- [ ] Alternate parts identified
- [ ] Special handling requirements

### Step 3: Kit Container Preparation

| Container Type | Application | Label Requirements |
|----------------|-------------|-------------------|
| Tote/bin | Standard components | Kit number, product, qty |
| Divided tray | Multiple small parts | Part numbers in cells |
| Returnable | Customer-specific | Per customer spec |
| Single-use | Low volume, prototype | Kit number only |

**Container Setup:**
1. Select appropriate container
2. Clean and inspect
3. Apply kit label
4. Verify traceability barcode

### Step 4: Picking Process

**Picking Methods:**

| Method | Description | When to Use |
|--------|-------------|-------------|
| Pick list | Paper-based list | Low volume, simple kits |
| Scan pick | Barcode verification | Medium volume |
| Pick-to-light | Light-guided picking | High volume, complex kits |
| Voice pick | Voice-directed | Hands-free requirements |

**Picking Steps:**
1. Retrieve pick list/scan kit traveler
2. Go to first bin location
3. Verify part number (scan or visual)
4. Pick specified quantity
5. Place in kit container in designated position
6. Confirm pick (scan/button/voice)
7. Repeat for all components
8. Verify kit complete

### Step 5: Kit Verification

**Verification Options:**

| Verification Level | Method | Application |
|--------------------|--------|-------------|
| Basic | Visual check + count | Standard kits |
| Standard | Barcode scan each component | Critical kits |
| Enhanced | Weight verification + scan | Safety-critical |

**Verification Checklist:**
- [ ] All components present
- [ ] Correct quantities
- [ ] Correct revisions
- [ ] No damaged components
- [ ] Special requirements met
- [ ] Traceability recorded

### Step 6: Kit Documentation

**Kit Traveler:**
```markdown
## Kit Traveler

**Kit Number:** KIT-[XXX]-[XXXX]
**Product:** [Name]
**Quantity:** [#] kits
**Prepared By:** [Name]
**Date/Time:** [DateTime]

### Component Verification

| Line | Part Number | Qty | Verified | Initials |
|------|-------------|-----|----------|----------|
| 1 | [P/N] | [Qty] | ☐ | |
| 2 | [P/N] | [Qty] | ☐ | |

### Lot Traceability

| Component | Lot Number | Expiry (if applicable) |
|-----------|------------|------------------------|
| [P/N] | [Lot] | [Date] |

**Kit Complete:** ☐
**Kitter Signature:** ____________
```

### Step 7: Kit Storage/Staging

**FIFO Management:**
- Staged kits in date order
- Oldest kit used first
- Clear date marking on each kit

**Staging Area Requirements:**
| Factor | Requirement |
|--------|-------------|
| Location | Adjacent to assembly line |
| Identification | Clear lane marking |
| Quantity | Min/max levels displayed |
| Protection | Covered, clean environment |

### Step 8: Kit Release to Line

**Release Criteria:**
- [ ] Kit verification complete
- [ ] All documentation present
- [ ] Assembly line ready
- [ ] Previous kit consumed (FIFO)

**Handoff:**
1. Deliver kit to designated station
2. Confirm receipt with operator
3. Update kit status in system
4. Return empty container for reuse

## Output: Kit Completion Record

```markdown
# Kit Completion Record

**Kit Number:** KIT-[XXX]-[XXXX]
**Product:** [Name]
**Date Completed:** [Date]

## Kit Summary

| Metric | Value |
|--------|-------|
| Components | [#] line items |
| Total pieces | [#] |
| Preparation time | [Minutes] |
| Verified by | [Name] |

## Quality Status

- [ ] All components verified
- [ ] Traceability recorded
- [ ] No discrepancies

## Discrepancies (if any)

| Issue | Component | Action Taken |
|-------|-----------|--------------|
| [Issue] | [P/N] | [Action] |

**Released to Line:** [Date/Time]
**Received by:** [Operator name]
```

## Common Kitting Issues

| Issue | Cause | Prevention |
|-------|-------|------------|
| Wrong part | Similar P/N, wrong bin | Barcode scan verification |
| Wrong quantity | Miscounting | Count aids, weight check |
| Missing part | Stockout | Min/max management |
| Wrong revision | Obsolete stock | FIFO, revision control |
| Damaged part | Handling, storage | Proper packaging, inspection |

## Integration Points

- **Inventory System:** Decrement stock on pick
- **Traceability:** Link component lots to kit
- **Assembly:** Pass kit traveler to line
- **Quality:** Track kit accuracy metrics
