Load context from my Obsidian vault for: $ARGUMENTS

Use the `obs` CLI to search and load relevant notes:

1. First, search for notes matching the topic/project:
   ```bash
   ~/.claude/bin/obs/obs-wrapper search --tag "project/$ARGUMENTS" 2>/dev/null || true
   ~/.claude/bin/obs/obs-wrapper semantic "$ARGUMENTS" --limit 5 2>/dev/null || true
   ```

2. If results found, read the most relevant notes and summarize the context

3. Present the loaded context in a structured format:
   - Key decisions and rationale
   - Important references
   - Related notes and links
   - Recent updates

4. If no notes found, suggest:
   - Alternative search terms
   - Creating a new project context note

Keep the summary concise but comprehensive. This context will inform the rest of our session.
