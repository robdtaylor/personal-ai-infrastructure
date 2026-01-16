#!/usr/bin/env bun

/**
 * SessionEnd Hook - Captures session summary for UOCS
 *
 * Generates a session summary document when a Claude Code session ends,
 * documenting what was accomplished during the session.
 *
 * FILTERING: Skips trivial sessions to reduce noise:
 * - Sessions < 2 minutes with no file changes
 * - Sessions with only basic exploration commands (pwd, ls, cd)
 * - Sessions with < 2 meaningful tool uses
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { PAI_DIR, HISTORY_DIR } from './lib/pai-paths';

// Minimum thresholds for session capture
const MIN_DURATION_MINUTES = 2;
const MIN_MEANINGFUL_TOOLS = 2;
const TRIVIAL_COMMANDS = ['pwd', 'ls', 'ls -la', 'ls -l', 'cd', 'echo', 'cat', 'head', 'tail', 'which', 'whoami'];

interface SessionData {
  session_id: string;
  timestamp: string;
  [key: string]: any;
}

async function main() {
  try {
    // Read input from stdin
    const input = await Bun.stdin.text();
    if (!input || input.trim() === '') {
      process.exit(0);
    }

    const data: SessionData = JSON.parse(input);

    // Generate timestamp for filename
    const now = new Date();
    const timestamp = now.toISOString()
      .replace(/:/g, '')
      .replace(/\..+/, '')
      .replace('T', '-'); // YYYY-MM-DD-HHMMSS

    const yearMonth = timestamp.substring(0, 7); // YYYY-MM

    // Try to extract session info from raw outputs
    const sessionInfo = await analyzeSession(data.session_id, yearMonth);

    // FILTER: Skip trivial sessions
    if (shouldSkipSession(sessionInfo)) {
      process.exit(0);
    }

    // Generate filename
    const filename = `${timestamp}_SESSION_${sessionInfo.focus}.md`;

    // Ensure directory exists
    const sessionDir = join(HISTORY_DIR, 'sessions', yearMonth);
    if (!existsSync(sessionDir)) {
      mkdirSync(sessionDir, { recursive: true });
    }

    // Generate session document
    const sessionDoc = formatSessionDocument(timestamp, data, sessionInfo);

    // Write session file
    writeFileSync(join(sessionDir, filename), sessionDoc);

    // Exit successfully
    process.exit(0);
  } catch (error) {
    // Silent failure - don't disrupt workflow
    console.error(`[UOCS] SessionEnd hook error: ${error}`);
    process.exit(0);
  }
}

/**
 * Determine if a session should be skipped (too trivial to log)
 */
function shouldSkipSession(info: any): boolean {
  // Always capture sessions with file changes
  if (info.filesChanged.length > 0) {
    return false;
  }

  // Always capture sessions with meaningful research
  if (info.researchTopics.length > 0 || info.skillsUsed.length > 0) {
    return false;
  }

  // Skip very short sessions with no file changes
  if (info.duration < MIN_DURATION_MINUTES) {
    return true;
  }

  // Skip sessions with only trivial commands
  const meaningfulCommands = info.commandsExecuted.filter((cmd: string) => {
    const baseCmd = cmd.split(' ')[0].split('/').pop() || '';
    return !TRIVIAL_COMMANDS.some(trivial =>
      cmd.trim() === trivial || baseCmd === trivial.split(' ')[0]
    );
  });

  if (meaningfulCommands.length === 0 && info.filesChanged.length === 0) {
    return true;
  }

  // Skip sessions with very few meaningful tools
  const meaningfulTools = info.toolsUsed.filter((t: string) =>
    !['Read', 'Glob'].includes(t) // Read/Glob alone aren't meaningful without action
  );

  if (meaningfulTools.length < MIN_MEANINGFUL_TOOLS && info.filesChanged.length === 0) {
    return true;
  }

  return false;
}

async function analyzeSession(conversationId: string, yearMonth: string): Promise<any> {
  // Try to read raw outputs for this session
  const rawOutputsDir = join(HISTORY_DIR, 'raw-outputs', yearMonth);

  let filesChanged: string[] = [];
  let commandsExecuted: string[] = [];
  let toolsUsed: Set<string> = new Set();
  let sessionStart: number | null = null;
  let sessionEnd: number | null = null;
  let focusKeywords: string[] = [];
  let researchTopics: string[] = [];
  let skillsUsed: string[] = [];
  let webSearchQueries: string[] = [];

  try {
    if (existsSync(rawOutputsDir)) {
      const files = readdirSync(rawOutputsDir).filter(f => f.endsWith('.jsonl'));

      for (const file of files) {
        const filePath = join(rawOutputsDir, file);
        const content = readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').filter(l => l.trim());

        for (const line of lines) {
          try {
            const entry = JSON.parse(line);
            // Match on session_id (not session)
            if (entry.session_id === conversationId) {
              const toolName = entry.payload?.tool_name;
              const toolInput = entry.payload?.tool_input;

              // Track session timing
              if (entry.hook_event_type === 'SessionStart' && entry.timestamp) {
                sessionStart = entry.timestamp;
              }
              if (entry.timestamp) {
                sessionEnd = entry.timestamp; // Keep updating to get latest
              }

              // Track tools used (from payload.tool_name)
              if (toolName) {
                toolsUsed.add(toolName);
              }

              // Extract file changes
              if ((toolName === 'Edit' || toolName === 'Write') && toolInput?.file_path) {
                filesChanged.push(toolInput.file_path);
                // Extract focus keywords from file paths
                const pathParts = toolInput.file_path.split('/');
                const relevantParts = pathParts.slice(-3).filter((p: string) =>
                  p && !p.startsWith('.') && p !== 'src' && p !== 'index.ts'
                );
                focusKeywords.push(...relevantParts);
              }

              // Extract bash commands
              if (toolName === 'Bash' && toolInput?.command) {
                commandsExecuted.push(toolInput.command);
                // Check for research CLI calls
                if (toolInput.command.includes('research --all') || toolInput.command.includes('research --')) {
                  const match = toolInput.command.match(/research\s+--\w+\s+"([^"]+)"/);
                  if (match) {
                    researchTopics.push(match[1]);
                    // Extract key terms from research query
                    const terms = match[1].split(/\s+/).filter((t: string) =>
                      t.length > 3 && !['what', 'how', 'the', 'and', 'for', 'with'].includes(t.toLowerCase())
                    );
                    focusKeywords.push(...terms.slice(0, 3));
                  }
                }
              }

              // Extract WebSearch queries
              if (toolName === 'WebSearch' && toolInput?.query) {
                webSearchQueries.push(toolInput.query);
                // Extract key terms from search query
                const terms = toolInput.query.split(/\s+/).filter((t: string) =>
                  t.length > 3 && !['what', 'how', 'the', 'and', 'for', 'with', 'latest', 'current'].includes(t.toLowerCase())
                );
                focusKeywords.push(...terms.slice(0, 3));
                researchTopics.push(toolInput.query);
              }

              // Extract Skill invocations
              if (toolName === 'Skill' && toolInput?.skill) {
                skillsUsed.push(toolInput.skill);
                focusKeywords.push(toolInput.skill);
                if (toolInput.args) {
                  // Extract key terms from skill args
                  const terms = toolInput.args.split(/\s+/).filter((t: string) =>
                    t.length > 3 && !['the', 'and', 'for', 'with'].includes(t.toLowerCase())
                  );
                  focusKeywords.push(...terms.slice(0, 3));
                }
              }

              // Extract focus from Read tool
              if (toolName === 'Read' && toolInput?.file_path) {
                const pathParts = toolInput.file_path.split('/');
                const relevantParts = pathParts.slice(-2).filter((p: string) =>
                  p && !p.startsWith('.')
                );
                focusKeywords.push(...relevantParts);
              }

              // Extract from Task tool (subagents)
              if (toolName === 'Task' && toolInput?.description) {
                focusKeywords.push(...toolInput.description.split(/\s+/).slice(0, 3));
              }
            }
          } catch (e) {
            // Skip invalid JSON lines
          }
        }
      }
    }
  } catch (error) {
    // Silent failure
  }

  // Calculate duration in minutes
  let duration = 0;
  if (sessionStart && sessionEnd) {
    duration = Math.round((sessionEnd - sessionStart) / 60000);
  }

  // Determine focus from keywords
  const focus = determineFocus(focusKeywords, filesChanged, commandsExecuted, researchTopics, skillsUsed);

  return {
    focus,
    filesChanged: [...new Set(filesChanged)].slice(0, 10), // Unique, max 10
    commandsExecuted: commandsExecuted.slice(0, 10), // Max 10
    toolsUsed: Array.from(toolsUsed).filter(t => t), // Filter out undefined
    researchTopics: [...new Set(researchTopics)].slice(0, 5),
    skillsUsed: [...new Set(skillsUsed)],
    webSearchQueries: [...new Set(webSearchQueries)].slice(0, 5),
    duration
  };
}

function determineFocus(
  keywords: string[],
  files: string[],
  commands: string[],
  researchTopics: string[] = [],
  skillsUsed: string[] = []
): string {
  // Priority 1: If skills were used, name after the skill
  if (skillsUsed.length > 0) {
    const primarySkill = skillsUsed[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
    if (keywords.length > 0) {
      const topKeyword = getMostCommonKeyword(keywords);
      if (topKeyword && topKeyword !== primarySkill) {
        return `${primarySkill}-${topKeyword}`.substring(0, 30);
      }
    }
    return `skill-${primarySkill}`.substring(0, 30);
  }

  // Priority 2: If research topics exist, extract key theme
  if (researchTopics.length > 0) {
    const topicWords = researchTopics.join(' ').toLowerCase().split(/\s+/);
    const meaningfulWords = topicWords.filter(w =>
      w.length > 3 &&
      !['what', 'how', 'the', 'and', 'for', 'with', 'latest', 'current', 'january', '2026', '2025'].includes(w)
    );
    if (meaningfulWords.length > 0) {
      const topWord = getMostCommonFromArray(meaningfulWords);
      return `research-${topWord}`.substring(0, 30);
    }
    return 'research-session';
  }

  // Priority 3: Count keyword frequency from files/paths
  const counts: Record<string, number> = {};
  for (const kw of keywords) {
    const clean = kw.replace(/\.(ts|js|md|vue|json|tsx|jsx)$/, '').toLowerCase();
    if (clean.length > 2 && !['src', 'index', 'lib', 'utils', 'types'].includes(clean)) {
      counts[clean] = (counts[clean] || 0) + 1;
    }
  }

  // Find most common keywords
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (sorted.length >= 2) {
    return `${sorted[0][0]}-${sorted[1][0]}`.substring(0, 30);
  } else if (sorted.length === 1) {
    return sorted[0][0].substring(0, 30);
  }

  // Priority 4: Check for common patterns in commands
  const cmdStr = commands.join(' ').toLowerCase();
  if (cmdStr.includes('git commit') || cmdStr.includes('git push')) return 'git-commit';
  if (cmdStr.includes('git')) return 'git-work';
  if (cmdStr.includes('test') || cmdStr.includes('jest') || cmdStr.includes('vitest')) return 'testing';
  if (cmdStr.includes('build') || cmdStr.includes('tsc')) return 'build';
  if (cmdStr.includes('npm install') || cmdStr.includes('bun install')) return 'dependencies';
  if (cmdStr.includes('docker')) return 'docker-work';

  // If we have files but couldn't determine focus, use generic but informative name
  if (files.length > 0) {
    return 'code-changes';
  }

  // Last resort - but this should rarely happen now with filtering
  return 'misc-session';
}

function getMostCommonKeyword(keywords: string[]): string | null {
  const counts: Record<string, number> = {};
  for (const kw of keywords) {
    const clean = kw.replace(/\.(ts|js|md|vue|json|tsx|jsx)$/, '').toLowerCase();
    if (clean.length > 2) {
      counts[clean] = (counts[clean] || 0) + 1;
    }
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? sorted[0][0] : null;
}

function getMostCommonFromArray(words: string[]): string {
  const counts: Record<string, number> = {};
  for (const w of words) {
    counts[w] = (counts[w] || 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? sorted[0][0] : 'unknown';
}

function formatSessionDocument(timestamp: string, data: SessionData, info: any): string {
  const date = timestamp.substring(0, 10); // YYYY-MM-DD
  const time = timestamp.substring(11).replace(/-/g, ':'); // HH:MM:SS
  const sessionId = data.session_id || 'unknown';

  // Format duration nicely
  let durationStr = 'Unknown';
  if (info.duration > 0) {
    if (info.duration >= 60) {
      const hours = Math.floor(info.duration / 60);
      const mins = info.duration % 60;
      durationStr = `${hours}h ${mins}m`;
    } else {
      durationStr = `${info.duration} minutes`;
    }
  }

  // Truncate long commands for readability
  const truncatedCommands = info.commandsExecuted.map((cmd: string) => {
    if (cmd.length > 100) {
      return cmd.substring(0, 100) + '...';
    }
    return cmd;
  });

  // Build optional sections
  let researchSection = '';
  if (info.researchTopics && info.researchTopics.length > 0) {
    researchSection = `
## Research Topics

${info.researchTopics.map((t: string) => `- ${t.substring(0, 100)}${t.length > 100 ? '...' : ''}`).join('\n')}

---
`;
  }

  let skillsSection = '';
  if (info.skillsUsed && info.skillsUsed.length > 0) {
    skillsSection = `
## Skills Invoked

${info.skillsUsed.map((s: string) => `- \`${s}\``).join('\n')}

---
`;
  }

  // Determine session type for frontmatter
  let sessionType = 'general';
  if (info.skillsUsed && info.skillsUsed.length > 0) sessionType = 'skill';
  else if (info.researchTopics && info.researchTopics.length > 0) sessionType = 'research';
  else if (info.filesChanged.length > 0) sessionType = 'development';

  return `---
capture_type: SESSION
session_type: ${sessionType}
timestamp: ${new Date().toISOString()}
session_id: ${sessionId}
duration_minutes: ${info.duration}
tools_count: ${info.toolsUsed.length}
files_count: ${info.filesChanged.length}
research_topics_count: ${info.researchTopics?.length || 0}
skills_count: ${info.skillsUsed?.length || 0}
executor: kai
---

# Session: ${info.focus}

**Date:** ${date}
**Time:** ${time}
**Duration:** ${durationStr}

---

## Summary

| Metric | Value |
|--------|-------|
| **Focus** | ${info.focus} |
| **Type** | ${sessionType} |
| **Tools** | ${info.toolsUsed.length > 0 ? info.toolsUsed.join(', ') : 'None'} |
| **Files Modified** | ${info.filesChanged.length} |
| **Commands** | ${info.commandsExecuted.length} |

---
${researchSection}${skillsSection}
## Files Modified

${info.filesChanged.length > 0 ? info.filesChanged.map((f: string) => `- \`${f}\``).join('\n') : '- None'}

---

## Commands Executed

${truncatedCommands.length > 0 ? '```bash\n' + truncatedCommands.join('\n') + '\n```' : 'None'}

---

*Session ID: ${sessionId}*
`;
}

main();
