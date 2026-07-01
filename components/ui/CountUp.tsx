"use client";

import { useEffect, useRef, useState } from "react";

/** Anima de 0 até `value` ao entrar na tela. Respeita prefers-reduced-motion. */
export function CountUp({
  value,
  duration = 1000,
  decimals = 0,
  format,
}: {
  value: number;
  duration?: number;
  decimals?: number;
  format?: (n: number) => string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const anima = () => {
      if (started.current) return;
      started.current = true;
      const inicio = performance.now();
      const passo = (agora: number) => {
        const t = Math.min(1, (agora - inicio) / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(value * eased);
        if (t < 1) requestAnimationFrame(passo);
        else setDisplay(value);
      };
      requestAnimationFrame(passo);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          anima();
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  const texto = format ? format(display) : display.toFixed(decimals);
  return <span ref={ref}>{texto}</span>;
}
