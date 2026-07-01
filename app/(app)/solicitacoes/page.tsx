"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Clock, Inbox, MessageSquare, TimerOff } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Badge, Button, Card, CardHeader, CardBody, Modal, Textarea } from "@/components/ui";
import { AcaoButton } from "@/components/ui/AcaoButton";
import { TableWrap, THead, Th, TBody, Tr, Td } from "@/components/ui/Table";
import { faq, solicitacoes } from "@/lib/mock";
import { data } from "@/lib/format";
import type { Prioridade, Solicitacao } from "@/lib/types";
import { cn } from "@/lib/cn";

const PRIO_TONE: Record<Prioridade, "danger" | "warning" | "neutral"> = {
  Alta: "danger",
  Média: "warning",
  Baixa: "neutral",
};

function SlaBadge({ horas }: { horas: number }) {
  if (horas < 0) return <Badge tone="danger" dot>SLA vencido</Badge>;
  if (horas <= 4) return <Badge tone="warning" dot>{horas}h restantes</Badge>;
  return <Badge tone="success" dot>{horas}h restantes</Badge>;
}

export default function SolicitacoesPage() {
  const [sel, setSel] = useState<Solicitacao | null>(null);
  const [faqAberto, setFaqAberto] = useState<number | null>(0);

  const abertos = solicitacoes.filter((s) => s.status !== "Resolvido" && s.status !== "Cancelado").length;
  const emAnalise = solicitacoes.filter((s) => s.status === "Em análise").length;
  const slaVencido = solicitacoes.filter((s) => s.slaRestanteHoras < 0).length;
  const resolvidos = solicitacoes.filter((s) => s.status === "Resolvido").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Solicitações Internas"
        description="Central de atendimento do RH: chamados com SLA, categorias, responsável e histórico."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Chamados abertos" value={abertos} icon={Inbox} tone="info" />
        <StatCard label="Em análise" value={emAnalise} icon={Clock} tone="warning" />
        <StatCard label="SLA vencido" value={slaVencido} icon={TimerOff} tone="danger" />
        <StatCard label="Resolvidos" value={resolvidos} icon={CheckCircle2} tone="success" />
      </div>

      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <TableWrap>
          <THead>
            <tr>
              <Th>Chamado</Th>
              <Th>Solicitante</Th>
              <Th>Categoria</Th>
              <Th>Prioridade</Th>
              <Th>Status</Th>
              <Th>SLA</Th>
              <Th align="right">Ação</Th>
            </tr>
          </THead>
          <TBody>
            {solicitacoes.map((s) => (
              <Tr key={s.id}>
                <Td>
                  <div className="font-medium text-brand-900">{s.numero}</div>
                  <div className="max-w-[220px] truncate text-xs text-slate-400">{s.assunto}</div>
                </Td>
                <Td>{s.solicitante}</Td>
                <Td>{s.categoria}</Td>
                <Td><Badge tone={PRIO_TONE[s.prioridade]} dot>{s.prioridade}</Badge></Td>
                <Td><StatusBadge status={s.status} /></Td>
                <Td><SlaBadge horas={s.slaRestanteHoras} /></Td>
                <Td align="right">
                  <Button variant="subtle" size="sm" onClick={() => setSel(s)}>Abrir</Button>
                </Td>
              </Tr>
            ))}
          </TBody>
        </TableWrap>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader title="FAQ · Respostas automáticas" subtitle="Dúvidas frequentes respondidas na hora para o colaborador" />
        <CardBody className="space-y-2">
          {faq.map((f, i) => {
            const aberto = faqAberto === i;
            return (
              <div key={i} className="overflow-hidden rounded-xl border border-slate-200">
                <button
                  onClick={() => setFaqAberto(aberto ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-brand-900 hover:bg-slate-50"
                >
                  {f.pergunta}
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-slate-400 transition-transform", aberto && "rotate-180")} />
                </button>
                {aberto && <p className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600">{f.resposta}</p>}
              </div>
            );
          })}
        </CardBody>
      </Card>

      {/* Modal de chamado */}
      <Modal
        open={sel !== null}
        onClose={() => setSel(null)}
        size="lg"
        title={sel ? `${sel.numero} · ${sel.assunto}` : ""}
        description={sel ? `${sel.solicitante} · ${sel.categoria} · aberto em ${data(sel.abertaEm)}` : undefined}
      >
        {sel && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={sel.status} />
              <Badge tone={PRIO_TONE[sel.prioridade]} dot>{sel.prioridade}</Badge>
              <SlaBadge horas={sel.slaRestanteHoras} />
              <span className="text-xs text-slate-400">Responsável: {sel.responsavel}</span>
            </div>

            <div className="space-y-3">
              {sel.mensagens.map((m, i) => (
                <div key={i} className={cn("rounded-xl px-4 py-3", m.papel === "Colaborador" ? "bg-slate-50" : "bg-tech-50")}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-brand-900">{m.autor} · {m.papel}</span>
                    <span className="text-slate-400">{data(m.em)}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-700">{m.texto}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-4">
              <Textarea rows={3} placeholder="Escreva uma resposta ao colaborador..." />
              <div className="flex items-center gap-2">
                <AcaoButton label="Responder" size="sm" icon={MessageSquare} titulo="Enviar resposta" descricao="Enviar esta resposta ao colaborador e atualizar o chamado?" confirmarLabel="Enviar" />
                <AcaoButton label="Concluir chamado" size="sm" variant="secondary" icon={CheckCircle2} titulo="Concluir chamado" descricao="Marcar este chamado como resolvido?" confirmarLabel="Concluir" />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
