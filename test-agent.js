import { OpenRouter } from "@openrouter/sdk";
import fs from "fs";
import path from "path";

// 1. Manually load environment variables from .env.local to avoid adding external dependencies
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    envConfig.split(/\r?\n/).forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        // Strip surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value;
      }
    });
    console.log("Loaded environment variables from .env.local");
  }
} catch (e) {
  console.warn("Could not read .env.local, falling back to system environment variables.");
}

// 2. Read the OpenRouter API Key
const apiKey = process.env.OPEN_ROUTER_API_KEY;

if (!apiKey) {
  console.error("\n[Error] OpenRouter API key is missing.");
  console.error("Please add the following to your .env.local or environment:");
  console.error("  OPEN_ROUTER_API_KEY=your_key_here\n");
  process.exit(1);
}

// 3. Initialize OpenRouter exactly as shown in the documentation
const openrouter = new OpenRouter({
  apiKey: apiKey
});

console.log("\nStarting Test Agent...");
console.log("Model: deepseek/deepseek-v4-flash:free");
console.log("Query: 'How many r's are in the word 'strawberry'?'\n");

try {
  // Stream the response to get reasoning tokens in usage
  const stream = await openrouter.chat.send({
    model: "deepseek/deepseek-v4-flash:free",
    messages: [
      {
        role: "user",
        content: "How many r's are in the word 'strawberry'?"
      }
    ],
    stream: true
  });

  let response = "";
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      response += content;
      process.stdout.write(content);
    }

    // Usage information comes in the final chunk
    if (chunk.usage) {
      console.log("\n\n--- Usage Statistics ---");
      console.log("Reasoning tokens:", chunk.usage.reasoningTokens);
      console.log("Prompt tokens:", chunk.usage.promptTokens);
      console.log("Completion tokens:", chunk.usage.completionTokens);
      console.log("Total tokens:", chunk.usage.totalTokens);
    }
  }
} catch (error) {
  console.error("\nExecution failed:", error.message || error);
}
