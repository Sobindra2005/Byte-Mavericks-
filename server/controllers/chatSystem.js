const { chatSystemPrompt } = require('../utils/systemprompt');
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

exports.getChatresponse = async (req, res) => {
    try {
        const { input } = req.body;
        console.log("Received input:", input);
        if (!input) {
            console.log("No input provided.");
            return res.status(400).json({ error: "Input is required." });
        }

        const prompt = chatSystemPrompt(input);
        console.log("Generated prompt:", prompt);

        const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "My Next.js App"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
                stream: true,
                temperature: 0.7,
                max_tokens: 2048,
                messages: [
                    { role: "user", content: prompt }
                ]
            })
        });

        if (!upstream.ok || !upstream.body) {
            const text = await upstream.text();
            console.error("Upstream error:", text);
            return res.status(upstream.status || 500).json({ error: text || 'Upstream error' });
        }

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("Transfer-Encoding", "chunked");

        let buffer = '';
        upstream.body.on('data', (chunk) => {
            buffer += chunk.toString();
            let lines = buffer.split("\n");
            buffer = lines.pop(); // Save the last (possibly incomplete) line for next chunk

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith("data:")) continue;
                const data = trimmed.slice(5).trim();
                if (data === "[DONE]") continue;
                try {
                    const json = JSON.parse(data);
                    const delta = json?.choices?.[0]?.delta?.content || '';
                    if (delta) {
                        console.log("Streaming chunk:", delta);
                        res.write(`data: ${delta}\n\n`);
                    }
                } catch (err) {
                    // Don't log here, as incomplete JSON is expected
                }
            }
        });

        upstream.body.on('end', () => {
            res.write('data: [DONE]\n\n');
            res.end();
            console.log("Streaming complete.");
        });

        upstream.body.on('error', (err) => {
            console.error("Streaming error:", err);
            res.end();
        });

    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};