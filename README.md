# Personal AI Infrastructure (PAI)

A skills-based context management system for [Claude Code](https://docs.anthropic.com/en/docs/claude-code). PAI extends Claude Code with domain-specific knowledge, custom workflows, and automated session management.

## What is PAI?

PAI is a personal AI infrastructure layer that sits on top of Claude Code, providing:

- **Skills System** - Modular context packages that load relevant knowledge on-demand
- **Hook System** - Event-driven automation for session lifecycle management
- **Memory System** - Session history, learnings, and signal capture
- **Custom Commands** - Slash commands for common workflows

## Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed and authenticated
- [Bun](https://bun.sh/) runtime (for hooks and tools)
- macOS or Linux (Windows via WSL)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/robdtaylor/personal-ai-infrastructure.git ~/.claude
```

> **Note:** If you already have a `~/.claude` directory, back it up first:
> ```bash
> mv ~/.claude ~/.claude-backup
> ```

### 2. Copy and configure settings

```bash
cd ~/.claude
cp settings.json.template settings.json
```

Edit `settings.json` to customize:
- Environment variables
- Hook configurations
- Permission settings

### 3. Install dependencies

```bash
# Install Bun if not already installed
curl -fsSL https://bun.sh/install | bash

# Install hook dependencies
cd ~/.claude/hooks && bun install
```

### 4. Personalize your setup

Edit the following files in `skills/CORE/USER/`:

| File | Purpose |
|------|---------|
| `BASICINFO.md` | Your contact information |
| `CONTACTS.md` | Directory of people you work with |
| `ABOUTME.md` | Personal background for AI context |
| `DAIDENTITY.md` | AI assistant name and personality |
| `TECHSTACKPREFERENCES.md` | Your preferred technologies |

### 5. Verify installation

```bash
claude
```

You should see the PAI context load at session start.

## Directory Structure

```
~/.claude/
├── skills/           # Skill packages (context modules)
│   ├── CORE/         # Core identity and system docs
│   ├── Research/     # Multi-source research workflows
│   ├── Browser/      # Web automation
│   └── ...           # Domain-specific skills
├── hooks/            # Event-driven automation
├── commands/         # Custom slash commands
├── bin/              # CLI tools and utilities
├── MEMORY/           # Session history and learnings
└── settings.json     # Claude Code configuration
```

## Skills Included

### Manufacturing & Operations
- **AutomotiveManufacturing** - IATF 16949, work instructions, SOPs
- **A3CriticalThinking** - Toyota-style problem solving
- **CNCSetup** - Machine setup sheets
- **CuttingParams** - Feeds and speeds reference
- **PlantCapability** - Machine shop capabilities
- **QuoteEstimator** - Cycle time and cost estimation
- **SkillsMatrix** - Operator competency tracking
- **ToolCrib** - Tool inventory management
- **TribalKnowledge** - Expertise capture
- **MaintenancePM** - Preventive maintenance schedules
- **HoshinKanri** - Strategy deployment (X-Matrix, catchball)
- **SapEcc** - SAP transaction codes and processes
- **SupplyChain** - Purchasing and materials management

### Business & Strategy
- **BusinessStrategy** - Financial analysis, valuations, business plans
- **PowerPlatform** - Power Automate flow generation

### Infrastructure & Automation
- **HomeAssistant** - Smart home integration
- **Infrastructure** - Network services and endpoints
- **MobileApp** - Mobile web interface for PAI
- **Proxmox** - VM management
- **Unifi** - Network monitoring
- **n8n** - Workflow automation

### AI & Research
- **Research** - Multi-source parallel research
- **AgentObservability** - Real-time agent monitoring dashboard
- **PhotoRealisticArt** - AI image generation prompting
- **Art** - Excalidraw-style visualizations

### Core
- **CORE** - Identity, preferences, security protocols
- **Browser** - Web automation and verification
- **Context** - Obsidian vault integration
- **CreateSkill** - Skill authoring tools
- **Upgrades** - Track Claude Code updates

## Creating Custom Skills

Skills are modular context packages. Create a new skill:

```bash
mkdir -p ~/.claude/skills/MySkill
```

Create `SKILL.md`:

```markdown
---
name: MySkill
description: Brief description. USE WHEN user says 'keyword1', 'keyword2'.
---

# MySkill

## Overview
What this skill does...

## Workflows
- WorkflowName: Description

## Reference
Key information the AI should know...
```

Regenerate the skill index:

```bash
bun run ~/.claude/tools/GenerateSkillIndex.ts
```

## Hooks

PAI uses Claude Code's hook system for automation:

| Hook | Purpose |
|------|---------|
| `SessionStart` | Load core context, initialize session |
| `PreToolUse` | Security validation for Bash commands |
| `PostToolUse` | Capture signals and checkpoints |
| `Stop` | Capture learnings and session summary |

Configure hooks in `settings.json`.

## Custom Commands

Slash commands are defined in `~/.claude/commands/`. Example:

```markdown
# /mycommand

Description of what this command does.

## Instructions

Steps for the AI to follow...
```

## Configuration

### Environment Variables

Set in `settings.json` under `env`:

```json
{
  "env": {
    "PAI_DIR": "$HOME/.claude",
    "TIME_ZONE": "Europe/London"
  }
}
```

### Security

The `security-validator.ts` hook blocks dangerous bash commands. Customize patterns in `skills/CORE/USER/PAISECURITYSYSTEM/patterns.yaml`.

## Troubleshooting

### Hooks not running

1. Check Bun is installed: `bun --version`
2. Verify hook paths in `settings.json`
3. Check hook file permissions: `chmod +x ~/.claude/hooks/*.ts`

### Skills not loading

1. Regenerate skill index: `bun run ~/.claude/tools/GenerateSkillIndex.ts`
2. Check skill has valid YAML frontmatter in `SKILL.md`

### Context not appearing

1. Verify `load-core-context.ts` hook is configured in SessionStart
2. Check `CORE/SKILL.md` exists and has valid content

## Contributing

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details.

## Acknowledgments

Built for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) by Anthropic.
