#!/usr/bin/env python3
"""
Quita la marca de agua de Altobello (el chevron gris claro) de las fotos
de producto y de las portadas de categoría.

Las fotos de producto vienen de otra empresa y traen su chevron en la
esquina inferior derecha. `procesar_fotos.py` intenta quitarlo, pero
queda visible. Este paso lo busca en cada foto comparando con una
plantilla (`fotos-originales/marca-de-agua-altobello.png`) y pinta de
fondo solo los píxeles claros de esa zona: el producto, que es más
oscuro, no se toca.

Corre solo al final de `npm run fotos`. También se puede correr aparte:
`python quitar_marca.py`. Requiere Pillow y numpy.
"""

import os

import numpy as np
from PIL import Image

DST = "public/img"
PLANTILLA = "fotos-originales/marca-de-agua-altobello.png"
FONDO = np.array([253, 251, 249])   # el fondo de las fichas

FOTOS = [
    "escritorio-prisma", "escritorio-strada", "escritorio-tetra",
    "escritorio-ergonomico", "escritorio-recto", "silla-cool",
    "silla-cool-jazz", "silla-equis", "butaca-paulin", "mesa-bote",
    "mesa-redonda", "perchero", "cat-escritorios", "cat-sillas",
    "cat-reunion", "cat-accesorios",
]


def desvio(a):
    """Cuánto se aparta cada píxel del fondo."""
    return np.abs(a - FONDO).sum(2).astype(float)


def ubicar(D, T):
    """Correlación normalizada por FFT: dónde se parece más a la plantilla."""
    h, w = D.shape
    th, tw = T.shape
    Tz = T - T.mean()
    tam = (h + th, w + tw)
    num = np.fft.irfft2(np.fft.rfft2(D, tam) * np.conj(np.fft.rfft2(Tz, tam)), tam)
    num = num[:h - th, :w - tw]
    acum = np.cumsum(np.cumsum(np.pad(D ** 2, ((1, 0), (1, 0))), 0), 1)
    energia = acum[th:, tw:] - acum[:-th, tw:] - acum[th:, :-tw] + acum[:-th, :-tw]
    energia = energia[:h - th, :w - tw]
    puntaje = num / (np.sqrt(energia + 1e-6) * np.sqrt((Tz ** 2).sum()))
    # La marca siempre está en el cuadrante inferior derecho.
    puntaje[: h // 3, :] = -1
    puntaje[:, : w // 3] = -1
    return np.unravel_index(np.argmax(puntaje), puntaje.shape)


def limpiar(nombre, T, margen=14):
    ruta = os.path.join(DST, nombre + ".webp")
    a = np.asarray(Image.open(ruta).convert("RGB")).astype(int)
    D = desvio(a)
    th, tw = T.shape
    y, x = ubicar(D, T)

    zona = np.zeros(D.shape, bool)
    zona[max(y - margen, 0):y + th + margen, max(x - margen, 0):x + tw + margen] = True
    # Solo lo claro y cercano al fondo: el chevron y su borde suavizado.
    zona &= (a.min(2) > 150) & (D < 130)

    a[zona] = FONDO
    Image.fromarray(a.astype("uint8")).save(ruta, "WEBP", quality=90, method=6)
    return nombre


def limpiar_todas():
    T = desvio(np.asarray(Image.open(PLANTILLA).convert("RGB")).astype(int))
    for nombre in FOTOS:
        print("sin marca", limpiar(nombre, T))


if __name__ == "__main__":
    limpiar_todas()
