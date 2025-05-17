import dotenv from "dotenv"
import axios from "axios";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
dotenv.config();
const API_KEY = process.env.GEMINI_API_KEY;
console.log("API key:", API_KEY);


export const gemini = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      contents: [{ parts: [{ text: message }] }]
    });

    const botReply = response.data.candidates[0]?.content?.parts[0]?.text || "Koi reply nahi mila!";
    res.json({ reply: botReply });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Server Error" });
  }
}