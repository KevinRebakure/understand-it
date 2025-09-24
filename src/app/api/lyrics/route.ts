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

  const parseBody = LyricsSchema.safeParse(body);

  if (!parseBody.success) {
    return new Response(JSON.stringify(parseBody.error.issues), {
      status: 400,
    });
  }

  try {
    const lyricsResponse = await axios.get(
      `${lyricsAPI}/${parseBody.data.artist}/${parseBody.data.title}`
    );

    const formatted = await llmModal.formatLyrics(lyricsResponse.data.lyrics);

    return new Response(formatted, {
      status: 200,
    });
  } catch (error: any) {
    console.error("Lyrics fetch error:", error.message);

    return new Response(error.message, {
      status: 500,
    });
  }
}
