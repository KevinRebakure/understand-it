import { Lyrics } from "@/_components/LyricsColumns";
import { create } from "zustand";

interface LyricsStore {
  // State
  originalLyrics: Lyrics | null;
  translatedLyrics: Lyrics | null;

  // Actions
  setOriginalLyrics: (lyrics: Lyrics) => void;
  setTranslatedLyrics: (lyrics: Lyrics) => void;
  clearAll: () => void;
}

export const useLyricsStore = create<LyricsStore>((set) => ({
  // Initial state
  originalLyrics: null,
  translatedLyrics: null,

  // Actions
  setOriginalLyrics: (lyrics) => set({ originalLyrics: lyrics }),

  setTranslatedLyrics: (lyrics) => set({ translatedLyrics: lyrics }),

  clearAll: () =>
    set({
      originalLyrics: null,
      translatedLyrics: null,
    }),
}));
