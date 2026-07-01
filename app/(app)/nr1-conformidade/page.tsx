"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  FileWarning,
  Info,
  ShieldAlert,
  ShieldCheck,
  UserX,
  XCircle,
} from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Badge, Button, Card, CardHeader, CardBody, Modal } from "@/components/ui";
import { AcaoButton } from "@/components/ui/AcaoButton";
import { TableWrap, THead, Th, TBody, Tr, Td } from "@/components/ui/Table";
import {
  acoesCorretivas,
  avisoConformidade,
  checklistConformidade,
  obrigacoes,
  treinamentos,
} from "@/lib/mock";
import { data } from "@/lib/format";
import type { AcaoCorretiva, Criticidade, StatusAcaoCorretiva } from "@/lib/types";

const KANBAN: StatusAcaoCorretiva[] = ["Aberta", "Em andamento", "Aguardando evidência", "Em validação", "Concluída"];

const CRIT_TONE: Record<Criticidade, "danger" | "warning" | "neutral"> = {
  Crítica: "danger",
  Alta: "danger",
  Média: "warning",
  Baixa: "neutral",
};

export default function ConformidadePage() {
  const [sel, setSel] = useState<AcaoCorretiva | null>(null);

  const okCount = checklistConformidade.filter((i) => i.ok).length;
  const statusGeral = Math.round((okCount / checklistConformidade.length) * 100);
  const criticas = obrigacoes.filter((o) => o.criticidade === "Crítica").length;
  const treinosVencidos = treinamentos.filter((t) => t.status === "Vencido").length;
  const semEvidencia = obrigacoes.filter((o) => !o.evidencia).length;
  const acoesAbertas = acoesCorretivas.filter((a) => a.status !== "Concluída").length;
  const responsaveisAtraso = obrigacoes.filter((o) => o.status === "Em atraso" || o.responsavel === "Não definido").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="NR-1 e Conformidade"
        description="Apoio à organização de evidências, responsáveis, pendências e ações corretivas de SST."
      />

      {/* Aviso obrigatório */}
      <div className="flex items-start gap-3 rounded-[var(--radius-card)] border border-amber-200 bg-amber-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <p className="text-sm leading-relaxed text-amber-800">{avisoConformidade}</p>
      </div>

      {/* Painel */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Status geral" value={`${statusGeral}%`} icon={ShieldCheck} tone={statusGeral >= 80 ? "success" : "warning"} />
        <StatCard label="Pendências críticas" value={criticas} icon={ShieldAlert} tone="danger" />
        <StatCard label="Treinamentos vencidos" value={treinosVencidos} icon={AlertTriangle} tone="danger" />
        <StatCard label="Docs sem evidência" value={semEvidencia} icon={FileWarning} tone="warning" />
        <StatCard label="Ações corretivas abertas" value={acoesAbertas} icon={ClipboardList} tone="info" />
        <StatCard label="Responsáveis em atraso" value={responsaveisAtraso} icon={UserX} tone="warning" />
      </div>

      {/* Checklist de conformidade */}
      <Card>
        <CardHeader title="Checklist de conformidade" subtitle={`${okCount} de ${checklistConformidade.length} itens organizados · última revisão em 15/06/2026`} />
        <CardBody>
          <div className="grid gap-2 sm:grid-cols-2">
            {checklistConformidade.map((item) => (
              <div key={item.item} className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2.5 text-sm">
                {item.ok ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                )}
                <span className={item.ok ? "text-slate-700" : "font-medium text-red-600"}>{item.item}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Tabela de obrigações */}
      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-brand-900">Obrigações de conformidade</h2>
        <TableWrap>
          <THead>
            <tr>
              <Th>Obrigação</Th>
              <Th>Categoria</Th>
              <Th>Responsável</Th>
              <Th>Prazo</Th>
              <Th>Status</Th>
              <Th align="center">Evidência</Th>
              <Th>Criticidade</Th>
              <Th>Ação recomendada</Th>
            </tr>
          </THead>
          <TBody>
            {obrigacoes.map((o) => (
              <Tr key={o.id}>
                <Td className="max-w-[220px] font-medium text-brand-900">{o.obrigacao}</Td>
                <Td>{o.categoria}</Td>
                <Td className={o.responsavel === "Não definido" ? "text-red-600" : ""}>{o.responsavel}</Td>
                <Td>{data(o.prazo)}</Td>
                <Td><StatusBadge status={o.status} /></Td>
                <Td align="center">
                  {o.evidencia ? <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-500" /> : <XCircle className="mx-auto h-4 w-4 text-red-400" />}
                </Td>
                <Td><Badge tone={CRIT_TONE[o.criticidade]} dot>{o.criticidade}</Badge></Td>
                <Td className="text-slate-500">{o.acaoRecomendada}</Td>
              </Tr>
            ))}
          </TBody>
        </TableWrap>
      </div>

      {/* Kanban de ações corretivas */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-brand-900">Ações corretivas</h2>
          <AcaoButton label="Nova ação corretiva" size="sm" variant="secondary" titulo="Nova ação corretiva" descricao="Abrir o formulário para registrar uma nova ação corretiva?" confirmarLabel="Abrir" />
        </div>
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
          {KANBAN.map((coluna) => {
            const cards = acoesCorretivas.filter((a) => a.status === coluna);
            return (
              <div key={coluna} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">{coluna}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">{cards.length}</span>
                </div>
                <div className="space-y-2">
                  {cards.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setSel(a)}
                      className="w-full rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition-shadow hover:shadow-md"
                    >
                      <p className="text-sm font-medium text-brand-900">{a.descricao}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge tone={CRIT_TONE[a.criticidade]} dot>{a.criticidade}</Badge>
                        <span className="text-xs text-slate-400">{data(a.prazo)}</span>
                      </div>
                    </button>
                  ))}
                  {!cards.length && <p className="px-1 py-2 text-xs text-slate-400">Sem ações</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal ação corretiva */}
      <Modal
        open={sel !== null}
        onClose={() => setSel(null)}
        size="md"
        title={sel ? "Ação corretiva" : ""}
        description={sel?.descricao}
      >
        {sel && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <div className="text-xs text-slate-500">Origem</div>
                <div className="text-sm font-medium text-brand-900">{sel.origem}</div>
              </div>
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <div className="text-xs text-slate-500">Responsável</div>
                <div className="text-sm font-medium text-brand-900">{sel.responsavel}</div>
              </div>
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <div className="text-xs text-slate-500">Prazo</div>
                <div className="text-sm font-medium text-brand-900">{data(sel.prazo)}</div>
              </div>
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <div className="text-xs text-slate-500">Evidências</div>
                <div className="text-sm font-medium text-brand-900">{sel.evidencias} anexo(s)</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={CRIT_TONE[sel.criticidade]} dot>{sel.criticidade}</Badge>
              <StatusBadge status={sel.status} />
            </div>
            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              <AcaoButton label="Anexar evidência" size="sm" titulo="Anexar evidência" descricao="Anexar um documento de evidência a esta ação corretiva?" confirmarLabel="Anexar" />
              <AcaoButton label="Avançar etapa" size="sm" variant="secondary" titulo="Avançar etapa" descricao="Mover esta ação corretiva para a próxima etapa?" confirmarLabel="Avançar" />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
