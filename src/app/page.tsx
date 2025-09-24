"use client";

import FormModal from "@/_components/FormModal";
import LyricsLoading from "@/_components/LyricsLoading";
import NoLyrics from "@/_components/NoLyrics";
import SearchForm from "@/_components/SearchForm";
import { docs, rebakure } from "@/constants/constants";
import { useLyricsVisibility } from "@/hooks/useLyricsVisibility";
import { useLyricsStore } from "@/stores/lyricsStore";
import { BookOpen, Globe } from "lucide-react";
import Link from "next/link";
import LyricsColumns from "../_components/LyricsColumns";

export default function Home() {
  const {
    isDesktop,
    originalVisible,
    translatedVisible,
    showOriginal,
    showTranslated,
  } = useLyricsVisibility();

  const {
    originalLyrics,
    translatedLyrics,
    loadingOriginalLyrics,
    loadingTranslatedLyrics,
  } = useLyricsStore();

  return (
    <div className="p-8 md:p-16">
      <div className="flex justify-between">
        <div className="mb-12 flex flex-col gap-1">
          <h1 className="text-2xl md:text-5xl">understand it.</h1>
          <Link
            href={rebakure}
            target="_blank"
            className="flex items-center gap-2 underline"
          >
            <Globe />
            rebakure.com
          </Link>
          <Link
            href={docs}
            target="_blank"
            className="flex items-center gap-2 underline"
          >
            <BookOpen />
            Docs
          </Link>
        </div>
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

        <div className="col-span-4 md:col-span-3 gap-8 grid grid-cols-1 md:grid-cols-2 items-start">
          {/* Original Lyrics - Show based on visibility state */}
          {originalVisible && !loadingOriginalLyrics && originalLyrics && (
            <LyricsColumns lyrics={originalLyrics} />
          )}

          {/* Translated Lyrics - Show based on visibility state */}
          {translatedVisible &&
            !loadingTranslatedLyrics &&
            translatedLyrics && <LyricsColumns lyrics={translatedLyrics} />}

          {/* Loading States */}
          {loadingOriginalLyrics && (
            <LyricsLoading message="Processing original lyrics" />
          )}

          {loadingTranslatedLyrics && (
            <LyricsLoading message="Translating..." />
          )}

          {/* No Lyrics State */}
          {!originalLyrics &&
            !translatedLyrics &&
            !loadingOriginalLyrics &&
            !loadingTranslatedLyrics && <NoLyrics />}
        </div>
      </div>
    </div>
  );
}
