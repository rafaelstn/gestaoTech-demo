/**
 * Tipos de domínio do Gestão Tech RH.
 * Valores de status são strings legíveis PT-BR (texto exibido direto em Badge).
 * Identificadores de campo permanecem sem acento (id, area, unidade).
 */

// ── Dimensões fixas da empresa demo (Grupo Alfa Serviços) ──
export type Unidade =
  | "Matriz São Paulo"
  | "Unidade Campinas"
  | "Unidade Ribeirão Preto"
  | "Unidade Belo Horizonte";

export type Area =
  | "Administrativo"
  | "Comercial"
  | "Operações"
  | "Financeiro"
  | "Tecnologia"
  | "Atendimento"
  | "Logística"
  | "Recursos Humanos";

export type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "brand";

// ── Colaborador ──
export type StatusColaborador =
  | "Ativo"
  | "Em experiência"
  | "Afastado"
  | "Em férias"
  | "Desligado";

export interface Colaborador {
  id: string;
  nome: string;
  cargo: string;
  area: Area;
  gestor: string;
  unidade: Unidade;
  status: StatusColaborador;
  admissao: string; // ISO
  email: string;
  telefone: string;
  matricula: string;
  documentosPendentes: number;
  treinamentosPendentes: number;
}

// ── Recrutamento ──
export type EtapaFunil =
  | "Vaga aberta"
  | "Triagem"
  | "Entrevista RH"
  | "Entrevista gestor"
  | "Proposta"
  | "Aprovado"
  | "Reprovado"
  | "Banco de talentos";

export type PrioridadeVaga = "Alta" | "Média" | "Baixa";
export type StatusVaga = "Aberta" | "Em andamento" | "Congelada" | "Fechada";

export interface Vaga {
  id: string;
  titulo: string;
  area: Area;
  unidade: Unidade;
  responsavel: string;
  status: StatusVaga;
  prioridade: PrioridadeVaga;
  candidatos: number;
  etapaAtual: EtapaFunil;
  prazoFechamento: string; // ISO
  abertaEm: string; // ISO
}

export interface Candidato {
  id: string;
  nome: string;
  vagaId: string;
  vaga: string;
  origem: string;
  etapa: EtapaFunil;
  score: number; // 0-100
  atualizadoEm: string; // ISO
  responsavel: string;
  acaoRecomendada: string;
}

// ── Admissão ──
export type EtapaAdmissao =
  | "Dados pessoais"
  | "Documentos enviados"
  | "Validação do RH"
  | "Contrato gerado"
  | "Assinatura pendente"
  | "Exame admissional"
  | "Onboarding liberado"
  | "Colaborador ativo";

export interface ItemChecklistAdmissao {
  item: string;
  concluido: boolean;
}

export interface Admissao {
  id: string;
  nome: string;
  cargo: string;
  area: Area;
  unidade: Unidade;
  inicioPrevisto: string; // ISO
  documentosPendentes: number;
  etapa: EtapaAdmissao;
  responsavel: string;
  proximaAcao: string;
  checklist: ItemChecklistAdmissao[];
}

// ── Solicitações internas ──
export type CategoriaSolicitacao =
  | "Férias"
  | "Alteração cadastral"
  | "Declaração"
  | "Benefício"
  | "Reembolso"
  | "Documento"
  | "Dúvida trabalhista"
  | "Suporte ao colaborador"
  | "Solicitação ao DP"
  | "Outros";

export type StatusSolicitacao =
  | "Novo"
  | "Em análise"
  | "Aguardando colaborador"
  | "Aguardando gestor"
  | "Resolvido"
  | "Cancelado";

export type Prioridade = "Alta" | "Média" | "Baixa";

export interface MensagemChamado {
  autor: string;
  papel: "Colaborador" | "RH" | "Gestor" | "DP";
  em: string; // ISO
  texto: string;
}

export interface Solicitacao {
  id: string;
  numero: string;
  solicitante: string;
  categoria: CategoriaSolicitacao;
  prioridade: Prioridade;
  status: StatusSolicitacao;
  responsavel: string;
  abertaEm: string; // ISO
  slaHoras: number;
  slaRestanteHoras: number;
  atualizadoEm: string; // ISO
  assunto: string;
  mensagens: MensagemChamado[];
}

// ── Documentos ──
export type TipoDocumento =
  | "Admissional"
  | "Contrato"
  | "Termo"
  | "Política interna"
  | "Documento pessoal"
  | "Comprovante"
  | "Treinamento"
  | "Benefício"
  | "Férias"
  | "Afastamento"
  | "Advertência"
  | "Desligamento"
  | "NR-1"
  | "SST"
  | "Relatório";

export type StatusDocumento =
  | "Válido"
  | "Pendente"
  | "Vencido"
  | "Aguardando assinatura"
  | "Aguardando ciência"
  | "Em revisão";

export interface Documento {
  id: string;
  nome: string;
  tipo: TipoDocumento;
  colaborador: string;
  status: StatusDocumento;
  atualizadoEm: string; // ISO
  validade: string | null; // ISO
  tamanho: string;
  tags: string[];
}

// ── Férias e afastamentos ──
export type TipoAusencia =
  | "Férias"
  | "Afastamento médico"
  | "Licença"
  | "Ausência justificada"
  | "Banco de horas"
  | "Folga"
  | "Retorno ao trabalho";

export type StatusAusencia =
  | "Agendada"
  | "Aguardando aprovação"
  | "Aprovada"
  | "Em andamento"
  | "Concluída"
  | "Vence em breve";

export interface Ausencia {
  id: string;
  colaborador: string;
  area: Area;
  tipo: TipoAusencia;
  inicio: string; // ISO
  fim: string; // ISO
  status: StatusAusencia;
  gestorAprovador: string;
  documentos: number;
  observacoes: string;
  acaoRecomendada: string;
}

// ── Treinamentos ──
export type StatusTreinamento = "Ativo" | "Concluído" | "Vencido" | "Agendado";

export interface Treinamento {
  id: string;
  nome: string;
  publicoAlvo: string;
  cargaHoraria: number;
  obrigatorio: boolean;
  validadeMeses: number;
  status: StatusTreinamento;
  matriculados: number;
  concluidos: number;
  responsavel: string;
  proximoVencimento: string | null; // ISO
}

// ── Desempenho ──
export type StatusAvaliacao =
  | "Pendente"
  | "Autoavaliação"
  | "Em avaliação"
  | "Concluída";

export interface Avaliacao {
  id: string;
  colaborador: string;
  area: Area;
  gestor: string;
  ciclo: string;
  status: StatusAvaliacao;
  nota: number | null; // 0-5
  pdi: boolean;
  proximaAcao: string;
}

// ── Benefícios ──
export type StatusBeneficioColab = "Ativo" | "Pendente" | "Inclusão" | "Exclusão";

export interface Beneficio {
  id: string;
  nome: string;
  descricao: string;
  elegiveis: number;
  ativos: number;
  pendentes: number;
  custoMensal: number;
}

export interface SolicitacaoBeneficio {
  id: string;
  colaborador: string;
  beneficio: string;
  tipo: "Inclusão" | "Exclusão" | "Alteração";
  status: StatusBeneficioColab;
  dependentes: number;
  documentosPendentes: number;
  abertaEm: string; // ISO
}

// ── Desligamentos ──
export type EtapaDesligamento =
  | "Solicitação de desligamento"
  | "Aprovação"
  | "Comunicação ao colaborador"
  | "Checklist documental"
  | "Devolução de equipamentos"
  | "Revogação de acessos"
  | "Entrevista de desligamento"
  | "Encerramento interno"
  | "Concluído";

export type TipoDesligamento =
  | "Pedido de demissão"
  | "Sem justa causa"
  | "Com justa causa"
  | "Fim de contrato"
  | "Acordo";

export interface ItemOffboarding {
  item: string;
  concluido: boolean;
}

export interface Desligamento {
  id: string;
  colaborador: string;
  area: Area;
  gestor: string;
  tipo: TipoDesligamento;
  dataPrevista: string; // ISO
  etapa: EtapaDesligamento;
  pendencias: number;
  responsavel: string;
  proximaAcao: string;
  checklist: ItemOffboarding[];
}

// ── NR-1 e conformidade ──
export type CategoriaConformidade =
  | "Documentação"
  | "Treinamento"
  | "Comunicação interna"
  | "Evidência"
  | "Ação corretiva"
  | "SST"
  | "Riscos ocupacionais"
  | "Registros de ciência"
  | "Auditoria";

export type StatusConformidade =
  | "Conforme"
  | "Pendente"
  | "Em atraso"
  | "Sem evidência"
  | "Em revisão";

export type Criticidade = "Crítica" | "Alta" | "Média" | "Baixa";

export interface Obrigacao {
  id: string;
  obrigacao: string;
  categoria: CategoriaConformidade;
  responsavel: string;
  prazo: string; // ISO
  status: StatusConformidade;
  evidencia: boolean;
  criticidade: Criticidade;
  acaoRecomendada: string;
}

export type StatusAcaoCorretiva =
  | "Aberta"
  | "Em andamento"
  | "Aguardando evidência"
  | "Em validação"
  | "Concluída";

export interface AcaoCorretiva {
  id: string;
  descricao: string;
  origem: string;
  responsavel: string;
  prazo: string; // ISO
  criticidade: Criticidade;
  evidencias: number;
  status: StatusAcaoCorretiva;
}

export interface ItemChecklistConformidade {
  item: string;
  ok: boolean;
}

// ── Automações ──
export type StatusAutomacao = "Ativa" | "Pausada";

export interface Automacao {
  id: string;
  nome: string;
  gatilho: string;
  acao: string;
  responsavel: string;
  status: StatusAutomacao;
  ultimaExecucao: string; // ISO + hora curta
  execucoesMes: number;
}

// ── Alertas operacionais ──
export interface Alerta {
  id: string;
  texto: string;
  tone: Tone;
  modulo: string;
  href: string;
}

// ── Genéricos de gráfico ──
export interface PontoSerie {
  label: string;
  [serie: string]: string | number;
}
