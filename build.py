#!/usr/bin/env python3
"""
Generador del sitio de Altobello Victorio.

Arma las páginas HTML estáticas a partir de las plantillas y los datos
de producto de este archivo. Se ejecuta con `python3 build.py` y escribe
los .html en la raíz. Editá acá (no en los .html generados) para que la
cabecera, el pie y las fichas sigan siendo iguales en todo el sitio.
"""

import html
from pathlib import Path

RAIZ = Path(__file__).parent

# --------------------------------------------------------------------
# Datos de la empresa. Todo esto es real y verificable.
# --------------------------------------------------------------------
EMPRESA = {
    "nombre": "Altobello Victorio",
    "bajada": "Muebles para oficina",
    "desde": "1959",
    "calle": "Bv. Rondeau 3042",
    "ciudad": "Rosario, Santa Fe",
    "tel1": "(0341) 453-0004",
    "tel2": "(0341) 455-5606",
    "mail": "ventas@altobellovictorio.com.ar",
}

PAGINAS = [
    ("index.html", "Inicio"),
    ("catalogo.html", "Catálogo"),
    ("servicios.html", "Servicios"),
    ("proyectos.html", "Proyectos"),
    ("contacto.html", "Contacto"),
]

# --------------------------------------------------------------------
# Catálogo. Medidas en milímetros, como en una ficha técnica real.
# tono = color de reemplazo mientras no esté la foto en assets/img/.
# --------------------------------------------------------------------
CATEGORIAS = [
    ("escritorios",  "Escritorios",        "Ejecutivos, operativos y bench"),
    ("sillas",       "Sillas",             "Ergonómicas, operativas y de dirección"),
    ("reunion",      "Salas de reunión",   "Mesas de consejo y colaborativas"),
    ("espera",       "Recepción y espera", "Mostradores y sillonería"),
    ("guardado",     "Guardado",           "Bibliotecas, armarios y archivos"),
]

PRODUCTOS = [
    # (código, nombre, línea, categoría, ancho, prof, alto, tapizados, tono, img)
    ("ST-140", "Escritorio Strada 1400", "Línea Strada", "escritorios", 1400, 700, 750,
     ["#E4E0D6", "#C9A57A", "#0C1F1A"], "foto--roble", "escritorio-strada.jpg"),
    ("ST-BEN", "Bench Strada 4 puestos", "Línea Strada", "escritorios", 2800, 1400, 750,
     ["#E4E0D6", "#C9A57A"], "foto--roble", "bench-strada.jpg"),
    ("RD-180", "Escritorio Rondeau", "Línea Dirección", "escritorios", 1800, 900, 750,
     ["#0C1F1A", "#C9A57A"], "foto--tinta", "escritorio-rondeau.jpg"),
    ("LT-120", "Escritorio Litoral", "Línea Operativa", "escritorios", 1200, 600, 750,
     ["#E4E0D6", "#8FBFAC"], "foto--menta", "escritorio-litoral.jpg"),

    ("SE-AIR", "Silla Aire", "Ergonómicas", "sillas", 660, 640, 1250,
     ["#0C1F1A", "#D2571C", "#8FBFAC", "#E4E0D6"], "foto--tinta", "silla-aire.jpg"),
    ("SE-MSH", "Silla Mesh Alta", "Ergonómicas", "sillas", 680, 660, 1300,
     ["#0C1F1A", "#D2571C", "#8FBFAC"], "foto--verde", "silla-mesh.jpg"),
    ("SO-NDO", "Silla Nodo", "Operativas", "sillas", 600, 580, 950,
     ["#0C1F1A", "#8FBFAC", "#E4E0D6"], "foto--menta", "silla-nodo.jpg"),
    ("SD-DIR", "Sillón Dirección", "Línea Dirección", "sillas", 720, 720, 1220,
     ["#0C1F1A", "#5A4632"], "foto--tinta", "sillon-direccion.jpg"),

    ("MR-320", "Mesa Consejo 3200", "Salas de reunión", "reunion", 3200, 1200, 750,
     ["#C9A57A", "#E4E0D6", "#0C1F1A"], "foto--roble", "mesa-consejo.jpg"),
    ("MR-ARG", "Mesa Ágora redonda", "Colaborativas", "reunion", 1400, 1400, 750,
     ["#C9A57A", "#E4E0D6"], "foto--roble", "mesa-agora.jpg"),

    ("MO-ARC", "Mostrador Arco", "Recepción", "espera", 2400, 800, 1100,
     ["#C9A57A", "#0C1F1A"], "foto--roble", "mostrador-arco.jpg"),
    ("SF-E2C", "Sofá Espera 2 cuerpos", "Recepción", "espera", 1400, 750, 800,
     ["#8FBFAC", "#D2571C", "#0C1F1A"], "foto--menta", "sofa-espera.jpg"),

    ("BM-MOD", "Biblioteca Modular", "Guardado", "guardado", 900, 400, 1800,
     ["#E4E0D6", "#C9A57A"], "foto--roble", "biblioteca-modular.jpg"),
    ("AM-2PT", "Armario metálico 2 puertas", "Metálicos", "guardado", 900, 450, 1950,
     ["#E4E0D6", "#0C1F1A"], "foto--verde", "armario-metalico.jpg"),
    ("AR-4CJ", "Archivo 4 cajones", "Metálicos", "guardado", 470, 620, 1320,
     ["#E4E0D6", "#0C1F1A"], "foto--verde", "archivo-4cajones.jpg"),
]

# --------------------------------------------------------------------
# Piezas de plantilla
# --------------------------------------------------------------------
ISOTIPO = """<svg class="marca__iso" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" focusable="false">
        <path d="M30 0 L8 11.2 L30 11.2 Z M8 11.2 L30 22.4 L30 30 L8 30 Z" fill="{color}" transform="translate(-4 0)"/>
      </svg>"""


def marca(color="var(--tinta)", etiqueta=True):
    bajada = f'<span class="marca__bajada">{EMPRESA["bajada"]}</span>' if etiqueta else ""
    return f"""<span class="marca">
      {ISOTIPO.format(color=color)}
      <span class="marca__texto">
        <span class="marca__nombre">{EMPRESA["nombre"]}</span>
        {bajada}
      </span>
    </span>"""


ACTUAL = ' aria-current="page"'


def cabecera(activa):
    enlaces = "".join(
        '<a class="nav__enlace" href="%s"%s>%s</a>'
        % (arch, ACTUAL if arch == activa else "", txt)
        for arch, txt in PAGINAS
    )
    enlaces_movil = "".join(
        '<li><a href="%s"%s>%s</a></li>'
        % (arch, ACTUAL if arch == activa else "", txt)
        for arch, txt in PAGINAS
    )
    return f"""<a class="btn btn--solido" href="#principal"
     style="position:absolute;left:-9999px;top:0;z-index:100"
     onfocus="this.style.left='1rem';this.style.top='1rem'"
     onblur="this.style.left='-9999px'">Saltar al contenido</a>

  <header class="cabecera">
    <div class="env cabecera__barra">
      <a href="index.html" aria-label="Altobello Victorio, inicio">{marca()}</a>

      <nav class="nav nav--principal" aria-label="Principal">{enlaces}</nav>

      <div class="cabecera__acciones">
        <a class="tel" href="tel:+543414530004">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 2h3l1.4 3.5-1.8 1.2a10 10 0 0 0 3.7 3.7l1.2-1.8L14 10v3a1 1 0 0 1-1.1 1A11.5 11.5 0 0 1 2 3.1 1 1 0 0 1 3 2Z"
                  stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
          </svg>
          {EMPRESA["tel1"]}
        </a>
        <button class="btn btn--linea btn--presupuesto" type="button" data-abrir-panel
                aria-label="Abrir la lista de presupuesto">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M5.5 1.5h5v2h-5zM3.5 3.5h9v11h-9z" stroke="currentColor"
                  stroke-width="1.2" stroke-linejoin="round"/>
            <path d="M6 7.5h4M6 10.5h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
          <span class="btn__palabra">Presupuesto</span>
          <span class="contador" data-contador data-vacio="si">0</span>
        </button>
        <button class="hamburguesa" type="button" aria-expanded="false"
                aria-controls="menu-movil" aria-label="Abrir el menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <nav class="menu-movil" id="menu-movil" data-abierto="no" aria-label="Menú móvil">
      <div class="env"><ul>{enlaces_movil}</ul></div>
    </nav>
  </header>"""


PIE = f"""<footer class="pie">
    <div class="env">
      <div class="pie__cols">
        <div>
          {marca(color="var(--papel-puro)")}
          <p style="margin-top:1rem;font-size:var(--t-sm)">
            Empresa familiar rosarina. Fabricamos muebles y equipamiento
            para oficinas y locales comerciales desde {EMPRESA["desde"]}.
          </p>
        </div>
        <div>
          <div class="pie__titulo">Catálogo</div>
          <ul>
            <li><a href="catalogo.html#escritorios">Escritorios</a></li>
            <li><a href="catalogo.html#sillas">Sillas</a></li>
            <li><a href="catalogo.html#reunion">Salas de reunión</a></li>
            <li><a href="catalogo.html#espera">Recepción y espera</a></li>
            <li><a href="catalogo.html#guardado">Guardado</a></li>
          </ul>
        </div>
        <div>
          <div class="pie__titulo">Empresa</div>
          <ul>
            <li><a href="servicios.html">Servicios</a></li>
            <li><a href="proyectos.html">Proyectos</a></li>
            <li><a href="contacto.html">Contacto</a></li>
          </ul>
        </div>
        <div>
          <div class="pie__titulo">Dónde estamos</div>
          <ul>
            <li>{EMPRESA["calle"]}</li>
            <li>{EMPRESA["ciudad"]}</li>
            <li><a href="tel:+543414530004">{EMPRESA["tel1"]}</a></li>
            <li><a href="tel:+543414555606">{EMPRESA["tel2"]}</a></li>
            <li><a href="mailto:{EMPRESA["mail"]}">{EMPRESA["mail"]}</a></li>
          </ul>
        </div>
      </div>

      <div class="pie__legal">
        <span>© 2026 {EMPRESA["nombre"]} · Desde {EMPRESA["desde"]}</span>
        <span>Lunes a viernes de 8 a 17 h · Sábados de 9 a 13 h</span>
      </div>
    </div>
  </footer>

  <div class="panel-fondo" data-abierto="no" data-cerrar-panel></div>

  <aside class="panel" data-abierto="no" aria-hidden="true"
         aria-label="Lista de presupuesto">
    <div class="panel__enc">
      <div>
        <div class="etiqueta" style="margin:0">Tu lista</div>
        <strong style="font-family:var(--display);font-size:var(--t-md)">Pedido de presupuesto</strong>
      </div>
      <button class="cerrar" type="button" data-cerrar-panel aria-label="Cerrar la lista">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </button>
    </div>
    <div class="panel__lista"></div>
    <div class="panel__pie">
      <p style="font-size:var(--t-sm);color:var(--humo);margin-bottom:1rem">
        Armamos el presupuesto sobre el conjunto: a mayor volumen, mejor precio
        por pieza. Te respondemos dentro de las 24 h hábiles.
      </p>
      <a class="btn btn--acento" href="contacto.html" style="width:100%">
        Pedir presupuesto
        <svg class="btn__flecha" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
          <path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </a>
    </div>
  </aside>

  <div class="aviso" role="status" aria-live="polite" data-visible="no"></div>

  <script src="assets/js/site.js"></script>"""


def documento(archivo, titulo, descripcion, cuerpo, activa):
    return f"""<!DOCTYPE html>
<html lang="es-AR" class="sin-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{titulo}</title>
  <meta name="description" content="{descripcion}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Fira+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body>
{cabecera(activa)}

  <main id="principal">
{cuerpo}
  </main>

  {PIE}
</body>
</html>
"""


def flecha(clase="btn__flecha"):
    return (f'<svg class="{clase}" width="14" height="10" viewBox="0 0 14 10" '
            f'fill="none" aria-hidden="true">'
            f'<path d="M9 1l4 4-4 4M13 5H1" stroke="currentColor" stroke-width="1.5"/></svg>')


def slot_foto(clases, archivo, rotulo, pie=None, estilo=""):
    """Bloque de imagen que degrada a color sólido + rótulo si el archivo falta."""
    pie_html = f'<div class="foto__pie">{pie}</div>' if pie else ""
    return f"""<div class="foto {clases}" data-img="assets/img/{archivo}" style="{estilo}">
              <div class="foto__marca-agua">assets/img/<br>{archivo}</div>{pie_html}
            </div>"""


def tarjeta_producto(p, revelar=True):
    codigo, nombre, linea, cat, an, pr, al, tapizados, tono, img = p
    muestras = "".join(
        f'<span class="muestra" style="background:{c}"></span>' for c in tapizados
    )
    cls = "prod revelar" if revelar else "prod"
    return f"""<article class="{cls}" data-categoria="{cat}">
              {slot_foto(f"prod__foto {tono}", img, nombre)}
              <div class="prod__codigo">{codigo}</div>
              <h3 class="prod__nombre">{html.escape(nombre)}</h3>
              <div class="prod__linea">{linea}</div>
              <div class="prod__medidas">{an} × {pr} × {al} mm</div>
              <div class="prod__pie">
                <div class="muestras" title="Terminaciones disponibles">{muestras}</div>
                <button class="btn-sumar" type="button" data-sumar
                        data-codigo="{codigo}" data-nombre="{html.escape(nombre, quote=True)}"
                        data-tono="{tono}" data-img="assets/img/{img}">
                  <span data-etiqueta>Presupuestar</span>
                </button>
              </div>
            </article>"""


# ====================================================================
# INICIO
# ====================================================================
destacados = [p for p in PRODUCTOS if p[0] in ("SE-AIR", "ST-140", "MR-320", "MO-ARC")]

cat_tonos = {
    "escritorios": ("foto--roble", "escritorios.jpg"),
    "sillas":      ("foto--tinta", "sillas-trio.jpg"),
    "reunion":     ("foto--roble", "salas-reunion.jpg"),
    "espera":      ("foto--menta", "recepcion-espera.jpg"),
    "guardado":    ("foto--verde", "guardado.jpg"),
}

tarjetas_cat = "".join(
    f"""<a class="cat revelar" href="catalogo.html#{clave}">
            {slot_foto("cat__foto " + cat_tonos[clave][0], cat_tonos[clave][1], nombre)}
            <div class="cat__meta">
              <span class="cat__nombre">{nombre}</span>
              <span class="cat__n">{sum(1 for p in PRODUCTOS if p[3] == clave)} piezas</span>
            </div>
            <p style="font-size:var(--t-sm);color:var(--humo);margin:0">{desc}</p>
          </a>"""
    for clave, nombre, desc in CATEGORIAS
)

tarjetas_destacadas = "".join(tarjeta_producto(p) for p in destacados)

INICIO = f"""    <!-- Portada -->
    <section class="portada">
      {slot_foto("portada__foto", "oficina-colegio-arquitectos.jpg", "Oficina equipada")}
      <div class="portada__velo"></div>
      <div class="env portada__contenido">
        <div class="etiqueta entra">Rosario · desde {EMPRESA["desde"]}</div>
        <h1 class="entra" style="--paso:70ms">Equipamos oficinas que se usan ocho horas por día.</h1>
        <p class="portada__bajada entra" style="--paso:140ms">
          Fabricamos escritorios, sillas y guardado en nuestro taller de Rosario.
          Medimos tu espacio, te mostramos cómo va a quedar en 3D y lo dejamos instalado.
        </p>
        <div class="portada__acciones entra" style="--paso:210ms">
          <a class="btn btn--acento" href="catalogo.html">Ver el catálogo {flecha()}</a>
          <a class="btn btn--claro" href="contacto.html">Pedir un relevamiento</a>
        </div>
      </div>
      <div class="env">
        <div class="cifras entra" style="--paso:300ms">
          <div class="cifras__item">
            <span class="cifras__n">{EMPRESA["desde"]}</span>
            <span class="cifras__p">Año de fundación</span>
          </div>
          <div class="cifras__item">
            <span class="cifras__n">67</span>
            <span class="cifras__p">Años fabricando acá</span>
          </div>
          <div class="cifras__item">
            <span class="cifras__n">3D</span>
            <span class="cifras__p">Tu oficina antes de comprarla</span>
          </div>
          <div class="cifras__item">
            <span class="cifras__n">24 h</span>
            <span class="cifras__p">Respuesta a tu presupuesto</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Categorías -->
    <section class="seccion env" data-escalonar>
      <div class="enc-seccion revelar">
        <div>
          <div class="etiqueta">El catálogo</div>
          <h2>Todo lo que entra en una oficina</h2>
        </div>
        <p>Cinco familias de producto, fabricadas en el mismo taller.
           Se combinan entre sí porque comparten medidas, herrajes y terminaciones.</p>
      </div>
      <div class="rejilla-cat">
        {tarjetas_cat}
      </div>
    </section>

    <!-- Banda: el taller -->
    <section class="banda banda--oscura">
      {slot_foto("banda__foto foto--roble", "taller-rondeau.jpg", "Taller",
                 pie="Taller propio · Bv. Rondeau 3042, Rosario")}
      <div class="banda__texto">
        <div class="etiqueta">El taller</div>
        <h2>Una familia, dos generaciones,<br>el mismo taller.</h2>
        <p>
          Victorio Altobello abrió en {EMPRESA["desde"]} y seguimos en Rosario,
          fabricando acá. Eso cambia cosas concretas: si necesitás un escritorio
          de una medida que no está en el catálogo, lo hacemos. Si dentro de cinco
          años se rompe un herraje, tenemos el repuesto.
        </p>
        <a class="btn btn--claro" href="proyectos.html">Ver proyectos entregados {flecha()}</a>
      </div>
    </section>

    <!-- Destacados -->
    <section class="seccion env" data-escalonar>
      <div class="enc-seccion revelar">
        <div>
          <div class="etiqueta">Piezas de referencia</div>
          <h2>Por dónde suele empezar<br>una oficina</h2>
        </div>
        <a class="enlace-flecha" href="catalogo.html">Ver las {len(PRODUCTOS)} piezas {flecha("")}</a>
      </div>
      <div class="rejilla-prod">
        {tarjetas_destacadas}
      </div>
    </section>

    <!-- Cómo trabajamos -->
    <section class="seccion" style="background:var(--papel-puro)">
      <div class="env" data-escalonar>
        <div class="enc-seccion revelar">
          <div>
            <div class="etiqueta">Cómo trabajamos</div>
            <h2>Tres pasos, sin sorpresas</h2>
          </div>
          <p>El orden importa: nadie debería comprar veinte escritorios sin
             haber visto antes cómo entran en la planta.</p>
        </div>

        <div class="fila-serv revelar">
          <div class="fila-serv__n">PASO 01</div>
          <h3>Relevamiento y diseño 3D</h3>
          <p>Vamos a tu oficina, medimos y armamos el proyecto en 3D con
             texturas de madera, pisos y terminaciones reales. Ves tu planta
             amueblada antes de decidir nada.</p>
          <a class="enlace-flecha" href="servicios.html">Ver cómo es {flecha("")}</a>
        </div>

        <div class="fila-serv revelar">
          <div class="fila-serv__n">PASO 02</div>
          <h3>Fabricación</h3>
          <p>Producimos en Bv. Rondeau. Las medidas especiales y los frentes
             fuera de catálogo salen de la misma línea que el resto, sin
             recargo por ser distintos.</p>
          <a class="enlace-flecha" href="catalogo.html">Ver el catálogo {flecha("")}</a>
        </div>

        <div class="fila-serv revelar">
          <div class="fila-serv__n">PASO 03</div>
          <h3>Entrega y armado</h3>
          <p>Entregamos y armamos con equipo propio. Coordinamos fuera del
             horario laboral si hace falta, para que el lunes tu gente se
             siente y trabaje.</p>
          <a class="enlace-flecha" href="contacto.html">Coordinar una visita {flecha("")}</a>
        </div>
      </div>
    </section>

    <!-- Banda: sillas -->
    <section class="banda banda--invertida">
      {slot_foto("banda__foto foto--tinta", "sillas-ergonomicas.jpg", "Sillas ergonómicas",
                 pie="Silla Aire · malla y espuma de alta densidad")}
      <div class="banda__texto">
        <div class="etiqueta">Ergonomía</div>
        <h2>La silla es<br>la decisión que más<br>se nota.</h2>
        <p>
          Es el único mueble que tu equipo toca ocho horas seguidas. Nuestras
          sillas ergonómicas tienen respaldo de malla, apoyo lumbar regulable,
          altura y profundidad de asiento ajustables y apoyabrazos en dos ejes.
        </p>
        <p style="margin-top:1rem">
          Podés probarlas en el showroom de Bv. Rondeau antes de comprar.
        </p>
        <a class="btn btn--linea" href="catalogo.html#sillas">Ver todas las sillas {flecha()}</a>
      </div>
    </section>

    <!-- Cierre -->
    <section class="seccion env" style="text-align:center">
      <div class="revelar" style="max-width:44rem;margin-inline:auto">
        <div class="etiqueta" style="justify-content:center">Siguiente paso</div>
        <h2>Contanos qué espacio<br>tenés que equipar</h2>
        <p style="margin:1.25rem auto 0;color:var(--humo)">
          Mandanos los metros, la cantidad de puestos y, si tenés, el plano.
          Te devolvemos una propuesta con el 3D y el presupuesto cerrado.
        </p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem">
          <a class="btn btn--acento" href="contacto.html">Pedir presupuesto {flecha()}</a>
          <a class="btn btn--linea" href="tel:+543414530004">Llamar al {EMPRESA["tel1"]}</a>
        </div>
      </div>
    </section>
"""


# ====================================================================
# CATÁLOGO
# ====================================================================
casillas = "".join(
    f"""<label style="display:flex;align-items:center;gap:0.6rem;min-height:44px;cursor:pointer">
              <input type="checkbox" data-filtro value="{clave}" style="width:17px;height:17px;accent-color:var(--naranja)">
              <span style="flex:1">{nombre}</span>
              <span class="dato" style="font-size:var(--t-xs);color:var(--humo)">{sum(1 for p in PRODUCTOS if p[3] == clave)}</span>
            </label>"""
    for clave, nombre, _ in CATEGORIAS
)

todas_las_piezas = "".join(tarjeta_producto(p) for p in PRODUCTOS)

CATALOGO = f"""    <div class="env">
      <nav class="migas" aria-label="Migas de pan">
        <a href="index.html">Inicio</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Catálogo</span>
      </nav>
    </div>

    <section class="env" style="padding-bottom:3rem">
      <div class="enc-seccion" style="margin-bottom:0">
        <div>
          <div class="etiqueta">{len(PRODUCTOS)} piezas · {len(CATEGORIAS)} familias</div>
          <h1 style="font-size:var(--t-2xl)">Catálogo</h1>
        </div>
        <p>Las medidas están en milímetros y son las de serie. Casi todo se
           fabrica también a medida — si necesitás otra, preguntanos.</p>
      </div>
    </section>

    <hr class="regla">

    <section class="seccion--ajustada env">
      <div style="display:grid;grid-template-columns:240px 1fr;gap:3.5rem;align-items:start"
           class="cat-layout">

        <!-- Filtros -->
        <aside style="position:sticky;top:100px" aria-label="Filtros">
          <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:1rem">
            <strong style="font-family:var(--display);font-size:var(--t-md)">Filtros</strong>
            <button type="button" data-limpiar
                    style="background:none;border:0;cursor:pointer;font-family:var(--dato);font-size:var(--t-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--humo);padding:0.5rem 0">
              Limpiar
            </button>
          </div>

          <fieldset style="border:0;padding:0;margin:0 0 2rem">
            <legend class="etiqueta" style="margin-bottom:0.75rem">Familia</legend>
            {casillas}
          </fieldset>

          <div style="border-top:var(--borde);padding-top:1.5rem">
            <div class="etiqueta">¿No lo encontrás?</div>
            <p style="font-size:var(--t-sm);color:var(--humo)">
              Fabricamos a medida. Contanos qué necesitás y te cotizamos.
            </p>
            <a class="enlace-flecha" href="contacto.html" style="margin-top:1rem">Consultar {flecha("")}</a>
          </div>
        </aside>

        <!-- Piezas -->
        <div>
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;padding-bottom:1.5rem;border-bottom:var(--borde);margin-bottom:2.5rem">
            <span class="dato" data-conteo style="font-size:var(--t-sm);color:var(--humo)">
              Mostrando las {len(PRODUCTOS)} piezas
            </span>
            <span class="dato" style="font-size:var(--t-xs);color:var(--humo)">
              Medidas: ancho × profundidad × alto (mm)
            </span>
          </div>

          <div class="rejilla-prod" data-escalonar>
            {todas_las_piezas}
          </div>

          <div style="margin-top:4rem;padding:2.5rem;background:var(--papel-puro);border:var(--borde);text-align:center">
            <h3>¿Estás equipando una oficina entera?</h3>
            <p style="margin:0.75rem auto 0;color:var(--humo)">
              Sumá las piezas que te interesen a la lista y pedí un presupuesto
              por el conjunto. A mayor volumen, mejor precio por pieza.
            </p>
            <a class="btn btn--solido" href="contacto.html" style="margin-top:1.75rem">
              Pedir presupuesto {flecha()}
            </a>
          </div>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 900px) {{
        .cat-layout {{ grid-template-columns: 1fr !important; gap: 2rem !important; }}
        .cat-layout > aside {{ position: static !important; }}
      }}
    </style>
"""


# ====================================================================
# SERVICIOS
# ====================================================================
SERVICIOS = f"""    <div class="env">
      <nav class="migas" aria-label="Migas de pan">
        <a href="index.html">Inicio</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Servicios</span>
      </nav>
    </div>

    <section class="env" style="padding-bottom:3.5rem">
      <div class="enc-seccion" style="margin-bottom:0">
        <div>
          <div class="etiqueta">Servicios</div>
          <h1 style="font-size:var(--t-2xl)">No vendemos muebles sueltos.<br>Entregamos la oficina puesta.</h1>
        </div>
        <p>Desde la primera medición hasta el último tornillo. Todo con equipo
           propio, sin tercerizar la parte que más se nota.</p>
      </div>
    </section>

    <section class="banda">
      {slot_foto("banda__foto foto--menta", "diseno-3d.jpg", "Diseño 3D",
                 pie="Proyecto 3D · texturas de madera, pisos y terminaciones reales")}
      <div class="banda__texto">
        <div class="etiqueta">Servicio 01</div>
        <h2>Diseño 3D</h2>
        <p>
          Tomamos las medidas de tu planta y la dibujamos amueblada. Vas a ver
          los escritorios en su lugar, los colores de tapizado que elegiste y
          cómo circula la gente entre los puestos.
        </p>
        <p style="margin-top:1rem">
          Sirve para discutir con tu equipo antes de firmar nada, y para darte
          cuenta de que ese pasillo de 70 cm era angosto.
        </p>
        <a class="btn btn--linea" href="contacto.html">Pedir un proyecto 3D {flecha()}</a>
      </div>
    </section>

    <section class="banda banda--invertida banda--oscura">
      {slot_foto("banda__foto foto--roble", "fabricacion.jpg", "Fabricación",
                 pie="Producción propia · Bv. Rondeau 3042")}
      <div class="banda__texto">
        <div class="etiqueta">Servicio 02</div>
        <h2>Fabricación a medida</h2>
        <p>
          El catálogo es un punto de partida. Si tu espacio pide un escritorio
          de 1650 mm, una mesa en L o un mostrador que siga una pared curva,
          sale de la misma línea de producción.
        </p>
        <p style="margin-top:1rem">
          Y como fabricamos nosotros, dentro de cinco años seguimos teniendo
          el herraje, la tapa y el color exactos para ampliar o reponer.
        </p>
        <a class="btn btn--claro" href="contacto.html">Consultar una medida especial {flecha()}</a>
      </div>
    </section>

    <section class="banda">
      {slot_foto("banda__foto foto--verde", "instalacion.jpg", "Instalación",
                 pie="Entrega y armado con equipo propio")}
      <div class="banda__texto">
        <div class="etiqueta">Servicio 03</div>
        <h2>Entrega e instalación</h2>
        <p>
          Llevamos, armamos, nivelamos y nos llevamos el embalaje. Si tu oficina
          no puede parar, coordinamos el armado para un fin de semana o fuera
          del horario laboral.
        </p>
        <p style="margin-top:1rem">
          En mudanzas grandes vamos por sectores, para que nunca haya un piso
          entero sin poder trabajar.
        </p>
        <a class="btn btn--linea" href="contacto.html">Coordinar una entrega {flecha()}</a>
      </div>
    </section>

    <section class="seccion env" data-escalonar>
      <div class="enc-seccion revelar">
        <div>
          <div class="etiqueta">Además</div>
          <h2>Lo que casi nadie pregunta<br>y después importa</h2>
        </div>
      </div>

      <div class="fila-serv revelar">
        <div class="fila-serv__n">01</div>
        <h3>Garantía y repuestos</h3>
        <p>Fabricamos las piezas, así que tenemos los repuestos. Un pistón,
           una rueda o un cajón se cambian sin reemplazar el mueble entero.</p>
        <span class="dato" style="font-size:var(--t-xs);color:var(--humo)">CONSULTAR PLAZOS</span>
      </div>

      <div class="fila-serv revelar">
        <div class="fila-serv__n">02</div>
        <h3>Ampliaciones</h3>
        <p>Si el año que viene sumás seis puestos, los hacemos iguales a los
           que ya tenés: misma tapa, mismo canto, mismo color.</p>
        <span class="dato" style="font-size:var(--t-xs);color:var(--humo)">SIN MÍNIMO</span>
      </div>

      <div class="fila-serv revelar">
        <div class="fila-serv__n">03</div>
        <h3>Showroom</h3>
        <p>Bv. Rondeau 3042, Rosario. Vení a sentarte en las sillas antes de
           comprar veinte. Es la única forma seria de elegirlas.</p>
        <span class="dato" style="font-size:var(--t-xs);color:var(--humo)">LUN A VIE 8–17 H</span>
      </div>
    </section>
"""


# ====================================================================
# PROYECTOS
# ====================================================================
# Los dos primeros son proyectos reales acreditados en el material de
# la empresa. El resto son ejemplos de muestra hasta que nos pasen la
# lista definitiva.
PROYECTOS = [
    ("Colegio de Arquitectos", "Rosario, Santa Fe", "Biblioteca, sala de reunión y puestos de trabajo",
     "colegio-arquitectos.jpg", "foto--roble", True),
    ("BEI Desarrollos", "Rosario, Santa Fe", "Oficinas con Línea Strada",
     "bei-desarrollos.jpg", "foto--menta", False),
    ("Estudio contable", "Rosario, Santa Fe", "12 puestos operativos y sala de reunión",
     "estudio-contable.jpg", "foto--verde", False),
    ("Planta industrial", "Pérez, Santa Fe", "Oficinas administrativas y comedor",
     "planta-industrial.jpg", "foto--tinta", False),
    ("Consultorios", "Rosario, Santa Fe", "Recepción, espera y guardado",
     "consultorios.jpg", "foto--menta", False),
]

tarjetas_proy = "".join(
    f"""<article class="proy revelar{' proy--ancho' if ancho else ''}">
          {slot_foto("proy__foto " + tono, img, nombre)}
          <div class="proy__meta">
            <div>
              <h3 class="proy__nombre">{nombre}</h3>
              <p style="font-size:var(--t-sm);color:var(--humo);margin-top:0.2rem">{desc}</p>
            </div>
            <span class="proy__lugar">{lugar}</span>
          </div>
        </article>"""
    for nombre, lugar, desc, img, tono, ancho in PROYECTOS
)

PROYECTOS_HTML = f"""    <div class="env">
      <nav class="migas" aria-label="Migas de pan">
        <a href="index.html">Inicio</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Proyectos</span>
      </nav>
    </div>

    <section class="env" style="padding-bottom:3.5rem">
      <div class="enc-seccion" style="margin-bottom:0">
        <div>
          <div class="etiqueta">Proyectos entregados</div>
          <h1 style="font-size:var(--t-2xl)">Oficinas donde<br>ya se está trabajando</h1>
        </div>
        <p>Estudios, plantas industriales, consultorios e instituciones.
           La mayoría en Rosario y alrededores.</p>
      </div>
    </section>

    <section class="seccion--ajustada env">
      <div class="rejilla-proy" data-escalonar>
        {tarjetas_proy}
      </div>
    </section>

    <section class="banda banda--oscura">
      {slot_foto("banda__foto foto--roble", "colegio-arquitectos-detalle.jpg", "Detalle",
                 pie="Colegio de Arquitectos, Rosario")}
      <div class="banda__texto">
        <div class="etiqueta">Un caso</div>
        <h2>Colegio de Arquitectos<br>de Rosario</h2>
        <p>
          Un edificio de hormigón visto, doble altura y mucho vidrio: cualquier
          mueble ahí queda expuesto desde los dos pisos. Elegimos tapas blancas
          y estructuras finas para que el equipamiento no compitiera con la
          arquitectura.
        </p>
        <p style="margin-top:1rem">
          Biblioteca modular de piso a techo, mesas de trabajo de 2400 mm y
          sillas operativas con respaldo de malla.
        </p>
        <a class="btn btn--claro" href="contacto.html">Contanos tu proyecto {flecha()}</a>
      </div>
    </section>

    <section class="seccion env" style="text-align:center">
      <div class="revelar" style="max-width:42rem;margin-inline:auto">
        <div class="etiqueta" style="justify-content:center">Tu turno</div>
        <h2>¿Arrancamos con el tuyo?</h2>
        <p style="margin:1.25rem auto 0;color:var(--humo)">
          Mandanos el plano o los metros y te armamos una propuesta.
        </p>
        <a class="btn btn--acento" href="contacto.html" style="margin-top:2rem">
          Pedir presupuesto {flecha()}
        </a>
      </div>
    </section>
"""


# ====================================================================
# CONTACTO
# ====================================================================
opciones_cat = "".join(
    f'<option value="{clave}">{nombre}</option>' for clave, nombre, _ in CATEGORIAS
)

CONTACTO = f"""    <div class="env">
      <nav class="migas" aria-label="Migas de pan">
        <a href="index.html">Inicio</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Contacto</span>
      </nav>
    </div>

    <section class="seccion--ajustada env">
      <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:4rem;align-items:start"
           class="contacto-layout">

        <!-- Formulario -->
        <div>
          <div class="etiqueta">Pedido de presupuesto</div>
          <h1 style="font-size:var(--t-2xl)">Contanos qué<br>necesitás equipar</h1>
          <p style="margin-top:1rem;color:var(--humo)">
            Cuanto más nos digas, más preciso sale el presupuesto. Si tenés el
            plano, mejor todavía.
          </p>

          <div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--naranja-cl);border-left:3px solid var(--naranja)">
            <div class="etiqueta" style="margin-bottom:0.4rem;color:var(--naranja)">Tu lista</div>
            <p class="dato" data-resumen-lista style="font-size:var(--t-sm);color:var(--tinta)"></p>
          </div>

          <form data-form-presupuesto novalidate>
            <div class="rejilla-form">
              <div class="campo">
                <label for="nombre">Nombre y apellido</label>
                <input id="nombre" name="nombre" type="text" autocomplete="name" required>
              </div>
              <div class="campo">
                <label for="empresa">Empresa</label>
                <input id="empresa" name="empresa" type="text" autocomplete="organization">
              </div>
              <div class="campo">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" autocomplete="email" required>
              </div>
              <div class="campo">
                <label for="telefono">Teléfono</label>
                <input id="telefono" name="telefono" type="tel" autocomplete="tel">
              </div>
              <div class="campo">
                <label for="familia">Qué necesitás</label>
                <select id="familia" name="familia">
                  <option value="">Elegí una familia</option>
                  {opciones_cat}
                  <option value="proyecto">Una oficina completa</option>
                </select>
              </div>
              <div class="campo">
                <label for="puestos">Cantidad de puestos</label>
                <input id="puestos" name="puestos" type="number" min="1" inputmode="numeric" placeholder="Ej: 12">
              </div>
              <div class="campo ancho-total">
                <label for="mensaje">Contanos un poco más</label>
                <textarea id="mensaje" name="mensaje"
                          placeholder="Metros del espacio, plazos, si ya tenés muebles que querés conservar…"></textarea>
                <span class="campo__ayuda">Si tenés plano en PDF o DWG, mencionalo y te lo pedimos por mail.</span>
              </div>
            </div>

            <button class="btn btn--acento" type="submit" style="margin-top:2rem">
              Enviar el pedido {flecha()}
            </button>

            <p data-estado-form hidden tabindex="-1"
               style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--papel-puro);border:var(--borde);font-size:var(--t-sm)"></p>
          </form>
        </div>

        <!-- Datos -->
        <aside style="background:var(--papel-puro);border:var(--borde);padding:2rem">
          <div class="etiqueta">Dónde estamos</div>
          <h2 style="font-size:var(--t-lg)">Showroom y taller</h2>
          <p style="margin-top:0.75rem;color:var(--humo)">
            Es el mismo lugar: podés ver cómo se fabrica y sentarte en las
            sillas el mismo día.
          </p>

          <dl style="margin:2rem 0 0;display:grid;gap:1.35rem">
            <div>
              <dt class="etiqueta" style="margin-bottom:0.3rem">Dirección</dt>
              <dd style="margin:0">{EMPRESA["calle"]}<br>{EMPRESA["ciudad"]}</dd>
            </div>
            <div>
              <dt class="etiqueta" style="margin-bottom:0.3rem">Teléfonos</dt>
              <dd style="margin:0">
                <a class="dato" href="tel:+543414530004">{EMPRESA["tel1"]}</a><br>
                <a class="dato" href="tel:+543414555606">{EMPRESA["tel2"]}</a>
              </dd>
            </div>
            <div>
              <dt class="etiqueta" style="margin-bottom:0.3rem">Email</dt>
              <dd style="margin:0"><a href="mailto:{EMPRESA["mail"]}">{EMPRESA["mail"]}</a></dd>
            </div>
            <div>
              <dt class="etiqueta" style="margin-bottom:0.3rem">Horarios</dt>
              <dd style="margin:0" class="dato">
                Lun a vie · 8 a 17 h<br>
                Sábados · 9 a 13 h
              </dd>
            </div>
          </dl>

          {slot_foto("foto--roble", "frente-local.jpg", "Frente del local",
                     estilo="aspect-ratio:4/3;margin-top:2rem")}
        </aside>
      </div>
    </section>

    <style>
      @media (max-width: 900px) {{
        .contacto-layout {{ grid-template-columns: 1fr !important; gap: 2.5rem !important; }}
      }}
    </style>
"""


# ====================================================================
# Escritura
# ====================================================================
SITIO = [
    ("index.html", "Altobello Victorio · Muebles para oficina en Rosario",
     "Fabricamos escritorios, sillas ergonómicas y guardado para oficinas en Rosario desde 1959. Relevamiento, proyecto 3D, fabricación propia e instalación.",
     INICIO, "index.html"),
    ("catalogo.html", "Catálogo · Altobello Victorio",
     "Escritorios, sillas, salas de reunión, recepción y guardado. Medidas de serie y fabricación a medida.",
     CATALOGO, "catalogo.html"),
    ("servicios.html", "Servicios · Altobello Victorio",
     "Relevamiento y diseño 3D, fabricación a medida, entrega e instalación con equipo propio en Rosario.",
     SERVICIOS, "servicios.html"),
    ("proyectos.html", "Proyectos · Altobello Victorio",
     "Oficinas equipadas en Rosario y alrededores: instituciones, estudios, plantas industriales y consultorios.",
     PROYECTOS_HTML, "proyectos.html"),
    ("contacto.html", "Contacto · Altobello Victorio",
     "Pedí tu presupuesto. Showroom y taller en Bv. Rondeau 3042, Rosario.",
     CONTACTO, "contacto.html"),
]

if __name__ == "__main__":
    for archivo, titulo, desc, cuerpo, activa in SITIO:
        (RAIZ / archivo).write_text(
            documento(archivo, titulo, desc, cuerpo, activa), encoding="utf-8"
        )
        print("escrito:", archivo)
