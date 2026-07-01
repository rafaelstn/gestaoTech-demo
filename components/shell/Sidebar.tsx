"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-brand-900">
      {/* Header alinhado à topbar */}
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <Link href="/dashboard" onClick={onNavigate}>
          <Logo tone="light" showSignature />
        </Link>
      </div>

      {/* Navegação */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const ativo = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                ativo
                  ? "bg-tech-500/15 font-medium text-white"
                  : "text-brand-100/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className={cn("h-[18px] w-[18px] shrink-0", ativo ? "text-tech-300" : "text-brand-200/60")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/demo"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-brand-100/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LayoutGrid className="h-[18px] w-[18px] text-brand-200/60" />
          Central de demonstração
        </Link>
      </div>
    </div>
  );
}
