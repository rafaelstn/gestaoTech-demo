import type { Alerta, PontoSerie } from "@/lib/types";

/** KPIs de topo do dashboard (visão executiva). */
export const kpis = {
  headcount: 186,
  vagasAbertas: 12,
  admissoesAndamento: 8,
  documentosPendentes: 34,
  solicitacoesAbertas: 27,
  feriasProximas: 15,
  afastamentosAtivos: 4,
  treinamentosVencidos: 11,
  desligamentosMes: 3,
  pendenciasConformidade: 9,
} as const;

/** Evolução do headcount nos últimos 6 meses. */
export const evolucaoHeadcount: PontoSerie[] = [
  { label: "Jan", headcount: 171 },
  { label: "Fev", headcount: 174 },
  { label: "Mar", headcount: 178 },
  { label: "Abr", headcount: 181 },
  { label: "Mai", headcount: 184 },
  { label: "Jun", headcount: 186 },
];

/** Turnover mensal (%). */
export const turnoverMensal: PontoSerie[] = [
  { label: "Jan", turnover: 2.1 },
  { label: "Fev", turnover: 1.8 },
  { label: "Mar", turnover: 2.4 },
  { label: "Abr", turnover: 1.6 },
  { label: "Mai", turnover: 1.9 },
  { label: "Jun", turnover: 1.6 },
];

/** Solicitações internas por categoria (mês atual). */
export const solicitacoesPorCategoria: PontoSerie[] = [
  { label: "Férias", total: 8 },
  { label: "Benefício", total: 6 },
  { label: "Declaração", total: 5 },
  { label: "Reembolso", total: 3 },
  { label: "Cadastral", total: 3 },
  { label: "Documento", total: 2 },
];

/** Status das admissões em andamento. */
export const statusAdmissoes: PontoSerie[] = [
  { label: "Dados pessoais", total: 1 },
  { label: "Documentos", total: 2 },
  { label: "Validação RH", total: 1 },
  { label: "Contrato", total: 1 },
  { label: "Assinatura", total: 1 },
  { label: "Exame", total: 1 },
  { label: "Onboarding", total: 1 },
];

/** Documentos pendentes por tipo. */
export const documentosPorTipo: PontoSerie[] = [
  { label: "Admissional", total: 12 },
  { label: "Pessoal", total: 8 },
  { label: "Benefício", total: 6 },
  { label: "Treinamento", total: 5 },
  { label: "NR-1 / SST", total: 3 },
];

/** Treinamentos concluídos x vencidos por mês. */
export const treinamentosConcluidosVencidos: PontoSerie[] = [
  { label: "Jan", concluidos: 42, vencidos: 6 },
  { label: "Fev", concluidos: 38, vencidos: 8 },
  { label: "Mar", concluidos: 51, vencidos: 5 },
  { label: "Abr", concluidos: 47, vencidos: 9 },
  { label: "Mai", concluidos: 44, vencidos: 7 },
  { label: "Jun", concluidos: 39, vencidos: 11 },
];

/** Alertas operacionais do centro de comando. */
export const alertas: Alerta[] = [
  {
    id: "al-001",
    texto: "11 treinamentos obrigatórios estão vencidos.",
    tone: "danger",
    modulo: "Treinamentos",
    href: "/treinamentos",
  },
  {
    id: "al-002",
    texto: "34 documentos aguardam regularização.",
    tone: "warning",
    modulo: "Documentos",
    href: "/documentos",
  },
  {
    id: "al-003",
    texto: "5 admissões precisam de validação documental.",
    tone: "warning",
    modulo: "Admissão",
    href: "/admissao",
  },
  {
    id: "al-004",
    texto: "3 colaboradores estão com férias próximas do vencimento.",
    tone: "info",
    modulo: "Férias e Afastamentos",
    href: "/ferias-afastamentos",
  },
  {
    id: "al-005",
    texto: "9 pendências de conformidade precisam de responsável definido.",
    tone: "danger",
    modulo: "NR-1 e Conformidade",
    href: "/nr1-conformidade",
  },
];

/** Eventos proativos do sino de notificações. */
export const notificacoes: { id: string; texto: string; em: string; tone: Alerta["tone"] }[] = [
  { id: "n-001", texto: "SLA da solicitação #4827 vencido há 2 horas.", em: "há 2h", tone: "danger" },
  { id: "n-002", texto: "Simone Cardoso avançou para Validação do RH.", em: "há 3h", tone: "info" },
  { id: "n-003", texto: "Ação corretiva NR-1 crítica vence hoje.", em: "há 5h", tone: "warning" },
  { id: "n-004", texto: "Rodrigo Sales está pronto para iniciar admissão.", em: "ontem", tone: "success" },
];
