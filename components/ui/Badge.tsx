import type { Tone } from "@/lib/types";
import { toneDoStatus } from "@/lib/status";
import { cn } from "@/lib/cn";

const TONE_CLASSES: Record<Tone, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  danger: "bg-red-50 text-red-700 ring-red-600/20",
  info: "bg-tech-50 text-tech-700 ring-tech-600/20",
  neutral: "bg-slate-100 text-slate-600 ring-slate-500/20",
  brand: "bg-brand-50 text-brand-700 ring-brand-600/20",
};

const DOT_CLASSES: Record<Tone, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-tech-500",
  neutral: "bg-slate-400",
  brand: "bg-brand-500",
};

interface BadgeProps {
  children: React.ReactNode;
  /** Tom explícito; se omitido e `status` for texto conhecido, é inferido. */
  tone?: Tone;
  /** Quando true, infere o tom a partir do texto (children string). */
  autoStatus?: boolean;
  dot?: boolean;
  className?: string;
}

export function Badge({ children, tone, autoStatus, dot, className }: BadgeProps) {
  const resolved: Tone =
    tone ?? (autoStatus && typeof children === "string" ? toneDoStatus(children) : "neutral");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap",
        TONE_CLASSES[resolved],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", DOT_CLASSES[resolved])} />}
      {children}
    </span>
  );
}

/** Badge que infere o tom a partir de um valor de status. */
export function StatusBadge({ status, dot = true }: { status: string; dot?: boolean }) {
  return (
    <Badge tone={toneDoStatus(status)} dot={dot}>
      {status}
    </Badge>
  );
}
