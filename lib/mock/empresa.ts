import type { Area, Unidade } from "@/lib/types";

/** Empresa fictícia da demo. */
export const empresa = {
  nome: "Grupo Alfa Serviços",
  cnpj: "12.345.678/0001-90",
  headcount: 186,
  unidadeSede: "Matriz São Paulo",
} as const;

export const unidades: Unidade[] = [
  "Matriz São Paulo",
  "Unidade Campinas",
  "Unidade Ribeirão Preto",
  "Unidade Belo Horizonte",
];

export const areas: Area[] = [
  "Administrativo",
  "Comercial",
  "Operações",
  "Financeiro",
  "Tecnologia",
  "Atendimento",
  "Logística",
  "Recursos Humanos",
];

export const cargos = [
  "Analista de RH",
  "Assistente Administrativo",
  "Vendedor Interno",
  "Coordenador Comercial",
  "Analista Financeiro",
  "Auxiliar de Operações",
  "Supervisor de Atendimento",
  "Desenvolvedor Front-end",
  "Gerente de Unidade",
  "Técnico de Segurança do Trabalho",
];

export const gestores = [
  "Renata Aquino",
  "Paulo Tavares",
  "Cláudia Bernardes",
  "Sérgio Vasconcelos",
  "Débora Antunes",
];

/** Distribuição de headcount por área — coerente com o total da empresa (186). */
export const headcountPorArea: { area: Area; total: number }[] = [
  { area: "Operações", total: 48 },
  { area: "Comercial", total: 39 },
  { area: "Atendimento", total: 27 },
  { area: "Logística", total: 22 },
  { area: "Administrativo", total: 18 },
  { area: "Tecnologia", total: 15 },
  { area: "Financeiro", total: 11 },
  { area: "Recursos Humanos", total: 6 },
];
