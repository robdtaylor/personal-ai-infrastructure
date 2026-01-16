Capture content to my Obsidian vault.

$ARGUMENTS

Use the `obs` CLI to create a new note:

1. Determine appropriate title and tags from the content/context

2. Create the note:
   ```bash
   ~/.claude/bin/obs/obs-wrapper write "Title" --tag "inbox" --content "..."
   ```

3. If capturing from our conversation:
   - Summarize the key points
   - Include relevant code snippets
   - Add appropriate tags (project/*, reference, decision, etc.)

4. Confirm the note was created and show the file path

5. Suggest any related notes that should be linked

Default to the "inbox" tag unless a specific project/category is mentioned.
