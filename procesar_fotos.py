#!/usr/bin/env python3
"""
Prepara las fotos de producto para el sitio.

Lee los originales de `fotos-originales/` y escribe en `assets/img/` las
versiones que usa el sitio: fichas cuadradas, portadas de categoría y las
bandas anchas.

Hace tres cosas con cada foto:

1. Quita la marca de agua. Es el chevron de la marca, impreso en gris
   claro en la esquina inferior derecha de todos los originales. Sobre
   fondo blanco no se nota, pero al recortar el producto sobre el verde
   de la marca queda como una mancha clara. Su posición es la misma en
   las 17 fotos, así que se detecta sola: son los píxeles que están
   oscuros en TODAS (un producto nunca coincide con otro).

2. Reemplaza el blanco del fondo por el color de destino, con una franja
   de mezcla en el borde para no dejar el recorte dentado. El umbral es
   alto a propósito: los productos blancos (el Escritorio Prisma, por
   ejemplo) se desplazan unos pocos niveles, invisible sobre papel.

3. Encuadra sin deformar: el producto se escala y se centra sobre un
   lienzo del tamaño pedido.

Se ejecuta con `python3 procesar_fotos.py`. Requiere Pillow y numpy.
"""

import glob
import os

import numpy as np
from PIL import Image, ImageFilter

SRC = "fotos-originales"
DST = "public/img"   # lo sirve Next desde /img

PAPEL = (252, 251, 248)   # --papel-puro
TINTA = (12, 31, 26)      # --tinta

# Ventana donde vive la marca de agua, en coordenadas relativas.
VENTANA = (0.54, 0.58, 0.92, 0.99)   # x1, y1, x2, y2


def cargar(nombre):
    """Abre una foto y aplana la transparencia sobre blanco."""
    im = Image.open(os.path.join(SRC, nombre))
    if im.mode == "RGBA":
        fondo = Image.new("RGB", im.size, (255, 255, 255))
        fondo.paste(im, mask=im.split()[3])
        return fondo
    return im.convert("RGB")


def detectar_marca(archivos, n=480):
    """Los píxeles oscuros en todas las fotos a la vez son la marca."""
    pila = np.stack([
        np.asarray(cargar(os.path.basename(f)).convert("L").resize((n, n), Image.LANCZOS))
        for f in archivos
    ])
    constante = (pila < 253).all(axis=0)

    ventana = np.zeros_like(constante)
    x1, y1, x2, y2 = VENTANA
    ventana[int(y1 * n):int(y2 * n), int(x1 * n):int(x2 * n)] = True

    marca = Image.fromarray(((constante & ventana) * 255).astype(np.uint8))
    return marca.filter(ImageFilter.MaxFilter(11))  # dilatada, para el antialiasing


def limpiar(im, marca, fondo, piso=235):
    """Borra la marca de agua y cambia el blanco por el color de fondo.

    `piso` es donde arranca la franja de mezcla. Sobre papel alcanza con
    235. Sobre el verde de la marca hay que bajarlo bastante: si no, el
    gris del antialiasing del recorte sobrevive y deja un halo claro
    rodeando al producto."""
    a = np.asarray(im, dtype=np.float32)

    m = np.asarray(marca.resize(im.size, Image.NEAREST)) > 127
    a[m] = 255.0                       # la marca pasa a ser fondo

    lum = a.mean(axis=2)
    destino = np.array(fondo, dtype=np.float32)

    salida = a.copy()
    salida[lum >= 250] = destino       # fondo puro

    borde = (lum >= piso) & (lum < 250) # franja de mezcla
    t = ((lum[borde] - piso) / (250 - piso))[:, None]
    salida[borde] = a[borde] * (1 - t) + destino * t

    return Image.fromarray(salida.astype(np.uint8))


def recortar_al_contenido(im, fondo, margen=0.04):
    """Recorta el aire sobrede más alrededor del producto.

    Los originales vienen con mucho margen blanco, distinto en cada foto.
    Sin esto, un escritorio ancho y un perchero angosto ocupan porciones
    muy distintas de su tarjeta y la grilla se ve despareja."""
    a = np.asarray(im, dtype=np.int16)
    dist = np.abs(a - np.array(fondo, dtype=np.int16)).sum(axis=2)
    ys, xs = np.nonzero(dist > 24)
    if not len(xs):
        return im

    m = int(max(im.width, im.height) * margen)
    return im.crop((max(xs.min() - m, 0), max(ys.min() - m, 0),
                    min(xs.max() + m, im.width), min(ys.max() + m, im.height)))


def encuadrar(nombre, salida, ancho, alto, marca, fondo=PAPEL, escala=0.80, dx=0.5):
    # Sobre fondo oscuro el recorte tiene que ser mucho más agresivo.
    piso = 150 if sum(fondo) < 300 else 235
    im = recortar_al_contenido(limpiar(cargar(nombre), marca, fondo, piso), fondo)

    # Escala para caber entero dentro del lienzo, sin deformar.
    f = min(ancho * escala / im.width, alto * escala / im.height)
    im = im.resize((max(int(im.width * f), 1), max(int(im.height * f), 1)), Image.LANCZOS)

    lienzo = Image.new("RGB", (ancho, alto), fondo)
    lienzo.paste(im, (int((ancho - im.width) * dx), (alto - im.height) // 2))
    lienzo.save(os.path.join(DST, salida), "WEBP", quality=88, method=6)
    return salida


# Ficha de producto: cuadrada, sobre papel.
FICHAS = {
    "Cool 1.webp":                     "silla-cool.webp",
    "Cool Jazz 1.webp":                "silla-cool-jazz.webp",
    "Equis 1.webp":                    "silla-equis.webp",
    "Paulin.webp":                     "butaca-paulin.webp",
    "Escritorio Prisma.webp":          "escritorio-prisma.webp",
    "Escritorio Recto.webp":           "escritorio-recto.webp",
    "Escritorio Strada con rack.webp": "escritorio-strada.webp",
    "Escritorio ergonomico.webp":      "escritorio-ergonomico.webp",
    "Escritorio tetra con rack.webp":  "escritorio-tetra.webp",
    "Mesa Bote.webp":                  "mesa-bote.webp",
    "Mesa Redonda.webp":               "mesa-redonda.webp",
    "Percheros.webp":                  "perchero.webp",
}

# Portada de categoría: vertical 4:5, sobre papel.
CATEGORIAS = {
    "Escritorio Prisma.webp": "cat-escritorios.webp",
    "Cool 4.webp":            "cat-sillas.webp",
    "Mesa Bote.webp":         "cat-reunion.webp",
    "Percheros.webp":         "cat-accesorios.webp",
}

# Antes había aquí composiciones de producto recortado sobre el verde
# de la marca, que hacían de portada y de bandas mientras no hubo fotos
# de ambiente. Las reemplazaron las fotos reales de oficinas.
ANCHAS = []


if __name__ == "__main__":
    os.makedirs(DST, exist_ok=True)
    marca = detectar_marca(sorted(glob.glob(os.path.join(SRC, "*.webp"))))

    for origen, salida in FICHAS.items():
        print("ficha    ", encuadrar(origen, salida, 1000, 1000, marca, PAPEL, 0.92))

    for origen, salida in CATEGORIAS.items():
        print("categoría", encuadrar(origen, salida, 1000, 1250, marca, PAPEL, 0.82))

    for origen, salida, an, al, fondo, esc, dx in ANCHAS:
        print("ancha    ", encuadrar(origen, salida, an, al, marca, fondo, esc, dx))


# --------------------------------------------------------------------
# Logo
# --------------------------------------------------------------------
# El original es el lockup completo (isotipo + nombre + bajada) en un
# solo color sobre transparencia. De ahí salen las dos versiones que usa
# el sitio: la oscura para la cabecera y la clara para el pie, que va
# sobre el verde de la marca. Recolorear conserva el alfa, así que los
# bordes suavizados siguen limpios sobre cualquier fondo.
LOGO = "logo-altobello-victorio.webp"


def recolorear_logo(origen, salida, color, alto=120):
    im = Image.open(os.path.join(SRC, origen)).convert("RGBA")

    caja = im.getbbox()          # recorta el aire alrededor del lockup
    if caja:
        im = im.crop(caja)

    ancho = max(int(im.width * alto / im.height), 1)
    im = im.resize((ancho, alto), Image.LANCZOS)

    tenido = Image.new("RGBA", im.size, color + (255,))
    tenido.putalpha(im.getchannel("A"))
    tenido.save(os.path.join(DST, salida), "WEBP", quality=92, method=6, lossless=True)
    return salida


if __name__ == "__main__":
    print("logo     ", recolorear_logo(LOGO, "logo.webp", TINTA))
    print("logo     ", recolorear_logo(LOGO, "logo-blanco.webp", PAPEL))


# --------------------------------------------------------------------
# Fotos de ambiente
# --------------------------------------------------------------------
# Tres de las cuatro vienen con el texto del banner quemado en la imagen
# (son piezas de la web actual, no fotos limpias). No se puede poner un
# titular del sitio encima de otro titular, así que en vez de taparlo se
# recortan las zonas limpias. Los recortes están en fracciones de la
# imagen: x1, y1, x2, y2.
AMBIENTE = [
    # (origen, salida, recorte, ancho de salida, qué muestra)
    # La foto de Línea Strada solo sirve por su derecha: el titular
    # quemado cruza el centro y bajar el recorte para esquivarlo cortaba
    # los escritorios, que son lo que había que mostrar.
    # La portada usa la foto entera, no una mitad: recortada a la mitad
    # quedaban 955 px estirados a todo el ancho de la pantalla y se veía
    # blanda. Completa son 1920 y es la única sin texto quemado.
    ("doble foto.webp", "amb-portada.webp",
     (0.0, 0.0, 1.0, 1.0), 1920,
     "Portada. Foto completa, sin recorte, a resolución original."),

    ("Linea strada.webp", "amb-lounge.webp",
     (0.63, 0.0, 1.0, 0.88), 900,
     "Zona de estar de la misma oficina, a la derecha del titular."),

    ("doble foto.webp", "amb-sillas-color.webp",
     (0.0, 0.0, 0.497, 1.0), 1100,
     "Tres sillas ergonómicas en blanco, naranja y verde. Sin texto."),

    ("doble foto.webp", "amb-sala-reunion.webp",
     (0.503, 0.0, 1.0, 1.0), 1100,
     "Sala de reunión con ventanal. Sin texto."),

    ("Muebles que ordenan y potencian tu espacio.webp", "amb-biblioteca.webp",
     (0.0, 0.0, 0.497, 0.66), 1100,
     "Biblioteca del Colegio de Arquitectos. Corta por encima del titular."),

    ("Muebles que ordenan y potencian tu espacio.webp", "amb-atrio.webp",
     (0.503, 0.0, 1.0, 1.0), 1100,
     "Atrio vidriado del Colegio de Arquitectos. Mitad limpia."),

    ("Sillas ergonomicas diseñadas para tu comodidad.webp", "amb-silla-negro.webp",
     (0.0, 0.0, 0.32, 1.0), 700,
     "Silla ergonómica sobre negro, a la izquierda del titular."),

]


def recortar(origen, salida, caja, ancho):
    """Recorta una región y la reescala. Sin lienzo ni relleno: son
    fotos de ambiente, se usan a sangre con background-size: cover."""
    im = Image.open(os.path.join(SRC, origen)).convert("RGB")
    x1, y1, x2, y2 = caja
    im = im.crop((int(x1 * im.width), int(y1 * im.height),
                  int(x2 * im.width), int(y2 * im.height)))

    if im.width > ancho:
        im = im.resize((ancho, max(int(im.height * ancho / im.width), 1)), Image.LANCZOS)

    im.save(os.path.join(DST, salida), "WEBP", quality=88, method=6)
    return salida, im.width, im.height


if __name__ == "__main__":
    for origen, salida, caja, ancho, _ in AMBIENTE:
        nombre, an, al = recortar(origen, salida, caja, ancho)
        print(f"ambiente  {nombre:28s} {an}x{al}")


# --------------------------------------------------------------------
# Fotos de proyectos
# --------------------------------------------------------------------
# Salen de posteos de Instagram que nombran la obra. Van enteras, a su
# proporción, en la página de cada proyecto. Algunas capturas traen
# bandas negras arriba y abajo (una foto vertical encajada en un cuadro):
# se recortan antes de guardar.
#
# El recorte vive acá y no en AMBIENTE a propósito: ahí hay una foto
# sobre fondo negro que tiene que quedar como está. Son .jpg, no .webp:
# la detección de la marca de agua solo mira los .webp de producto, así
# que no la alteran.
PROYECTOS = [
    # (origen, salida, qué muestra)
    ("Coworking Banco Municipal 1.jpg", "proy-banco-municipal-1.webp",
     "Coworking de Banco Municipal en La Favorita, vista general con ventanal."),
    ("Coworking Banco Municipal 2.jpg", "proy-banco-municipal-2.webp",
     "Mismo coworking: mesa larga y barra con taburetes."),

    ("Don Palacios 1.jpg", "proy-don-palacios-1.webp",
     "Mesa de reunión frente al revestimiento de listones con TV."),
    ("Don Palacios 2.jpg", "proy-don-palacios-2.webp",
     "Escritorio de atención con dos sillas azules y lámpara colgante."),
    ("Don Palacios 3.jpg", "proy-don-palacios-3.webp",
     "Recepción: pared de madera con el logo y puerta enrasada. Portada."),
    ("Don Palacios 4.jpg", "proy-don-palacios-4.webp",
     "Biblioteca de madera con TV sobre bajo mesada blanco."),
    ("Don Palacios 5.jpg", "proy-don-palacios-5.webp",
     "Despacho con mesa de madera y mueble en L blanco."),
]


def quitar_bordes_negros(im, umbral=24, cubre=0.97):
    """Recorta filas y columnas negras en los bordes.

    Una fila cuenta como banda solo si casi todos sus píxeles son
    oscuros: un mueble negro contra el borde (una silla, una lámpara)
    ocupa una parte de la fila, no la fila entera, y no se toca."""
    a = np.asarray(im.convert("L")) < umbral
    filas = a.mean(axis=1) >= cubre
    cols = a.mean(axis=0) >= cubre

    def borde(v):
        n = 0
        while n < len(v) and v[n]:
            n += 1
        return n

    arriba, abajo = borde(filas), borde(filas[::-1])
    izq, der = borde(cols), borde(cols[::-1])
    if arriba + abajo >= im.height or izq + der >= im.width:
        return im, (0, 0, 0, 0)   # la foto entera es oscura: no se toca
    return (im.crop((izq, arriba, im.width - der, im.height - abajo)),
            (arriba, abajo, izq, der))


def foto_de_proyecto(origen, salida, ancho=1100):
    im = Image.open(os.path.join(SRC, origen)).convert("RGB")
    im, bandas = quitar_bordes_negros(im)
    if im.width > ancho:
        im = im.resize((ancho, max(int(im.height * ancho / im.width), 1)), Image.LANCZOS)
    im.save(os.path.join(DST, salida), "WEBP", quality=88, method=6)
    return salida, im.width, im.height, bandas


if __name__ == "__main__":
    for origen, salida, _ in PROYECTOS:
        if not os.path.exists(os.path.join(SRC, origen)):
            print(f"proyecto  FALTA {origen}")
            continue
        nombre, an, al, bandas = foto_de_proyecto(origen, salida)
        recorte = "  bordes negros (arriba, abajo, izq, der): %s" % (bandas,) if any(bandas) else ""
        print(f"proyecto  {nombre:28s} {an}x{al}{recorte}")
