# n8n Workflow Generation Guide for Claude

This document provides instructions for generating n8n workflows from natural language descriptions.

## Workflow Structure

An n8n workflow consists of:

```typescript
interface N8nWorkflow {
  name: string;
  nodes: N8nNode[];
  connections: Record<string, { main: Array<Array<{ node: string; type: string; index: number }>> }>;
  settings: {
    executionOrder: "v1";
    saveManualExecutions: boolean;
    callerPolicy: string;
  };
}

interface N8nNode {
  id: string;           // UUID
  name: string;         // Display name (unique in workflow)
  type: string;         // Node type (e.g., "n8n-nodes-base.webhook")
  typeVersion: number;  // Version of node type
  position: [number, number];  // [x, y] canvas position
  parameters: Record<string, unknown>;  // Node-specific config
  credentials?: Record<string, { id: string; name: string }>;  // Optional credentials
}
```

## Common Node Types and Parameters

### Triggers (Start Workflow)

#### Webhook
```typescript
{
  type: "n8n-nodes-base.webhook",
  typeVersion: 2,
  parameters: {
    path: "my-webhook",           // URL path (becomes /webhook/my-webhook)
    httpMethod: "POST",           // GET, POST, PUT, DELETE, etc.
    responseMode: "onReceived",   // "onReceived" or "lastNode"
    responseData: "allEntries",   // Response data format
  }
}
```

#### Schedule Trigger (Cron)
```typescript
{
  type: "n8n-nodes-base.scheduleTrigger",
  typeVersion: 1.2,
  parameters: {
    rule: {
      interval: [{
        field: "cronExpression",
        expression: "0 9 * * *"   // At 9:00 AM daily
      }]
    }
  }
}
```

Common cron expressions:
- `0 9 * * *` - Daily at 9:00 AM
- `0 */2 * * *` - Every 2 hours
- `0 9 * * 1` - Every Monday at 9:00 AM
- `*/15 * * * *` - Every 15 minutes
- `0 0 1 * *` - First day of month at midnight

#### GitHub Trigger
```typescript
{
  type: "n8n-nodes-base.githubTrigger",
  typeVersion: 1,
  parameters: {
    owner: "username",
    repository: "repo-name",
    events: ["issues", "push", "pull_request"]  // Event types
  }
}
```

### Actions (Do Things)

#### Slack Message
```typescript
{
  type: "n8n-nodes-base.slack",
  typeVersion: 2.2,
  parameters: {
    resource: "message",
    operation: "post",
    channel: { __rl: true, mode: "id", value: "C01234567" },  // Channel ID
    text: "Hello from n8n!",
    // Or use expression: "={{ $json.message }}"
  }
}
```

#### Discord Message
```typescript
{
  type: "n8n-nodes-base.discord",
  typeVersion: 2,
  parameters: {
    resource: "message",
    operation: "send",
    guildId: { __rl: true, mode: "list", value: "SERVER_ID" },
    channelId: { __rl: true, mode: "list", value: "CHANNEL_ID" },
    content: "Message content here"
  }
}
```

#### HTTP Request
```typescript
{
  type: "n8n-nodes-base.httpRequest",
  typeVersion: 4.2,
  parameters: {
    method: "GET",  // GET, POST, PUT, DELETE, PATCH
    url: "https://api.example.com/data",
    authentication: "none",  // or "genericCredentialType"
    options: {
      response: {
        response: { fullResponse: false }
      }
    },
    // For POST with body:
    sendBody: true,
    contentType: "json",
    body: { key: "value" }  // Or expression
  }
}
```

#### Email Send
```typescript
{
  type: "n8n-nodes-base.emailSend",
  typeVersion: 2.1,
  parameters: {
    fromEmail: "from@example.com",
    toEmail: "to@example.com",
    subject: "Email Subject",
    emailFormat: "text",  // or "html"
    text: "Email body"
  }
}
```

#### Google Sheets
```typescript
{
  type: "n8n-nodes-base.googleSheets",
  typeVersion: 4.5,
  parameters: {
    operation: "append",  // "append", "read", "update", "delete"
    documentId: { __rl: true, mode: "id", value: "SPREADSHEET_ID" },
    sheetName: { __rl: true, mode: "name", value: "Sheet1" },
    // For append, data comes from previous node
  }
}
```

### Logic & Transform

#### Set Node (Data Manipulation)
```typescript
{
  type: "n8n-nodes-base.set",
  typeVersion: 3.4,
  parameters: {
    mode: "manual",
    duplicateItem: false,
    assignments: {
      assignments: [
        {
          id: "uuid-here",
          name: "fieldName",
          value: "={{ $json.inputField }}",  // Expression
          type: "string"  // "string", "number", "boolean", "object", "array"
        }
      ]
    }
  }
}
```

#### Code Node (JavaScript)
```typescript
{
  type: "n8n-nodes-base.code",
  typeVersion: 2,
  parameters: {
    mode: "runOnceForAllItems",  // or "runOnceForEachItem"
    jsCode: `
// Access input items
const items = $input.all();

// Process and return
return items.map(item => ({
  json: {
    processed: true,
    original: item.json
  }
}));
    `,
    language: "javaScript"  // or "python"
  }
}
```

#### IF Node (Conditional)
```typescript
{
  type: "n8n-nodes-base.if",
  typeVersion: 2,
  parameters: {
    conditions: {
      options: { caseSensitive: true, leftValue: "" },
      conditions: [
        {
          id: "uuid-here",
          leftValue: "={{ $json.status }}",
          rightValue: "active",
          operator: { type: "string", operation: "equals" }
        }
      ],
      combinator: "and"  // or "or"
    }
  }
}
```

## Connections

Connections link nodes together. The format is:

```typescript
connections: {
  "Source Node Name": {
    main: [
      [{ node: "Target Node Name", type: "main", index: 0 }]  // Output 0
    ]
  }
}
```

For nodes with multiple outputs (like IF):
```typescript
connections: {
  "IF": {
    main: [
      [{ node: "True Branch", type: "main", index: 0 }],   // Output 0 (true)
      [{ node: "False Branch", type: "main", index: 0 }]  // Output 1 (false)
    ]
  }
}
```

## Position Layout

Place nodes in a grid for readability:
- Start at [250, 300]
- Space horizontally by 250 pixels
- For parallel branches, offset vertically by 150 pixels

```
[250, 300] -> [500, 300] -> [750, 300]
                         \-> [750, 450]  (branch)
```

## Expression Syntax

n8n uses a custom expression syntax:
- `{{ $json.field }}` - Access current item's JSON field
- `{{ $node["Node Name"].json.field }}` - Access another node's output
- `{{ $now }}` - Current timestamp
- `{{ $today }}` - Today's date
- `{{ $env.VARIABLE }}` - Environment variable

Always prefix expressions with `=` in parameter values:
```typescript
text: "={{ $json.message }}"
```

## Generating Workflows

When a user requests a workflow:

1. **Identify the trigger** - What starts the workflow?
   - Webhook (HTTP request)
   - Schedule (time-based)
   - App trigger (GitHub, Slack, etc.)

2. **Identify the actions** - What should happen?
   - Send message (Slack, Discord, Email)
   - Make request (HTTP)
   - Store data (Sheets, Database)
   - Transform data (Set, Code)

3. **Plan the data flow** - How does data move between nodes?
   - What fields are needed at each step?
   - What transformations are required?

4. **Build the workflow** - Use the WorkflowBuilder or construct JSON:

```typescript
import { WorkflowBuilder } from "./workflow-generator.ts";
import { n8nClient } from "./n8n-client.ts";

const workflow = new WorkflowBuilder()
  .addNode("Webhook", "webhook", {
    parameters: { path: "my-hook", httpMethod: "POST" }
  })
  .addNode("Process", "set", {
    parameters: {
      assignments: {
        assignments: [{
          id: crypto.randomUUID(),
          name: "message",
          value: "={{ $json.data }}",
          type: "string"
        }]
      }
    }
  })
  .addNode("Notify", "slack", {
    parameters: {
      channel: { __rl: true, mode: "id", value: "C123" },
      text: "={{ $json.message }}"
    }
  })
  .connect("Webhook", "Process")
  .connect("Process", "Notify")
  .build("My Workflow");

const created = await n8nClient.createWorkflow(workflow);
console.log(`Created: http://localhost:5678/workflow/${created.id}`);
```

## Important Notes

1. **Credentials** - Most external services (Slack, Discord, Google) require credentials configured in n8n UI. After creating workflow, user must add credentials.

2. **Node Names** - Must be unique within a workflow. Use descriptive names.

3. **IDs** - Generate UUIDs for node IDs and assignment IDs using `crypto.randomUUID()`.

4. **Testing** - After creating, user should test in n8n UI before activating.

5. **Activation** - Workflows with triggers need to be activated to run automatically.

## Example Prompts and Responses

**User:** "Create a workflow that posts to Slack when someone submits a form via webhook"

**Generated Workflow:**
```typescript
const workflow = new WorkflowBuilder()
  .addNode("Form Webhook", "webhook", {
    parameters: {
      path: "form-submission",
      httpMethod: "POST",
      responseMode: "onReceived"
    }
  })
  .addNode("Format Message", "set", {
    parameters: {
      assignments: {
        assignments: [{
          id: crypto.randomUUID(),
          name: "slackMessage",
          value: "=New form submission from {{ $json.email }}:\n{{ $json.message }}",
          type: "string"
        }]
      }
    }
  })
  .addNode("Post to Slack", "slack", {
    parameters: {
      resource: "message",
      operation: "post",
      channel: { __rl: true, mode: "id", value: "" },  // User configures
      text: "={{ $json.slackMessage }}"
    }
  })
  .connect("Form Webhook", "Format Message")
  .connect("Format Message", "Post to Slack")
  .build("Form to Slack");
```

**User:** "Send me a daily weather update at 8am"

**Generated Workflow:**
```typescript
const workflow = new WorkflowBuilder()
  .addNode("Daily 8AM", "cron", {
    parameters: {
      rule: {
        interval: [{ field: "cronExpression", expression: "0 8 * * *" }]
      }
    }
  })
  .addNode("Get Weather", "httpRequest", {
    parameters: {
      method: "GET",
      url: "https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=auto:ip"
    }
  })
  .addNode("Format", "set", {
    parameters: {
      assignments: {
        assignments: [{
          id: crypto.randomUUID(),
          name: "weatherReport",
          value: "=Weather: {{ $json.current.condition.text }}, {{ $json.current.temp_f }}°F",
          type: "string"
        }]
      }
    }
  })
  .addNode("Send Notification", "slack", {
    parameters: {
      text: "={{ $json.weatherReport }}"
    }
  })
  .connect("Daily 8AM", "Get Weather")
  .connect("Get Weather", "Format")
  .connect("Format", "Send Notification")
  .build("Daily Weather Update");
```
