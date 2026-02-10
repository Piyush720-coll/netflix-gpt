const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const Groq = require("groq-sdk");
require("dotenv").config();

// Limit max instances
setGlobalOptions({ maxInstances: 10 });

// Initialize Groq securely
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Create HTTPS function
exports.getMovieSuggestions = onRequest(async (req, res) => {
  try {
    // Enable CORS (important for React frontend)
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a movie recommendation system.",
        },
        {
          role: "user",
          content: `Suggest 5 movies for the query: "${query}". Only give names comma separated.`,
        },
      ],
      model: "openai/gpt-oss-20b",
    });

    res.json({
      result: completion.choices[0]?.message?.content || "",
    });

  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: error.message });
  }
});
