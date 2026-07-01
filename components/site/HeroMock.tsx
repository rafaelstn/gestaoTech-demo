import { ArrowUpRight, CalendarCheck, FileCheck2, TrendingUp, Users } from "lucide-react";

/** Mockup decorativo do produto para o hero (sem imagens de pessoas). */
export function HeroMock() {
  const kpis = [
    { label: "Headcount", valor: "186", icon: Users, delta: "+2,4%" },
    { label: "Admissões", valor: "8", icon: CalendarCheck, delta: "em andamento" },
    { label: "Documentos", valor: "34", icon: FileCheck2, delta: "a regularizar" },
    { label: "Conformidade", valor: "92%", icon: TrendingUp, delta: "+5 p.p." },
  ];
  const barras = [52, 61, 47, 73, 58, 84];

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-tech-500/10 to-brand-500/5 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-brand-900/10">
        {/* topo da janela */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <span className="ml-3 text-xs font-medium text-slate-400">Gestão Tech RH · Dashboard</span>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tech-50 text-tech-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-300" />
                </div>
                <div className="mt-3 text-xl font-semibold text-brand-900">{k.valor}</div>
                <div className="text-xs text-slate-500">{k.label}</div>
                <div className="mt-1 text-[11px] font-medium text-emerald-600">{k.delta}</div>
              </div>
            );
          })}
        </div>

        {/* mini gráfico */}
        <div className="border-t border-slate-100 px-5 pb-5 pt-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-900">Evolução do headcount</span>
            <span className="text-[11px] text-slate-400">últimos 6 meses</span>
          </div>
          <div className="flex h-24 items-end gap-2">
            {barras.map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-tech-500 to-tech-400" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
