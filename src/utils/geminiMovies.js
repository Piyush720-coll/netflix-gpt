import { GoogleGenAI } from "@google/genai";
import { GEMINI_KEY } from "./constrains";

const ai = new GoogleGenAI({
  apiKey: GEMINI_KEY, // ✅ pass your API key here
  dangerouslyAllowBrowser: true,

});

export default ai;