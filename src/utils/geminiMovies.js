import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCOJrw3g16ZkQJlvlqpWE4PPjGcm4Ew97M", // ✅ pass your API key here
  dangerouslyAllowBrowser: true,

});

export default ai;