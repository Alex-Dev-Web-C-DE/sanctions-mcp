import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "sanctions-mcp",
  version: "1.0.0"
});

server.tool(
  "screen_sanctions",
  { name: z.string().describe("Name of the entity to screen") },
  async ({ name }) => {
    const res = await fetch(`https://compliance-engine.boring-saas-infra.workers.dev/screen?name=${encodeURIComponent(name)}`);
    const data = await res.json();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
