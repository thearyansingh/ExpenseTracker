"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { endOfMonth, startOfMonth } from "date-fns";

/** Aggregate spent per budget for the current calendar month. */
export function useBudgetSpentMap(month, year) {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));

  const query = useQuery({
    queryKey: ["budget-spent", month, year],
    queryFn: async () => {
      const res = await api.get("/api/expenses/", {
        params: {
          page: 1,
          limit: 500,
          startDate: start.toISOString(),
          endDate: end.toISOString(),
          sort: "date",
          order: "desc",
        },
      });
      return res.data.data.expenses;
    },
  });

  const spentMap = useMemo(() => {
    const map = {};
    for (const exp of query.data || []) {
      const id = exp.budgetId?._id || exp.budgetId;
      if (!id) continue;
      map[id] = (map[id] || 0) + exp.amount;
    }
    return map;
  }, [query.data]);

  return { spentMap, isLoading: query.isLoading };
}
