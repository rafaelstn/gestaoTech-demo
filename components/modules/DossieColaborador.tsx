"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  FileText,
  Gift,
  History,
  Inbox,
  Mail,
  MessageSquare,
  Phone,
  Target,
  UserCog,
} from "lucide-react";
import { Avatar, Badge, StatusBadge, Tabs, EmptyState, Textarea } from "@/components/ui";
import { AcaoButton } from "@/components/ui/AcaoButton";
import { TableWrap, THead, Th, TBody, Tr, Td } from "@/components/ui/Table";
import { avaliacoes, ausencias, beneficios, documentos, solicitacoes } from "@/lib/mock";
import { data } from "@/lib/format";
import type { Colaborador } from "@/lib/types";

function Campo({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-brand-900">{value}</dd>
    </div>
  );
}

function AbaDados({ c }: { c: Colaborador }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Campo label="Matrícula" value={c.matricula} />
      <Campo label="Cargo" value={c.cargo} />
      <Campo label="Área" value={c.area} />
      <Campo label="Unidade" value={c.unidade} />
      <Campo label="Gestor direto" value={c.gestor} />
      <Campo label="Data de admissão" value={data(c.admissao)} />
      <Campo label="E-mail" value={c.email} />
      <Campo label="Telefone" value={c.telefone} />
      <Campo label="Situação" value={<StatusBadge status={c.status} />} />
    </dl>
  );
}

function AbaDocumentos({ nome }: { nome: string }) {
  const docs = documentos.filter((d) => d.colaborador === nome);
  if (!docs.length)
    return <EmptyState icon={FileText} title="Sem documentos vinculados" description="Nenhum documento deste colaborador nesta demonstração." />;
  return (
    <TableWrap>
      <THead>
        <tr><Th>Documento</Th><Th>Tipo</Th><Th>Status</Th><Th>Atualizado</Th></tr>
      </THead>
      <TBody>
        {docs.map((d) => (
          <Tr key={d.id}>
            <Td className="font-medium text-brand-900">{d.nome}</Td>
            <Td>{d.tipo}</Td>
            <Td><StatusBadge status={d.status} /></Td>
            <Td>{data(d.atualizadoEm)}</Td>
          </Tr>
        ))}
      </TBody>
    </TableWrap>
  );
}

function AbaAusencias({ nome, afastamento }: { nome: string; afastamento: boolean }) {
  const lista = ausencias.filter(
    (a) => a.colaborador === nome && (afastamento ? a.tipo !== "Férias" : a.tipo === "Férias"),
  );
  if (!lista.length)
    return <EmptyState icon={CalendarDays} title="Nada registrado" description="Sem registros para este colaborador nesta demonstração." />;
  return (
    <TableWrap>
      <THead>
        <tr><Th>Tipo</Th><Th>Período</Th><Th>Status</Th><Th>Aprovador</Th></tr>
      </THead>
      <TBody>
        {lista.map((a) => (
          <Tr key={a.id}>
            <Td className="font-medium text-brand-900">{a.tipo}</Td>
            <Td>{data(a.inicio)} — {data(a.fim)}</Td>
            <Td><StatusBadge status={a.status} /></Td>
            <Td>{a.gestorAprovador}</Td>
          </Tr>
        ))}
      </TBody>
    </TableWrap>
  );
}

function AbaSolicitacoes({ nome }: { nome: string }) {
  const lista = solicitacoes.filter((s) => s.solicitante === nome);
  if (!lista.length)
    return <EmptyState icon={Inbox} title="Sem solicitações" description="Este colaborador não abriu chamados nesta demonstração." />;
  return (
    <TableWrap>
      <THead>
        <tr><Th>Chamado</Th><Th>Assunto</Th><Th>Categoria</Th><Th>Status</Th></tr>
      </THead>
      <TBody>
        {lista.map((s) => (
          <Tr key={s.id}>
            <Td className="font-medium text-brand-900">{s.numero}</Td>
            <Td>{s.assunto}</Td>
            <Td>{s.categoria}</Td>
            <Td><StatusBadge status={s.status} /></Td>
          </Tr>
        ))}
      </TBody>
    </TableWrap>
  );
}

function AbaDesempenho({ nome }: { nome: string }) {
  const av = avaliacoes.find((a) => a.colaborador === nome);
  if (!av)
    return <EmptyState icon={Target} title="Sem avaliação no ciclo" description="Nenhuma avaliação registrada para este colaborador." />;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Campo label="Ciclo" value={av.ciclo} />
      <Campo label="Status" value={<StatusBadge status={av.status} />} />
      <Campo label="Nota" value={av.nota !== null ? `${av.nota.toFixed(1)} / 5` : "—"} />
      <Campo label="PDI" value={av.pdi ? <Badge tone="info">Ativo</Badge> : "—"} />
    </div>
  );
}

function AbaTimeline({ items }: { items: { titulo: string; quando: string; texto: string }[] }) {
  return (
    <ol className="relative space-y-5 border-l border-slate-200 pl-6">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white bg-tech-500" />
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-sm font-medium text-brand-900">{it.titulo}</span>
            <span className="text-xs text-slate-400">{it.quando}</span>
          </div>
          <p className="mt-0.5 text-sm text-slate-600">{it.texto}</p>
        </li>
      ))}
    </ol>
  );
}

export function DossieColaborador({ colaborador: c }: { colaborador: Colaborador }) {
  const beneficiosAtivos = beneficios.slice(0, 4);

  const tabs = [
    { id: "dados", label: "Dados gerais", icon: UserCog, content: <AbaDados c={c} /> },
    { id: "docs", label: "Documentos", icon: FileText, content: <AbaDocumentos nome={c.nome} /> },
    {
      id: "hist",
      label: "Histórico",
      icon: History,
      content: (
        <AbaTimeline
          items={[
            { titulo: "Admissão", quando: data(c.admissao), texto: `Admitido(a) como ${c.cargo} na área ${c.area}.` },
            { titulo: "Integração concluída", quando: "após admissão", texto: "Onboarding e treinamentos de integração realizados." },
            { titulo: "Ciclo de avaliação", quando: "2026 · 1º sem", texto: "Participou do ciclo de desempenho vigente." },
          ]}
        />
      ),
    },
    { id: "ferias", label: "Férias", icon: CalendarDays, content: <AbaAusencias nome={c.nome} afastamento={false} /> },
    { id: "afast", label: "Afastamentos", icon: History, content: <AbaAusencias nome={c.nome} afastamento={true} /> },
    {
      id: "trein",
      label: "Treinamentos",
      icon: Award,
      content: (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Integração institucional", "Código de conduta", "Segurança da informação", "LGPD na prática"].map((t, i) => (
            <div key={t} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
              <span className="text-sm text-brand-900">{t}</span>
              <StatusBadge status={i < 2 ? "Concluído" : i === 3 && c.treinamentosPendentes > 0 ? "Pendente" : "Concluído"} />
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "benef",
      label: "Benefícios",
      icon: Gift,
      content: (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {beneficiosAtivos.map((b) => (
            <div key={b.id} className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
              <div className="text-sm font-medium text-brand-900">{b.nome}</div>
              <Badge tone="success" dot>Ativo</Badge>
            </div>
          ))}
        </div>
      ),
    },
    { id: "solic", label: "Solicitações", icon: Inbox, content: <AbaSolicitacoes nome={c.nome} /> },
    { id: "desemp", label: "Desempenho", icon: Target, content: <AbaDesempenho nome={c.nome} /> },
    {
      id: "obs",
      label: "Observações",
      icon: MessageSquare,
      content: (
        <div className="max-w-2xl space-y-3">
          <Textarea rows={4} placeholder="Registre observações internas sobre o colaborador..." defaultValue="Colaborador com boa avaliação no ciclo. Acompanhar plano de desenvolvimento." />
          <AcaoButton label="Salvar observação" size="sm" titulo="Salvar observação" descricao="Deseja registrar esta observação no dossiê do colaborador?" confirmarLabel="Salvar" />
        </div>
      ),
    },
    {
      id: "logs",
      label: "Logs de atividade",
      icon: ClipboardList,
      content: (
        <AbaTimeline
          items={[
            { titulo: "Documento atualizado", quando: "há 2 dias", texto: "RH anexou comprovante ao dossiê." },
            { titulo: "Solicitação respondida", quando: "há 5 dias", texto: "Chamado de declaração concluído." },
            { titulo: "Acesso ao portal", quando: "há 1 semana", texto: "Colaborador acessou a central do colaborador." },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Link href="/colaboradores" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-800">
        <ArrowLeft className="h-4 w-4" />
        Voltar para colaboradores
      </Link>

      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar nome={c.nome} size="lg" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold text-brand-900">{c.nome}</h1>
                <StatusBadge status={c.status} />
              </div>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
                <BriefcaseBusiness className="h-4 w-4" />
                {c.cargo} · {c.area} · {c.unidade}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{c.email}</span>
                <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{c.telefone}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <AcaoButton label="Enviar mensagem" variant="secondary" size="sm" icon={MessageSquare} titulo="Enviar mensagem ao colaborador" descricao="Abrir a central de comunicação para enviar uma mensagem a este colaborador?" confirmarLabel="Abrir" />
            <AcaoButton label="Editar cadastro" size="sm" icon={UserCog} titulo="Editar cadastro" descricao="Abrir o formulário de edição do cadastro deste colaborador?" confirmarLabel="Abrir edição" />
          </div>
        </div>
      </div>

      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <Tabs items={tabs} />
      </div>
    </div>
  );
}
