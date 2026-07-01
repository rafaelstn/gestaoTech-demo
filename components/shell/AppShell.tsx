"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { cn } from "@/lib/cn";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawer, setDrawer] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Sidebar fixa (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <Sidebar />
      </aside>

      {/* Drawer (mobile/tablet) */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-brand-950/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-64">
            <Sidebar onNavigate={() => setDrawer(false)} />
            <button
              onClick={() => setDrawer(false)}
              className="absolute right-3 top-4 rounded-lg p-1.5 text-white/70 hover:bg-white/10"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className={cn("lg:pl-64")}>
        <Topbar onOpenMenu={() => setDrawer(true)} />
        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
