"use client";

import { Music } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import LyricsColumns from "./_components/LyricsColumns";

type Inputs = {
  search: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className="p-8">
      <h1 className="text-5xl mb-12">understand it.</h1>

      <div className="grid grid-cols-4">
        <div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label className="input">
              <Music size={24} />
              <input
                {...register("search")}
                type="text"
                className="grow"
                placeholder="Search for a song"
              />
            </label>
            <button className="btn btn-active mt-3">Search</button>
          </form>
        </div>

        <LyricsColumns />
      </div>
    </div>
  );
}
