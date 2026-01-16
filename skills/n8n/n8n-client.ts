/**
 * n8n API Client
 * Connects to local n8n instance to manage workflows
 */

import { config } from "dotenv";
import { resolve } from "path";
import { homedir } from "os";

// Load environment variables from PAI .env
config({ path: resolve(homedir(), ".claude/.env") });

const N8N_BASE_URL = process.env.N8N_BASE_URL || "http://localhost:5678";
const N8N_API_KEY = process.env.N8N_API_KEY;

if (!N8N_API_KEY) {
  console.error("Error: N8N_API_KEY not found in ~/.claude/.env");
  console.error("Add your API key: N8N_API_KEY=your_key_here");
  process.exit(1);
}

// Types
interface N8nNode {
  id?: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, unknown>;
  credentials?: Record<string, { id: string; name: string }>;
}

interface N8nConnection {
  node: string;
  type: string;
  index: number;
}

interface N8nWorkflow {
  id?: string;
  name: string;
  active?: boolean;
  nodes: N8nNode[];
  connections: Record<string, { main: N8nConnection[][] }>;
  settings: {
    executionOrder?: string;
    saveManualExecutions?: boolean;
    callerPolicy?: string;
  };
  staticData?: unknown;
  tags?: Array<{ id: string; name: string }>;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  data?: T;
  nextCursor?: string | null;
}

// API Client
class N8nClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}/api/v1${endpoint}`;
    const headers: Record<string, string> = {
      "X-N8N-API-KEY": this.apiKey,
      "Content-Type": "application/json",
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`n8n API error (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/healthz`);
      const data = await response.json();
      return data.status === "ok";
    } catch {
      return false;
    }
  }

  // Workflow operations
  async listWorkflows(options?: {
    active?: boolean;
    tags?: string;
    limit?: number;
  }): Promise<ApiResponse<N8nWorkflow[]>> {
    const params = new URLSearchParams();
    if (options?.active !== undefined)
      params.set("active", String(options.active));
    if (options?.tags) params.set("tags", options.tags);
    if (options?.limit) params.set("limit", String(options.limit));

    const query = params.toString() ? `?${params.toString()}` : "";
    return this.request<ApiResponse<N8nWorkflow[]>>("GET", `/workflows${query}`);
  }

  async getWorkflow(id: string): Promise<N8nWorkflow> {
    return this.request<N8nWorkflow>("GET", `/workflows/${id}`);
  }

  async createWorkflow(workflow: Omit<N8nWorkflow, "id">): Promise<N8nWorkflow> {
    return this.request<N8nWorkflow>("POST", "/workflows", workflow);
  }

  async updateWorkflow(
    id: string,
    workflow: Partial<N8nWorkflow>
  ): Promise<N8nWorkflow> {
    return this.request<N8nWorkflow>("PUT", `/workflows/${id}`, workflow);
  }

  async deleteWorkflow(id: string): Promise<N8nWorkflow> {
    return this.request<N8nWorkflow>("DELETE", `/workflows/${id}`);
  }

  async activateWorkflow(id: string): Promise<N8nWorkflow> {
    return this.request<N8nWorkflow>("POST", `/workflows/${id}/activate`);
  }

  async deactivateWorkflow(id: string): Promise<N8nWorkflow> {
    return this.request<N8nWorkflow>("POST", `/workflows/${id}/deactivate`);
  }

  // Execution operations
  async executeWorkflow(id: string): Promise<unknown> {
    return this.request("POST", `/workflows/${id}/run`);
  }

  async listExecutions(workflowId?: string): Promise<ApiResponse<unknown[]>> {
    const query = workflowId ? `?workflowId=${workflowId}` : "";
    return this.request<ApiResponse<unknown[]>>("GET", `/executions${query}`);
  }

  // Tags
  async listTags(): Promise<ApiResponse<Array<{ id: string; name: string }>>> {
    return this.request<ApiResponse<Array<{ id: string; name: string }>>>(
      "GET",
      "/tags"
    );
  }

  // Credentials (list only - cannot create via API for security)
  async listCredentials(): Promise<ApiResponse<unknown[]>> {
    return this.request<ApiResponse<unknown[]>>("GET", "/credentials");
  }
}

// Export singleton instance
export const n8nClient = new N8nClient(N8N_BASE_URL, N8N_API_KEY);

// Export types
export type { N8nNode, N8nConnection, N8nWorkflow, ApiResponse };

// CLI interface when run directly
if (import.meta.main) {
  const args = process.argv.slice(2);
  const command = args[0];

  async function main() {
    try {
      switch (command) {
        case "health":
          const healthy = await n8nClient.healthCheck();
          console.log(healthy ? "n8n is healthy" : "n8n is not responding");
          break;

        case "list":
          const workflows = await n8nClient.listWorkflows();
          console.log(JSON.stringify(workflows, null, 2));
          break;

        case "get":
          if (!args[1]) {
            console.error("Usage: n8n-client.ts get <workflow-id>");
            process.exit(1);
          }
          const workflow = await n8nClient.getWorkflow(args[1]);
          console.log(JSON.stringify(workflow, null, 2));
          break;

        case "activate":
          if (!args[1]) {
            console.error("Usage: n8n-client.ts activate <workflow-id>");
            process.exit(1);
          }
          const activated = await n8nClient.activateWorkflow(args[1]);
          console.log(`Workflow ${activated.name} activated`);
          break;

        case "delete":
          if (!args[1]) {
            console.error("Usage: n8n-client.ts delete <workflow-id>");
            process.exit(1);
          }
          const deleted = await n8nClient.deleteWorkflow(args[1]);
          console.log(`Workflow ${deleted.name} deleted`);
          break;

        default:
          console.log(`
n8n Client - Manage n8n workflows

Commands:
  health              Check if n8n is running
  list                List all workflows
  get <id>            Get workflow details
  activate <id>       Activate a workflow
  delete <id>         Delete a workflow

Examples:
  bun run n8n-client.ts health
  bun run n8n-client.ts list
  bun run n8n-client.ts get abc123
          `);
      }
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
      process.exit(1);
    }
  }

  main();
}
