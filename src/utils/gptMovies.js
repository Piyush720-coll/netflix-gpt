import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.REACT_APP_AI_KEY,
  dangerouslyAllowBrowser: true, // required in React
});

export const getGroqChatCompletion = async (userQuery) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a movie recommendation system.",
      },
      {
        role: "user",
        content: `Suggest 5 movies for the query: "${userQuery}". Only give movie names, comma separated.`,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
};
