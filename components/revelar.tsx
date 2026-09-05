"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Aparición al entrar en pantalla, escalonada dentro de su grupo.
 *
 * El estado de reposo es visible: si el JavaScript no corre, no queda
 * nada escondido esperando a un observador.
 */
export function Revelar({
  children,
  className,
  orden = 0,
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  orden?: number;
  as?: "div" | "article" | "section";
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.dataset.visto = "si";
      return;
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.visto = "si";
          obs.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("revelar", className)}
      style={{ ["--retraso" as string]: `${orden * 70}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
