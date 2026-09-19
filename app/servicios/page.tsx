import type { Metadata } from "next";
import Link from "next/link";

import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Asesoramiento y diseño, garantía y servicio, transporte e instalación.",
};

export default function Servicios() {
  return (
    <>
      <div className="env">
        <nav className="migas" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Servicios</span>
        </nav>
      </div>

      <section className="env" style={{ paddingBottom: "3.5rem" }}>
        <div className="enc-seccion" style={{ marginBottom: 0 }}>
          <div>
            <div className="etiqueta">Servicios</div>
            <h1 style={{ fontSize: "var(--t-2xl)" }}>
              Tres servicios<br />alrededor del mueble
            </h1>
          </div>
          <p>
            Juntos creamos el diseño ideal para cada oficina, con soluciones
            simples, eficaces y accesibles que te permitan optimizar tus recursos y
            maximizar tu rentabilidad.
          </p>
        </div>
      </section>

      {/* Servicio 01 — texto de la propia empresa. */}
      <section className="banda">
        <Foto className="banda__foto" src="amb-biblioteca.webp" alt="Oficina equipada" />
        <div className="banda__texto">
          <div className="etiqueta">Servicio 01</div>
          <h2>Asesoramiento<br />y diseño</h2>
          <p>
            Te acompañamos en el diseño de tu oficina con un equipo de
            Arquitectura.
          </p>
          <Link className="btn btn--linea" href="/contacto">Pedir un proyecto <Flecha /></Link>
        </div>
      </section>

      <section className="banda banda--invertida banda--oscura">
        <Foto className="banda__foto foto--tinta" src="amb-silla-negro.webp" alt="Silla de oficina" />
        <div className="banda__texto">
          <div className="etiqueta">Servicio 02</div>
          <h2>Garantía<br />y servicio</h2>
          <p>
            Nuestros productos están pensados para durar. Ofrecemos garantía,
            repuestos y servicio de reparación.
          </p>
          <Link className="btn btn--claro" href="/contacto">
            Consultar <Flecha />
          </Link>
        </div>
      </section>

      {/* Servicio 03 — texto de la propia empresa. */}
      <section className="banda">
        <Foto className="banda__foto" src="amb-atrio.webp" alt="Oficina equipada" />
        <div className="banda__texto">
          <div className="etiqueta">Servicio 03</div>
          <h2>Transporte<br />e instalación</h2>
          <p>
            Llevamos las piezas hasta tu oficina y las dejamos armadas y en su
            lugar. Coordinamos el día y la hora para que el movimiento no te frene
            el trabajo.
          </p>
          <Link className="btn btn--linea" href="/contacto">Coordinar una entrega <Flecha /></Link>
        </div>
      </section>

    </>
  );
}
