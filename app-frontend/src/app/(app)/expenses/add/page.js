"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useBudgets } from "@/hooks/useBudgets";
import { useCreateExpense } from "@/hooks/useExpenses";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AddExpensePage() {
  const router = useRouter();
  const { data: budgets, isLoading } = useBudgets();
  const createExpense = useCreateExpense();

  return (
    <div className="space-y-4 pb-4">
      <header className="flex items-center gap-2">
        <Link
          href="/expenses"
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Back"
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">Add expense</h1>
      </header>

      {isLoading && <Skeleton className="h-64" />}

      {!isLoading && (!budgets || budgets.length === 0) && (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <p className="text-zinc-500">Create a budget category first.</p>
          <Link
            href="/budgets"
            className="mt-3 inline-flex min-h-[44px] items-center rounded-xl bg-emerald-600 px-4 font-semibold text-white"
          >
            Go to budgets
          </Link>
        </div>
      )}

      {budgets?.length > 0 && (
        <ExpenseForm
          budgets={budgets}
          loading={createExpense.isPending}
          onSubmit={async (payload) => {
            await createExpense.mutateAsync(payload);
            router.push("/expenses");
          }}
        />
      )}
    </div>
  );
}
