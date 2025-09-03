"use client";

import api from "@/lib/axios";
import { Languages, Music, User } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import LyricsColumns from "../_components/LyricsColumns";
import YouTube from "@/_components/YouTube";

// Extend Window interface to include puter
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    puter: any;
  }
}

type Lyrics = {
  type: "chorus" | "verse" | "bridge" | "title";
  content: string;
};

type Inputs = {
  title: string;
  artist: string;
  targetLanguage: string;
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      targetLanguage: "English",
    },
  });

  const [originalLyrics, setOriginalLyrics] = useState<Lyrics[]>([]);
  const [translatedLyrics, setTranslatedLyrics] = useState<Lyrics[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isPuterLoaded, setIsPuterLoaded] = useState(false);

  // Load Puter.js script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.onload = () => {
      setIsPuterLoaded(true);
    };
    script.onerror = () => {
      setError("Failed to load Puter.js");
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const structureLyrics = async (rawLyrics: string, songTitle: string) => {
    if (!isPuterLoaded || !window.puter) {
      throw new Error("Puter.js is not loaded");
    }

    try {
      const prompt = `Please analyze these lyrics and structure them as a JSON array of objects with the following TypeScript type:

type Lyrics = {
  type: "chorus" | "verse" | "bridge" | "title";
  content: string;
};

The song title is "${songTitle}". Please:
1. Add the title as the first object with type "title"
2. Identify verses, choruses, and bridges in the lyrics
3. Each section should be a separate object
4. Return ONLY the JSON array, no additional text or formatting

Raw lyrics:
${rawLyrics}`;

      const response = await window.puter.ai.chat(prompt, {
        model: "gpt-5-nano",
      });

      // Try to parse the JSON response
      try {
        const parsed = JSON.parse(response);
        return Array.isArray(parsed) ? parsed : [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (parseError) {
        // If JSON parsing fails, try to extract JSON from the response
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Could not parse structured lyrics");
      }
    } catch (error) {
      console.error("Structuring error:", error);
      throw new Error("Failed to structure lyrics");
    }
  };

  const translateStructuredLyrics = async (
    lyrics: Lyrics[],
    targetLanguage: string
  ) => {
    if (!isPuterLoaded || !window.puter) {
      throw new Error("Puter.js is not loaded");
    }

    try {
      const prompt = `Please translate this structured lyrics array to ${targetLanguage}. Keep the exact same structure and types, only translate the content. Preserve the poetic meaning and rhythm when possible.

Return ONLY the JSON array, no additional text or formatting:

${JSON.stringify(lyrics, null, 2)}`;

      const response = await window.puter.ai.chat(prompt, {
        model: "gpt-5-nano",
      });

      // Try to parse the JSON response
      try {
        const parsed = JSON.parse(response);
        return Array.isArray(parsed) ? parsed : [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (parseError) {
        // If JSON parsing fails, try to extract JSON from the response
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Could not parse translated lyrics");
      }
    } catch (error) {
      console.error("Translation error:", error);
      throw new Error("Failed to translate structured lyrics");
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setError("");
    setOriginalLyrics([]);
    setTranslatedLyrics([]);

    try {
      // Step 1: Fetch raw lyrics from your API
      const response = await api.get(`/${data.artist}/${data.title}`);
      const rawLyrics = response.data;

      if (!rawLyrics) {
        throw new Error("No lyrics found");
      }

      // Step 2: Structure the original lyrics using AI
      if (isPuterLoaded) {
        try {
          const structuredOriginal = await structureLyrics(
            rawLyrics,
            data.title
          );
          setOriginalLyrics(structuredOriginal);

          // Step 3: Translate the structured lyrics
          if (structuredOriginal.length > 0) {
            const translatedStructured = await translateStructuredLyrics(
              structuredOriginal,
              data.targetLanguage
            );
            setTranslatedLyrics(translatedStructured);
          }
        } catch (aiError) {
          console.error("AI processing failed:", aiError);
          setError("Lyrics fetched successfully, but AI processing failed");
        }
      }
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      setError("Failed to fetch lyrics");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-5xl mb-12">understand it.</h1>

      <div className="grid grid-cols-4 gap-8">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <label className="input">
              <Music size={24} />
              <input
                {...register("title", { required: true })}
                type="text"
                className="grow"
                placeholder="Song name"
              />
            </label>
            <label className="input">
              <User size={24} />
              <input
                {...register("artist", { required: true })}
                type="text"
                className="grow"
                placeholder="Artist"
              />
            </label>
            <label className="input">
              <Languages size={24} />
              <input
                {...register("targetLanguage", { required: true })}
                type="text"
                className="grow"
                placeholder="Target language (e.g., English, Spanish)"
              />
            </label>
            <button
              className="btn btn-active mt-3"
              disabled={isLoading || !isPuterLoaded}
            >
              {isLoading ? "Processing..." : "Search & Translate"}
            </button>
          </form>

          <YouTube />

          {!isPuterLoaded && (
            <p className="text-yellow-600 mt-2">Loading AI service...</p>
          )}

          {error && <p className="text-red-600 mt-2">{error}</p>}

          {/* Debug info */}
          {originalLyrics.length > 0 && (
            <div className="mt-4 p-2 bg-gray-100 rounded text-sm">
              <p>Original: {originalLyrics.length} sections</p>
              <p>Translated: {translatedLyrics.length} sections</p>
            </div>
          )}
        </div>

        <div className="col-span-3">
          {isLoading && <p>Loading...</p>}

          {originalLyrics.length > 0 && !isLoading && (
            <LyricsColumns
              originalLyrics={originalLyrics}
              translatedLyrics={translatedLyrics}
            />
          )}
        </div>
      </div>
    </div>
  );
}
