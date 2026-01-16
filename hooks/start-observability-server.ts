#!/usr/bin/env bun

/**
 * start-observability-server.ts
 *
 * Ensures the AgentObservability server is running at session start.
 * Idempotent - only starts the server if not already running.
 * Safe for multiple concurrent sessions.
 */

import { spawn } from 'child_process';
import { homedir } from 'os';
import { join } from 'path';
import { existsSync } from 'fs';

const OBSERVABILITY_PORT = 4000;
const OBSERVABILITY_DIR = join(homedir(), '.claude/Skills/AgentObservability');

async function isPortInUse(port: number): Promise<boolean> {
  try {
    const proc = Bun.spawn(['lsof', '-i', `:${port}`], {
      stdout: 'pipe',
      stderr: 'pipe',
    });
    const output = await new Response(proc.stdout).text();
    await proc.exited;
    return output.includes('LISTEN');
  } catch {
    return false;
  }
}

async function startServer(): Promise<void> {
  const serverDir = join(OBSERVABILITY_DIR, 'apps/server');
  const logDir = join(OBSERVABILITY_DIR, 'logs');

  if (!existsSync(serverDir)) {
    console.error(`⚠️ Observability server directory not found: ${serverDir}`);
    return;
  }

  // Start server in background using spawn with detached
  const proc = spawn('bun', ['run', 'dev'], {
    cwd: serverDir,
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env },
  });

  // Redirect output to log files
  const fs = await import('fs');
  const stdoutLog = fs.createWriteStream(join(logDir, 'server-stdout.log'), { flags: 'a' });
  const stderrLog = fs.createWriteStream(join(logDir, 'server-stderr.log'), { flags: 'a' });

  proc.stdout?.pipe(stdoutLog);
  proc.stderr?.pipe(stderrLog);

  // Detach from parent process
  proc.unref();

  // Give it a moment to start
  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function main() {
  try {
    // Check if this is a subagent session - if so, skip
    const claudeProjectDir = process.env.CLAUDE_PROJECT_DIR || '';
    const isSubagent = claudeProjectDir.includes('/.claude/Agents/') ||
                      process.env.CLAUDE_AGENT_TYPE !== undefined;

    if (isSubagent) {
      // Subagents don't need to start the server
      process.exit(0);
    }

    // Check if server is already running
    const serverRunning = await isPortInUse(OBSERVABILITY_PORT);

    if (serverRunning) {
      console.error(`✅ Observability server already running on port ${OBSERVABILITY_PORT}`);
      process.exit(0);
    }

    // Server not running, start it
    console.error(`🚀 Starting observability server on port ${OBSERVABILITY_PORT}...`);
    await startServer();

    // Verify it started
    await new Promise(resolve => setTimeout(resolve, 500));
    const nowRunning = await isPortInUse(OBSERVABILITY_PORT);

    if (nowRunning) {
      console.error(`✅ Observability server started successfully`);
    } else {
      console.error(`⚠️ Observability server may still be starting...`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Observability startup error:', error);
    process.exit(0); // Don't block session on failure
  }
}

main();
