"use client";

import { HeartHandshake, Users, Wallet } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Badge, Progress } from "@/components/ui";
import { CrudList, type ColumnDef, type FieldDef, type FiltroDef } from "@/components/data/CrudList";
import { beneficios, solicitacoesBeneficio } from "@/lib/mock";
import { data, moeda } from "@/lib/format";
import type { SolicitacaoBeneficio } from "@/lib/types";

const TIPOS = ["Inclusão", "Exclusão", "Alteração"];
const STATUS = ["Ativo", "Pendente", "Inclusão", "Exclusão"];
const NOMES_BENEF = beneficios.map((b) => b.nome);

const columns: ColumnDef<SolicitacaoBeneficio>[] = [
  { key: "colaborador", header: "Colaborador", render: (s) => <span className="font-medium text-brand-900">{s.colaborador}</span> },
  { key: "beneficio", header: "Benefício" },
  { key: "tipo", header: "Tipo", render: (s) => <Badge tone="neutral">{s.tipo}</Badge> },
  { key: "status", header: "Status", render: (s) => <StatusBadge status={s.status} /> },
  { key: "dependentes", header: "Dependentes", align: "center" },
  { key: "documentosPendentes", header: "Docs", align: "center", render: (s) => (s.documentosPendentes > 0 ? <span className="font-medium text-amber-600">{s.documentosPendentes}</span> : <span className="text-emerald-600">ok</span>) },
  { key: "abertaEm", header: "Aberta em", render: (s) => data(s.abertaEm) },
];

const fields: FieldDef[] = [
  { name: "colaborador", label: "Colaborador", type: "text", required: true },
  { name: "beneficio", label: "Benefício", type: "select", options: NOMES_BENEF },
  { name: "tipo", label: "Tipo", type: "select", options: TIPOS },
  { name: "status", label: "Status", type: "select", options: STATUS },
  { name: "dependentes", label: "Dependentes", type: "number" },
];

const filtros: FiltroDef[] = [
  { key: "status", label: "Status", options: STATUS },
  { key: "tipo", label: "Tipo", options: TIPOS },
];

const template: Omit<SolicitacaoBeneficio, "id"> = {
  colaborador: "", beneficio: NOMES_BENEF[0], tipo: "Inclusão", status: "Pendente",
  dependentes: 0, documentosPendentes: 0, abertaEm: "2026-06-30",
};

export default function BeneficiosPage() {
  const custoTotal = beneficios.reduce((a, b) => a + b.custoMensal, 0);
  const totalAtivos = beneficios.reduce((a, b) => a + b.ativos, 0);
  const pendentes = solicitacoesBeneficio.filter((s) => s.status === "Pendente").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Benefícios"
        description="Elegibilidade, inclusões, dependentes, documentos e custo por benefício."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <StatCard label="Benefícios ativos (adesões)" value={totalAtivos} icon={HeartHandshake} tone="success" />
        <StatCard label="Solicitações pendentes" value={pendentes} icon={Users} tone="warning" />
        <StatCard label="Custo mensal total" value={moeda(custoTotal)} icon={Wallet} tone="brand" />
      </div>

      {/* Cards de benefícios */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {beneficios.map((b) => {
          const pct = Math.round((b.ativos / b.elegiveis) * 100);
          return (
            <div key={b.id} className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-brand-900">{b.nome}</h3>
                {b.pendentes > 0 && <Badge tone="warning">{b.pendentes} pend.</Badge>}
              </div>
              <p className="mt-1 text-xs text-slate-500">{b.descricao}</p>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>{b.ativos} de {b.elegiveis} elegíveis</span>
                  <span>{pct}%</span>
                </div>
                <Progress value={pct} tone="info" />
              </div>
              <div className="mt-3 border-t border-slate-100 pt-3 text-sm">
                <span className="text-slate-500">Custo mensal: </span>
                <span className="font-semibold text-brand-900">{moeda(b.custoMensal)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Solicitações de benefício */}
      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-brand-900">Solicitações de benefício</h2>
        <CrudList<SolicitacaoBeneficio>
          itensIniciais={solicitacoesBeneficio}
          columns={columns}
          fields={fields}
          filtros={filtros}
          buscaKeys={["colaborador", "beneficio"]}
          buscaPlaceholder="Buscar colaborador, benefício..."
          entidade="solicitação"
          entidadeArtigo="a"
          template={template}
          prefixoId="sb"
        />
      </div>
    </div>
  );
}
