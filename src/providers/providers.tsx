"use client";
// TODO. Install ReactQueryDevTools

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// AI.<feature>
export default function Providers({ children }: { children: React.ReactNode }) {
  // Create a client instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000, // 1 minute
            retry: 3,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
