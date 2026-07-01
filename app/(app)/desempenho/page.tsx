"use client";

import { CheckCircle2, ClipboardList, Star, Target, TrendingUp } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Badge, Card, CardHeader, CardBody } from "@/components/ui";
import { CrudList, type ColumnDef, type FieldDef, type FiltroDef } from "@/components/data/CrudList";
import { areas, avaliacoes, cicloAtual } from "@/lib/mock";
import type { Avaliacao } from "@/lib/types";

const STATUS = ["Pendente", "Autoavaliação", "Em avaliação", "Concluída"];
const GESTORES = ["Renata Aquino", "Paulo Tavares", "Cláudia Bernardes", "Sérgio Vasconcelos", "Débora Antunes"];

const columns: ColumnDef<Avaliacao>[] = [
  { key: "colaborador", header: "Colaborador", render: (a) => <span className="font-medium text-brand-900">{a.colaborador}</span> },
  { key: "area", header: "Área" },
  { key: "gestor", header: "Gestor" },
  { key: "ciclo", header: "Ciclo" },
  { key: "status", header: "Status", render: (a) => <StatusBadge status={a.status} /> },
  {
    key: "nota",
    header: "Nota",
    align: "center",
    render: (a) =>
      a.nota !== null ? (
        <span className="inline-flex items-center gap-1 font-semibold text-brand-900">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {a.nota.toFixed(1)}
        </span>
      ) : (
        <span className="text-slate-400">—</span>
      ),
  },
  { key: "pdi", header: "PDI", align: "center", render: (a) => (a.pdi ? <Badge tone="info">Ativo</Badge> : <span className="text-slate-400">—</span>) },
  { key: "proximaAcao", header: "Próxima ação", render: (a) => <span className="text-slate-500">{a.proximaAcao}</span> },
];

const fields: FieldDef[] = [
  { name: "colaborador", label: "Colaborador", type: "text", required: true },
  { name: "area", label: "Área", type: "select", options: areas },
  { name: "gestor", label: "Gestor", type: "select", options: GESTORES },
  { name: "ciclo", label: "Ciclo", type: "text" },
  { name: "status", label: "Status", type: "select", options: STATUS },
  { name: "nota", label: "Nota (0 a 5)", type: "number" },
  { name: "proximaAcao", label: "Próxima ação", type: "text" },
];

const filtros: FiltroDef[] = [
  { key: "status", label: "Status", options: STATUS },
  { key: "area", label: "Área", options: areas },
];

const template: Omit<Avaliacao, "id"> = {
  colaborador: "", area: "Administrativo", gestor: GESTORES[0], ciclo: cicloAtual,
  status: "Pendente", nota: null, pdi: false, proximaAcao: "Iniciar autoavaliação",
};

export default function DesempenhoPage() {
  const pendentes = avaliacoes.filter((a) => a.status === "Pendente").length;
  const concluidas = avaliacoes.filter((a) => a.status === "Concluída").length;
  const notas = avaliacoes.filter((a) => a.nota !== null).map((a) => a.nota as number);
  const media = notas.length ? (notas.reduce((x, y) => x + y, 0) / notas.length).toFixed(1) : "—";
  const pdis = avaliacoes.filter((a) => a.pdi).length;
  const semFeedback = avaliacoes.filter((a) => a.status === "Pendente" || a.status === "Autoavaliação").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Desempenho"
        description="Ciclos de avaliação, feedback contínuo, PDI e histórico de desenvolvimento."
      />

      <Card>
        <CardHeader title={cicloAtual} subtitle="Ciclo de avaliação vigente" action={<Badge tone="info" dot>Em andamento</Badge>} />
        <CardBody>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <StatCard label="Avaliações pendentes" value={pendentes} icon={ClipboardList} tone="warning" />
            <StatCard label="Concluídas" value={concluidas} icon={CheckCircle2} tone="success" />
            <StatCard label="Média geral" value={media} icon={Star} tone="brand" />
            <StatCard label="PDIs ativos" value={pdis} icon={Target} tone="info" />
            <StatCard label="Sem feedback recente" value={semFeedback} icon={TrendingUp} tone="neutral" />
          </div>
        </CardBody>
      </Card>

      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <CrudList<Avaliacao>
          itensIniciais={avaliacoes}
          columns={columns}
          fields={fields}
          filtros={filtros}
          buscaKeys={["colaborador", "gestor"]}
          buscaPlaceholder="Buscar colaborador, gestor..."
          entidade="avaliação"
          entidadeArtigo="a"
          template={template}
          prefixoId="av"
        />
      </div>
    </div>
  );
}
