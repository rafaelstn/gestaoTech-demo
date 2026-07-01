/**
 * Tokens espelhados de globals.css (@theme) para consumo em JS.
 * Recharts e outros que recebem cor por prop não enxergam classe Tailwind,
 * então a paleta vive aqui também. Manter os dois lados em sincronia.
 */

export const brand = {
  50: "#eef4fb",
  100: "#d6e4f5",
  200: "#aec9eb",
  300: "#7fa8dc",
  400: "#4e82c7",
  500: "#2c63ae",
  600: "#1e4e90",
  700: "#183f75",
  800: "#14335d",
  900: "#0f2743",
  950: "#0a1a2e",
} as const;

export const tech = {
  50: "#ecf3ff",
  100: "#dbe8ff",
  200: "#bfd5ff",
  300: "#93b7ff",
  400: "#6090ff",
  500: "#3b6ff5",
  600: "#2456e0",
  700: "#1b44be",
  800: "#1c3d9a",
  900: "#1d397a",
  950: "#15224a",
} as const;

/** Cores semânticas de status (fixas; a semântica de negócio fica na lógica de KPI). */
export const status = {
  success: "#16a34a",
  successBg: "#dcfce7",
  warning: "#d97706",
  warningBg: "#fef3c7",
  danger: "#dc2626",
  dangerBg: "#fee2e2",
  info: "#2456e0",
  infoBg: "#dbe8ff",
  neutral: "#64748b",
  neutralBg: "#f1f5f9",
} as const;

/** Sequência de cores para séries de gráfico (categorias, pizzas, barras empilhadas). */
export const chartSeries = [
  tech[500],
  brand[500],
  "#0ea5e9",
  "#8b5cf6",
  "#14b8a6",
  "#f59e0b",
  "#ec4899",
  "#64748b",
] as const;

export const chartGrid = "#e2e8f0";
export const chartAxis = "#94a3b8";
