import Link from "next/link";
import {
  AlarmClock,
  ArrowRight,
  CalendarX2,
  CheckCircle2,
  FileWarning,
  FolderX,
  Gauge,
  History,
  Layers,
  Lock,
  MessageSquareWarning,
  Play,
  ShieldCheck,
  Sparkles,
  UserX,
  Workflow,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { HeroMock } from "@/components/site/HeroMock";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/lib/nav";

const dores = [
  { icon: FolderX, titulo: "Documentos espalhados", texto: "Contratos, termos e comprovantes em pastas, e-mails e mensagens soltas." },
  { icon: UserX, titulo: "Admissões manuais", texto: "Checklists no papel, retrabalho e risco de começar sem documentação." },
  { icon: MessageSquareWarning, titulo: "Solicitações sem rastreio", texto: "Pedidos por WhatsApp e e-mail, sem SLA, sem histórico e sem responsável." },
  { icon: History, titulo: "Falta de histórico", texto: "Ninguém sabe o que foi feito, por quem e quando. Auditoria vira caça." },
  { icon: CalendarX2, titulo: "Atrasos em férias e prazos", texto: "Férias vencendo, treinamentos expirados e documentos fora da validade." },
  { icon: FileWarning, titulo: "Difícil comprovar evidências", texto: "Quando cobram conformidade, falta organização de responsáveis e provas." },
];

const solucaoItens = [
  "Centraliza colaboradores, documentos e processos em um só lugar",
  "Automatiza lembretes, contratos, checklists e aberturas de chamado",
  "Dá visibilidade com dashboards e indicadores executivos",
  "Organiza evidências e responsáveis para apoiar a conformidade",
];

const automacoes = [
  "Lembrete automático de documentos pendentes",
  "Alerta de férias próximas do vencimento",
  "Alerta de treinamento obrigatório vencido",
  "Geração automática de contrato e envio para assinatura",
  "Abertura de chamado para pendências",
  "Alerta de SLA vencido e de ação corretiva em atraso",
];

export default function LandingPage() {
  const modulosDestaque = navItems.filter((n) =>
    ["/colaboradores", "/admissao", "/solicitacoes", "/documentos", "/ferias-afastamentos", "/treinamentos", "/desligamentos", "/dashboard", "/nr1-conformidade"].includes(n.href),
  );

  return (
    <div className="bg-white">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-tech-50 px-3 py-1 text-xs font-medium text-tech-700 ring-1 ring-inset ring-tech-600/15">
              <Sparkles className="h-3.5 w-3.5" />
              Uma solução DamaTech
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-brand-900 sm:text-5xl">
              Gestão, automação e conformidade para Recursos Humanos
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              O Gestão Tech RH centraliza processos, documentos, colaboradores, solicitações e
              evidências em uma plataforma simples, profissional e rastreável.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/demo" size="md">
                <Play className="h-4 w-4" />
                Ver demonstração
              </Button>
              <Button href="#agendar" variant="secondary" size="md">
                Agendar apresentação
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Ideal para 30 a 500 colaboradores</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Menos planilhas, mais controle</span>
            </div>
          </div>
          <HeroMock />
        </div>
      </section>

      {/* DORES */}
      <section id="dores" className="border-y border-slate-100 bg-slate-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-900">
              Seu RH ainda depende de planilhas, e-mails e mensagens soltas?
            </h2>
            <p className="mt-3 text-slate-600">
              Esses gargalos custam tempo, geram retrabalho e expõem a empresa a riscos.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dores.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.titulo} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-brand-900">{d.titulo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d.texto}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section id="solucao" className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-tech-600">A solução</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-900">
              Uma central operacional para todo o RH
            </h2>
            <p className="mt-4 text-slate-600">
              O Gestão Tech RH funciona como o sistema operacional do departamento: tudo o que o RH
              faz no dia a dia acontece em um só lugar, com automação, histórico e indicadores.
            </p>
            <ul className="mt-6 space-y-3">
              {solucaoItens.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/dashboard">
                Explorar o sistema
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Layers, t: "Centralização", d: "Colaboradores, documentos e processos unificados." },
              { icon: Workflow, t: "Automação", d: "Lembretes, contratos e chamados no piloto automático." },
              { icon: Gauge, t: "Indicadores", d: "Dashboards executivos para RH e diretoria." },
              { icon: ShieldCheck, t: "Conformidade", d: "Evidências e responsáveis organizados para auditoria." },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tech-50 text-tech-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-semibold text-brand-900">{c.t}</h3>
                  <p className="mt-1 text-sm text-slate-600">{c.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos" className="border-y border-slate-100 bg-slate-50/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-900">
              Módulos que cobrem toda a jornada do colaborador
            </h2>
            <p className="mt-3 text-slate-600">Da vaga ao desligamento, com conformidade em cada etapa.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modulosDestaque.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.href}
                  href={m.href}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-tech-200 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="flex items-center gap-1 font-semibold text-brand-900">
                      {m.cardTitulo}
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-tech-500" />
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{m.descricao}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button href="/demo" variant="secondary">
              Ver todos os módulos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* AUTOMAÇÕES */}
      <section id="automacoes" className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="order-2 lg:order-1 rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-900 to-brand-950 p-8 shadow-xl">
            <div className="space-y-3">
              {automacoes.map((a) => (
                <div key={a} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-inset ring-white/10">
                  <AlarmClock className="h-4 w-4 shrink-0 text-tech-300" />
                  <span className="text-sm text-brand-50">{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-tech-600">Automações inteligentes</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-900">
              O sistema trabalha, o RH decide
            </h2>
            <p className="mt-4 text-slate-600">
              Gatilhos automáticos cuidam do operacional: lembram prazos, geram documentos, abrem
              chamados e escalam o que está atrasado, sem depender da memória de ninguém.
            </p>
            <div className="mt-6">
              <Button href="/configuracoes">
                Ver automações configuradas
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONFORMIDADE / SEGURANÇA */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
            <Lock className="h-6 w-6" />
          </span>
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-brand-900">
            Segurança, LGPD e apoio à conformidade desde a base
          </h2>
          <p className="max-w-2xl text-slate-600">
            Perfis de acesso, logs de auditoria, histórico de alterações e registro de ciência.
            O módulo de NR-1 apoia a organização de evidências, sem substituir a validação de
            profissionais especializados.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="agendar" className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-brand-800 to-tech-700 px-8 py-14 text-center shadow-2xl">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Transforme o RH em uma operação mais organizada, digital e segura
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-50/80">
              Veja como sua empresa pode reduzir planilhas, ganhar controle e profissionalizar cada
              processo de Recursos Humanos.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/demo" variant="secondary" size="md">
                <Play className="h-4 w-4" />
                Ver demonstração
              </Button>
              <Button href="/dashboard" size="md" className="bg-white text-brand-800 hover:bg-brand-50">
                Entrar no sistema
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
