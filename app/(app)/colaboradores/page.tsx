"use client";

import Link from "next/link";
import { Activity, CalendarClock, FileWarning, GraduationCap, UserCheck, Users } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Avatar } from "@/components/ui";
import { CrudList, type ColumnDef, type FieldDef, type FiltroDef } from "@/components/data/CrudList";
import { areas, colaboradores, gestores, unidades } from "@/lib/mock";
import { data } from "@/lib/format";
import type { Colaborador } from "@/lib/types";

const STATUS = ["Ativo", "Em experiência", "Afastado", "Em férias", "Desligado"];

const columns: ColumnDef<Colaborador>[] = [
  {
    key: "nome",
    header: "Colaborador",
    render: (c) => (
      <Link href={`/colaboradores/${c.id}`} className="flex items-center gap-3 group">
        <Avatar nome={c.nome} size="sm" />
        <div>
          <div className="font-medium text-brand-900 group-hover:text-tech-700">{c.nome}</div>
          <div className="text-xs text-slate-400">{c.matricula}</div>
        </div>
      </Link>
    ),
  },
  { key: "cargo", header: "Cargo" },
  { key: "area", header: "Área" },
  { key: "gestor", header: "Gestor" },
  { key: "unidade", header: "Unidade" },
  { key: "status", header: "Status", render: (c) => <StatusBadge status={c.status} /> },
  { key: "admissao", header: "Admissão", render: (c) => data(c.admissao) },
  {
    key: "documentosPendentes",
    header: "Docs",
    align: "center",
    render: (c) =>
      c.documentosPendentes > 0 ? (
        <span className="font-medium text-amber-600">{c.documentosPendentes}</span>
      ) : (
        <span className="text-emerald-600">ok</span>
      ),
  },
];

const fields: FieldDef[] = [
  { name: "nome", label: "Nome completo", type: "text", required: true },
  { name: "cargo", label: "Cargo", type: "text", required: true },
  { name: "area", label: "Área", type: "select", options: areas },
  { name: "gestor", label: "Gestor", type: "select", options: gestores },
  { name: "unidade", label: "Unidade", type: "select", options: unidades },
  { name: "status", label: "Status", type: "select", options: STATUS },
  { name: "email", label: "E-mail", type: "text", placeholder: "nome@grupoalfa.com.br" },
  { name: "telefone", label: "Telefone", type: "text", placeholder: "(11) 90000-0000" },
  { name: "matricula", label: "Matrícula", type: "text", placeholder: "GA-0000" },
];

const filtros: FiltroDef[] = [
  { key: "area", label: "Área", options: areas },
  { key: "status", label: "Status", options: STATUS },
  { key: "unidade", label: "Unidade", options: unidades },
];

const template: Omit<Colaborador, "id"> = {
  nome: "",
  cargo: "",
  area: "Administrativo",
  gestor: gestores[0],
  unidade: "Matriz São Paulo",
  status: "Em experiência",
  admissao: "2026-06-30",
  email: "",
  telefone: "",
  matricula: "GA-novo",
  documentosPendentes: 0,
  treinamentosPendentes: 0,
};

export default function ColaboradoresPage() {
  const ativos = colaboradores.filter((c) => c.status === "Ativo").length;
  const experiencia = colaboradores.filter((c) => c.status === "Em experiência").length;
  const afastados = colaboradores.filter((c) => c.status === "Afastado").length;
  const ferias = colaboradores.filter((c) => c.status === "Em férias").length;
  const docsPend = colaboradores.reduce((a, c) => a + c.documentosPendentes, 0);
  const treinoPend = colaboradores.reduce((a, c) => a + c.treinamentosPendentes, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Colaboradores"
        description="Dossiê funcional de cada colaborador do Grupo Alfa Serviços."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Ativos" value={ativos} icon={UserCheck} tone="success" />
        <StatCard label="Em experiência" value={experiencia} icon={Users} tone="info" />
        <StatCard label="Afastados" value={afastados} icon={Activity} tone="warning" />
        <StatCard label="Em férias" value={ferias} icon={CalendarClock} tone="info" />
        <StatCard label="Docs pendentes" value={docsPend} icon={FileWarning} tone="warning" />
        <StatCard label="Treinos pendentes" value={treinoPend} icon={GraduationCap} tone="danger" />
      </div>

      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <CrudList<Colaborador>
          itensIniciais={colaboradores}
          columns={columns}
          fields={fields}
          filtros={filtros}
          buscaKeys={["nome", "cargo", "email", "matricula"]}
          buscaPlaceholder="Buscar por nome, cargo, e-mail..."
          entidade="colaborador"
          template={template}
          prefixoId="c"
        />
      </div>
    </div>
  );
}
