# RFQ Processing Workflow

**Structured workflow for handling customer enquiries and quotations.**

## Trigger
- "Process RFQ from [customer]"
- "New enquiry for [part]"
- "Quote request"

## Process

### Step 1: Register Enquiry

Create enquiry record:

```markdown
## Enquiry Registration

| Field | Value |
|-------|-------|
| Enquiry ID | ENQ-[YEAR]-[SEQ] |
| Date Received | [Date] |
| Customer | [Name] |
| Contact | [Person] |
| Part Description | [Description] |
| Drawing Number | [If provided] |
| Annual Volume | [Quantity] |
| Target Price | [If stated] |
| Target SOP | [Date] |
| Response Due | [Date] |
| Assigned To | [Commercial team member] |
```

### Step 2: Initial Review

Quick assessment:
- [ ] Within our capability (general)?
- [ ] Within our capacity (rough)?
- [ ] Strategic fit (customer/market)?
- [ ] Proceed with detailed review?

If NO to any: Decline with reason or request clarification.

### Step 3: Multi-Functional Feasibility

Distribute to functions for review:

| Function | Reviewer | Due Date | Status |
|----------|----------|----------|--------|
| Manufacturing Eng | [Name] | [Date] | ☐ |
| Production | [Name] | [Date] | ☐ |
| Quality | [Name] | [Date] | ☐ |
| Supply Chain | [Name] | [Date] | ☐ |

**Feasibility Questions:**
- Can we make it? (Technical)
- Can we meet tolerances? (Quality)
- Can we meet volume? (Capacity)
- Can we meet timing? (Lead time)
- Can we source materials? (Supply)

### Step 4: Cost Estimation

Use QuoteEstimator skill for technical costing:
```
load QuoteEstimator skill
```

**Cost Build-Up:**
| Element | Value | Notes |
|---------|-------|-------|
| Material | £ | Weight × £/kg × 1.3 |
| Labor | £ | Cycle × rate |
| Setup | £ | Setup ÷ batch |
| Overhead | £ | Per formula |
| Subtotal | £ | |
| Margin (X%) | £ | |
| **Unit Price** | **£** | |

### Step 5: Quote Preparation

Compile quote package:
1. Cover letter
2. Pricing summary
3. Technical notes/assumptions
4. Terms and conditions
5. Validity statement

### Step 6: Internal Approval

| Quote Value | Approver |
|-------------|----------|
| <£10k annual | Commercial Manager |
| £10-50k | AGM |
| >£50k | GM |

### Step 7: Submit Quote

- Send via customer-preferred method
- Log submission date
- Set follow-up reminder
- Track in pipeline

## Output: Quote Summary

```markdown
# Quote Summary

**Enquiry ID:** [ID]
**Customer:** [Name]
**Part:** [Description]
**Quantity:** [Annual volume]

## Pricing

| Qty | Unit Price | Setup | Total |
|-----|------------|-------|-------|
| [Qty1] | £X.XX | £XXX | £X,XXX |
| [Qty2] | £X.XX | £XXX | £X,XXX |

## Key Assumptions
- [Assumption 1]
- [Assumption 2]

## Exclusions
- [Exclusion 1]
- [Exclusion 2]

## Validity
- Quote valid: 30 days
- Lead time: X weeks ARO

**Submitted:** [Date]
**Follow-up:** [Date]
```
