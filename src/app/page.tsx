"use client";

import FormModal from "@/_components/FormModal";
import NoLyrics from "@/_components/NoLyrics";
import SearchForm from "@/_components/SearchForm";
import { useLyricsVisibility } from "@/hooks/useLyricsVisibility";
import { useLyricsStore } from "@/stores/lyricsStore";
import LyricsColumns from "../_components/LyricsColumns";

export default function Home() {
  const {
    isDesktop,
    originalVisible,
    translatedVisible,
    showOriginal,
    showTranslated,
  } = useLyricsVisibility();

  const { originalLyrics, translatedLyrics } = useLyricsStore();

  return (
    <div className="p-8 md:p-16">
      <div className="flex justify-between">
        <h1 className="text-2xl md:text-5xl mb-12">understand it.</h1>
        {!isDesktop && <FormModal />}
      </div>

      <div className="grid grid-cols-4 gap-8">
        {isDesktop && (
          <div>
            <SearchForm />
          </div>
        )}

        {!isDesktop && (
          <div className="flex gap-4">
            <button
              className={`btn rounded-full ${originalVisible && "bg-accent"}`}
              onClick={showOriginal}
            >
              Original
            </button>
            <button
              className={`btn rounded-full ${translatedVisible && "bg-accent"}`}
              onClick={showTranslated}
            >
              Translated
            </button>
          </div>
        )}

        <div className="col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {originalLyrics && originalVisible && (
            <LyricsColumns lyrics={originalLyrics} />
          )}
          {translatedLyrics && translatedVisible && (
            <LyricsColumns lyrics={translatedLyrics} />
          )}
          {!originalLyrics && !translatedLyrics && <NoLyrics />}
        </div>
      </div>
    </div>
  );
}
