#!/usr/bin/env bun

/**
 * kai-todo-reminder.ts
 *
 * Surfaces Kai's task queue at session start so the user knows
 * what's waiting to be worked on when Claude usage is available.
 *
 * Setup:
 * Add to settings.json SessionStart hooks:
 * "${PAI_DIR}/Hooks/kai-todo-reminder.ts"
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const TODO_FILE = join(process.env.HOME || '', 'Documents/personal/Kai-Todo.md');

interface Task {
  id: string;
  title: string;
  priority: string;
  added: string;
}

function parseQueuedTasks(content: string): Task[] {
  const tasks: Task[] = [];

  // Find the Queued section
  const queuedMatch = content.match(/## Queued\n([\s\S]*?)(?=\n## |$)/);
  if (!queuedMatch) return tasks;

  const queuedSection = queuedMatch[1];

  // Parse each task (### [ID] Title format)
  const taskRegex = /### \[([^\]]+)\] (.+)\n([\s\S]*?)(?=\n### |\n## |$)/g;
  let match;

  while ((match = taskRegex.exec(queuedSection)) !== null) {
    const [, id, title, body] = match;

    // Extract priority
    const priorityMatch = body.match(/\*\*Priority\*\*:\s*(\w+)/);
    const priority = priorityMatch ? priorityMatch[1] : 'medium';

    // Extract added date
    const addedMatch = body.match(/\*\*Added\*\*:\s*([\d-]+)/);
    const added = addedMatch ? addedMatch[1] : '';

    tasks.push({ id, title, priority, added });
  }

  return tasks;
}

async function main() {
  try {
    // Skip for subagent sessions
    const claudeProjectDir = process.env.CLAUDE_PROJECT_DIR || '';
    const isSubagent = claudeProjectDir.includes('/.claude/Agents/') ||
                      process.env.CLAUDE_AGENT_TYPE !== undefined;

    if (isSubagent) {
      process.exit(0);
    }

    // Check if todo file exists
    if (!existsSync(TODO_FILE)) {
      process.exit(0);
    }

    const content = readFileSync(TODO_FILE, 'utf-8');
    const tasks = parseQueuedTasks(content);

    if (tasks.length === 0) {
      process.exit(0);
    }

    // Sort by priority (high first)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    tasks.sort((a, b) => (priorityOrder[a.priority as keyof typeof priorityOrder] || 1) -
                         (priorityOrder[b.priority as keyof typeof priorityOrder] || 1));

    // Build reminder message
    const highPriority = tasks.filter(t => t.priority === 'high');
    const taskList = tasks.slice(0, 5).map(t =>
      `  - [${t.id}] ${t.title} (${t.priority})`
    ).join('\n');

    let urgency = '';
    if (highPriority.length > 0) {
      urgency = `\n\n⚠️ ${highPriority.length} high priority task${highPriority.length > 1 ? 's' : ''} waiting!`;
    }

    const message = `<system-reminder>
📋 KAI TODO QUEUE: ${tasks.length} task${tasks.length > 1 ? 's' : ''} waiting${urgency}

${taskList}${tasks.length > 5 ? `\n  ... and ${tasks.length - 5} more` : ''}

Use \`/kai-todo next\` to start the highest priority task, or \`/kai-todo list\` for details.
</system-reminder>`;

    console.log(message);
    console.error(`📋 Kai has ${tasks.length} queued task(s)`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error in kai-todo-reminder:', error);
    process.exit(0); // Don't fail the session
  }
}

main();
