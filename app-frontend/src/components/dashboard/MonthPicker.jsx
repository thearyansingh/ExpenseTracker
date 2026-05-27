"use client";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function MonthPicker({ month, year, onChange }) {
  const years = [year - 1, year, year + 1];

  return (
    <div className="panel space-y-3 rounded-2xl p-3">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {years.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => onChange(month, y)}
            className={`min-h-[42px] shrink-0 rounded-xl border px-4 text-sm font-semibold transition-all ${
              y === year
                ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-300"
                : "border-emerald-900/50 bg-[#10261f] text-emerald-100/70"
            }`}
          >
            {y}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {MONTHS.map((label, i) => {
          const m = i + 1;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange(m, year)}
              className={`min-h-[42px] min-w-[52px] shrink-0 rounded-xl border px-3 text-sm font-semibold transition-all ${
                m === month
                  ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-300"
                  : "border-emerald-900/50 bg-[#10261f] text-emerald-100/70"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
