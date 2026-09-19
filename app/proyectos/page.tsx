import type { Metadata } from "next";
import Link from "next/link";

import { PROYECTOS, type Proyecto } from "@/lib/datos";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";
import { Pendiente } from "@/components/pendiente";
import { Revelar } from "@/components/revelar";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Oficinas y locales equipados por Altobello Victorio.",
};

export default function Proyectos() {
  return (
    <>
      <div className="env">
        <nav className="migas" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Proyectos</span>
        </nav>
      </div>

      <section className="env" style={{ paddingBottom: "3.5rem" }}>
        <div className="enc-seccion" style={{ marginBottom: 0 }}>
          <div>
            <div className="etiqueta">Proyectos</div>
            <h1 style={{ fontSize: "var(--t-2xl)" }}>
              Oficinas donde<br />ya se está trabajando
            </h1>
          </div>
          <p>
            Apostamos por las soluciones prácticas, para tomar decisiones basadas en
            la realidad. Estas son algunas de las oficinas que equipamos.
          </p>
        </div>
      </section>

      {/*
        Las tarjetas van con la foto real y el nombre pendiente. La
        empresa tiene proyectos publicados, pero no sabemos cuál de ellos
        muestra cada foto: ponerle un nombre sería atribuirle a una obra
        una imagen que puede ser de otra.
      */}
      <section className="seccion--ajustada env">
        <h2 className="solo-lector">Proyectos entregados</h2>
        <div className="rejilla-proy">
          {PROYECTOS.map((p, i) => (
            <Revelar as="article" className="proy" key={p.img} orden={i}>
              <TarjetaProyecto p={p} />
            </Revelar>
          ))}
        </div>
      </section>

      <section className="banda banda--oscura">
        <Foto className="banda__foto" src="proy-bcrlabs-4.webp" alt="Despacho vidriado de BCRlabs" />
        <div className="banda__texto">
          <div className="etiqueta">Un caso</div>
          <h2>BCRlabs,<br />Bolsa de Comercio</h2>
          <p>
            Un espacio de innovación y trabajo colaborativo, equipado de punta a
            punta: salas de reunión, despachos vidriados, islas de puestos y
            guardado. Todo el mobiliario, diseñado a medida.
          </p>
          <Link className="btn btn--claro" href="/proyectos/bcrlabs">Ver el proyecto <Flecha /></Link>
        </div>
      </section>

      <section className="seccion env" style={{ textAlign: "center" }}>
        <Revelar style={{ maxWidth: "42rem", marginInline: "auto" }}>
          <div className="etiqueta" style={{ justifyContent: "center" }}>Tu turno</div>
          <h2>¿Arrancamos con el tuyo?</h2>
          <p style={{ margin: "1.25rem auto 0", color: "var(--humo)" }}>
            Empezamos como empezaron estos: escuchando qué necesitás. Nuestro equipo de
            arquitectura diseña la oficina con vos y nosotros la fabricamos, la
            llevamos y la instalamos.
          </p>
          <Link className="btn btn--acento" href="/contacto" style={{ marginTop: "2rem" }}>
            Pedir presupuesto <Flecha />
          </Link>
        </Revelar>
      </section>
    </>
  );
}

/**
 * Los proyectos con página propia son un enlace entero; los de nombre
 * pendiente quedan como tarjeta suelta, porque no hay nada que mostrar
 * más allá de la foto.
 */
function TarjetaProyecto({ p }: { p: Proyecto }) {
  const cantidad = p.fotos?.length ?? 0;
  const contenido = (
    <>
      <Foto
        className="proy__foto"
        src={p.img}
        alt={p.nombre || "Oficina equipada"}
        pie={cantidad > 1 ? `${cantidad} fotos` : undefined}
        style={p.encuadre ? { backgroundPosition: p.encuadre } : undefined}
      />
      <div className="proy__meta">
        <div>
          <h3 className="proy__nombre">
            {p.nombre || <Pendiente>Nombre del proyecto</Pendiente>}
          </h3>
          <p style={{ fontSize: "var(--t-sm)", color: "var(--humo)", marginTop: "0.2rem" }}>
            {p.descripcion || <Pendiente>Qué se equipó</Pendiente>}
          </p>
        </div>
        <span className="proy__lugar">
          {p.lugar || <Pendiente>Lugar</Pendiente>}
        </span>
      </div>
    </>
  );

  return p.slug ? (
    <Link className="proy__enlace" href={`/proyectos/${p.slug}`}>
      {contenido}
    </Link>
  ) : (
    contenido
  );
}
