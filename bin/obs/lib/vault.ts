/**
 * Vault operations - file discovery and management
 */

import { readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join, extname, relative, dirname } from "path";
import { ObsConfig, debug } from "./config";
import { parseNote, ParsedNote, generateFrontmatter, generateFilename, NoteFrontmatter } from "./parser";

/**
 * Recursively get all markdown files in a directory
 */
export function* walkMarkdownFiles(dir: string, config: ObsConfig): Generator<string> {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    // Skip hidden directories (like .obsidian, .git)
    if (entry.name.startsWith(".")) continue;

    // Skip common non-note directories
    if (entry.isDirectory()) {
      const skipDirs = ["node_modules", ".git", ".obsidian", "attachments", "templates"];
      if (skipDirs.includes(entry.name.toLowerCase())) continue;

      yield* walkMarkdownFiles(fullPath, config);
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".md") {
      yield fullPath;
    }
  }
}

/**
 * Get all notes in the vault
 */
export function getAllNotes(config: ObsConfig): ParsedNote[] {
  const notes: ParsedNote[] = [];
  let errorCount = 0;

  for (const filePath of walkMarkdownFiles(config.vaultPath, config)) {
    try {
      notes.push(parseNote(filePath));
    } catch (error) {
      errorCount++;
      debug(config, `Failed to parse ${filePath}:`, error);
    }
  }

  if (errorCount > 0) {
    debug(config, `Skipped ${errorCount} files due to parse errors`);
  }

  return notes;
}

/**
 * Get notes with a specific tag
 */
export function getNotesByTag(config: ObsConfig, tag: string): ParsedNote[] {
  const normalizedTag = tag.replace(/^#/, "").toLowerCase();
  const notes = getAllNotes(config);

  return notes.filter((note) => {
    // Check frontmatter tags
    const fmTags = note.frontmatter.tags || [];
    const normalizedFmTags = (Array.isArray(fmTags) ? fmTags : [fmTags]).map((t) =>
      String(t).toLowerCase().replace(/^#/, "")
    );

    if (normalizedFmTags.some((t) => t === normalizedTag || t.startsWith(`${normalizedTag}/`))) {
      return true;
    }

    // Check inline tags
    const inlineTagRegex = new RegExp(`#${normalizedTag}(?:/[a-zA-Z0-9_-]+)*\\b`, "i");
    return inlineTagRegex.test(note.content);
  });
}

/**
 * Get notes matching multiple tags (AND logic)
 */
export function getNotesByTags(config: ObsConfig, tags: string[]): ParsedNote[] {
  if (tags.length === 0) return getAllNotes(config);

  let results = getNotesByTag(config, tags[0]);

  for (let i = 1; i < tags.length; i++) {
    const tagResults = new Set(getNotesByTag(config, tags[i]).map((n) => n.path));
    results = results.filter((n) => tagResults.has(n.path));
  }

  return results;
}

/**
 * Full-text search in notes
 */
export function searchNotes(config: ObsConfig, query: string, options?: {
  tags?: string[];
  limit?: number;
  caseSensitive?: boolean;
}): ParsedNote[] {
  const opts = {
    tags: options?.tags || [],
    limit: options?.limit || 50,
    caseSensitive: options?.caseSensitive || false,
  };

  // Start with tag-filtered notes or all notes
  let notes = opts.tags.length > 0 ? getNotesByTags(config, opts.tags) : getAllNotes(config);

  // Filter by text query
  if (query) {
    const searchQuery = opts.caseSensitive ? query : query.toLowerCase();
    notes = notes.filter((note) => {
      const searchContent = opts.caseSensitive
        ? note.rawContent
        : note.rawContent.toLowerCase();
      const searchTitle = opts.caseSensitive ? note.title : note.title.toLowerCase();

      return searchContent.includes(searchQuery) || searchTitle.includes(searchQuery);
    });
  }

  // Sort by modified date (most recent first)
  notes.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());

  // Apply limit
  return notes.slice(0, opts.limit);
}

/**
 * Find a note by title (fuzzy match)
 */
export function findNoteByTitle(config: ObsConfig, title: string): ParsedNote | null {
  const notes = getAllNotes(config);
  const normalizedQuery = title.toLowerCase().trim();

  // Exact match first
  const exactMatch = notes.find(
    (n) => n.title.toLowerCase() === normalizedQuery ||
           n.filename.toLowerCase().replace(".md", "") === normalizedQuery
  );
  if (exactMatch) return exactMatch;

  // Partial match (query is contained in title)
  const partialMatch = notes.find(
    (n) => n.title.toLowerCase().includes(normalizedQuery) ||
           n.filename.toLowerCase().includes(normalizedQuery)
  );
  if (partialMatch) return partialMatch;

  // Fuzzy match using Levenshtein distance (simple version)
  const scored = notes.map((note) => ({
    note,
    score: fuzzyScore(normalizedQuery, note.title.toLowerCase()),
  }));

  scored.sort((a, b) => b.score - a.score);

  // Return best match if score is reasonable
  if (scored.length > 0 && scored[0].score > 0.3) {
    return scored[0].note;
  }

  return null;
}

/**
 * Simple fuzzy matching score (0-1)
 */
function fuzzyScore(query: string, text: string): number {
  if (text.includes(query)) return 1;

  // Count matching characters in order
  let queryIndex = 0;
  let matchCount = 0;

  for (const char of text) {
    if (queryIndex < query.length && char === query[queryIndex]) {
      matchCount++;
      queryIndex++;
    }
  }

  return matchCount / query.length;
}

/**
 * Get all unique tags in the vault
 */
export function getAllTags(config: ObsConfig): Map<string, number> {
  const tagCounts = new Map<string, number>();
  const notes = getAllNotes(config);

  for (const note of notes) {
    // Frontmatter tags
    const fmTags = note.frontmatter.tags || [];
    const tags = Array.isArray(fmTags) ? fmTags : [fmTags];

    for (const tag of tags) {
      const normalizedTag = String(tag).replace(/^#/, "");
      tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
    }

    // Inline tags
    const inlineTagRegex = /#([a-zA-Z0-9_/-]+)/g;
    let match;
    while ((match = inlineTagRegex.exec(note.content)) !== null) {
      const tag = match[1];
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  return tagCounts;
}

/**
 * Get notes from "incoming" or similar inbox folders/tags
 */
export function getIncomingNotes(config: ObsConfig): ParsedNote[] {
  const notes = getAllNotes(config);

  return notes.filter((note) => {
    // Check for incoming tag
    const fmTags = note.frontmatter.tags || [];
    const tags = (Array.isArray(fmTags) ? fmTags : [fmTags]).map((t) =>
      String(t).toLowerCase()
    );

    if (tags.includes("incoming") || tags.includes("inbox")) {
      return true;
    }

    // Check for notes in Inbox folder
    const relativePath = relative(config.vaultPath, note.path);
    if (relativePath.toLowerCase().startsWith("inbox/")) {
      return true;
    }

    return false;
  }).sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
}

/**
 * Get notes for a specific project context
 */
export function getProjectContext(config: ObsConfig, project: string): ParsedNote[] {
  const projectTag = project.startsWith("project/") ? project : `project/${project}`;
  return getNotesByTag(config, projectTag);
}

/**
 * Get recent notes (last N modified)
 */
export function getRecentNotes(config: ObsConfig, limit: number = 10): ParsedNote[] {
  const notes = getAllNotes(config);
  notes.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
  return notes.slice(0, limit);
}

/**
 * Write a new note to the vault
 */
export function writeNote(
  config: ObsConfig,
  title: string,
  content: string,
  options?: {
    tags?: string[];
    source?: string;
    folder?: string;
    frontmatter?: NoteFrontmatter;
  }
): string {
  const opts = options || {};

  // Generate frontmatter
  const frontmatter: NoteFrontmatter = {
    generation_date: new Date().toISOString().slice(0, 16).replace("T", " "),
    tags: opts.tags || ["incoming"],
    source: opts.source || "obs-cli",
    ...opts.frontmatter,
  };

  // Generate filename and path
  const filename = generateFilename(title, opts.source);
  const folder = opts.folder || "Inbox";
  const folderPath = join(config.vaultPath, folder);
  const filePath = join(folderPath, filename);

  // Ensure folder exists
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath, { recursive: true });
  }

  // Generate full note content
  const fm = generateFrontmatter(frontmatter);
  const fullContent = `${fm}\n\n# ${title}\n\n${content}`;

  // Write file
  writeFileSync(filePath, fullContent, "utf-8");

  return filePath;
}

/**
 * Get vault statistics
 */
export function getVaultStats(config: ObsConfig): {
  totalNotes: number;
  totalTags: number;
  incomingCount: number;
  recentCount: number;
  oldestNote: Date | null;
  newestNote: Date | null;
} {
  const notes = getAllNotes(config);
  const tags = getAllTags(config);
  const incoming = getIncomingNotes(config);

  let oldest: Date | null = null;
  let newest: Date | null = null;

  for (const note of notes) {
    if (!oldest || note.createdAt < oldest) oldest = note.createdAt;
    if (!newest || note.modifiedAt > newest) newest = note.modifiedAt;
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentCount = notes.filter((n) => n.modifiedAt > oneWeekAgo).length;

  return {
    totalNotes: notes.length,
    totalTags: tags.size,
    incomingCount: incoming.length,
    recentCount,
    oldestNote: oldest,
    newestNote: newest,
  };
}
