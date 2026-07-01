"use client";

import { Award, GraduationCap, TriangleAlert, Users } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Badge, Progress } from "@/components/ui";
import { CrudList, type ColumnDef, type FieldDef, type FiltroDef } from "@/components/data/CrudList";
import { treinamentos } from "@/lib/mock";
import { data } from "@/lib/format";
import type { Treinamento } from "@/lib/types";

const STATUS = ["Ativo", "Concluído", "Vencido", "Agendado"];
const RESP = ["Ana Paula Martins", "Letícia Almeida", "Renata Aquino", "Rafael Moreira", "Débora Antunes"];

const columns: ColumnDef<Treinamento>[] = [
  { key: "nome", header: "Treinamento", render: (t) => (
    <div className="flex items-center gap-2">
      <span className="font-medium text-brand-900">{t.nome}</span>
      {t.obrigatorio && <Badge tone="info">Obrigatório</Badge>}
    </div>
  ) },
  { key: "publicoAlvo", header: "Público-alvo" },
  { key: "cargaHoraria", header: "Carga", align: "center", render: (t) => `${t.cargaHoraria}h` },
  { key: "status", header: "Status", render: (t) => <StatusBadge status={t.status} /> },
  {
    key: "progresso",
    header: "Conclusão",
    render: (t) => {
      const pct = t.matriculados ? Math.round((t.concluidos / t.matriculados) * 100) : 0;
      return (
        <div className="w-36">
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>{t.concluidos}/{t.matriculados}</span>
            <span>{pct}%</span>
          </div>
          <Progress value={pct} tone={pct >= 90 ? "success" : pct >= 70 ? "info" : "warning"} />
        </div>
      );
    },
  },
  { key: "proximoVencimento", header: "Validade", render: (t) => (t.proximoVencimento ? data(t.proximoVencimento) : "—") },
  { key: "responsavel", header: "Responsável" },
];

const fields: FieldDef[] = [
  { name: "nome", label: "Nome do treinamento", type: "text", required: true },
  { name: "publicoAlvo", label: "Público-alvo", type: "text", required: true },
  { name: "cargaHoraria", label: "Carga horária (h)", type: "number" },
  { name: "validadeMeses", label: "Validade (meses)", type: "number" },
  { name: "status", label: "Status", type: "select", options: STATUS },
  { name: "responsavel", label: "Responsável", type: "select", options: RESP },
];

const filtros: FiltroDef[] = [{ key: "status", label: "Status", options: STATUS }];

const template: Omit<Treinamento, "id"> = {
  nome: "", publicoAlvo: "", cargaHoraria: 2, obrigatorio: false, validadeMeses: 12,
  status: "Agendado", matriculados: 0, concluidos: 0, responsavel: RESP[0], proximoVencimento: null,
};

export default function TreinamentosPage() {
  const ativos = treinamentos.filter((t) => t.status === "Ativo").length;
  const matriculados = treinamentos.reduce((a, t) => a + t.matriculados, 0);
  const certificados = treinamentos.reduce((a, t) => a + t.concluidos, 0);
  const vencidos = treinamentos.filter((t) => t.status === "Vencido").length;
  const obrigatoriosPendentes = treinamentos.filter((t) => t.obrigatorio && t.matriculados > t.concluidos).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Treinamentos"
        description="Trilhas internas, obrigatórias e de integração com controle de validade."
      />

      {vencidos > 0 && (
        <div className="flex items-start gap-3 rounded-[var(--radius-card)] border border-red-200 bg-red-50 p-4">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm text-red-700">
            <strong>{vencidos} treinamentos obrigatórios estão vencidos.</strong> Reagende as turmas
            para regularizar a conformidade e evitar pendências de SST.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Treinamentos ativos" value={ativos} icon={GraduationCap} tone="info" />
        <StatCard label="Matriculados" value={matriculados} icon={Users} tone="brand" />
        <StatCard label="Certificados emitidos" value={certificados} icon={Award} tone="success" />
        <StatCard label="Vencidos" value={vencidos} icon={TriangleAlert} tone="danger" />
        <StatCard label="Obrigatórios pendentes" value={obrigatoriosPendentes} icon={TriangleAlert} tone="warning" />
      </div>

      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <CrudList<Treinamento>
          itensIniciais={treinamentos}
          columns={columns}
          fields={fields}
          filtros={filtros}
          buscaKeys={["nome", "publicoAlvo", "responsavel"]}
          buscaPlaceholder="Buscar treinamento, público..."
          entidade="treinamento"
          template={template}
          prefixoId="t"
        />
      </div>
    </div>
  );
}
