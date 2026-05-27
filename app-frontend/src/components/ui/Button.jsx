import { cn } from "@/lib/utils";

const variants = {
  primary:
    "border border-emerald-500/40 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25 active:bg-emerald-500/30 disabled:opacity-50",
  secondary:
    "border border-emerald-900/70 bg-[#112720] text-emerald-100 hover:bg-[#17342a]",
  danger: "bg-red-500/20 text-red-200 hover:bg-red-500/30 border border-red-500/40",
  ghost: "bg-transparent text-emerald-100/75 hover:bg-emerald-500/10",
};

export function Button({
  children,
  className,
  variant = "primary",
  loading,
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-[44px] w-full items-center justify-center rounded-xl px-4 text-base font-semibold transition-colors disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}
