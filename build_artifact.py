#!/usr/bin/env python3
"""
Empaqueta el sitio en un único HTML autocontenido, para publicarlo como
link sin servidor ni archivos sueltos.

Las cinco páginas pasan a ser cinco vistas dentro del mismo documento; el
CSS y el JS se incrustan, y cada foto viaja como data URI. Los enlaces de
navegación dejan de pedir archivos y cambian de vista.

El sitio de verdad sigue siendo el de la carpeta (index.html y compañía).
Esto es solo el formato de presentación.

    python3 build_artifact.py
"""

import base64
import os
import re
from pathlib import Path

RAIZ = Path(__file__).parent
SALIDA = RAIZ / "altobello-victorio.html"

VISTAS = [
    ("index.html",     "inicio",    "Inicio"),
    ("catalogo.html",  "catalogo",  "Catálogo"),
    ("servicios.html", "servicios", "Servicios"),
    ("proyectos.html", "proyectos", "Proyectos"),
    ("contacto.html",  "contacto",  "Contacto"),
]
ID = {archivo: ident for archivo, ident, _ in VISTAS}


def html_ascii(texto):
    """Escapa los acentos como entidades HTML.

    El archivo publicado no lleva <meta charset> propio: lo agrega el
    envoltorio. Dejando el texto en ASCII puro, la página se ve bien
    aunque el navegador decida otra codificación."""
    return texto.encode("ascii", "xmlcharrefreplace").decode("ascii")


def js_ascii(texto):
    r"""Lo mismo para el JavaScript, donde las entidades HTML no se
    interpretan: ahí el escape que sirve es \uXXXX."""
    return re.sub(r"[^\x00-\x7f]", lambda m: "\\u%04x" % ord(m.group()), texto)


def data_uri(ruta):
    tipo = "image/webp" if ruta.suffix == ".webp" else "image/jpeg"
    return f"data:{tipo};base64," + base64.b64encode(ruta.read_bytes()).decode()


# Las fotos que existen viajan incrustadas; las que faltan pierden el
# atributo, así el hueco degrada a bloque de color sin pedir un 404.
FOTOS = {p.name: data_uri(p) for p in sorted((RAIZ / "assets/img").glob("*.webp"))}


def incrustar_fotos(texto):
    def cambiar(m):
        nombre = m.group(1)
        if nombre in FOTOS:
            return f'data-img="{FOTOS[nombre]}"'
        return 'data-sin-foto="si"'
    return re.sub(r'data-img="assets/img/([^"]+)"', cambiar, texto)


def cuerpo(archivo):
    doc = (RAIZ / archivo).read_text(encoding="utf-8")
    main = re.search(r'<main id="principal">(.*?)</main>', doc, re.S).group(1)
    return incrustar_fotos(main)


def cabecera_y_pie(archivo):
    doc = (RAIZ / archivo).read_text(encoding="utf-8")
    cab = re.search(r'(<a class="btn btn--solido" href="#principal".*?)\n\n  <main', doc, re.S).group(1)
    pie = re.search(r'(<footer class="pie">.*?)\n  <script', doc, re.S).group(1)
    return incrustar_fotos(cab), incrustar_fotos(pie)


def enlaces_a_vistas(texto):
    """Los href a páginas pasan a ser saltos de vista dentro del documento."""
    for archivo, ident in ID.items():
        texto = texto.replace(f'href="{archivo}#', f'href="#{ident}--')
        texto = texto.replace(f'href="{archivo}"', f'href="#{ident}"')
    return texto


cab, pie = cabecera_y_pie("index.html")

vistas = "\n".join(
    f'    <section class="vista" id="{ident}" data-vista="{ident}"'
    f'{"" if ident == "inicio" else " hidden"} aria-label="{titulo}">\n'
    f'{cuerpo(archivo)}\n    </section>'
    for archivo, ident, titulo in VISTAS
)

css = (RAIZ / "assets/css/site.css").read_text(encoding="utf-8")
js = (RAIZ / "assets/js/site.js").read_text(encoding="utf-8")

NAVEGACION = """
/* ------------------------------------------------------------------
   Navegación entre vistas.
   En la versión publicada las cinco páginas viven en un solo documento,
   así que los enlaces cambian de sección en lugar de pedir un archivo.
   ------------------------------------------------------------------ */
(function () {
  "use strict";

  var vistas = Array.prototype.slice.call(document.querySelectorAll(".vista"));

  function activarRevelado(vista) {
    /* Un IntersectionObserver no dispara sobre elementos ocultos, así que
       al mostrar una vista hay que despertar lo que ya quedó en pantalla;
       lo de más abajo sigue apareciendo al hacer scroll. */
    vista.querySelectorAll(".revelar").forEach(function (el) {
      if (el.dataset.visto === "si") return;
      var caja = el.getBoundingClientRect();
      if (caja.top < window.innerHeight) el.dataset.visto = "si";
    });
  }

  function mostrar(ident, conScroll) {
    var destino = document.getElementById(ident);
    if (!destino) return false;

    vistas.forEach(function (v) { v.hidden = v !== destino; });

    document.querySelectorAll('.nav__enlace, .menu-movil a').forEach(function (a) {
      var suyo = a.getAttribute("href") === "#" + ident;
      if (suyo) { a.setAttribute("aria-current", "page"); }
      else { a.removeAttribute("aria-current"); }
    });

    if (conScroll) window.scrollTo({ top: 0, behavior: "auto" });
    activarRevelado(destino);
    window.setTimeout(function () { activarRevelado(destino); }, 350);
    return true;
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;

    var destino = a.getAttribute("href").slice(1).split("--")[0];
    if (!document.getElementById(destino)) return;

    e.preventDefault();
    mostrar(destino, true);
    if (history.replaceState) history.replaceState(null, "", "#" + destino);

    var menu = document.querySelector(".menu-movil");
    var boton = document.querySelector(".hamburguesa");
    if (menu && menu.dataset.abierto === "si") {
      menu.dataset.abierto = "no";
      if (boton) boton.setAttribute("aria-expanded", "false");
    }
  });

  var inicial = window.location.hash.slice(1).split("--")[0];
  if (inicial) mostrar(inicial, false);
})();
"""

AVISO = """
  <div class="cinta-boceto" role="note">
    <strong>Boceto de diseño</strong>
    <span>Propuesta en desarrollo. No es el sitio oficial de Altobello Victorio.</span>
  </div>
"""

ESTILO_EXTRA = """
/* Marca de boceto: esto es una propuesta de diseño, no el sitio en
   producción, y tiene que decirlo sin taparlo. */
.cinta-boceto {
  position: relative;
  z-index: 55;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.6rem 1rem;
  background: var(--naranja);
  color: var(--papel-puro);
  font-family: var(--dato);
  font-size: var(--t-xs);
  letter-spacing: 0.06em;
  text-align: center;
}
.cinta-boceto strong { text-transform: uppercase; letter-spacing: 0.12em; }
.cinta-boceto span { opacity: 0.9; }

.vista[hidden] { display: none; }
"""

doc = f"""<meta charset="utf-8">
<title>Altobello Victorio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Fira+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
{css}
{ESTILO_EXTRA}
</style>

{html_ascii(AVISO)}
{html_ascii(enlaces_a_vistas(cab))}

  <main id="principal">
{html_ascii(enlaces_a_vistas(vistas))}
  </main>

  {html_ascii(enlaces_a_vistas(pie))}

<script>
document.documentElement.classList.remove("sin-js");
{js_ascii(js)}
{js_ascii(NAVEGACION)}
</script>
"""

SALIDA.write_text(doc, encoding="utf-8")
print(f"{SALIDA.name}: {len(doc)/1024/1024:.2f} MB · {len(FOTOS)} fotos incrustadas")
