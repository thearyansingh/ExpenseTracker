"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useExpenses, useDeleteExpense } from "@/hooks/useExpenses";
import { useBudgets } from "@/hooks/useBudgets";
import { useAuth } from "@/hooks/useAuth";
import { ExpenseItem } from "@/components/expenses/ExpenseItem";
import { Skeleton } from "@/components/ui/Skeleton";
import { getStoredCurrency } from "@/lib/preferences";

export default function ExpensesPage() {
  const { user } = useAuth();
  const currency = getStoredCurrency() || user?.currency || "INR";
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [order, setOrder] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data: budgets } = useBudgets();
  const deleteExpense = useDeleteExpense();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useExpenses({
    search: debouncedSearch,
    budgetId,
    order,
    startDate,
    endDate,
    limit: 15,
  });

  const expenses = data?.pages.flatMap((p) => p.expenses) ?? [];
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || !hasNextPage) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "120px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="space-y-4 pb-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-50">Expenses</h1>
        <Link
          href="/expenses/add"
          className="neon-ring flex h-12 items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 text-sm font-semibold text-emerald-200"
        >
          <Plus className="h-5 w-5" />
          Add
        </Link>
      </header>

      <div className="panel relative rounded-xl">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-100/45" />
        <input
          type="search"
          placeholder="Search notes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-h-[48px] w-full rounded-xl border border-emerald-900/70 bg-[#10261f] py-2 pl-10 pr-4 text-emerald-50 placeholder:text-emerald-100/35"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          type="button"
          onClick={() => setBudgetId("")}
          className={`min-h-[44px] shrink-0 rounded-xl border px-4 text-sm font-medium ${
            !budgetId
              ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-200"
              : "border-emerald-900/60 bg-[#10261f] text-emerald-100/70"
          }`}
        >
          All
        </button>
        {budgets?.map((b) => (
          <button
            key={b._id}
            type="button"
            onClick={() => setBudgetId(b._id)}
            className={`min-h-[44px] shrink-0 rounded-xl border px-4 text-sm font-medium ${
              budgetId === b._id
                ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-200"
                : "border-emerald-900/60 bg-[#10261f] text-emerald-100/70"
            }`}
          >
            {b.icon} {b.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="min-h-[44px] rounded-xl border border-emerald-900/70 bg-[#10261f] px-3 text-emerald-100"
          aria-label="Start date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="min-h-[44px] rounded-xl border border-emerald-900/70 bg-[#10261f] px-3 text-emerald-100"
          aria-label="End date"
        />
      </div>

      <select
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        className="min-h-[44px] w-full rounded-xl border border-emerald-900/70 bg-[#10261f] px-3 text-emerald-100"
        aria-label="Sort order"
      >
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
      </select>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-xl bg-red-50 p-4 text-center dark:bg-red-950">
          <button
            type="button"
            onClick={() => refetch()}
            className="min-h-[44px] rounded-lg bg-red-600 px-4 text-sm font-semibold text-white"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && expenses.length === 0 && (
        <p className="py-8 text-center text-emerald-100/55">No expenses found.</p>
      )}

      <ul className="space-y-3">
        {expenses.map((exp) => (
          <li key={exp._id}>
            <ExpenseItem
              expense={exp}
              currency={currency}
              onDelete={(e) => deleteExpense.mutate(e._id)}
            />
          </li>
        ))}
      </ul>

      <div ref={loadMoreRef} className="h-8">
        {isFetchingNextPage && (
          <p className="text-center text-sm text-emerald-100/45">Loading more…</p>
        )}
      </div>
    </div>
  );
}
