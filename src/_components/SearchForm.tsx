"use client";

import axios from "axios";
import { Languages, Music, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  title: string;
  artist: string;
  targetLanguage: string;
};

export default function SearchForm() {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      targetLanguage: "English",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await axios.post("/api/lyrics", data);
    console.log(response.data);
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
        <button className="btn btn-active mt-3 rounded-full">
          Search & Translate
        </button>
      </form>
    </div>
  );
}
