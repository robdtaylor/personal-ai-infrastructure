#!/bin/bash
#
# PAI Sanitization Script for Public Release
# ==========================================
# Creates a sanitized copy of PAI suitable for public sharing
#
# Usage: ./sanitize-for-public.sh [source-dir] [dest-dir]
#
# Example: ./sanitize-for-public.sh ~/.claude ~/.claude-public
#

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SOURCE_DIR="${1:-$HOME/.claude}"
DEST_DIR="${2:-$HOME/.claude-public}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  PAI Sanitization Script for Public Release${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Source:${NC} $SOURCE_DIR"
echo -e "${YELLOW}Destination:${NC} $DEST_DIR"
echo ""

# Validation
if [ ! -d "$SOURCE_DIR" ]; then
  echo -e "${RED}Error: Source directory does not exist: $SOURCE_DIR${NC}"
  exit 1
fi

if [ ! -f "$SOURCE_DIR/.env" ]; then
  echo -e "${RED}Warning: No .env file found. Have you rotated API keys?${NC}"
  read -p "Continue anyway? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Confirm overwrite if destination exists
if [ -d "$DEST_DIR" ]; then
  echo -e "${YELLOW}Destination directory exists and will be deleted.${NC}"
  read -p "Continue? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
  echo -e "${YELLOW}Removing existing destination...${NC}"
  rm -rf "$DEST_DIR"
fi

# Create clean destination
echo -e "${GREEN}Creating destination directory...${NC}"
mkdir -p "$DEST_DIR"

# Copy structure (exclude sensitive directories)
echo -e "${GREEN}Copying PAI structure...${NC}"
rsync -av \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='venv' \
  --exclude='.bun' \
  --exclude='dist' \
  --exclude='build' \
  --exclude='*.pyc' \
  --exclude='__pycache__' \
  --exclude='.env' \
  --exclude='.env.*' \
  --exclude='.credentials.json' \
  --exclude='credentials.json' \
  --exclude='secrets/' \
  --exclude='history' \
  --exclude='history.jsonl' \
  --exclude='history_old_backup/' \
  --exclude='history_to_remove/' \
  --exclude='file-history/' \
  --exclude='MEMORY/' \
  --exclude='debug/' \
  --exclude='projects/' \
  --exclude='todos/' \
  --exclude='checkpoints/' \
  --exclude='session-env/' \
  --exclude='shell-snapshots/' \
  --exclude='file-history/' \
  --exclude='statsig/' \
  --exclude='stats-cache.json' \
  --exclude='obs-embeddings.db' \
  --exclude='paste-cache/' \
  --exclude='plans/' \
  --exclude='telemetry/' \
  --exclude='cache/' \
  --exclude='.cache/' \
  --exclude='.DS_Store' \
  --exclude='Thumbs.db' \
  --exclude='.signals-state.json' \
  --exclude='agent-sessions.json' \
  --exclude='settings.local.json' \
  --exclude='logs/' \
  --exclude='*.log' \
  --exclude='*.error.log' \
  --exclude='docs/API-KEY-ROTATION-CHECKLIST.md' \
  --exclude='skills/MobileApp/sessions/' \
  --exclude='skills/MobileApp/.server.pid' \
  --exclude='skills/MobileApp/launchd.log' \
  --exclude='skills/MobileApp/server.log' \
  "$SOURCE_DIR/" "$DEST_DIR/"

echo -e "${GREEN}✓ Structure copied${NC}"

# Remove proprietary and infrastructure skills
echo -e "${GREEN}Removing proprietary and infrastructure skills...${NC}"

PROPRIETARY_SKILLS=(
  "PlantCapability"
  "CNCSetup"
  "QuoteEstimator"
  "ToolCrib"
  "SkillsMatrix"
  "TribalKnowledge"
  "MaintenancePM"
  "KaiTodo"
  "ManufacturingDemo"
  "Context"
  "Proxmox"
  "Unifi"
  "HomeAssistant"
  "Infrastructure"
  "n8n"
)

for skill in "${PROPRIETARY_SKILLS[@]}"; do
  if [ -d "$DEST_DIR/skills/$skill" ]; then
    echo -e "  ${YELLOW}→${NC} Removing: $skill"
    rm -rf "$DEST_DIR/skills/$skill"
  fi
done

echo -e "${GREEN}✓ Proprietary and infrastructure skills removed${NC}"

# Sanitize personal information in files
echo -e "${GREEN}Sanitizing personal information...${NC}"

find "$DEST_DIR" -type f \( -name "*.md" -o -name "*.ts" -o -name "*.js" -o -name "*.sh" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" \) | while read file; do
  # Skip node_modules and binary files
  if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *".git"* ]]; then
    continue
  fi

  # Replace personal identifiers
  sed -i '' "s|/Users/robt|/Users/youruser|g" "$file" 2>/dev/null || true
  sed -i '' "s|robdtaylor|youruser|g" "$file" 2>/dev/null || true
  sed -i '' "s|robt@|youruser@|g" "$file" 2>/dev/null || true

  # Replace network IPs (192.168.10.x → 192.168.1.x)
  sed -i '' "s|192\.168\.10\.|192.168.1.|g" "$file" 2>/dev/null || true

  # Replace company name
  sed -i '' "s|MNMUK|YOUR_COMPANY|g" "$file" 2>/dev/null || true

  # Replace AI identity
  sed -i '' "s|DA=Kai|DA=YourAssistant|g" "$file" 2>/dev/null || true
  sed -i '' "s|Name: Rob|Name: Your Name|g" "$file" 2>/dev/null || true
  sed -i '' "s|PAI_SOURCE_APP=Kai|PAI_SOURCE_APP=YourApp|g" "$file" 2>/dev/null || true

  # Replace Tailscale/private IPs with generic examples
  sed -i '' "s|100\.64\.[0-9]\+\.[0-9]\+|100.64.0.1|g" "$file" 2>/dev/null || true
done

echo -e "${GREEN}✓ Personal information sanitized${NC}"

# Create .env.example template
echo -e "${GREEN}Creating .env.example template...${NC}"

cat > "$DEST_DIR/.env.example" << 'EOF'
# PAI Environment Variables
# ==========================
# Copy this file to .env and fill in your actual values
#
# IMPORTANT: Never commit .env to version control!

# REQUIRED: System Configuration
# -------------------------------
DA=YourAssistant
PAI_DIR="$HOME/.claude"
TIME_ZONE=America/New_York
PAI_SOURCE_APP=YourApp

# OPTIONAL: Observability
# -----------------------
# PAI_OBSERVABILITY_URL=http://localhost:4000/events

# REQUIRED: API Keys
# ------------------
# Obtain these from respective service dashboards

# Perplexity API (https://www.perplexity.ai/settings/api)
PERPLEXITY_API_KEY=your_perplexity_key_here

# Google AI Studio (https://makersuite.google.com/app/apikey)
GOOGLE_API_KEY=your_google_api_key_here

# OpenAI Platform (https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_openai_key_here

# n8n Workflow Automation (http://localhost:5678/settings/api)
N8N_BASE_URL=http://localhost:5678
N8N_API_KEY=your_n8n_api_key_here
EOF

cat > "$DEST_DIR/.env.homeassistant.example" << 'EOF'
# Home Assistant Integration Credentials
# =======================================
# Required only if using HomeAssistant skill
#
# Copy to .env.homeassistant and fill in your values

# Home Assistant VM/Container SSH Access
HA_SSH_HOST=192.168.1.100
HA_SSH_USER=root
HA_SSH_PASSWORD=your_password_here

# Home Assistant Configuration Path (usually /config)
HA_CONFIG_PATH=/config

# Home Assistant API Token (Long-lived access token)
# Generate at: http://your-ha-instance:8123 → Profile → Security
HA_API_TOKEN=your_ha_long_lived_access_token_here
EOF

echo -e "${GREEN}✓ Environment templates created${NC}"

# Sanitize settings.json → settings.json.example
if [ -f "$DEST_DIR/settings.json" ]; then
  echo -e "${GREEN}Creating settings.json.example...${NC}"

  # Use jq to remove personal env vars and replace with placeholders
  jq 'del(.env.DA) | del(.env.PAI_SOURCE_APP) | .env.PAI_DIR = "$HOME/.claude"' \
    "$DEST_DIR/settings.json" > "$DEST_DIR/settings.json.example"

  # Remove original settings.json (users should copy from example)
  rm "$DEST_DIR/settings.json"

  echo -e "${GREEN}✓ settings.json.example created${NC}"
fi

# Create sanitization documentation
echo -e "${GREEN}Creating sanitization documentation...${NC}"

cat > "$DEST_DIR/README-SANITIZATION.md" << 'EOF'
# Sanitized PAI Installation

This directory contains a **sanitized version** of the Personal AI Infrastructure, safe for public sharing and collaboration.

## What Was Removed

### Credentials & Secrets
- All API keys and authentication tokens
- OAuth credentials (.credentials.json)
- Environment files (.env, .env.*)
- SSH passwords and access tokens

### Personal Information
- Real names, usernames, email addresses
- Home directory paths (replaced with generic placeholders)
- Private network topology (IPs sanitized: 192.168.10.x → 192.168.1.x)
- Internal infrastructure details

### Runtime & Session Data
- MEMORY/ directory (learning history, signals, failures)
- Session history and conversation logs
- Checkpoints and runtime state
- Todo lists and project files
- Debug logs and telemetry

### Proprietary & Infrastructure Content
- Company-specific skills (MNMUK manufacturing skills)
- Infrastructure management skills (Proxmox, Unifi, HomeAssistant, n8n)
- Custom integrations with internal systems
- Tribal knowledge databases
- Personal Obsidian vault integration
- Private network infrastructure documentation

## What Was Sanitized

| Original | Sanitized | Reason |
|----------|-----------|--------|
| `/Users/robt` | `/Users/youruser` | Personal home directory |
| `robdtaylor` | `youruser` | GitHub username |
| `192.168.10.x` | `192.168.1.x` | Private network IPs |
| `MNMUK` | `YOUR_COMPANY` | Company name |
| `Rob` | `Your Name` | Personal name |
| `Kai` | `YourAssistant` | AI identity |

## What Was Kept

✅ All skill structures and documentation
✅ Hook system and automation patterns
✅ Architecture and system design
✅ Installation scripts and tools
✅ Example configurations and templates

## Configuration Required

To use this sanitized PAI installation:

### 1. Environment Variables

```bash
# Copy template and add your keys
cp .env.example .env
nano .env  # Add your API keys

# If using Home Assistant skill:
cp .env.homeassistant.example .env.homeassistant
nano .env.homeassistant  # Add your HA credentials
```

### 2. Settings Configuration

```bash
# Copy and customize settings
cp settings.json.example settings.json
nano settings.json  # Update paths, env vars, hooks
```

### 3. Skill-Specific Configuration

Some skills require additional setup:

- **Proxmox**: Add your API token in `skills/Proxmox/proxmox-cli.sh`
- **Unifi**: Create `skills/Unifi/config.json` from template
- **n8n**: Configure n8n instance URL and API key in .env
- **Infrastructure**: Update server list with your infrastructure

### 4. Permissions

Secure your credential files:

```bash
chmod 600 .env
chmod 600 .env.homeassistant
chmod 600 .credentials.json  # If you have one
```

## Security Best Practices

1. **Never commit .env files** - They're in .gitignore for a reason
2. **Use password managers** - Store API keys securely
3. **Rotate credentials regularly** - Especially if working in teams
4. **Review before sharing** - Always check for accidental credential exposure
5. **Use environment-specific configs** - Keep dev/prod credentials separate

## Maintaining Your Copy

### Private vs Public

Consider maintaining two versions:

- **Private repo**: Your full PAI with real credentials and proprietary skills
- **Public repo**: This sanitized version for sharing and collaboration

### Syncing Updates

When updating the public version from your private installation:

```bash
# Run sanitization script again
cd ~/.claude
./scripts/sanitize-for-public.sh ~/.claude ~/.claude-public

# Review changes
cd ~/.claude-public
git diff

# Commit and push sanitized updates
git add .
git commit -m "Update: [description]"
git push
```

## Getting Help

If you encounter issues:

1. Check skill documentation in `skills/*/SKILL.md`
2. Review the main PAI documentation
3. Verify all required environment variables are set
4. Ensure file permissions are correct
5. Check Claude Code logs for errors

## Contributing

When contributing back to the public repository:

- Ensure no credentials in your changes
- Use generic placeholders for personal info
- Test in a clean environment before submitting
- Document any new configuration requirements

---

**Generated by:** PAI Sanitization Script
**Date:** $(date +"%Y-%m-%d %H:%M:%S")
**Purpose:** Safe public sharing of Personal AI Infrastructure
EOF

echo -e "${GREEN}✓ Documentation created${NC}"

# Generate summary report
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Sanitization Complete${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}Sanitized PAI created at:${NC} $DEST_DIR"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Review the sanitized copy manually"
echo "2. Check README-SANITIZATION.md for details"
echo "3. Run security verification: scripts/verify-sanitization.sh $DEST_DIR"
echo "4. If verified, proceed with publishing"
echo ""
echo -e "${RED}⚠️  IMPORTANT REMINDERS:${NC}"
echo "• Manually review Proxmox/Unifi skills for hardcoded credentials"
echo "• Check Infrastructure skill for private network details"
echo "• Verify skill-index.json doesn't reference removed skills"
echo "• Test in clean environment before publishing"
echo ""
