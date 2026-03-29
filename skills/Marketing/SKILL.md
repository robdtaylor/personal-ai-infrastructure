---
name: Marketing
description: Marketing content creation and campaign planning framework. USE WHEN user says 'marketing', 'campaign', 'copy', 'headline', 'landing page', 'email sequence', 'social media', 'brand voice', 'AIDA', 'PAS', 'value proposition', or needs persuasive content.
effort: medium
---

# Marketing

Comprehensive marketing framework for content creation, copywriting, and campaign planning.

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **Copy** | "write copy", "headline", "tagline" | `Workflows/Copy.md` |
| **Campaign** | "campaign", "launch", "promotion" | `Workflows/Campaign.md` |
| **Email** | "email sequence", "newsletter", "drip" | `Workflows/Email.md` |
| **Social** | "social media", "post", "thread" | `Workflows/Social.md` |
| **Landing** | "landing page", "sales page" | `Workflows/Landing.md` |

## Copywriting Frameworks

### AIDA (Attention-Interest-Desire-Action)
```
A - Attention: Hook with bold claim or question
I - Interest: Build curiosity with benefits
D - Desire: Create emotional connection
A - Action: Clear CTA with urgency
```

### PAS (Problem-Agitate-Solution)
```
P - Problem: Identify the pain point
A - Agitate: Amplify the consequences
S - Solution: Present your offering
```

### BAB (Before-After-Bridge)
```
B - Before: Current painful state
A - After: Desired future state
B - Bridge: Your product/service
```

### 4Ps (Promise-Picture-Proof-Push)
```
P - Promise: Big benefit headline
P - Picture: Vivid outcome description
P - Proof: Social proof/testimonials
P - Push: Urgency and CTA
```

### PASTOR (Problem-Amplify-Story-Transformation-Offer-Response)
```
P - Problem: Define the struggle
A - Amplify: What happens if unsolved
S - Story: Relatable narrative
T - Transformation: The change possible
O - Offer: Your solution
R - Response: Call to action
```

## Brand Voice Configuration

Define in `templates/brand-voice.yaml`:

```yaml
brand:
  name: "Your Brand"
  tagline: "Your tagline"

voice:
  tone: professional | casual | playful | authoritative | empathetic
  personality: [traits]
  vocabulary:
    use: [preferred terms]
    avoid: [banned terms]

audience:
  primary: "Description"
  pain_points: [list]
  desires: [list]
  objections: [list]
```

## Content Types

### Headlines
- **Benefit-driven**: "Get [Benefit] Without [Pain Point]"
- **Curiosity**: "The Secret [Industry] Insiders Don't Want You to Know"
- **How-to**: "How to [Achieve Goal] in [Timeframe]"
- **List**: "[Number] Ways to [Achieve Result]"
- **Question**: "Are You Making These [Number] [Topic] Mistakes?"

### Email Subject Lines
- **Urgency**: "[Time] left to [benefit]"
- **Curiosity**: "I shouldn't be telling you this..."
- **Personal**: "[Name], quick question about [topic]"
- **Value**: "Free [resource] inside"
- **Social proof**: "[Number] people already [action]"

### Email Sequence Strategic Order (Critical)
Always structure nurture sequences in this progression — order matters for conversion:
1. **Email 1 — Welcome/Value Delivery**: Deliver promised resource, set expectations, quick win
2. **Email 2 — Social Proof/Case Study**: Establish credibility NOW while interest is high; specific customer result, certification, or data point
3. **Email 3 — Objections/FAQ/Deeper Positioning**: Address the 3–5 real reasons prospects don't buy; answer "why you over competitors"
4. **Email 4 — Direct Offer/Conversion CTA**: Hard close with specific offer, deadline, or next step — NOT a "reply with later" graceful exit

> ⚠️ Do NOT swap Email 2 and Email 3. Social proof must come before objection handling. Email 4 must drive a real conversion action.

### CTAs
- **Action-oriented**: "Start [Benefit] Now"
- **Benefit-focused**: "Get My Free [Resource]"
- **Low-commitment**: "See How It Works"
- **Urgency**: "Claim Your Spot Before [Deadline]"
- **Social proof**: "Join [Number] [Audience]"

### Buyer Objection Handling (Required for B2B/High-Consideration Copy)
When writing copy for any product or service, proactively identify and address realistic buyer objections with **specific proof points** — not vague references to "case studies" or "ROI calculators." Always provide substantive responses even without full product details by using placeholder specifics that demonstrate the pattern:

| Common Objection | Evidence-Based Response Pattern |
|-----------------|--------------------------------|
| **Switching costs / disruption** | "Onboarding takes X days; dedicated account manager handles transition; [specific guarantee]" |
| **Unknown supplier risk** | Lead with certifications (ISO, industry accreditations), years in operation, named clients or sectors served |
| **Price vs. competitors** | Total cost of ownership argument: "[Competitor] costs less upfront but [specific failure mode] costs £X; our [feature] prevents this" |
| **Qualification/lead time** | Specific turnaround data: "95% of quotes returned within 24 hours; standard orders ship in X days" |
| **Capacity concerns** | Concrete capacity metric: "X,000 sq ft facility, Y machines, Z shifts — current utilisation at N%" |
| **Quality uncertainty** | Named certifications + specific tolerance/accuracy claims + defect rate or rework stats |

> ✅ When generating objection-handling content, always write out the **actual counter-message copy**, not just the category name. Show the specific proof point in the response itself.

## Integration Points

| Skill | Integration |
|-------|-------------|
| **Blog** | Generate blog post outlines, headlines |
| **TiredEngineer** | Technical marketing with authentic voice |
| **Art** | Generate marketing visuals |
| **Research** | Competitive analysis, market research |

## Examples

**Example 1: Write headlines for a product launch**
```
User: "Write 5 headlines for our new project management tool launch"
→ Load brand voice from templates/brand-voice.yaml
→ Apply headline frameworks
→ Generate 5 variations using different formulas
```

**Example 2: Create an email sequence**
```
User: "Create a 5-email welcome sequence for new subscribers"
→ Invoke Workflows/Email.md
→ Structure: Welcome → Value → Story → Offer → Urgency
→ Output sequence with subject lines and body copy
```

**Example 3: Plan a product launch campaign**
```
User: "Plan a launch campaign for our SaaS product"
→ Invoke Workflows/Campaign.md
→ Output: Timeline, channels, content calendar, KPIs
```

**Example 4: Write landing page copy**
```
User: "Write copy for our landing page using PAS framework"
→ Invoke Workflows/Landing.md with framework=PAS
→ Output: Hero, benefits, proof, CTA sections
```
