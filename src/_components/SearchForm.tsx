"use client";

import { useLyricsStore } from "@/stores/lyricsStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CircleAlert, Languages, Music, User } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Lyrics } from "./LyricsColumns";

type Inputs = {
  title: string;
  artist: string;
  targetLanguage: string;
};

export default function SearchForm() {
  const {
    setOriginalLyrics,
    setTranslatedLyrics,
    setLoadingOriginalLyrics,
    setLoadingTranslatedLyrics,
  } = useLyricsStore();

  const lyricsMutation = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await axios.post<Lyrics>("/api/lyrics", data);
      return response.data;
    },
  });

  const translateMutation = useMutation({
    mutationFn: async (data: Lyrics) => {
      const response = await axios.post<Lyrics>("/api/translate", data);
      return response.data;
    },
  });

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      targetLanguage: "",
      artist: "",
      title: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    lyricsMutation.mutate(data, {
      onSuccess: (data) => {
        setOriginalLyrics(data);

        translateMutation.mutate(data, {
          onSuccess: (data) => {
            setTranslatedLyrics(data);
          },
          onError: (error) => {
            console.error(error);
            toast.error("Failed to translate lyrics!");
          },
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error("Failed to process original lyrics!");
      },
    });
  };

  useEffect(() => {
    setLoadingOriginalLyrics(lyricsMutation.isPending);
    setLoadingTranslatedLyrics(translateMutation.isPending);
  }, [
    lyricsMutation.isPending,
    setLoadingOriginalLyrics,
    setLoadingTranslatedLyrics,
    translateMutation.isPending,
  ]);

  return (
    <>
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
          <div role="alert" className="alert alert-warning">
            <CircleAlert />
            <span>
              Write the title of the song and the name of the artist exactly as
              it is, or otherwise it will fail.
            </span>
          </div>
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
            {!lyricsMutation.isPending &&
              !translateMutation.isPending &&
              "Search & Translate"}
          </button>
        </form>
      </div>

      <Toaster />
    </>
  );
}
