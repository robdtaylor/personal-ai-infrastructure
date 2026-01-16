# macOS Quick Actions for Telegram Capture

This guide shows how to create macOS Quick Actions and keyboard shortcuts for capturing content.

## Prerequisites

1. `ingest` CLI set up and working
2. Telegram bot configured
3. macOS Monterey or later (for best Shortcuts support)

## Method 1: macOS Shortcuts App

### Quick Capture Shortcut

1. Open **Shortcuts** app on Mac
2. Create new shortcut
3. Add actions:

```
Action 1: Ask for Input
  - Type: Text
  - Prompt: "What to capture?"

Action 2: Run Shell Script
  - Shell: /bin/bash
  - Input: as arguments
  - Script:
    ~/.claude/bin/ingest/ingest-wrapper poll 2>/dev/null
    # Or send directly via API for faster capture
```

4. Set keyboard shortcut:
   - Right-click shortcut → Add Keyboard Shortcut
   - Recommended: ⌘⇧C (Cmd+Shift+C)

### Send Selection to Capture

1. Create new shortcut
2. Enable "Use as Quick Action" → Services Menu
3. Receives: Text from any application
4. Add actions:

```
Action 1: Get Text from Input

Action 2: Run Shell Script
  - Script:
    TEXT="$1"
    TOKEN="your-bot-token"
    CHAT_ID="your-chat-id"
    curl -s "https://api.telegram.org/bot${TOKEN}/sendMessage" \
      -d "chat_id=${CHAT_ID}" \
      -d "text=${TEXT}" > /dev/null
```

5. Now right-click any selected text → Services → Send to Capture

## Method 2: Automator Quick Actions

### Create Quick Action

1. Open **Automator**
2. File → New → Quick Action
3. Settings:
   - Workflow receives: text
   - in: any application

4. Add "Run Shell Script" action:

```bash
#!/bin/bash

# Get selected text from input
TEXT="$1"

# Your bot credentials (or read from config)
TOKEN=$(cat ~/.claude/.telegram-config.json | grep botToken | cut -d'"' -f4)
CHAT_ID=$(cat ~/.claude/.telegram-config.json | grep chatId | cut -d'"' -f4)

# URL encode the text
ENCODED=$(python3 -c "import urllib.parse; print(urllib.parse.quote('''$TEXT'''))")

# Send to Telegram
curl -s "https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${ENCODED}" > /dev/null

# Notification
osascript -e 'display notification "Text sent to capture bot" with title "Captured!"'
```

5. Save as "Send to Capture"

### Add Keyboard Shortcut

1. System Settings → Keyboard → Keyboard Shortcuts
2. Services → Text → Send to Capture
3. Add shortcut: ⌘⇧C

## Method 3: Shell Scripts + Raycast/Alfred

### capture.sh Script

Create `~/.claude/bin/capture`:

```bash
#!/bin/bash
# Quick capture script for macOS

CONFIG_FILE="$HOME/.claude/.telegram-config.json"

if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Error: Telegram not configured. Run 'ingest setup' first."
    exit 1
fi

TOKEN=$(cat "$CONFIG_FILE" | grep botToken | cut -d'"' -f4)
CHAT_ID=$(cat "$CONFIG_FILE" | grep chatId | cut -d'"' -f4)

# Get text from argument or clipboard
if [[ -n "$1" ]]; then
    TEXT="$*"
else
    TEXT=$(pbpaste)
fi

if [[ -z "$TEXT" ]]; then
    echo "Error: No text provided and clipboard is empty"
    exit 1
fi

# Send to Telegram
RESPONSE=$(curl -s "https://api.telegram.org/bot${TOKEN}/sendMessage" \
    -d "chat_id=${CHAT_ID}" \
    -d "text=${TEXT}")

if echo "$RESPONSE" | grep -q '"ok":true'; then
    osascript -e 'display notification "Captured to Telegram" with title "✓ Captured"'
    echo "Captured: ${TEXT:0:50}..."
else
    osascript -e 'display notification "Failed to capture" with title "✗ Error"'
    echo "Error: $RESPONSE"
    exit 1
fi
```

Make executable:
```bash
chmod +x ~/.claude/bin/capture
```

### Raycast Integration

1. Raycast → Extensions → Script Commands
2. Create new script command pointing to `~/.claude/bin/capture`
3. Set hotkey

### Alfred Integration

1. Alfred → Workflows → New Workflow
2. Add Hotkey trigger (e.g., ⌘⇧C)
3. Connect to Run Script action
4. Script: `~/.claude/bin/capture "{query}"`

## Method 4: Menu Bar App (Advanced)

For a persistent menu bar app, you can use a simple SwiftUI app or tools like:

### Using BitBar/SwiftBar

1. Install SwiftBar: `brew install swiftbar`
2. Create plugin `~/.config/swiftbar/capture.1h.sh`:

```bash
#!/bin/bash
echo "📥"
echo "---"
echo "Quick Capture | bash='~/.claude/bin/capture' terminal=false"
echo "Capture Clipboard | bash='~/.claude/bin/capture' terminal=false"
echo "---"
echo "Poll Telegram | bash='~/.claude/bin/ingest/ingest-wrapper poll' terminal=true"
echo "Process Queue | bash='~/.claude/bin/ingest/ingest-wrapper process' terminal=true"
echo "View Status | bash='~/.claude/bin/ingest/ingest-wrapper stats' terminal=true"
```

3. Make executable: `chmod +x ~/.config/swiftbar/capture.1h.sh`

## Keyboard Shortcuts Summary

| Shortcut | Action |
|----------|--------|
| ⌘⇧C | Capture selected text |
| ⌘⇧V | Capture clipboard |
| ⌘⇧N | Quick note capture (prompt) |

## Global Hotkey with Hammerspoon

For more control, use Hammerspoon:

1. Install: `brew install hammerspoon`
2. Add to `~/.hammerspoon/init.lua`:

```lua
-- Capture selected text
hs.hotkey.bind({"cmd", "shift"}, "C", function()
    -- Copy current selection
    hs.eventtap.keyStroke({"cmd"}, "c")
    hs.timer.doAfter(0.1, function()
        -- Run capture script
        hs.execute("~/.claude/bin/capture")
    end)
end)

-- Quick note popup
hs.hotkey.bind({"cmd", "shift"}, "N", function()
    local button, text = hs.dialog.textPrompt("Quick Capture", "Enter note:", "", "Capture", "Cancel")
    if button == "Capture" and text ~= "" then
        hs.execute('~/.claude/bin/capture "' .. text .. '"')
    end
end)
```

3. Reload Hammerspoon config

## File/Screenshot Capture

### Capture Screenshot

```bash
#!/bin/bash
# capture-screenshot.sh

TEMP_FILE="/tmp/capture-screenshot-$(date +%s).png"
TOKEN=$(cat ~/.claude/.telegram-config.json | grep botToken | cut -d'"' -f4)
CHAT_ID=$(cat ~/.claude/.telegram-config.json | grep chatId | cut -d'"' -f4)

# Take screenshot (interactive selection)
screencapture -i "$TEMP_FILE"

if [[ -f "$TEMP_FILE" ]]; then
    # Send photo to Telegram
    curl -s "https://api.telegram.org/bot${TOKEN}/sendPhoto" \
        -F "chat_id=${CHAT_ID}" \
        -F "photo=@${TEMP_FILE}" \
        -F "caption=#screenshot" > /dev/null

    rm "$TEMP_FILE"
    osascript -e 'display notification "Screenshot captured" with title "✓ Captured"'
else
    echo "Screenshot cancelled"
fi
```

### Capture File

```bash
#!/bin/bash
# capture-file.sh

FILE="$1"
TOKEN=$(cat ~/.claude/.telegram-config.json | grep botToken | cut -d'"' -f4)
CHAT_ID=$(cat ~/.claude/.telegram-config.json | grep chatId | cut -d'"' -f4)

if [[ ! -f "$FILE" ]]; then
    echo "Error: File not found: $FILE"
    exit 1
fi

# Send document to Telegram
curl -s "https://api.telegram.org/bot${TOKEN}/sendDocument" \
    -F "chat_id=${CHAT_ID}" \
    -F "document=@${FILE}" > /dev/null

osascript -e "display notification \"Sent: $(basename "$FILE")\" with title \"✓ Captured\""
```

## Troubleshooting

### "Permission denied"
- Check script is executable: `chmod +x script.sh`
- Check Full Disk Access in Security settings

### Shortcuts not running
- Open Shortcuts app and run manually first
- Check shell path is correct

### No notification
- Check notification permissions for Terminal/Shortcuts

### API errors
- Run `ingest test` to verify credentials
- Check `~/.claude/.telegram-config.json` exists
