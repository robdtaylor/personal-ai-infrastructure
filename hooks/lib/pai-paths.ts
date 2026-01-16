/**
 * PAI Path Resolution - Single Source of Truth
 *
 * This module provides consistent path resolution across all PAI hooks.
 * It handles PAI_DIR detection whether set explicitly or defaulting to ~/.config/pai
 *
 * Usage in hooks:
 *   import { PAI_DIR, HOOKS_DIR, SKILLS_DIR } from './lib/pai-paths';
 */

import { homedir } from 'os';
import { resolve, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

/**
 * Smart PAI_DIR detection with fallback
 * Priority:
 * 1. PAI_DIR environment variable (if set)
 * 2. ~/.config/pai (standard location)
 */
export const PAI_DIR = process.env.PAI_DIR
  ? resolve(process.env.PAI_DIR)
  : resolve(homedir(), '.config/pai');

/**
 * Common PAI directories
 */
export const HOOKS_DIR = join(PAI_DIR, 'Hooks');
export const SKILLS_DIR = join(PAI_DIR, 'Skills');
export const AGENTS_DIR = join(PAI_DIR, 'Agents');
export const COMMANDS_DIR = join(PAI_DIR, 'Commands');

/**
 * MEMORY System directories (Miessler's PAI structure)
 * Three-tier: Capture (Hot) → Synthesis (Warm) → Application (Cold)
 */
export const MEMORY_DIR = join(PAI_DIR, 'MEMORY');

// Cold tier - Permanent archive
export const HISTORY_DIR = join(MEMORY_DIR, 'History');
export const HISTORY_SESSIONS_DIR = join(HISTORY_DIR, 'sessions');
export const HISTORY_LEARNINGS_DIR = join(HISTORY_DIR, 'learnings');
export const HISTORY_RESEARCH_DIR = join(HISTORY_DIR, 'research');
export const HISTORY_DECISIONS_DIR = join(HISTORY_DIR, 'decisions');
export const HISTORY_RAW_OUTPUTS_DIR = join(HISTORY_DIR, 'raw-outputs');

// Warm tier - Algorithm phase learnings
export const LEARNING_DIR = join(MEMORY_DIR, 'Learning');
export const LEARNING_OBSERVE_DIR = join(LEARNING_DIR, 'OBSERVE');
export const LEARNING_THINK_DIR = join(LEARNING_DIR, 'THINK');
export const LEARNING_PLAN_DIR = join(LEARNING_DIR, 'PLAN');
export const LEARNING_BUILD_DIR = join(LEARNING_DIR, 'BUILD');
export const LEARNING_EXECUTE_DIR = join(LEARNING_DIR, 'EXECUTE');
export const LEARNING_VERIFY_DIR = join(LEARNING_DIR, 'VERIFY');
export const LEARNING_ALGORITHM_DIR = join(LEARNING_DIR, 'ALGORITHM');

// Hot tier - Active work
export const WORK_DIR = join(MEMORY_DIR, 'Work');

// Operational state
export const STATE_DIR = join(MEMORY_DIR, 'State');

// Pattern detection signals
export const SIGNALS_DIR = join(MEMORY_DIR, 'Signals');

/**
 * Validate PAI directory structure on first import
 * This fails fast with a clear error if PAI is misconfigured
 */
function validatePAIStructure(): void {
  if (!existsSync(PAI_DIR)) {
    console.error(`❌ PAI_DIR does not exist: ${PAI_DIR}`);
    console.error(`   Expected ~/.config/pai or set PAI_DIR environment variable`);
    process.exit(1);
  }

  if (!existsSync(HOOKS_DIR)) {
    console.error(`❌ PAI hooks directory not found: ${HOOKS_DIR}`);
    console.error(`   Your PAI_DIR may be misconfigured`);
    console.error(`   Current PAI_DIR: ${PAI_DIR}`);
    process.exit(1);
  }
}

// Run validation on module import
// This ensures any hook that imports this module will fail fast if paths are wrong
validatePAIStructure();

/**
 * Helper to get history file path with date-based organization
 */
export function getHistoryFilePath(subdir: string, filename: string): string {
  const now = new Date();
  const pstDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const year = pstDate.getFullYear();
  const month = String(pstDate.getMonth() + 1).padStart(2, '0');

  return join(HISTORY_DIR, subdir, `${year}-${month}`, filename);
}

/**
 * Helper to get raw-outputs file path for events
 */
export function getRawOutputsFilePath(): string {
  const now = new Date();
  const pstDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const year = pstDate.getFullYear();
  const month = String(pstDate.getMonth() + 1).padStart(2, '0');
  const day = String(pstDate.getDate()).padStart(2, '0');

  return join(HISTORY_RAW_OUTPUTS_DIR, `${year}-${month}`, `${year}-${month}-${day}_all-events.jsonl`);
}

/**
 * Helper to get sessions directory with month organization
 */
export function getSessionsDir(): string {
  const now = new Date();
  const pstDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const year = pstDate.getFullYear();
  const month = String(pstDate.getMonth() + 1).padStart(2, '0');

  return join(HISTORY_SESSIONS_DIR, `${year}-${month}`);
}

/**
 * Ensure a directory exists
 */
export function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

/**
 * Signal file paths for pattern detection
 */
export const SIGNALS_FAILURES_FILE = join(SIGNALS_DIR, 'failures.jsonl');
export const SIGNALS_LOOPBACKS_FILE = join(SIGNALS_DIR, 'loopbacks.jsonl');
export const SIGNALS_PATTERNS_FILE = join(SIGNALS_DIR, 'patterns.jsonl');
export const SIGNALS_RATINGS_FILE = join(SIGNALS_DIR, 'ratings.jsonl');

/**
 * Append a signal entry to a signal file
 */
export function appendSignal(signalFile: string, entry: Record<string, any>): void {
  ensureDir(SIGNALS_DIR);
  const { appendFileSync } = require('fs');
  appendFileSync(signalFile, JSON.stringify(entry) + '\n', 'utf-8');
}
