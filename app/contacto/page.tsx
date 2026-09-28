import type { Metadata } from "next";
import Link from "next/link";

import { EMPRESA, TELEFONO, TELEFONO_CRUDO } from "@/lib/datos";
import { FormularioPresupuesto } from "@/components/formulario-presupuesto";
import { Foto } from "@/components/foto";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Showroom en Córdoba 1080, Rosario. Consultas por WhatsApp.",
};

export default function Contacto() {
  const { showroom } = EMPRESA;
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${showroom.calle}, Rosario, Santa Fe`,
  )}`;

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

          <aside className="contacto__datos">
            <div className="etiqueta">Dónde estamos</div>
            <h2 style={{ fontSize: "var(--t-lg)" }}>Showroom<br />en Rosario</h2>

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "var(--borde)" }}>
              <div className="etiqueta" style={{ color: "var(--acento)" }}>Showroom</div>
              <p style={{ fontWeight: 500 }}>{showroom.calle}, {EMPRESA.ciudad}</p>
              <p className="dato" style={{ fontSize: "var(--t-sm)", color: "var(--humo)", marginTop: "0.35rem" }}>
                {showroom.horario}
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "var(--t-sm)" }}>
                <a href={mapa} target="_blank" rel="noopener noreferrer">Ver en el mapa</a>
              </p>
            </div>

            <div style={{ marginTop: "1.75rem", paddingTop: "1.5rem", borderTop: "var(--borde)" }}>
              <div className="etiqueta">WhatsApp</div>
              <p style={{ marginTop: "0.35rem", fontSize: "var(--t-sm)" }}>
                <a href={`https://wa.me/${TELEFONO_CRUDO}`} target="_blank" rel="noopener noreferrer">{TELEFONO}</a>
              </p>
            </div>

            <div style={{ marginTop: "1.75rem", paddingTop: "1.5rem", borderTop: "var(--borde)" }}>
              <div className="etiqueta">Redes</div>
              <p style={{ marginTop: "0.35rem", fontSize: "var(--t-sm)" }}>
                <a href={EMPRESA.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram {EMPRESA.instagramUsuario}
                </a>
                <br />
                <a href={EMPRESA.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              </p>
            </div>

            <Foto src="amb-sala-reunion.webp" alt="Sala de reunión equipada"
                  style={{ aspectRatio: "4 / 3", marginTop: "1.5rem" }} />
          </aside>
        </div>
      </section>
    </>
  );
}
