import { Lyrics } from "@/_components/LyricsColumns";
import { GoogleGenAI } from "@google/genai";
import formatLyrics from "./prompts/format-lyrics";
import translateLyrics from "./prompts/translate-lyrics";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
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
