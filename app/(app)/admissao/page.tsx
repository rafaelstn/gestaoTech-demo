"use client";

import { useState } from "react";
import { CheckCircle2, Circle, FileSignature, FileText, Stethoscope, UserPlus, Users } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Button, Card, CardHeader, CardBody, Progress, Modal } from "@/components/ui";
import { AcaoButton } from "@/components/ui/AcaoButton";
import { TableWrap, THead, Th, TBody, Tr, Td } from "@/components/ui/Table";
import { admissoes } from "@/lib/mock";
import { data } from "@/lib/format";
import type { Admissao, EtapaAdmissao } from "@/lib/types";

const ETAPAS: EtapaAdmissao[] = [
  "Dados pessoais", "Documentos enviados", "Validação do RH", "Contrato gerado",
  "Assinatura pendente", "Exame admissional", "Onboarding liberado", "Colaborador ativo",
];

export default function AdmissaoPage() {
  const [sel, setSel] = useState<Admissao | null>(null);

  const emAndamento = admissoes.filter((a) => a.etapa !== "Colaborador ativo").length;
  const validacao = admissoes.filter((a) => a.documentosPendentes > 0).length;
  const assinatura = admissoes.filter((a) => a.etapa === "Assinatura pendente").length;
  const onboarding = admissoes.filter((a) => a.etapa === "Onboarding liberado").length;

  const progresso = (etapa: EtapaAdmissao) => Math.round(((ETAPAS.indexOf(etapa) + 1) / ETAPAS.length) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admissão Digital"
        description="Do candidato aprovado ao colaborador ativo, com pipeline e checklist rastreáveis."
        actions={
          <AcaoButton label="Nova admissão" size="sm" icon={UserPlus} titulo="Iniciar nova admissão" descricao="Abrir o formulário para iniciar uma nova admissão digital?" confirmarLabel="Iniciar" />
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Em andamento" value={emAndamento} icon={Users} tone="info" />
        <StatCard label="Aguardando validação" value={validacao} icon={FileText} tone="warning" />
        <StatCard label="Aguardando assinatura" value={assinatura} icon={FileSignature} tone="info" />
        <StatCard label="Onboarding liberado" value={onboarding} icon={CheckCircle2} tone="success" />
      </div>

      {/* Pipeline */}
      <Card>
        <CardHeader title="Pipeline de admissão" subtitle="Distribuição por etapa" />
        <CardBody>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {ETAPAS.map((etapa) => {
              const n = admissoes.filter((a) => a.etapa === etapa).length;
              return (
                <div key={etapa} className="min-w-[130px] flex-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                  <div className="text-2xl font-semibold text-brand-900">{n}</div>
                  <div className="mt-0.5 text-xs font-medium text-slate-500">{etapa}</div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Tabela */}
      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <TableWrap>
          <THead>
            <tr>
              <Th>Candidato</Th>
              <Th>Cargo / Área</Th>
              <Th>Início previsto</Th>
              <Th>Etapa</Th>
              <Th align="center">Docs</Th>
              <Th>Responsável</Th>
              <Th align="right">Ação</Th>
            </tr>
          </THead>
          <TBody>
            {admissoes.map((a) => (
              <Tr key={a.id}>
                <Td className="font-medium text-brand-900">{a.nome}</Td>
                <Td>
                  <div>{a.cargo}</div>
                  <div className="text-xs text-slate-400">{a.area} · {a.unidade}</div>
                </Td>
                <Td>{data(a.inicioPrevisto)}</Td>
                <Td><StatusBadge status={a.etapa === "Colaborador ativo" ? "Ativo" : a.etapa === "Onboarding liberado" ? "Aprovada" : "Em andamento"} dot={false} /></Td>
                <Td align="center">
                  {a.documentosPendentes > 0 ? (
                    <span className="font-medium text-amber-600">{a.documentosPendentes}</span>
                  ) : (
                    <span className="text-emerald-600">ok</span>
                  )}
                </Td>
                <Td>{a.responsavel}</Td>
                <Td align="right">
                  <Button variant="subtle" size="sm" onClick={() => setSel(a)}>Detalhes</Button>
                </Td>
              </Tr>
            ))}
          </TBody>
        </TableWrap>
      </div>

      {/* Modal detalhe/checklist */}
      <Modal
        open={sel !== null}
        onClose={() => setSel(null)}
        size="lg"
        title={sel ? `Admissão · ${sel.nome}` : ""}
        description={sel ? `${sel.cargo} · ${sel.area} · início ${data(sel.inicioPrevisto)}` : undefined}
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
              <h4 className="mb-2 text-sm font-semibold text-brand-900">Checklist de admissão</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {sel.checklist.map((item) => (
                  <div key={item.item} className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2 text-sm">
                    {item.concluido ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-slate-300" />
                    )}
                    <span className={item.concluido ? "text-slate-700" : "text-slate-400"}>{item.item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              <AcaoButton label="Gerar contrato" size="sm" icon={FileText} titulo="Gerar contrato" descricao={`Gerar o contrato de ${sel.nome} a partir do modelo padrão?`} confirmarLabel="Gerar" />
              <AcaoButton label="Validar documentos" size="sm" variant="secondary" icon={CheckCircle2} titulo="Validar documentos" descricao={`Marcar os documentos de ${sel.nome} como validados?`} confirmarLabel="Validar" />
              <AcaoButton label="Enviar lembrete" size="sm" variant="secondary" titulo="Enviar lembrete" descricao={`Enviar lembrete de pendências para ${sel.nome}?`} confirmarLabel="Enviar" />
              <AcaoButton label="Liberar onboarding" size="sm" variant="secondary" icon={Stethoscope} titulo="Liberar onboarding" descricao={`Liberar o onboarding de ${sel.nome}?`} confirmarLabel="Liberar" />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
