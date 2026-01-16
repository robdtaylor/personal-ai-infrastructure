/**
 * Markdown + Frontmatter parser for Obsidian notes
 * Parses YAML frontmatter and extracts metadata
 */

import { readFileSync, statSync } from "fs";
import { basename, extname } from "path";

export interface NoteFrontmatter {
  tags?: string[];
  generation_date?: string;
  source?: string;
  processed?: boolean;
  title?: string;
  aliases?: string[];
  [key: string]: unknown;
}

export interface ParsedNote {
  path: string;
  filename: string;
  title: string;
  frontmatter: NoteFrontmatter;
  content: string;
  rawContent: string;
  modifiedAt: Date;
  createdAt: Date;
}

/**
 * Parse YAML frontmatter from note content
 */
function parseFrontmatter(content: string): { frontmatter: NoteFrontmatter; body: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const [, yamlContent, body] = match;
  const frontmatter: NoteFrontmatter = {};

  // Simple YAML parser for common frontmatter fields
  const lines = yamlContent.split("\n");
  let currentKey: string | null = null;
  let arrayValues: string[] = [];
  let inArray = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Array item (starts with -)
    if (trimmed.startsWith("- ") && currentKey && inArray) {
      arrayValues.push(trimmed.slice(2).trim().replace(/^["']|["']$/g, ""));
      continue;
    }

    // If we were in an array, save it
    if (inArray && currentKey) {
      frontmatter[currentKey] = arrayValues;
      arrayValues = [];
      inArray = false;
    }

    // Key-value pair
    const colonIndex = trimmed.indexOf(":");
    if (colonIndex > 0) {
      const key = trimmed.slice(0, colonIndex).trim();
      const value = trimmed.slice(colonIndex + 1).trim();

      currentKey = key;

      if (value === "") {
        // Could be start of array or empty value
        inArray = true;
        arrayValues = [];
      } else if (value.startsWith("[") && value.endsWith("]")) {
        // Inline array: [item1, item2]
        const items = value
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter((s) => s);
        frontmatter[key] = items;
      } else {
        // Simple value
        let parsedValue: unknown = value.replace(/^["']|["']$/g, "");

        // Parse booleans
        if (parsedValue === "true") parsedValue = true;
        else if (parsedValue === "false") parsedValue = false;

        frontmatter[key] = parsedValue;
      }
    }
  }

  // Save last array if we ended in one
  if (inArray && currentKey) {
    frontmatter[currentKey] = arrayValues;
  }

  return { frontmatter, body };
}

/**
 * Extract title from note content or filename
 */
function extractTitle(content: string, filename: string, frontmatter: NoteFrontmatter): string {
  // Priority: frontmatter title > first heading > filename

  if (frontmatter.title) {
    return String(frontmatter.title);
  }

  // Look for first heading
  const headingMatch = content.match(/^#+\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  // Use filename without extension
  return basename(filename, extname(filename));
}

/**
 * Parse a single note file
 */
export function parseNote(filePath: string): ParsedNote {
  const rawContent = readFileSync(filePath, "utf-8");
  const stats = statSync(filePath);
  const filename = basename(filePath);

  const { frontmatter, body } = parseFrontmatter(rawContent);
  const title = extractTitle(body, filename, frontmatter);

  return {
    path: filePath,
    filename,
    title,
    frontmatter,
    content: body,
    rawContent,
    modifiedAt: stats.mtime,
    createdAt: stats.birthtime,
  };
}

/**
 * Extract all tags from a note (frontmatter + inline)
 */
export function extractTags(note: ParsedNote): string[] {
  const tags = new Set<string>();

  // Add frontmatter tags
  if (note.frontmatter.tags) {
    const fmTags = Array.isArray(note.frontmatter.tags)
      ? note.frontmatter.tags
      : [note.frontmatter.tags];
    fmTags.forEach((tag) => tags.add(String(tag).replace(/^#/, "")));
  }

  // Extract inline tags from content (#tag or #project/subtag)
  const inlineTagRegex = /#([a-zA-Z0-9_/-]+)/g;
  let match;
  while ((match = inlineTagRegex.exec(note.content)) !== null) {
    tags.add(match[1]);
  }

  return Array.from(tags);
}

/**
 * Generate frontmatter YAML from object
 */
export function generateFrontmatter(data: NoteFrontmatter): string {
  const lines: string[] = ["---"];

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${String(item)}`);
      }
    } else if (typeof value === "boolean") {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === "string" && (value.includes(":") || value.includes("#"))) {
      lines.push(`${key}: "${value}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }

  lines.push("---");
  return lines.join("\n");
}

/**
 * Create a slug from a title for filenames
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50)
    .replace(/^-|-$/g, "");
}

/**
 * Generate a filename for a new note
 * Format: YYYY-MM-DD-Title-Slug.md
 */
export function generateFilename(title: string, source?: string): string {
  const date = new Date().toISOString().split("T")[0];
  const slug = slugify(title);
  const sourcePart = source ? `-${slugify(source)}` : "";
  return `${date}-${slug}${sourcePart}.md`;
}
