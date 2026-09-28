import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PROYECTOS } from "@/lib/datos";
import { img } from "@/lib/rutas";
import { ExpandableGallery } from "@/components/ui/gallery-animation";
import { Flecha } from "@/components/flecha";
import { Pendiente } from "@/components/pendiente";

type Params = { params: Promise<{ slug: string }> };

// Exportación estática: se generan solo las páginas de los proyectos con
// slug. Cualquier otra dirección da 404 en vez de intentar armarse al
// vuelo, que sin servidor no puede pasar.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROYECTOS.map((p) => ({ slug: p.slug }));
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

  // Sin galería cargada, la foto de la tarjeta a 3:2; sin ninguna foto
  // (solo video), no hay galería.
  const fotos = p.fotos?.length ? p.fotos : p.img ? [{ src: p.img, ancho: 3, alto: 2 }] : [];

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
        {/*
          Entra como la portada: es lo primero que se ve al abrir el
          proyecto y aparecía de golpe mientras las fotos de abajo sí se
          revelaban. Animación CSS y no JS, porque corre mientras la
          página todavía carga fuentes y fotos.
        */}
        <div className="proy-det__enc">
          <div>
            <div className="etiqueta entra">Proyecto</div>
            {p.ejemplo ? (
              <p className="aviso-ejemplo entra" style={{ marginBottom: "1rem" }}>
                Ejemplo de cómo quedaría · No es una obra de Línea
              </p>
            ) : null}
            <h1 className="entra" style={{ fontSize: "var(--t-2xl)", ["--paso" as string]: "70ms" }}>
              {p.nombre}
            </h1>
            {p.bajada ? (
              <p className="proy-det__bajada entra" style={{ ["--paso" as string]: "140ms" }}>
                {p.bajada}
              </p>
            ) : null}
          </div>
          <div className="entra" style={{ ["--paso" as string]: "210ms" }}>
            {p.texto ? <p className="proy-det__texto">{p.texto}</p> : null}
            <dl className="proy-det__ficha">
              <div>
                <dt>Lugar</dt>
                <dd>{p.lugar || <Pendiente>A confirmar</Pendiente>}</dd>
              </div>

            </dl>
          </div>
        </div>
      </section>

      {/*
        La galería es una tira: la foto bajo el mouse se ensancha y al
        hacer clic se abre a pantalla completa. En pantallas chicas pasa
        a ser un carrusel que se desliza, porque el ensanchado necesita
        un mouse que ahí no existe.
      */}
      {p.instagram ? (
        <section className="env" style={{ paddingBottom: "var(--e-6)" }}>
          {/* El reel de Instagram, incrustado con el visor oficial. Queda
              hasta que lleguen las fotos de la obra. */}
          <div className="embed-instagram">
            <iframe
              src={`${p.instagram.replace(/\/$/, "")}/embed/`}
              title={`Video del proyecto ${p.nombre} en Instagram`}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>
      ) : null}

      {fotos.length > 0 ? (
      <section className="env" style={{ paddingBottom: "var(--e-6)" }}>
        <ExpandableGallery
          fotos={fotos.map((f, i) => ({
            src: img(f.src),
            alt: `${p.nombre}, foto ${i + 1} de ${fotos.length}`,
            ancho: f.ancho,
            alto: f.alto,
          }))}
        />
      </section>
      ) : null}

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
