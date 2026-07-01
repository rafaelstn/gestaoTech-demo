"use client";

import { Briefcase, TrendingUp, UserCheck, Users } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Badge, Card, CardHeader, CardBody } from "@/components/ui";
import { AcaoButton } from "@/components/ui/AcaoButton";
import { CrudList, type ColumnDef, type FieldDef, type FiltroDef } from "@/components/data/CrudList";
import { TableWrap, THead, Th, TBody, Tr, Td } from "@/components/ui/Table";
import { areas, candidatos, funil, unidades, vagas } from "@/lib/mock";
import { data } from "@/lib/format";
import type { PrioridadeVaga, Vaga } from "@/lib/types";
import { cn } from "@/lib/cn";

const STATUS_VAGA = ["Aberta", "Em andamento", "Congelada", "Fechada"];
const PRIORIDADES = ["Alta", "Média", "Baixa"];
const RESP = ["Renata Aquino", "Paulo Tavares", "Cláudia Bernardes", "Sérgio Vasconcelos", "Débora Antunes"];

const PRIO_TONE: Record<PrioridadeVaga, "danger" | "warning" | "neutral"> = { Alta: "danger", Média: "warning", Baixa: "neutral" };

const columns: ColumnDef<Vaga>[] = [
  { key: "titulo", header: "Vaga", render: (v) => (
    <div>
      <div className="font-medium text-brand-900">{v.titulo}</div>
      <div className="text-xs text-slate-400">{v.area} · {v.unidade}</div>
    </div>
  ) },
  { key: "responsavel", header: "Responsável" },
  { key: "status", header: "Status", render: (v) => <StatusBadge status={v.status} /> },
  { key: "prioridade", header: "Prioridade", render: (v) => <Badge tone={PRIO_TONE[v.prioridade]} dot>{v.prioridade}</Badge> },
  { key: "candidatos", header: "Candidatos", align: "center" },
  { key: "etapaAtual", header: "Etapa atual" },
  { key: "prazoFechamento", header: "Prazo", render: (v) => data(v.prazoFechamento) },
];

const fields: FieldDef[] = [
  { name: "titulo", label: "Título da vaga", type: "text", required: true },
  { name: "area", label: "Área", type: "select", options: areas },
  { name: "unidade", label: "Unidade", type: "select", options: unidades },
  { name: "responsavel", label: "Responsável", type: "select", options: RESP },
  { name: "status", label: "Status", type: "select", options: STATUS_VAGA },
  { name: "prioridade", label: "Prioridade", type: "select", options: PRIORIDADES },
  { name: "prazoFechamento", label: "Prazo de fechamento", type: "date" },
];

const filtros: FiltroDef[] = [
  { key: "status", label: "Status", options: STATUS_VAGA },
  { key: "prioridade", label: "Prioridade", options: PRIORIDADES },
  { key: "area", label: "Área", options: areas },
];

const template: Omit<Vaga, "id"> = {
  titulo: "", area: "Comercial", unidade: "Matriz São Paulo", responsavel: RESP[0],
  status: "Aberta", prioridade: "Média", candidatos: 0, etapaAtual: "Vaga aberta",
  prazoFechamento: "2026-08-01", abertaEm: "2026-06-30",
};

export default function RecrutamentoPage() {
  const abertas = vagas.filter((v) => v.status === "Aberta" || v.status === "Em andamento").length;
  const totalCandidatos = vagas.reduce((a, v) => a + v.candidatos, 0);
  const aprovados = candidatos.filter((c) => c.etapa === "Aprovado").length;
  const maxFunil = Math.max(...funil.map((f) => f.total));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recrutamento e Seleção"
        description="Vagas, candidatos e funil do processo seletivo ponta a ponta."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Vagas ativas" value={abertas} icon={Briefcase} tone="info" />
        <StatCard label="Candidatos no funil" value={totalCandidatos} icon={Users} tone="brand" />
        <StatCard label="Aprovados" value={aprovados} icon={UserCheck} tone="success" />
        <StatCard label="Taxa de conversão" value="3,7%" icon={TrendingUp} tone="info" />
      </div>

      {/* Funil */}
      <Card>
        <CardHeader title="Funil de seleção" subtitle="Candidatos por etapa" />
        <CardBody className="space-y-2.5">
          {funil.map((f) => (
            <div key={f.etapa} className="flex items-center gap-3">
              <span className="w-32 shrink-0 text-xs font-medium text-slate-500">{f.etapa}</span>
              <div className="h-6 flex-1 overflow-hidden rounded-md bg-slate-100">
                <div className={cn("flex h-full items-center justify-end rounded-md bg-gradient-to-r from-tech-500 to-brand-500 px-2 text-xs font-medium text-white")} style={{ width: `${(f.total / maxFunil) * 100}%` }}>
                  {f.total}
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Vagas */}
      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-brand-900">Vagas</h2>
        <CrudList<Vaga>
          itensIniciais={vagas}
          columns={columns}
          fields={fields}
          filtros={filtros}
          buscaKeys={["titulo", "responsavel"]}
          buscaPlaceholder="Buscar vaga, responsável..."
          entidade="vaga"
          entidadeArtigo="a"
          template={template}
          prefixoId="v"
        />
      </div>

      {/* Candidatos */}
      <div className="rounded-[var(--radius-card)] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-brand-900">Candidatos</h2>
        <TableWrap>
          <THead>
            <tr>
              <Th>Candidato</Th>
              <Th>Vaga</Th>
              <Th>Origem</Th>
              <Th>Etapa</Th>
              <Th align="center">Score</Th>
              <Th>Ação recomendada</Th>
              <Th align="right"></Th>
            </tr>
          </THead>
          <TBody>
            {candidatos.map((c) => (
              <Tr key={c.id}>
                <Td className="font-medium text-brand-900">{c.nome}</Td>
                <Td>{c.vaga}</Td>
                <Td>{c.origem}</Td>
                <Td><StatusBadge status={c.etapa === "Aprovado" ? "Aprovado" : c.etapa === "Reprovado" ? "Reprovado" : "Em andamento"} dot={false} /></Td>
                <Td align="center">
                  <span className={cn("font-semibold", c.score >= 85 ? "text-emerald-600" : c.score >= 70 ? "text-amber-600" : "text-slate-500")}>{c.score}</span>
                </Td>
                <Td className="text-slate-500">{c.acaoRecomendada}</Td>
                <Td align="right">
                  <AcaoButton label="Aplicar" size="sm" variant="subtle" titulo={c.acaoRecomendada} descricao={`Executar "${c.acaoRecomendada}" para ${c.nome}?`} confirmarLabel="Confirmar" />
                </Td>
              </Tr>
            ))}
          </TBody>
        </TableWrap>
      </div>
    </div>
  );
}
