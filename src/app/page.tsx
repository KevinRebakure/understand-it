import lyricsA from "@/constants/lyricsA";
import lyricsB from "@/constants/lyricsB";

import SearchForm from "@/_components/SearchForm";
import LyricsColumns from "../_components/LyricsColumns";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-5xl mb-12">understand it.</h1>

      <div className="grid grid-cols-4 gap-8">
        <SearchForm />

        <div className="col-span-3 grid grid-cols-2 gap-8">
          <LyricsColumns lyrics={lyricsA} />
          <LyricsColumns lyrics={lyricsB} />
        </div>
      </div>
    </div>
  );
}
