import { cn } from "@/lib/utils";

export function Input({ label, error, className, id, ...props }) {
  const inputId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-emerald-100/75">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "min-h-[48px] w-full rounded-xl border border-emerald-900/70 bg-[#10261f] px-4 text-base text-emerald-50 placeholder:text-emerald-100/35 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
          className
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
