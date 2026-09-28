import type { Metadata } from "next";
import Link from "next/link";

import { RUBROS } from "@/lib/datos";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Mobiliario integral: diseño, fabricación e instalación para espacios de trabajo, comercios, centros de salud, locales gastronómicos y hogares.",
};

/**
 * Las tres etapas salen de la frase de la empresa: "Diseñamos,
 * fabricamos y acompañamos cada etapa, desde la idea hasta la
 * instalación final". Los rubros, de su afiche de servicios.
 */
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
              De la idea<br />a la instalación final
            </h1>
          </div>
          <p>
            Diseñamos proyectos de mobiliario integral y te acompañamos todo el
            camino: un solo equipo, de la primera idea hasta que el espacio queda
            listo para usar.
          </p>
        </div>
      </section>

      <section className="banda">
        <Foto className="banda__foto" src="linea-render.webp" alt="Diseño de una oficina con escritorio, guardado y sillas" />
        <div className="banda__texto">
          <div className="etiqueta">Etapa 01</div>
          <h2>Diseño</h2>
          <p>
            Pensamos el mobiliario con vos, a partir del espacio que tenés y de cómo
            se va a usar: cuántas personas, qué hacen y qué necesitan tener a mano.
          </p>
          <Link className="btn btn--linea" href="/contacto">Contarnos tu proyecto <Flecha /></Link>
        </div>
      </section>

      <section className="banda banda--invertida banda--oscura">
        <Foto className="banda__foto foto--tinta" src="amb-silla-negro.webp" alt="Silla de oficina" />
        <div className="banda__texto">
          <div className="etiqueta">Etapa 02</div>
          <h2>Fabricación</h2>
          <p>
            Fabricamos cada pieza del proyecto, con la pasión, la calidad y el
            cumplimiento que nos acompañan hace más de 50 años.
          </p>
          <Link className="btn btn--claro" href="/catalogo">
            Ver el catálogo <Flecha />
          </Link>
        </div>
      </section>

      <section className="banda">
        <Foto className="banda__foto" src="amb-atrio.webp" alt="Oficina equipada" />
        <div className="banda__texto">
          <div className="etiqueta">Etapa 03</div>
          <h2>Instalación</h2>
          <p>
            Acompañamos cada etapa hasta la instalación final, para que el espacio
            quede listo para trabajar, atender o vivir.
          </p>
          <Link className="btn btn--linea" href="/contacto">Coordinar una visita <Flecha /></Link>
        </div>
      </section>

      <section className="banda banda--invertida banda--oscura">
        <Foto className="banda__foto" src="amb-sala-reunion.webp" alt="Sala de reunión equipada" />
        <div className="banda__texto">
          <div className="etiqueta">Para quién</div>
          <h2>Mobiliario integral para…</h2>
          <ul className="rubros">
            {RUBROS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <Link className="btn btn--claro" href="/contacto">Pedir presupuesto <Flecha /></Link>
        </div>
      </section>
    </>
  );
}
