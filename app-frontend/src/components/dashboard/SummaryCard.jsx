import { formatMoney } from "@/lib/format";

export function SummaryCard({ summary, currency }) {
  return (
    <div className="panel rounded-2xl p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-200/55">
        Remaining Balance
      </p>
      <p className="mt-1 text-4xl font-extrabold text-emerald-300">
        {formatMoney(summary.remainingBalance, currency)}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <MetricPill label="Income" value={summary.monthlyIncome} currency={currency} accent="text-emerald-300" />
        <MetricPill label="Budget" value={summary.totalBudget} currency={currency} accent="text-cyan-300" />
        <MetricPill label="Spent" value={summary.totalSpent} currency={currency} accent="text-yellow-300" />
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-emerald-900/60">
        <div
          className="h-full rounded-full bg-emerald-400"
          style={{
            width: `${Math.min(
              100,
              Math.round(
                (summary.totalBudget > 0
                  ? summary.totalSpent / summary.totalBudget
                  : 0) * 100
              )
            )}%`,
          }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-emerald-100/60">
        <span>Budget used</span>
        <span>
          {Math.min(
            100,
            Math.round(
              (summary.totalBudget > 0
                ? summary.totalSpent / summary.totalBudget
                : 0) * 100
            )
          )}
          %
        </span>
      </div>
    </div>
  );
}

function MetricPill({ label, value, currency, accent }) {
  return (
    <div className="rounded-xl border border-emerald-900/60 bg-black/10 p-2.5">
      <p className="text-[10px] uppercase tracking-wide text-emerald-100/45">{label}</p>
      <p className={`mt-1 text-sm font-bold ${accent}`}>
        {formatMoney(value, currency)}
      </p>
    </div>
  );
}
