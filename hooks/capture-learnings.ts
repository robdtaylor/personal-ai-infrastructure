#!/usr/bin/env bun
/**
 * Capture Learnings Hook
 * Extracts 📚 LEARNING [PHASE]: markers from session transcripts
 * and writes them to MEMORY/Learning/[PHASE]/ directories
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import {
  LEARNING_DIR,
  LEARNING_OBSERVE_DIR,
  LEARNING_THINK_DIR,
  LEARNING_PLAN_DIR,
  LEARNING_BUILD_DIR,
  LEARNING_EXECUTE_DIR,
  LEARNING_VERIFY_DIR,
  LEARNING_ALGORITHM_DIR,
  STATE_DIR,
  ensureDir
} from './lib/pai-paths';

const VALID_PHASES = ['OBSERVE', 'THINK', 'PLAN', 'BUILD', 'EXECUTE', 'VERIFY', 'ALGORITHM'] as const;
type Phase = typeof VALID_PHASES[number];

const PHASE_DIRS: Record<Phase, string> = {
  OBSERVE: LEARNING_OBSERVE_DIR,
  THINK: LEARNING_THINK_DIR,
  PLAN: LEARNING_PLAN_DIR,
  BUILD: LEARNING_BUILD_DIR,
  EXECUTE: LEARNING_EXECUTE_DIR,
  VERIFY: LEARNING_VERIFY_DIR,
  ALGORITHM: LEARNING_ALGORITHM_DIR
};

const STATE_FILE = join(STATE_DIR, 'learnings-state.json');

interface Learning {
  phase: Phase;
  title: string;
  content: string;
}

interface LearningsState {
  total_captured: number;
  by_phase: Record<Phase, number>;
  last_session: string;
}

function loadState(): LearningsState {
  if (existsSync(STATE_FILE)) {
    try {
      return JSON.parse(readFileSync(STATE_FILE, 'utf-8'));
    } catch {
      // Ignore errors, return default
    }
  }
  return {
    total_captured: 0,
    by_phase: { OBSERVE: 0, THINK: 0, PLAN: 0, BUILD: 0, EXECUTE: 0, VERIFY: 0, ALGORITHM: 0 },
    last_session: ''
  };
}

function saveState(state: LearningsState): void {
  ensureDir(STATE_DIR);
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getPSTDate(): { date: string; timestamp: string } {
  const now = new Date();
  const pst = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const year = pst.getFullYear();
  const month = String(pst.getMonth() + 1).padStart(2, '0');
  const day = String(pst.getDate()).padStart(2, '0');
  const hours = String(pst.getHours()).padStart(2, '0');
  const minutes = String(pst.getMinutes()).padStart(2, '0');

  return {
    date: `${year}-${month}-${day}`,
    timestamp: `${year}-${month}-${day} ${hours}:${minutes} PST`
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

function contentToText(content: any): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((c) => {
        if (typeof c === 'string') return c;
        if (c?.text) return c.text;
        if (c?.content) return String(c.content);
        return '';
      })
      .join('\n')
      .trim();
  }
  return '';
}

function extractLearnings(transcript: string): Learning[] {
  const learnings: Learning[] = [];
  const lines = transcript.trim().split('\n');

  // Collect all assistant message content
  let allContent = '';
  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      if (entry.type === 'assistant' && entry.message?.content) {
        allContent += contentToText(entry.message.content) + '\n';
      }
    } catch {
      // Skip invalid JSON
    }
  }

  // Match learning markers: 📚 LEARNING [PHASE]: Title\nContent
  // Content continues until next 📚 or end of text block
  const regex = /📚\s*LEARNING\s*\[(\w+)\]:\s*(.+?)(?:\n([\s\S]*?))?(?=📚\s*LEARNING|$)/g;

  let match;
  while ((match = regex.exec(allContent)) !== null) {
    const phase = match[1].toUpperCase() as Phase;
    const title = match[2].trim();
    const content = (match[3] || '').trim();

    if (VALID_PHASES.includes(phase)) {
      learnings.push({ phase, title, content });
    } else {
      console.error(`⚠️ Invalid phase: ${match[1]}, skipping learning: ${title}`);
    }
  }

  return learnings;
}

function writeLearning(learning: Learning, sessionId: string): string {
  const { date, timestamp } = getPSTDate();
  const slug = slugify(learning.title);
  const filename = `${date}_${slug}.md`;
  const dir = PHASE_DIRS[learning.phase];
  const filepath = join(dir, filename);

  ensureDir(dir);

  const markdown = `# Learning: ${learning.title}

**Date:** ${date}
**Captured:** ${timestamp}
**Session:** ${sessionId.substring(0, 8)}
**Phase:** ${learning.phase}

## Insight

${learning.content || learning.title}

## Tags

#auto-captured #${learning.phase.toLowerCase()}
`;

  writeFileSync(filepath, markdown);
  return filepath;
}

async function main() {
  const timestamp = new Date().toISOString();
  console.error(`\n📚 CAPTURE-LEARNINGS HOOK at ${timestamp}`);

  // Read input from stdin
  let input = '';
  const decoder = new TextDecoder();
  const reader = Bun.stdin.stream().getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      input += decoder.decode(value, { stream: true });
    }
  } catch (e) {
    console.error(`❌ Error reading input: ${e}`);
    process.exit(0);
  }

  if (!input) {
    console.error('❌ No input received');
    process.exit(0);
  }

  let transcriptPath: string;
  let sessionId: string;
  try {
    const parsed = JSON.parse(input);
    transcriptPath = parsed.transcript_path;
    sessionId = parsed.session_id || 'unknown';
  } catch (e) {
    console.error(`❌ Error parsing input JSON: ${e}`);
    process.exit(0);
  }

  if (!transcriptPath) {
    console.error('❌ No transcript_path in input');
    process.exit(0);
  }

  // Read transcript
  let transcript: string;
  try {
    transcript = readFileSync(transcriptPath, 'utf-8');
  } catch (e) {
    console.error(`❌ Error reading transcript: ${e}`);
    process.exit(0);
  }

  // Extract learnings
  const learnings = extractLearnings(transcript);

  if (learnings.length === 0) {
    console.error('📚 No learnings found in session');
    process.exit(0);
  }

  // Load state
  const state = loadState();

  // Write each learning
  const written: string[] = [];
  for (const learning of learnings) {
    const filepath = writeLearning(learning, sessionId);
    written.push(filepath);
    state.total_captured++;
    state.by_phase[learning.phase]++;
    console.error(`✅ Captured: ${learning.title} → ${learning.phase}`);
  }

  // Update state
  state.last_session = sessionId;
  saveState(state);

  console.error(`📚 Captured ${learnings.length} learning(s). Total: ${state.total_captured}`);
  console.error(`📚 CAPTURE-LEARNINGS COMPLETE\n`);
}

main().catch((e) => {
  console.error(`❌ Hook error: ${e}`);
  process.exit(0);
});
