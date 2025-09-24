import { Lyrics } from "@/_components/LyricsColumns";
import { geminiAPIKey } from "@/constants/constants";
import { GoogleGenAI } from "@google/genai";
import formatLyrics from "./prompts/format-lyrics";
import translateLyrics from "./prompts/translate-lyrics";

const ai = new GoogleGenAI({
  apiKey: geminiAPIKey,
});

const llmModal = {
  async formatLyrics(lyrics: string) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: lyrics,
      config: {
        systemInstruction: {
          text: formatLyrics,
        },
      },
    });

    return response.text;
  },

  async translateLyrics(lyrics: Lyrics, targetLanguage: string) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: JSON.stringify(lyrics),
      config: {
        systemInstruction: {
          text: translateLyrics.replace("{{targetLanguage}}", targetLanguage),
        },
      },
    });

    return response.text;
  },
};

export default llmModal;
