/** Formatadores PT-BR reutilizáveis. Texto sempre com acentuação correta. */

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const BRL_CENTAVOS = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const NUM = new Intl.NumberFormat("pt-BR");

/** Reais sem centavos: R$ 1.234 */
export function moeda(valor: number): string {
  return BRL.format(valor);
}

/** Reais com centavos: R$ 1.234,56 */
export function moedaCentavos(valor: number): string {
  return BRL_CENTAVOS.format(valor);
}

/** Número com separador de milhar PT-BR: 1.234 */
export function numero(valor: number): string {
  return NUM.format(valor);
}

/** Percentual: 12,5% (recebe 12.5, não 0.125) */
export function percentual(valor: number, casas = 0): string {
  return `${valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  })}%`;
}

/** ISO (YYYY-MM-DD) -> 30/06/2026 */
export function data(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  if (!ano || !mes || !dia) return iso;
  return `${dia}/${mes}/${ano}`;
}

/** ISO -> "30 jun" (curto, para eixos e listas) */
export function dataCurta(iso: string): string {
  const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const [, mes, dia] = iso.split("-");
  const idx = Number(mes) - 1;
  if (Number.isNaN(idx) || !meses[idx] || !dia) return iso;
  return `${dia} ${meses[idx]}`;
}

/** Dias entre hoje (referência fixa da demo) e a data alvo. Negativo = atrasado. */
export const HOJE_DEMO = "2026-06-30";

export function diasAte(iso: string, referencia = HOJE_DEMO): number {
  const alvo = Date.parse(`${iso}T00:00:00`);
  const base = Date.parse(`${referencia}T00:00:00`);
  return Math.round((alvo - base) / 86_400_000);
}

/** Iniciais para avatar: "Ana Paula Martins" -> "AM" */
export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}
