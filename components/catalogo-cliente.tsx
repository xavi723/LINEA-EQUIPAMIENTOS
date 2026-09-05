"use client";

import { useEffect, useRef, useState } from "react";

import { CATEGORIAS, PRODUCTOS, contarPiezas, type ClaveCategoria } from "@/lib/datos";
import { FichaProducto } from "@/components/ficha-producto";
import { Flecha } from "@/components/flecha";
import Link from "next/link";

type Estado = "" | "saliendo" | "entrando";

export function CatalogoCliente() {
  const [activas, setActivas] = useState<Set<ClaveCategoria>>(new Set());
  const [ocultos, setOcultos] = useState<Set<string>>(new Set());
  const [estados, setEstados] = useState<Record<string, Estado>>({});
  const [filtrando, setFiltrando] = useState(false);

  // Cada pasada lleva número: si alguien toca otra casilla antes de que
  // termine la anterior, la vieja se descarta en lugar de ocultar una
  // pieza que ya volvió a estar visible.
  const pasada = useRef(0);

  useEffect(() => {
    pasada.current += 1;
    const mia = pasada.current;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visible = (c: ClaveCategoria) => activas.size === 0 || activas.has(c);

    if (reduce) {
      setOcultos(new Set(PRODUCTOS.filter((p) => !visible(p.categoria)).map((p) => p.codigo)));
      setEstados({});
      return;
    }

    const entran = PRODUCTOS.filter((p) => visible(p.categoria) && ocultos.has(p.codigo));
    const salen = PRODUCTOS.filter((p) => !visible(p.categoria) && !ocultos.has(p.codigo));
    if (!entran.length && !salen.length) return;

    setEstados((prev) => {
      const sig = { ...prev };
      salen.forEach((p) => (sig[p.codigo] = "saliendo"));
      entran.forEach((p) => (sig[p.codigo] = "entrando"));
      return sig;
    });

    if (entran.length) {
      setOcultos((prev) => {
        const sig = new Set(prev);
        entran.forEach((p) => sig.delete(p.codigo));
        return sig;
      });
      // Dos cuadros: uno para que se pinte en su posición de partida y
      // otro para que la transición tenga desde dónde salir.
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setEstados((prev) => {
            const sig = { ...prev };
            entran.forEach((p) => (sig[p.codigo] = ""));
            return sig;
          }),
        ),
      );
    }

    if (salen.length) {
      const t = setTimeout(() => {
        if (pasada.current !== mia) return;
        setOcultos((prev) => {
          const sig = new Set(prev);
          salen.forEach((p) => sig.add(p.codigo));
          return sig;
        });
        setEstados((prev) => {
          const sig = { ...prev };
          salen.forEach((p) => (sig[p.codigo] = ""));
          return sig;
        });
      }, 150);
      return () => clearTimeout(t);
    }
    // `ocultos` se lee pero no debe reactivar el efecto: lo dispara el
    // cambio de filtros, no el resultado de la pasada anterior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activas]);

  const alternarFiltro = (clave: ClaveCategoria) => {
    setFiltrando(true);
    setActivas((prev) => {
      const sig = new Set(prev);
      if (sig.has(clave)) sig.delete(clave);
      else sig.add(clave);
      return sig;
    });
  };

  const visibles = PRODUCTOS.length - ocultos.size;

  return (
    <section className="seccion--ajustada env">
      <div className="cat-layout">
        <aside aria-label="Filtros">
          <div className="filtros__enc">
            <strong style={{ fontFamily: "var(--display)", fontSize: "var(--t-md)" }}>
              Filtros
            </strong>
            <button
              type="button"
              className="filtros__limpiar"
              onClick={() => {
                setFiltrando(true);
                setActivas(new Set());
              }}
            >
              Limpiar
            </button>
          </div>

          <fieldset style={{ border: 0, padding: 0, margin: "0 0 2rem" }}>
            <legend className="etiqueta" style={{ marginBottom: "0.75rem" }}>Familia</legend>
            {CATEGORIAS.map((c) => (
              <label key={c.clave} className="filtro__fila">
                <input
                  type="checkbox"
                  checked={activas.has(c.clave)}
                  onChange={() => alternarFiltro(c.clave)}
                />
                <span style={{ flex: 1 }}>{c.nombre}</span>
                <span className="dato" style={{ fontSize: "var(--t-xs)", color: "var(--humo)" }}>
                  {contarPiezas(c.clave)}
                </span>
              </label>
            ))}
          </fieldset>

          <div style={{ borderTop: "var(--borde)", paddingTop: "1.5rem" }}>
            <div className="etiqueta">¿No lo encontrás?</div>
            <p style={{ fontSize: "var(--t-sm)", color: "var(--humo)" }}>
              Fabricamos a medida. Contanos qué necesitás y te cotizamos.
            </p>
            <Link className="enlace-flecha" href="/contacto" style={{ marginTop: "1rem" }}>
              Consultar <Flecha className="" />
            </Link>
          </div>
        </aside>

        <div>
          <div className="catalogo__barra">
            <span className="dato" style={{ fontSize: "var(--t-sm)", color: "var(--humo)" }}>
              {visibles === PRODUCTOS.length
                ? `Mostrando las ${PRODUCTOS.length} piezas`
                : `Mostrando ${visibles} de ${PRODUCTOS.length} piezas`}
            </span>
            <span className="dato" style={{ fontSize: "var(--t-xs)", color: "var(--humo)" }}>
              Fabricación a medida sobre cualquier pieza
            </span>
          </div>

          <div className="rejilla-prod" data-filtrando={filtrando ? "si" : "no"}>
            {PRODUCTOS.map((p) => (
              <article
                key={p.codigo}
                className="prod"
                data-visto="si"
                data-saliendo={estados[p.codigo] === "saliendo" ? "si" : undefined}
                data-entrando={estados[p.codigo] === "entrando" ? "si" : undefined}
                hidden={ocultos.has(p.codigo)}
              >
                <FichaProducto producto={p} />
              </article>
            ))}
          </div>

          <div className="catalogo__cierre">
            <h3>¿Estás equipando una oficina entera?</h3>
            <p style={{ margin: "0.75rem auto 0", color: "var(--humo)" }}>
              Sumá las piezas que te interesen a la lista y pedí un presupuesto
              por el conjunto. A mayor volumen, mejor precio por pieza.
            </p>
            <Link className="btn btn--solido" href="/contacto" style={{ marginTop: "1.75rem" }}>
              Pedir presupuesto <Flecha />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
