# Copy Workflow

Generate persuasive copy using proven frameworks.

## Input Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `type` | Yes | headline, tagline, body, cta |
| `framework` | No | AIDA, PAS, BAB, 4Ps (default: best fit) |
| `audience` | No | Target audience description |
| `tone` | No | Override brand voice tone |
| `variations` | No | Number of variations (default: 3) |

## Process

### Step 1: Load Context
```
1. Read templates/brand-voice.yaml if exists
2. Identify product/service being promoted
3. Understand target audience
4. Note any constraints (character limits, platform)
```

### Step 2: Research Phase
```
1. Identify key benefits (not features)
2. List pain points being addressed
3. Find proof points (stats, testimonials, credentials)
4. Understand competitive positioning
```

### Step 3: Framework Application

**For Headlines:**
```markdown
## Benefit Formula
"Get [specific benefit] without [common obstacle]"

## Curiosity Formula
"The [unexpected approach] that [achieves result]"

## Proof Formula
"How [specific person/company] [achieved result] in [timeframe]"

## Question Formula
"Are you still [outdated approach] when you could [better approach]?"

## List Formula
"[Number] [adjective] ways to [achieve goal]"
```

**For Body Copy (AIDA):**
```markdown
## Attention (1-2 sentences)
Bold claim or provocative question that stops the scroll.

## Interest (2-3 sentences)
Expand on the hook. Introduce the "what" and hint at "how".

## Desire (3-5 sentences)
Paint the picture of transformation. Use sensory language.
Include proof points. Address objections preemptively.

## Action (1-2 sentences)
Clear, specific CTA. Add urgency or scarcity if authentic.
Remove friction (risk reversal, guarantee).
```

**For Body Copy (PAS):**
```markdown
## Problem (2-3 sentences)
Name the specific pain. Show you understand deeply.
Use their language, not industry jargon.

## Agitate (2-4 sentences)
Amplify consequences of inaction.
"If you don't solve this, [bad outcome]"
Make the status quo unacceptable.

## Solution (3-5 sentences)
Introduce your offering as the answer.
Focus on transformation, not features.
Provide proof it works.
CTA with clear next step.
```

### Step 4: Generate Variations
```
For each variation:
1. Use different angle (benefit, curiosity, proof, urgency)
2. Vary sentence structure and length
3. Test different power words
4. Adjust formality level
```

### Step 5: Quality Check
```
- [ ] Speaks to ONE specific audience
- [ ] Leads with benefit, not feature
- [ ] Has clear, single CTA
- [ ] Passes the "so what?" test
- [ ] No jargon or buzzwords
- [ ] Appropriate length for medium
- [ ] Matches brand voice
```

## Output Format

```markdown
## Copy Brief
- Type: [type]
- Framework: [framework]
- Audience: [audience]
- Tone: [tone]

## Variations

### Option A: [Angle]
[Copy]

### Option B: [Angle]
[Copy]

### Option C: [Angle]
[Copy]

## Recommendation
[Which option and why]

## A/B Testing Suggestion
[Two options to test and hypothesis]
```

## Examples

### Headline Request
```
Input: Write headlines for a time-tracking SaaS
Output:
1. "Stop Guessing Where Your Hours Go" (Pain)
2. "Track Time in 2 Clicks. Bill Clients in 1." (Simplicity)
3. "The Time Tracker That Actually Gets Used" (Objection)
4. "Join 10,000+ Freelancers Who Never Miss a Billable Hour" (Proof)
5. "What If You Could Bill 5 More Hours This Week?" (Outcome)
```

### CTA Request
```
Input: CTA for free trial signup
Output:
1. "Start Your Free Trial" (Standard)
2. "See It In Action - Free for 14 Days" (Low commitment)
3. "Start Tracking Time Now - No Card Required" (Remove friction)
```
