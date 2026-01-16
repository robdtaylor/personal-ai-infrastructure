/**
 * Audit Logging - Track all capture pipeline activity
 * Logs to ~/.claude/ingest-audit.log with automatic rotation
 */

import { existsSync, appendFileSync, statSync, renameSync, unlinkSync } from "fs";
import { join } from "path";
import { IngestConfig } from "./config";

const MAX_LOG_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_LOG_FILES = 5;

export type AuditEventType =
  | "poll_start"
  | "poll_complete"
  | "message_captured"
  | "process_start"
  | "process_complete"
  | "process_failed"
  | "api_call"
  | "file_created"
  | "error";

export interface AuditEvent {
  timestamp: string;
  event: AuditEventType;
  details: Record<string, unknown>;
}

/**
 * Get audit log path
 */
function getAuditLogPath(config: IngestConfig): string {
  return join(config.paiDir, "ingest-audit.log");
}

/**
 * Rotate log files if needed
 */
function rotateLogsIfNeeded(logPath: string): void {
  if (!existsSync(logPath)) return;

  try {
    const stats = statSync(logPath);
    if (stats.size < MAX_LOG_SIZE) return;

    // Rotate existing log files
    for (let i = MAX_LOG_FILES - 1; i >= 1; i--) {
      const oldPath = `${logPath}.${i}`;
      const newPath = `${logPath}.${i + 1}`;

      if (existsSync(oldPath)) {
        if (i === MAX_LOG_FILES - 1) {
          unlinkSync(oldPath); // Delete oldest
        } else {
          renameSync(oldPath, newPath);
        }
      }
    }

    // Rotate current log
    renameSync(logPath, `${logPath}.1`);
  } catch (error) {
    // Silently fail rotation - don't block logging
    console.error(`Log rotation failed: ${error}`);
  }
}

/**
 * Scrub sensitive data from log entries
 */
function scrubSensitiveData(data: Record<string, unknown>): Record<string, unknown> {
  const sensitivePatterns = [
    /sk-[a-zA-Z0-9]{20,}/g,           // OpenAI API keys
    /\b[0-9]{10}:[A-Za-z0-9_-]{35}\b/g, // Telegram bot tokens
    /password["\s:=]+["']?[^"'\s,}]+/gi,
    /api[_-]?key["\s:=]+["']?[^"'\s,}]+/gi,
    /secret["\s:=]+["']?[^"'\s,}]+/gi,
    /token["\s:=]+["']?[^"'\s,}]+/gi,
  ];

  const scrubbed = { ...data };

  const scrubValue = (value: unknown): unknown => {
    if (typeof value === "string") {
      let result = value;
      for (const pattern of sensitivePatterns) {
        result = result.replace(pattern, "[REDACTED]");
      }
      return result;
    }
    if (Array.isArray(value)) {
      return value.map(scrubValue);
    }
    if (value && typeof value === "object") {
      const obj: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        obj[k] = scrubValue(v);
      }
      return obj;
    }
    return value;
  };

  for (const [key, value] of Object.entries(scrubbed)) {
    scrubbed[key] = scrubValue(value);
  }

  return scrubbed;
}

/**
 * Log an audit event
 */
export function logAuditEvent(
  config: IngestConfig,
  event: AuditEventType,
  details: Record<string, unknown> = {}
): void {
  const logPath = getAuditLogPath(config);

  try {
    rotateLogsIfNeeded(logPath);

    const auditEvent: AuditEvent = {
      timestamp: new Date().toISOString(),
      event,
      details: scrubSensitiveData(details),
    };

    const logLine = JSON.stringify(auditEvent) + "\n";
    appendFileSync(logPath, logLine, "utf-8");
  } catch (error) {
    // Don't let logging failures break the pipeline
    console.error(`Audit logging failed: ${error}`);
  }
}

/**
 * Log a poll operation
 */
export function logPollStart(config: IngestConfig): void {
  logAuditEvent(config, "poll_start", {
    source: "telegram",
  });
}

export function logPollComplete(
  config: IngestConfig,
  newMessages: number,
  byType: Record<string, number>
): void {
  logAuditEvent(config, "poll_complete", {
    source: "telegram",
    newMessages,
    byType,
  });
}

/**
 * Log a message capture
 */
export function logMessageCaptured(
  config: IngestConfig,
  messageId: number,
  messageType: string,
  tags: string[],
  hasAttachment: boolean
): void {
  logAuditEvent(config, "message_captured", {
    messageId,
    messageType,
    tags,
    hasAttachment,
  });
}

/**
 * Log processing events
 */
export function logProcessStart(config: IngestConfig, messageId: number, messageType: string): void {
  logAuditEvent(config, "process_start", {
    messageId,
    messageType,
  });
}

export function logProcessComplete(
  config: IngestConfig,
  messageId: number,
  messageType: string,
  notePath: string,
  durationMs: number
): void {
  logAuditEvent(config, "process_complete", {
    messageId,
    messageType,
    notePath,
    durationMs,
  });
}

export function logProcessFailed(
  config: IngestConfig,
  messageId: number,
  messageType: string,
  error: string
): void {
  logAuditEvent(config, "process_failed", {
    messageId,
    messageType,
    error,
  });
}

/**
 * Log API calls (for cost tracking)
 */
export function logApiCall(
  config: IngestConfig,
  api: string,
  operation: string,
  tokensUsed?: number,
  cost?: number
): void {
  logAuditEvent(config, "api_call", {
    api,
    operation,
    tokensUsed,
    estimatedCost: cost,
  });
}

/**
 * Log file creation
 */
export function logFileCreated(config: IngestConfig, filePath: string, fileType: string): void {
  logAuditEvent(config, "file_created", {
    filePath,
    fileType,
  });
}

/**
 * Log errors
 */
export function logError(config: IngestConfig, context: string, error: string): void {
  logAuditEvent(config, "error", {
    context,
    error,
  });
}

/**
 * Get audit log stats
 */
export function getAuditStats(config: IngestConfig): {
  logSize: number;
  logFiles: number;
  recentEvents: number;
} {
  const logPath = getAuditLogPath(config);
  let logSize = 0;
  let logFiles = 0;
  let recentEvents = 0;

  if (existsSync(logPath)) {
    logSize = statSync(logPath).size;
    logFiles = 1;

    // Count rotated files
    for (let i = 1; i <= MAX_LOG_FILES; i++) {
      if (existsSync(`${logPath}.${i}`)) {
        logFiles++;
      }
    }

    // Count recent events (last 24 hours) - quick estimate from file
    try {
      const content = Bun.file(logPath).text();
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      // This is a rough estimate - counts lines with recent timestamps
      recentEvents = content.then(text =>
        text.split("\n").filter(line => line > `{"timestamp":"${oneDayAgo}`).length
      ) as unknown as number;
    } catch {
      // Ignore counting errors
    }
  }

  return { logSize, logFiles, recentEvents };
}
