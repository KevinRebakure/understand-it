import llmModal from "@/lib/llm/llm";
import { NextRequest } from "next/server";
import * as z from "zod";

// Existing lyrics schemas
export const LyricsSectionSchema = z.object({
  type: z.enum([
    "intro",
    "chorus",
    "verse",
    "bridge",
    "title",
    "pre-chorus",
    "outro",
  ]),
  content: z.string().min(1, "Content cannot be empty"),
});

export const LyricsSchema = z.array(LyricsSectionSchema);

// Extended schema to include targetLanguage
export const LyricsRequestSchema = z.object({
  lyrics: LyricsSchema,
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

  const translated = await llmModal.translateLyrics(
    parseBody.data,
    body.targetLanguage
  );

  return new Response(translated, { status: 200 });
}
