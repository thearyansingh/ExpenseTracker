"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDashboard } from "@/hooks/useDashboard";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { MonthPicker } from "@/components/dashboard/MonthPicker";
import { Skeleton } from "@/components/ui/Skeleton";
import { getStoredCurrency } from "@/lib/preferences";

export default function DashboardPage() {
  const { user } = useAuth();
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const { data, isLoading, isError, refetch, isFetching } = useDashboard(
    month,
    year
  );

  const currency =
    getStoredCurrency() || user?.currency || "INR";

  return (
    <div className="space-y-6 pb-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-100/60">Good morning,</p>
          <h1 className="text-3xl font-bold text-emerald-50">
            {user?.name?.split(" ")[0]} <span className="text-2xl">👋</span>
          </h1>
        </div>
        <Link
          href="/expenses/add"
          className="neon-ring flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
          aria-label="Add expense"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </header>

      <MonthPicker
        month={month}
        year={year}
        onChange={(m, y) => {
          setMonth(m);
          setYear(y);
        }}
      />

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl bg-red-50 p-4 text-center dark:bg-red-950">
          <p className="text-sm text-red-700 dark:text-red-300">
            Could not load dashboard.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-2 min-h-[44px] rounded-lg bg-red-600 px-4 text-sm font-semibold text-white"
          >
            Retry
          </button>
        </div>
      ) : (
        <SummaryCard summary={data.summary} currency={currency} />
      )}

      {isFetching && !isLoading && (
        <p className="text-center text-xs text-emerald-100/50">Updating…</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/budgets"
          className="panel flex min-h-[52px] items-center justify-center rounded-xl font-semibold text-emerald-100"
        >
          Manage budgets
        </Link>
        <Link
          href="/expenses"
          className="neon-ring flex min-h-[52px] items-center justify-center rounded-xl bg-emerald-500/20 font-semibold text-emerald-200"
        >
          View expenses
        </Link>
      </div>
    </div>
  );
}
