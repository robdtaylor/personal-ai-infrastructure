Show me incoming/unprocessed items from my capture pipeline.

1. Check for pending Telegram captures:
   ```bash
   ~/.claude/bin/ingest/ingest-wrapper status
   ```

2. If there are pending messages, show them:
   ```bash
   ~/.claude/bin/ingest/ingest-wrapper status --recent
   ```

3. Check Obsidian inbox for unprocessed notes:
   ```bash
   ~/.claude/bin/obs/obs-wrapper incoming
   ```

4. Present a summary:
   - Number of pending Telegram captures (by type: text, url, photo, document)
   - Recent inbox notes that need processing
   - Any failed captures that need attention

5. Ask if I want to:
   - Process pending Telegram messages (`ingest process`)
   - Review specific inbox items
   - Clear/archive processed items

Keep it concise - just show me what needs attention.
