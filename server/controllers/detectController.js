const axios = require("axios");
const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
require("dotenv").config();

exports.detectImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file uploaded." });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_KEY,
    });

    const image = fs.readFileSync(req.file.path, { encoding: "base64" });
    const apiKey = process.env.ROBO_FLOW;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not set in .env" });
    }

    const response = await axios({
      method: "POST",
      url: "https://serverless.roboflow.com/plants-diseases-detection-and-classification/12",
      params: { api_key: apiKey },
      data: image,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const predictions =
      response.data?.predictions && response.data.predictions.length > 0
        ? JSON.stringify(response.data.predictions, null, 2)
        : "[]";


    const prompt = `You are an expert agricultural assistant. 
You receive the following input from a crop disease detection model:

Input format:
{
"predictions": ${predictions}
}

Your task is to generate a farmer-friendly response in **both English and Nepali**.  
The response must be structured in JSON format like this:

{
"flag":<false (if there is disease else true)>
  "crop": "<crop name>",
  "disease": "<disease name>",
  "confidence": "<percentage>",
  "english": {
    "description": "Simple description of the disease in English.",
    "symptoms": ["List of symptoms in English"],
    "remedies": ["List of remedies in English"],
    "prevention": ["List of prevention tips in English"],
  },
  "nepali": {
    "description": "Simple description of the disease in Nepali.",
    "symptoms": ["List of symptoms in Nepali"],
    "remedies": ["List of remedies in Nepali"],
    "prevention": ["List of prevention tips in Nepali"],
  }
}

Constraints:
- Keep the language very simple and actionable for farmers.
- Do not invent diseases. Only respond based on the 'class' provided.
- Translate carefully into Nepali (use farmer-friendly terms).
`;

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let aiOutput = aiResponse.text;

    aiOutput = aiOutput
      .replace(/```json\n?/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(aiOutput);
    } catch (err) {
      console.error("Failed to parse AI response:", err);
      parsed = { raw: aiOutput };
    }

   return  res.json({
      message: "Image uploaded and detected successfully!",
      result: response.data,
      ai: parsed,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
