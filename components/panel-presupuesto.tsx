"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { usePresupuesto } from "@/components/presupuesto";
import { Flecha } from "@/components/flecha";
import { img } from "@/lib/rutas";

export function PanelPresupuesto() {
  const { lista, quitar, panelAbierto, cerrarPanel, aviso } = usePresupuesto();
  const panel = useRef<HTMLElement>(null);
  const focoPrevio = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (panelAbierto) {
      focoPrevio.current = document.activeElement as HTMLElement;
      panel.current?.querySelector<HTMLElement>("button, a")?.focus();
    } else {
      focoPrevio.current?.focus?.();
    }
  }, [panelAbierto]);

  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape" && panelAbierto) cerrarPanel();
    };
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, [panelAbierto, cerrarPanel]);

  return (
    <>
      <div
        className="panel-fondo"
        data-abierto={panelAbierto ? "si" : "no"}
        onClick={cerrarPanel}
      />

      <aside
        ref={panel}
        className="panel"
        data-abierto={panelAbierto ? "si" : "no"}
        aria-hidden={!panelAbierto}
        aria-label="Lista de presupuesto"
      >
        <div className="panel__enc">
          <div>
            <div className="etiqueta" style={{ margin: 0 }}>Tu lista</div>
            <strong style={{ fontFamily: "var(--display)", fontSize: "var(--t-md)" }}>
              Pedido de presupuesto
            </strong>
          </div>
          <button className="cerrar" type="button" onClick={cerrarPanel} aria-label="Cerrar la lista">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <div className="panel__lista">
          {lista.length === 0 ? (
            <p className="panel__vacio">
              Todavía no sumaste piezas. Agregá lo que te interese desde el
              catálogo.
            </p>
          ) : (
            lista.map((pieza) => (
              <div className="item" key={pieza.codigo}>
                <div
                  className="foto item__foto"
                  style={{ backgroundImage: `url(${img(pieza.img)})` }}
                />
                <div>
                  <div className="item__nombre">{pieza.nombre}</div>
                  <div className="item__codigo">{pieza.codigo}</div>
                </div>
                <button
                  className="item__quitar"
                  type="button"
                  onClick={() => quitar(pieza.codigo)}
                  aria-label={`Quitar ${pieza.nombre} de la lista`}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        <div className="panel__pie">
          <p style={{ fontSize: "var(--t-sm)", color: "var(--humo)", marginBottom: "1rem" }}>
            Nos llega tu lista y te respondemos con el presupuesto.
          </p>
          <Link className="btn btn--acento" href="/contacto" style={{ width: "100%" }} onClick={cerrarPanel}>
            Pedir presupuesto <Flecha />
          </Link>
        </div>
      </aside>

      <div className="aviso" role="status" aria-live="polite" data-visible={aviso ? "si" : "no"}>
        {aviso}
      </div>
    </>
  );
}
