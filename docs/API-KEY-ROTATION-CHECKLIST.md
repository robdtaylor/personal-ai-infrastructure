# API Key Rotation Checklist

**CRITICAL:** Complete ALL rotations before publishing PAI to public repository.

**Created:** 2026-01-15
**Status:** ⏸️ PENDING
**Estimated time:** 2-3 hours (cannot be rushed - test each rotation)

---

## Overview

This checklist ensures all exposed credentials are rotated before sanitization. Complete sequentially, testing after each rotation.

## Rotation Order (Lowest Impact First)

### 1. Perplexity API Key ⏸️

**Current exposure:** `~/.claude/.env`
**Service:** https://www.perplexity.ai/settings/api

**Steps:**
- [ ] Login to Perplexity account
- [ ] Navigate to Settings → API
- [ ] Generate new API key
- [ ] Copy new key
- [ ] Update `~/.claude/.env` → `PERPLEXITY_API_KEY=<new_key>`
- [ ] Test Research skill: `/research test query`
- [ ] Verify functionality works
- [ ] Delete old API key in Perplexity dashboard
- [ ] Record completion date: ___________

**Test command:**
```bash
# Verify new key works
grep PERPLEXITY_API_KEY ~/.claude/.env
cd ~/.claude && claude "test perplexity connection"
```

---

### 2. Google AI API Key ⏸️

**Current exposure:** `~/.claude/.env`
**Service:** https://makersuite.google.com/app/apikey

**Steps:**
- [ ] Login to Google AI Studio
- [ ] Navigate to API Keys section
- [ ] Create new API key
- [ ] Copy new key
- [ ] Update `~/.claude/.env` → `GOOGLE_API_KEY=<new_key>`
- [ ] Test any skills using Google AI (Research skill uses this)
- [ ] Verify functionality works
- [ ] Delete old API key in Google AI Studio
- [ ] Record completion date: ___________

**Test command:**
```bash
# Verify new key updated
grep GOOGLE_API_KEY ~/.claude/.env
```

---

### 3. OpenAI API Key ⏸️

**Current exposure:** `~/.claude/.env`
**Service:** https://platform.openai.com/api-keys

**Steps:**
- [ ] Login to OpenAI Platform
- [ ] Navigate to API Keys
- [ ] Create new secret key (name it: "PAI-2026-01")
- [ ] Copy new key (only shown once!)
- [ ] Update `~/.claude/.env` → `OPENAI_API_KEY=<new_key>`
- [ ] Test any OpenAI-dependent skills
- [ ] Verify functionality works
- [ ] Revoke old API key in OpenAI dashboard
- [ ] Record completion date: ___________

**Test command:**
```bash
# Verify new key updated
grep OPENAI_API_KEY ~/.claude/.env | head -c 50
```

---

### 4. n8n API Key ⏸️

**Current exposure:** `~/.claude/.env`
**Service:** http://localhost:5678

**Steps:**
- [ ] Open n8n web interface (http://localhost:5678)
- [ ] Navigate to Settings → API
- [ ] Create new API key
- [ ] Copy new key (JWT token)
- [ ] Update `~/.claude/.env` → `N8N_API_KEY=<new_key>`
- [ ] Test n8n skill: Check workflow list
- [ ] Verify functionality works
- [ ] Delete old API key in n8n settings
- [ ] Record completion date: ___________

**Test command:**
```bash
# Verify n8n connection
curl -H "X-N8N-API-KEY: $(grep N8N_API_KEY ~/.claude/.env | cut -d'=' -f2)" \
  http://localhost:5678/api/v1/workflows | jq .
```

---

### 5. Home Assistant API Token ⏸️

**Current exposure:** `~/.claude/.env.homeassistant`
**Service:** Home Assistant instance (http://192.168.10.114:8123)

**Steps:**
- [ ] Login to Home Assistant web UI
- [ ] Click profile icon → Security tab
- [ ] Scroll to "Long-Lived Access Tokens"
- [ ] Create new token (name: "PAI-Claude-2026")
- [ ] Copy new token
- [ ] Update `~/.claude/.env.homeassistant` → `HA_API_TOKEN=<new_token>`
- [ ] Test HomeAssistant skill
- [ ] Verify can query entities/state
- [ ] Revoke old token in HA Security tab
- [ ] Record completion date: ___________

**Test command:**
```bash
# Verify HA API access
source ~/.claude/.env.homeassistant
curl -H "Authorization: Bearer $HA_API_TOKEN" \
  -H "Content-Type: application/json" \
  http://$HA_SSH_HOST:8123/api/ | jq .
```

---

### 6. Home Assistant SSH Password ⚠️ CRITICAL

**Current exposure:** `~/.claude/.env.homeassistant` (PLAINTEXT!)
**Service:** Home Assistant VM SSH

**Steps:**
- [ ] SSH into Home Assistant VM: `ssh root@192.168.10.114`
- [ ] Run: `passwd` to change root password
- [ ] Enter current password: `t021140171`
- [ ] Enter new secure password (use password manager!)
- [ ] Confirm new password
- [ ] Update `~/.claude/.env.homeassistant` → `HA_SSH_PASSWORD=<new_password>`
- [ ] Test SSH connection with new password
- [ ] Verify HomeAssistant skill SSH operations work
- [ ] Record completion date: ___________

**Test command:**
```bash
# Test new SSH password
source ~/.claude/.env.homeassistant
sshpass -p "$HA_SSH_PASSWORD" ssh -o StrictHostKeyChecking=no \
  $HA_SSH_USER@$HA_SSH_HOST "echo 'SSH connection successful'"
```

**⚠️ SECURITY NOTE:** Consider SSH key-based auth instead of password after rotation.

---

### 7. Proxmox API Token ⏸️

**Current exposure:**
- `~/.claude/skills/Proxmox/SKILL.md` (in documentation examples)
- `~/.claude/skills/Proxmox/proxmox-cli.sh` (hardcoded in script)

**Service:** Proxmox VE (https://192.168.10.205:8006)

**Steps:**
- [ ] Login to Proxmox web UI
- [ ] Navigate to Datacenter → Permissions → API Tokens
- [ ] Create new token:
  - User: `claude@pve`
  - Token ID: `Claude2` (or `Claude-2026`)
  - Privilege Separation: Unchecked (if you want full user permissions)
- [ ] Copy **Token Secret** (only shown once!)
- [ ] Full token format: `claude@pve!Claude2=<secret>`
- [ ] Update `~/.claude/skills/Proxmox/proxmox-cli.sh`:
  ```bash
  # Line ~8
  TOKEN="claude@pve!Claude2=<new_secret_here>"
  ```
- [ ] Update `~/.claude/skills/Proxmox/SKILL.md`:
  - Replace all occurrences of old token with new token
  - Or replace with placeholder: `claude@pve!YourToken=<your-secret>`
- [ ] Test Proxmox skill: Query VM status
- [ ] Verify can list VMs and check status
- [ ] Delete old API token (`claude@pve!Claude`) in Proxmox UI
- [ ] Record completion date: ___________

**Test command:**
```bash
# Test new Proxmox token
cd ~/.claude/skills/Proxmox
./proxmox-cli.sh status  # Should list VMs
```

---

## Verification

After completing ALL rotations, verify no old credentials remain:

```bash
# Check for old Perplexity key pattern
grep -r "pplx-8tpFg" ~/.claude/
# Expected: No matches found

# Check for old OpenAI key pattern (first 20 chars)
grep -r "sk-proj-N1x4s" ~/.claude/
# Expected: No matches found

# Check for old Google key pattern
grep -r "AIzaSyBTvQg7-" ~/.claude/
# Expected: No matches found

# Check for old Home Assistant password
grep -r "t021140171" ~/.claude/
# Expected: No matches found

# Check for old Proxmox token
grep -r "256d99ca-9bf5-4024-96ba-fa4d19d4c091" ~/.claude/
# Expected: No matches found
```

## Post-Rotation Security

### File Permission Fixes

```bash
# Secure .env files (should be 600, not world-readable)
chmod 600 ~/.claude/.env
chmod 600 ~/.claude/.env.homeassistant
chmod 600 ~/.claude/.credentials.json

# Verify permissions
ls -la ~/.claude/.env*
# Expected: -rw------- (600)
```

### Update Backup

```bash
# Create new backup with rotated credentials
cd ~/.claude
tar -czf ~/pai-backup-post-rotation-$(date +%Y%m%d).tar.gz \
  --exclude='node_modules' \
  --exclude='venv' \
  .
```

---

## Completion Checklist

- [ ] ✅ All 7 credentials rotated
- [ ] ✅ All services tested and working
- [ ] ✅ Old credentials revoked/deleted
- [ ] ✅ Verification scan passed (no old creds found)
- [ ] ✅ File permissions secured (600 on .env files)
- [ ] ✅ New backup created with rotated credentials
- [ ] ✅ Ready to proceed to Phase 2 (Sanitization)

**Completion Date:** ___________
**Time Spent:** ___________ hours

---

## Next Phase

Once all rotations are complete, proceed to:
**Phase 2:** Run sanitization script (`~/.claude/scripts/sanitize-for-public.sh`)

The sanitization script will create a public-safe copy at `~/.claude-public/` with all credentials removed and personal info replaced with placeholders.
