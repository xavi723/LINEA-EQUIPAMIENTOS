# Imágenes del sitio

Los archivos `.webp` de esta carpeta **se generan solos**. No los edites a
mano: se sobrescriben.

## De dónde salen

Los originales que mandó la empresa están en `fotos-originales/`. El
script `procesar_fotos.py` (en la raíz) los convierte en las versiones que
usa el sitio:

```bash
python3 procesar_fotos.py
```

Por cada foto hace tres cosas:

1. **Borra la marca de agua.** Los originales tienen el chevron de la
   marca impreso en gris claro abajo a la derecha. Sobre fondo blanco no
   se ve, pero al recortar el producto sobre el verde de la marca queda
   como una mancha. El script la detecta sola: son los píxeles oscuros en
   las 17 fotos a la vez, cosa que ningún producto cumple.
2. **Cambia el fondo blanco** por el color de destino, con una franja de
   mezcla para que el recorte no quede dentado.
3. **Recorta el aire sobrante y encuadra** sin deformar, para que un
   escritorio ancho y un perchero angosto ocupen una porción pareja de su
   tarjeta.

## Para agregar o cambiar una foto

1. Poné el archivo nuevo en `fotos-originales/`.
2. Agregalo al diccionario que corresponda dentro de `procesar_fotos.py`
   (`FICHAS`, `CATEGORIAS` o `ANCHAS`).
3. Si es un producto nuevo, sumalo también a `PRODUCTOS` en `build.py`.
4. Corré `python3 procesar_fotos.py && python3 build.py`.

## Lo que todavía falta

Estas son fotos de **ambiente**, no de producto, y no las tenemos. Cada
hueco se muestra mientras tanto como un bloque de color sobrio con el
nombre del archivo que falta — nunca como una imagen rota — así que el
sitio se puede presentar igual.

- `bei-desarrollos.jpg`
- `colegio-arquitectos-detalle.jpg`
- `colegio-arquitectos.jpg`
- `consultorios.jpg`
- `estudio-contable.jpg`
- `frente-local.jpg`
- `planta-industrial.jpg`

Son fotos de oficinas terminadas, del taller y del frente del local. Las
cuatro que circularon al principio (la del Colegio de Arquitectos, las
tres sillas de colores, la Línea Strada y las sillas sobre fondo negro)
sirven para varios de estos huecos si se suben como archivo.
