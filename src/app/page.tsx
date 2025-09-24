"use client";

import lyricsA from "@/constants/lyricsA";
import lyricsB from "@/constants/lyricsB";

import FormModal from "@/_components/FormModal";
import SearchForm from "@/_components/SearchForm";
import { useLyricsVisibility } from "@/hooks/useLyricsVisibility";
import LyricsColumns from "../_components/LyricsColumns";

export default function Home() {
  const { isDesktop, original, translated, showOriginal, showTranslated } =
    useLyricsVisibility();

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl md:text-5xl mb-12">understand it.</h1>
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
              className={`btn rounded-full ${original && "bg-accent"}`}
              onClick={showOriginal}
            >
              Original
            </button>
            <button
              className={`btn rounded-full ${translated && "bg-accent"}`}
              onClick={showTranslated}
            >
              Translated
            </button>
          </div>
        )}

        <div className="col-span-4 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {original && <LyricsColumns lyrics={lyricsA} />}
          {translated && <LyricsColumns lyrics={lyricsB} />}
        </div>
      </div>
    </div>
  );
}
