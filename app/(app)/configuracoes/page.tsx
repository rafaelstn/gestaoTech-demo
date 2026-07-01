"use client";

import { useState } from "react";
import {
  Building2,
  FileText,
  KeyRound,
  MapPin,
  ScrollText,
  ShieldCheck,
  UserCog,
  Users,
  Workflow,
  Check,
  X,
} from "lucide-react";
import { PageHeader, Tabs, StatusBadge, Badge, Button, Avatar } from "@/components/ui";
import { AcaoButton } from "@/components/ui/AcaoButton";
import { TextInput, SelectField, FieldLabel } from "@/components/ui/Field";
import { TableWrap, THead, Th, TBody, Tr, Td } from "@/components/ui/Table";
import { areas, automacoes, cargos, empresa, headcountPorArea, unidades } from "@/lib/mock";
import type { Automacao, StatusAutomacao } from "@/lib/types";
import { cn } from "@/lib/cn";

const TIPOS_DOC = [
  "Admissional", "Contrato", "Termo", "Política interna", "Documento pessoal", "Comprovante",
  "Treinamento", "Benefício", "Férias", "Afastamento", "Advertência", "Desligamento", "NR-1", "SST", "Relatório",
];

const usuarios = [
  { nome: "Renata Aquino", email: "renata.aquino@grupoalfa.com.br", papel: "Gestora de RH", status: "Ativo" },
  { nome: "Ana Paula Martins", email: "ana.martins@grupoalfa.com.br", papel: "Analista de RH", status: "Ativo" },
  { nome: "Letícia Almeida", email: "leticia.almeida@grupoalfa.com.br", papel: "Analista de RH", status: "Ativo" },
  { nome: "Rafael Moreira", email: "rafael.moreira@grupoalfa.com.br", papel: "Segurança do Trabalho", status: "Ativo" },
  { nome: "Paulo Tavares", email: "paulo.tavares@grupoalfa.com.br", papel: "Gestor de área", status: "Ativo" },
  { nome: "Cláudia Bernardes", email: "claudia.bernardes@grupoalfa.com.br", papel: "Diretoria", status: "Ativo" },
];

const perfis = ["Gestora de RH", "Analista de RH", "DP", "Gestor de área", "Colaborador", "Diretoria", "Seg. do Trabalho"];
const permissoes = [
  { nome: "Ver dashboards", acesso: [true, true, true, true, false, true, false] },
  { nome: "Gerir colaboradores", acesso: [true, true, true, false, false, false, false] },
  { nome: "Aprovar férias", acesso: [true, false, false, true, false, false, false] },
  { nome: "Gerir documentos", acesso: [true, true, true, false, false, false, false] },
  { nome: "Ver conformidade NR-1", acesso: [true, true, false, false, false, true, true] },
  { nome: "Exportar relatórios", acesso: [true, true, true, false, false, true, false] },
  { nome: "Configurar automações", acesso: [true, false, false, false, false, false, false] },
];

const logs = [
  { em: "30/06/2026 10:15", usuario: "Renata Aquino", acao: "Exportou relatório de conformidade", entidade: "Relatórios" },
  { em: "30/06/2026 09:04", usuario: "Sistema", acao: "Criou checklist de onboarding (automação)", entidade: "Admissão" },
  { em: "30/06/2026 08:12", usuario: "Sistema", acao: "Enviou lembrete de documentos pendentes", entidade: "Documentos" },
  { em: "29/06/2026 15:42", usuario: "Ana Paula Martins", acao: "Gerou contrato de admissão", entidade: "Admissão" },
  { em: "29/06/2026 11:20", usuario: "Letícia Almeida", acao: "Concluiu chamado #4828", entidade: "Solicitações" },
  { em: "28/06/2026 16:30", usuario: "Rafael Moreira", acao: "Anexou evidência a ação corretiva", entidade: "NR-1" },
];

const seguranca = [
  { titulo: "Perfis de acesso e permissões", desc: "Controle por papel com privilégio mínimo.", on: true },
  { titulo: "Autenticação em dois fatores (MFA)", desc: "Exigida para perfis administrativos.", on: true },
  { titulo: "Logs de auditoria", desc: "Registro de quem fez o quê e quando.", on: true },
  { titulo: "Histórico de alterações", desc: "Versionamento de cadastros e documentos.", on: true },
  { titulo: "Registro de ciência", desc: "Comprovação de leitura de políticas.", on: true },
  { titulo: "Retenção e minimização de dados (LGPD)", desc: "Finalidade, prazo e descarte definidos.", on: true },
  { titulo: "Consentimento quando aplicável", desc: "Coleta de consentimento documentada.", on: false },
  { titulo: "Uso responsável de IA", desc: "IA como apoio, com revisão humana.", on: true },
];

function AutomacoesAba() {
  const [lista, setLista] = useState<Automacao[]>(automacoes);
  const toggle = (id: string) =>
    setLista((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: (a.status === "Ativa" ? "Pausada" : "Ativa") as StatusAutomacao } : a,
      ),
    );

  return (
    <TableWrap>
      <THead>
        <tr>
          <Th>Automação</Th>
          <Th>Gatilho</Th>
          <Th>Ação</Th>
          <Th>Responsável</Th>
          <Th align="center">Exec./mês</Th>
          <Th>Última execução</Th>
          <Th align="right">Status</Th>
        </tr>
      </THead>
      <TBody>
        {lista.map((a) => (
          <Tr key={a.id}>
            <Td className="font-medium text-brand-900">{a.nome}</Td>
            <Td className="max-w-[200px] text-slate-500">{a.gatilho}</Td>
            <Td className="max-w-[200px] text-slate-500">{a.acao}</Td>
            <Td>{a.responsavel}</Td>
            <Td align="center">{a.execucoesMes}</Td>
            <Td className="text-slate-500">{a.ultimaExecucao}</Td>
            <Td align="right">
              <button onClick={() => toggle(a.id)} className="inline-flex items-center gap-2" aria-label="Alternar automação">
                <span
                  className={cn(
                    "relative h-5 w-9 rounded-full transition-colors",
                    a.status === "Ativa" ? "bg-emerald-500" : "bg-slate-300",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                      a.status === "Ativa" ? "translate-x-4" : "translate-x-0.5",
                    )}
                  />
                </span>
              </button>
            </Td>
          </Tr>
        ))}
      </TBody>
    </TableWrap>
  );
}

function ListaSimples({ itens, extra }: { itens: string[]; extra?: (v: string) => React.ReactNode }) {
  return (
    <div className="space-y-2">
      {itens.map((v) => (
        <div key={v} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-2.5">
          <span className="text-sm text-brand-900">{v}</span>
          {extra?.(v)}
        </div>
      ))}
    </div>
  );
}

export default function ConfiguracoesPage() {
  const abas = [
    {
      id: "empresa",
      label: "Empresa",
      icon: Building2,
      content: (
        <div className="max-w-2xl space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><FieldLabel>Razão social</FieldLabel><TextInput defaultValue={empresa.nome} /></div>
            <div><FieldLabel>CNPJ</FieldLabel><TextInput defaultValue={empresa.cnpj} /></div>
            <div><FieldLabel>Unidade sede</FieldLabel><SelectField defaultValue={empresa.unidadeSede}>{unidades.map((u) => <option key={u}>{u}</option>)}</SelectField></div>
            <div><FieldLabel>Colaboradores</FieldLabel><TextInput defaultValue={String(empresa.headcount)} disabled /></div>
          </div>
          <AcaoButton label="Salvar alterações" size="sm" titulo="Salvar dados da empresa" descricao="Confirmar a atualização dos dados cadastrais da empresa?" confirmarLabel="Salvar" />
        </div>
      ),
    },
    {
      id: "usuarios",
      label: "Usuários",
      icon: Users,
      content: (
        <TableWrap>
          <THead>
            <tr><Th>Usuário</Th><Th>Papel</Th><Th>Status</Th></tr>
          </THead>
          <TBody>
            {usuarios.map((u) => (
              <Tr key={u.email}>
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar nome={u.nome} size="sm" />
                    <div><div className="font-medium text-brand-900">{u.nome}</div><div className="text-xs text-slate-400">{u.email}</div></div>
                  </div>
                </Td>
                <Td><Badge tone="brand">{u.papel}</Badge></Td>
                <Td><StatusBadge status={u.status} /></Td>
              </Tr>
            ))}
          </TBody>
        </TableWrap>
      ),
    },
    {
      id: "permissoes",
      label: "Permissões",
      icon: KeyRound,
      content: (
        <TableWrap>
          <THead>
            <tr>
              <Th>Permissão</Th>
              {perfis.map((p) => <Th key={p} align="center">{p}</Th>)}
            </tr>
          </THead>
          <TBody>
            {permissoes.map((perm) => (
              <Tr key={perm.nome}>
                <Td className="font-medium text-brand-900">{perm.nome}</Td>
                {perm.acesso.map((ok, i) => (
                  <Td key={i} align="center">
                    {ok ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : <X className="mx-auto h-4 w-4 text-slate-300" />}
                  </Td>
                ))}
              </Tr>
            ))}
          </TBody>
        </TableWrap>
      ),
    },
    {
      id: "unidades",
      label: "Unidades",
      icon: MapPin,
      content: <ListaSimples itens={unidades} extra={(u) => <Badge tone="neutral">{u === empresa.unidadeSede ? "Sede" : "Filial"}</Badge>} />,
    },
    {
      id: "cargos",
      label: "Cargos",
      icon: UserCog,
      content: <ListaSimples itens={cargos} />,
    },
    {
      id: "tipos-doc",
      label: "Tipos de documentos",
      icon: FileText,
      content: <ListaSimples itens={TIPOS_DOC} />,
    },
    {
      id: "automacoes",
      label: "Automações",
      icon: Workflow,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-500">Gatilhos automáticos que executam rotinas do RH sem intervenção manual.</p>
          <AutomacoesAba />
        </div>
      ),
    },
    {
      id: "seguranca",
      label: "Segurança",
      icon: ShieldCheck,
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          {seguranca.map((s) => (
            <div key={s.titulo} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <div>
                <div className="text-sm font-medium text-brand-900">{s.titulo}</div>
                <div className="mt-0.5 text-xs text-slate-500">{s.desc}</div>
              </div>
              <Badge tone={s.on ? "success" : "neutral"} dot>{s.on ? "Ativo" : "Opcional"}</Badge>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "logs",
      label: "Logs",
      icon: ScrollText,
      content: (
        <TableWrap>
          <THead>
            <tr><Th>Data / hora</Th><Th>Usuário</Th><Th>Ação</Th><Th>Módulo</Th></tr>
          </THead>
          <TBody>
            {logs.map((l, i) => (
              <Tr key={i}>
                <Td className="whitespace-nowrap text-slate-500">{l.em}</Td>
                <Td className="font-medium text-brand-900">{l.usuario}</Td>
                <Td>{l.acao}</Td>
                <Td><Badge tone="neutral">{l.entidade}</Badge></Td>
              </Tr>
            ))}
          </TBody>
        </TableWrap>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Empresa, usuários, permissões, unidades, cargos, automações, segurança e logs."
      />
      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <Tabs items={abas} />
      </div>
    </div>
  );
}
