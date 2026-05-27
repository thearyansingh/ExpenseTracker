import Image from "next/image";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { width: 40, height: 40, className: "h-10 w-10" },
  md: { width: 120, height: 120, className: "h-24 w-auto max-w-[140px]" },
  lg: { width: 240, height: 240, className: "h-auto w-[min(240px,80vw)]" },
};

export function AppLogo({ size = "lg", className, priority = false }) {
  const config = sizes[size] || sizes.lg;

  return (
    <Image
      src="/logo.png"
      alt="Budgie — Track. Manage. Grow."
      width={config.width}
      height={config.height}
      priority={priority}
      className={cn(config.className, className)}
    />
  );
}
