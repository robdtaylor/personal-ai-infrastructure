---
name: n8n
description: |
  Create, manage, and execute n8n workflows from natural language prompts.
  Connects to your local n8n instance to build automation workflows.

  USE WHEN user says 'create workflow', 'n8n', 'automate', 'build automation',
  'connect services', 'webhook workflow', 'schedule task', 'integrate apps'
---

# n8n Workflow Creator

Create n8n workflows from natural language descriptions. This skill connects to your local n8n instance and translates plain English into working automation workflows.

## Setup

### 1. Add your n8n API key to `~/.claude/.env`:

```bash
# Get your API key from n8n: Settings > API > Create API Key
N8N_API_KEY=your_api_key_here
N8N_BASE_URL=http://localhost:5678  # Default for local instance
```

### 2. Verify n8n is running:

```bash
curl http://localhost:5678/healthz
# Should return: {"status":"ok"}
```

## Commands

### Create Workflow

**Trigger:** "create a workflow that...", "build an n8n workflow to...", "automate..."

**Example prompts:**
- "Create a workflow that sends a Slack message when a new GitHub issue is created"
- "Build an automation that posts to Discord every day at 9am with a weather update"
- "Create a webhook that receives data and saves it to Google Sheets"

### List Workflows

**Trigger:** "list my workflows", "show n8n workflows", "what workflows do I have"

### Execute Workflow

**Trigger:** "run workflow [name]", "execute [workflow name]", "trigger [workflow]"

### Get Workflow Details

**Trigger:** "show workflow [name]", "describe [workflow name]"

## Workflow Creation Process

When you request a workflow, I will:

1. **Analyze your request** - Identify trigger, actions, and data flow
2. **Generate workflow JSON** - Create the n8n workflow structure
3. **Create via API** - Push to your n8n instance
4. **Provide URL** - Link to open and configure in n8n UI

## Common Workflow Patterns

### Webhook → Action
- Receive HTTP request → Process → Send notification
- API endpoint → Transform data → Store in database

### Schedule → Action
- Cron trigger → Fetch data → Send report
- Daily schedule → Check status → Alert on condition

### Event → Notification
- GitHub webhook → Filter → Slack/Discord message
- Email received → Extract → Create task

## Available n8n Nodes

The skill knows about common n8n nodes including:
- **Triggers:** Webhook, Cron, Email, GitHub, Slack, Discord
- **Actions:** HTTP Request, Slack, Discord, Google Sheets, Notion, Email
- **Logic:** IF, Switch, Merge, Split, Loop
- **Transform:** Set, Code, Function, Date/Time

## Credentials Note

After creating a workflow, you may need to configure credentials in the n8n UI:
1. Open the workflow URL provided
2. Click on nodes requiring authentication
3. Add or select existing credentials

## API Reference

The skill uses these n8n API endpoints:
- `GET /api/v1/workflows` - List workflows
- `POST /api/v1/workflows` - Create workflow
- `GET /api/v1/workflows/{id}` - Get workflow details
- `PUT /api/v1/workflows/{id}` - Update workflow
- `POST /api/v1/workflows/{id}/activate` - Activate workflow
- `DELETE /api/v1/workflows/{id}` - Delete workflow

## Examples

### Simple Webhook Workflow

```
User: Create a webhook that logs incoming data to a file

Generated workflow:
1. Webhook node (receives POST requests)
2. Set node (formats the data)
3. Write File node (appends to log)
```

### Scheduled Notification

```
User: Send me a Slack message every morning at 9am with "Good morning!"

Generated workflow:
1. Cron node (triggers at 9:00 AM daily)
2. Slack node (sends message to specified channel)
```

### Integration Workflow

```
User: When a new GitHub issue is created, post it to Discord

Generated workflow:
1. GitHub Trigger node (new issue event)
2. Set node (formats message)
3. Discord node (sends to channel)
```

## Troubleshooting

### "API key required" error
- Ensure `N8N_API_KEY` is set in `~/.claude/.env`
- Verify the key is valid in n8n Settings > API

### "Connection refused" error
- Check n8n is running: `docker ps | grep n8n`
- Verify URL in `.env` matches your n8n instance

### Workflow created but empty
- This is a known n8n API issue - the workflow structure is correct
- Open the workflow in n8n UI to verify nodes are present

## Supplementary Resources

- **Client code:** `~/.claude/skills/n8n/n8n-client.ts`
- **Workflow templates:** `~/.claude/skills/n8n/templates/`
- **n8n docs:** https://docs.n8n.io/
