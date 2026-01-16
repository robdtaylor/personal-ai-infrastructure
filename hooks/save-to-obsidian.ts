#!/usr/bin/env bun

/**
 * Save to Obsidian Hook
 * Automatically copies Claude Code session summaries to Obsidian vault
 *
 * This hook runs at SessionEnd and copies the generated session summary
 * to your Obsidian vault for permanent knowledge base storage.
 */

import { copyFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { HISTORY_SESSIONS_DIR } from './lib/pai-paths';

// Configuration - Update these paths as needed
const OBSIDIAN_VAULT = process.env.OBSIDIAN_VAULT || join(homedir(), 'Documents', 'personal');
const OBSIDIAN_SESSIONS_DIR = join(OBSIDIAN_VAULT, 'Claude-Sessions');

async function main() {
  try {
    // Read hook data from stdin
    const stdinData = await Bun.stdin.text();
    if (!stdinData || stdinData.trim() === '') {
      process.exit(0);
    }

    const hookData = JSON.parse(stdinData);
    const conversationId = hookData.conversation_id || hookData.session_id;

    // Generate timestamp for finding the session file
    const now = new Date();
    const timestamp = now.toISOString()
      .replace(/:/g, '')
      .replace(/\..+/, '')
      .replace('T', '-'); // YYYY-MM-DD-HHMMSS

    const yearMonth = timestamp.substring(0, 7); // YYYY-MM

    // Source directory where session summaries are stored (MEMORY/History/sessions)
    const sourceDir = join(HISTORY_SESSIONS_DIR, yearMonth);

    // Wait a moment for the capture-session-summary hook to finish writing
    await Bun.sleep(100);

    // Find the most recent session file (it was just created)
    if (existsSync(sourceDir)) {
      const fs = require('fs');
      const files = fs.readdirSync(sourceDir)
        .filter((f: string) => f.endsWith('.md') && f.includes('SESSION'))
        .sort()
        .reverse();

      if (files.length > 0) {
        const latestSessionFile = files[0];
        const sourcePath = join(sourceDir, latestSessionFile);

        // Ensure Obsidian sessions directory exists
        if (!existsSync(OBSIDIAN_SESSIONS_DIR)) {
          mkdirSync(OBSIDIAN_SESSIONS_DIR, { recursive: true });
        }

        // Create year-month subdirectory in Obsidian
        const obsidianSubDir = join(OBSIDIAN_SESSIONS_DIR, yearMonth);
        if (!existsSync(obsidianSubDir)) {
          mkdirSync(obsidianSubDir, { recursive: true });
        }

        // Copy the session file to Obsidian
        const destPath = join(obsidianSubDir, latestSessionFile);
        copyFileSync(sourcePath, destPath);

        console.log(`[Obsidian] Session saved to: ${destPath}`);
      }
    }

    process.exit(0);
  } catch (error) {
    // Silent failure - don't disrupt workflow
    console.error(`[Obsidian] Save hook error: ${error}`);
    process.exit(0);
  }
}

main();
