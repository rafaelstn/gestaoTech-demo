import {
  BarChart3,
  CalendarDays,
  FileText,
  Gift,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Target,
  UserMinus,
  UserPlus,
  Users,
  UserSearch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Descrição usada na central de demonstração (/demo). */
  descricao: string;
  /** Rótulo curto para o card de demo. */
  cardTitulo: string;
  grupo: "Operação" | "Pessoas" | "Conformidade" | "Configuração";
}

export const navItems: NavItem[] = [
  {
    label: "Visão Geral",
    href: "/dashboard",
    icon: LayoutDashboard,
    cardTitulo: "Dashboard do RH",
    descricao: "Centro de comando com indicadores, gráficos e alertas operacionais.",
    grupo: "Operação",
  },
  {
    label: "Recrutamento",
    href: "/recrutamento",
    icon: UserSearch,
    cardTitulo: "Recrutamento e Seleção",
    descricao: "Vagas, candidatos e funil do processo seletivo ponta a ponta.",
    grupo: "Pessoas",
  },
  {
    label: "Admissão",
    href: "/admissao",
    icon: UserPlus,
    cardTitulo: "Admissão Digital",
    descricao: "Pipeline de admissão do candidato aprovado ao colaborador ativo.",
    grupo: "Pessoas",
  },
  {
    label: "Colaboradores",
    href: "/colaboradores",
    icon: Users,
    cardTitulo: "Colaboradores",
    descricao: "Dossiê funcional completo de cada colaborador da empresa.",
    grupo: "Pessoas",
  },
  {
    label: "Solicitações",
    href: "/solicitacoes",
    icon: Inbox,
    cardTitulo: "Solicitações Internas",
    descricao: "Central de atendimento do RH com SLA, categorias e histórico.",
    grupo: "Operação",
  },
  {
    label: "Documentos",
    href: "/documentos",
    icon: FileText,
    cardTitulo: "Documentos e Arquivos",
    descricao: "Gestão documental com validade, status e ciclo de assinatura.",
    grupo: "Operação",
  },
  {
    label: "Férias e Afastamentos",
    href: "/ferias-afastamentos",
    icon: CalendarDays,
    cardTitulo: "Férias e Afastamentos",
    descricao: "Controle de férias, licenças, afastamentos e retornos.",
    grupo: "Pessoas",
  },
  {
    label: "Treinamentos",
    href: "/treinamentos",
    icon: GraduationCap,
    cardTitulo: "Treinamentos",
    descricao: "Trilhas internas, obrigatórias e de integração com validade.",
    grupo: "Pessoas",
  },
  {
    label: "Desempenho",
    href: "/desempenho",
    icon: Target,
    cardTitulo: "Desempenho",
    descricao: "Ciclos de avaliação, feedback, PDI e histórico de desenvolvimento.",
    grupo: "Pessoas",
  },
  {
    label: "Benefícios",
    href: "/beneficios",
    icon: Gift,
    cardTitulo: "Benefícios",
    descricao: "Elegibilidade, inclusões, dependentes e custo por benefício.",
    grupo: "Operação",
  },
  {
    label: "Desligamentos",
    href: "/desligamentos",
    icon: UserMinus,
    cardTitulo: "Desligamentos",
    descricao: "Offboarding organizado com checklist e revogação de acessos.",
    grupo: "Pessoas",
  },
  {
    label: "NR-1 e Conformidade",
    href: "/nr1-conformidade",
    icon: ShieldCheck,
    cardTitulo: "NR-1 e Conformidade",
    descricao: "Apoio à organização de evidências, responsáveis e ações corretivas.",
    grupo: "Conformidade",
  },
  {
    label: "Relatórios",
    href: "/relatorios",
    icon: BarChart3,
    cardTitulo: "Relatórios",
    descricao: "Visão executiva para RH e diretoria com exportação simulada.",
    grupo: "Operação",
  },
  {
    label: "Configurações",
    href: "/configuracoes",
    icon: Settings,
    cardTitulo: "Configurações",
    descricao: "Empresa, usuários, permissões, automações, segurança e logs.",
    grupo: "Configuração",
  },
];

/** Itens navegáveis a partir da central de demo (todos menos config, que aparece no fim). */
export const demoCards = navItems;
