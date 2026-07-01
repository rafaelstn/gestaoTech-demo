import type { Tone } from "@/lib/types";
import { cn } from "@/lib/cn";

const BAR: Record<Tone, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-tech-500",
  neutral: "bg-slate-400",
  brand: "bg-brand-500",
};

export function Progress({
  value,
  tone = "info",
  className,
}: {
  /** 0 a 100 */
  value: number;
  tone?: Tone;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}>
      <div className={cn("h-full rounded-full transition-all", BAR[tone])} style={{ width: `${pct}%` }} />
    </div>
  );
}
