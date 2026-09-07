import type { Metadata } from "next";
import Link from "next/link";

import { EMPRESA } from "@/lib/datos";
import { FormularioPresupuesto } from "@/components/formulario-presupuesto";
import { Foto } from "@/components/foto";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Showroom en Bv. Rondeau 3042 y fábrica en Pedro Goyena 1023, Rosario.",
};

export default function Contacto() {
  const { showroom, fabrica } = EMPRESA;

  return (
    <>
      <div className="env">
        <nav className="migas" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Contacto</span>
        </nav>
      </div>

      <section className="seccion--ajustada env">
        <div className="contacto-layout">
          <FormularioPresupuesto />

          {/* Todos los datos de este bloque salen de la página de
              contacto de la empresa. */}
          <aside className="contacto__datos">
            <div className="etiqueta">Dónde estamos</div>
            <h2 style={{ fontSize: "var(--t-lg)" }}>Dos direcciones<br />en Rosario</h2>

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "var(--borde)" }}>
              <div className="etiqueta" style={{ color: "var(--naranja)" }}>Showroom</div>
              <p style={{ fontWeight: 500 }}>{showroom.calle}</p>
              <p className="dato" style={{ fontSize: "var(--t-sm)", color: "var(--humo)", marginTop: "0.35rem" }}>
                {showroom.horario}
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "var(--t-sm)" }}>
                Tel. <a className="dato" href={`tel:${showroom.telHref}`}>{showroom.tel}</a>
                {" · "}Cel. <span className="dato">{showroom.cel}</span><br />
                <a href={`mailto:${showroom.mail}`}>{showroom.mail}</a>
              </p>
            </div>

            <div style={{ marginTop: "1.75rem", paddingTop: "1.5rem", borderTop: "var(--borde)" }}>
              <div className="etiqueta">Fábrica y administración</div>
              <p style={{ fontWeight: 500 }}>{fabrica.calle}</p>
              <p className="dato" style={{ fontSize: "var(--t-sm)", color: "var(--humo)", marginTop: "0.35rem" }}>
                {fabrica.horario}
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "var(--t-sm)" }}>
                <a href={`mailto:${fabrica.mail}`}>{fabrica.mail}</a>
              </p>
            </div>

            <div style={{ marginTop: "1.75rem", paddingTop: "1.5rem", borderTop: "var(--borde)" }}>
              <div className="etiqueta">Otras vías</div>
              <p style={{ marginTop: "0.35rem", fontSize: "var(--t-sm)" }}>
                Tel. <a className="dato" href={`tel:${EMPRESA.telHref}`}>{EMPRESA.tel}</a>
              </p>
            </div>

            <a
              className="btn btn--linea"
              style={{ marginTop: "1.25rem", width: "100%" }}
              href={`https://wa.me/${EMPRESA.whatsappHref}`}
              rel="noopener"
            >
              WhatsApp {EMPRESA.whatsapp}
            </a>

            <Foto src="amb-sala-reunion.webp" alt="Oficina equipada"
                  style={{ aspectRatio: "4 / 3", marginTop: "1.5rem" }} />
          </aside>
        </div>
      </section>
    </>
  );
}
