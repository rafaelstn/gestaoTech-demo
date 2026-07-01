import type { Solicitacao } from "@/lib/types";

export const solicitacoes: Solicitacao[] = [
  {
    id: "s-001",
    numero: "#4821",
    solicitante: "Carlos Henrique Souza",
    categoria: "Férias",
    prioridade: "Média",
    status: "Aguardando gestor",
    responsavel: "Ana Paula Martins",
    abertaEm: "2026-06-26",
    slaHoras: 48,
    slaRestanteHoras: 9,
    atualizadoEm: "2026-06-29",
    assunto: "Solicitação de férias para agosto/2026",
    mensagens: [
      {
        autor: "Carlos Henrique Souza",
        papel: "Colaborador",
        em: "2026-06-26",
        texto: "Gostaria de agendar 15 dias de férias a partir de 04/08.",
      },
      {
        autor: "Ana Paula Martins",
        papel: "RH",
        em: "2026-06-27",
        texto: "Encaminhado ao gestor Paulo Tavares para aprovação.",
      },
    ],
  },
  {
    id: "s-002",
    numero: "#4822",
    solicitante: "Camila Ferreira",
    categoria: "Declaração",
    prioridade: "Baixa",
    status: "Resolvido",
    responsavel: "Letícia Almeida",
    abertaEm: "2026-06-24",
    slaHoras: 24,
    slaRestanteHoras: 0,
    atualizadoEm: "2026-06-25",
    assunto: "Declaração de vínculo empregatício",
    mensagens: [
      {
        autor: "Camila Ferreira",
        papel: "Colaborador",
        em: "2026-06-24",
        texto: "Preciso de uma declaração de vínculo para financiamento.",
      },
      {
        autor: "Letícia Almeida",
        papel: "RH",
        em: "2026-06-25",
        texto: "Declaração gerada e disponível na aba Documentos.",
      },
    ],
  },
  {
    id: "s-003",
    numero: "#4823",
    solicitante: "Marcos Lima",
    categoria: "Benefício",
    prioridade: "Alta",
    status: "Em análise",
    responsavel: "Ana Paula Martins",
    abertaEm: "2026-06-28",
    slaHoras: 24,
    slaRestanteHoras: 3,
    atualizadoEm: "2026-06-29",
    assunto: "Inclusão de dependente no plano de saúde",
    mensagens: [
      {
        autor: "Marcos Lima",
        papel: "Colaborador",
        em: "2026-06-28",
        texto: "Solicito a inclusão da minha filha no plano de saúde.",
      },
    ],
  },
  {
    id: "s-004",
    numero: "#4824",
    solicitante: "Bruno Martins",
    categoria: "Reembolso",
    prioridade: "Média",
    status: "Aguardando colaborador",
    responsavel: "Letícia Almeida",
    abertaEm: "2026-06-27",
    slaHoras: 48,
    slaRestanteHoras: 20,
    atualizadoEm: "2026-06-28",
    assunto: "Reembolso de curso de capacitação",
    mensagens: [
      {
        autor: "Bruno Martins",
        papel: "Colaborador",
        em: "2026-06-27",
        texto: "Envio o comprovante do curso para reembolso.",
      },
      {
        autor: "Letícia Almeida",
        papel: "RH",
        em: "2026-06-28",
        texto: "Falta a nota fiscal legível. Pode reenviar?",
      },
    ],
  },
  {
    id: "s-005",
    numero: "#4825",
    solicitante: "Amanda Ribeiro",
    categoria: "Alteração cadastral",
    prioridade: "Baixa",
    status: "Novo",
    responsavel: "Não atribuído",
    abertaEm: "2026-06-30",
    slaHoras: 24,
    slaRestanteHoras: 22,
    atualizadoEm: "2026-06-30",
    assunto: "Atualização de endereço residencial",
    mensagens: [
      {
        autor: "Amanda Ribeiro",
        papel: "Colaborador",
        em: "2026-06-30",
        texto: "Mudei de endereço, segue comprovante atualizado.",
      },
    ],
  },
  {
    id: "s-006",
    numero: "#4826",
    solicitante: "João Victor",
    categoria: "Dúvida trabalhista",
    prioridade: "Média",
    status: "Em análise",
    responsavel: "Ana Paula Martins",
    abertaEm: "2026-06-29",
    slaHoras: 48,
    slaRestanteHoras: 31,
    atualizadoEm: "2026-06-30",
    assunto: "Dúvida sobre banco de horas",
    mensagens: [
      {
        autor: "João Victor",
        papel: "Colaborador",
        em: "2026-06-29",
        texto: "Como funciona a compensação do banco de horas?",
      },
    ],
  },
  {
    id: "s-007",
    numero: "#4827",
    solicitante: "Patrícia Gomes",
    categoria: "Solicitação ao DP",
    prioridade: "Alta",
    status: "Aguardando gestor",
    responsavel: "Letícia Almeida",
    abertaEm: "2026-06-28",
    slaHoras: 24,
    slaRestanteHoras: -2,
    atualizadoEm: "2026-06-29",
    assunto: "Correção de holerite do mês",
    mensagens: [
      {
        autor: "Patrícia Gomes",
        papel: "Colaborador",
        em: "2026-06-28",
        texto: "Encontrei uma divergência de valor no meu holerite.",
      },
    ],
  },
  {
    id: "s-008",
    numero: "#4828",
    solicitante: "Felipe Nunes",
    categoria: "Documento",
    prioridade: "Baixa",
    status: "Resolvido",
    responsavel: "Ana Paula Martins",
    abertaEm: "2026-06-22",
    slaHoras: 48,
    slaRestanteHoras: 0,
    atualizadoEm: "2026-06-23",
    assunto: "Segunda via do contrato de trabalho",
    mensagens: [
      {
        autor: "Felipe Nunes",
        papel: "Colaborador",
        em: "2026-06-22",
        texto: "Preciso da segunda via do meu contrato.",
      },
      {
        autor: "Ana Paula Martins",
        papel: "RH",
        em: "2026-06-23",
        texto: "Documento disponibilizado na sua central.",
      },
    ],
  },
];

/** FAQ com respostas automáticas para dúvidas frequentes. */
export const faq: { pergunta: string; resposta: string }[] = [
  {
    pergunta: "Como solicito minhas férias?",
    resposta:
      "Abra uma solicitação na categoria Férias informando o período desejado. O RH valida o saldo e encaminha ao seu gestor para aprovação.",
  },
  {
    pergunta: "Onde encontro meus documentos e declarações?",
    resposta:
      "Todos os seus documentos ficam na aba Documentos do seu dossiê. Declarações podem ser solicitadas pela central e ficam disponíveis em até 24h.",
  },
  {
    pergunta: "Como incluo um dependente no plano de saúde?",
    resposta:
      "Abra uma solicitação na categoria Benefício, anexe a documentação do dependente e o RH processa a inclusão junto à operadora.",
  },
  {
    pergunta: "Qual o prazo de resposta das solicitações?",
    resposta:
      "Cada categoria tem um SLA próprio (24h a 48h). O prazo restante fica visível no acompanhamento do seu chamado.",
  },
  {
    pergunta: "Como funciona o reembolso de despesas?",
    resposta:
      "Abra a solicitação na categoria Reembolso, anexe a nota fiscal legível e aguarde a validação. O crédito segue na próxima folha.",
  },
];
