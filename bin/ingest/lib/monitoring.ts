/**
 * Monitoring & Stats - Track pipeline health and API usage
 */

import { existsSync, statSync, readFileSync } from "fs";
import { join } from "path";
import { IngestConfig } from "./config";
import { initStateDb, getMessageCounts, getMessageCountsByType } from "./state";

export interface PipelineStats {
  // Message stats
  messages: {
    total: number;
    pending: number;
    processing: number;
    completed: number;
    failed: number;
    byType: Record<string, number>;
  };

  // Storage stats
  storage: {
    stateDbSize: number;
    embeddingsDbSize: number;
    auditLogSize: number;
    tempDirSize: number;
    attachmentsSize: number;
  };

  // API usage (from audit log)
  apiUsage: {
    openaiCalls: number;
    estimatedCost: number;
    lastCall?: string;
  };

  // Health indicators
  health: {
    stateDbOk: boolean;
    telegramConfigured: boolean;
    openaiConfigured: boolean;
    vaultAccessible: boolean;
    diskSpaceOk: boolean;
  };

  // Timestamps
  timestamps: {
    lastPoll?: string;
    lastProcess?: string;
    oldestPending?: string;
  };
}

/**
 * Get directory size (recursive)
 */
function getDirSize(dirPath: string): number {
  if (!existsSync(dirPath)) return 0;

  let size = 0;
  try {
    const proc = Bun.spawnSync(["du", "-sk", dirPath]);
    const output = new TextDecoder().decode(proc.stdout);
    const match = output.match(/^(\d+)/);
    if (match) {
      size = parseInt(match[1]) * 1024; // du -sk gives KB
    }
  } catch {
    // Fallback: just return 0
  }
  return size;
}

/**
 * Get file size safely
 */
function getFileSize(filePath: string): number {
  if (!existsSync(filePath)) return 0;
  try {
    return statSync(filePath).size;
  } catch {
    return 0;
  }
}

/**
 * Parse audit log for API usage stats
 */
function getApiUsageFromAuditLog(config: IngestConfig): {
  openaiCalls: number;
  estimatedCost: number;
  lastCall?: string;
} {
  const auditLogPath = join(config.paiDir, "ingest-audit.log");

  if (!existsSync(auditLogPath)) {
    return { openaiCalls: 0, estimatedCost: 0 };
  }

  let openaiCalls = 0;
  let estimatedCost = 0;
  let lastCall: string | undefined;

  try {
    const content = readFileSync(auditLogPath, "utf-8");
    const lines = content.split("\n").filter(Boolean);

    for (const line of lines) {
      try {
        const event = JSON.parse(line);
        if (event.event === "api_call" && event.details?.api === "openai") {
          openaiCalls++;
          if (event.details.estimatedCost) {
            estimatedCost += event.details.estimatedCost;
          }
          lastCall = event.timestamp;
        }
      } catch {
        // Skip malformed lines
      }
    }
  } catch {
    // Ignore read errors
  }

  return { openaiCalls, estimatedCost, lastCall };
}

/**
 * Get timestamps from audit log
 */
function getTimestampsFromAuditLog(config: IngestConfig): {
  lastPoll?: string;
  lastProcess?: string;
} {
  const auditLogPath = join(config.paiDir, "ingest-audit.log");

  if (!existsSync(auditLogPath)) {
    return {};
  }

  let lastPoll: string | undefined;
  let lastProcess: string | undefined;

  try {
    const content = readFileSync(auditLogPath, "utf-8");
    const lines = content.split("\n").filter(Boolean);

    // Read from end for efficiency
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const event = JSON.parse(lines[i]);
        if (!lastPoll && event.event === "poll_complete") {
          lastPoll = event.timestamp;
        }
        if (!lastProcess && event.event === "process_complete") {
          lastProcess = event.timestamp;
        }
        if (lastPoll && lastProcess) break;
      } catch {
        // Skip malformed lines
      }
    }
  } catch {
    // Ignore read errors
  }

  return { lastPoll, lastProcess };
}

/**
 * Check available disk space
 */
function checkDiskSpace(path: string): boolean {
  try {
    const proc = Bun.spawnSync(["df", "-k", path]);
    const output = new TextDecoder().decode(proc.stdout);
    const lines = output.split("\n");
    if (lines.length >= 2) {
      const parts = lines[1].split(/\s+/);
      const availableKb = parseInt(parts[3]);
      // Warn if less than 1GB available
      return availableKb > 1024 * 1024;
    }
  } catch {
    // Assume OK if we can't check
  }
  return true;
}

/**
 * Get comprehensive pipeline stats
 */
export function getPipelineStats(config: IngestConfig): PipelineStats {
  // Message stats from state DB
  const db = initStateDb(config);
  const counts = getMessageCounts(db);
  const byType = getMessageCountsByType(db);

  // Get oldest pending message
  let oldestPending: string | undefined;
  try {
    const stmt = db.prepare(`
      SELECT created_at FROM messages
      WHERE state = 'pending'
      ORDER BY created_at ASC
      LIMIT 1
    `);
    const row = stmt.get() as { created_at: string } | undefined;
    oldestPending = row?.created_at;
  } catch {
    // Ignore
  }
  db.close();

  // Storage stats
  const stateDbSize = getFileSize(config.stateDbPath);
  const embeddingsDbSize = getFileSize(join(config.paiDir, "embeddings.db"));
  const auditLogSize = getFileSize(join(config.paiDir, "ingest-audit.log"));
  const tempDirSize = getDirSize(config.tempDir);
  const attachmentsSize = getDirSize(join(config.vaultPath, "attachments"));

  // API usage
  const apiUsage = getApiUsageFromAuditLog(config);

  // Timestamps
  const timestamps = getTimestampsFromAuditLog(config);

  // Health checks
  const telegramConfigPath = join(config.paiDir, ".telegram-config.json");
  const health = {
    stateDbOk: existsSync(config.stateDbPath),
    telegramConfigured: existsSync(telegramConfigPath),
    openaiConfigured: !!process.env.OPENAI_API_KEY,
    vaultAccessible: existsSync(config.vaultPath),
    diskSpaceOk: checkDiskSpace(config.vaultPath),
  };

  return {
    messages: {
      total: counts.pending + counts.processing + counts.completed + counts.failed,
      ...counts,
      byType,
    },
    storage: {
      stateDbSize,
      embeddingsDbSize,
      auditLogSize,
      tempDirSize,
      attachmentsSize,
    },
    apiUsage,
    health,
    timestamps: {
      ...timestamps,
      oldestPending,
    },
  };
}

/**
 * Format bytes to human readable
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Format stats for display
 */
export function formatPipelineStats(stats: PipelineStats): string {
  const lines: string[] = [];

  lines.push("📊 Pipeline Statistics\n");

  // Messages
  lines.push("📨 Messages:");
  lines.push(`   Total: ${stats.messages.total}`);
  lines.push(`   ├─ Pending: ${stats.messages.pending}`);
  lines.push(`   ├─ Processing: ${stats.messages.processing}`);
  lines.push(`   ├─ Completed: ${stats.messages.completed}`);
  lines.push(`   └─ Failed: ${stats.messages.failed}`);

  if (Object.keys(stats.messages.byType).length > 0) {
    lines.push("\n   By Type:");
    for (const [type, count] of Object.entries(stats.messages.byType)) {
      lines.push(`   ├─ ${type}: ${count}`);
    }
  }

  // Storage
  lines.push("\n💾 Storage:");
  lines.push(`   State DB: ${formatBytes(stats.storage.stateDbSize)}`);
  lines.push(`   Embeddings DB: ${formatBytes(stats.storage.embeddingsDbSize)}`);
  lines.push(`   Audit Log: ${formatBytes(stats.storage.auditLogSize)}`);
  lines.push(`   Temp Dir: ${formatBytes(stats.storage.tempDirSize)}`);
  lines.push(`   Attachments: ${formatBytes(stats.storage.attachmentsSize)}`);

  // API Usage
  lines.push("\n🔌 API Usage:");
  lines.push(`   OpenAI Calls: ${stats.apiUsage.openaiCalls}`);
  lines.push(`   Estimated Cost: $${stats.apiUsage.estimatedCost.toFixed(4)}`);
  if (stats.apiUsage.lastCall) {
    lines.push(`   Last Call: ${stats.apiUsage.lastCall}`);
  }

  // Health
  lines.push("\n🏥 Health:");
  lines.push(`   ${stats.health.stateDbOk ? "✅" : "❌"} State DB`);
  lines.push(`   ${stats.health.telegramConfigured ? "✅" : "❌"} Telegram Config`);
  lines.push(`   ${stats.health.openaiConfigured ? "✅" : "❌"} OpenAI API Key`);
  lines.push(`   ${stats.health.vaultAccessible ? "✅" : "❌"} Vault Access`);
  lines.push(`   ${stats.health.diskSpaceOk ? "✅" : "⚠️"} Disk Space`);

  // Timestamps
  lines.push("\n🕐 Activity:");
  if (stats.timestamps.lastPoll) {
    lines.push(`   Last Poll: ${stats.timestamps.lastPoll}`);
  }
  if (stats.timestamps.lastProcess) {
    lines.push(`   Last Process: ${stats.timestamps.lastProcess}`);
  }
  if (stats.timestamps.oldestPending) {
    lines.push(`   Oldest Pending: ${stats.timestamps.oldestPending}`);
  }

  return lines.join("\n");
}
