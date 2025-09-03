import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface LyricsRequest {
  artist: string;
  title: string;
}

export default function useGetLyrics() {
  const [searchParams, setSearchParams] = useState<LyricsRequest | null>(null);

  const {
    data: lyrics,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["get-lyrics", searchParams],
    queryFn: async ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, params] = queryKey as [string, LyricsRequest];
      if (!params?.artist || !params?.title) {
        throw new Error("Artist and title are required");
      }
      const response = await api.get(`/${params.artist}/${params.title}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!searchParams?.artist && !!searchParams?.title,
  });

  const searchLyrics = (params: LyricsRequest) => {
    setSearchParams(params);
  };

  return { lyrics, isLoading, error, refetch, searchLyrics };
}
