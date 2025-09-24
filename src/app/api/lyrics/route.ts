/* eslint-disable @typescript-eslint/no-explicit-any */
import { lyricsAPI } from "@/constants/constants";
import llmModal from "@/lib/llm/llm";
import axios from "axios";
import { NextRequest } from "next/server";
import * as z from "zod";

const LyricsSchema = z.object({
  artist: z.string().min(1, "Artist is required"),
  title: z.string().min(1, "Title is required"),
  targetLanguage: z.string().min(1, "Target language is required"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Step. Parse the body
  const parseBody = LyricsSchema.safeParse(body);

  if (!parseBody.success) {
    return new Response(JSON.stringify(parseBody.error.issues), {
      status: 400,
    });
  }

  // Step. Fetch original lyrics
  try {
    // Fetch original lyrics from external API
    const lyricsResponse = await axios.get(
      `${lyricsAPI}/${parseBody.data.artist}/${parseBody.data.title}`
    );

    const formatted = await llmModal.formatLyrics(lyricsResponse.data.lyrics);

    console.log("🚀 [TYPE]", typeof formatted);

    return new Response(formatted, {
      status: 200,
    });
  } catch (error: any) {
    console.error("Lyrics fetch error:", error.message);

    if (error.response?.status === 502) {
      return new Response(
        JSON.stringify({ error: "Lyrics API returned a bad response (502)." }),
        { status: 502 }
      );
    }

    if (error.code === "ECONNABORTED") {
      return new Response(
        JSON.stringify({ error: "Lyrics API request timed out." }),
        { status: 504 }
      );
    }

    return new Response(JSON.stringify({ error: "Failed to fetch lyrics." }), {
      status: 500,
    });
  }
}
