# Direct Capture - Bypass Telegram

## Overview

The `ingest direct` command allows you to capture content directly without sending it through Telegram first. This is useful for:

- Quick notes from the command line
- Clipboard capture
- File uploads from local machine
- Automation scripts

## Quick Start

```bash
# From stdin
echo "Quick note about the meeting" | ingest direct

# From clipboard (macOS)
pbpaste | ingest direct

# From file
ingest direct document.pdf

# From text
ingest direct --text "This is my note content"
```

## Usage Patterns

### Text Notes

```bash
# Simple text
ingest direct --text "Remember to follow up with client"

# Multi-line (using heredoc)
ingest direct --text "$(cat <<'EOF'
Meeting Notes:
- Discussed Q4 goals
- Need to schedule follow-up
- Action items assigned
EOF
)"
```

### From Clipboard

```bash
# macOS
pbpaste | ingest direct

# Linux (with xclip)
xclip -o | ingest direct

# Linux (with xsel)
xsel | ingest direct
```

### Files

```bash
# PDF document
ingest direct meeting-notes.pdf

# Image
ingest direct screenshot.png

# Any file type
ingest direct ~/Downloads/document.docx
```

### Shell Integration

Add to your shell config (~/.zshrc or ~/.bashrc):

```bash
# Quick capture alias
alias cap='pbpaste | ingest direct'

# Capture last command output
alias caplast='fc -ln -1 | ingest direct'
```

Then use:

```bash
# Copy something, then:
cap

# Run a command, then:
caplast
```

## How It Works

Currently (v1.0):
1. Content is received by the CLI
2. Displayed for verification
3. Queued for processing

**Note**: Full implementation coming soon. For now, content is shown but not yet sent to Telegram or processed directly.

## Future Enhancements

- [ ] Direct processing (bypass Telegram entirely)
- [ ] Tag support: `ingest direct --tags "project,urgent"`
- [ ] Scope support: `ingest direct --scope work`
- [ ] Filename customization: `ingest direct --name "Meeting Notes"`
- [ ] Pipeline selection: `ingest direct --pipeline wisdom`

## Integration Examples

### Raycast Script

Create `~/.config/raycast/scripts/quick-capture.sh`:

```bash
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Quick Capture
# @raycast.mode silent

# @raycast.argument1 { "type": "text", "placeholder": "Note" }

echo "$1" | ingest direct
```

### Alfred Workflow

1. Create new workflow
2. Add "Keyword" input: `cap {query}`
3. Add "Run Script" action:

```bash
echo "{query}" | /Users/username/.local/bin/ingest direct
```

### Hammerspoon

Add to `~/.hammerspoon/init.lua`:

```lua
hs.hotkey.bind({"cmd", "alt"}, "C", function()
  local text = hs.pasteboard.getContents()
  if text then
    hs.execute("/Users/username/.local/bin/ingest direct --text " ..
      hs.inspect(text))
    hs.notify.new({title="PAI", informativeText="Captured to inbox"}):send()
  end
end)
```

## Comparison: Direct vs Telegram

| Aspect | Telegram Flow | Direct Capture |
|--------|---------------|----------------|
| Speed | Slower (network) | Instant |
| Mobile | ✅ Excellent | ❌ Desktop only |
| History | ✅ Immutable log | ❌ No Telegram record |
| Reliability | ✅ Network backup | ⚠️ Local only |
| Use Case | Primary inbox | Quick desktop notes |

## Best Practices

1. **Use Telegram as primary** - Direct capture is supplementary
2. **Test before automating** - Verify with manual commands first
3. **Keep it simple** - Direct capture works best for text notes
4. **Consider mobile** - If you capture on mobile, use Telegram

## Troubleshooting

### "No content provided" error

Make sure you're passing content:

```bash
# Wrong
ingest direct

# Right
echo "content" | ingest direct
# OR
ingest direct --text "content"
```

### Stdin not working

Check if your terminal is TTY:

```bash
# This won't work (TTY)
ingest direct

# This works (piped input)
echo "test" | ingest direct
```

## See Also

- [DAEMON-MODE.md](./DAEMON-MODE.md) - Continuous monitoring
- [QUICK-START.md](./QUICK-START.md) - Getting started guide
