import { cn } from "@/lib/cn";

/** Marca do símbolo: quadrado com gradiente brand→tech e um "check + pessoas" estilizado. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-tech-500 shadow-sm",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[62%] w-[62%]">
        <path
          d="M4 17.5c0-2.2 1.9-3.5 4-3.5s4 1.3 4 3.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="8" cy="9" r="2.4" stroke="white" strokeWidth="1.8" />
        <path
          d="M13.5 12.5l2.4 2.4 4.1-4.4"
          stroke="white"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Logo completo: símbolo + wordmark. `tone` controla a cor do texto. */
export function Logo({
  tone = "dark",
  size = "md",
  showSignature = false,
  className,
}: {
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  showSignature?: boolean;
  className?: string;
}) {
  const markSize = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const titleSize = size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";
  const titleColor = tone === "light" ? "text-white" : "text-brand-900";
  const subColor = tone === "light" ? "text-tech-200" : "text-slate-500";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={markSize} />
      <div className="leading-tight">
        <div className={cn("font-semibold tracking-tight", titleSize, titleColor)}>
          Gestão Tech <span className="text-tech-500">RH</span>
        </div>
        {showSignature && (
          <div className={cn("text-[10px] font-medium", subColor)}>uma solução DamaTech</div>
        )}
      </div>
    </div>
  );
}
