"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Languages, Music, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  title: string;
  artist: string;
  targetLanguage: string;
};

export default function SearchForm() {
  // const { setOriginalLyrics, setTranslatedLyrics } = useLyricsStore();

  const lyricsMutation = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await axios.post("/api/lyrics", data);
      return response.data;
    },
  });

  const translateMutation = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await axios.post("/api/translate", data);
      return response.data;
    },
  });

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      targetLanguage: "English",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    lyricsMutation.mutate(data, {
      onSuccess: (data) => {
        console.log("🚀");
        console.log(data);

        translateMutation.mutate(data, {
          onSuccess: (data) => {
            console.log("✅");
            console.log(data);
          },
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col"
      >
        <label className="input w-full">
          <Music size={24} />
          <input
            {...register("title", { required: true })}
            type="text"
            className="grow"
            placeholder="Song name"
          />
        </label>
        <label className="input w-full">
          <User size={24} />
          <input
            {...register("artist", { required: true })}
            type="text"
            className="grow"
            placeholder="Artist"
          />
        </label>
        <label className="input w-full">
          <Languages size={24} />
          <input
            {...register("targetLanguage", { required: true })}
            type="text"
            className="grow"
            placeholder="Target language (e.g., English, Spanish)"
          />
        </label>
        <button
          disabled={lyricsMutation.isPending || translateMutation.isPending}
          className="btn btn-active mt-3 rounded-full"
        >
          {lyricsMutation.isPending && (
            <>
              <span className="loading loading-ring loading-sm"></span>
              <span>Formatting original lyrics ...</span>
            </>
          )}
          {translateMutation.isPending && (
            <>
              <span className="loading loading-ring loading-sm"></span>
              <span>Translating lyrics ...</span>
            </>
          )}
          Search & Translate
        </button>
      </form>
    </div>
  );
}
