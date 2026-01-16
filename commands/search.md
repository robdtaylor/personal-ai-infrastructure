Search my Obsidian vault for: $ARGUMENTS

Use the `obs` CLI to search my personal knowledge base:

1. Run semantic search (finds conceptually related notes):
   ```bash
   ~/.claude/bin/obs/obs-wrapper semantic "$ARGUMENTS" --limit 10
   ```

2. Also run text search for exact matches:
   ```bash
   ~/.claude/bin/obs/obs-wrapper search "$ARGUMENTS"
   ```

3. Present results in a clear format:
   - Note title and path
   - Relevance score (for semantic)
   - Brief excerpt or summary
   - Tags

4. Offer to read any specific notes in full if I want more detail.

If no results found, suggest alternative search terms or related tags.
