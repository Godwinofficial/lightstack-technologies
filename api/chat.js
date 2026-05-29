export default async function handler(req, res) {
  // Allow cross-origin requests (belt-and-suspenders for production)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPEN_ROUTER_API_KEY;
  if (!apiKey) {
    console.error("[api/chat] OPEN_ROUTER_API_KEY is not set.");
    return res.status(500).json({
      error: "Server misconfiguration: API key not set.",
    });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://lightstackgroup.com",
          "X-Title": "Lightstack AI Assistant",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Forward OpenRouter's actual error status so the frontend can handle it
      console.error("[api/chat] OpenRouter error:", response.status, data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("[api/chat] Unexpected error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
