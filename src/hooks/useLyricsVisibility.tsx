import { useEffect, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

export function useLyricsVisibility() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [original, setOriginal] = useState(true);
  const [translated, setTranslated] = useState(true);

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
    original,
    translated,
    showOriginal,
    showTranslated,
  };
}
