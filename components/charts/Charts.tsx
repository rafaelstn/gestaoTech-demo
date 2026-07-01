"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PontoSerie } from "@/lib/types";
import { brand, chartAxis, chartGrid, chartSeries, status, tech } from "@/lib/theme/tokens";

const AXIS = { fontSize: 12, fill: chartAxis };
const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  fontSize: 12,
  boxShadow: "0 4px 16px rgba(15,39,67,0.08)",
};

/** Área com gradiente — tendências (headcount, turnover). */
export function AreaTrend({
  data,
  dataKey,
  color = tech[500],
  height = 240,
}: {
  data: PontoSerie[];
  dataKey: string;
  color?: string;
  height?: number;
}) {
  const id = `grad-${dataKey}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} width={40} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#${id})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Barras verticais — categorias. */
export function BarSeries({
  data,
  dataKey,
  color = brand[500],
  height = 240,
}: {
  data: PontoSerie[];
  dataKey: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} interval={0} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} width={40} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f1f5f9" }} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={44} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Barras agrupadas — duas séries (ex.: concluídos x vencidos). */
export function BarGrouped({
  data,
  keys,
  height = 240,
}: {
  data: PontoSerie[];
  keys: { key: string; label: string; color: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} width={40} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f1f5f9" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
        {keys.map((k) => (
          <Bar key={k.key} dataKey={k.key} name={k.label} fill={k.color} radius={[6, 6, 0, 0]} maxBarSize={28} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Linha simples — evolução percentual. */
export function LineTrend({
  data,
  dataKey,
  color = status.info,
  height = 240,
}: {
  data: PontoSerie[];
  dataKey: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} width={40} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/** Donut — distribuição/composição. */
export function DonutChart({
  data,
  dataKey = "total",
  height = 240,
  colors = chartSeries as unknown as string[],
}: {
  data: PontoSerie[];
  dataKey?: string;
  height?: number;
  colors?: string[];
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey="label"
          innerRadius="58%"
          outerRadius="82%"
          paddingAngle={2}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
}
