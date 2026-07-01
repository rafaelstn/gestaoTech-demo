"use client";

import { Activity, CalendarCheck, CalendarClock, CalendarDays, Plane, RotateCcw } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Card, CardHeader, CardBody } from "@/components/ui";
import { CrudList, type ColumnDef, type FieldDef, type FiltroDef } from "@/components/data/CrudList";
import { ausencias } from "@/lib/mock";
import { data, dataCurta } from "@/lib/format";
import type { Ausencia } from "@/lib/types";

const TIPOS = ["Férias", "Afastamento médico", "Licença", "Ausência justificada", "Banco de horas", "Folga", "Retorno ao trabalho"];
const STATUS = ["Agendada", "Aguardando aprovação", "Aprovada", "Em andamento", "Concluída", "Vence em breve"];
const GESTORES = ["Renata Aquino", "Paulo Tavares", "Cláudia Bernardes", "Sérgio Vasconcelos", "Débora Antunes"];

const columns: ColumnDef<Ausencia>[] = [
  { key: "colaborador", header: "Colaborador", render: (a) => <span className="font-medium text-brand-900">{a.colaborador}</span> },
  { key: "tipo", header: "Tipo" },
  { key: "periodo", header: "Período", render: (a) => `${data(a.inicio)} — ${data(a.fim)}` },
  { key: "status", header: "Status", render: (a) => <StatusBadge status={a.status} /> },
  { key: "gestorAprovador", header: "Aprovador" },
  { key: "acaoRecomendada", header: "Ação recomendada", render: (a) => <span className="text-slate-500">{a.acaoRecomendada}</span> },
];

const fields: FieldDef[] = [
  { name: "colaborador", label: "Colaborador", type: "text", required: true },
  { name: "tipo", label: "Tipo", type: "select", options: TIPOS },
  { name: "inicio", label: "Início", type: "date", required: true },
  { name: "fim", label: "Fim", type: "date", required: true },
  { name: "status", label: "Status", type: "select", options: STATUS },
  { name: "gestorAprovador", label: "Gestor aprovador", type: "select", options: GESTORES },
  { name: "observacoes", label: "Observações", type: "textarea" },
];

const filtros: FiltroDef[] = [
  { key: "tipo", label: "Tipo", options: TIPOS },
  { key: "status", label: "Status", options: STATUS },
];

const template: Omit<Ausencia, "id"> = {
  colaborador: "", area: "Administrativo", tipo: "Férias", inicio: "2026-07-01", fim: "2026-07-15",
  status: "Aguardando aprovação", gestorAprovador: GESTORES[0], documentos: 0, observacoes: "", acaoRecomendada: "Cobrar aprovação do gestor",
};

export default function FeriasPage() {
  const agendadas = ausencias.filter((a) => a.status === "Agendada" || a.status === "Aprovada").length;
  const aguardando = ausencias.filter((a) => a.status === "Aguardando aprovação").length;
  const vencendo = ausencias.filter((a) => a.status === "Vence em breve").length;
  const afastamentos = ausencias.filter((a) => a.tipo === "Afastamento médico" || a.tipo === "Licença").length;

  const agenda = [...ausencias].sort((a, b) => a.inicio.localeCompare(b.inicio)).slice(0, 6);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Férias e Afastamentos"
        description="Controle de férias, licenças, afastamentos e retornos ao trabalho."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Férias agendadas" value={agendadas} icon={CalendarCheck} tone="success" />
        <StatCard label="Aguardando aprovação" value={aguardando} icon={CalendarClock} tone="warning" />
        <StatCard label="Próximas do vencimento" value={vencendo} icon={Plane} tone="danger" />
        <StatCard label="Afastamentos ativos" value={afastamentos} icon={Activity} tone="info" />
      </div>

      {/* Agenda visual simples */}
      <Card>
        <CardHeader title="Agenda de ausências" subtitle="Próximos períodos programados" />
        <CardBody className="space-y-2.5">
          {agenda.map((a) => (
            <div key={a.id} className="flex items-center gap-4">
              <div className="flex w-24 shrink-0 items-center gap-2 text-xs font-medium text-slate-500">
                <CalendarDays className="h-3.5 w-3.5 text-tech-500" />
                {dataCurta(a.inicio)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-brand-900">{a.colaborador}</span>
                  <StatusBadge status={a.status} dot={false} />
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-gradient-to-r from-tech-400 to-tech-500" />
                <div className="mt-1 text-xs text-slate-400">{a.tipo} · {data(a.inicio)} a {data(a.fim)}</div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <CrudList<Ausencia>
          itensIniciais={ausencias}
          columns={columns}
          fields={fields}
          filtros={filtros}
          buscaKeys={["colaborador", "tipo", "gestorAprovador"]}
          buscaPlaceholder="Buscar por colaborador, tipo..."
          entidade="registro"
          entidadeArtigo="o"
          template={template}
          prefixoId="au"
        />
      </div>
    </div>
  );
}
