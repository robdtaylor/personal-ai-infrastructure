# Obs CLI - Quick Start Guide

## What is Obs?

Obs is your Obsidian search and retrieval tool - it helps you find and load notes into your Claude sessions using text search, tags, and semantic similarity.

## Installation

```bash
cd ~/.claude/bin/obs
./install.sh
```

Verify:

```bash
obs --help
```

## Basic Commands

### Search

```bash
# Full-text search
obs search "machine learning"

# Tag-based search
obs search --tag project/pai

# Combined
obs search "embeddings" --tag ai/research
```

### Read Notes

```bash
# Read a specific note
obs read "2024-12-01-Meeting-Notes"

# List recent notes
obs recent

# List notes by tag
obs tags
obs tags --counts
```

### Semantic Search (Optional)

Requires OpenAI API key for embeddings.

```bash
# Build embeddings index
obs embed

# Semantic search
obs semantic "concepts related to neural networks"

# View statistics
obs stats
```

## Common Workflows

### Find and Load Context

```bash
# 1. Search for relevant notes
obs search "project plan" --tag project/pai

# 2. Read specific note
obs read "2024-12-Planning"
```

### Browse by Tags

```bash
# List all tags
obs tags

# Find notes with specific tag
obs search --tag meeting-notes

# See tag usage
obs tags --counts
```

### Recent Activity

```bash
# See recently modified notes
obs recent

# Limit results
obs recent --limit 20
```

## Configuration

Set in `~/.config/fabric/.env`:

```bash
# Required
OBSIDIAN_VAULT_PATH=~/Documents/MyVault

# Optional (for semantic search)
OPENAI_API_KEY=sk-...
```

## Integration with Claude

Use obs within Claude sessions:

```
User: "Load context about my PAI project"
Claude: Let me search your notes...
        *runs: obs search --tag project/pai*
        Found 5 notes. Which would you like me to load?
```

## Tips

### Naming Conventions

Use consistent note naming:
```
YYYY-MM-DD-Title.md
TYPE-YYYY-MM-DD-Title.md
```

Examples:
- `2024-12-01-Planning-Session.md`
- `MEETING-2024-12-01-Team-Sync.md`

### Tagging Strategy

Use hierarchical tags:
```
#project/pai
#project/pai/development
#project/pai/research
#meeting/weekly
#meeting/client
```

### Frontmatter

Add YAML frontmatter to notes:
```yaml
---
tags: [project/pai, meeting]
date: 2024-12-01
people: [john, sarah]
---
```

## Next Steps

- Build semantic search index: `obs embed`
- Set up tag taxonomy in your vault
- Integrate with Context skill in Claude

## Troubleshooting

### "Vault not found"

Set `OBSIDIAN_VAULT_PATH` in `~/.config/fabric/.env`

### No results found

1. Check vault path is correct
2. Verify notes exist
3. Try broader search terms

### Semantic search not working

1. Set `OPENAI_API_KEY`
2. Run `obs embed` to build index
3. Wait for indexing to complete

## See Also

- Context Skill: `~/.claude/skills/context/SKILL.md`
- Ingest CLI: `~/.claude/bin/ingest/docs/QUICK-START.md`
