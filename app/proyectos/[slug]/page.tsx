import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PROYECTOS } from "@/lib/datos";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";
import { Revelar } from "@/components/revelar";

type Params = { params: Promise<{ slug: string }> };

// Exportación estática: se generan solo las páginas de los proyectos con
// slug. Cualquier otra dirección da 404 en vez de intentar armarse al
// vuelo, que sin servidor no puede pasar.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROYECTOS.flatMap((p) => (p.slug ? [{ slug: p.slug }] : []));
}

function buscar(slug: string) {
  return PROYECTOS.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = buscar((await params).slug);
  if (!p) return {};
  return { title: p.nombre, description: p.bajada ?? p.descripcion };
}

export default async function ProyectoDetalle({ params }: Params) {
  const p = buscar((await params).slug);
  if (!p) notFound();

  const fotos = p.fotos?.length ? p.fotos : [p.img];

  return (
    <>
      <div className="env">
        <nav className="migas" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link href="/proyectos">Proyectos</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{p.nombre}</span>
        </nav>
      </div>

      <section className="env" style={{ paddingBottom: "3rem" }}>
        <div className="proy-det__enc">
          <div>
            <div className="etiqueta">Proyecto</div>
            <h1 style={{ fontSize: "var(--t-2xl)" }}>{p.nombre}</h1>
            {p.bajada ? <p className="proy-det__bajada">{p.bajada}</p> : null}
          </div>
          <div>
            {p.texto ? <p className="proy-det__texto">{p.texto}</p> : null}
            <dl className="proy-det__ficha">
              <div>
                <dt>Lugar</dt>
                <dd>{p.lugar}</dd>
              </div>
              {p.linea ? (
                <div>
                  <dt>Línea</dt>
                  <dd>{p.linea}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </section>

      {/*
        Las fotos miden unos 1070 px de ancho: a dos columnas se ven
        nítidas; estiradas a todo el ancho de la pantalla quedarían
        blandas. En pantallas chicas pasan a una por fila.
      */}
      <section className="env" style={{ paddingBottom: "var(--e-6)" }}>
        <div className="proy-det__galeria">
          {fotos.map((f, i) => (
            <Revelar key={f} orden={i}>
              <Foto
                className="proy-det__foto"
                src={f}
                alt={`${p.nombre}, foto ${i + 1} de ${fotos.length}`}
              />
            </Revelar>
          ))}
        </div>
      </section>

      <section className="seccion env proy-det__cierre">
        <Link className="enlace-volver" href="/proyectos">
          Ver todos los proyectos
        </Link>
        <Link className="btn btn--acento" href="/contacto">
          Pedir presupuesto <Flecha />
        </Link>
      </section>
    </>
  );
}
