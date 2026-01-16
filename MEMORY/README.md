# MEMORY System

PAI's persistent memory architecture based on Daniel Miessler's Personal AI Infrastructure.

**Reference:** https://github.com/danielmiessler/Personal_AI_Infrastructure

## Three-Tier Architecture

| Tier | Temperature | Purpose | Location |
|------|-------------|---------|----------|
| **Capture** | Hot | Active work with real-time traces | `Work/` |
| **Synthesis** | Warm | Learnings organized by algorithm phase | `Learning/` |
| **Application** | Cold | Immutable historical archive | `History/` |

## Directory Structure

```
MEMORY/
├── History/              # Permanent recordings (Cold)
│   ├── research/         # Research outputs
│   ├── sessions/         # Session summaries
│   ├── learnings/        # Learning moments
│   ├── decisions/        # Architectural decisions
│   └── raw-outputs/      # JSONL event streams
│
├── Learning/             # Phase-based curated insights (Warm)
│   ├── OBSERVE/          # Context-gathering learnings
│   ├── THINK/            # Hypothesis generation
│   ├── PLAN/             # Execution planning
│   ├── BUILD/            # Success criteria
│   ├── EXECUTE/          # Implementation insights
│   ├── VERIFY/           # Verification findings
│   └── ALGORITHM/        # Meta-learnings
│
├── State/                # Real-time operational data
│   ├── algorithm-stats.json
│   ├── algorithm-streak.json
│   └── active-work.json
│
├── Signals/              # Pattern detection
│   ├── failures.jsonl    # Failed attempts for analysis
│   ├── loopbacks.jsonl   # Detected loops/rework
│   ├── patterns.jsonl    # Recurring patterns
│   └── ratings.jsonl     # Quality ratings
│
└── Work/                 # Active task memory (Hot)
    └── [Task-Name_TIMESTAMP]/
```

## Algorithm Phases

The Learning directory organizes insights by the seven phases of the execution algorithm:

| Phase | Purpose |
|-------|---------|
| **OBSERVE** | Context gathering, reading existing code/docs |
| **THINK** | Hypothesis generation, problem analysis |
| **PLAN** | Execution planning, breaking down tasks |
| **BUILD** | Defining success criteria and approach |
| **EXECUTE** | Implementation, writing code |
| **VERIFY** | Testing, validation, review |
| **ALGORITHM** | Meta-learnings about the process itself |

## Event Capture

Events are captured automatically via hooks:

- **SessionStart**: Session initialization logged
- **UserPromptSubmit**: User inputs captured
- **PreToolUse/PostToolUse**: Tool invocations logged
- **Stop/SubagentStop**: Session/agent termination captured
- **SessionEnd**: Full session summary generated

## File Formats

- **Session summaries**: Markdown with YAML frontmatter
- **Event logs**: JSONL (JSON Lines) format
- **Learnings**: Markdown with structured headers
- **State**: JSON files
- **Signals**: JSONL for easy grep/analysis

## Usage

### Capture a learning
```bash
# Add to appropriate phase directory
echo "Learning content" >> MEMORY/Learning/EXECUTE/2026-01-08_learning.md
```

### Log a signal
```bash
# Append JSONL entry
echo '{"timestamp":"2026-01-08T21:00:00Z","type":"failure","context":"..."}' >> MEMORY/Signals/failures.jsonl
```

### Start active work
```bash
# Create task directory
mkdir -p MEMORY/Work/feature-auth_20260108-2100
```

## Privacy

This directory contains interaction history. Keep it private:

```gitignore
MEMORY/History/raw-outputs/
MEMORY/History/sessions/
MEMORY/Signals/
MEMORY/Work/
```

## Related

- Miessler's PAI: https://github.com/danielmiessler/Personal_AI_Infrastructure
- Hook config: `~/.claude/skills/CORE/SYSTEM/THEHOOKSYSTEM.md`
