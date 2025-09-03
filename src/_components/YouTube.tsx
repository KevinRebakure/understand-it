"use client";
import { Youtube } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactPlayer from "react-player";

function YouTube() {
  const [url, setUrl] = useState("");

  const { register, handleSubmit, reset } = useForm<{
    url: string;
  }>();
  const onSubmit: SubmitHandler<{ url: string }> = async (data) => {
    setUrl(data.url);
    reset();
    console.log(data);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <label className="input">
          <Youtube size={24} />
          <input
            {...register("url", { required: true })}
            type="text"
            className="grow"
            placeholder="Target language (e.g., English, Spanish)"
          />
        </label>
        <button className="btn btn-active mt-3">Play</button>
      </form>
      <ReactPlayer
        src={url || "https://youtu.be/JGwWNGJdvx8"}
        className="mt-4"
      />
    </div>
  );
}

export default YouTube;
