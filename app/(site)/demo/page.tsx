import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/Button";
import { navItems, type NavItem } from "@/lib/nav";

const GRUPOS: NavItem["grupo"][] = ["Operação", "Pessoas", "Conformidade", "Configuração"];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-tech-50 px-3 py-1 text-xs font-medium text-tech-700 ring-1 ring-inset ring-tech-600/15">
            <Play className="h-3.5 w-3.5" />
            Central de demonstração
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-900">
            Explore cada módulo do Gestão Tech RH
          </h1>
          <p className="mt-3 text-slate-600">
            Dados fictícios do <strong className="font-semibold text-brand-800">Grupo Alfa Serviços</strong>.
            Navegue livremente: tudo é clicável e simula a operação real do RH.
          </p>
          <div className="mt-6">
            <Button href="/dashboard">
              Começar pelo dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {GRUPOS.map((grupo) => {
          const itens = navItems.filter((n) => n.grupo === grupo);
          if (!itens.length) return null;
          return (
            <div key={grupo} className="mt-12">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">{grupo}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {itens.map((m) => {
                  const Icon = m.icon;
                  return (
                    <Link
                      key={m.href}
                      href={m.href}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-tech-200 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-tech-50 group-hover:text-tech-600">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="h-2 w-2 rounded-full bg-emerald-400" title="Módulo ativo" />
                      </div>
                      <h3 className="mt-4 font-semibold text-brand-900">{m.cardTitulo}</h3>
                      <p className="mt-1 flex-1 text-sm text-slate-600">{m.descricao}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-tech-600">
                        Acessar módulo
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <SiteFooter />
    </div>
  );
}
