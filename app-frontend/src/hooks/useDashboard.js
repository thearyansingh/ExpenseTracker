"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useDashboard(month, year) {
  return useQuery({
    queryKey: ["dashboard", month, year],
    queryFn: async () => {
      const res = await api.get("/api/dashboard/", {
        params: { month, year },
      });
      return res.data.data;
    },
  });
}
