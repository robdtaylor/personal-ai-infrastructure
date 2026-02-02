# Quick Council Workflow

Fast 2-member deliberation for time-sensitive decisions.

---

## When to Use

- Decision needed within current session
- Clear domain (e.g., pure technical, pure UX)
- Lower stakes than full Council
- Two perspectives sufficient

---

## Member Pairs

| Code | Members | Best For |
|------|---------|----------|
| `A+E` | Architect + Engineer | System design, API decisions |
| `D+E` | Designer + Engineer | UI features, user flows |
| `E+R` | Engineer + Researcher | Performance, optimization |
| `A+R` | Architect + Researcher | Strategic tech choices |
| `A+D` | Architect + Designer | Product architecture |
| `D+R` | Designer + Researcher | UX validation |
| `Q+E` | Quality + Engineer | Manufacturing process, risk mitigation |
| `Q+R` | Quality + Researcher | Compliance validation, IATF requirements |
| `Q+A` | Quality + Architect | Failure modes, system risk design |
| `O+Q` | Operations + Quality | New program launch, capacity vs risk |
| `S+F` | Supply Chain + Finance | Make/buy decisions, cost analysis |
| `F+O` | Finance + Operations | Capex investment, ROI vs capacity |
| `S+Q` | Supply Chain + Quality | Supplier issues, capability vs compliance |
| `O+F` | Operations + Finance | Capacity planning, throughput investment |
| `S+O` | Supply Chain + Operations | Lead time, inventory vs delivery |

---

## Process

### Step 1: Frame the Question

```markdown
**Quick Council:** [A+E / D+E / E+R / A+R / A+D / D+R]

**Question:** [Specific decision to make]

**Context:** [1-2 sentences of background]

**Constraints:** [Key limitations]
```

### Step 2: Gather Perspectives (Parallel)

Launch 2 agents simultaneously:

```typescript
const [memberA, memberB] = await Promise.all([
  Task({ prompt: memberAPrompt, subagent_type: 'general-purpose', model: 'haiku' }),
  Task({ prompt: memberBPrompt, subagent_type: 'general-purpose', model: 'haiku' })
]);
```

Each provides:
- **Position:** 1 sentence recommendation
- **Rationale:** 2-3 key points
- **Risk:** Main concern

### Step 3: Synthesize

| Outcome | Action |
|---------|--------|
| **Aligned** | Proceed with shared recommendation |
| **Complementary** | Combine insights |
| **Conflicting** | Escalate to full Council or decide based on domain priority |

---

## Quick Prompts

### Architect (Serena)
```
Quick Council question: [QUESTION]
Context: [CONTEXT]

As Serena (Architect), provide in 3 lines:
1. Position: [Your recommendation]
2. Rationale: [Why, from system design perspective]
3. Risk: [Main concern]
```

### Designer (Aditi)
```
Quick Council question: [QUESTION]
Context: [CONTEXT]

As Aditi (Designer), provide in 3 lines:
1. Position: [Your recommendation]
2. Rationale: [Why, from user experience perspective]
3. Risk: [Main concern]
```

### Engineer (Marcus)
```
Quick Council question: [QUESTION]
Context: [CONTEXT]

As Marcus (Engineer), provide in 3 lines:
1. Position: [Your recommendation]
2. Rationale: [Why, from implementation perspective]
3. Risk: [Main concern]
```

### Researcher (Ava)
```
Quick Council question: [QUESTION]
Context: [CONTEXT]

As Ava (Researcher), provide in 3 lines:
1. Position: [Your recommendation]
2. Rationale: [Why, based on evidence/precedent]
3. Risk: [Main concern]
```

### Quality Engineer (Wei)
```
Quick Council question: [QUESTION]
Context: [CONTEXT]

As Wei (Quality Engineer), provide in 3 lines:
1. Position: [Your recommendation]
2. Rationale: [Why, from IATF compliance/risk prevention perspective]
3. Risk: [Main concern - failure modes, audit implications, escape points]
```

### Operations Manager (Kenji)
```
Quick Council question: [QUESTION]
Context: [CONTEXT]

As Kenji (Operations Manager), provide in 3 lines:
1. Position: [Your recommendation]
2. Rationale: [Why, from capacity/scheduling/delivery perspective]
3. Risk: [Main concern - bottlenecks, OEE impact, delivery risk]
```

### Supply Chain Lead (Priya)
```
Quick Council question: [QUESTION]
Context: [CONTEXT]

As Priya (Supply Chain Lead), provide in 3 lines:
1. Position: [Your recommendation]
2. Rationale: [Why, from supplier capability/cost/lead time perspective]
3. Risk: [Main concern - supplier risk, cost impact, inventory]
```

### Finance Controller (David)
```
Quick Council question: [QUESTION]
Context: [CONTEXT]

As David (Finance Controller), provide in 3 lines:
1. Position: [Your recommendation]
2. Rationale: [Why, from ROI/margin/cash flow perspective]
3. Risk: [Main concern - payback uncertainty, budget impact, margin erosion]
```

---

## Output Format

```markdown
## Quick Council: [Pair Code]

**Question:** [Question]

### Perspectives

**[Member A]:** [Position]
- Rationale: [Key point]
- Risk: [Concern]

**[Member B]:** [Position]
- Rationale: [Key point]
- Risk: [Concern]

### Synthesis

**Alignment:** [Aligned / Complementary / Conflicting]

**Recommendation:** [Decision]

**Confidence:** [High/Medium/Low]
```

---

## Examples

### Example: A+E (Cache Layer Decision)

**Question:** Cache at API gateway or application layer?

**Architect (Serena):**
- Position: API gateway caching
- Rationale: Centralizes cache logic, easier to scale
- Risk: Less granular control

**Engineer (Marcus):**
- Position: Application layer caching
- Rationale: More control, easier to test
- Risk: Duplicated logic across services

**Synthesis:** Complementary - use gateway for static content, app layer for user-specific data. High confidence.

### Example: D+E (Form Validation)

**Question:** Client-side or server-side validation first?

**Designer (Aditi):**
- Position: Client-side first
- Rationale: Instant feedback, better UX
- Risk: Users with JS disabled

**Engineer (Marcus):**
- Position: Both, but server authoritative
- Rationale: Security requires server validation
- Risk: Duplicated logic

**Synthesis:** Aligned - client-side for UX, server-side authoritative. High confidence.

---

## Escalation to Full Council

Escalate when:
- Quick Council members have conflicting, irreconcilable positions
- Decision stakes are higher than initially assessed
- Additional perspectives would significantly improve decision quality

```markdown
**Escalation Notice**

Quick Council [Pair] could not reach alignment on: [Question]

Conflict: [Member A position] vs [Member B position]

Recommending full Council deliberation.
```
