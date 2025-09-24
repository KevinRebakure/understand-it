"use client";

import lyricsA from "@/_components/lyricsA";
import lyricsB from "@/_components/lyricsB";
import { Languages, Music, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import LyricsColumns from "../_components/LyricsColumns";

type Inputs = {
  title: string;
  artist: string;
  targetLanguage: string;
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      targetLanguage: "English",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="p-8">
      <h1 className="text-5xl mb-12">understand it.</h1>

      <div className="grid grid-cols-4 gap-8">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <label className="input">
              <Music size={24} />
              <input
                {...register("title", { required: true })}
                type="text"
                className="grow"
                placeholder="Song name"
              />
            </label>
            <label className="input">
              <User size={24} />
              <input
                {...register("artist", { required: true })}
                type="text"
                className="grow"
                placeholder="Artist"
              />
            </label>
            <label className="input">
              <Languages size={24} />
              <input
                {...register("targetLanguage", { required: true })}
                type="text"
                className="grow"
                placeholder="Target language (e.g., English, Spanish)"
              />
            </label>
            <button className="btn btn-active mt-3">Search & Translate</button>
          </form>
        </div>

        <div className="col-span-3 grid grid-cols-2 gap-8">
          <LyricsColumns lyrics={lyricsA} />
          <LyricsColumns lyrics={lyricsB} />
        </div>
      </div>
    </div>
  );
}
