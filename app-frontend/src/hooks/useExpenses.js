"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "@/lib/utils";

export function useExpenses(filters = {}) {
  const {
    limit = 10,
    search = "",
    budgetId = "",
    sort = "date",
    order = "desc",
    startDate = "",
    endDate = "",
  } = filters;

  return useInfiniteQuery({
    queryKey: ["expenses", { search, budgetId, sort, order, startDate, endDate, limit }],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get("/api/expenses/", {
        params: {
          page: pageParam,
          limit,
          search: search || undefined,
          budgetId: budgetId || undefined,
          sort,
          order,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      });
      return res.data.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
}

export function useCreateExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/api/expenses/createExpense", payload);
      return res.data.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["budget-spent"] });
      if (data?.budgetAlert) {
        const { status, message } = data.budgetAlert;
        if (status === "exceeded") toast.error(message);
        else toast(message, { icon: "⚠️" });
      } else {
        toast.success("Expense added");
      }
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
}

export function useUpdateExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const res = await api.put(`/api/expenses/${id}`, payload);
      return res.data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["budget-spent"] });
      toast.success("Expense updated");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
}

export function useDeleteExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/api/expenses/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["budget-spent"] });
      toast.success("Expense deleted");
    },
    onError: (err) => toast.error(getApiErrorMessage(err)),
  });
}
