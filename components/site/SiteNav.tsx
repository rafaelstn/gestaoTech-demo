import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <Logo showSignature />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <a href="#dores" className="hover:text-brand-800">Desafios</a>
          <a href="#solucao" className="hover:text-brand-800">Solução</a>
          <a href="#modulos" className="hover:text-brand-800">Módulos</a>
          <a href="#automacoes" className="hover:text-brand-800">Automações</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/demo" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Ver demonstração
          </Button>
          <Button href="/dashboard" size="sm">
            Entrar no sistema
          </Button>
        </div>
      </div>
    </header>
  );
}
