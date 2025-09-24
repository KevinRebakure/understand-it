"use client";

import { Languages, Music, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  title: string;
  artist: string;
  targetLanguage: string;
};

export default function SearchForm() {
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
  );
}
