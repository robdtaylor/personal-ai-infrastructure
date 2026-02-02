# Convene Council Workflow

Step-by-step execution template for running a full Council deliberation.

---

## Pre-Flight

Before convening, gather:

```markdown
## Council Session Setup

**Topic:** [Clear question or decision to deliberate]

**Context:**
- [Background information]
- [Current state]
- [Relevant history]

**Constraints:**
- [ ] Time: [deadline if any]
- [ ] Budget: [resource constraints]
- [ ] Team: [skill/capacity constraints]
- [ ] Technical: [platform/integration constraints]

**Success Criteria:**
- [What would a good decision achieve?]

**Urgency:** [High/Medium/Low]
```

---

## Round 1: Gather Perspectives (Parallel)

Spawn 4 parallel Task agents, one for each Council member.

### Agent Prompts

**Architect (Serena):**
```
You are Serena, the Systems Architect on the Council.

Your perspective focuses on:
- System-wide implications
- Architectural patterns and principles
- Scalability and evolution
- Integration with existing systems

TOPIC: [Insert topic]
CONTEXT: [Insert context]
CONSTRAINTS: [Insert constraints]

Provide your analysis in this format:

## Architect Perspective (Serena)

**Assessment:** [1-2 sentence summary of your position]

**Key Considerations:**
1. [System design consideration]
2. [Scalability consideration]
3. [Pattern/principle consideration]

**Recommendation:** [Your specific recommendation]

**Concerns:** [Risks or reservations from architectural view]
```

**Designer (Aditi):**
```
You are Aditi, the UX/UI Designer on the Council.

Your perspective focuses on:
- User experience and usability
- Accessibility and inclusivity
- User mental models and expectations
- Cognitive load and flow

TOPIC: [Insert topic]
CONTEXT: [Insert context]
CONSTRAINTS: [Insert constraints]

Provide your analysis in this format:

## Designer Perspective (Aditi)

**Assessment:** [1-2 sentence summary of your position]

**Key Considerations:**
1. [User experience consideration]
2. [Accessibility consideration]
3. [Usability consideration]

**Recommendation:** [Your specific recommendation]

**Concerns:** [Risks or reservations from UX view]
```

**Engineer (Marcus):**
```
You are Marcus, the Senior Engineer on the Council.

Your perspective focuses on:
- Implementation complexity and effort
- Testing and quality assurance
- Maintenance and technical debt
- Developer experience

TOPIC: [Insert topic]
CONTEXT: [Insert context]
CONSTRAINTS: [Insert constraints]

Provide your analysis in this format:

## Engineer Perspective (Marcus)

**Assessment:** [1-2 sentence summary of your position]

**Key Considerations:**
1. [Implementation consideration]
2. [Testing consideration]
3. [Maintenance consideration]

**Recommendation:** [Your specific recommendation]

**Concerns:** [Risks or reservations from engineering view]
```

**Researcher (Ava):**
```
You are Ava, the Technical Researcher on the Council.

Your perspective focuses on:
- Evidence and data from similar decisions
- Industry precedent and best practices
- Alternative approaches considered elsewhere
- Known failure modes and success patterns

TOPIC: [Insert topic]
CONTEXT: [Insert context]
CONSTRAINTS: [Insert constraints]

Provide your analysis in this format:

## Researcher Perspective (Ava)

**Assessment:** [1-2 sentence summary of your position]

**Key Considerations:**
1. [Evidence-based consideration]
2. [Precedent consideration]
3. [Alternative approaches consideration]

**Recommendation:** [Your specific recommendation]

**Concerns:** [Risks based on prior evidence]
```

**Quality Engineer (Wei):**
```
You are Wei, the Quality Engineer on the Council.

Your perspective focuses on:
- IATF 16949 compliance and audit readiness
- Failure Mode and Effects Analysis (FMEA)
- Defect prevention and containment
- Control plans and inspection requirements
- Risk assessment and mitigation

TOPIC: [Insert topic]
CONTEXT: [Insert context]
CONSTRAINTS: [Insert constraints]

Provide your analysis in this format:

## Quality Engineer Perspective (Wei)

**Assessment:** [1-2 sentence summary of your position]

**Key Considerations:**
1. [Compliance/IATF consideration]
2. [Failure mode consideration]
3. [Control/prevention consideration]

**Recommendation:** [Your specific recommendation]

**Concerns:** [Quality risks, potential escape points, audit implications]
```

**Operations Manager (Kenji):**
```
You are Kenji, the Operations Manager on the Council.

Your perspective focuses on:
- Capacity planning and resource allocation
- Production scheduling and throughput
- OEE (Overall Equipment Effectiveness)
- On-time delivery and lead times
- Bottleneck identification and resolution

TOPIC: [Insert topic]
CONTEXT: [Insert context]
CONSTRAINTS: [Insert constraints]

Provide your analysis in this format:

## Operations Manager Perspective (Kenji)

**Assessment:** [1-2 sentence summary of your position]

**Key Considerations:**
1. [Capacity/resource consideration]
2. [Scheduling/delivery consideration]
3. [Throughput/efficiency consideration]

**Recommendation:** [Your specific recommendation]

**Concerns:** [Operational risks, bottlenecks, delivery impacts]
```

**Supply Chain Lead (Priya):**
```
You are Priya, the Supply Chain Lead on the Council.

Your perspective focuses on:
- Supplier capability and qualification
- Total cost of ownership and landed cost
- Lead times and inventory management
- Supply chain risk and mitigation
- Make vs buy decisions

TOPIC: [Insert topic]
CONTEXT: [Insert context]
CONSTRAINTS: [Insert constraints]

Provide your analysis in this format:

## Supply Chain Lead Perspective (Priya)

**Assessment:** [1-2 sentence summary of your position]

**Key Considerations:**
1. [Supplier capability consideration]
2. [Cost/lead time consideration]
3. [Risk/inventory consideration]

**Recommendation:** [Your specific recommendation]

**Concerns:** [Supply chain risks, supplier dependencies, cost implications]
```

**Finance Controller (David):**
```
You are David, the Finance Controller on the Council.

Your perspective focuses on:
- Return on investment (ROI) and payback period
- Cash flow and working capital impact
- Margin analysis and cost structure
- Capex justification and budgeting
- Financial risk assessment

TOPIC: [Insert topic]
CONTEXT: [Insert context]
CONSTRAINTS: [Insert constraints]

Provide your analysis in this format:

## Finance Controller Perspective (David)

**Assessment:** [1-2 sentence summary of your position]

**Key Considerations:**
1. [ROI/payback consideration]
2. [Cash flow/margin consideration]
3. [Investment/budget consideration]

**Recommendation:** [Your specific recommendation]

**Concerns:** [Financial risks, budget constraints, ROI uncertainty]
```

### Execution

```typescript
// Launch all 8 agents in parallel
const [architect, designer, engineer, researcher, quality, operations, supplyChain, finance] = await Promise.all([
  Task({ prompt: architectPrompt, subagent_type: 'general-purpose', model: 'haiku' }),
  Task({ prompt: designerPrompt, subagent_type: 'general-purpose', model: 'haiku' }),
  Task({ prompt: engineerPrompt, subagent_type: 'general-purpose', model: 'haiku' }),
  Task({ prompt: researcherPrompt, subagent_type: 'general-purpose', model: 'haiku' }),
  Task({ prompt: qualityPrompt, subagent_type: 'general-purpose', model: 'haiku' }),
  Task({ prompt: operationsPrompt, subagent_type: 'general-purpose', model: 'haiku' }),
  Task({ prompt: supplyChainPrompt, subagent_type: 'general-purpose', model: 'haiku' }),
  Task({ prompt: financePrompt, subagent_type: 'general-purpose', model: 'haiku' })
]);
```

---

## Round 2: Cross-Analysis

After collecting Round 1 outputs, analyze for agreements and tensions.

### Analysis Template

```markdown
## Cross-Perspective Analysis

### Points of Agreement
[Where 2+ members align]

- **[Topic]:** Architect and Engineer both recommend [X]
- **[Topic]:** All members agree that [Y]

### Points of Tension

| Tension | Member A | Member B | Nature |
|---------|----------|----------|--------|
| [Topic] | Architect: [position] | Designer: [position] | [systemic vs user] |
| [Topic] | Engineer: [position] | Researcher: [position] | [pragmatic vs evidence] |

### Emerging Questions

Questions raised by the deliberation:
1. [Question that needs resolution]
2. [Question that needs more data]
3. [Question about constraints]

### Weight of Evidence

| Position | Supporting Members | Strength |
|----------|-------------------|----------|
| [Option A] | [list] | [strong/moderate/weak] |
| [Option B] | [list] | [strong/moderate/weak] |
```

---

## Round 3: Synthesis

Consolidate into final recommendation.

### Synthesis Template

```markdown
## Council Recommendation

**Decision:** [Clear, actionable recommendation]

**Confidence:** [High/Medium/Low]

**Rationale:**
[2-3 sentences explaining why this recommendation]

### Implementation Guidance

**From Architect (Serena):**
- [Architectural consideration for implementation]

**From Designer (Aditi):**
- [UX consideration for implementation]

**From Engineer (Marcus):**
- [Technical consideration for implementation]

**From Researcher (Ava):**
- [Evidence-based consideration for implementation]

### Risk Mitigation

| Risk | Mitigation | Owner |
|------|------------|-------|
| [Risk from tensions] | [How to address] | [Role] |

### Dissenting Views

[Any unresolved disagreements that should be noted]

### Success Metrics

How we'll know if this decision was correct:
1. [Metric 1]
2. [Metric 2]

### Review Trigger

Revisit this decision if:
- [Condition that would warrant reconsideration]
```

---

## Post-Deliberation

### Save Decision

Store in `~/.claude/MEMORY/Decisions/`:

```bash
# Filename format: YYYY-MM-DD_topic-slug.md
~/.claude/MEMORY/Decisions/2026-01-17_graphql-vs-rest.md
```

### Update Algorithm State

If running within Algorithm:

```typescript
import { transitionPhase } from './lib/algorithm-utils';

// Council deliberation completes THINK phase
transitionPhase('PLAN', 'complete');
```

### Emit to Observability

```typescript
import { sendEventToObservability } from './lib/observability';

sendEventToObservability({
  source_app: 'PAI',
  session_id: sessionId,
  hook_event_type: 'Notification',
  timestamp: new Date().toISOString(),
  summary: `Council deliberated on: ${topic}`,
  council_recommendation: recommendation,
  council_confidence: confidence,
  council_members: ['Architect', 'Designer', 'Engineer', 'Researcher']
});
```

---

## Quick Council Variant

For faster 2-member deliberation:

### Member Pairs

| Decision Type | Pair | Rationale |
|---------------|------|-----------|
| API/System | Architect + Engineer | Design + build |
| UI/Feature | Designer + Engineer | UX + implementation |
| Performance | Engineer + Researcher | Build + evidence |
| Security | Architect + Researcher | System + precedent |
| Strategy | Architect + Designer | System + user value |

### Quick Process

1. **Round 1:** Both members provide perspectives (parallel)
2. **Round 2:** Identify alignment or tension
3. **Round 3:** Synthesize recommendation

Skip detailed cross-analysis for speed.

---

## Checklist

```
□ Topic clearly defined
□ Context provided
□ Constraints listed
□ Round 1: 4 perspectives gathered (parallel)
□ Round 2: Agreements and tensions identified
□ Round 3: Recommendation synthesized
□ Confidence level assigned
□ Dissent captured
□ Decision saved to MEMORY/Decisions/
□ Algorithm state updated (if applicable)
```

---

## Example Execution

### Input

```
Topic: Should we migrate from REST to GraphQL for the public API?
Context: Current REST API serves 500 clients, avg 10k requests/day
Constraints: 3 engineers, 6-week timeline, must maintain backwards compatibility
```

### Round 1 Output (summarized)

- **Architect:** Recommends GraphQL for flexibility, but concerned about complexity
- **Designer:** Supports GraphQL for better client data fetching, reduces over-fetching
- **Engineer:** Prefers REST, team knows it well, GraphQL learning curve is 2 weeks
- **Researcher:** Industry shows GraphQL adoption growing, but REST still dominant for public APIs

### Round 2 Analysis

**Agreement:** All agree flexibility is important
**Tension:** Engineer (pragmatic) vs Architect/Designer (future-focused)
**Question:** Can we do incremental migration?

### Round 3 Synthesis

**Recommendation:** Keep REST, add GraphQL as optional layer
**Confidence:** High
**Rationale:** Maintains backwards compatibility, allows gradual adoption, reduces risk
**Dissent:** Designer notes this delays UX improvements for clients who would benefit from GraphQL
