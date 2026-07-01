import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Briefcase,
  CalendarClock,
  FileWarning,
  GraduationCap,
  Inbox,
  ShieldAlert,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react";
import { Card, CardBody, CardHeader, KpiCard, PageHeader } from "@/components/ui";
import { AreaTrend, BarGrouped, BarSeries, DonutChart, LineTrend } from "@/components/charts/Charts";
import { status as statusColors, tech } from "@/lib/theme/tokens";
import {
  alertas,
  documentosPorTipo,
  evolucaoHeadcount,
  kpis,
  solicitacoesPorCategoria,
  statusAdmissoes,
  treinamentosConcluidosVencidos,
  turnoverMensal,
} from "@/lib/mock";
import { cn } from "@/lib/cn";
import type { Tone } from "@/lib/types";

const ALERT_STYLE: Record<Tone, string> = {
  danger: "border-red-200 bg-red-50 text-red-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  info: "border-tech-200 bg-tech-50 text-tech-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
  brand: "border-brand-200 bg-brand-50 text-brand-700",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Visão Geral"
        description="Bom dia, Renata. Aqui está o panorama do RH do Grupo Alfa Serviços hoje."
        actions={
          <Link
            href="/relatorios"
            className="inline-flex items-center gap-2 rounded-lg bg-tech-600 px-4 py-2 text-sm font-medium text-white hover:bg-tech-700"
          >
            Ver relatórios
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <KpiCard label="Headcount total" value={kpis.headcount} icon={Users} tone="brand" delta={2.4} href="/colaboradores" />
        <KpiCard label="Vagas abertas" value={kpis.vagasAbertas} icon={Briefcase} tone="info" href="/recrutamento" />
        <KpiCard label="Admissões em andamento" value={kpis.admissoesAndamento} icon={UserPlus} tone="info" href="/admissao" />
        <KpiCard label="Documentos pendentes" value={kpis.documentosPendentes} icon={FileWarning} tone="warning" delta={-8} quedaBoa href="/documentos" />
        <KpiCard label="Solicitações abertas" value={kpis.solicitacoesAbertas} icon={Inbox} tone="info" href="/solicitacoes" />
        <KpiCard label="Férias próximas" value={kpis.feriasProximas} icon={CalendarClock} tone="info" href="/ferias-afastamentos" />
        <KpiCard label="Afastamentos ativos" value={kpis.afastamentosAtivos} icon={Activity} tone="warning" href="/ferias-afastamentos" />
        <KpiCard label="Treinamentos vencidos" value={kpis.treinamentosVencidos} icon={GraduationCap} tone="danger" delta={4} href="/treinamentos" />
        <KpiCard label="Desligamentos no mês" value={kpis.desligamentosMes} icon={UserMinus} tone="neutral" href="/desligamentos" />
        <KpiCard label="Pendências de conformidade" value={kpis.pendenciasConformidade} icon={ShieldAlert} tone="danger" href="/nr1-conformidade" />
      </div>

      {/* Alertas operacionais */}
      <Card>
        <CardHeader title="Alertas operacionais" subtitle="O que precisa da sua atenção agora" />
        <CardBody className="space-y-2.5">
          {alertas.map((a) => (
            <Link
              key={a.id}
              href={a.href}
              className={cn(
                "flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm transition-opacity hover:opacity-90",
                ALERT_STYLE[a.tone],
              )}
            >
              <span className="flex items-center gap-3">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span className="font-medium">{a.texto}</span>
              </span>
              <span className="hidden shrink-0 items-center gap-1 text-xs font-medium sm:flex">
                {a.modulo}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </CardBody>
      </Card>

      {/* Gráficos linha 1 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Evolução do headcount" subtitle="Últimos 6 meses" />
          <CardBody>
            <AreaTrend data={evolucaoHeadcount} dataKey="headcount" color={tech[500]} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Turnover mensal" subtitle="Percentual de rotatividade" />
          <CardBody>
            <LineTrend data={turnoverMensal} dataKey="turnover" color={statusColors.warning} />
          </CardBody>
        </Card>
      </div>

      {/* Gráficos linha 2 */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Solicitações por categoria" subtitle="Mês atual" />
          <CardBody>
            <BarSeries data={solicitacoesPorCategoria} dataKey="total" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Documentos pendentes por tipo" subtitle="A regularizar" />
          <CardBody>
            <DonutChart data={documentosPorTipo} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Status das admissões" subtitle="Em andamento" />
          <CardBody>
            <BarSeries data={statusAdmissoes} dataKey="total" color={statusColors.info} />
          </CardBody>
        </Card>
      </div>

      {/* Gráfico linha 3 */}
      <Card>
        <CardHeader title="Treinamentos concluídos x vencidos" subtitle="Evolução semestral" />
        <CardBody>
          <BarGrouped
            data={treinamentosConcluidosVencidos}
            keys={[
              { key: "concluidos", label: "Concluídos", color: statusColors.success },
              { key: "vencidos", label: "Vencidos", color: statusColors.danger },
            ]}
            height={280}
          />
        </CardBody>
      </Card>
    </div>
  );
}
