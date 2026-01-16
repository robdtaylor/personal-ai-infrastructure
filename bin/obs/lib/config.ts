/**
 * Configuration management for obs CLI
 * Handles vault path resolution and environment variables
 */

import { existsSync } from "fs";
import { homedir } from "os";
import { join, resolve } from "path";

export interface ObsConfig {
  vaultPath: string;
  embeddingsDbPath: string;
  stateDbPath: string;
  debug: boolean;
}

/**
 * Resolve the Obsidian vault path from environment or defaults
 */
function resolveVaultPath(): string {
  // Priority order:
  // 1. OBSIDIAN_VAULT_PATH env variable
  // 2. ~/Documents/personal/ (your existing vault)
  // 3. ~/.obsidian-vault/ (fallback)

  const envPath = process.env.OBSIDIAN_VAULT_PATH;
  if (envPath) {
    const resolved = resolve(envPath.replace(/^~/, homedir()));
    if (existsSync(resolved)) {
      return resolved;
    }
    console.warn(`Warning: OBSIDIAN_VAULT_PATH (${envPath}) does not exist, using fallback`);
  }

  // Your existing vault location
  const personalVault = join(homedir(), "Documents", "personal");
  if (existsSync(personalVault)) {
    return personalVault;
  }

  // Last resort fallback
  const fallbackVault = join(homedir(), ".obsidian-vault");
  if (existsSync(fallbackVault)) {
    return fallbackVault;
  }

  throw new Error(
    "No Obsidian vault found. Set OBSIDIAN_VAULT_PATH environment variable or create ~/Documents/personal/"
  );
}

/**
 * Get the full configuration object
 */
export function getConfig(): ObsConfig {
  const claudeDir = process.env.PAI_DIR || join(homedir(), ".claude");

  return {
    vaultPath: resolveVaultPath(),
    embeddingsDbPath: join(claudeDir, "obs-embeddings.db"),
    stateDbPath: join(claudeDir, "obs-state.db"),
    debug: process.env.OBS_DEBUG === "true" || process.argv.includes("--debug"),
  };
}

/**
 * Validate the configuration
 */
export function validateConfig(config: ObsConfig): void {
  if (!existsSync(config.vaultPath)) {
    throw new Error(`Vault path does not exist: ${config.vaultPath}`);
  }

  // Check if it looks like an Obsidian vault
  const obsidianDir = join(config.vaultPath, ".obsidian");
  if (!existsSync(obsidianDir)) {
    console.warn(`Warning: ${config.vaultPath} may not be an Obsidian vault (no .obsidian directory)`);
  }
}

/**
 * Debug logging helper
 */
export function debug(config: ObsConfig, message: string, ...args: unknown[]): void {
  if (config.debug) {
    console.error(`[obs:debug] ${message}`, ...args);
  }
}
