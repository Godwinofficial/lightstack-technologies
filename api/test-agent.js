const LIGHTSTACK_SYSTEM_PROMPT = `You are the official AI assistant for Lightstack Group (lightstackgroup.com). You are knowledgeable, professional, and helpful.

About Lightstack Group:
- Tagline: "Engineering Beyond Code"
- Lightstack designs and engineers websites, mobile apps, and bespoke software systems for ambitious teams worldwide.
- Services: Web Development, Mobile App Development, Bespoke Software Systems, UI/UX Design
- Known for building high-quality digital products for ambitious teams worldwide.
- Based in Zambia, serving clients globally.

Your role:
- Answer questions about Lightstack Group's services, capabilities, and approach.
- Help potential clients understand what Lightstack can do for them.
- Emphasize engineering excellence ("Engineering Beyond Code").
- Keep responses clean, detailed, and structured.`;

export default async function handler(req, res) {
  // Allow cross-origin requests (CORS setup)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Retrieve OpenRouter API Key from Vercel environment variables
  const apiKey = process.env.OPEN_ROUTER_API_KEY;
  if (!apiKey) {
    console.error("[api/test-agent] OPEN_ROUTER_API_KEY is not set in environment.");
    return res.status(500).json({
      error: "Server misconfiguration: OPEN_ROUTER_API_KEY is not set.",
    });
  }

  try {
    let messages = [];

    // Parse messages depending on POST or GET
    if (req.method === "POST") {
      messages = req.body?.messages || [];
    } else {
      // Default query for simple GET requests
      messages = [
        {
          role: "user",
          content: "What is Lightstack Group and what makes it unique?"
        }
      ];
    }

    // Ensure we prepend the system prompt if not present
    if (!messages.some(msg => msg.role === "system")) {
      messages.unshift({ role: "system", content: LIGHTSTACK_SYSTEM_PROMPT });
    }

    console.log(`[api/test-agent] Calling OpenRouter via native fetch. Messages count: ${messages.length}`);

    // Call OpenRouter completions endpoint directly using native fetch
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://lightstackgroup.com",
        "X-Title": "Lightstack AI Assistant",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash:free",
        messages: messages,
        stream: true
      })
    });

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error("[api/test-agent] OpenRouter error response:", errorText);
      return res.status(openRouterResponse.status).json({
        error: `OpenRouter error: ${errorText}`
      });
    }

    // Set headers for plain text streaming
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    const reader = openRouterResponse.body;
    if (!reader) {
      throw new Error("No readable stream in OpenRouter response body.");
    }

    // Stream SSE events and parse chunks robustly
    let buffer = "";
    for await (const chunk of reader) {
      buffer += chunk.toString("utf-8");

      let lineEndIndex;
      while ((lineEndIndex = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, lineEndIndex).trim();
        buffer = buffer.slice(lineEndIndex + 1);

        if (line.startsWith("data: ")) {
          const dataStr = line.slice(6).trim();
          if (dataStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(dataStr);
            
            // Extract text token delta
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              res.write(content);
            }

            // Extract usage metrics (reasoning tokens)
            const reasoning = parsed.usage?.reasoning_tokens || parsed.choices?.[0]?.usage?.reasoning_tokens;
            if (reasoning) {
              res.write(`\n\nReasoning tokens: ${reasoning}`);
            }
          } catch (e) {
            // Keep going if line is split/incomplete
          }
        }
      }
    }

    res.end();
  } catch (error) {
    console.error("[api/test-agent] Error during fetch stream:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message || "Internal streaming error" });
    } else {
      res.write(`\n\n[Error: ${error.message || "Internal streaming error"}]`);
      res.end();
    }
  }
}
