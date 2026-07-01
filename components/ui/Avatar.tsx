import { iniciais } from "@/lib/format";
import { cn } from "@/lib/cn";

const PALETA = [
  "bg-brand-100 text-brand-700",
  "bg-tech-100 text-tech-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
];

/** Cor determinística a partir do nome (mesma pessoa, mesma cor sempre). */
function corDoNome(nome: string): string {
  let soma = 0;
  for (let i = 0; i < nome.length; i++) soma += nome.charCodeAt(i);
  return PALETA[soma % PALETA.length];
}

export function Avatar({
  nome,
  size = "md",
  className,
}: {
  nome: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim =
    size === "sm" ? "h-8 w-8 text-xs" : size === "lg" ? "h-14 w-14 text-lg" : "h-10 w-10 text-sm";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        dim,
        corDoNome(nome),
        className,
      )}
      title={nome}
    >
      {iniciais(nome)}
    </span>
  );
}
