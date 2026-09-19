import Link from "next/link";

import { CATEGORIAS, PRODUCTOS, contarPiezas, EMPRESA } from "@/lib/datos";
import { Cifras } from "@/components/cifras";
import { FichaProducto } from "@/components/ficha-producto";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";
import { Pendiente } from "@/components/pendiente";
import { Revelar } from "@/components/revelar";

const DESTACADOS = ["silla-cool", "escritorio-prisma", "mesa-bote", "silla-cool-jazz"];

export default function Inicio() {
  const destacados = PRODUCTOS.filter((p) => DESTACADOS.includes(p.codigo));

  return (
    <>
      <section className="portada">
        <Foto
          className="portada__foto"
          src="showroom-salon.webp"
          alt={`Salón del showroom de Altobello Victorio en ${EMPRESA.showroom.calle}`}
        />
        <div className="portada__velo" />

        <div className="env portada__contenido">
          <div className="etiqueta entra">Rosario · desde {EMPRESA.desde}</div>

          {/* Frase de la propia empresa: "una empresa familiar en
              crecimiento que desde sus inicios en 1959 busca soluciones
              para mejorar tu jornada laboral y experimentar el placer de
              trabajar". */}
          <h1 className="entra" style={{ ["--paso" as string]: "70ms" }}>
            Soluciones para mejorar tu jornada laboral.
          </h1>

          <p className="portada__bajada entra" style={{ ["--paso" as string]: "140ms" }}>
            Empresa familiar desde {EMPRESA.desde}. Queremos ayudarte a aprovechar al
            máximo tu oficina, acompañar tu pasión y hacer realidad tu sueño.
          </p>

          <div className="portada__acciones entra" style={{ ["--paso" as string]: "210ms" }}>
            <Link className="btn btn--acento" href="/catalogo">Ver el catálogo <Flecha /></Link>
            <Link className="btn btn--claro" href="/contacto">Pedir presupuesto</Link>
          </div>
        </div>

        <div className="env"><Cifras /></div>
      </section>

      <section className="seccion env">
        <Revelar className="enc-seccion">
          <div>
            <div className="etiqueta">El catálogo</div>
            <h2>Todo lo que entra en una oficina</h2>
          </div>
          <p>
            <Pendiente>
              Texto de introducción al catálogo — a completar con la empresa.
            </Pendiente>
          </p>
        </Revelar>

        <div className="rejilla-cat">
          {CATEGORIAS.map((c, i) => (
            <Revelar key={c.clave} orden={i}>
              <Link className="cat" href="/catalogo">
                <Foto className="cat__foto" src={c.portada} alt={c.nombre} />
                <div className="cat__meta">
                  <span className="cat__nombre">{c.nombre}</span>
                  <span className="cat__n">
                    {contarPiezas(c.clave)} {contarPiezas(c.clave) === 1 ? "pieza" : "piezas"}
                  </span>
                </div>
                <p style={{ fontSize: "var(--t-sm)", color: "var(--humo)", margin: 0 }}>
                  {c.descripcion || <Pendiente>Descripción a completar</Pendiente>}
                </p>
              </Link>
            </Revelar>
          ))}
        </div>
      </section>

      <section className="banda banda--oscura">
        <Foto className="banda__foto" src="amb-lounge.webp" alt="Oficina equipada" />
        <div className="banda__texto">
          <div className="etiqueta">La empresa</div>
          {/* "Empresa familiar" y "desde 1959" están verificados. */}
          <h2>Una empresa familiar,<br />desde {EMPRESA.desde}.</h2>
          <p>
            Somos una empresa familiar en crecimiento que, desde sus inicios en{" "}
            {EMPRESA.desde}, busca soluciones para que puedas mejorar tu jornada laboral
            y experimentar el placer de trabajar. Trabajamos con un equipo de personas
            llenas de valores humanos y profesionales, que aportan sus habilidades en
            cada proyecto.
          </p>
          <Link className="btn btn--claro" href="/proyectos">
            Ver proyectos <Flecha />
          </Link>
        </div>
      </section>

      <section className="seccion env">
        <Revelar className="enc-seccion">
          <div>
            <div className="etiqueta">Piezas de referencia</div>
            <h2>Algunas de nuestras<br />piezas</h2>
          </div>
          <Link className="enlace-flecha" href="/catalogo">
            Ver las {PRODUCTOS.length} piezas <Flecha className="" />
          </Link>
        </Revelar>

        <div className="rejilla-prod">
          {destacados.map((p, i) => (
            <Revelar as="article" className="prod" key={p.codigo} orden={i}>
              <FichaProducto producto={p} />
            </Revelar>
          ))}
        </div>
      </section>

      <section className="seccion" style={{ background: "var(--papel-puro)" }}>
        <div className="env">
          <Revelar className="enc-seccion">
            <div>
              <div className="etiqueta">Servicios</div>
              <h2>Tres servicios<br />alrededor del mueble</h2>
            </div>
            <p>
              Juntos creamos el diseño ideal para cada oficina, con soluciones
              simples, eficaces y accesibles que te permitan optimizar tus recursos y
              maximizar tu rentabilidad.
            </p>
          </Revelar>

          {/* Los tres servicios que presta la empresa, con su texto. */}
          <Revelar className="fila-serv">
            <div className="fila-serv__n">01</div>
            <h3>Asesoramiento y diseño</h3>
            <p>
              Te acompañamos en el diseño de tu oficina con un equipo de
              Arquitectura.
            </p>
            <Link className="enlace-flecha" href="/servicios">Ver cómo es <Flecha className="" /></Link>
          </Revelar>

          <Revelar className="fila-serv">
            <div className="fila-serv__n">02</div>
            <h3>Garantía y servicio</h3>
            <p>
              Nuestros productos están pensados para durar. Ofrecemos garantía,
              repuestos y servicio de reparación.
            </p>
            <Link className="enlace-flecha" href="/servicios">Ver más <Flecha className="" /></Link>
          </Revelar>

          <Revelar className="fila-serv">
            <div className="fila-serv__n">03</div>
            <h3>Transporte e instalación</h3>
            <p>
              <Pendiente>
                Descripción del servicio de transporte e instalación — a
                completar con la empresa.
              </Pendiente>
            </p>
            <Link className="enlace-flecha" href="/contacto">Coordinar una visita <Flecha className="" /></Link>
          </Revelar>
        </div>
      </section>

      <section className="banda banda--invertida">
        <Foto className="banda__foto" src="amb-sillas-color.webp" alt="Sillas de oficina" />
        <div className="banda__texto">
          <div className="etiqueta">Sillas</div>
          <h2>Nuestras<br />sillas</h2>
          <p>
            <Pendiente>
              Características de las sillas: regulaciones, materiales, tapizados
              disponibles y garantía. Son datos técnicos que tiene que dar la
              empresa, no se pueden suponer.
            </Pendiente>
          </p>
          <p style={{ marginTop: "1rem" }}>
            Podés probarlas en el showroom de {EMPRESA.showroom.calle} antes de comprar.
          </p>
          <Link className="btn btn--linea" href="/catalogo">Ver todas las sillas <Flecha /></Link>
        </div>
      </section>

      {/* Showroom. Las fotos son del local de Bv. Rondeau. */}
      <section className="seccion env" id="showroom">
        <Revelar className="enc-seccion">
          <div>
            <div className="etiqueta">Showroom</div>
            <h2>Vení a probarlas<br />en {EMPRESA.showroom.calle}</h2>
          </div>
          <p>
            Sentarte en las sillas, medir los escritorios y ver las terminaciones de
            cerca es la mejor forma de elegir. Te esperamos.
          </p>
        </Revelar>

        <div className="showroom">
          <Revelar>
            <Foto
              className="showroom__foto showroom__foto--alta"
              src="showroom-frente.webp"
              alt={`Frente del showroom en ${EMPRESA.showroom.calle}`}
            />
          </Revelar>
          <div className="showroom__col">
            <Revelar orden={1}>
              <Foto
                className="showroom__foto"
                src="showroom-sillas.webp"
                alt="Sector de sillas del showroom, contra el patio"
              />
            </Revelar>
            <Revelar orden={2}>
              <Foto
                className="showroom__foto"
                src="showroom-escritorio.webp"
                alt="Escritorio ejecutivo junto al ventanal del showroom"
              />
            </Revelar>
          </div>
        </div>

        <Revelar>
          <dl className="showroom__datos">
            <div>
              <dt>Dónde</dt>
              <dd>{EMPRESA.showroom.calle}<br />{EMPRESA.ciudad}</dd>
            </div>
            <div>
              <dt>Horario</dt>
              <dd>{EMPRESA.showroom.horario}</dd>
            </div>
            <div>
              <dt>Consultas</dt>
              <dd>
                <a href={`mailto:${EMPRESA.showroom.mail}`}>{EMPRESA.showroom.mail}</a>
              </dd>
            </div>
          </dl>
          <Link className="btn btn--linea showroom__cta" href="/contacto">
            Cómo llegar <Flecha />
          </Link>
        </Revelar>
      </section>

      <section className="seccion env" style={{ textAlign: "center" }}>
        <Revelar style={{ maxWidth: "44rem", marginInline: "auto" }}>
          <div className="etiqueta" style={{ justifyContent: "center" }}>Siguiente paso</div>
          <h2>Contanos qué espacio<br />tenés que equipar</h2>
          <p style={{ margin: "1.25rem auto 0", color: "var(--humo)" }}>
            <Pendiente>
              Texto de cierre — qué le pedimos al visitante y qué recibe a
              cambio. A completar con la empresa.
            </Pendiente>
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link className="btn btn--acento" href="/contacto">Pedir presupuesto <Flecha /></Link>
            <Link className="btn btn--linea" href="/contacto">
              Ver los datos de contacto
            </Link>
          </div>
        </Revelar>
      </section>
    </>
  );
}
