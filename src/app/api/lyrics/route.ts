import { lyricsAPI } from "@/constants/constants";
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
  const response = await axios.get(
    `${lyricsAPI}/${parseBody.data.artist}/${parseBody.data.title}`
  );

  const lyrics = response.data.lyrics.replace(/\n/g, "<br />");

  return new Response(JSON.stringify({ lyrics }), { status: 200 });
}
