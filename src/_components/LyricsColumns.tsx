import { MicVocal } from "lucide-react";
import cn from "../app/utils/cn";

type Lyrics = {
  type: "chorus" | "verse" | "bridge" | "title";
  content: string;
};

type LyricsColumnsProps = {
  originalLyrics: Lyrics[];
  translatedLyrics: Lyrics[];
};
function LyricsColumns({
  originalLyrics,
  translatedLyrics,
}: LyricsColumnsProps) {
  return (
    <div className="col-span-3 grid grid-cols-2 w-[1000px] mx-auto gap-12">
      <div className="space-y-16">
        {originalLyrics.length > 0 &&
          originalLyrics.map((lyric, i) => (
            <div key={lyric.type + i}>
              <p
                className={cn(
                  "text-2xl leading-12",
                  lyric.type === "title" && "text-5xl font-bold",
                  lyric.type === "chorus" && "pl-10"
                )}
              >
                {lyric.content}
              </p>
            </div>
          ))}
        {originalLyrics.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <MicVocal size={128} strokeWidth={1} />
            <p className="text-2xl mt-10">Search for a song</p>
          </div>
        )}
      </div>
      <div className="space-y-16">
        {translatedLyrics.map((lyric, i) => (
          <div key={lyric.type + i}>
            <p
              className={cn(
                "text-2xl leading-12",
                lyric.type === "title" && "text-5xl font-bold",
                lyric.type === "chorus" && "pl-10"
              )}
            >
              {lyric.content}
            </p>
          </div>
        ))}
        {translatedLyrics.length === 0 && null}
      </div>
    </div>
  );
}
export default LyricsColumns;
