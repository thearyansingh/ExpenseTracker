import { formatMoney } from "@/lib/format";
import { Pencil, Trash2 } from "lucide-react";

export function BudgetCard({ budget, spent = 0, currency, onEdit, onDelete }) {
  const pct = budget.limitAmount
    ? Math.min(100, Math.round((spent / budget.limitAmount) * 100))
    : 0;
  const over = spent > budget.limitAmount;

  return (
    <article className="panel rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-900/60 text-2xl"
          style={{ backgroundColor: `${budget.color}22` }}
          aria-hidden
        >
          {budget.icon || "💰"}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-semibold text-emerald-50">{budget.name}</h3>
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: budget.color || "#3B82F6" }}
              aria-hidden
            />
          </div>
          <p className="mt-1 text-sm text-emerald-100/55">
            {formatMoney(spent, currency)} / {formatMoney(budget.limitAmount, currency)}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-emerald-950/70">
            <div
              className={`h-full rounded-full transition-all ${
                over ? "bg-red-400" : pct >= 80 ? "bg-yellow-400" : "bg-emerald-400"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-1">
          <button
            type="button"
            onClick={() => onEdit(budget)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-emerald-200/80 hover:bg-emerald-500/10"
            aria-label={`Edit ${budget.name}`}
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(budget)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-red-300 hover:bg-red-500/10"
            aria-label={`Delete ${budget.name}`}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
