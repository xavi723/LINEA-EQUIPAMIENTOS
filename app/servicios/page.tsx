import type { Metadata } from "next";
import Link from "next/link";

import { EMPRESA } from "@/lib/datos";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";
import { Revelar } from "@/components/revelar";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Relevamiento y diseño 3D, fabricación a medida, entrega e instalación con equipo propio en Rosario.",
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
              No vendemos muebles sueltos.<br />Entregamos la oficina puesta.
            </h1>
          </div>
          <p>
            Desde la primera medición hasta el último tornillo. Todo con equipo
            propio, sin tercerizar la parte que más se nota.
          </p>
        </div>
      </section>

      <section className="banda">
        <Foto className="banda__foto" src="amb-biblioteca.webp" alt="Biblioteca y sala de trabajo"
              pie="Colegio de Arquitectos, Rosario" />
        <div className="banda__texto">
          <div className="etiqueta">Servicio 01</div>
          <h2>Diseño 3D</h2>
          <p>
            Tomamos las medidas de tu planta y la dibujamos amueblada. Vas a ver
            los escritorios en su lugar, los colores de tapizado que elegiste y
            cómo circula la gente entre los puestos.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Sirve para discutir con tu equipo antes de firmar nada, y para darte
            cuenta de que ese pasillo de 70 cm era angosto.
          </p>
          <Link className="btn btn--linea" href="/contacto">Pedir un proyecto 3D <Flecha /></Link>
        </div>
      </section>

      <section className="banda banda--invertida banda--oscura">
        <Foto className="banda__foto foto--tinta" src="amb-silla-negro.webp" alt="Silla ergonómica"
              pie={`Producción propia · ${EMPRESA.fabrica.calle}`} />
        <div className="banda__texto">
          <div className="etiqueta">Servicio 02</div>
          <h2>Fabricación a medida</h2>
          <p>
            El catálogo es un punto de partida. Si tu espacio pide un escritorio
            de 1650 mm, una mesa en L o un mostrador que siga una pared curva,
            sale de la misma línea de producción.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Y como fabricamos nosotros, dentro de cinco años seguimos teniendo el
            herraje, la tapa y el color exactos para ampliar o reponer.
          </p>
          <Link className="btn btn--claro" href="/contacto">
            Consultar una medida especial <Flecha />
          </Link>
        </div>
      </section>

      <section className="banda">
        <Foto className="banda__foto" src="amb-atrio.webp" alt="Oficinas instaladas"
              pie="Entrega y armado con equipo propio" />
        <div className="banda__texto">
          <div className="etiqueta">Servicio 03</div>
          <h2>Entrega e instalación</h2>
          <p>
            Llevamos, armamos, nivelamos y nos llevamos el embalaje. Si tu
            oficina no puede parar, coordinamos el armado para un fin de semana o
            fuera del horario laboral.
          </p>
          <p style={{ marginTop: "1rem" }}>
            En mudanzas grandes vamos por sectores, para que nunca haya un piso
            entero sin poder trabajar.
          </p>
          <Link className="btn btn--linea" href="/contacto">Coordinar una entrega <Flecha /></Link>
        </div>
      </section>

      <section className="seccion env">
        <Revelar className="enc-seccion">
          <div>
            <div className="etiqueta">Además</div>
            <h2>Lo que casi nadie pregunta<br />y después importa</h2>
          </div>
        </Revelar>

        <Revelar className="fila-serv">
          <div className="fila-serv__n">01</div>
          <h3>Garantía y repuestos</h3>
          <p>
            Fabricamos las piezas, así que tenemos los repuestos. Un pistón, una
            rueda o un cajón se cambian sin reemplazar el mueble entero.
          </p>
          <span className="dato" style={{ fontSize: "var(--t-xs)", color: "var(--humo)" }}>
            CONSULTAR PLAZOS
          </span>
        </Revelar>

        <Revelar className="fila-serv">
          <div className="fila-serv__n">02</div>
          <h3>Ampliaciones</h3>
          <p>
            Si el año que viene sumás seis puestos, los hacemos iguales a los que
            ya tenés: misma tapa, mismo canto, mismo color.
          </p>
          <span className="dato" style={{ fontSize: "var(--t-xs)", color: "var(--humo)" }}>
            SIN MÍNIMO
          </span>
        </Revelar>

        <Revelar className="fila-serv">
          <div className="fila-serv__n">03</div>
          <h3>Showroom</h3>
          <p>
            {EMPRESA.showroom.calle}, Rosario. Vení a sentarte en las sillas
            antes de comprar veinte. Es la única forma seria de elegirlas.
          </p>
          <span className="dato" style={{ fontSize: "var(--t-xs)", color: "var(--humo)" }}>
            LUN A VIE 9–18 H
          </span>
        </Revelar>
      </section>
    </>
  );
}
