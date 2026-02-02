---
name: Algorithm
description: Universal 7-phase execution pattern for all work. USE WHEN starting complex tasks, needing structured approach, defining success criteria, or tracking work phases.
---

# The Algorithm

A universal 7-phase scientific methodology for approaching any task—from fixing typos to building systems. Every interaction generates learning signals that feed back into continuous improvement.

**Philosophy:** Define success BEFORE execution. Verify AFTER completion. Learn ALWAYS.

## The Seven Phases

### 1. OBSERVE
**Purpose:** Gather context and understand current state.

**Actions:**
- Read relevant files and documentation
- Search codebase for patterns
- Understand existing architecture
- Document constraints and dependencies
- Identify what already exists

**Signals:** Tool use patterns (Read, Glob, Grep dominant)

**Questions to answer:**
- What exists currently?
- What are the constraints?
- What are the dependencies?
- What has been tried before?

---

### 2. THINK
**Purpose:** Generate potential solutions—multiple approaches, not just the first idea.

**Actions:**
- Brainstorm at least 2-3 approaches
- Consider trade-offs for each
- Evaluate feasibility and complexity
- Identify risks and unknowns
- Challenge assumptions

**Signals:** Extended reasoning, multiple options presented

**Questions to answer:**
- What are the possible approaches?
- What are the trade-offs?
- What could go wrong?
- What assumptions am I making?

---

### 3. PLAN
**Purpose:** Select approach and sequence the work.

**Actions:**
- Choose the best approach with rationale
- Break into concrete steps
- Identify checkpoints and milestones
- Note potential blockers
- Set the order of operations

**Signals:** TodoWrite usage, step enumeration

**Questions to answer:**
- What's the order of operations?
- What are the milestones?
- Where might I need to pivot?
- What's the minimal viable path?

---

### 4. BUILD (Define Success)
**Purpose:** Create Ideal State Criteria (ISC) table BEFORE execution.

**Actions:**
- Define measurable success criteria
- Set pass/fail thresholds
- Specify verification methods
- Document expected outcomes
- Create ISC table

**Output:** ISC Table (see `Workflows/isc-table.md`)

**Questions to answer:**
- How will I know this worked?
- What's the measurable outcome?
- What tests prove success?
- What would failure look like?

---

### 5. EXECUTE
**Purpose:** Perform the work according to the plan.

**Actions:**
- Follow the planned steps
- Use appropriate tools and agents
- Log progress and deviations
- Capture unexpected findings
- Adapt to obstacles (but note why)

**Signals:** Write, Edit, Bash tool usage

**Questions to answer:**
- Am I following the plan?
- What deviations occurred and why?
- What unexpected findings emerged?

---

### 6. VERIFY
**Purpose:** Test against ISC criteria with skeptical evaluation.

**Actions:**
- Run all verification methods from ISC
- Document pass/fail for each criterion
- Identify gaps or partial passes
- Get external validation if needed
- Be skeptical—look for what might be wrong

**Signals:** Test commands, validation runs

**Questions to answer:**
- Does each criterion pass?
- What edge cases exist?
- Would a skeptic accept this?
- What could still be wrong?

---

### 7. LEARN
**Purpose:** Extract insights and iterate.

**Actions:**
- Document what worked and what didn't
- Capture insights for future reference
- Identify patterns (positive and negative)
- Update personal knowledge base
- Generate improvement signals

**Output:** Learning entry in `MEMORY/Learning/[PHASE]/`

**Questions to answer:**
- What worked well?
- What should I do differently?
- What patterns emerged?
- What should I remember?

---

## Effort Classification

Classify tasks by effort to calibrate the depth of algorithm application:

| Level | Description | Algorithm Depth |
|-------|-------------|-----------------|
| **TRIVIAL** | Single action, obvious approach | Skip to EXECUTE |
| **SIMPLE** | Few steps, clear path | Light PLAN → EXECUTE → VERIFY |
| **MODERATE** | Multiple steps, some decisions | Full algorithm, brief phases |
| **COMPLEX** | Many steps, significant decisions | Full algorithm, thorough phases |
| **DETERMINED** | Novel problem, research required | Full algorithm with iteration |

---

## Phase Transitions

**OBSERVE → THINK:** When you understand the current state well enough to generate options.

**THINK → PLAN:** When you've identified at least 2 viable approaches and can justify your choice.

**PLAN → BUILD:** When you have concrete steps and need to define what success looks like.

**BUILD → EXECUTE:** When ISC table is complete and you know exactly what to build.

**EXECUTE → VERIFY:** When implementation is complete (not when you think it's done—when the code is written).

**VERIFY → LEARN:** When all ISC criteria have been evaluated (pass or fail).

**LEARN → (Loop):** When insights suggest iteration is needed, return to appropriate phase.

---

## Integration with Learning Signals

Every algorithm execution generates signals:

- **Phase tracking:** Current phase stored in `MEMORY/State/algorithm-state.json`
- **Ratings:** Quality rating (1-5) captured at session end
- **Patterns:** Tool sequences fingerprinted for recurring behavior
- **Failures:** Categorized for root cause analysis

---

## Workflows

- `Workflows/isc-table.md` - Creating Ideal State Criteria tables
- `Workflows/execute-algorithm.md` - Full algorithm execution template
- `Workflows/phase-checklist.md` - Quick checklist for each phase

---

## Examples

**Example 1: Bug fix (SIMPLE)**
```
User: "Fix the null pointer in auth.ts line 42"
→ OBSERVE: Read auth.ts, understand the null case
→ PLAN: Add null check before access
→ EXECUTE: Edit the file
→ VERIFY: Run tests
→ LEARN: Note the pattern for future
```

**Example 2: New feature (COMPLEX)**
```
User: "Add dark mode support"
→ OBSERVE: Check existing theme system, CSS architecture
→ THINK: CSS variables vs styled-components vs Tailwind dark:
→ PLAN: 1) Add theme context, 2) Create toggle, 3) Update components
→ BUILD: ISC table with criteria for each component
→ EXECUTE: Implement step by step
→ VERIFY: Test toggle, persistence, all components
→ LEARN: Document theme system patterns
```

**Example 3: Research task (DETERMINED)**
```
User: "Investigate why builds are slow"
→ OBSERVE: Profile build, check configs, review recent changes
→ THINK: Could be dependencies, could be config, could be CI
→ PLAN: Profile locally, then CI, then compare
→ BUILD: ISC = "Identify root cause with evidence"
→ EXECUTE: Run profiling, collect data
→ VERIFY: Can we reproduce? Is evidence clear?
→ LEARN: Document findings, recommend fixes
```
