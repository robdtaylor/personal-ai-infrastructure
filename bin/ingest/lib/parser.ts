/**
 * Share-with-hints parser
 * Extracts tags, people, and commands from message text
 */

export interface ParsedHints {
  tags: string[];
  people: string[];
  commands: string[];
  cleanContent: string;
}

/**
 * Parse share-with-hints from message text
 *
 * Patterns:
 * - Tags: #tag or #project/subtag (hierarchical)
 * - People: @username
 * - Commands: /command-name
 */
export function parseHints(text: string): ParsedHints {
  const tags: string[] = [];
  const people: string[] = [];
  const commands: string[] = [];

  // Extract tags: #tag or #project/subtag (supports hierarchical tags)
  const tagRegex = /#([a-zA-Z0-9_/-]+)/g;
  let match;
  while ((match = tagRegex.exec(text)) !== null) {
    const tag = match[1];
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }

  // Extract people: @username
  const peopleRegex = /@([a-zA-Z0-9_]+)/g;
  while ((match = peopleRegex.exec(text)) !== null) {
    const person = match[1];
    if (!people.includes(person)) {
      people.push(person);
    }
  }

  // Extract commands: /command-name (skip /start, /help etc if at start)
  const commandRegex = /(?:^|\s)\/([a-zA-Z0-9_-]+)/g;
  while ((match = commandRegex.exec(text)) !== null) {
    const command = match[1];
    // Skip common bot commands
    const skipCommands = ["start", "help", "stop", "settings"];
    if (!skipCommands.includes(command.toLowerCase()) && !commands.includes(command)) {
      commands.push(command);
    }
  }

  // Clean content: remove hints from text
  let cleanContent = text
    // Remove tags
    .replace(/#[a-zA-Z0-9_/-]+/g, "")
    // Remove people
    .replace(/@[a-zA-Z0-9_]+/g, "")
    // Remove commands (but not at line start for forwarded messages)
    .replace(/(?<=\s)\/[a-zA-Z0-9_-]+/g, "")
    // Clean up extra whitespace
    .replace(/\s+/g, " ")
    .trim();

  return {
    tags,
    people,
    commands,
    cleanContent,
  };
}

/**
 * Extract URLs from text
 */
export function extractUrls(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/gi;
  const matches = text.match(urlRegex);
  return matches ? [...new Set(matches)] : [];
}

/**
 * Detect message content type from text and attachments
 */
export function detectContentType(
  text: string | undefined,
  hasVoice: boolean,
  hasPhoto: boolean,
  hasDocument: boolean,
  hasVideo: boolean
): "text" | "voice" | "photo" | "document" | "video" | "url" {
  if (hasVoice) return "voice";
  if (hasPhoto) return "photo";
  if (hasDocument) return "document";
  if (hasVideo) return "video";

  // Check if text contains URLs
  if (text && extractUrls(text).length > 0) {
    return "url";
  }

  return "text";
}

/**
 * Generate a title from content
 */
export function generateTitle(content: string, maxLength: number = 50): string {
  // Get first line or first N words
  const firstLine = content.split("\n")[0].trim();
  const words = firstLine.split(/\s+/);

  // Take first 5-8 words
  const titleWords = words.slice(0, 8);
  let title = titleWords.join(" ");

  // Truncate if too long
  if (title.length > maxLength) {
    title = title.slice(0, maxLength - 3) + "...";
  }

  // Clean up for filename use
  title = title
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

  // Fallback if empty
  if (!title) {
    title = `capture-${Date.now()}`;
  }

  return title;
}

/**
 * Generate a filename for a captured note
 * Format: YYYY-MM-DD-Title-telegram.md
 */
export function generateFilename(title: string, source: string = "telegram"): string {
  const date = new Date().toISOString().split("T")[0];
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40)
    .replace(/^-|-$/g, "");

  return `${date}-${slug}-${source}.md`;
}
