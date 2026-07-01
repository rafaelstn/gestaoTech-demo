import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";

export function EmptyState({
  icon: Icon = SearchX,
  title = "Nenhum resultado encontrado",
  description = "Ajuste os filtros ou o termo de busca para ver mais itens.",
  action,
}: {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-1 text-sm font-semibold text-brand-900">{title}</h3>
      <p className="max-w-xs text-sm text-slate-500">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
