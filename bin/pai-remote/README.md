# PAI Remote - Phone SSH Commands

Quick commands for accessing PAI from your phone via SSH when at work.

## Setup

1. **On your MacBook (home):**
   ```bash
   chmod +x ~/.claude/bin/pai-remote/*
   echo 'export PATH="$HOME/.claude/bin/pai-remote:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

2. **On your phone:**
   - Install SSH app (Termius, Blink, or similar)
   - Configure connection to your MacBook via Tailscale IP
   - Or configure hop through Hostinger VPS

## Commands

### pai-quick - Fast queries

```bash
# Built-in commands
pai-quick hoshin        # Hoshin status summary
pai-quick inbox         # Process Telegram inbox
pai-quick brief         # Morning briefing
pai-quick actions       # List pending action items

# Direct queries (uses Claude Code)
pai-quick "what are the key quality issues this week?"
pai-quick "summarize my BOM reduction progress"
```

### pai-hoshin - Hoshin Kanri specific

```bash
# Status
pai-hoshin status              # Overall status
pai-hoshin objective A1        # Specific objective
pai-hoshin bowling A1          # Bowling chart

# A3 Problem Solving
pai-hoshin a3 list             # List active A3s
pai-hoshin a3 HK-2025-001      # Show specific A3

# Review prep
pai-hoshin review              # Monthly review checklist

# Templates (pipe to file or copy)
pai-hoshin template x-matrix
pai-hoshin template bowling
pai-hoshin template a3
pai-hoshin template excel      # Excel paste format
pai-hoshin template powerpoint # PPT ready content
```

### pai-note - Quick capture

```bash
# Capture notes from phone
pai-note "Quick thought about process improvement"
pai-note -c quality "Line 3 scrap spike - investigate"
pai-note -c hoshin "A1 behind target - need A3"
pai-note -c meeting "Call with John - agreed 3% reduction"

# Categories: quality, supplier, cost, hoshin, meeting, action, idea, general
```

## Workflow: Phone → PAI → Action

1. **At work (phone):**
   - Capture quick notes: `pai-note -c quality "issue observed"`
   - Or use Telegram → Obsidian sync (existing workflow)

2. **Later (home or phone SSH):**
   - Process inbox: `pai-quick inbox`
   - Review status: `pai-hoshin status`
   - Get morning brief: `pai-quick brief`

3. **Monthly review prep:**
   - Run: `pai-hoshin review`
   - Get templates: `pai-hoshin template monthly-review`

## Connection Tips

### Direct (if MacBook is accessible)
```bash
ssh user@your-macbook-tailscale-ip
```

### Via Hostinger VPS (hop)
```bash
# On phone
ssh user@hostinger-vps

# Then on VPS
ssh user@macbook-tailscale-ip
```

### Or configure SSH jump host
```
# ~/.ssh/config on phone
Host pai
    HostName macbook-tailscale-ip
    User your-user
    ProxyJump hostinger-vps
```

Then just: `ssh pai` from phone.

## Files Created

These scripts live in: `~/.claude/bin/pai-remote/`
- `pai-quick` - General quick commands
- `pai-hoshin` - Hoshin Kanri specific
- `pai-note` - Quick note capture

Notes captured go to: `~/Documents/personal/Inbox/`
Processed notes go to: `~/Documents/personal/AI-Processed/`
