"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  content: React.ReactNode;
}

export function Tabs({ items, initial }: { items: TabItem[]; initial?: string }) {
  const [ativo, setAtivo] = useState(initial ?? items[0]?.id);
  const atual = items.find((i) => i.id === ativo) ?? items[0];

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200">
        {items.map((item) => {
          const Icon = item.icon;
          const on = item.id === ativo;
          return (
            <button
              key={item.id}
              onClick={() => setAtivo(item.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                on
                  ? "border-tech-600 text-tech-700"
                  : "border-transparent text-slate-500 hover:text-brand-800",
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="pt-5">{atual?.content}</div>
    </div>
  );
}
