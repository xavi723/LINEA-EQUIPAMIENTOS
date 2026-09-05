"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Número que cuenta hasta su valor al entrar en pantalla.
 *
 * Tres diferencias con la versión de referencia, y el motivo de cada una:
 *
 * 1. `useGrouping`. Intl agrupa de a miles por defecto, así que un año
 *    saldría "1,959". Los años se escriben sin separador, y ese es el
 *    caso principal acá.
 * 2. Sin colores en la clase base. El original trae `text-black
 *    dark:text-white`; en este sitio el color lo pone el sistema de
 *    diseño y las cifras van sobre una foto oscura.
 * 3. Arranca mostrando el valor final. El original renderiza un span
 *    vacío hasta que el resorte emite el primer valor: sin JavaScript,
 *    o antes de hidratar, no se ve ningún número. Acá el servidor
 *    entrega la cifra y el cliente la lleva a cero antes de pintar.
 */
export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  useGrouping = true,
  damping = 60,
  stiffness = 100,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  /** Retraso antes de arrancar, en segundos. */
  delay?: number;
  decimalPlaces?: number;
  useGrouping?: boolean;
  /**
   * El resorte. Los valores por defecto son los de la versión de
   * referencia, calibrados para su demo, que cuenta hasta 100. Un número
   * de cuatro cifras necesita una precisión relativa mucho más fina para
   * dar en el entero exacto, y con estos valores tarda casi cinco
   * segundos: para esos casos conviene subir la rigidez.
   */
  damping?: number;
  stiffness?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
    // El resorte se da por llegado cuando está a menos de medio dígito
    // del destino. Con el umbral por defecto seguía corriendo varios
    // segundos dentro del último entero, y en ese rato la pantalla
    // mostraba 1958 en lugar de 1959.
    restDelta: 0.5 / Math.pow(10, decimalPlaces),
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const formatear = (n: number) =>
    Intl.NumberFormat("es-AR", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
      useGrouping,
    }).format(Number(n.toFixed(decimalPlaces)));

  // Quien pidió menos movimiento ve la cifra quieta, no una animación
  // más lenta: un número que salta solo es justamente lo que molesta.
  const sinMovimiento =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (sinMovimiento || !ref.current) return;
    ref.current.textContent = formatear(direction === "down" ? value : 0);
    // Solo al montar: deja la cifra en el punto de partida antes de que
    // el observador la dispare.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sinMovimiento || !isInView) return;
    const t = setTimeout(() => {
      motionValue.set(direction === "down" ? 0 : value);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [motionValue, isInView, delay, value, direction, sinMovimiento]);

  useEffect(() => {
    const enCambio = springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = formatear(latest);
    });

    // Un resorte sobreamortiguado se acerca al destino sin tocarlo, y el
    // último valor que emite puede redondear para abajo: el año 1959
    // quedaba en 1958. Al terminar se escribe la cifra exacta.
    const alTerminar = springValue.on("animationComplete", () => {
      if (ref.current) ref.current.textContent = formatear(value);
    });

    return () => {
      enCambio();
      alTerminar();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [springValue, decimalPlaces, useGrouping, value]);

  return (
    <span className={cn("inline-block tabular-nums", className)} ref={ref}>
      {formatear(direction === "down" ? value : value)}
    </span>
  );
}
