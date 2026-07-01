"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, LogOut, Menu, Search, UserCircle2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { notificacoes } from "@/lib/mock";
import { cn } from "@/lib/cn";

const TONE_DOT: Record<string, string> = {
  danger: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-tech-500",
  success: "bg-emerald-500",
  neutral: "bg-slate-400",
  brand: "bg-brand-500",
};

const USUARIO = { nome: "Renata Aquino", papel: "Gestora de RH" };

export function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [openNotif, setOpenNotif] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setOpenNotif(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setOpenUser(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onOpenMenu}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Busca */}
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Buscar colaborador, documento, solicitação..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-brand-900 placeholder:text-slate-400 focus:border-tech-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tech-100"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-1 md:flex-none">
        {/* Notificações */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setOpenNotif((v) => !v)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Notificações"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
              {notificacoes.length}
            </span>
          </button>
          {openNotif && (
            <div className="gt-fade-up absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="text-sm font-semibold text-brand-900">Notificações</span>
                <span className="text-xs text-tech-600">{notificacoes.length} novas</span>
              </div>
              <ul className="max-h-80 divide-y divide-slate-50 overflow-y-auto">
                {notificacoes.map((n) => (
                  <li key={n.id} className="flex gap-3 px-4 py-3 hover:bg-slate-50">
                    <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", TONE_DOT[n.tone])} />
                    <div>
                      <p className="text-sm text-brand-800">{n.texto}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{n.em}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Usuário */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setOpenUser((v) => !v)}
            className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-slate-100"
          >
            <Avatar nome={USUARIO.nome} size="sm" />
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight text-brand-900">{USUARIO.nome}</span>
              <span className="block text-xs leading-tight text-slate-500">{USUARIO.papel}</span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
          </button>
          {openUser && (
            <div className="gt-fade-up absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-brand-900">{USUARIO.nome}</p>
                <p className="text-xs text-slate-500">renata.aquino@grupoalfa.com.br</p>
              </div>
              <div className="py-1">
                <Link
                  href="/configuracoes"
                  onClick={() => setOpenUser(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <UserCircle2 className="h-4 w-4" />
                  Meu perfil
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sair da demonstração
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
