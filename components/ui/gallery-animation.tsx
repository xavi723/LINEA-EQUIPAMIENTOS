"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Galería expansible: una tira de fotos donde la que está bajo el mouse
 * se ensancha y las demás se achican. Al hacer clic, la foto se abre a
 * pantalla completa y se puede recorrer con las flechas.
 *
 * Diferencias con la versión de referencia, y el motivo de cada una:
 *
 * - **Cada foto trae su texto alternativo.** El original las numera
 *   («Gallery image 3»), que para un lector de pantalla no dice nada.
 * - **La lupa se ve en un sitio claro.** El original pinta el fondo de
 *   blanco y los botones de blanco: en modo claro quedaban invisibles.
 *   Acá el fondo es la tinta de la marca y los controles van en papel.
 * - **Teclado.** Escape cierra, las flechas recorren, el foco entra al
 *   visor y vuelve a la foto que lo abrió. El original solo respondía
 *   al mouse.
 * - **Movimiento reducido.** Con la preferencia activada no hay
 *   ensanchado ni escala: solo el cambio de opacidad, que es el que
 *   explica qué pasó.
 * - **En pantalla táctil la tira no se ensancha** — no hay mouse que la
 *   dispare — así que pasa a ser un carrusel que se desliza, con cada
 *   foto en su proporción real.
 */

export interface FotoGaleria {
  src: string;
  alt: string;
  /** Proporción real, para el carrusel de pantallas chicas. */
  ancho?: number;
  alto?: number;
}

export interface ExpandableGalleryProps {
  fotos: FotoGaleria[];
  className?: string;
}

export function ExpandableGallery({ fotos, className }: ExpandableGalleryProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [abierta, setAbierta] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const visorRef = useRef<HTMLDivElement | null>(null);
  const disparador = useRef<HTMLButtonElement | null>(null);

  const cerrar = useCallback(() => {
    setAbierta(null);
    disparador.current?.focus();
  }, []);

  const mover = useCallback(
    (paso: number) =>
      setAbierta((i) => (i === null ? i : (i + paso + fotos.length) % fotos.length)),
    [fotos.length],
  );

  // Teclado del visor. Vive en el documento porque el visor es un
  // overlay: si el foco se escapa, las teclas tienen que seguir andando.
  useEffect(() => {
    if (abierta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    document.addEventListener("keydown", onKey);
    visorRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [abierta, cerrar, mover]);

  const ancho = (i: number) => {
    if (reduce || hovered === null) return 1;
    return hovered === i ? 2.4 : 0.6;
  };

  return (
    <div className={className}>
      <ul className="galeria-tira">
        {fotos.map((f, i) => (
          <motion.li
            key={f.src}
            className="galeria-tira__item"
            style={{
              flex: 1,
              ["--proporcion" as string]:
                f.ancho && f.alto ? `${f.ancho} / ${f.alto}` : "4 / 3",
            }}
            animate={{ flex: ancho(i) }}
            transition={{ duration: reduce ? 0 : 0.45, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <button
              type="button"
              className="galeria-tira__boton"
              aria-label={`Ampliar: ${f.alt}`}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={(e) => {
                disparador.current = e.currentTarget;
                setAbierta(i);
              }}
            >
              {/* Fotos ya optimizadas y servidas desde el propio dominio. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} loading={i < 3 ? "eager" : "lazy"} />
              <motion.span
                aria-hidden="true"
                className="galeria-tira__velo"
                initial={false}
                animate={{ opacity: hovered === i ? 0 : 0.28 }}
                transition={{ duration: reduce ? 0 : 0.28 }}
              />
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {abierta !== null ? (
          <motion.div
            ref={visorRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${abierta + 1} de ${fotos.length}`}
            className="galeria-visor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={cerrar}
          >
            <button
              type="button"
              className="galeria-visor__control galeria-visor__cerrar"
              aria-label="Cerrar"
              onClick={cerrar}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 18 18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {fotos.length > 1 ? (
              <button
                type="button"
                className="galeria-visor__control galeria-visor__anterior"
                aria-label="Foto anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  mover(-1);
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : null}

            <motion.img
              key={fotos[abierta].src}
              src={fotos[abierta].src}
              alt={fotos[abierta].alt}
              className="galeria-visor__foto"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: reduce ? 0 : 0.26, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
            />

            {fotos.length > 1 ? (
              <button
                type="button"
                className="galeria-visor__control galeria-visor__siguiente"
                aria-label="Foto siguiente"
                onClick={(e) => {
                  e.stopPropagation();
                  mover(1);
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : null}

            <p className="galeria-visor__pie">
              <span className="dato">
                {abierta + 1} / {fotos.length}
              </span>
              <span>{fotos[abierta].alt}</span>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default ExpandableGallery;

/** Alias en inglés, por si se busca con el nombre del paquete original. */
export const GalleryAnimation = ExpandableGallery;
