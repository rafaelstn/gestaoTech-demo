"use client";

import { CheckCircle2, Clock, FileSignature, FileText, FileX2 } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Badge } from "@/components/ui";
import { AcaoButton } from "@/components/ui/AcaoButton";
import { CrudList, type ColumnDef, type FieldDef, type FiltroDef } from "@/components/data/CrudList";
import { documentos } from "@/lib/mock";
import { data } from "@/lib/format";
import type { Documento } from "@/lib/types";

const TIPOS = [
  "Admissional", "Contrato", "Termo", "Política interna", "Documento pessoal", "Comprovante",
  "Treinamento", "Benefício", "Férias", "Afastamento", "Advertência", "Desligamento", "NR-1", "SST", "Relatório",
];
const STATUS = ["Válido", "Pendente", "Vencido", "Aguardando assinatura", "Aguardando ciência", "Em revisão"];

const columns: ColumnDef<Documento>[] = [
  {
    key: "nome",
    header: "Documento",
    render: (d) => (
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <FileText className="h-4 w-4" />
        </span>
        <div>
          <div className="font-medium text-brand-900">{d.nome}</div>
          <div className="text-xs text-slate-400">{d.tamanho} · {d.colaborador}</div>
        </div>
      </div>
    ),
  },
  { key: "tipo", header: "Tipo", render: (d) => <Badge tone="neutral">{d.tipo}</Badge> },
  { key: "status", header: "Status", render: (d) => <StatusBadge status={d.status} /> },
  { key: "validade", header: "Validade", render: (d) => (d.validade ? data(d.validade) : "—") },
  { key: "atualizadoEm", header: "Atualizado", render: (d) => data(d.atualizadoEm) },
  {
    key: "acoes",
    header: "",
    align: "right",
    render: (d) => (
      <AcaoButton
        label={d.status === "Aguardando assinatura" ? "Assinar" : "Ciência"}
        size="sm"
        variant="subtle"
        titulo={d.status === "Aguardando assinatura" ? "Enviar para assinatura" : "Registrar ciência"}
        descricao={`Confirmar a ação para o documento "${d.nome}"?`}
        confirmarLabel="Confirmar"
      />
    ),
  },
];

const fields: FieldDef[] = [
  { name: "nome", label: "Nome do documento", type: "text", required: true },
  { name: "tipo", label: "Tipo", type: "select", options: TIPOS },
  { name: "colaborador", label: "Colaborador / escopo", type: "text", placeholder: "Nome ou 'Todos'" },
  { name: "status", label: "Status", type: "select", options: STATUS },
  { name: "validade", label: "Validade", type: "date" },
  { name: "tamanho", label: "Tamanho", type: "text", placeholder: "ex.: 240 KB" },
];

const filtros: FiltroDef[] = [
  { key: "tipo", label: "Tipo", options: TIPOS },
  { key: "status", label: "Status", options: STATUS },
];

const template: Omit<Documento, "id"> = {
  nome: "", tipo: "Documento pessoal", colaborador: "", status: "Pendente",
  atualizadoEm: "2026-06-30", validade: null, tamanho: "—", tags: [],
};

export default function DocumentosPage() {
  const total = documentos.length;
  const validos = documentos.filter((d) => d.status === "Válido").length;
  const pendentes = documentos.filter((d) => d.status === "Pendente").length;
  const vencidos = documentos.filter((d) => d.status === "Vencido").length;
  const assinatura = documentos.filter((d) => d.status === "Aguardando assinatura").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documentos e Arquivos"
        description="Centro de gestão documental do RH: validade, status e ciclo de assinatura."
        actions={
          <AcaoButton label="Solicitar documento" variant="secondary" size="sm" icon={FileText} titulo="Solicitar documento" descricao="Abrir a solicitação de um novo documento a um colaborador?" confirmarLabel="Solicitar" />
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Documentos" value={total} icon={FileText} tone="brand" />
        <StatCard label="Válidos" value={validos} icon={CheckCircle2} tone="success" />
        <StatCard label="Pendentes" value={pendentes} icon={Clock} tone="warning" />
        <StatCard label="Vencidos" value={vencidos} icon={FileX2} tone="danger" />
        <StatCard label="Aguardando assinatura" value={assinatura} icon={FileSignature} tone="info" />
      </div>

      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <CrudList<Documento>
          itensIniciais={documentos}
          columns={columns}
          fields={fields}
          filtros={filtros}
          buscaKeys={["nome", "colaborador", "tags"]}
          buscaPlaceholder="Buscar documento, colaborador, tag..."
          entidade="documento"
          template={template}
          prefixoId="doc"
        />
      </div>
    </div>
  );
}
