/**
 * Alternative to the Vercel function: a small standalone Express server.
 * Use this if you're hosting the site on your own VPS, Render, Railway, etc.
 * instead of Vercel.
 *
 * Setup:
 *   npm init -y
 *   npm install express cors dotenv
 *   echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
 *   node express-server.js
 *
 * Then serve index.html/styles.css/script.js/chatbot.js from the same
 * origin (or update CHAT_ENDPOINT in chatbot.js to point at this server's
 * full URL, e.g. https://api.kbsntechnology.co.za/api/chat).
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_FALLBACK = "You are a helpful assistant for a software company.";

app.post("/api/chat", async (req, res) => {
  const { system, messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const trimmedMessages = messages.slice(-12).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 2000),
  }));

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: system || SYSTEM_FALLBACK,
        messages: trimmedMessages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return res.status(502).json({ error: "Upstream chat service error" });
    }

    const data = await response.json();
    const reply = data.content?.find((c) => c.type === "text")?.text || "";
    res.json({ reply });
  } catch (err) {
    console.error("Chat handler error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Chat API running on http://localhost:${PORT}`));
