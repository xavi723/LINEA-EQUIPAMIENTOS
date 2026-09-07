import type { Metadata } from "next";
import Link from "next/link";

import { EMPRESA } from "@/lib/datos";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";
import { Pendiente } from "@/components/pendiente";
import { Revelar } from "@/components/revelar";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Departamento de Arquitectura, software de diseño 3D y equipo profesional de instalación de mobiliario.",
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
              Asesoramiento, diseño<br />e instalación
            </h1>
          </div>
          <p>
            <Pendiente>
              Bajada de la página de servicios — a completar con la empresa.
            </Pendiente>
          </p>
        </div>
      </section>

      {/* Servicio 01 — texto de la propia empresa. */}
      <section className="banda">
        <Foto className="banda__foto" src="amb-biblioteca.webp" alt="Oficina equipada" />
        <div className="banda__texto">
          <div className="etiqueta">Servicio 01</div>
          <h2>Departamento<br />de Arquitectura</h2>
          <p>
            Contamos con un Departamento de Arquitectura que puede asesorarte en
            tu proyecto, y con software y herramientas de diseño para que puedas
            visualizarlo.
          </p>
          <p style={{ marginTop: "1rem" }}>
            El software tiene una completa biblioteca con ítems de decoración y
            texturas de madera, pisos y terminaciones, que permite representar tu
            ambiente con realismo.
          </p>
          <Link className="btn btn--linea" href="/contacto">Pedir un proyecto <Flecha /></Link>
        </div>
      </section>

      <section className="banda banda--invertida banda--oscura">
        <Foto className="banda__foto foto--tinta" src="amb-silla-negro.webp" alt="Silla de oficina" />
        <div className="banda__texto">
          <div className="etiqueta">Servicio 02</div>
          <h2>Fabricación</h2>
          <p>
            <Pendiente>
              Qué se fabrica, con qué materiales, qué se puede hacer a medida,
              qué plazos manejan y cómo funcionan las ampliaciones y los
              repuestos. Todo esto lo tiene que aportar la empresa.
            </Pendiente>
          </p>
          <Link className="btn btn--claro" href="/contacto">
            Consultar una medida especial <Flecha />
          </Link>
        </div>
      </section>

      {/* Servicio 03 — texto de la propia empresa. */}
      <section className="banda">
        <Foto className="banda__foto" src="amb-atrio.webp" alt="Oficina equipada" />
        <div className="banda__texto">
          <div className="etiqueta">Servicio 03</div>
          <h2>Instalación</h2>
          <p>
            Ponemos a disposición un equipo profesional de instalación de
            mobiliario, que ayuda a materializar el proyecto de tu oficina sin
            complicaciones.
          </p>
          <Link className="btn btn--linea" href="/contacto">Coordinar una entrega <Flecha /></Link>
        </div>
      </section>

      <section className="seccion env">
        <Revelar className="enc-seccion">
          <div>
            <div className="etiqueta">Además</div>
            <h2>Otros servicios</h2>
          </div>
        </Revelar>

        <Revelar className="fila-serv">
          <div className="fila-serv__n">01</div>
          <h3>
            <Pendiente>Servicio a completar</Pendiente>
          </h3>
          <p>
            <Pendiente>
              Garantías, repuestos, mantenimiento, ampliaciones: si la empresa
              los ofrece, este es el lugar. Van los datos que ellos confirmen.
            </Pendiente>
          </p>
        </Revelar>

        <Revelar className="fila-serv">
          <div className="fila-serv__n">02</div>
          <h3>
            <Pendiente>Servicio a completar</Pendiente>
          </h3>
          <p>
            <Pendiente>
              Segundo servicio adicional — a definir con la empresa.
            </Pendiente>
          </p>
        </Revelar>

        <Revelar className="fila-serv">
          <div className="fila-serv__n">03</div>
          <h3>Showroom</h3>
          <p>
            {EMPRESA.showroom.calle}, Rosario. Podés venir a ver y probar las
            piezas antes de decidir.
          </p>
          <span className="dato" style={{ fontSize: "var(--t-xs)", color: "var(--humo)" }}>
            LUN A VIE 9–18 H
          </span>
        </Revelar>
      </section>
    </>
  );
}
