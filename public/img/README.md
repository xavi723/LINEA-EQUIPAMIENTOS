# Imágenes del sitio

Los `.webp` de esta carpeta **se generan solos**. No los edites a mano:
se sobrescriben en cada build.

## De dónde salen

Los originales que mandó la empresa están en `fotos-originales/`.
`procesar_fotos.py` (en la raíz) los convierte:

```bash
python3 procesar_fotos.py
```

**Fotos de producto** — recorte sobre fondo blanco. El script les borra
la marca de agua (el chevron gris de la esquina, que sobre fondo oscuro
se ve como una mancha), cambia el blanco por el color del sitio con una
franja de mezcla, y recorta el aire sobrante para que un escritorio ancho
y un perchero angosto ocupen una porción pareja de su tarjeta.

**Fotos de ambiente** — se recortan por región. Tres de las cuatro
originales traen el texto del banner quemado en la imagen, porque son
piezas de la web actual y no fotos limpias. No se puede poner un titular
del sitio encima de otro titular, así que el script recorta las zonas
sin texto en vez de taparlo. Los recortes están declarados en la lista
`AMBIENTE`, en fracciones de la imagen.

**Logo** — el original es el lockup completo en un solo color sobre
transparencia. De ahí salen `logo.webp` (oscuro, cabecera) y
`logo-blanco.webp` (claro, pie), recoloreando y conservando el alfa.

## Estado

Los 23 huecos de imagen del sitio tienen foto real. No queda ningún
bloque de reemplazo.

Si igual falta un archivo, ese hueco se muestra como un bloque de color
sobrio con el nombre del archivo que falta, nunca como una imagen rota.

## Para agregar una foto

1. Poné el original en `fotos-originales/`.
2. Sumalo al diccionario o lista que corresponda en `procesar_fotos.py`
   (`FICHAS`, `CATEGORIAS` o `AMBIENTE`).
3. Si es un producto nuevo, agregalo también a `PRODUCTOS` en `build.py`.
4. `python3 procesar_fotos.py && python3 build.py`
