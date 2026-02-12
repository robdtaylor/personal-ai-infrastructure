# Traceability Workflow

**Structured workflow for serial number assignment and build record management.**

## Trigger
- "Traceability for [product]"
- "Serial number assignment"
- "Build record"

## Process

### Step 1: Traceability Requirements

Define traceability scope:

| Field | Value |
|-------|-------|
| Product | [Product name/number] |
| Customer Requirement | [Reference document] |
| Traceability Level | Unit / Batch / Lot |
| Retention Period | [Years] |

### Step 2: Serial Number Scheme

**Serial Number Structure:**

```
Example: MNM-A2601-00001
         │   │    │
         │   │    └── Sequential number (5 digits)
         │   └──────── Product code + Year/Month
         └──────────── Plant code (MNM = MNMUK)
```

**Scheme Definition:**

| Segment | Length | Content | Example |
|---------|--------|---------|---------|
| Plant | 3 | Site identifier | MNM |
| Product | 2-4 | Product family | A26 |
| Date | 2-4 | Year/month or week | 01 |
| Sequence | 4-6 | Sequential counter | 00001 |

### Step 3: Serial Number Assignment

**Assignment Point:**
- Assign at start of assembly (preferred)
- Before any value-added operation
- Never assigned after test (creates gaps)

**Assignment Methods:**

| Method | Description | Application |
|--------|-------------|-------------|
| Pre-printed label | Labels generated in sequence | High volume |
| System-generated | Generated at scan point | MES integrated |
| Manual assignment | Log book entry | Low volume, prototype |

**Assignment Procedure:**
1. Retrieve next serial number
2. Apply label to designated location
3. Scan/enter serial into system
4. Verify scan successful
5. Begin assembly operations

### Step 4: Build Record Data Capture

**Data Elements to Capture:**

| Category | Data | Capture Method | Mandatory |
|----------|------|----------------|-----------|
| **Identity** | Serial number | Scan | Yes |
| | Product number | System | Yes |
| | Revision | System | Yes |
| **Time** | Start date/time | Automatic | Yes |
| | End date/time | Automatic | Yes |
| **Personnel** | Operator ID | Badge scan | Yes |
| | Inspector ID | Badge scan | If inspected |
| **Components** | Key component serials | Scan | Per spec |
| | Component lot numbers | Scan | Per spec |
| **Process** | Torque values | Electronic tool | Per spec |
| | Test results | Test system | All tests |
| | Inspection results | Entry/system | Per control plan |
| **Deviations** | Rework | Manual entry | If applicable |
| | Concessions | Manual entry | If applicable |

### Step 5: Component Traceability

**Linking Components to Assembly:**

```markdown
## Component Traceability

**Assembly Serial:** [Parent S/N]

| Component | Part Number | Traceability ID | Type |
|-----------|-------------|-----------------|------|
| Main housing | [P/N] | [Serial/Lot] | Serial |
| Seal kit | [P/N] | [Lot #] | Lot |
| Fastener set | [P/N] | [Lot #] | Lot |
| Electronic module | [P/N] | [Module S/N] | Serial |
```

**Traceability Levels:**

| Level | What's Tracked | When Used |
|-------|----------------|-----------|
| **Serial** | Individual unit | High-value, safety-critical |
| **Lot** | Production batch | Materials, consumables |
| **Date** | Production date | Low-risk, high-volume |

### Step 6: Process Data Recording

**Torque Data:**
```markdown
| Joint ID | Specification | Actual | Angle | Tool ID | Time |
|----------|---------------|--------|-------|---------|------|
| J001 | 25±2 Nm | 24.8 | 45° | T-001 | 09:15 |
| J002 | 25±2 Nm | 25.1 | 48° | T-001 | 09:16 |
```

**Test Results:**
```markdown
| Test | Parameter | Specification | Result | Status |
|------|-----------|---------------|--------|--------|
| Leak test | Pressure | >5 bar, 30 sec | 5.2 bar | PASS |
| Function | Travel | 10±0.5 mm | 10.1 mm | PASS |
| Electrical | Resistance | <2 ohm | 1.5 ohm | PASS |
```

### Step 7: Build Record Completion

**End-of-Line Requirements:**

- [ ] All operations completed
- [ ] All data captured
- [ ] All tests passed
- [ ] Final inspection complete
- [ ] Build record closed

**Build Record Sign-Off:**
```markdown
**Assembly Serial:** [S/N]
**Product:** [P/N]
**Build Complete:** [Date/Time]

Operator: _____________ Badge: _______
Inspector: ____________ Badge: _______

Quality Release: ☐
```

### Step 8: Record Storage and Retrieval

**Storage Requirements:**

| Requirement | MNMUK Standard |
|-------------|----------------|
| Retention period | 15 years (per customer, default) |
| Format | Electronic (primary), paper backup |
| Location | Secure server + offsite backup |
| Access control | Quality and authorized personnel |

**Retrieval Capability:**
- By serial number: Full build record
- By date range: All units produced
- By component lot: All assemblies containing lot
- By operator: All units built by operator

## Output: Build Record

```markdown
# Build Record

**Serial Number:** [S/N]
**Product:** [P/N] Rev [X]
**Build Date:** [Date]

## Assembly Summary

| Start | Complete | Duration | Line | Shift |
|-------|----------|----------|------|-------|
| [Time] | [Time] | [Min] | [Line] | [Shift] |

## Personnel

| Role | Name | Badge |
|------|------|-------|
| Assembler | [Name] | [Badge] |
| Inspector | [Name] | [Badge] |

## Component Traceability

| Component | Part Number | Trace ID |
|-----------|-------------|----------|
| [Desc] | [P/N] | [S/N or Lot] |

## Process Data

### Torque

| Joint | Spec | Actual | Status |
|-------|------|--------|--------|
| [ID] | [Nm] | [Nm] | PASS |

### Test Results

| Test | Result | Status |
|------|--------|--------|
| [Test] | [Value] | PASS |

## Quality

| Check | Result | Verified By |
|-------|--------|-------------|
| Final inspection | PASS | [Name] |
| Documentation complete | ✓ | [Name] |

## Deviations

| Item | Description | Disposition |
|------|-------------|-------------|
| [If any] | [Description] | [Concession #] |

## Release

- [ ] Build complete
- [ ] All tests passed
- [ ] Quality release

**Released By:** [Name]
**Date:** [Date]
```

## Traceability Queries

### Forward Traceability (Component → Assembly)

**Query:** "Which assemblies contain component lot X?"

```
Input: Component lot number
Output: List of assembly serial numbers containing that lot
```

### Backward Traceability (Assembly → Components)

**Query:** "What components are in assembly serial X?"

```
Input: Assembly serial number
Output: Complete list of component serials/lots
```

### Field Return Investigation

**Query:** "Customer returns serial X - what was its build history?"

1. Retrieve full build record
2. Identify all components
3. Check for any deviations/rework
4. Review test data
5. Identify other units with same conditions

## Integration Points

- **MES/ERP:** Serial number generation, data storage
- **Quality:** Inspection records, test results
- **Assembly Operations:** Process data capture
- **Customer Portal:** Traceability data submission (if required)
- **Warranty:** Field return investigation
