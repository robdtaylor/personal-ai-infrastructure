# Ingest CLI - Quick Start Guide

## What is Ingest?

Ingest is your capture pipeline - it fetches content from Telegram and processes it into Obsidian notes with AI-powered features like transcription, OCR, and tagging.

## Installation

```bash
cd ~/.claude/bin/ingest
./install.sh
```

Verify:

```bash
ingest --help
```

## Setup (First Time)

### 1. Configure Telegram

```bash
ingest setup
```

Follow the prompts to enter:
- Bot token (from @BotFather)
- Chat ID (your private channel or chat)

### 2. Test Connection

```bash
ingest test
```

You should see: `✅ Connected to bot: @your_bot_name`

## Basic Workflow

### One-Time Check

```bash
# 1. Poll for new messages
ingest poll

# 2. Process them into notes
ingest process
```

### Continuous Monitoring (NEW!)

```bash
# Daemon mode - automatically poll and process
ingest watch

# Custom interval
ingest watch --interval 60
```

### Direct Capture (NEW!)

```bash
# Skip Telegram entirely
echo "Quick note" | ingest direct
pbpaste | ingest direct
ingest direct document.pdf
```

## Common Commands

```bash
# Check status
ingest status

# See recent messages
ingest status --recent

# See failed messages
ingest status --failed

# Retry failed
ingest retry

# View statistics
ingest stats
```

## Content Types Supported

- 📝 **Text**: Plain text messages
- 🔗 **URLs**: Article extraction and archiving
- 🎙️ **Voice**: Automatic transcription
- 📷 **Photos**: OCR and image analysis
- 📄 **Documents**: PDF, Word, etc.
- 🎥 **Video**: Media capture

## Telegram Tips

### Adding Tags

Use hashtags in your message:

```
Great article about AI #ai #research #2024
```

### Mentioning People

Use @ mentions:

```
Meeting with @john_doe about project
```

### Voice Messages

Just send a voice message - automatic transcription happens!

### Quick Capture from iOS

1. Share to Telegram
2. Send to your inbox channel
3. `ingest watch` handles the rest

## Next Steps

- [DAEMON-MODE.md](./DAEMON-MODE.md) - Set up continuous monitoring
- [DIRECT-CAPTURE.md](./DIRECT-CAPTURE.md) - Learn direct capture
- [TELEGRAM-SETUP.md](./TELEGRAM-SETUP.md) - Detailed Telegram configuration

## Troubleshooting

### "Telegram not configured"

Run: `ingest setup`

### "Connection failed"

1. Check your bot token
2. Verify chat ID is correct
3. Make sure bot has access to the channel

### Messages not processing

1. Check: `ingest status`
2. Try: `ingest retry`
3. View details: `ingest status --failed`

## Getting Help

```bash
ingest --help          # Full command list
ingest poll --help     # Command-specific help
```

## Configuration Files

- Config: `~/.config/fabric/.env`
- State DB: `~/.claude/ingest-state.db`
- Logs: Check with `ingest status --recent`
