"use client";

import { useRef, useState } from "react";
import { formatDate, formatMoney } from "@/lib/format";
import { Trash2 } from "lucide-react";

const SWIPE_THRESHOLD = 80;

export function ExpenseItem({ expense, currency, onDelete }) {
  const [offset, setOffset] = useState(0);
  const startX = useRef(0);
  const swiping = useRef(false);

  const budget = expense.budgetId;
  const budgetName =
    typeof budget === "object" ? budget?.name : "Category";

  function onTouchStart(e) {
    startX.current = e.touches[0].clientX;
    swiping.current = true;
  }

  function onTouchMove(e) {
    if (!swiping.current) return;
    const dx = e.touches[0].clientX - startX.current;
    if (dx < 0) setOffset(Math.max(dx, -120));
  }

  function onTouchEnd() {
    swiping.current = false;
    if (offset < -SWIPE_THRESHOLD) {
      setOffset(-120);
    } else {
      setOffset(0);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div
        className="absolute inset-y-0 right-0 flex w-[120px] items-center justify-center bg-red-500/80"
        aria-hidden
      >
        <button
          type="button"
          onClick={() => onDelete(expense)}
          className="flex h-full w-full items-center justify-center gap-2 text-white"
        >
          <Trash2 className="h-5 w-5" />
          Delete
        </button>
      </div>
      <div
        className="panel relative flex items-center gap-3 rounded-2xl p-4 transition-transform"
        style={{ transform: `translateX(${offset}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
          style={{
            backgroundColor: budget?.color ? `${budget.color}22` : "#3B82F622",
          }}
        >
          {budget?.icon || "💰"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-emerald-50">{budgetName}</p>
          {expense.note && (
            <p className="truncate text-sm text-emerald-100/55">{expense.note}</p>
          )}
          <p className="text-xs text-emerald-100/40">{formatDate(expense.date)}</p>
        </div>
        <p className="shrink-0 text-lg font-bold text-emerald-200">
          {formatMoney(expense.amount, currency)}
        </p>
      </div>
    </div>
  );
}
