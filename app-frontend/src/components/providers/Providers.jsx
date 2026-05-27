"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { getQueryClient } from "@/lib/query-client";
import { OfflineBanner } from "@/components/layout/OfflineBanner";

export function Providers({ children }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OfflineBanner />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            className: "text-sm",
            style: { maxWidth: "90vw" },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
