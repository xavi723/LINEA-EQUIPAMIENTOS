"use client";

import { useRef, useState, type FormEvent } from "react";

import { CATEGORIAS } from "@/lib/datos";
import { usePresupuesto } from "@/components/presupuesto";
import { Flecha } from "@/components/flecha";

export function FormularioPresupuesto() {
  const { lista } = usePresupuesto();
  const [enviado, setEnviado] = useState(false);
  const estado = useRef<HTMLParagraphElement>(null);

  const resumen =
    lista.length === 0
      ? "No sumaste piezas todavía — contanos abajo qué necesitás."
      : `${lista.length} pieza${lista.length === 1 ? "" : "s"} en tu lista: ` +
        lista.map((p) => p.nombre).join(", ") + ".";

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviado(true);
    requestAnimationFrame(() => estado.current?.focus());
  }

  return (
    <div>
      <div className="etiqueta">Pedido de presupuesto</div>
      <h1 style={{ fontSize: "var(--t-2xl)" }}>Contanos qué<br />necesitás equipar</h1>
      <p style={{ marginTop: "1rem", color: "var(--humo)" }}>
        Cuanto más nos digas, más preciso sale el presupuesto. Si tenés el plano,
        mejor todavía.
      </p>

      <div className="contacto__resumen">
        <div className="etiqueta" style={{ marginBottom: "0.4rem", color: "var(--naranja)" }}>
          Tu lista
        </div>
        <p className="dato" style={{ fontSize: "var(--t-sm)", color: "var(--tinta)" }}>
          {resumen}
        </p>
      </div>

      <form onSubmit={enviar} noValidate>
        <div className="rejilla-form">
          <div className="campo">
            <label htmlFor="nombre">Nombre y apellido</label>
            <input id="nombre" name="nombre" type="text" autoComplete="name" required />
          </div>
          <div className="campo">
            <label htmlFor="empresa">Empresa</label>
            <input id="empresa" name="empresa" type="text" autoComplete="organization" />
          </div>
          <div className="campo">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="campo">
            <label htmlFor="telefono">Teléfono</label>
            <input id="telefono" name="telefono" type="tel" autoComplete="tel" />
          </div>
          <div className="campo">
            <label htmlFor="familia">Qué necesitás</label>
            <select id="familia" name="familia" defaultValue="">
              <option value="">Elegí una familia</option>
              {CATEGORIAS.map((c) => (
                <option key={c.clave} value={c.clave}>{c.nombre}</option>
              ))}
              <option value="proyecto">Una oficina completa</option>
            </select>
          </div>
          <div className="campo">
            <label htmlFor="puestos">Cantidad de puestos</label>
            <input id="puestos" name="puestos" type="number" min={1} inputMode="numeric" placeholder="Ej: 12" />
          </div>
          <div className="campo ancho-total">
            <label htmlFor="mensaje">Contanos un poco más</label>
            <textarea
              id="mensaje"
              name="mensaje"
              placeholder="Metros del espacio, plazos, si ya tenés muebles que querés conservar…"
            />
            <span className="campo__ayuda">
              Si tenés plano en PDF o DWG, mencionalo y te lo pedimos por mail.
            </span>
          </div>
        </div>

        <button className="btn btn--acento" type="submit" style={{ marginTop: "2rem" }}>
          Enviar el pedido <Flecha />
        </button>

        {enviado ? (
          <p ref={estado} tabIndex={-1} className="form__estado" data-visible="si">
            Listo. Es una maqueta de demostración, así que no se envió nada — en
            la web real esto llega a presupuestos@altobellovictorio.com.ar.
          </p>
        ) : null}
      </form>
    </div>
  );
}
