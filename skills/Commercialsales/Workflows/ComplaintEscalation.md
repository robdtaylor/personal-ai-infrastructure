# Complaint Escalation Workflow

**Structured workflow for managing customer complaints from a commercial/relationship perspective.**

## Trigger
- "Customer complaint from [customer]"
- "Escalate issue to customer"
- "[Customer] is unhappy about [issue]"

## Process

### Step 1: Receipt and Registration

**Immediate Actions (within 1 hour):**

```markdown
## Complaint Registration

| Field | Value |
|-------|-------|
| Complaint ID | CC-[YEAR]-[SEQ] |
| Date/Time Received | [DateTime] |
| Customer | [Name] |
| Customer Contact | [Person reporting] |
| Part Number | [P/N] |
| Complaint Type | Quality / Delivery / Documentation / Other |
| Brief Description | [Summary] |
| Quantity Affected | [If known] |
| Shipment Reference | [If applicable] |
| Received By | [MNMUK contact] |
```

### Step 2: Acknowledge to Customer

**Response Time:** Within 4 hours

**Acknowledgment Template:**
```
Subject: Acknowledgment - Complaint [CC-XXXX-XXXX] - [Part Number]

Dear [Customer Contact],

Thank you for bringing this matter to our attention.

We have registered your complaint regarding [brief description] and have assigned reference number [CC-XXXX-XXXX].

[Your Name] will be your primary contact for this issue and will provide an initial assessment within [24/48] hours.

In the meantime, please contact us immediately if you have any urgent containment needs.

Regards,
[Name]
[Title]
[Contact details]
```

### Step 3: Severity Classification

| Severity | Criteria | Response Level |
|----------|----------|----------------|
| **Critical** | Safety issue, line stop, recall potential | Immediate GM involvement |
| **Major** | Production impact, significant quantity, repeat | Commercial Manager + Quality |
| **Minor** | Isolated issue, low quantity, first occurrence | Commercial team |

**Classification Questions:**
- Is there a safety concern? → Critical
- Has customer production been impacted? → Critical/Major
- What quantity is affected? → Informs severity
- Is this a repeat issue? → Escalates severity
- What is customer's stated urgency? → Consider

### Step 4: Internal Mobilization

**Critical/Major - Immediate Actions:**
1. Notify Quality Manager
2. Notify relevant Production Manager
3. Convene rapid response team
4. Assess containment needs

**Link to 8D Process:**
If technical investigation required:
```
load EightD skill
```
- Commercial owns customer relationship
- Quality owns technical investigation
- Both track in parallel

### Step 5: Containment Communication

**If containment required, communicate to customer:**

| Action | Timeframe | Communication |
|--------|-----------|---------------|
| Internal hold | Immediate | Notify within 4 hours |
| Shipment intercept | Same day | Confirm carrier/tracking |
| Customer sort | As needed | Provide support plan |
| Replacement shipment | ASAP | Confirm ETA |

### Step 6: Investigation Updates

**Update Frequency by Severity:**

| Severity | Update Frequency | Format | Audience |
|----------|------------------|--------|----------|
| Critical | Daily | Call + email | Customer leadership |
| Major | Every 2-3 days | Email | Customer quality + purchasing |
| Minor | Weekly | Email | Customer contact |

**Update Content:**
1. Current investigation status
2. Findings to date
3. Containment effectiveness
4. Next steps and timeline
5. Questions for customer (if any)

### Step 7: Resolution Communication

**When root cause identified and corrective action defined:**

```markdown
Subject: Resolution - Complaint [CC-XXXX-XXXX] - [Part Number]

Dear [Customer Contact],

Following our investigation into complaint [CC-XXXX-XXXX], we would like to share our findings and corrective actions.

**Root Cause:**
[Summary of root cause]

**Corrective Actions:**
1. [Action 1] - Implemented [Date]
2. [Action 2] - Implemented [Date]
3. [Action 3] - Target [Date]

**Preventive Actions:**
1. [Action to prevent recurrence]
2. [Systemic improvement]

**Effectiveness Verification:**
[How we will verify actions are effective]

Please review and let us know if you require any additional information or have questions about our response.

Regards,
[Name]
Quality Manager
```

### Step 8: Closure

**Closure Checklist:**
- [ ] Customer accepts resolution
- [ ] All corrective actions verified effective
- [ ] 8D closed (if applicable)
- [ ] PFMEA updated (if applicable)
- [ ] Control Plan updated (if applicable)
- [ ] Lessons learned documented
- [ ] Complaint record closed

**Closure Communication:**
```
Thank you for your patience during our investigation of [complaint reference].
We have implemented corrective actions and verified their effectiveness.
Please confirm this complaint can be closed from your perspective.
```

## Output: Complaint Summary

```markdown
# Complaint Summary

**Complaint ID:** [CC-XXXX-XXXX]
**Customer:** [Name]
**Part Number:** [P/N]
**Severity:** Critical / Major / Minor

## Timeline

| Date | Event |
|------|-------|
| [Date] | Complaint received |
| [Date] | Acknowledged to customer |
| [Date] | Containment implemented |
| [Date] | Root cause identified |
| [Date] | Corrective actions implemented |
| [Date] | Customer acceptance |
| [Date] | Closed |

## Issue Summary
[Brief description of the issue]

## Root Cause
[Root cause statement]

## Resolution
[Summary of corrective actions]

## Lessons Learned
[Key learnings for future prevention]

## Customer Satisfaction
[Customer feedback on resolution]
```

## Escalation Triggers

Escalate immediately to GM if:
- Customer threatens business consequences
- Media/public relations risk
- Legal/regulatory implications
- Customer executive involvement
- Repeated failures on same issue
- Relationship damage evident
