#!/usr/bin/env bun
/**
 * Capture Signals Hook
 * Detects and logs failures and loopbacks for pattern analysis
 *
 * Signals captured:
 * - failures.jsonl: Tool errors, command failures, rejected operations
 * - loopbacks.jsonl: Repeated actions indicating potential loops/rework
 *
 * Runs on: PostToolUse
 */

import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import {
  PAI_DIR,
  SIGNALS_DIR,
  SIGNALS_FAILURES_FILE,
  SIGNALS_LOOPBACKS_FILE,
  appendSignal,
  ensureDir
} from './lib/pai-paths';

// State file for tracking recent actions (for loopback detection)
const STATE_FILE = join(PAI_DIR, '.signals-state.json');

// Loopback detection settings
const LOOPBACK_WINDOW = 10; // Number of recent actions to track
const LOOPBACK_THRESHOLD = 3; // Number of similar actions to trigger loopback signal

interface RecentAction {
  tool: string;
  target: string; // file path or command signature
  timestamp: number;
  session_id: string;
}

interface SignalsState {
  recent_actions: RecentAction[];
  last_updated: number;
}

interface SignalEntry {
  timestamp: string;
  timestamp_unix: number;
  session_id: string;
  type: string;
  tool: string;
  details: Record<string, any>;
}

// Get PST timestamp
function getPSTTimestamp(): string {
  const date = new Date();
  return date.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(',', '');
}

// Load signals state
function loadState(): SignalsState {
  try {
    if (existsSync(STATE_FILE)) {
      return JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
    }
  } catch (error) {
    // Ignore errors, return fresh state
  }
  return { recent_actions: [], last_updated: Date.now() };
}

// Save signals state
function saveState(state: SignalsState): void {
  state.last_updated = Date.now();
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

// Extract target from tool input (file path or command)
function extractTarget(toolName: string, toolInput: Record<string, any>): string {
  switch (toolName) {
    case 'Read':
    case 'Write':
    case 'Edit':
      return toolInput?.file_path || 'unknown';
    case 'Bash':
      // Extract meaningful command signature
      const cmd = toolInput?.command || '';
      // Skip common prefixes that don't identify the actual command
      const skipPrefixes = /^(cd\s+[^\s]+\s*&&\s*|sudo\s+)/;
      const cleanCmd = cmd.replace(skipPrefixes, '').trim();
      // Use first meaningful part (command + first arg) up to 80 chars
      // This catches the actual operation, not just directory changes
      const parts = cleanCmd.split(/\s+/).slice(0, 2);
      return parts.join(' ').substring(0, 80) || cmd.substring(0, 80);
    case 'Grep':
      return `grep:${toolInput?.pattern || ''}`;
    case 'Glob':
      return `glob:${toolInput?.pattern || ''}`;
    case 'Task':
      return `task:${toolInput?.subagent_type || 'unknown'}`;
    default:
      return toolName;
  }
}

// Detect failure from tool result
// Only detects ACTUAL tool failures, not content that mentions "error"
function detectFailure(hookData: any): SignalEntry | null {
  const toolName = hookData.tool_name;
  const rawResponse = hookData.tool_response || hookData.tool_result;
  const toolInput = hookData.tool_input || {};

  // Check for hook rejections first
  const wasRejected = hookData.tool_use_rejected === true;
  if (wasRejected) {
    return {
      timestamp: getPSTTimestamp(),
      timestamp_unix: Date.now(),
      session_id: hookData.session_id || 'unknown',
      type: 'rejected',
      tool: toolName,
      details: {
        input_summary: summarizeInput(toolName, toolInput),
        error_snippet: 'Tool use was rejected by hook',
        rejected: true
      }
    };
  }

  if (!rawResponse) return null;

  // Handle structured responses (objects)
  if (typeof rawResponse === 'object') {
    // Bash: Check actual exit_code field, not text content
    if (toolName === 'Bash') {
      const exitCode = rawResponse.exit_code ?? rawResponse.exitCode;
      if (typeof exitCode === 'number' && exitCode !== 0) {
        return {
          timestamp: getPSTTimestamp(),
          timestamp_unix: Date.now(),
          session_id: hookData.session_id || 'unknown',
          type: 'exit_code',
          tool: toolName,
          details: {
            input_summary: summarizeInput(toolName, toolInput),
            error_snippet: rawResponse.stderr || rawResponse.stdout || '',
            exit_code: exitCode
          }
        };
      }
      return null; // Bash succeeded
    }

    // Read/Write/Edit: Check for error type response
    if (['Read', 'Write', 'Edit'].includes(toolName)) {
      // Successful read has type: "text" with file content - NOT a failure
      if (rawResponse.type === 'text' && rawResponse.file) {
        return null; // Successful file operation
      }
      // Check for explicit error responses
      if (rawResponse.type === 'error' || rawResponse.error) {
        const errorMsg = rawResponse.error || rawResponse.message || 'Unknown error';
        return {
          timestamp: getPSTTimestamp(),
          timestamp_unix: Date.now(),
          session_id: hookData.session_id || 'unknown',
          type: 'error',
          tool: toolName,
          details: {
            input_summary: summarizeInput(toolName, toolInput),
            error_snippet: String(errorMsg).substring(0, 500)
          }
        };
      }
      return null; // Assume success if no error type
    }

    // Task/other tools: Check for explicit error/failure fields
    if (rawResponse.error || rawResponse.status === 'failed') {
      return {
        timestamp: getPSTTimestamp(),
        timestamp_unix: Date.now(),
        session_id: hookData.session_id || 'unknown',
        type: 'error',
        tool: toolName,
        details: {
          input_summary: summarizeInput(toolName, toolInput),
          error_snippet: String(rawResponse.error || rawResponse.message || 'Task failed').substring(0, 500)
        }
      };
    }

    return null; // Structured response without error indicators
  }

  // Handle string responses - only check for tool-level errors
  if (typeof rawResponse === 'string') {
    // Only flag as error if it's a short error message, not file content
    // File content is typically longer and wrapped in structure
    const isShortResponse = rawResponse.length < 500;
    const toolErrorPatterns = [
      /^Error:/i,
      /^ENOENT:/,
      /^EACCES:/,
      /^EPERM:/,
      /^Permission denied/i,
      /^No such file or directory/i,
      /^command not found/i,
      /^Cannot find/i
    ];

    if (isShortResponse && toolErrorPatterns.some(p => p.test(rawResponse.trim()))) {
      return {
        timestamp: getPSTTimestamp(),
        timestamp_unix: Date.now(),
        session_id: hookData.session_id || 'unknown',
        type: 'error',
        tool: toolName,
        details: {
          input_summary: summarizeInput(toolName, toolInput),
          error_snippet: rawResponse.substring(0, 500)
        }
      };
    }
  }

  return null;
}

// Summarize tool input for logging
function summarizeInput(toolName: string, toolInput: Record<string, any>): string {
  switch (toolName) {
    case 'Read':
    case 'Write':
    case 'Edit':
      return toolInput?.file_path || 'unknown file';
    case 'Bash':
      const cmd = toolInput?.command || '';
      return cmd.length > 100 ? cmd.substring(0, 100) + '...' : cmd;
    case 'Grep':
      return `pattern: ${toolInput?.pattern || '?'}`;
    case 'Glob':
      return `pattern: ${toolInput?.pattern || '?'}`;
    default:
      return JSON.stringify(toolInput).substring(0, 100);
  }
}


// Tools that are expected to be called repeatedly - exclude from loopback detection
const LOOPBACK_EXCLUDED_TOOLS = [
  'TodoWrite',    // Task tracking naturally involves frequent updates
  'WebSearch',    // Research involves multiple searches
  'WebFetch',     // Research fetches multiple URLs
  'AskUserQuestion', // May need to ask multiple questions
];

// Detect loopback (repeated similar actions)
function detectLoopback(
  hookData: any,
  state: SignalsState
): SignalEntry | null {
  const toolName = hookData.tool_name;

  // Skip tools that are expected to repeat
  if (LOOPBACK_EXCLUDED_TOOLS.includes(toolName)) {
    return null;
  }

  const toolInput = hookData.tool_input || {};
  const sessionId = hookData.session_id || 'unknown';
  const target = extractTarget(toolName, toolInput);

  // Add current action to recent actions
  const currentAction: RecentAction = {
    tool: toolName,
    target,
    timestamp: Date.now(),
    session_id: sessionId
  };

  // Count similar recent actions in same session
  const similarActions = state.recent_actions.filter(action =>
    action.session_id === sessionId &&
    action.tool === toolName &&
    action.target === target &&
    (Date.now() - action.timestamp) < 5 * 60 * 1000 // Within 5 minutes
  );

  // Update state with current action
  state.recent_actions.push(currentAction);

  // Trim to window size
  if (state.recent_actions.length > LOOPBACK_WINDOW * 10) {
    state.recent_actions = state.recent_actions.slice(-LOOPBACK_WINDOW * 5);
  }

  // Detect loopback if threshold exceeded
  if (similarActions.length >= LOOPBACK_THRESHOLD - 1) {
    return {
      timestamp: getPSTTimestamp(),
      timestamp_unix: Date.now(),
      session_id: sessionId,
      type: 'loopback',
      tool: toolName,
      details: {
        target,
        repeat_count: similarActions.length + 1,
        window_minutes: 5,
        action_timestamps: similarActions.map(a => a.timestamp)
      }
    };
  }

  return null;
}

async function main() {
  try {
    // Read hook data from stdin
    const stdinData = await Bun.stdin.text();
    if (!stdinData || stdinData.trim() === '') {
      process.exit(0);
    }

    const hookData = JSON.parse(stdinData);

    // Only process PostToolUse events
    if (!hookData.tool_name) {
      process.exit(0);
    }

    // Ensure signals directory exists
    ensureDir(SIGNALS_DIR);

    // Load state for loopback detection
    const state = loadState();

    // Detect and log failures
    const failure = detectFailure(hookData);
    if (failure) {
      appendSignal(SIGNALS_FAILURES_FILE, failure);
      if (process.env.PAI_DEBUG === '1') {
        console.error(`[Signals] Failure captured: ${failure.tool} - ${failure.type}`);
      }
    }

    // Detect and log loopbacks
    const loopback = detectLoopback(hookData, state);
    if (loopback) {
      appendSignal(SIGNALS_LOOPBACKS_FILE, loopback);
      if (process.env.PAI_DEBUG === '1') {
        console.error(`[Signals] Loopback detected: ${loopback.tool} on ${loopback.details.target}`);
      }
    }

    // Save updated state
    saveState(state);

  } catch (error) {
    // Silent failure - don't block Claude Code
    if (process.env.PAI_DEBUG === '1') {
      console.error('[Signals] Hook error:', error);
    }
  }

  process.exit(0);
}

main();
