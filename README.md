# Personal AI Infrastructure (PAI)

A skills-based context management system for [Claude Code](https://docs.anthropic.com/en/docs/claude-code). PAI extends Claude Code with domain-specific knowledge, custom workflows, and automated session management - focused on **automotive manufacturing operations**.

## What is PAI?

PAI is a personal AI infrastructure layer that sits on top of Claude Code, providing:

- **Skills System** - Modular context packages that load relevant knowledge on-demand
- **Hook System** - Event-driven automation for session lifecycle management
- **Memory System** - Session history, learnings, and signal capture
- **Custom Commands** - Slash commands for common workflows

This repository contains **38 automotive manufacturing skills** covering IATF 16949 quality management, CNC operations, damper engineering, business operations, and plant management.

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

### 4. Verify installation

```bash
claude
```

You should see the PAI context load at session start.

## Directory Structure

```
~/.claude/
├── skills/           # Skill packages (context modules)
│   ├── Pfmea/        # Process FMEA generation
│   ├── Spc/          # Statistical Process Control
│   ├── Cncsetup/     # CNC setup sheets
│   └── ...           # 38 automotive manufacturing skills
├── hooks/            # Event-driven automation
├── commands/         # Custom slash commands
├── bin/              # CLI tools and utilities
├── MEMORY/           # Session history and learnings
└── settings.json     # Claude Code configuration
```

## Skills Included (38)

### IATF 16949 Quality Management
| Skill | Description |
|-------|-------------|
| **Pfmea** | AIAG-VDA compliant Process FMEAs with S/O/D ratings and RPN calculations |
| **Spc** | SPC charting, process capability (Cpk/Ppk), control chart interpretation |
| **Msa** | Gage R&R studies per AIAG MSA manual |
| **Controlplan** | AIAG-format Control Plans linked to PFMEAs |
| **Eightd** | 8D problem solving with containment and root cause analysis |
| **Internalaudit** | IATF 16949 internal audit programme support |
| **A3criticalthinking** | Toyota-style structured problem solving |
| **Apqpppap** | APQP phase gates and PPAP 18-element documentation |

### Manufacturing Operations
| Skill | Description |
|-------|-------------|
| **Cncsetup** | Standardized CNC setup sheets (DMG MORI, CITIZEN, MITSUBISHI EDM, Haas) |
| **Cuttingparams** | Feeds, speeds, and depths of cut for common materials |
| **Plantcapability** | Machine shop capability checking and machine selection |
| **Maintenancepm** | Preventive maintenance schedules for shop equipment |
| **Toolcrib** | Tool inventory management with reorder points |
| **Assemblyoperations** | LVA and FML assembly guidance (kitting, torque, poka-yoke) |
| **Tribalknowledge** | Machinist expertise capture and preservation |
| **Quoteestimator** | Rough cycle time and cost estimation |
| **Skillsmatrix** | Operator training and competency tracking |

### Damper Engineering
| Skill | Description |
|-------|-------------|
| **DamperEngineering** | Hydraulic damper design - DSSV valves, seals, materials |
| **Damperassembly** | Dept 71 DSSV damper assembly operations |
| **StructuralFEA** | Open source FEA structural analysis (CalculiX) |

### Business Operations
| Skill | Description |
|-------|-------------|
| **Commercialsales** | RFQ processing, contract review, customer management |
| **Costengineering** | Manufacturing cost analysis, make vs buy, value engineering |
| **Supplychain** | Strategic purchasing, supplier development, materials management |
| **Shippinglogistics** | UK/US/Canadian shipping, customs, tariffs, HS codes |
| **Sapecc** | SAP ECC operations (MM, PP, SD, QM, PM, FICO) |
| **Powerplatform** | Power Automate flow generation from natural language |
| **Msoffice** | Word/PowerPoint document creation |

### Management & Strategy
| Skill | Description |
|-------|-------------|
| **Hoshinkanri** | Strategic policy deployment (X-Matrix, catchball, bowling charts) |
| **Automotivegm** | Plant GM / Executive VP operations expertise |
| **Directorofoperations** | Multi-plant operations leadership perspective |
| **Automotivemanufacturing** | Manufacturing SOPs and work instructions (IATF 16949/ISO 9001) |
| **Automotiveproductplanning** | 5-10 year product planning for specialist vehicle manufacturers |
| **Businessstrategy** | Financial analysis, P&L, valuations, competitive analysis |
| **Healthsafety** | UK H&S management (risk assessments, COSHH, LOTO) |
| **Ukhradviser** | UK employment law, ACAS procedures, HR guidance |

### General Utility
| Skill | Description |
|-------|-------------|
| **Algorithm** | Universal 7-phase execution pattern for structured work |
| **Council** | Multi-perspective deliberation for complex decisions |
| **Manufacturingdemo** | Demo manufacturing knowledge base |

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

## Troubleshooting

### Hooks not running

1. Check Bun is installed: `bun --version`
2. Verify hook paths in `settings.json`
3. Check hook file permissions: `chmod +x ~/.claude/hooks/*.ts`

### Skills not loading

1. Regenerate skill index: `bun run ~/.claude/tools/GenerateSkillIndex.ts`
2. Check skill has valid YAML frontmatter in `SKILL.md`

## Contributing

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details.

## Acknowledgments

Built for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) by Anthropic.
