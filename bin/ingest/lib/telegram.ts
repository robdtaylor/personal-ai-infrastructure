/**
 * Telegram Bot API client
 * Fetches messages from a private channel/chat
 */

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { IngestConfig, TelegramConfig, debug } from "./config";
import { parseHints, detectContentType, extractUrls } from "./parser";
import { addMessage, getLastMessageId, setLastMessageId, initStateDb, MessageType } from "./state";
import { logPollStart, logPollComplete, logMessageCaptured, logError } from "./audit";

const TELEGRAM_API_BASE = "https://api.telegram.org/bot";

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  channel_post?: TelegramMessage;
}

export interface TelegramMessage {
  message_id: number;
  date: number;
  text?: string;
  caption?: string;
  voice?: TelegramFile;
  audio?: TelegramFile;
  photo?: TelegramPhotoSize[];
  document?: TelegramDocument;
  video?: TelegramFile;
  from?: {
    id: number;
    username?: string;
    first_name?: string;
  };
  chat: {
    id: number;
    type: string;
  };
}

interface TelegramFile {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  duration?: number;
  mime_type?: string;
}

interface TelegramPhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

interface TelegramDocument {
  file_id: string;
  file_unique_id: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

interface TelegramGetUpdatesResponse {
  ok: boolean;
  result: TelegramUpdate[];
  description?: string;
}

interface TelegramGetFileResponse {
  ok: boolean;
  result: {
    file_id: string;
    file_unique_id: string;
    file_size?: number;
    file_path?: string;
  };
  description?: string;
}

/**
 * Get updates from Telegram Bot API
 */
export async function getUpdates(
  telegram: TelegramConfig,
  offset?: number,
  limit: number = 100
): Promise<TelegramUpdate[]> {
  const params = new URLSearchParams({
    limit: String(limit),
    allowed_updates: JSON.stringify(["message", "channel_post"]),
  });

  if (offset !== undefined) {
    params.set("offset", String(offset));
  }

  const url = `${TELEGRAM_API_BASE}${telegram.botToken}/getUpdates?${params}`;

  const response = await fetch(url);
  const data = (await response.json()) as TelegramGetUpdatesResponse;

  if (!data.ok) {
    throw new Error(`Telegram API error: ${data.description}`);
  }

  return data.result;
}

/**
 * Get file download path from Telegram
 */
async function getFilePath(telegram: TelegramConfig, fileId: string): Promise<string> {
  const url = `${TELEGRAM_API_BASE}${telegram.botToken}/getFile?file_id=${fileId}`;

  const response = await fetch(url);
  const data = (await response.json()) as TelegramGetFileResponse;

  if (!data.ok || !data.result.file_path) {
    throw new Error(`Failed to get file path: ${data.description}`);
  }

  return data.result.file_path;
}

/**
 * Download a file from Telegram
 */
export async function downloadFile(
  telegram: TelegramConfig,
  fileId: string,
  destPath: string
): Promise<void> {
  const filePath = await getFilePath(telegram, fileId);
  const url = `https://api.telegram.org/file/bot${telegram.botToken}/${filePath}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  writeFileSync(destPath, Buffer.from(buffer));
}

/**
 * Get file extension from mime type or filename
 */
function getExtension(mimeType?: string, fileName?: string): string {
  if (fileName) {
    const ext = fileName.split(".").pop();
    if (ext) return ext;
  }

  const mimeMap: Record<string, string> = {
    "audio/ogg": "ogg",
    "audio/mpeg": "mp3",
    "audio/mp4": "m4a",
    "audio/wav": "wav",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "video/mp4": "mp4",
    "application/pdf": "pdf",
    "text/plain": "txt",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  };

  return mimeMap[mimeType || ""] || "bin";
}

/**
 * Process a single Telegram message
 */
async function processMessage(
  config: IngestConfig,
  telegram: TelegramConfig,
  message: TelegramMessage
): Promise<{
  type: MessageType;
  rawContent: string;
  contentPath: string | null;
  hints: { tags: string[]; people: string[]; commands: string[] };
}> {
  // Ensure temp directory exists
  if (!existsSync(config.tempDir)) {
    mkdirSync(config.tempDir, { recursive: true });
  }

  // Get text content (either text or caption for media)
  const textContent = message.text || message.caption || "";

  // Parse hints from text
  const hints = parseHints(textContent);

  // Detect content type
  const hasVoice = !!(message.voice || message.audio);
  const hasPhoto = !!(message.photo && message.photo.length > 0);
  const hasDocument = !!message.document;
  const hasVideo = !!message.video;

  const messageType = detectContentType(textContent, hasVoice, hasPhoto, hasDocument, hasVideo);

  let contentPath: string | null = null;

  // Download attachments if any
  if (message.voice) {
    const ext = getExtension(message.voice.mime_type);
    contentPath = join(config.tempDir, `voice-${message.message_id}.${ext}`);
    await downloadFile(telegram, message.voice.file_id, contentPath);
    debug(config, `Downloaded voice: ${contentPath}`);
  } else if (message.audio) {
    const ext = getExtension(message.audio.mime_type);
    contentPath = join(config.tempDir, `audio-${message.message_id}.${ext}`);
    await downloadFile(telegram, message.audio.file_id, contentPath);
    debug(config, `Downloaded audio: ${contentPath}`);
  } else if (message.photo && message.photo.length > 0) {
    // Get largest photo
    const largestPhoto = message.photo.reduce((a, b) =>
      (a.file_size || 0) > (b.file_size || 0) ? a : b
    );
    contentPath = join(config.tempDir, `photo-${message.message_id}.jpg`);
    await downloadFile(telegram, largestPhoto.file_id, contentPath);
    debug(config, `Downloaded photo: ${contentPath}`);
  } else if (message.document) {
    const ext = getExtension(message.document.mime_type, message.document.file_name);
    const safeName = message.document.file_name?.replace(/[^a-zA-Z0-9.-]/g, "_") || `doc-${message.message_id}`;
    contentPath = join(config.tempDir, `${safeName}`);
    await downloadFile(telegram, message.document.file_id, contentPath);
    debug(config, `Downloaded document: ${contentPath}`);
  } else if (message.video) {
    const ext = getExtension(message.video.mime_type);
    contentPath = join(config.tempDir, `video-${message.message_id}.${ext}`);
    await downloadFile(telegram, message.video.file_id, contentPath);
    debug(config, `Downloaded video: ${contentPath}`);
  }

  return {
    type: messageType,
    rawContent: textContent,
    contentPath,
    hints: {
      tags: hints.tags,
      people: hints.people,
      commands: hints.commands,
    },
  };
}

/**
 * Poll for new messages and store in state database
 */
export async function pollMessages(
  config: IngestConfig,
  telegram: TelegramConfig,
  options?: { verbose?: boolean }
): Promise<{
  newMessages: number;
  byType: Record<string, number>;
}> {
  const verbose = options?.verbose || false;
  const db = initStateDb(config);

  logPollStart(config);

  // Get the last processed update ID
  const lastUpdateId = getLastMessageId(db);
  const offset = lastUpdateId > 0 ? lastUpdateId + 1 : undefined;

  if (verbose) {
    console.log(`Fetching updates (offset: ${offset || "none"})...`);
  }

  // Fetch updates from Telegram
  const updates = await getUpdates(telegram, offset);

  if (verbose) {
    console.log(`Received ${updates.length} update(s)`);
  }

  let newMessages = 0;
  const byType: Record<string, number> = {};

  for (const update of updates) {
    // Handle both regular messages and channel posts
    const message = update.message || update.channel_post;

    if (!message) continue;

    // Skip messages not from configured chat
    if (String(message.chat.id) !== telegram.chatId) {
      debug(config, `Skipping message from different chat: ${message.chat.id}`);
      continue;
    }

    try {
      const processed = await processMessage(config, telegram, message);

      // Store in database
      addMessage(
        db,
        message.message_id,
        processed.type,
        processed.rawContent,
        processed.contentPath,
        processed.hints
      );

      // Audit log the capture
      logMessageCaptured(
        config,
        message.message_id,
        processed.type,
        processed.hints.tags,
        !!processed.contentPath
      );

      newMessages++;
      byType[processed.type] = (byType[processed.type] || 0) + 1;

      if (verbose) {
        const tagsStr = processed.hints.tags.length > 0
          ? ` [tags: ${processed.hints.tags.join(", ")}]`
          : "";
        console.log(`  [${processed.type}] ${processed.rawContent.slice(0, 50)}...${tagsStr}`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      logError(config, `poll_message_${message.message_id}`, errorMsg);
      console.error(`Failed to process message ${message.message_id}:`, error);
    }

    // Update the last processed update ID
    setLastMessageId(db, update.update_id);
  }

  db.close();

  logPollComplete(config, newMessages, byType);

  return { newMessages, byType };
}

/**
 * Test Telegram bot connection
 */
export async function testConnection(telegram: TelegramConfig): Promise<{
  ok: boolean;
  botName?: string;
  error?: string;
}> {
  try {
    const url = `${TELEGRAM_API_BASE}${telegram.botToken}/getMe`;
    const response = await fetch(url);
    const data = await response.json() as {
      ok: boolean;
      result?: { username: string; first_name: string };
      description?: string;
    };

    if (data.ok && data.result) {
      return { ok: true, botName: data.result.username };
    }

    return { ok: false, error: data.description || "Unknown error" };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}
