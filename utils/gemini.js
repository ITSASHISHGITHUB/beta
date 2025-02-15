import axios from "axios";

const API_KEY = "AIzaSyDFQz0a_1AQ8wbhbfVR-fVzc9QQVcxgf3Q";  
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export const fetchGeminiResponse = async (message) => {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: message }] }]
    });

    return response.data.candidates[0]?.content?.parts[0]?.text || "No response from Gemini.";
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return "Error connecting to AI.";
  }
};
