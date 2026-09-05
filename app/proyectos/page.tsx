import type { Metadata } from "next";
import Link from "next/link";

import { PROYECTOS } from "@/lib/datos";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";
import { Revelar } from "@/components/revelar";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Oficinas equipadas en Rosario: Colegio de Arquitectos y BEI Desarrollos.",
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
            <div className="etiqueta">Proyectos entregados</div>
            <h1 style={{ fontSize: "var(--t-2xl)" }}>
              Oficinas donde<br />ya se está trabajando
            </h1>
          </div>
          <p>
            Instituciones, estudios y desarrolladoras. Estos son dos de los que
            tenemos documentados en Rosario.
          </p>
        </div>
      </section>

      <section className="seccion--ajustada env">
        <div className="rejilla-proy">
          {PROYECTOS.map((p, i) => (
            <Revelar as="article" className="proy" key={p.nombre} orden={i}>
              <Foto className="proy__foto" src={p.img} alt={p.nombre} />
              <div className="proy__meta">
                <div>
                  <h3 className="proy__nombre">{p.nombre}</h3>
                  <p style={{ fontSize: "var(--t-sm)", color: "var(--humo)", marginTop: "0.2rem" }}>
                    {p.descripcion}
                  </p>
                </div>
                <span className="proy__lugar">{p.lugar}</span>
              </div>
            </Revelar>
          ))}
        </div>
      </section>

      <section className="banda banda--oscura">
        <Foto className="banda__foto" src="amb-biblioteca.webp" alt="Biblioteca"
              pie="Colegio de Arquitectos, Rosario" />
        <div className="banda__texto">
          <div className="etiqueta">Un caso</div>
          <h2>Colegio de Arquitectos<br />de Rosario</h2>
          <p>
            Un edificio de hormigón visto, doble altura y mucho vidrio: cualquier
            mueble ahí queda expuesto desde los dos pisos. Elegimos tapas blancas
            y estructuras finas para que el equipamiento no compitiera con la
            arquitectura.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Biblioteca modular de piso a techo, mesas de trabajo de 2400 mm y
            sillas operativas con respaldo de malla.
          </p>
          <Link className="btn btn--claro" href="/contacto">Contanos tu proyecto <Flecha /></Link>
        </div>
      </section>

      <section className="seccion env" style={{ textAlign: "center" }}>
        <Revelar style={{ maxWidth: "42rem", marginInline: "auto" }}>
          <div className="etiqueta" style={{ justifyContent: "center" }}>Tu turno</div>
          <h2>¿Arrancamos con el tuyo?</h2>
          <p style={{ margin: "1.25rem auto 0", color: "var(--humo)" }}>
            Mandanos el plano o los metros y te armamos una propuesta.
          </p>
          <Link className="btn btn--acento" href="/contacto" style={{ marginTop: "2rem" }}>
            Pedir presupuesto <Flecha />
          </Link>
        </Revelar>
      </section>
    </>
  );
}
