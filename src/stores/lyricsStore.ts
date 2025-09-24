import { Lyrics } from "@/_components/LyricsColumns";
import { create } from "zustand";

interface LyricsStore {
  // State
  originalLyrics: Lyrics | null;
  translatedLyrics: Lyrics | null;
  loadingOriginalLyrics: boolean;
  loadingTranslatedLyrics: boolean;

  // Actions
  setOriginalLyrics: (lyrics: Lyrics) => void;
  setTranslatedLyrics: (lyrics: Lyrics) => void;
  setLoadingOriginalLyrics: (loading: boolean) => void;
  setLoadingTranslatedLyrics: (loading: boolean) => void;
  clearAll: () => void;
}

export const useLyricsStore = create<LyricsStore>((set) => ({
  // Initial state
  originalLyrics: null,
  translatedLyrics: null,
  loadingOriginalLyrics: false,
  loadingTranslatedLyrics: false,

  // Actions
  setOriginalLyrics: (lyrics) => set({ originalLyrics: lyrics }),

  setTranslatedLyrics: (lyrics) => set({ translatedLyrics: lyrics }),

  setLoadingOriginalLyrics: (loading) =>
    set({ loadingOriginalLyrics: loading }),

  setLoadingTranslatedLyrics: (loading) =>
    set({ loadingTranslatedLyrics: loading }),

  clearAll: () =>
    set({
      originalLyrics: null,
      translatedLyrics: null,
    }),
}));
