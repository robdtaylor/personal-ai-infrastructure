/**
 * State management for ingest pipeline
 * Tracks message processing state in SQLite
 */

import { Database } from "bun:sqlite";
import { IngestConfig, debug } from "./config";

export type MessageState = "pending" | "processing" | "completed" | "failed";
export type MessageType = "text" | "voice" | "photo" | "document" | "video" | "url";

export interface IngestMessage {
  id: number;
  telegramMessageId: number;
  messageType: MessageType;
  rawContent: string;
  contentPath: string | null;
  state: MessageState;
  error: string | null;
  tags: string[];
  people: string[];
  commands: string[];
  createdAt: string;
  processedAt: string | null;
}

/**
 * Initialize the state database
 */
export function initStateDb(config: IngestConfig): Database {
  const db = new Database(config.stateDbPath);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telegram_message_id INTEGER UNIQUE,
      message_type TEXT NOT NULL,
      raw_content TEXT,
      content_path TEXT,
      state TEXT DEFAULT 'pending',
      error TEXT,
      tags TEXT DEFAULT '[]',
      people TEXT DEFAULT '[]',
      commands TEXT DEFAULT '[]',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      processed_at TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS metadata (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  // Create indexes for faster queries
  db.run(`CREATE INDEX IF NOT EXISTS idx_messages_state ON messages(state)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_messages_type ON messages(message_type)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at)`);

  return db;
}

/**
 * Get the last processed Telegram message ID
 */
export function getLastMessageId(db: Database): number {
  const result = db.query(
    "SELECT value FROM metadata WHERE key = 'last_update_id'"
  ).get() as { value: string } | null;

  return result ? parseInt(result.value, 10) : 0;
}

/**
 * Set the last processed Telegram message ID
 */
export function setLastMessageId(db: Database, updateId: number): void {
  db.run(
    "INSERT OR REPLACE INTO metadata (key, value) VALUES ('last_update_id', ?)",
    [String(updateId)]
  );
}

/**
 * Add a new message to the state database
 */
export function addMessage(
  db: Database,
  telegramMessageId: number,
  messageType: MessageType,
  rawContent: string,
  contentPath: string | null,
  hints: { tags: string[]; people: string[]; commands: string[] }
): number {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO messages
    (telegram_message_id, message_type, raw_content, content_path, tags, people, commands)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    telegramMessageId,
    messageType,
    rawContent,
    contentPath,
    JSON.stringify(hints.tags),
    JSON.stringify(hints.people),
    JSON.stringify(hints.commands)
  );

  return Number(result.lastInsertRowid);
}

/**
 * Update message state
 */
export function updateMessageState(
  db: Database,
  id: number,
  state: MessageState,
  error?: string
): void {
  if (state === "completed" || state === "failed") {
    db.run(
      "UPDATE messages SET state = ?, error = ?, processed_at = CURRENT_TIMESTAMP WHERE id = ?",
      [state, error || null, id]
    );
  } else {
    db.run(
      "UPDATE messages SET state = ?, error = ? WHERE id = ?",
      [state, error || null, id]
    );
  }
}

/**
 * Get messages by state
 */
export function getMessagesByState(db: Database, state: MessageState): IngestMessage[] {
  const rows = db.query(
    "SELECT * FROM messages WHERE state = ? ORDER BY created_at ASC"
  ).all(state) as {
    id: number;
    telegram_message_id: number;
    message_type: string;
    raw_content: string;
    content_path: string | null;
    state: string;
    error: string | null;
    tags: string;
    people: string;
    commands: string;
    created_at: string;
    processed_at: string | null;
  }[];

  return rows.map((row) => ({
    id: row.id,
    telegramMessageId: row.telegram_message_id,
    messageType: row.message_type as MessageType,
    rawContent: row.raw_content,
    contentPath: row.content_path,
    state: row.state as MessageState,
    error: row.error,
    tags: JSON.parse(row.tags),
    people: JSON.parse(row.people),
    commands: JSON.parse(row.commands),
    createdAt: row.created_at,
    processedAt: row.processed_at,
  }));
}

/**
 * Get message counts by state
 */
export function getMessageCounts(db: Database): Record<MessageState, number> {
  const counts: Record<MessageState, number> = {
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
  };

  const rows = db.query(
    "SELECT state, COUNT(*) as count FROM messages GROUP BY state"
  ).all() as { state: string; count: number }[];

  for (const row of rows) {
    counts[row.state as MessageState] = row.count;
  }

  return counts;
}

/**
 * Get message counts by type
 */
export function getMessageCountsByType(db: Database): Record<string, number> {
  const rows = db.query(
    "SELECT message_type, COUNT(*) as count FROM messages GROUP BY message_type"
  ).all() as { message_type: string; count: number }[];

  const counts: Record<string, number> = {};
  for (const row of rows) {
    counts[row.message_type] = row.count;
  }

  return counts;
}

/**
 * Get recent messages
 */
export function getRecentMessages(db: Database, limit: number = 10): IngestMessage[] {
  const rows = db.query(
    "SELECT * FROM messages ORDER BY created_at DESC LIMIT ?"
  ).all(limit) as {
    id: number;
    telegram_message_id: number;
    message_type: string;
    raw_content: string;
    content_path: string | null;
    state: string;
    error: string | null;
    tags: string;
    people: string;
    commands: string;
    created_at: string;
    processed_at: string | null;
  }[];

  return rows.map((row) => ({
    id: row.id,
    telegramMessageId: row.telegram_message_id,
    messageType: row.message_type as MessageType,
    rawContent: row.raw_content,
    contentPath: row.content_path,
    state: row.state as MessageState,
    error: row.error,
    tags: JSON.parse(row.tags),
    people: JSON.parse(row.people),
    commands: JSON.parse(row.commands),
    createdAt: row.created_at,
    processedAt: row.processed_at,
  }));
}

/**
 * Get failed messages
 */
export function getFailedMessages(db: Database): IngestMessage[] {
  return getMessagesByState(db, "failed");
}

/**
 * Retry failed messages (reset to pending)
 */
export function retryFailedMessages(db: Database): number {
  const result = db.run(
    "UPDATE messages SET state = 'pending', error = NULL WHERE state = 'failed'"
  );
  return result.changes;
}

/**
 * Clear all messages (for testing)
 */
export function clearAllMessages(db: Database): void {
  db.run("DELETE FROM messages");
  db.run("DELETE FROM metadata WHERE key = 'last_update_id'");
}
