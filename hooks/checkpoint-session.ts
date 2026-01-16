#!/usr/bin/env bun
/**
 * Session Checkpoint Hook
 * Periodically saves session state for recovery after disconnects
 * Runs on PostToolUse events to capture work in progress
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } from 'fs';
import { join } from 'path';
import { PAI_DIR, HISTORY_RAW_OUTPUTS_DIR, ensureDir } from './lib/pai-paths';

const CHECKPOINT_DIR = join(PAI_DIR, 'checkpoints');
const CHECKPOINT_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CheckpointData {
  session_id: string;
  timestamp: number;
  timestamp_pst: string;
  last_prompt: string;
  tools_used: string[];
  files_modified: string[];
  current_task: string;
  status: string;
  event_count: number;
}

interface LastCheckpointInfo {
  session_id: string;
  last_checkpoint_time: number;
}

// Get PST timestamp
function getPSTTimestamp(): string {
  const date = new Date();
  const pstDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));

  const year = pstDate.getFullYear();
  const month = String(pstDate.getMonth() + 1).padStart(2, '0');
  const day = String(pstDate.getDate()).padStart(2, '0');
  const hours = String(pstDate.getHours()).padStart(2, '0');
  const minutes = String(pstDate.getMinutes()).padStart(2, '0');
  const seconds = String(pstDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} PST`;
}

// Get last checkpoint info
function getLastCheckpointInfo(sessionId: string): LastCheckpointInfo | null {
  const infoFile = join(CHECKPOINT_DIR, 'last-checkpoint.json');

  if (!existsSync(infoFile)) {
    return null;
  }

  try {
    const data = JSON.parse(readFileSync(infoFile, 'utf-8'));
    if (data.session_id === sessionId) {
      return data;
    }
  } catch (error) {
    // Ignore errors
  }

  return null;
}

// Save last checkpoint info
function saveLastCheckpointInfo(sessionId: string): void {
  const infoFile = join(CHECKPOINT_DIR, 'last-checkpoint.json');
  const data: LastCheckpointInfo = {
    session_id: sessionId,
    last_checkpoint_time: Date.now()
  };

  writeFileSync(infoFile, JSON.stringify(data, null, 2));
}

// Check if we should create a checkpoint
function shouldCheckpoint(sessionId: string): boolean {
  const lastInfo = getLastCheckpointInfo(sessionId);

  if (!lastInfo) {
    return true; // First checkpoint for this session
  }

  const timeSinceLastCheckpoint = Date.now() - lastInfo.last_checkpoint_time;
  return timeSinceLastCheckpoint >= CHECKPOINT_INTERVAL;
}

// Parse events file to gather session context
function gatherSessionContext(sessionId: string): Partial<CheckpointData> {
  const now = new Date();
  const pstDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const year = pstDate.getFullYear();
  const month = String(pstDate.getMonth() + 1).padStart(2, '0');
  const day = String(pstDate.getDate()).padStart(2, '0');

  const eventsFile = join(HISTORY_RAW_OUTPUTS_DIR, `${year}-${month}`, `${year}-${month}-${day}_all-events.jsonl`);

  const context: Partial<CheckpointData> = {
    last_prompt: '',
    tools_used: [],
    files_modified: [],
    current_task: '',
    event_count: 0
  };

  if (!existsSync(eventsFile)) {
    return context;
  }

  try {
    const lines = readFileSync(eventsFile, 'utf-8').trim().split('\n');
    const sessionEvents = lines
      .filter(line => line.trim())
      .map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(event => event && event.session_id === sessionId);

    context.event_count = sessionEvents.length;

    // Extract last user prompt
    const promptEvents = sessionEvents
      .filter(e => e.hook_event_type === 'UserPromptSubmit')
      .reverse();

    if (promptEvents.length > 0) {
      context.last_prompt = promptEvents[0].payload?.prompt || '';
    }

    // Extract tools used
    const toolEvents = sessionEvents.filter(e => e.hook_event_type === 'PostToolUse');
    const toolsSet = new Set<string>();

    toolEvents.forEach(event => {
      if (event.payload?.tool_name) {
        toolsSet.add(event.payload.tool_name);
      }
    });

    context.tools_used = Array.from(toolsSet);

    // Extract files modified (from Write and Edit tools)
    const filesSet = new Set<string>();

    toolEvents.forEach(event => {
      if (event.payload?.tool_name === 'Write' || event.payload?.tool_name === 'Edit') {
        const filePath = event.payload?.tool_input?.file_path;
        if (filePath) {
          filesSet.add(filePath);
        }
      }
    });

    context.files_modified = Array.from(filesSet);

    // Determine current task from last prompt
    if (context.last_prompt) {
      // Take first 100 chars as task summary
      context.current_task = context.last_prompt.substring(0, 100);
      if (context.last_prompt.length > 100) {
        context.current_task += '...';
      }
    }

  } catch (error) {
    // Ignore errors, return what we have
  }

  return context;
}

// Create checkpoint
function createCheckpoint(sessionId: string): void {
  // Ensure checkpoint directory exists
  if (!existsSync(CHECKPOINT_DIR)) {
    mkdirSync(CHECKPOINT_DIR, { recursive: true });
  }

  // Gather session context
  const context = gatherSessionContext(sessionId);

  // Create checkpoint data
  const checkpoint: CheckpointData = {
    session_id: sessionId,
    timestamp: Date.now(),
    timestamp_pst: getPSTTimestamp(),
    last_prompt: context.last_prompt || '',
    tools_used: context.tools_used || [],
    files_modified: context.files_modified || [],
    current_task: context.current_task || '',
    status: 'in_progress',
    event_count: context.event_count || 0
  };

  // Save checkpoint to session-specific file
  const checkpointFile = join(CHECKPOINT_DIR, `${sessionId}.json`);
  writeFileSync(checkpointFile, JSON.stringify(checkpoint, null, 2));

  // Append to checkpoint log
  const logFile = join(CHECKPOINT_DIR, 'checkpoint-log.jsonl');
  appendFileSync(logFile, JSON.stringify(checkpoint) + '\n');

  // Update last checkpoint info
  saveLastCheckpointInfo(sessionId);

  // Log checkpoint (only in debug mode)
  if (process.env.PAI_DEBUG === '1') {
    console.error(`✓ Checkpoint saved for session ${sessionId.substring(0, 8)}`);
  }
}

// Main execution
async function main() {
  try {
    // Read hook data from stdin
    const input = readFileSync(0, 'utf-8');
    const hookData = JSON.parse(input);

    const sessionId = hookData.session_id || hookData.conversation_id || 'unknown';

    // Check if we should create a checkpoint
    if (shouldCheckpoint(sessionId)) {
      createCheckpoint(sessionId);
    }

  } catch (error) {
    // Silently fail - don't interrupt the main workflow
    if (process.env.PAI_DEBUG === '1') {
      console.error('Checkpoint error:', error);
    }
  }
}

main();
