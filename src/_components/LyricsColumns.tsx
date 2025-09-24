import { useLyricsStore } from "@/stores/lyricsStore";
import cn from "../app/utils/cn";

export type LyricsSection = {
  type:
    | "intro"
    | "chorus"
    | "verse"
    | "bridge"
    | "title"
    | "pre-chorus"
    | "outro";
  content: string;
};

export type Lyrics = LyricsSection[];

type Props = {
  lyrics: Lyrics;
};

function LyricsColumn({ lyrics }: Props) {
  const { loadingOriginalLyrics, loadingTranslatedLyrics } = useLyricsStore();
  return (
    <div>
      <div className="flex flex-col gap-8 md:gap-16">
        {lyrics.map((lyric, i) => (
          <div key={lyric.type + i}>
            <p
              className={cn(
                "text-2xl leading-12",
                lyric.type === "title" && "text-3xl md:text-5xl font-bold",
                lyric.type === "chorus" && "pl-5 md:pl-10 italic"
              )}
            >
              {lyric.content}
            </p>
          </div>
        ))}
      </div>

      {loadingOriginalLyrics && <p>Loading original lyrics...</p>}

      {loadingTranslatedLyrics && <p>Loading translated lyrics...</p>}
    </div>
  );
}

export default LyricsColumn;
