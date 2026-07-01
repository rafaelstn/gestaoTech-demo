import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-brand-950 py-12 text-brand-100/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-3 text-sm leading-relaxed text-brand-100/60">
              O sistema operacional do RH para empresas que querem organizar processos, automatizar
              rotinas e crescer com mais controle.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <h4 className="mb-3 font-semibold text-white">Produto</h4>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/demo" className="hover:text-white">Módulos</Link></li>
                <li><Link href="/nr1-conformidade" className="hover:text-white">Conformidade</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-white">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#solucao" className="hover:text-white">Sobre</a></li>
                <li><a href="#automacoes" className="hover:text-white">Automações</a></li>
                <li><Link href="/configuracoes" className="hover:text-white">Segurança e LGPD</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-white">Contato</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Agendar apresentação</a></li>
                <li><a href="#" className="hover:text-white">Falar com especialista</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-brand-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Uma solução DamaTech para gestão, automação e conformidade de Recursos Humanos.</p>
          <p>© 2026 DamaTech. Demonstração com dados fictícios.</p>
        </div>
      </div>
    </footer>
  );
}
