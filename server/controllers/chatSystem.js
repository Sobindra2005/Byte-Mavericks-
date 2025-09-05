const { chatSystemPrompt } = require('../utils/systemprompt');

require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINIAPIKEY;

exports.getChatresponse = async (req, res) => {
    try {
        const { input } = req.body;
        if (!input) {
            return res.status(400).json({ error: "Input is required." });
        }

        const prompt = chatSystemPrompt(input);

        const geminiRes = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    { role: "user", parts: [{ text: prompt }] }
                ]
            })
        });

        if (!geminiRes.ok) {
            const errorText = await geminiRes.text();
            return res.status(500).json({ error: "Failed to fetch from Gemini API.", details: errorText });
        }

        const data = await geminiRes.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return res.status(500).json({ error: "No response from AI." });
        }

        let cleanText = text;
        if (cleanText.startsWith("```")) {
            cleanText = cleanText.replace(/^```[a-z]*\n?/i, '').replace(/```$/, '').trim();
        }

        return res.json({ response: cleanText });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
};