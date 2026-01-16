/**
 * Message processor - converts captured messages into Obsidian notes
 * Now with multi-modal processing: images, documents, URLs
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, basename } from "path";
import { IngestConfig, debug } from "./config";
import {
  initStateDb,
  getMessagesByState,
  updateMessageState,
  IngestMessage,
} from "./state";
import { generateTitle, generateFilename, extractUrls } from "./parser";
import { analyzeImage, formatVisionAnalysis } from "./vision";
import { extractDocument, formatDocumentExtraction } from "./documents";
import { fetchUrl, formatUrlExtraction } from "./urls";
import {
  logProcessStart,
  logProcessComplete,
  logProcessFailed,
  logFileCreated,
  logApiCall,
} from "./audit";

/**
 * Generate frontmatter YAML
 */
function generateFrontmatter(data: Record<string, unknown>): string {
  const lines: string[] = ["---"];

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) continue;
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
 * Process a text message into an Obsidian note
 */
function processTextMessage(
  config: IngestConfig,
  message: IngestMessage
): string {
  const title = generateTitle(message.rawContent);
  const filename = generateFilename(title, "telegram");
  const folder = join(config.vaultPath, "Inbox");

  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }

  const frontmatter = generateFrontmatter({
    generation_date: new Date().toISOString().slice(0, 16).replace("T", " "),
    tags: message.tags.length > 0 ? message.tags : ["incoming"],
    source: "telegram",
    telegram_id: message.telegramMessageId,
    processed: false,
  });

  let content = `${frontmatter}\n\n`;
  content += `# ${title}\n\n`;
  content += message.rawContent;

  if (message.people.length > 0) {
    content += `\n\n---\n**People:** ${message.people.map((p) => `@${p}`).join(", ")}`;
  }

  if (message.commands.length > 0) {
    content += `\n\n**Commands:** ${message.commands.map((c) => `/${c}`).join(", ")}`;
  }

  const filePath = join(folder, filename);
  writeFileSync(filePath, content, "utf-8");

  return filePath;
}

/**
 * Process a URL message - fetch and extract content
 */
async function processUrlMessage(
  config: IngestConfig,
  message: IngestMessage
): Promise<string> {
  const urls = extractUrls(message.rawContent);
  const primaryUrl = urls[0] || "";

  // Fetch URL content
  const urlResult = await fetchUrl(primaryUrl, config);

  const filename = generateFilename(urlResult.title.slice(0, 40), "url");
  const folder = join(config.vaultPath, "Inbox");

  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }

  const tags = message.tags.length > 0 ? message.tags : ["incoming", "url"];
  if (urlResult.isYouTube && !tags.includes("youtube")) {
    tags.push("youtube");
  }

  const frontmatter = generateFrontmatter({
    generation_date: new Date().toISOString().slice(0, 16).replace("T", " "),
    tags,
    source: "telegram",
    url: primaryUrl,
    domain: urlResult.domain,
    telegram_id: message.telegramMessageId,
    processed: true,
  });

  let content = `${frontmatter}\n\n`;
  content += `# ${urlResult.title}\n\n`;
  content += formatUrlExtraction(urlResult);

  if (message.rawContent !== primaryUrl && message.rawContent.trim()) {
    content += `\n\n---\n**Notes:**\n${message.rawContent}\n`;
  }

  const filePath = join(folder, filename);
  writeFileSync(filePath, content, "utf-8");

  return filePath;
}

/**
 * Process a photo message - analyze with vision API
 */
async function processPhotoMessage(
  config: IngestConfig,
  message: IngestMessage
): Promise<string> {
  const folder = join(config.vaultPath, "Inbox");
  const attachmentsFolder = join(config.vaultPath, "attachments");

  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }
  if (!existsSync(attachmentsFolder)) {
    mkdirSync(attachmentsFolder, { recursive: true });
  }

  // Copy photo to attachments folder
  let embeddedPath = "";
  if (message.contentPath && existsSync(message.contentPath)) {
    const photoFilename = basename(message.contentPath);
    const destPath = join(attachmentsFolder, photoFilename);

    const photoData = readFileSync(message.contentPath);
    writeFileSync(destPath, photoData);

    embeddedPath = `attachments/${photoFilename}`;
  }

  // Analyze image with GPT-4o Vision
  let analysis;
  let title = `Photo ${new Date().toISOString().slice(0, 10)}`;

  if (message.contentPath && existsSync(message.contentPath)) {
    try {
      analysis = await analyzeImage(message.contentPath, config, {
        context: message.rawContent || undefined,
      });
      title = analysis.suggestedTitle;
    } catch (error) {
      debug(config, `Vision analysis failed: ${error}`);
      // Continue without analysis
    }
  }

  const filename = generateFilename(title, "photo");

  // Merge detected tags with user tags
  const tags = [...(message.tags.length > 0 ? message.tags : ["incoming", "photo"])];
  if (analysis?.tags) {
    for (const tag of analysis.tags) {
      const normalizedTag = tag.toLowerCase().replace(/\s+/g, "-");
      if (!tags.includes(normalizedTag)) {
        tags.push(normalizedTag);
      }
    }
  }

  const frontmatter = generateFrontmatter({
    generation_date: new Date().toISOString().slice(0, 16).replace("T", " "),
    tags,
    source: "telegram",
    telegram_id: message.telegramMessageId,
    analyzed: !!analysis,
    processed: true,
  });

  let content = `${frontmatter}\n\n`;
  content += `# ${title}\n\n`;

  if (analysis) {
    content += formatVisionAnalysis(analysis, message.contentPath || "", embeddedPath);
  } else {
    if (embeddedPath) {
      content += `![[${embeddedPath}]]\n\n`;
    }
    content += `> [!warning] Analysis Failed\n`;
    content += `> Image could not be analyzed. Check API key and try again.\n\n`;
  }

  if (message.rawContent) {
    content += `\n---\n**Caption:**\n${message.rawContent}\n`;
  }

  const filePath = join(folder, filename);
  writeFileSync(filePath, content, "utf-8");

  return filePath;
}

/**
 * Process a document message - extract text content
 */
async function processDocumentMessage(
  config: IngestConfig,
  message: IngestMessage
): Promise<string> {
  const docName = message.contentPath ? basename(message.contentPath) : "document";
  const folder = join(config.vaultPath, "Inbox");
  const attachmentsFolder = join(config.vaultPath, "attachments");

  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }
  if (!existsSync(attachmentsFolder)) {
    mkdirSync(attachmentsFolder, { recursive: true });
  }

  // Copy document to attachments folder
  let attachmentPath = "";
  if (message.contentPath && existsSync(message.contentPath)) {
    const destPath = join(attachmentsFolder, docName);
    const docData = readFileSync(message.contentPath);
    writeFileSync(destPath, docData);
    attachmentPath = `attachments/${docName}`;
  }

  // Extract document content
  let extraction;
  let title = `Document: ${docName}`;

  if (message.contentPath && existsSync(message.contentPath)) {
    try {
      extraction = await extractDocument(message.contentPath, config);
      title = extraction.title || docName.replace(/\.[^.]+$/, "");
    } catch (error) {
      debug(config, `Document extraction failed: ${error}`);
    }
  }

  const filename = generateFilename(title.slice(0, 40), "document");

  const frontmatter = generateFrontmatter({
    generation_date: new Date().toISOString().slice(0, 16).replace("T", " "),
    tags: message.tags.length > 0 ? message.tags : ["incoming", "document"],
    source: "telegram",
    attachment: attachmentPath,
    telegram_id: message.telegramMessageId,
    extracted: !!extraction,
    extraction_method: extraction?.method,
    processed: true,
  });

  let content = `${frontmatter}\n\n`;
  content += `# ${title}\n\n`;

  if (extraction) {
    content += formatDocumentExtraction(extraction, message.contentPath || "", attachmentPath);
  } else {
    if (attachmentPath) {
      content += `**File:** [[${attachmentPath}]]\n\n`;
    }
    content += `> [!warning] Extraction Failed\n`;
    content += `> Document content could not be extracted.\n\n`;
  }

  if (message.rawContent) {
    content += `\n---\n**Notes:**\n${message.rawContent}\n`;
  }

  const filePath = join(folder, filename);
  writeFileSync(filePath, content, "utf-8");

  return filePath;
}

/**
 * Process a voice message (placeholder - user has Whispr Flow)
 */
function processVoiceMessage(
  config: IngestConfig,
  message: IngestMessage
): string {
  const title = `Voice Memo ${new Date().toISOString().slice(0, 10)}`;
  const filename = generateFilename(title, "voice");
  const folder = join(config.vaultPath, "Inbox");

  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }

  const audioFile = message.contentPath ? basename(message.contentPath) : "unknown";

  const frontmatter = generateFrontmatter({
    generation_date: new Date().toISOString().slice(0, 16).replace("T", " "),
    tags: message.tags.length > 0 ? message.tags : ["incoming", "voice"],
    source: "telegram",
    audio_file: audioFile,
    telegram_id: message.telegramMessageId,
    processed: false,
  });

  let content = `${frontmatter}\n\n`;
  content += `# ${title}\n\n`;
  content += `**Audio File:** \`${message.contentPath || "not available"}\`\n\n`;
  content += `> [!info] Voice Memo\n`;
  content += `> Consider using Whispr Flow to transcribe before sending.\n\n`;

  if (message.rawContent) {
    content += `**Caption:**\n${message.rawContent}\n`;
  }

  const filePath = join(folder, filename);
  writeFileSync(filePath, content, "utf-8");

  return filePath;
}

/**
 * Process a single message (async for multi-modal)
 */
async function processMessage(
  config: IngestConfig,
  message: IngestMessage
): Promise<string> {
  switch (message.messageType) {
    case "text":
      return processTextMessage(config, message);
    case "url":
      return processUrlMessage(config, message);
    case "voice":
      return processVoiceMessage(config, message);
    case "photo":
      return processPhotoMessage(config, message);
    case "document":
      return processDocumentMessage(config, message);
    case "video":
      return processDocumentMessage(config, message);
    default:
      throw new Error(`Unknown message type: ${message.messageType}`);
  }
}

/**
 * Process all pending messages
 */
export async function processAllPending(
  config: IngestConfig,
  options?: { verbose?: boolean; type?: string }
): Promise<{
  processed: number;
  failed: number;
  results: { id: number; path: string; error?: string }[];
}> {
  const verbose = options?.verbose || false;
  const filterType = options?.type;

  const db = initStateDb(config);
  let pending = getMessagesByState(db, "pending");

  if (filterType) {
    pending = pending.filter((m) => m.messageType === filterType);
  }

  if (verbose) {
    console.log(`Processing ${pending.length} pending message(s)...`);
  }

  let processed = 0;
  let failed = 0;
  const results: { id: number; path: string; error?: string }[] = [];

  for (const message of pending) {
    updateMessageState(db, message.id, "processing");
    logProcessStart(config, message.id, message.messageType);
    const startTime = Date.now();

    try {
      const notePath = await processMessage(config, message);
      const durationMs = Date.now() - startTime;

      updateMessageState(db, message.id, "completed");
      logProcessComplete(config, message.id, message.messageType, notePath, durationMs);
      logFileCreated(config, notePath, "obsidian-note");
      processed++;

      results.push({ id: message.id, path: notePath });

      if (verbose) {
        console.log(`  ✅ [${message.messageType}] → ${notePath} (${durationMs}ms)`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);

      updateMessageState(db, message.id, "failed", errorMsg);
      logProcessFailed(config, message.id, message.messageType, errorMsg);
      failed++;

      results.push({ id: message.id, path: "", error: errorMsg });

      if (verbose) {
        console.log(`  ❌ [${message.messageType}] Error: ${errorMsg}`);
      }
    }
  }

  db.close();

  return { processed, failed, results };
}
