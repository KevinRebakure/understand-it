import { MicVocal } from "lucide-react";

export default function NoLyrics() {
  return (
    <div className="w-full col-span-4 md:col-span-3 flex flex-col items-center justify-center gap-2">
      <MicVocal size={64} strokeWidth={1} />
      <h1 className="text-3xl font-semibold">Search for lyrics</h1>
      <p>Practice a new language by singing to the songs you love</p>
    </div>
  );
}
