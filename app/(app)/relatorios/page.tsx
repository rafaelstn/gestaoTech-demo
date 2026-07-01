"use client";

import {
  BarChart3,
  CalendarDays,
  Clock,
  DollarSign,
  FileDown,
  FileSpreadsheet,
  GraduationCap,
  Inbox,
  ShieldCheck,
  Target,
  TrendingUp,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader, Button } from "@/components/ui";
import { AcaoButton } from "@/components/ui/AcaoButton";
import {
  ausencias,
  colaboradores,
  desligamentos,
  documentos,
  headcountPorArea,
  obrigacoes,
  solicitacoes,
  treinamentos,
} from "@/lib/mock";
import { data } from "@/lib/format";
import { baixarCSV, baixarPDF } from "@/lib/export";

interface Relatorio {
  id: string;
  titulo: string;
  descricao: string;
  icon: LucideIcon;
  categoria: string;
  headers: string[];
  rows: (string | number)[][];
}

const relatorios: Relatorio[] = [
  {
    id: "headcount",
    titulo: "Headcount por área",
    descricao: "Distribuição de colaboradores entre as áreas da empresa.",
    icon: Users,
    categoria: "Pessoas",
    headers: ["Área", "Colaboradores"],
    rows: headcountPorArea.map((h) => [h.area, h.total]),
  },
  {
    id: "turnover",
    titulo: "Turnover",
    descricao: "Rotatividade mensal de colaboradores.",
    icon: TrendingUp,
    categoria: "Pessoas",
    headers: ["Mês", "Turnover %"],
    rows: [["Jan", "2,1"], ["Fev", "1,8"], ["Mar", "2,4"], ["Abr", "1,6"], ["Mai", "1,9"], ["Jun", "1,6"]],
  },
  {
    id: "absenteismo",
    titulo: "Absenteísmo",
    descricao: "Taxa de ausências não programadas por mês.",
    icon: CalendarDays,
    categoria: "Pessoas",
    headers: ["Mês", "Absenteísmo %"],
    rows: [["Jan", "3,4"], ["Fev", "2,9"], ["Mar", "3,1"], ["Abr", "2,7"], ["Mai", "2,5"], ["Jun", "2,3"]],
  },
  {
    id: "tempo-contratacao",
    titulo: "Tempo médio de contratação",
    descricao: "Dias entre abertura da vaga e admissão.",
    icon: Clock,
    categoria: "Recrutamento",
    headers: ["Área", "Dias"],
    rows: [["Comercial", 28], ["Tecnologia", 34], ["Operações", 21], ["Financeiro", 30]],
  },
  {
    id: "custo-contratacao",
    titulo: "Custo por contratação",
    descricao: "Custo médio estimado por processo seletivo.",
    icon: DollarSign,
    categoria: "Recrutamento",
    headers: ["Área", "Custo (R$)"],
    rows: [["Comercial", "2.400"], ["Tecnologia", "3.800"], ["Operações", "1.600"], ["Financeiro", "2.900"]],
  },
  {
    id: "documentos",
    titulo: "Documentos pendentes",
    descricao: "Documentos aguardando regularização.",
    icon: FileDown,
    categoria: "Documental",
    headers: ["Documento", "Tipo", "Colaborador", "Status"],
    rows: documentos.filter((d) => d.status !== "Válido").map((d) => [d.nome, d.tipo, d.colaborador, d.status]),
  },
  {
    id: "solicitacoes",
    titulo: "Solicitações internas",
    descricao: "Chamados abertos com categoria e status.",
    icon: Inbox,
    categoria: "Atendimento",
    headers: ["Chamado", "Solicitante", "Categoria", "Status"],
    rows: solicitacoes.map((s) => [s.numero, s.solicitante, s.categoria, s.status]),
  },
  {
    id: "ferias",
    titulo: "Férias e afastamentos",
    descricao: "Períodos programados e em andamento.",
    icon: CalendarDays,
    categoria: "Pessoas",
    headers: ["Colaborador", "Tipo", "Início", "Fim", "Status"],
    rows: ausencias.map((a) => [a.colaborador, a.tipo, data(a.inicio), data(a.fim), a.status]),
  },
  {
    id: "treinamentos",
    titulo: "Treinamentos vencidos",
    descricao: "Trilhas obrigatórias fora da validade.",
    icon: GraduationCap,
    categoria: "Conformidade",
    headers: ["Treinamento", "Público", "Status"],
    rows: treinamentos.filter((t) => t.status === "Vencido").map((t) => [t.nome, t.publicoAlvo, t.status]),
  },
  {
    id: "desempenho",
    titulo: "Desempenho",
    descricao: "Notas médias do ciclo por área.",
    icon: Target,
    categoria: "Pessoas",
    headers: ["Área", "Nota média"],
    rows: [["Recursos Humanos", "4,6"], ["Atendimento", "4,6"], ["Comercial", "3,8"], ["Operações", "4,1"]],
  },
  {
    id: "admissoes",
    titulo: "Admissões em andamento",
    descricao: "Candidatos aprovados em processo de admissão.",
    icon: UserPlus,
    categoria: "Recrutamento",
    headers: ["Candidato", "Etapa"],
    rows: [["Simone Cardoso", "Validação do RH"], ["Rodrigo Sales", "Assinatura pendente"], ["Thiago Barros", "Exame admissional"]],
  },
  {
    id: "desligamentos",
    titulo: "Desligamentos",
    descricao: "Processos de offboarding do período.",
    icon: UserMinus,
    categoria: "Pessoas",
    headers: ["Colaborador", "Tipo", "Etapa", "Data prevista"],
    rows: desligamentos.map((d) => [d.colaborador, d.tipo, d.etapa, data(d.dataPrevista)]),
  },
  {
    id: "conformidade",
    titulo: "Conformidade NR-1",
    descricao: "Obrigações, responsáveis e criticidade.",
    icon: ShieldCheck,
    categoria: "Conformidade",
    headers: ["Obrigação", "Responsável", "Status", "Criticidade"],
    rows: obrigacoes.map((o) => [o.obrigacao, o.responsavel, o.status, o.criticidade]),
  },
];

function RelatorioCard({ r }: { r: Relatorio }) {
  const Icon = r.icon;
  const subtitulo = `${r.categoria} · gerado em 30/06/2026`;
  return (
    <div className="flex flex-col rounded-[var(--radius-card)] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">{r.categoria}</span>
      </div>
      <h3 className="mt-4 font-semibold text-brand-900">{r.titulo}</h3>
      <p className="mt-1 flex-1 text-sm text-slate-600">{r.descricao}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="secondary" size="sm" onClick={() => baixarPDF(r.titulo, subtitulo, r.headers, r.rows)}>
          <FileDown className="h-4 w-4" />
          PDF
        </Button>
        <Button variant="secondary" size="sm" onClick={() => baixarCSV(r.id, r.headers, r.rows)}>
          <FileSpreadsheet className="h-4 w-4" />
          Excel
        </Button>
        <AcaoButton label="Enviar" size="sm" variant="ghost" titulo="Enviar por e-mail" descricao={`Enviar o relatório "${r.titulo}" por e-mail?`} confirmarLabel="Enviar" />
        <AcaoButton label="Diretoria" size="sm" variant="ghost" titulo="Compartilhar com diretoria" descricao={`Compartilhar "${r.titulo}" com a diretoria?`} confirmarLabel="Compartilhar" />
      </div>
    </div>
  );
}

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatórios e Dashboards"
        description="Visão executiva para RH e diretoria. Exporte em PDF ou Excel, envie e compartilhe."
      />
      <div className="rounded-xl border border-tech-100 bg-tech-50/60 px-4 py-3 text-sm text-tech-800">
        Os botões <strong>PDF</strong> e <strong>Excel</strong> geram e baixam o arquivo de verdade com os dados fictícios da demonstração.
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatorios.map((r) => (
          <RelatorioCard key={r.id} r={r} />
        ))}
      </div>
    </div>
  );
}
