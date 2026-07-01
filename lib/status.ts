import type { Tone } from "@/lib/types";

/**
 * Mapa central de status -> tom visual.
 * Cobre os status de todos os domínios; o Badge usa isto para escolher a cor.
 * Chave é o texto exibido do status.
 */
const MAPA: Record<string, Tone> = {
  // Positivos / concluídos
  Ativo: "success",
  Válido: "success",
  Aprovada: "success",
  Aprovado: "success",
  Concluída: "success",
  "Concluído": "success",
  Resolvido: "success",
  Conforme: "success",
  Ativa: "success",

  // Em progresso / neutro informativo
  "Em experiência": "info",
  "Em férias": "info",
  "Em andamento": "info",
  "Em análise": "info",
  "Em avaliação": "info",
  "Em revisão": "info",
  "Autoavaliação": "info",
  Agendada: "info",
  Agendado: "info",
  Novo: "info",
  "Inclusão": "info",
  Aberta: "info",

  // Atenção / aguardando
  Pendente: "warning",
  "Aguardando aprovação": "warning",
  "Aguardando colaborador": "warning",
  "Aguardando gestor": "warning",
  "Aguardando assinatura": "warning",
  "Aguardando ciência": "warning",
  "Aguardando evidência": "warning",
  "Vence em breve": "warning",
  "Em validação": "warning",
  Congelada: "warning",
  Pausada: "warning",
  "Exclusão": "warning",

  // Crítico / negativo
  Vencido: "danger",
  "Em atraso": "danger",
  "Sem evidência": "danger",
  Afastado: "danger",
  Reprovado: "danger",
  Desligado: "neutral",
  Cancelado: "neutral",

  // Criticidade
  "Crítica": "danger",
  Alta: "danger",
  "Média": "warning",
  Baixa: "neutral",
};

export function toneDoStatus(status: string): Tone {
  return MAPA[status] ?? "neutral";
}
