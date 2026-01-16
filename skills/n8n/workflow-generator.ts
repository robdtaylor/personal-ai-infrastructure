/**
 * n8n Workflow Generator
 * Translates natural language descriptions into n8n workflow structures
 */

import { n8nClient, type N8nNode, type N8nWorkflow } from "./n8n-client.ts";

// Common node type mappings
const NODE_TYPES = {
  // Triggers
  webhook: "n8n-nodes-base.webhook",
  cron: "n8n-nodes-base.scheduleTrigger",
  emailTrigger: "n8n-nodes-base.emailReadImap",
  githubTrigger: "n8n-nodes-base.githubTrigger",
  slackTrigger: "n8n-nodes-base.slackTrigger",
  discordTrigger: "n8n-nodes-base.discordTrigger",
  httpRequest: "n8n-nodes-base.httpRequest",

  // Actions
  slack: "n8n-nodes-base.slack",
  discord: "n8n-nodes-base.discord",
  email: "n8n-nodes-base.emailSend",
  googleSheets: "n8n-nodes-base.googleSheets",
  notion: "n8n-nodes-base.notion",
  github: "n8n-nodes-base.github",
  telegram: "n8n-nodes-base.telegram",
  openai: "@n8n/n8n-nodes-langchain.openAi",

  // Logic & Transform
  if: "n8n-nodes-base.if",
  switch: "n8n-nodes-base.switch",
  merge: "n8n-nodes-base.merge",
  set: "n8n-nodes-base.set",
  code: "n8n-nodes-base.code",
  functionNode: "n8n-nodes-base.function",
  dateTime: "n8n-nodes-base.dateTime",
  splitInBatches: "n8n-nodes-base.splitInBatches",
  wait: "n8n-nodes-base.wait",

  // Data
  readWriteFile: "n8n-nodes-base.readWriteFile",
  spreadsheetFile: "n8n-nodes-base.spreadsheetFile",
  xml: "n8n-nodes-base.xml",
  html: "n8n-nodes-base.html",
} as const;

// Node templates with common configurations
const NODE_TEMPLATES: Record<string, Partial<N8nNode>> = {
  webhook: {
    type: NODE_TYPES.webhook,
    typeVersion: 2,
    parameters: {
      path: "webhook",
      httpMethod: "POST",
      responseMode: "onReceived",
      responseData: "allEntries",
    },
  },

  cron: {
    type: NODE_TYPES.cron,
    typeVersion: 1.2,
    parameters: {
      rule: {
        interval: [{ field: "cronExpression", expression: "0 9 * * *" }],
      },
    },
  },

  slack: {
    type: NODE_TYPES.slack,
    typeVersion: 2.2,
    parameters: {
      resource: "message",
      operation: "post",
      channel: { __rl: true, mode: "id", value: "" },
      text: "",
    },
  },

  discord: {
    type: NODE_TYPES.discord,
    typeVersion: 2,
    parameters: {
      resource: "message",
      operation: "send",
      guildId: { __rl: true, mode: "list", value: "" },
      channelId: { __rl: true, mode: "list", value: "" },
      content: "",
    },
  },

  httpRequest: {
    type: NODE_TYPES.httpRequest,
    typeVersion: 4.2,
    parameters: {
      method: "GET",
      url: "",
      options: {},
    },
  },

  set: {
    type: NODE_TYPES.set,
    typeVersion: 3.4,
    parameters: {
      mode: "manual",
      duplicateItem: false,
      assignments: {
        assignments: [],
      },
    },
  },

  code: {
    type: NODE_TYPES.code,
    typeVersion: 2,
    parameters: {
      mode: "runOnceForAllItems",
      jsCode: "// Process items\nreturn items;",
      language: "javaScript",
    },
  },

  if: {
    type: NODE_TYPES.if,
    typeVersion: 2,
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: "" },
        conditions: [],
        combinator: "and",
      },
    },
  },

  email: {
    type: NODE_TYPES.email,
    typeVersion: 2.1,
    parameters: {
      fromEmail: "",
      toEmail: "",
      subject: "",
      emailFormat: "text",
      text: "",
    },
  },

  googleSheets: {
    type: NODE_TYPES.googleSheets,
    typeVersion: 4.5,
    parameters: {
      operation: "append",
      documentId: { __rl: true, mode: "list", value: "" },
      sheetName: { __rl: true, mode: "list", value: "" },
    },
  },

  githubTrigger: {
    type: NODE_TYPES.githubTrigger,
    typeVersion: 1,
    parameters: {
      owner: "",
      repository: "",
      events: ["issues"],
    },
  },
};

// Workflow builder class
export class WorkflowBuilder {
  private nodes: N8nNode[] = [];
  private connections: Record<string, { main: Array<Array<{ node: string; type: string; index: number }>> }> = {};
  private nodeIndex = 0;

  addNode(
    name: string,
    template: keyof typeof NODE_TEMPLATES,
    overrides: Partial<N8nNode> = {}
  ): WorkflowBuilder {
    const baseTemplate = NODE_TEMPLATES[template];
    if (!baseTemplate) {
      throw new Error(`Unknown node template: ${template}`);
    }

    const node: N8nNode = {
      id: crypto.randomUUID(),
      name,
      type: baseTemplate.type!,
      typeVersion: baseTemplate.typeVersion || 1,
      position: [250 + this.nodeIndex * 250, 300],
      parameters: { ...baseTemplate.parameters, ...overrides.parameters },
      ...overrides,
    };

    this.nodes.push(node);
    this.nodeIndex++;
    return this;
  }

  addCustomNode(node: N8nNode): WorkflowBuilder {
    node.id = node.id || crypto.randomUUID();
    node.position = node.position || [250 + this.nodeIndex * 250, 300];
    this.nodes.push(node);
    this.nodeIndex++;
    return this;
  }

  connect(fromNode: string, toNode: string, outputIndex = 0): WorkflowBuilder {
    if (!this.connections[fromNode]) {
      this.connections[fromNode] = { main: [[]] };
    }

    // Ensure we have enough output arrays
    while (this.connections[fromNode].main.length <= outputIndex) {
      this.connections[fromNode].main.push([]);
    }

    this.connections[fromNode].main[outputIndex].push({
      node: toNode,
      type: "main",
      index: 0,
    });

    return this;
  }

  build(name: string): Omit<N8nWorkflow, "id"> {
    return {
      name,
      nodes: this.nodes,
      connections: this.connections,
      settings: {
        executionOrder: "v1",
        saveManualExecutions: true,
        callerPolicy: "workflowsFromSameOwner",
      },
    };
  }
}

// Pre-built workflow templates
export const WORKFLOW_TEMPLATES = {
  // Simple webhook that responds with received data
  webhookEcho: (): Omit<N8nWorkflow, "id"> => {
    return new WorkflowBuilder()
      .addNode("Webhook", "webhook")
      .addNode("Respond", "set", {
        parameters: {
          mode: "manual",
          assignments: {
            assignments: [
              {
                id: crypto.randomUUID(),
                name: "received",
                value: "={{ $json }}",
                type: "object",
              },
            ],
          },
        },
      })
      .connect("Webhook", "Respond")
      .build("Webhook Echo");
  },

  // Daily Slack notification
  dailySlackMessage: (
    channel: string,
    message: string,
    cronExpression = "0 9 * * *"
  ): Omit<N8nWorkflow, "id"> => {
    return new WorkflowBuilder()
      .addNode("Schedule", "cron", {
        parameters: {
          rule: {
            interval: [{ field: "cronExpression", expression: cronExpression }],
          },
        },
      })
      .addNode("Send Slack", "slack", {
        parameters: {
          resource: "message",
          operation: "post",
          channel: { __rl: true, mode: "id", value: channel },
          text: message,
        },
      })
      .connect("Schedule", "Send Slack")
      .build("Daily Slack Message");
  },

  // GitHub issue to Discord
  githubToDiscord: (
    owner: string,
    repo: string,
    guildId: string,
    channelId: string
  ): Omit<N8nWorkflow, "id"> => {
    return new WorkflowBuilder()
      .addNode("GitHub Trigger", "githubTrigger", {
        parameters: {
          owner,
          repository: repo,
          events: ["issues"],
        },
      })
      .addNode("Format Message", "set", {
        parameters: {
          mode: "manual",
          assignments: {
            assignments: [
              {
                id: crypto.randomUUID(),
                name: "message",
                value:
                  '=New issue: **{{ $json.issue.title }}**\n{{ $json.issue.html_url }}',
                type: "string",
              },
            ],
          },
        },
      })
      .addNode("Discord", "discord", {
        parameters: {
          resource: "message",
          operation: "send",
          guildId: { __rl: true, mode: "list", value: guildId },
          channelId: { __rl: true, mode: "list", value: channelId },
          content: "={{ $json.message }}",
        },
      })
      .connect("GitHub Trigger", "Format Message")
      .connect("Format Message", "Discord")
      .build("GitHub Issues to Discord");
  },

  // Webhook to Google Sheets
  webhookToSheets: (
    spreadsheetId: string,
    sheetName: string
  ): Omit<N8nWorkflow, "id"> => {
    return new WorkflowBuilder()
      .addNode("Webhook", "webhook")
      .addNode("Google Sheets", "googleSheets", {
        parameters: {
          operation: "append",
          documentId: { __rl: true, mode: "id", value: spreadsheetId },
          sheetName: { __rl: true, mode: "name", value: sheetName },
        },
      })
      .connect("Webhook", "Google Sheets")
      .build("Webhook to Google Sheets");
  },

  // HTTP Request with response
  httpRequestWorkflow: (
    url: string,
    method = "GET"
  ): Omit<N8nWorkflow, "id"> => {
    return new WorkflowBuilder()
      .addNode("Schedule", "cron")
      .addNode("HTTP Request", "httpRequest", {
        parameters: {
          method,
          url,
          options: {},
        },
      })
      .addNode("Process Response", "code", {
        parameters: {
          mode: "runOnceForAllItems",
          jsCode:
            "// Process the HTTP response\nconst response = items[0].json;\nreturn [{ json: { processed: true, data: response } }];",
        },
      })
      .connect("Schedule", "HTTP Request")
      .connect("HTTP Request", "Process Response")
      .build("Scheduled HTTP Request");
  },
};

// Main function to create workflow from description
export async function createWorkflowFromDescription(
  description: string,
  workflowName?: string
): Promise<{ workflow: N8nWorkflow; url: string }> {
  // This function is meant to be called by Claude Code
  // Claude will analyze the description and generate the appropriate workflow

  // For now, provide a basic structure that Claude can populate
  const name = workflowName || `Workflow - ${new Date().toISOString().slice(0, 10)}`;

  // Return a placeholder - Claude Code will generate the actual workflow
  const workflow = new WorkflowBuilder()
    .addNode("Start", "webhook")
    .build(name);

  const created = await n8nClient.createWorkflow(workflow);
  const baseUrl = process.env.N8N_BASE_URL || "http://localhost:5678";

  return {
    workflow: created,
    url: `${baseUrl}/workflow/${created.id}`,
  };
}

// CLI interface
if (import.meta.main) {
  const args = process.argv.slice(2);
  const command = args[0];

  async function main() {
    try {
      switch (command) {
        case "create": {
          const description = args.slice(1).join(" ");
          if (!description) {
            console.error("Usage: workflow-generator.ts create <description>");
            process.exit(1);
          }
          const result = await createWorkflowFromDescription(description);
          console.log(`Created workflow: ${result.workflow.name}`);
          console.log(`URL: ${result.url}`);
          break;
        }

        case "template": {
          const templateName = args[1];
          const templates = Object.keys(WORKFLOW_TEMPLATES);

          if (!templateName || !templates.includes(templateName)) {
            console.log("Available templates:");
            templates.forEach((t) => console.log(`  - ${t}`));
            break;
          }

          // Create from template
          const templateFn = WORKFLOW_TEMPLATES[templateName as keyof typeof WORKFLOW_TEMPLATES];
          const workflow = templateFn();
          const created = await n8nClient.createWorkflow(workflow);
          const baseUrl = process.env.N8N_BASE_URL || "http://localhost:5678";
          console.log(`Created workflow: ${created.name}`);
          console.log(`URL: ${baseUrl}/workflow/${created.id}`);
          break;
        }

        default:
          console.log(`
n8n Workflow Generator

Commands:
  create <description>    Create workflow from natural language
  template [name]         Create from template (lists templates if no name)

Templates:
${Object.keys(WORKFLOW_TEMPLATES)
  .map((t) => `  - ${t}`)
  .join("\n")}

Examples:
  bun run workflow-generator.ts template webhookEcho
  bun run workflow-generator.ts create "webhook that logs to Google Sheets"
          `);
      }
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
      process.exit(1);
    }
  }

  main();
}

export { NODE_TYPES, NODE_TEMPLATES };
