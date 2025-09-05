const { cropSuggestionSystemPrompt } = require("../utils/systemprompt.js");
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINIAPIKEY;

exports.getCropSuggestion = async (req, res) => {
    try {
        const { location } = req.body;
        if (!location) {
            return res.status(400).json({ error: "Location is required." });
        }

        const prompt = cropSuggestionSystemPrompt(location);

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
            return res.status(500).json({ error: "Failed to fetch from Gemini API." });
        }

        const geminiData = await geminiRes.json();
        // Extract the model's response text
        const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

        // Try to extract JSON from the text (in case Gemini adds extra text)
        let jsonString = text;
        // Remove code fences if present
        if (jsonString.startsWith("```json")) {
            jsonString = jsonString.replace(/^```json/, '').replace(/```$/, '').trim();
        } else if (jsonString.startsWith("```")) {
            jsonString = jsonString.replace(/^```/, '').replace(/```$/, '').trim();
        }
        // Find the first JSON object in the string
        const match = jsonString.match(/\{[\s\S]*\}/);
        if (!match) {
            return res.status(500).json({ error: "No JSON object found in AI response.", raw: text });
        }

        try {
            const parsed = JSON.parse(match[0]);
            return res.json(parsed);
        } catch (err) {
            return res.status(500).json({ error: "Failed to parse JSON from AI response.", raw: text });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
};