# Ingest - Telegram Capture Pipeline

A CLI tool for capturing content from Telegram and processing it into your Obsidian vault.

## Overview

The ingest system provides:
- **Telegram polling** - Fetch messages from a private bot/channel
- **Multi-modal support** - Text, URLs, images, documents, voice notes
- **Automatic processing** - Convert captures into Obsidian notes
- **Tag extraction** - Parse #hashtags and @mentions from messages
- **Audit logging** - Track all operations for debugging
- **iOS/macOS integration** - Quick capture via shortcuts

## Quick Start

```bash
# 1. Setup Telegram bot
ingest setup

# 2. Send messages to your bot on Telegram

# 3. Fetch new messages
ingest poll

# 4. Process into Obsidian notes
ingest process
```

## Commands

| Command | Description |
|---------|-------------|
| `ingest setup` | Configure Telegram bot interactively |
| `ingest test` | Test Telegram bot connection |
| `ingest poll` | Fetch new messages from Telegram |
| `ingest process` | Process pending messages into notes |
| `ingest status` | Show message state overview |
| `ingest stats` | Show comprehensive pipeline statistics |
| `ingest retry` | Reset failed messages to pending |
| `ingest clear` | Clear all messages (for testing) |

### Options

| Flag | Description |
|------|-------------|
| `--verbose, -v` | Show detailed output |
| `--recent, -r` | Show recent messages (with status) |
| `--failed, -f` | Show failed messages (with status) |
| `--type TYPE` | Filter by message type |
| `--limit N` | Limit number of results |
| `--debug` | Enable debug output |

## Telegram Setup

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Create a new bot with `/newbot`
3. Copy the bot token
4. Create a private channel or use direct messages to your bot
5. Get your chat ID (use [@userinfobot](https://t.me/userinfobot) or forward a message)
6. Run `ingest setup` and enter the details

## Message Types

The system automatically detects and handles:

- **text** - Plain text notes
- **url** - Links (fetches metadata and content)
- **photo** - Images with optional captions
- **document** - PDFs, docs, and other files
- **voice** - Voice notes (requires transcription setup)
- **video** - Video files

## Tags and Hints

Add hashtags and mentions to your messages for automatic categorization:

```
Check out this article #read-later @work
```

Supported hints:
- `#tag` - Adds tag to note frontmatter
- `@person` - Adds to people list
- `/command` - Special processing commands

## Quick Capture Scripts

Three helper scripts for instant capture from macOS:

### capture
```bash
# Send text directly
capture "Remember to buy milk"

# Send clipboard contents
capture

# Pipe text
echo "Important note" | capture
```

### capture-screenshot
```bash
# Interactive selection
capture-screenshot

# Capture window
capture-screenshot --window

# With custom caption
capture-screenshot --caption "#meeting-notes"
```

### capture-file
```bash
# Send a file
capture-file /path/to/document.pdf

# With caption
capture-file report.pdf --caption "#quarterly-review"

# File picker dialog
capture-file --pick
```

## iOS/macOS Integration

See the guides in `shortcuts/`:
- [iOS Shortcuts Guide](shortcuts/IOS_SHORTCUTS_GUIDE.md)
- [macOS Quick Actions Guide](shortcuts/MACOS_QUICK_ACTIONS.md)

## Architecture

```
~/.claude/
├── .telegram-config.json  # Bot credentials
├── ingest-state.db        # SQLite message state
├── ingest-temp/           # Downloaded media
├── logs/
│   └── ingest-audit.log   # Audit trail
└── bin/
    ├── capture            # Quick text capture
    ├── capture-screenshot # Screenshot capture
    ├── capture-file       # File capture
    └── ingest/
        ├── ingest.ts      # Main CLI
        ├── ingest-wrapper # Shell wrapper
        └── lib/
            ├── config.ts    # Configuration
            ├── state.ts     # SQLite state management
            ├── telegram.ts  # Telegram API client
            ├── processor.ts # Note generation
            ├── parser.ts    # Content parsing
            ├── audit.ts     # Audit logging
            └── monitoring.ts # Pipeline stats
```

## Processing Pipeline

1. **Poll** - Fetch updates from Telegram API
2. **Parse** - Extract content type, tags, hints
3. **Download** - Fetch media attachments
4. **Store** - Save to SQLite state database
5. **Process** - Generate Obsidian notes
6. **Audit** - Log all operations

## Monitoring

View pipeline health:

```bash
ingest stats
```

Shows:
- Message counts by state and type
- Storage usage (state DB, temp files, logs)
- API activity summary
- System health status
- Recent activity timestamps

## Audit Logs

Located at `~/.claude/logs/ingest-audit.log`:
- Automatic rotation at 10MB
- Keeps 5 backup files
- Sensitive data (tokens, keys) automatically scrubbed

## Troubleshooting

### Connection errors
```bash
ingest test
```

### View failed messages
```bash
ingest status --failed
```

### Retry failed processing
```bash
ingest retry
ingest process
```

### Debug mode
```bash
ingest poll --debug
ingest process --debug
```

### Check logs
```bash
tail -f ~/.claude/logs/ingest-audit.log
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PAI_DIR` | Override ~/.claude directory |
| `OBSIDIAN_VAULT_PATH` | Path to Obsidian vault |
| `INGEST_DEBUG` | Enable debug output |

## Dependencies

- [Bun](https://bun.sh) - JavaScript runtime
- SQLite - State management (via bun:sqlite)
- Telegram Bot API - Message fetching

## Related Tools

- `obs` - Obsidian CLI for note management
- `/context` - Load project context
- `/search` - Search notes
- `/incoming` - Check captured items
