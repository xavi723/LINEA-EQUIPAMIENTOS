import type { Metadata } from "next";
import Link from "next/link";

import { PROYECTOS, type Proyecto } from "@/lib/datos";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";
import { Pendiente } from "@/components/pendiente";
import { Revelar } from "@/components/revelar";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Espacios equipados por Línea Equipamiento.",
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
              Espacios que<br />equipamos
            </h1>
          </div>
          <p>
            Proyectos de mobiliario integral, de la idea a la instalación final. Los
            marcados como ejemplo muestran cómo se ve un proyecto terminado.
          </p>
        </div>
      </section>

      <section className="seccion--ajustada env">
        <h2 className="solo-lector">Proyectos entregados</h2>
        <div className="rejilla-proy">
          {PROYECTOS.map((p, i) => (
            <Revelar as="article" className="proy" key={p.slug} orden={i}>
              <TarjetaProyecto p={p} />
            </Revelar>
          ))}
        </div>
      </section>

      <section className="seccion env" style={{ textAlign: "center" }}>
        <Revelar style={{ maxWidth: "42rem", marginInline: "auto" }}>
          <div className="etiqueta" style={{ justifyContent: "center" }}>Tu turno</div>
          <h2>¿Arrancamos con el tuyo?</h2>
          <p style={{ margin: "1.25rem auto 0", color: "var(--humo)" }}>
            Empezamos escuchando qué necesitás. Diseñamos el espacio con vos, lo
            fabricamos y te acompañamos hasta la instalación final.
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
 * Cada proyecto es un enlace entero a su página. Sin foto (el de
 * Baigorria, que por ahora es solo video), la tarjeta va en el verde de
 * la marca.
 */
function TarjetaProyecto({ p }: { p: Proyecto }) {
  const cantidad = p.fotos?.length ?? 0;
  const contenido = (
    <>
      {p.img ? (
        <Foto
          className="proy__foto"
          src={p.img}
          alt={p.nombre}
          pie={p.ejemplo ? "Ejemplo de cómo quedaría" : cantidad > 1 ? `${cantidad} fotos` : undefined}
          style={p.encuadre ? { backgroundPosition: p.encuadre } : undefined}
        />
      ) : (
        <div className="foto proy__foto proy__foto--sin-foto">
          {p.instagram ? "▶ Ver el video" : "Fotos a cargar"}
        </div>
      )}
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

  return (
    <Link className="proy__enlace" href={`/proyectos/${p.slug}`}>
      {contenido}
    </Link>
  );
}
