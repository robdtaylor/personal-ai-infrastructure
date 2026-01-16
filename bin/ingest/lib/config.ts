/**
 * Configuration management for ingest CLI
 * Handles Telegram credentials and paths
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export interface IngestConfig {
  paiDir: string;
  telegramConfigPath: string;
  stateDbPath: string;
  tempDir: string;
  vaultPath: string;
  debug: boolean;
}

/**
 * Load environment variables from ~/.claude/.env
 */
export function loadEnv(): void {
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
}

/**
 * Resolve the Obsidian vault path
 */
function resolveVaultPath(): string {
  const envPath = process.env.OBSIDIAN_VAULT_PATH;
  if (envPath) {
    const resolved = envPath.replace(/^~/, homedir());
    if (existsSync(resolved)) {
      return resolved;
    }
  }

  const personalVault = join(homedir(), "Documents", "personal");
  if (existsSync(personalVault)) {
    return personalVault;
  }

  const fallbackVault = join(homedir(), ".obsidian-vault");
  if (existsSync(fallbackVault)) {
    return fallbackVault;
  }

  throw new Error("No Obsidian vault found. Set OBSIDIAN_VAULT_PATH environment variable.");
}

/**
 * Get the full configuration object
 */
export function getConfig(): IngestConfig {
  const claudeDir = process.env.PAI_DIR || join(homedir(), ".claude");

  return {
    paiDir: claudeDir,
    telegramConfigPath: join(claudeDir, ".telegram-config.json"),
    stateDbPath: join(claudeDir, "ingest-state.db"),
    tempDir: join(claudeDir, "ingest-temp"),
    vaultPath: resolveVaultPath(),
    debug: process.env.INGEST_DEBUG === "true" || process.argv.includes("--debug"),
  };
}

/**
 * Load Telegram configuration
 */
export function getTelegramConfig(config: IngestConfig): TelegramConfig | null {
  if (!existsSync(config.telegramConfigPath)) {
    return null;
  }

  try {
    const content = readFileSync(config.telegramConfigPath, "utf-8");
    const parsed = JSON.parse(content);

    if (!parsed.botToken || !parsed.chatId) {
      return null;
    }

    return {
      botToken: parsed.botToken,
      chatId: parsed.chatId,
    };
  } catch {
    return null;
  }
}

/**
 * Save Telegram configuration
 */
export function saveTelegramConfig(config: IngestConfig, telegram: TelegramConfig): void {
  writeFileSync(
    config.telegramConfigPath,
    JSON.stringify(telegram, null, 2),
    "utf-8"
  );
}

/**
 * Debug logging helper
 */
export function debug(config: IngestConfig, message: string, ...args: unknown[]): void {
  if (config.debug) {
    console.error(`[ingest:debug] ${message}`, ...args);
  }
}
