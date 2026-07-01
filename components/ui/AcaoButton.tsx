"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "./Button";
import { Modal } from "./Modal";

/**
 * Botão de ação sem backend (demo): abre confirmação e mostra sucesso visual.
 * Substitui window.confirm/alert. Usado em "Gerar contrato", "Validar documentos" etc.
 */
export function AcaoButton({
  label,
  icon: Icon,
  variant = "primary",
  size = "md",
  titulo,
  descricao,
  confirmarLabel = "Confirmar",
  sucessoTitulo = "Ação registrada",
  sucessoMensagem,
  className,
}: {
  label: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "subtle";
  size?: "sm" | "md";
  titulo: string;
  descricao: string;
  confirmarLabel?: string;
  sucessoTitulo?: string;
  sucessoMensagem?: string;
  className?: string;
}) {
  const [aberto, setAberto] = useState(false);
  const [feito, setFeito] = useState(false);

  const fechar = () => {
    setAberto(false);
    // reset após a animação de saída
    setTimeout(() => setFeito(false), 200);
  };

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setAberto(true)}>
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </Button>

      <Modal
        open={aberto}
        onClose={fechar}
        title={feito ? sucessoTitulo : titulo}
        description={feito ? undefined : descricao}
        footer={
          feito ? (
            <Button variant="primary" onClick={fechar}>
              Entendi
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={fechar}>
                Cancelar
              </Button>
              <Button
                variant={variant === "danger" ? "danger" : "primary"}
                onClick={() => setFeito(true)}
              >
                {confirmarLabel}
              </Button>
            </>
          )
        }
      >
        {feito && (
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <p className="text-sm text-slate-600">
              {sucessoMensagem ??
                "Registrado com sucesso. Nesta demonstração a ação é simulada; em produção o fluxo dispara as automações configuradas."}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
