import Link from "next/link";

import { CATEGORIAS, PRODUCTOS, contarPiezas, EMPRESA } from "@/lib/datos";
import { Cifras } from "@/components/cifras";
import { FichaProducto } from "@/components/ficha-producto";
import { Flecha } from "@/components/flecha";
import { Foto } from "@/components/foto";
import { Revelar } from "@/components/revelar";

const DESTACADOS = ["silla-cool", "escritorio-prisma", "mesa-bote", "silla-cool-jazz"];

export default function Inicio() {
  const destacados = PRODUCTOS.filter((p) => DESTACADOS.includes(p.codigo));

  return (
    <>
      <section className="portada">
        <Foto className="portada__foto" src="amb-portada.webp" alt="Sala de reunión equipada" />
        <div className="portada__velo" />

        <div className="env portada__contenido">
          <div className="etiqueta entra">Rosario · desde {EMPRESA.desde}</div>
          <h1 className="entra" style={{ ["--paso" as string]: "70ms" }}>
            Equipamos oficinas que se usan ocho horas por día.
          </h1>
          <p className="portada__bajada entra" style={{ ["--paso" as string]: "140ms" }}>
            Fabricamos escritorios, sillas y mesas de reunión en nuestro taller
            de Rosario. Medimos tu espacio, te mostramos cómo va a quedar en 3D
            y lo dejamos instalado.
          </p>
          <div className="portada__acciones entra" style={{ ["--paso" as string]: "210ms" }}>
            <Link className="btn btn--acento" href="/catalogo">Ver el catálogo <Flecha /></Link>
            <Link className="btn btn--claro" href="/contacto">Pedir un relevamiento</Link>
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
            Cuatro familias de producto, fabricadas en el mismo taller. Se
            combinan entre sí porque comparten medidas, herrajes y terminaciones.
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
                  {c.descripcion}
                </p>
              </Link>
            </Revelar>
          ))}
        </div>
      </section>

      <section className="banda banda--oscura">
        <Foto className="banda__foto" src="amb-lounge.webp" alt="Oficina equipada"
              pie="Oficinas BEI Desarrollos, Rosario" />
        <div className="banda__texto">
          <div className="etiqueta">El taller</div>
          <h2>Una familia,<br />dos generaciones,<br />el mismo taller.</h2>
          <p>
            Victorio Altobello abrió en {EMPRESA.desde} y seguimos fabricando en
            Rosario, en {EMPRESA.fabrica.calle}. Eso cambia cosas concretas: si
            necesitás un escritorio de una medida que no está en el catálogo, lo
            hacemos. Si dentro de cinco años se rompe un herraje, tenemos el
            repuesto.
          </p>
          <Link className="btn btn--claro" href="/proyectos">
            Ver proyectos entregados <Flecha />
          </Link>
        </div>
      </section>

      <section className="seccion env">
        <Revelar className="enc-seccion">
          <div>
            <div className="etiqueta">Piezas de referencia</div>
            <h2>Por dónde suele empezar<br />una oficina</h2>
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
              <h2>Tres pasos, sin sorpresas</h2>
            </div>
            <p>
              El orden importa: nadie debería comprar veinte escritorios sin
              haber visto antes cómo entran en la planta.
            </p>
          </Revelar>

          <Revelar className="fila-serv">
            <div className="fila-serv__n">PASO 01</div>
            <h3>Relevamiento y diseño 3D</h3>
            <p>
              Vamos a tu oficina, medimos y armamos el proyecto en 3D con
              texturas de madera, pisos y terminaciones reales. Ves tu planta
              amueblada antes de decidir nada.
            </p>
            <Link className="enlace-flecha" href="/servicios">Ver cómo es <Flecha className="" /></Link>
          </Revelar>

          <Revelar className="fila-serv">
            <div className="fila-serv__n">PASO 02</div>
            <h3>Fabricación</h3>
            <p>
              Producimos en {EMPRESA.fabrica.calle}. Las medidas especiales y los
              frentes fuera de catálogo salen de la misma línea que el resto, sin
              recargo por ser distintos.
            </p>
            <Link className="enlace-flecha" href="/catalogo">Ver el catálogo <Flecha className="" /></Link>
          </Revelar>

          <Revelar className="fila-serv">
            <div className="fila-serv__n">PASO 03</div>
            <h3>Entrega y armado</h3>
            <p>
              Entregamos y armamos con equipo propio. Coordinamos fuera del
              horario laboral si hace falta, para que el lunes tu gente se siente
              y trabaje.
            </p>
            <Link className="enlace-flecha" href="/contacto">Coordinar una visita <Flecha className="" /></Link>
          </Revelar>
        </div>
      </section>

      <section className="banda banda--invertida">
        <Foto className="banda__foto" src="amb-sillas-color.webp" alt="Sillas ergonómicas"
              pie="Sillas ergonómicas · tapizados a elección" />
        <div className="banda__texto">
          <div className="etiqueta">Ergonomía</div>
          <h2>La silla es<br />la decisión que más<br />se nota.</h2>
          <p>
            Es el único mueble que tu equipo toca ocho horas seguidas. Nuestras
            sillas ergonómicas tienen respaldo de malla, apoyo lumbar regulable,
            altura y profundidad de asiento ajustables y apoyabrazos en dos ejes.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Podés probarlas en el showroom de {EMPRESA.showroom.calle} antes de comprar.
          </p>
          <Link className="btn btn--linea" href="/catalogo">Ver todas las sillas <Flecha /></Link>
        </div>
      </section>

      <section className="seccion env" style={{ textAlign: "center" }}>
        <Revelar style={{ maxWidth: "44rem", marginInline: "auto" }}>
          <div className="etiqueta" style={{ justifyContent: "center" }}>Siguiente paso</div>
          <h2>Contanos qué espacio<br />tenés que equipar</h2>
          <p style={{ margin: "1.25rem auto 0", color: "var(--humo)" }}>
            Mandanos los metros, la cantidad de puestos y, si tenés, el plano.
            Te devolvemos una propuesta con el 3D y el presupuesto cerrado.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link className="btn btn--acento" href="/contacto">Pedir presupuesto <Flecha /></Link>
            <a className="btn btn--linea" href={`tel:${EMPRESA.showroom.telHref}`}>
              Llamar al {EMPRESA.showroom.tel}
            </a>
          </div>
        </Revelar>
      </section>
    </>
  );
}
