import type { LucideIcon } from "lucide-react";
import type { Tone } from "@/lib/types";
import { cn } from "@/lib/cn";

const ICON: Record<Tone, string> = {
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-tech-50 text-tech-600",
  neutral: "bg-slate-100 text-slate-500",
  brand: "bg-brand-50 text-brand-600",
};

/** Card compacto de resumo (topo de módulo). Menor que o KpiCard do dashboard. */
export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "neutral",
  hint,
}: {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  tone?: Tone;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {Icon && (
        <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", ICON[tone])}>
          <Icon className="h-5 w-5" />
        </span>
      )}
      <div className="min-w-0">
        <div className="text-xl font-semibold text-brand-900">{value}</div>
        <div className="truncate text-xs text-slate-500">{label}</div>
        {hint && <div className="text-[11px] text-slate-400">{hint}</div>}
      </div>
    </div>
  );
}
