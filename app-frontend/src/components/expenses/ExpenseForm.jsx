"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ExpenseForm({ budgets, onSubmit, loading }) {
  const [budgetId, setBudgetId] = useState(budgets[0]?._id || "");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      budgetId,
      amount: Number(amount),
      note: note.trim() || undefined,
      date: new Date(date).toISOString(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Category</label>
        <div className="grid grid-cols-2 gap-2">
          {budgets.map((b) => (
            <button
              key={b._id}
              type="button"
              onClick={() => setBudgetId(b._id)}
              className={`flex min-h-[48px] items-center gap-2 rounded-xl border px-3 text-left text-sm font-medium transition-colors ${
                budgetId === b._id
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                  : "border-zinc-200 dark:border-zinc-700"
              }`}
            >
              <span>{b.icon}</span>
              <span className="truncate">{b.name}</span>
            </button>
          ))}
        </div>
      </div>
      <Input
        label="Amount"
        type="number"
        inputMode="decimal"
        min={1}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Input
        label="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={200}
      />
      <Button type="submit" loading={loading} disabled={!budgetId}>
        Add expense
      </Button>
    </form>
  );
}
