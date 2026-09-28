import Link from "next/link";

import { CATEGORIAS, PRODUCTOS, RUBROS, TELEFONO_CRUDO, contarPiezas, EMPRESA } from "@/lib/datos";
import { Cifras } from "@/components/cifras";
import { FichaProducto } from "@/components/ficha-producto";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";
import { Pendiente } from "@/components/pendiente";
import { Revelar } from "@/components/revelar";

const DESTACADOS = ["silla-ergonomica", "escritorio-ejecutivo", "mesa-bote", "silla-gerencial"];

export default function Inicio() {
  const destacados = PRODUCTOS.filter((p) => DESTACADOS.includes(p.codigo));

  return (
    <>
      <section className="portada">
        <Foto
          className="portada__foto"
          src="proy-banco-municipal-1.webp"
          alt="Espacio de trabajo equipado con escritorios y sillas"
        />
        <div className="portada__velo" />

        <div className="env portada__contenido">
          <div className="etiqueta entra">Rosario · {EMPRESA.trayectoria.toLowerCase()}</div>

          {/* Frases de la propia empresa: su afiche ("Diseñamos proyectos
              de mobiliario integral") y su Instagram ("Diseñamos,
              fabricamos y acompañamos cada etapa…"). */}
          <h1 className="entra" style={{ ["--paso" as string]: "70ms" }}>
            Diseñamos proyectos de mobiliario integral.
          </h1>

          <p className="portada__bajada entra" style={{ ["--paso" as string]: "140ms" }}>
            Diseñamos, fabricamos y acompañamos cada etapa, desde la idea hasta la
            instalación final.
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
            <h2>Todo lo que entra en un espacio de trabajo</h2>
          </div>
          <p>
            Escritorios, sillas, mesas de reunión y accesorios. Estas son piezas de
            referencia: cada proyecto se arma según el espacio y cómo se va a usar.
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

      {/* Texto armado con los posteos de Instagram de la empresa: el de su
          fundador y el de la renovación de imagen. */}
      <section className="banda banda--oscura">
        <Foto
          className="banda__foto"
          src="linea-fundador.webp"
          alt={`${EMPRESA.fundador}, fundador de ${EMPRESA.nombre}`}
          style={{ backgroundPosition: "center 30%" }}
        />
        <div className="banda__texto">
          <div className="etiqueta">La empresa</div>
          <h2>{EMPRESA.trayectoria}<br />equipando espacios.</h2>
          <p>
            {EMPRESA.fundador} fundó {EMPRESA.nombre} y hace más de 50 años que está
            al frente de esta propuesta integral y diferenciada: muebles de diseño,
            hechos con pasión, calidad y cumplimiento.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Hoy renovamos nuestra imagen con el mismo profesionalismo y una nueva
            mirada, para acompañarte en cada proyecto.
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
            <h2>Algunas<br />piezas</h2>
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
              <div className="etiqueta">Cómo trabajamos</div>
              <h2>De la idea<br />a la instalación final</h2>
            </div>
            <p>
              Te acompañamos todo el camino. Un solo equipo se ocupa del proyecto de
              punta a punta, así nada queda entre dos proveedores.
            </p>
          </Revelar>

          <Revelar className="fila-serv">
            <div className="fila-serv__n">01</div>
            <h3>Diseño</h3>
            <p>
              Pensamos el mobiliario con vos, a partir del espacio que tenés y de cómo
              se va a usar.
            </p>
            <Link className="enlace-flecha" href="/servicios">Ver cómo es <Flecha className="" /></Link>
          </Revelar>

          <Revelar className="fila-serv">
            <div className="fila-serv__n">02</div>
            <h3>Fabricación</h3>
            <p>
              Fabricamos cada pieza del proyecto, con la calidad y el cumplimiento que
              nos acompañan hace más de 50 años.
            </p>
            <Link className="enlace-flecha" href="/servicios">Ver más <Flecha className="" /></Link>
          </Revelar>

          <Revelar className="fila-serv">
            <div className="fila-serv__n">03</div>
            <h3>Instalación</h3>
            <p>
              Seguimos cada etapa hasta la instalación final, para que el espacio
              quede listo para usar.
            </p>
            <Link className="enlace-flecha" href="/contacto">Coordinar una visita <Flecha className="" /></Link>
          </Revelar>
        </div>
      </section>

      {/* Los cinco rubros del afiche de la empresa. */}
      <section className="banda banda--invertida">
        <Foto className="banda__foto" src="amb-lounge.webp" alt="Espacio equipado" />
        <div className="banda__texto">
          <div className="etiqueta">Para quién</div>
          <h2>Mobiliario integral<br />para cada espacio</h2>
          <ul className="rubros">
            {RUBROS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <Link className="btn btn--linea" href="/servicios">Ver servicios <Flecha /></Link>
        </div>
      </section>

      {/* Showroom. Las fotos son de ejemplo: todavía no hay fotos del
          local de Córdoba 1080. */}
      <section className="seccion env" id="showroom">
        <Revelar className="enc-seccion">
          <div>
            <div className="etiqueta">Showroom</div>
            <h2>Visitanos<br />en {EMPRESA.showroom.calle}</h2>
          </div>
          <p>
            Ver las terminaciones de cerca y contarnos tu proyecto en persona es la
            mejor forma de empezar. Te esperamos.
          </p>
        </Revelar>

        <div className="showroom">
          <Revelar>
            <Foto
              className="showroom__foto showroom__foto--alta"
              src="showroom-salon.webp"
              alt="Salón con escritorios y sillas (foto de ejemplo)"
              pie="Foto de ejemplo"
            />
          </Revelar>
          <div className="showroom__col">
            <Revelar orden={1}>
              <Foto
                className="showroom__foto"
                src="showroom-sillas.webp"
                alt="Sector de sillas (foto de ejemplo)"
                pie="Foto de ejemplo"
              />
            </Revelar>
            <Revelar orden={2}>
              <Foto
                className="showroom__foto"
                src="showroom-escritorio.webp"
                alt="Escritorio ejecutivo junto a un ventanal (foto de ejemplo)"
                pie="Foto de ejemplo"
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
                <a href={`https://wa.me/${TELEFONO_CRUDO}`} target="_blank" rel="noopener noreferrer">
                  Por WhatsApp
                </a>
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
            Oficina, comercio, consultorio, local gastronómico o tu casa: contanos cómo
            es el lugar y qué necesitás. Lo diseñamos con vos, lo fabricamos y lo
            dejamos instalado.
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
