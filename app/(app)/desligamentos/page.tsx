"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ClipboardCheck, KeyRound, Laptop, UserMinus } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Button, Card, CardHeader, CardBody, Progress, Modal, Badge } from "@/components/ui";
import { AcaoButton } from "@/components/ui/AcaoButton";
import { TableWrap, THead, Th, TBody, Tr, Td } from "@/components/ui/Table";
import { desligamentos } from "@/lib/mock";
import { data } from "@/lib/format";
import type { Desligamento, EtapaDesligamento } from "@/lib/types";

const ETAPAS: EtapaDesligamento[] = [
  "Solicitação de desligamento", "Aprovação", "Comunicação ao colaborador", "Checklist documental",
  "Devolução de equipamentos", "Revogação de acessos", "Entrevista de desligamento", "Encerramento interno", "Concluído",
];

export default function DesligamentosPage() {
  const [sel, setSel] = useState<Desligamento | null>(null);

  const emAndamento = desligamentos.filter((d) => d.etapa !== "Concluído").length;
  const aprovacao = desligamentos.filter((d) => d.etapa === "Aprovação" || d.etapa === "Solicitação de desligamento").length;
  const pendencias = desligamentos.reduce((a, d) => a + d.pendencias, 0);
  const concluidos = desligamentos.filter((d) => d.etapa === "Concluído").length;

  const progresso = (etapa: EtapaDesligamento) => Math.round(((ETAPAS.indexOf(etapa) + 1) / ETAPAS.length) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Desligamentos e Offboarding"
        description="Organize a saída do colaborador com checklist, devolução de equipamentos e revogação de acessos."
        actions={
          <AcaoButton label="Novo desligamento" size="sm" icon={UserMinus} variant="secondary" titulo="Iniciar desligamento" descricao="Abrir o formulário para iniciar um novo processo de desligamento?" confirmarLabel="Iniciar" />
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Em andamento" value={emAndamento} icon={UserMinus} tone="info" />
        <StatCard label="Aguardando aprovação" value={aprovacao} icon={ClipboardCheck} tone="warning" />
        <StatCard label="Pendências totais" value={pendencias} icon={Laptop} tone="danger" />
        <StatCard label="Concluídos" value={concluidos} icon={CheckCircle2} tone="success" />
      </div>

      <Card>
        <CardHeader title="Pipeline de offboarding" subtitle="Distribuição por etapa" />
        <CardBody>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {ETAPAS.map((etapa) => {
              const n = desligamentos.filter((d) => d.etapa === etapa).length;
              return (
                <div key={etapa} className="min-w-[120px] flex-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                  <div className="text-2xl font-semibold text-brand-900">{n}</div>
                  <div className="mt-0.5 text-xs font-medium text-slate-500">{etapa}</div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <TableWrap>
          <THead>
            <tr>
              <Th>Colaborador</Th>
              <Th>Área / Gestor</Th>
              <Th>Tipo</Th>
              <Th>Data prevista</Th>
              <Th align="center">Pendências</Th>
              <Th>Próxima ação</Th>
              <Th align="right">Ação</Th>
            </tr>
          </THead>
          <TBody>
            {desligamentos.map((d) => (
              <Tr key={d.id}>
                <Td className="font-medium text-brand-900">{d.colaborador}</Td>
                <Td>
                  <div>{d.area}</div>
                  <div className="text-xs text-slate-400">{d.gestor}</div>
                </Td>
                <Td><Badge tone="neutral">{d.tipo}</Badge></Td>
                <Td>{data(d.dataPrevista)}</Td>
                <Td align="center">
                  {d.pendencias > 0 ? <span className="font-medium text-amber-600">{d.pendencias}</span> : <span className="text-emerald-600">0</span>}
                </Td>
                <Td className="text-slate-500">{d.proximaAcao}</Td>
                <Td align="right">
                  <Button variant="subtle" size="sm" onClick={() => setSel(d)}>Detalhes</Button>
                </Td>
              </Tr>
            ))}
          </TBody>
        </TableWrap>
      </div>

      <Modal
        open={sel !== null}
        onClose={() => setSel(null)}
        size="lg"
        title={sel ? `Offboarding · ${sel.colaborador}` : ""}
        description={sel ? `${sel.tipo} · ${sel.area} · saída prevista ${data(sel.dataPrevista)}` : undefined}
      >
        {sel && (
          <div className="space-y-5">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600">Etapa: {sel.etapa}</span>
                <span className="text-slate-400">{progresso(sel.etapa)}%</span>
              </div>
              <Progress value={progresso(sel.etapa)} tone="info" />
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold text-brand-900">Checklist de offboarding</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {sel.checklist.map((item) => (
                  <div key={item.item} className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2 text-sm">
                    {item.concluido ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" /> : <Circle className="h-4 w-4 shrink-0 text-slate-300" />}
                    <span className={item.concluido ? "text-slate-700" : "text-slate-400"}>{item.item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              <AcaoButton label="Recolher equipamentos" size="sm" icon={Laptop} titulo="Recolher equipamentos" descricao={`Registrar a devolução de equipamentos de ${sel.colaborador}?`} confirmarLabel="Registrar" />
              <AcaoButton label="Revogar acessos" size="sm" variant="secondary" icon={KeyRound} titulo="Revogar acessos" descricao={`Revogar todos os acessos de ${sel.colaborador}?`} confirmarLabel="Revogar" />
              <AcaoButton label="Registrar entrevista" size="sm" variant="secondary" titulo="Entrevista de desligamento" descricao={`Registrar a entrevista de saída de ${sel.colaborador}?`} confirmarLabel="Registrar" />
              <AcaoButton label="Concluir processo" size="sm" variant="secondary" icon={CheckCircle2} titulo="Concluir desligamento" descricao={`Encerrar o processo de desligamento de ${sel.colaborador}?`} confirmarLabel="Concluir" />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
