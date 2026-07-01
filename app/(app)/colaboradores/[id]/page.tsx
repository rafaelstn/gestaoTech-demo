import { notFound } from "next/navigation";
import { colaboradores, colaboradorPorId } from "@/lib/mock";
import { DossieColaborador } from "@/components/modules/DossieColaborador";

export function generateStaticParams() {
  return colaboradores.map((c) => ({ id: c.id }));
}

export default async function ColaboradorDetalhe({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const colaborador = colaboradorPorId(id);
  if (!colaborador) notFound();

  return <DossieColaborador colaborador={colaborador} />;
}
