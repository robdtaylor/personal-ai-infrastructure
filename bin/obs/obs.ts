#!/usr/bin/env bun
/**
 * obs - Obsidian Vault CLI
 * Search, read, and write notes from your Obsidian vault
 *
 * Usage:
 *   obs search --tag "project/api"              # Find notes by tag
 *   obs search --tag "meeting" --text "auth"    # Combined search
 *   obs read "Meeting Notes"                    # Read note by title
 *   obs write "New Idea" --tag "inbox"          # Create new note
 *   obs tags                                    # List all tags
 *   obs tags --counts                           # Tags with usage counts
 *   obs incoming                                # View unprocessed notes
 *   obs context my-project                      # Load project context
 *   obs recent                                  # Recent notes
 *   obs stats                                   # Vault statistics
 *   obs embed                                   # Build/update embeddings
 *   obs semantic "my query"                     # Semantic search
 */

// Load environment variables from ~/.claude/.env
import { homedir } from "os";
import { join } from "path";
import { existsSync, readFileSync } from "fs";

const envPath = join(process.env.PAI_DIR || join(homedir(), ".claude"), ".env");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex > 0) {
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

import { getConfig, validateConfig, ObsConfig, debug } from "./lib/config";
import {
  getAllNotes,
  getNotesByTag,
  getNotesByTags,
  searchNotes,
  findNoteByTitle,
  getAllTags,
  getIncomingNotes,
  getProjectContext,
  getRecentNotes,
  writeNote,
  getVaultStats,
} from "./lib/vault";
import { ParsedNote } from "./lib/parser";
import {
  buildEmbeddings,
  semanticSearch,
  getEmbeddingStats,
  clearEmbeddings,
  SearchResult,
} from "./lib/embeddings";
import { relative } from "path";  // join already imported above

// Parse command line arguments
function parseArgs(): {
  command: string;
  args: string[];
  flags: Map<string, string | boolean>;
} {
  const args = process.argv.slice(2);
  const flags = new Map<string, string | boolean>();
  const positionalArgs: string[] = [];
  let command = "";

  let i = 0;
  // First arg is the command
  if (args.length > 0 && !args[0].startsWith("-")) {
    command = args[0];
    i = 1;
  }

  for (; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = args[i + 1];

      if (next && !next.startsWith("-")) {
        flags.set(key, next);
        i++;
      } else {
        flags.set(key, true);
      }
    } else if (arg.startsWith("-")) {
      const key = arg.slice(1);
      const next = args[i + 1];

      if (next && !next.startsWith("-")) {
        flags.set(key, next);
        i++;
      } else {
        flags.set(key, true);
      }
    } else {
      positionalArgs.push(arg);
    }
  }

  return { command, args: positionalArgs, flags };
}

// Format a note for display
function formatNote(note: ParsedNote, config: ObsConfig, options?: { full?: boolean }): string {
  const relativePath = relative(config.vaultPath, note.path);
  const tags = note.frontmatter.tags || [];
  const tagStr = Array.isArray(tags) ? tags.map((t) => `#${t}`).join(" ") : `#${tags}`;
  const date = note.modifiedAt.toISOString().split("T")[0];

  if (options?.full) {
    return `
╭─ ${note.title}
│  Path: ${relativePath}
│  Tags: ${tagStr || "(none)"}
│  Modified: ${date}
╰─────────────────────────────────────
${note.content}
─────────────────────────────────────────`;
  }

  return `[${date}] ${note.title}\n         ${relativePath}\n         ${tagStr || "(no tags)"}`;
}

// Format notes list
function formatNotesList(notes: ParsedNote[], config: ObsConfig): string {
  if (notes.length === 0) {
    return "No notes found.";
  }

  const lines = [`Found ${notes.length} note(s):\n`];
  for (const note of notes) {
    lines.push(formatNote(note, config));
    lines.push("");
  }
  return lines.join("\n");
}

// Commands
async function cmdSearch(config: ObsConfig, args: string[], flags: Map<string, string | boolean>) {
  const tags: string[] = [];
  const text = flags.get("text") as string | undefined;
  const limit = parseInt(flags.get("limit") as string) || 50;

  // Collect all --tag flags
  const tagValue = flags.get("tag");
  if (tagValue) {
    tags.push(String(tagValue));
  }

  // Also support positional args as text search
  const query = text || args.join(" ");

  debug(config, `Searching: tags=${tags.join(",")}, text="${query}", limit=${limit}`);

  const results = searchNotes(config, query, { tags, limit });
  console.log(formatNotesList(results, config));
}

async function cmdRead(config: ObsConfig, args: string[], flags: Map<string, string | boolean>) {
  const title = args.join(" ");

  if (!title) {
    console.error("Usage: obs read <title>");
    console.error("Example: obs read 'Meeting Notes'");
    process.exit(1);
  }

  const note = findNoteByTitle(config, title);

  if (!note) {
    console.error(`Note not found: "${title}"`);
    console.log("\nDid you mean one of these?");
    const recent = getRecentNotes(config, 5);
    for (const n of recent) {
      console.log(`  - ${n.title}`);
    }
    process.exit(1);
  }

  console.log(formatNote(note, config, { full: true }));
}

async function cmdWrite(config: ObsConfig, args: string[], flags: Map<string, string | boolean>) {
  const title = args.join(" ");
  const tags: string[] = [];
  const content = flags.get("content") as string | undefined;
  const folder = flags.get("folder") as string | undefined;
  const source = flags.get("source") as string || "obs-cli";

  // Get tag from flags
  const tagValue = flags.get("tag");
  if (tagValue) {
    tags.push(String(tagValue));
  }

  if (!title) {
    console.error("Usage: obs write <title> [--tag <tag>] [--content <content>]");
    console.error("Example: obs write 'New Idea' --tag inbox --content 'My idea...'");
    console.error("\nOr pipe content from stdin:");
    console.error("  echo 'My content' | obs write 'Title' --tag inbox");
    process.exit(1);
  }

  // Read from stdin if no content provided
  let noteContent = content || "";
  if (!noteContent && !process.stdin.isTTY) {
    const chunks: Buffer[] = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    noteContent = Buffer.concat(chunks).toString("utf-8").trim();
  }

  const filePath = writeNote(config, title, noteContent, {
    tags: tags.length > 0 ? tags : ["incoming"],
    source,
    folder,
  });

  console.log(`✅ Note created: ${relative(config.vaultPath, filePath)}`);
}

async function cmdTags(config: ObsConfig, _args: string[], flags: Map<string, string | boolean>) {
  const showCounts = flags.get("counts") === true;
  const tags = getAllTags(config);

  if (tags.size === 0) {
    console.log("No tags found in vault.");
    return;
  }

  // Sort by count (descending) or alphabetically
  const sorted = Array.from(tags.entries()).sort((a, b) => {
    if (showCounts) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  });

  console.log(`Found ${tags.size} unique tags:\n`);

  for (const [tag, count] of sorted) {
    if (showCounts) {
      console.log(`  #${tag} (${count})`);
    } else {
      console.log(`  #${tag}`);
    }
  }
}

async function cmdIncoming(config: ObsConfig, _args: string[], flags: Map<string, string | boolean>) {
  const limit = parseInt(flags.get("limit") as string) || 20;
  const incoming = getIncomingNotes(config).slice(0, limit);

  if (incoming.length === 0) {
    console.log("No incoming/inbox notes found. 🎉");
    console.log("\nNotes are considered 'incoming' if:");
    console.log("  - They have the #incoming or #inbox tag");
    console.log("  - They are in an 'Inbox' folder");
    return;
  }

  console.log(`📥 ${incoming.length} incoming note(s):\n`);
  console.log(formatNotesList(incoming, config));
}

async function cmdContext(config: ObsConfig, args: string[], flags: Map<string, string | boolean>) {
  const project = args.join(" ");

  if (!project) {
    console.error("Usage: obs context <project-name>");
    console.error("Example: obs context my-api");
    console.error("\nThis searches for notes tagged with #project/<project-name>");
    process.exit(1);
  }

  const notes = getProjectContext(config, project);

  if (notes.length === 0) {
    console.log(`No notes found for project: ${project}`);
    console.log(`\nLooking for notes with tag: #project/${project}`);
    console.log("\nAvailable project tags:");
    const tags = getAllTags(config);
    for (const [tag] of tags) {
      if (tag.startsWith("project/")) {
        console.log(`  #${tag}`);
      }
    }
    return;
  }

  console.log(`📁 Context for project "${project}" (${notes.length} notes):\n`);

  // Print combined content
  for (const note of notes) {
    console.log(`\n## ${note.title}`);
    console.log(`<!-- Source: ${relative(config.vaultPath, note.path)} -->\n`);
    console.log(note.content);
    console.log("\n---");
  }
}

async function cmdRecent(config: ObsConfig, _args: string[], flags: Map<string, string | boolean>) {
  const limit = parseInt(flags.get("limit") as string) || 10;
  const recent = getRecentNotes(config, limit);

  console.log(`📅 ${recent.length} most recent notes:\n`);
  console.log(formatNotesList(recent, config));
}

async function cmdStats(config: ObsConfig, _args: string[], _flags: Map<string, string | boolean>) {
  const stats = getVaultStats(config);
  const embeddingStats = getEmbeddingStats(config);

  console.log(`📊 Vault Statistics\n`);
  console.log(`   Location: ${config.vaultPath}`);
  console.log(`   Total Notes: ${stats.totalNotes}`);
  console.log(`   Unique Tags: ${stats.totalTags}`);
  console.log(`   Incoming: ${stats.incomingCount}`);
  console.log(`   Modified This Week: ${stats.recentCount}`);

  if (stats.oldestNote) {
    console.log(`   Oldest Note: ${stats.oldestNote.toISOString().split("T")[0]}`);
  }
  if (stats.newestNote) {
    console.log(`   Newest Note: ${stats.newestNote.toISOString().split("T")[0]}`);
  }

  console.log(`\n🧠 Embedding Statistics\n`);
  console.log(`   Embedded Notes: ${embeddingStats.totalNotes}`);
  console.log(`   Total Chunks: ${embeddingStats.totalChunks}`);
  console.log(`   Database Size: ${(embeddingStats.dbSizeBytes / 1024 / 1024).toFixed(2)} MB`);
  if (embeddingStats.lastUpdated) {
    console.log(`   Last Updated: ${embeddingStats.lastUpdated}`);
  }
}

async function cmdEmbed(config: ObsConfig, _args: string[], flags: Map<string, string | boolean>) {
  const force = flags.get("force") === true;
  const showStats = flags.get("stats") === true;
  const clear = flags.get("clear") === true;

  if (showStats) {
    const stats = getEmbeddingStats(config);
    console.log(`🧠 Embedding Statistics\n`);
    console.log(`   Embedded Notes: ${stats.totalNotes}`);
    console.log(`   Total Chunks: ${stats.totalChunks}`);
    console.log(`   Database Size: ${(stats.dbSizeBytes / 1024 / 1024).toFixed(2)} MB`);
    if (stats.lastUpdated) {
      console.log(`   Last Updated: ${stats.lastUpdated}`);
    }
    return;
  }

  if (clear) {
    console.log("Clearing all embeddings...");
    clearEmbeddings(config);
    console.log("✅ Embeddings cleared.");
    return;
  }

  console.log("🔄 Building embeddings...\n");
  console.log(`   Vault: ${config.vaultPath}`);
  console.log(`   Database: ${config.embeddingsDbPath}`);
  console.log(`   Force rebuild: ${force}\n`);

  const startTime = Date.now();
  const result = await buildEmbeddings(config, {
    force,
    verbose: true,
  });

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n✅ Embedding complete in ${elapsed}s`);
  console.log(`   Embedded: ${result.embedded} notes`);
  console.log(`   Skipped: ${result.skipped} unchanged`);
  if (result.errors > 0) {
    console.log(`   Errors: ${result.errors}`);
  }
}

async function cmdSemantic(config: ObsConfig, args: string[], flags: Map<string, string | boolean>) {
  const query = args.join(" ");
  const limit = parseInt(flags.get("limit") as string) || 10;

  if (!query) {
    console.error("Usage: obs semantic <query>");
    console.error("Example: obs semantic 'distributed systems architecture patterns'");
    console.error("\nNote: Run 'obs embed' first to build the embeddings index.");
    process.exit(1);
  }

  // Check if embeddings exist
  const stats = getEmbeddingStats(config);
  if (stats.totalNotes === 0) {
    console.error("No embeddings found. Run 'obs embed' first to build the index.");
    process.exit(1);
  }

  console.log(`🔍 Semantic search for: "${query}"\n`);

  const results = await semanticSearch(config, query, { limit });

  if (results.length === 0) {
    console.log("No relevant notes found.");
    return;
  }

  console.log(`Found ${results.length} relevant note(s):\n`);

  for (const result of results) {
    const relativePath = relative(config.vaultPath, result.note.path);
    const tags = result.note.frontmatter.tags || [];
    const tagStr = Array.isArray(tags) ? tags.map((t) => `#${t}`).join(" ") : `#${tags}`;
    const date = result.note.modifiedAt.toISOString().split("T")[0];
    const scorePercent = (result.score * 100).toFixed(1);

    console.log(`[${scorePercent}%] ${result.note.title}`);
    console.log(`        ${relativePath}`);
    console.log(`        ${tagStr || "(no tags)"}`);
    console.log("");
  }
}

async function cmdHelp() {
  console.log(`
obs - Obsidian Vault CLI

Usage:
  obs <command> [options]

Commands:
  search    Search notes by tag and/or text
  read      Read a note by title (fuzzy match)
  write     Create a new note
  tags      List all tags in the vault
  incoming  View unprocessed/inbox notes
  context   Load context for a project
  recent    Show recently modified notes
  stats     Show vault statistics
  embed     Build or update semantic embeddings
  semantic  Search notes by meaning (vector similarity)
  help      Show this help message

Search Options:
  obs search --tag <tag>           Search by tag
  obs search --text <query>        Search by text
  obs search --tag t1 --text "q"   Combined search
  obs search --limit <n>           Limit results (default: 50)

Read Options:
  obs read "Note Title"            Read note (fuzzy match)

Write Options:
  obs write "Title" --tag <tag>    Create note with tag
  obs write "Title" --content "x"  Create note with content
  obs write "Title" --folder "Dir" Create in specific folder
  echo "x" | obs write "Title"     Create note from stdin

Tag Options:
  obs tags                         List all tags
  obs tags --counts                Show usage counts

Context Options:
  obs context <project>            Load project context
                                   (searches #project/<name>)

Embed Options:
  obs embed                        Build/update embeddings
  obs embed --force                Rebuild all embeddings
  obs embed --stats                Show embedding statistics
  obs embed --clear                Clear all embeddings

Semantic Search Options:
  obs semantic <query>             Search by meaning
  obs semantic <query> --limit <n> Limit results (default: 10)

General Options:
  --debug                          Enable debug output

Examples:
  obs search --tag meeting-notes
  obs read "API Architecture"
  obs write "Quick Thought" --tag inbox --content "Remember to..."
  obs context my-api
  obs incoming
  obs tags --counts
  obs embed                        # Build embeddings first
  obs semantic "authentication patterns"
  obs semantic "how to handle errors" --limit 5

Environment:
  OBSIDIAN_VAULT_PATH       Path to Obsidian vault (default: ~/Documents/personal)
  PAI_DIR                   PAI directory (default: ~/.claude)
  OBS_DEBUG                 Enable debug mode (set to "true")
  OPENAI_API_KEY            Required for semantic search
  OPENAI_EMBEDDING_MODEL    Embedding model (default: text-embedding-3-large)
`);
}

// Main entry point
async function main() {
  try {
    const { command, args, flags } = parseArgs();

    if (command === "help" || flags.get("help") || flags.get("h") || !command) {
      await cmdHelp();
      process.exit(0);
    }

    const config = getConfig();
    validateConfig(config);

    debug(config, `Command: ${command}, Args: ${args.join(", ")}`);

    switch (command) {
      case "search":
        await cmdSearch(config, args, flags);
        break;
      case "read":
        await cmdRead(config, args, flags);
        break;
      case "write":
        await cmdWrite(config, args, flags);
        break;
      case "tags":
        await cmdTags(config, args, flags);
        break;
      case "incoming":
        await cmdIncoming(config, args, flags);
        break;
      case "context":
        await cmdContext(config, args, flags);
        break;
      case "recent":
        await cmdRecent(config, args, flags);
        break;
      case "stats":
        await cmdStats(config, args, flags);
        break;
      case "embed":
        await cmdEmbed(config, args, flags);
        break;
      case "semantic":
        await cmdSemantic(config, args, flags);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        console.error("Run 'obs help' for usage information.");
        process.exit(1);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      if (process.env.OBS_DEBUG === "true") {
        console.error(error.stack);
      }
    } else {
      console.error("An unexpected error occurred");
    }
    process.exit(1);
  }
}

main();
