#!/usr/bin/env bun
/**
 * ingest - Capture Pipeline CLI
 * Fetch and process content from Telegram into Obsidian
 *
 * Usage:
 *   ingest setup                  # Configure Telegram bot
 *   ingest poll                   # Fetch new messages from Telegram
 *   ingest poll --verbose         # Fetch with detailed output
 *   ingest watch                  # Daemon mode - continuously poll and process
 *   ingest watch --interval 60    # Custom interval in seconds (default: 30)
 *   ingest direct <file>          # Direct capture from file or stdin
 *   ingest direct --text "note"   # Capture text directly
 *   ingest process                # Process pending messages into notes
 *   ingest process --type text    # Process only text messages
 *   ingest status                 # View message state counts
 *   ingest status --recent        # View recent messages
 *   ingest status --failed        # View failed messages
 *   ingest retry                  # Retry failed messages
 *   ingest clear                  # Clear all messages (for testing)
 *   ingest test                   # Test Telegram connection
 */

import {
  loadEnv,
  getConfig,
  getTelegramConfig,
  saveTelegramConfig,
  IngestConfig,
  TelegramConfig,
} from "./lib/config";
import {
  initStateDb,
  getMessageCounts,
  getMessageCountsByType,
  getRecentMessages,
  getFailedMessages,
  retryFailedMessages,
  clearAllMessages,
} from "./lib/state";
import { pollMessages, testConnection } from "./lib/telegram";
import { processAllPending } from "./lib/processor";
import { getPipelineStats, formatPipelineStats } from "./lib/monitoring";
import { createInterface } from "readline";

// Load environment variables
loadEnv();

/**
 * Parse command line arguments
 */
function parseArgs(): {
  command: string;
  args: string[];
  flags: Map<string, string | boolean>;
} {
  const args = process.argv.slice(2);
  const flags = new Map<string, string | boolean>();
  const positionalArgs: string[] = [];
  let command = "help";

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];

      if (nextArg && !nextArg.startsWith("-")) {
        flags.set(key, nextArg);
        i += 2;
      } else {
        flags.set(key, true);
        i += 1;
      }
    } else if (arg.startsWith("-")) {
      const key = arg.slice(1);
      flags.set(key, true);
      i += 1;
    } else {
      if (positionalArgs.length === 0) {
        command = arg;
      } else {
        positionalArgs.push(arg);
      }
      i += 1;
    }
  }

  return { command, args: positionalArgs, flags };
}

/**
 * Interactive prompt for setup
 */
async function prompt(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Setup command - configure Telegram bot
 */
async function cmdSetup(config: IngestConfig): Promise<void> {
  console.log("\n🔧 Telegram Bot Setup\n");
  console.log("To create a bot:");
  console.log("  1. Open Telegram and message @BotFather");
  console.log("  2. Send /newbot and follow the instructions");
  console.log("  3. Copy the bot token\n");

  // Check if config exists
  const existing = getTelegramConfig(config);
  if (existing) {
    console.log("Existing configuration found:");
    console.log(`  Bot Token: ${existing.botToken.slice(0, 10)}...`);
    console.log(`  Chat ID: ${existing.chatId}\n`);

    const overwrite = await prompt("Overwrite existing config? (y/N): ");
    if (overwrite.toLowerCase() !== "y") {
      console.log("Keeping existing configuration.");
      return;
    }
  }

  const botToken = await prompt("Enter bot token: ");
  if (!botToken) {
    console.error("Bot token is required.");
    process.exit(1);
  }

  console.log("\nTo get your chat ID:");
  console.log("  1. Send a message to your bot");
  console.log("  2. Or use a private channel and forward a message\n");

  const chatId = await prompt("Enter chat ID: ");
  if (!chatId) {
    console.error("Chat ID is required.");
    process.exit(1);
  }

  const telegramConfig: TelegramConfig = { botToken, chatId };

  // Test connection
  console.log("\nTesting connection...");
  const test = await testConnection(telegramConfig);

  if (!test.ok) {
    console.error(`\n❌ Connection failed: ${test.error}`);
    console.error("Please check your bot token and try again.");
    process.exit(1);
  }

  console.log(`✅ Connected to bot: @${test.botName}`);

  // Save configuration
  saveTelegramConfig(config, telegramConfig);
  console.log(`\n✅ Configuration saved to ${config.telegramConfigPath}`);
}

/**
 * Test command - test Telegram connection
 */
async function cmdTest(config: IngestConfig): Promise<void> {
  const telegram = getTelegramConfig(config);

  if (!telegram) {
    console.error("❌ Telegram not configured. Run 'ingest setup' first.");
    process.exit(1);
  }

  console.log("Testing Telegram connection...");
  const result = await testConnection(telegram);

  if (result.ok) {
    console.log(`✅ Connected to bot: @${result.botName}`);
  } else {
    console.error(`❌ Connection failed: ${result.error}`);
    process.exit(1);
  }
}

/**
 * Poll command - fetch new messages from Telegram
 */
async function cmdPoll(config: IngestConfig, flags: Map<string, string | boolean>): Promise<void> {
  const telegram = getTelegramConfig(config);

  if (!telegram) {
    console.error("❌ Telegram not configured. Run 'ingest setup' first.");
    process.exit(1);
  }

  const verbose = flags.get("verbose") === true || flags.get("v") === true;

  console.log("📬 Polling Telegram for new messages...\n");

  const startTime = Date.now();
  const result = await pollMessages(config, telegram, { verbose });
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n✅ Poll complete in ${elapsed}s`);
  console.log(`   New messages: ${result.newMessages}`);

  if (result.newMessages > 0) {
    console.log("   By type:");
    for (const [type, count] of Object.entries(result.byType)) {
      console.log(`     - ${type}: ${count}`);
    }
  }
}

/**
 * Status command - show message state
 */
function cmdStatus(config: IngestConfig, flags: Map<string, string | boolean>): void {
  const db = initStateDb(config);

  const showRecent = flags.get("recent") === true || flags.get("r") === true;
  const showFailed = flags.get("failed") === true || flags.get("f") === true;

  if (showRecent) {
    const limit = parseInt(flags.get("limit") as string) || 10;
    const messages = getRecentMessages(db, limit);

    console.log(`📋 Recent Messages (${messages.length})\n`);

    if (messages.length === 0) {
      console.log("   No messages yet.");
    } else {
      for (const msg of messages) {
        const stateIcon =
          msg.state === "completed" ? "✅" :
          msg.state === "failed" ? "❌" :
          msg.state === "processing" ? "⏳" : "📥";

        const preview = msg.rawContent
          ? msg.rawContent.slice(0, 60) + (msg.rawContent.length > 60 ? "..." : "")
          : "(no text)";

        console.log(`${stateIcon} [${msg.messageType}] ${preview}`);
        console.log(`   ID: ${msg.id} | Created: ${msg.createdAt}`);

        if (msg.tags.length > 0) {
          console.log(`   Tags: ${msg.tags.join(", ")}`);
        }

        if (msg.error) {
          console.log(`   Error: ${msg.error}`);
        }

        console.log();
      }
    }
  } else if (showFailed) {
    const messages = getFailedMessages(db);

    console.log(`❌ Failed Messages (${messages.length})\n`);

    if (messages.length === 0) {
      console.log("   No failed messages.");
    } else {
      for (const msg of messages) {
        const preview = msg.rawContent
          ? msg.rawContent.slice(0, 60) + (msg.rawContent.length > 60 ? "..." : "")
          : "(no text)";

        console.log(`[${msg.messageType}] ${preview}`);
        console.log(`   ID: ${msg.id} | Created: ${msg.createdAt}`);
        console.log(`   Error: ${msg.error}`);
        console.log();
      }
    }
  } else {
    // Show overview
    const counts = getMessageCounts(db);
    const byType = getMessageCountsByType(db);

    const total = counts.pending + counts.processing + counts.completed + counts.failed;

    console.log("📊 Ingest Status\n");
    console.log(`   Total Messages: ${total}`);
    console.log();
    console.log("   By State:");
    console.log(`     📥 Pending:    ${counts.pending}`);
    console.log(`     ⏳ Processing: ${counts.processing}`);
    console.log(`     ✅ Completed:  ${counts.completed}`);
    console.log(`     ❌ Failed:     ${counts.failed}`);

    if (Object.keys(byType).length > 0) {
      console.log();
      console.log("   By Type:");
      for (const [type, count] of Object.entries(byType)) {
        console.log(`     - ${type}: ${count}`);
      }
    }
  }

  db.close();
}

/**
 * Retry command - retry failed messages
 */
function cmdRetry(config: IngestConfig): void {
  const db = initStateDb(config);
  const count = retryFailedMessages(db);
  db.close();

  if (count > 0) {
    console.log(`✅ Reset ${count} failed message(s) to pending.`);
    console.log("   Run 'ingest process' to retry processing.");
  } else {
    console.log("No failed messages to retry.");
  }
}

/**
 * Process command - process pending messages into Obsidian notes
 */
async function cmdProcess(config: IngestConfig, flags: Map<string, string | boolean>): Promise<void> {
  const verbose = flags.get("verbose") === true || flags.get("v") === true;
  const filterType = flags.get("type") as string | undefined;

  console.log("📝 Processing pending messages...\n");

  const startTime = Date.now();
  const result = await processAllPending(config, { verbose, type: filterType });
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n✅ Processing complete in ${elapsed}s`);
  console.log(`   Processed: ${result.processed} message(s)`);
  console.log(`   Failed: ${result.failed} message(s)`);

  if (result.processed > 0 && !verbose) {
    console.log("\n   Notes created:");
    for (const r of result.results) {
      if (r.path) {
        console.log(`     - ${r.path}`);
      }
    }
  }
}

/**
 * Watch command - daemon mode for continuous polling and processing
 */
async function cmdWatch(config: IngestConfig, flags: Map<string, string | boolean>): Promise<void> {
  const telegram = getTelegramConfig(config);

  if (!telegram) {
    console.error("❌ Telegram not configured. Run 'ingest setup' first.");
    process.exit(1);
  }

  const verbose = flags.get("verbose") === true || flags.get("v") === true;
  const interval = parseInt(flags.get("interval") as string) || 30;

  console.log("🔄 Watch mode started");
  console.log(`   Interval: ${interval}s`);
  console.log(`   Press Ctrl+C to stop\n`);

  let running = true;
  process.on("SIGINT", () => {
    console.log("\n\n⏹️  Stopping watch mode...");
    running = false;
  });

  while (running) {
    try {
      const timestamp = new Date().toLocaleTimeString();

      // Poll for new messages
      if (verbose) {
        console.log(`[${timestamp}] Polling...`);
      }

      const pollResult = await pollMessages(config, telegram, { verbose: false });

      if (pollResult.newMessages > 0) {
        console.log(`[${timestamp}] Found ${pollResult.newMessages} new message(s)`);

        // Process immediately
        const processResult = await processAllPending(config, { verbose, type: undefined });
        console.log(`[${timestamp}] Processed ${processResult.processed}, failed ${processResult.failed}`);
      } else if (verbose) {
        console.log(`[${timestamp}] No new messages`);
      }

      // Sleep for interval
      if (running) {
        await new Promise(resolve => setTimeout(resolve, interval * 1000));
      }
    } catch (error) {
      const timestamp = new Date().toLocaleTimeString();
      console.error(`[${timestamp}] Error:`, error);
      // Continue watching even after errors
      if (running) {
        await new Promise(resolve => setTimeout(resolve, interval * 1000));
      }
    }
  }

  console.log("✅ Watch mode stopped");
}

/**
 * Direct command - capture content directly from file or stdin
 */
async function cmdDirect(config: IngestConfig, flags: Map<string, string | boolean>, args: string[]): Promise<void> {
  const telegram = getTelegramConfig(config);

  if (!telegram) {
    console.error("❌ Telegram not configured. Run 'ingest setup' first.");
    process.exit(1);
  }

  const textContent = flags.get("text") as string;
  const filePath = args[0];

  if (!textContent && !filePath) {
    // Try to read from stdin
    const stdinText = await readStdin();
    if (stdinText) {
      console.log("📝 Capturing text from stdin...");
      // Here you would send to Telegram or process directly
      // For now, just show what would be captured
      console.log(`   Content: ${stdinText.slice(0, 100)}${stdinText.length > 100 ? '...' : ''}`);
      console.log("   ⚠️  Direct capture implementation pending - content would be sent to Telegram");
    } else {
      console.error("❌ No content provided. Use --text \"content\" or provide a file path.");
      process.exit(1);
    }
  } else if (textContent) {
    console.log("📝 Capturing text...");
    console.log(`   Content: ${textContent.slice(0, 100)}${textContent.length > 100 ? '...' : ''}`);
    console.log("   ⚠️  Direct capture implementation pending - content would be sent to Telegram");
  } else {
    console.log(`📁 Capturing file: ${filePath}`);
    console.log("   ⚠️  Direct capture implementation pending - file would be sent to Telegram");
  }
}

/**
 * Read from stdin (non-blocking)
 */
async function readStdin(): Promise<string | null> {
  if (process.stdin.isTTY) {
    return null;
  }

  const chunks: Buffer[] = [];

  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  const content = Buffer.concat(chunks).toString('utf8').trim();
  return content || null;
}

/**
 * Clear command - clear all messages
 */
async function cmdClear(config: IngestConfig): Promise<void> {
  const confirm = await prompt("⚠️  Clear all messages? This cannot be undone. (y/N): ");

  if (confirm.toLowerCase() !== "y") {
    console.log("Cancelled.");
    return;
  }

  const db = initStateDb(config);
  clearAllMessages(db);
  db.close();

  console.log("✅ All messages cleared.");
}

/**
 * Stats command - show comprehensive pipeline statistics
 */
function cmdStats(config: IngestConfig): void {
  const stats = getPipelineStats(config);
  console.log(formatPipelineStats(stats));
}

/**
 * Help command
 */
function cmdHelp(): void {
  console.log(`
ingest - Capture Pipeline CLI

USAGE
  ingest <command> [options]

COMMANDS
  setup              Configure Telegram bot interactively
  test               Test Telegram bot connection
  poll               Fetch new messages from Telegram
  watch              Daemon mode - continuously poll and process (NEW!)
  direct             Capture content directly from file or stdin (NEW!)
  process            Process pending messages into Obsidian notes
  status             Show message state overview
  stats              Show comprehensive pipeline statistics
  retry              Reset failed messages to pending
  clear              Clear all messages (for testing)
  help               Show this help message

OPTIONS
  --verbose, -v      Show detailed output
  --recent, -r       Show recent messages (with status)
  --failed, -f       Show failed messages (with status)
  --type TYPE        Filter by message type (text, url, voice, photo, document)
  --limit N          Limit number of results (default: 10)
  --debug            Enable debug output

EXAMPLES
  # Setup Telegram bot (first time)
  ingest setup

  # Fetch new messages from Telegram
  ingest poll --verbose

  # Process pending messages into notes
  ingest process --verbose

  # Process only text messages
  ingest process --type text

  # View message counts
  ingest status

  # View recent messages
  ingest status --recent

  # View failed messages
  ingest status --failed

  # Retry failed messages
  ingest retry

  # NEW: Daemon mode - continuous monitoring
  ingest watch                    # Check every 30 seconds (default)
  ingest watch --interval 60      # Custom interval
  ingest watch --verbose          # Show detailed output

  # NEW: Direct capture
  echo "Quick note" | ingest direct
  pbpaste | ingest direct
  ingest direct document.pdf
  ingest direct --text "My note content"

TELEGRAM SETUP
  1. Message @BotFather on Telegram
  2. Create a new bot with /newbot
  3. Copy the bot token
  4. Send a message to your bot or create a private channel
  5. Get your chat ID (use @userinfobot or similar)
  6. Run 'ingest setup' and enter the details
`);
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  const { command, args, flags } = parseArgs();
  const config = getConfig();

  try {
    switch (command) {
      case "setup":
        await cmdSetup(config);
        break;
      case "test":
        await cmdTest(config);
        break;
      case "poll":
        await cmdPoll(config, flags);
        break;
      case "watch":
        await cmdWatch(config, flags);
        break;
      case "direct":
        await cmdDirect(config, flags, args);
        break;
      case "process":
        await cmdProcess(config, flags);
        break;
      case "status":
        cmdStatus(config, flags);
        break;
      case "stats":
        cmdStats(config);
        break;
      case "retry":
        cmdRetry(config);
        break;
      case "clear":
        await cmdClear(config);
        break;
      case "help":
      case "--help":
      case "-h":
        cmdHelp();
        break;
      default:
        console.error(`Unknown command: ${command}`);
        console.error("Run 'ingest help' for usage information.");
        process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
