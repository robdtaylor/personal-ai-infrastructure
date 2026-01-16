#!/bin/bash
#
# PAI Sanitization Verification Script
# ====================================
# Scans sanitized PAI directory for accidentally exposed credentials
# and personal information
#
# Usage: ./verify-sanitization.sh [directory-to-scan]
#
# Example: ./verify-sanitization.sh ~/.claude-public
#

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCAN_DIR="${1:-$HOME/.claude-public}"
ISSUES_FOUND=0

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  PAI Sanitization Verification${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Scanning:${NC} $SCAN_DIR"
echo ""

if [ ! -d "$SCAN_DIR" ]; then
  echo -e "${RED}Error: Directory does not exist: $SCAN_DIR${NC}"
  exit 1
fi

cd "$SCAN_DIR"

# Function to report issue
report_issue() {
  local severity=$1
  local message=$2
  local files=$3

  ISSUES_FOUND=$((ISSUES_FOUND + 1))

  if [ "$severity" = "CRITICAL" ]; then
    echo -e "${RED}❌ CRITICAL:${NC} $message"
  elif [ "$severity" = "WARNING" ]; then
    echo -e "${YELLOW}⚠️  WARNING:${NC} $message"
  else
    echo -e "${BLUE}ℹ️  INFO:${NC} $message"
  fi

  if [ -n "$files" ]; then
    echo "$files" | while read file; do
      if [ -n "$file" ]; then
        echo -e "   → ${file}"
      fi
    done
  fi
  echo ""
}

# Check 1: API Keys and Tokens
echo -e "${GREEN}[1/10] Checking for API keys and tokens...${NC}"

# Perplexity
PERPLEXITY_MATCHES=$(grep -r "pplx-" . 2>/dev/null || true)
if [ -n "$PERPLEXITY_MATCHES" ]; then
  report_issue "CRITICAL" "Perplexity API key found" "$PERPLEXITY_MATCHES"
else
  echo -e "  ${GREEN}✓${NC} No Perplexity keys found"
fi

# OpenAI
OPENAI_MATCHES=$(grep -r "sk-proj-" . 2>/dev/null || true)
if [ -n "$OPENAI_MATCHES" ]; then
  report_issue "CRITICAL" "OpenAI API key found" "$OPENAI_MATCHES"
else
  echo -e "  ${GREEN}✓${NC} No OpenAI keys found"
fi

# Google AI
GOOGLE_MATCHES=$(grep -r "AIzaSy" . 2>/dev/null || true)
if [ -n "$GOOGLE_MATCHES" ]; then
  report_issue "CRITICAL" "Google API key found" "$GOOGLE_MATCHES"
else
  echo -e "  ${GREEN}✓${NC} No Google API keys found"
fi

# JWT tokens
JWT_MATCHES=$(grep -r "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" . 2>/dev/null || true)
if [ -n "$JWT_MATCHES" ]; then
  report_issue "CRITICAL" "JWT token found" "$JWT_MATCHES"
else
  echo -e "  ${GREEN}✓${NC} No JWT tokens found"
fi

# Claude OAuth tokens
CLAUDE_TOKENS=$(grep -r "sk-ant-" . 2>/dev/null || true)
if [ -n "$CLAUDE_TOKENS" ]; then
  report_issue "CRITICAL" "Claude OAuth token found" "$CLAUDE_TOKENS"
else
  echo -e "  ${GREEN}✓${NC} No Claude tokens found"
fi

echo ""

# Check 2: Credential Files
echo -e "${GREEN}[2/10] Checking for credential files...${NC}"

if [ -f ".env" ]; then
  report_issue "CRITICAL" ".env file found (should be .env.example only)" ".env"
fi

if [ -f ".env.homeassistant" ]; then
  report_issue "CRITICAL" ".env.homeassistant file found" ".env.homeassistant"
fi

if [ -f ".credentials.json" ]; then
  report_issue "CRITICAL" ".credentials.json file found" ".credentials.json"
fi

if [ -f "credentials.json" ]; then
  report_issue "CRITICAL" "credentials.json file found" "credentials.json"
fi

if [ ! -f ".env" ] && [ ! -f ".env.homeassistant" ] && [ ! -f ".credentials.json" ]; then
  echo -e "  ${GREEN}✓${NC} No credential files found"
fi

echo ""

# Check 3: Sensitive Directories
echo -e "${GREEN}[3/10] Checking for sensitive directories...${NC}"

SENSITIVE_DIRS=("MEMORY" "history" "projects" "todos" "checkpoints" "session-env" "debug")
FOUND_SENSITIVE=false

for dir in "${SENSITIVE_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    report_issue "WARNING" "Sensitive directory found: $dir" "$dir"
    FOUND_SENSITIVE=true
  fi
done

if [ "$FOUND_SENSITIVE" = false ]; then
  echo -e "  ${GREEN}✓${NC} No sensitive directories found"
fi

echo ""

# Check 4: Personal Username
echo -e "${GREEN}[4/10] Checking for personal username...${NC}"

ROBDTAYLOR_MATCHES=$(grep -r "robdtaylor" . --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null | grep -v ".env.example" | grep -v "README" || true)
if [ -n "$ROBDTAYLOR_MATCHES" ]; then
  report_issue "WARNING" "Username 'robdtaylor' found" "$ROBDTAYLOR_MATCHES"
else
  echo -e "  ${GREEN}✓${NC} No username 'robdtaylor' found"
fi

# Check 5: Personal Paths
echo -e "${GREEN}[5/10] Checking for personal directory paths...${NC}"

ROBT_PATH_MATCHES=$(grep -r "/Users/robt" . --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null | grep -v ".env.example" || true)
if [ -n "$ROBT_PATH_MATCHES" ]; then
  report_issue "WARNING" "Personal path '/Users/robt' found" "$ROBT_PATH_MATCHES"
else
  echo -e "  ${GREEN}✓${NC} No personal paths found"
fi

echo ""

# Check 6: Private Network IPs
echo -e "${GREEN}[6/10] Checking for private network IPs (192.168.10.x)...${NC}"

PRIVATE_IP_MATCHES=$(grep -r "192\.168\.10\." . --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null || true)
if [ -n "$PRIVATE_IP_MATCHES" ]; then
  report_issue "WARNING" "Private network IP (192.168.10.x) found" "$PRIVATE_IP_MATCHES"
else
  echo -e "  ${GREEN}✓${NC} No private IPs (192.168.10.x) found"
fi

echo ""

# Check 7: SSH Passwords
echo -e "${GREEN}[7/10] Checking for hardcoded passwords...${NC}"

# Check for common password patterns
PASSWORD_PATTERNS=("password=" "PASSWORD=" "pwd=" "PWD=" "t021140171")
PASSWORD_FOUND=false

for pattern in "${PASSWORD_PATTERNS[@]}"; do
  MATCHES=$(grep -r "$pattern" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.example" 2>/dev/null || true)
  if [ -n "$MATCHES" ]; then
    report_issue "CRITICAL" "Potential password found: $pattern" "$MATCHES"
    PASSWORD_FOUND=true
  fi
done

if [ "$PASSWORD_FOUND" = false ]; then
  echo -e "  ${GREEN}✓${NC} No hardcoded passwords found"
fi

echo ""

# Check 8: Company-Specific Information
echo -e "${GREEN}[8/10] Checking for company-specific information...${NC}"

MNMUK_MATCHES=$(grep -r "MNMUK" . --exclude-dir=node_modules --exclude-dir=.git 2>/dev/null || true)
if [ -n "$MNMUK_MATCHES" ]; then
  report_issue "WARNING" "Company name 'MNMUK' found" "$MNMUK_MATCHES"
else
  echo -e "  ${GREEN}✓${NC} No company name 'MNMUK' found"
fi

echo ""

# Check 9: Proprietary Skills
echo -e "${GREEN}[9/10] Checking for proprietary skills...${NC}"

PROPRIETARY_SKILLS=("PlantCapability" "CNCSetup" "QuoteEstimator" "ToolCrib" "SkillsMatrix" "TribalKnowledge" "MaintenancePM" "KaiTodo" "ManufacturingDemo" "Context")
PROPRIETARY_FOUND=false

for skill in "${PROPRIETARY_SKILLS[@]}"; do
  if [ -d "skills/$skill" ]; then
    report_issue "WARNING" "Proprietary skill found: $skill" "skills/$skill"
    PROPRIETARY_FOUND=true
  fi
done

if [ "$PROPRIETARY_FOUND" = false ]; then
  echo -e "  ${GREEN}✓${NC} No proprietary skills found"
fi

echo ""

# Check 10: Git History
echo -e "${GREEN}[10/10] Checking git history for leaked credentials...${NC}"

if [ -d ".git" ]; then
  # Check if any .env files were ever committed
  ENV_IN_HISTORY=$(git log --all --name-only --pretty=format: | grep -E "\.env$|\.credentials\.json$" | sort -u || true)

  if [ -n "$ENV_IN_HISTORY" ]; then
    report_issue "CRITICAL" "Credential files found in git history" "$ENV_IN_HISTORY"
    echo -e "  ${YELLOW}⚠️  These files must be removed from git history using git-filter-repo or BFG${NC}"
  else
    echo -e "  ${GREEN}✓${NC} No credential files in git history"
  fi
else
  echo -e "  ${BLUE}ℹ️${NC}  No git repository initialized (skipping)"
fi

echo ""

# Summary
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Verification Summary${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

if [ $ISSUES_FOUND -eq 0 ]; then
  echo -e "${GREEN}✅ PASSED - No issues found!${NC}"
  echo ""
  echo -e "${GREEN}The sanitized directory is safe to publish.${NC}"
  echo ""
  echo -e "${YELLOW}Next steps:${NC}"
  echo "1. Manual review of Proxmox/Unifi skills for hardcoded credentials"
  echo "2. Review Infrastructure skill for any remaining private details"
  echo "3. Test installation in clean environment"
  echo "4. Proceed with git commit and push to public repository"
  echo ""
  exit 0
else
  echo -e "${RED}❌ FAILED - $ISSUES_FOUND issue(s) found${NC}"
  echo ""
  echo -e "${RED}Do NOT publish this directory until all issues are resolved!${NC}"
  echo ""
  echo -e "${YELLOW}Recommended actions:${NC}"
  echo "1. Review and fix all CRITICAL issues immediately"
  echo "2. Address WARNING issues for better privacy"
  echo "3. Re-run this verification script after fixes"
  echo "4. Consider running sanitization script again"
  echo ""
  exit 1
fi
