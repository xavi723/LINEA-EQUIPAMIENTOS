import type { Metadata } from "next";
import Link from "next/link";

import { PROYECTOS } from "@/lib/datos";
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
            <Pendiente>
              Bajada de la página de proyectos — a completar con la empresa.
            </Pendiente>
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
        <div className="rejilla-proy">
          {PROYECTOS.map((p, i) => (
            <Revelar as="article" className="proy" key={p.img} orden={i}>
              <Foto className="proy__foto" src={p.img} alt="Oficina equipada" />
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
            </Revelar>
          ))}
        </div>
      </section>

      <section className="banda banda--oscura">
        <Foto className="banda__foto" src="amb-biblioteca.webp" alt="Oficina equipada" />
        <div className="banda__texto">
          <div className="etiqueta">Un caso</div>
          <h2>
            <Pendiente>Proyecto destacado</Pendiente>
          </h2>
          <p>
            <Pendiente>
              El caso que la empresa quiera contar en detalle: qué pedía el
              cliente, qué se resolvió y con qué piezas. Nombre, fotos y datos
              los tienen que dar ellos.
            </Pendiente>
          </p>
          <Link className="btn btn--claro" href="/contacto">Contanos tu proyecto <Flecha /></Link>
        </div>
      </section>

      <section className="seccion env" style={{ textAlign: "center" }}>
        <Revelar style={{ maxWidth: "42rem", marginInline: "auto" }}>
          <div className="etiqueta" style={{ justifyContent: "center" }}>Tu turno</div>
          <h2>¿Arrancamos con el tuyo?</h2>
          <p style={{ margin: "1.25rem auto 0", color: "var(--humo)" }}>
            <Pendiente>Texto de cierre — a completar con la empresa.</Pendiente>
          </p>
          <Link className="btn btn--acento" href="/contacto" style={{ marginTop: "2rem" }}>
            Pedir presupuesto <Flecha />
          </Link>
        </Revelar>
      </section>
    </>
  );
}
