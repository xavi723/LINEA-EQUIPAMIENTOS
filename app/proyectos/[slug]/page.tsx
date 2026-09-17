import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PROYECTOS } from "@/lib/datos";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";
import { Pendiente } from "@/components/pendiente";
import { Revelar } from "@/components/revelar";
import { cn } from "@/lib/utils";

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

  // Sin galería cargada, la foto de la tarjeta a 3:2.
  const fotos = p.fotos?.length ? p.fotos : [{ src: p.img, ancho: 3, alto: 2 }];
  const verticales = fotos.every((f) => f.alto > f.ancho);

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
                <dd>{p.lugar || <Pendiente>Lugar</Pendiente>}</dd>
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
        Cada foto va entera, a su proporción: hay proyectos con fotos
        apaisadas y otros con verticales. Las originales miden unos 1000 px
        de ancho: a dos columnas se ven nítidas; a todo el ancho quedarían
        blandas. En pantallas chicas pasan a una por fila.
      */}
      <section className="env" style={{ paddingBottom: "var(--e-6)" }}>
        <div className={cn("proy-det__galeria", verticales && "proy-det__galeria--verticales")}>
          {fotos.map((f, i) => (
            <Revelar key={f.src} orden={i} className="proy-det__item">
              <Foto
                src={f.src}
                alt={`${p.nombre}, foto ${i + 1} de ${fotos.length}`}
                style={{ aspectRatio: `${f.ancho} / ${f.alto}` }}
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
