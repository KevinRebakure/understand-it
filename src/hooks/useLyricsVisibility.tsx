import { useEffect, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

export function useLyricsVisibility() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [originalVisible, setOriginal] = useState(true);
  const [translatedVisible, setTranslated] = useState(true);

  useEffect(() => {
    if (isDesktop) {
      setOriginal(true);
      setTranslated(true);
    } else {
      setOriginal(true);
      setTranslated(false);
    }
  }, [isDesktop]);

  const showOriginal = () => {
    setOriginal(true);
    setTranslated(false);
  };

  const showTranslated = () => {
    setOriginal(false);
    setTranslated(true);
  };

  return {
    isDesktop,
    originalVisible,
    translatedVisible,
    showOriginal,
    showTranslated,
  };
}
