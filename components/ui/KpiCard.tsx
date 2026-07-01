import Link from "next/link";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Tone } from "@/lib/types";
import { CountUp } from "./CountUp";
import { cn } from "@/lib/cn";

const ICON_WRAP: Record<Tone, string> = {
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-tech-50 text-tech-600",
  neutral: "bg-slate-100 text-slate-500",
  brand: "bg-brand-50 text-brand-600",
};

export interface KpiCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  tone?: Tone;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Variação vs período anterior, em %. */
  delta?: number;
  /** Quando true, queda é positiva (ex.: absenteísmo, risco). */
  quedaBoa?: boolean;
  href?: string;
  hint?: string;
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  tone = "info",
  prefix,
  suffix,
  decimals = 0,
  delta,
  quedaBoa,
  href,
  hint,
}: KpiCardProps) {
  const positivo = delta !== undefined && (quedaBoa ? delta < 0 : delta > 0);
  const Trend = delta !== undefined && delta < 0 ? TrendingDown : TrendingUp;

  const inner = (
    <>
      <div className="flex items-start justify-between">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", ICON_WRAP[tone])}>
          <Icon className="h-5 w-5" />
        </span>
        {href && (
          <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-tech-500" />
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-semibold tracking-tight text-brand-900">
          {prefix}
          <CountUp value={value} decimals={decimals} />
          {suffix}
        </div>
        <p className="mt-1 text-sm text-slate-500">{label}</p>
      </div>
      {(delta !== undefined || hint) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-medium",
                positivo ? "text-emerald-600" : "text-red-600",
              )}
            >
              <Trend className="h-3.5 w-3.5" />
              {delta > 0 ? "+" : ""}
              {delta}%
            </span>
          )}
          {hint && <span className="text-slate-400">{hint}</span>}
        </div>
      )}
    </>
  );

  const base =
    "group flex flex-col rounded-[var(--radius-card)] border border-slate-200 bg-white p-5 shadow-sm transition-all";

  if (href) {
    return (
      <Link href={href} className={cn(base, "hover:border-tech-200 hover:shadow-md")}>
        {inner}
      </Link>
    );
  }
  return <div className={base}>{inner}</div>;
}
