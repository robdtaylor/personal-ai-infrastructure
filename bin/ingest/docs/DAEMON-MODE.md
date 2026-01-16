# Daemon Mode - Continuous Telegram Monitoring

## Overview

Daemon mode (`ingest watch`) enables continuous monitoring of your Telegram inbox, automatically polling and processing new messages as they arrive.

## Quick Start

```bash
# Start daemon mode (30 second interval)
ingest watch

# Custom interval
ingest watch --interval 60  # Check every 60 seconds

# Verbose output
ingest watch --verbose
```

## How It Works

1. **Poll**: Check Telegram for new messages
2. **Process**: Immediately process any new messages into Obsidian notes
3. **Sleep**: Wait for the specified interval
4. **Repeat**: Continue until stopped with Ctrl+C

## Configuration

### Interval

Default: 30 seconds

```bash
# Check every minute
ingest watch --interval 60

# Check every 5 minutes
ingest watch --interval 300
```

### Verbose Mode

```bash
# Show detailed output including when no messages are found
ingest watch --verbose
```

## Running as a Background Service

### macOS (LaunchAgent)

Create `~/Library/LaunchAgents/com.pai.ingest-watch.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.pai.ingest-watch</string>

    <key>ProgramArguments</key>
    <array>
        <string>__HOME__/.local/bin/ingest</string>
        <string>watch</string>
        <string>--interval</string>
        <string>30</string>
    </array>

    <key>RunAtLoad</key>
    <true/>

    <key>KeepAlive</key>
    <true/>

    <key>StandardOutPath</key>
    <string>/tmp/ingest-watch.log</string>

    <key>StandardErrorPath</key>
    <string>/tmp/ingest-watch-error.log</string>
</dict>
</plist>
```

**Replace `__HOME__` with your actual home path** (e.g., `/Users/username`)

Load the service:

```bash
launchctl load ~/Library/LaunchAgents/com.pai.ingest-watch.plist
```

Manage the service:

```bash
# Stop
launchctl unload ~/Library/LaunchAgents/com.pai.ingest-watch.plist

# Start
launchctl load ~/Library/LaunchAgents/com.pai.ingest-watch.plist

# View logs
tail -f /tmp/ingest-watch.log
```

### Linux (systemd)

Create `~/.config/systemd/user/ingest-watch.service`:

```ini
[Unit]
Description=PAI Ingest Watch Daemon
After=network.target

[Service]
Type=simple
ExecStart=%h/.local/bin/ingest watch --interval 30
Restart=always
RestartSec=10

StandardOutput=append:/tmp/ingest-watch.log
StandardError=append:/tmp/ingest-watch-error.log

[Install]
WantedBy=default.target
```

Enable and start:

```bash
systemctl --user enable ingest-watch
systemctl --user start ingest-watch

# View logs
journalctl --user -u ingest-watch -f
```

## Monitoring

### Check if running

```bash
# macOS
ps aux | grep "ingest watch"

# Linux
systemctl --user status ingest-watch
```

### View logs

```bash
tail -f /tmp/ingest-watch.log
```

### Stop

Press `Ctrl+C` if running in foreground, or use system service management commands above.

## Troubleshooting

### Daemon not processing messages

1. Check logs: `tail -f /tmp/ingest-watch.log`
2. Test manually: `ingest poll && ingest process`
3. Verify Telegram config: `ingest test`

### High CPU usage

Increase the interval:

```bash
ingest watch --interval 300  # 5 minutes
```

### Messages not appearing

- Check Telegram bot has admin access to channel
- Verify OBSIDIAN_VAULT_PATH is correct
- Run `ingest status` to see if messages are stuck in "pending"

## Best Practices

1. **Start with manual mode** - Test with `ingest poll` and `ingest process` first
2. **Use reasonable intervals** - 30-60 seconds is usually sufficient
3. **Monitor logs initially** - Watch `/tmp/ingest-watch.log` when first setting up
4. **Have fallback** - Keep manual `ingest poll` as backup if daemon fails

## Example Output

```
🔄 Watch mode started
   Interval: 30s
   Press Ctrl+C to stop

[2:15:30 PM] Found 2 new message(s)
[2:15:32 PM] Processed 2, failed 0
[2:16:00 PM] No new messages
[2:16:30 PM] No new messages
[2:17:00 PM] Found 1 new message(s)
[2:17:02 PM] Processed 1, failed 0
```

## See Also

- [DIRECT-CAPTURE.md](./DIRECT-CAPTURE.md) - Direct capture without Telegram
- [TELEGRAM-SETUP.md](./TELEGRAM-SETUP.md) - Initial Telegram configuration
