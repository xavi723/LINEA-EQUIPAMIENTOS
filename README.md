# Línea Equipamiento — sitio web

Sitio de **Línea Equipamiento**, mobiliario integral en Rosario con más de
50 años de trayectoria. Next.js con App Router, TypeScript y Tailwind,
exportado como HTML estático.

> **Es una propuesta.** Buena parte de las fotos son **de ejemplo**, de
> otra empresa, y hay que reemplazarlas por fotos propias antes de usar el
> sitio de verdad. El detalle está en [Qué falta](#qué-falta).

## Arrancar

```bash
npm install
npm run dev        # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # compila para producción (carpeta out/)
npm run fotos      # regenera las imágenes desde fotos-originales/
```

## Desplegar

El build es HTML estático, sin servidor.

- **Vercel:** importar el repo en [vercel.com/new](https://vercel.com/new)
  y elegir la rama `main`. Cada push publica solo. El plan gratuito de
  Vercel **no permite uso comercial**: sirve para mostrar la propuesta,
  pero si la empresa adopta el sitio corresponde el plan Pro o pasarlo a
  GitHub Pages.
- **GitHub Pages:** el workflow `.github/workflows/pages.yml` publica cada
  push a `main`. Se activa una vez en **Settings → Pages → Source →
  GitHub Actions**. El repo tiene que ser público.

Todo lo que salga de `public/` tiene que pasar por `img()`
(`lib/rutas.ts`), para que funcione también bajo el subdirectorio de
GitHub Pages.

## Dónde se cambia cada cosa

Todo el contenido —empresa, contacto, rubros, catálogo y proyectos— vive
en `lib/datos.ts`. Los colores están en `app/globals.css` (sección 1,
tokens).

| Qué | Dónde |
|---|---|
| Nombre, lema, trayectoria, fundador, showroom, redes | `EMPRESA` en `lib/datos.ts` |
| WhatsApp (al que llegan todos los contactos) | `TELEFONO` y `TELEFONO_CRUDO` |
| Espacios que equipa | `RUBROS` |
| Productos | `PRODUCTOS` |
| Proyectos | `PROYECTOS` |
| Logo | `components/marca.tsx` |

## Datos de la empresa

Salen de su Instagram, su Facebook y lo que se relevó para el sitio.

| | |
|---|---|
| Showroom | Córdoba 1080, Rosario · Lunes a viernes de 9:30 a 12:30 h |
| WhatsApp | +54 341 505-1461 |
| Instagram | @lineaequipamiento |
| Facebook | facebook.com/linea.equipamiento |
| Fundador | Abel Baroni |
| Trayectoria | Más de 50 años (no hay año de fundación publicado) |

La empresa no publica mail ni teléfono fijo, así que el formulario de
presupuesto **abre WhatsApp con el pedido ya escrito**.

## Qué falta

**Fotos de ejemplo.** Son de otra empresa y están solo para mostrar cómo
se vería el sitio:

- **Productos** (las 12 fichas y las 4 portadas de categoría). Tienen
  nombres genéricos, no líneas propias. Hay que reemplazarlas por el
  catálogo real, con nombres y medidas.
- **Showroom** (las tres fotos de la portada, marcadas «Foto de
  ejemplo»). No son del local de Córdoba 1080.
- **Ambientes** (portada, bandas de servicios y contacto).
- **Proyectos de ejemplo** (dos, marcados «Ejemplo de cómo quedaría»).
  Hay que sacarlos cuando haya obras propias con fotos.

**Propio de Línea:** el isotipo, la foto de Abel Baroni, el render de
oficina de servicios y el proyecto del Centro de Investigaciones Clínicas
Baigorria, que por ahora muestra el video de Instagram incrustado hasta
que lleguen las fotos.

**Para pedirle a la empresa:**

- El logo completo en alta calidad (hoy solo hay el isotipo a 150 px).
- Fotos de sus productos, del showroom y de sus obras.
- Mail de contacto, garantía, zona de entrega e instalación, y si hacen
  muebles a medida.

## Las fotos

Se generan desde `fotos-originales/` con `npm run fotos`. El último paso
(`quitar_marca.py`) borra de las fichas de producto la marca de agua de
la empresa de la que vienen las fotos de ejemplo.

## Estructura

```
app/
  layout.tsx          cabecera, pie, panel y las tres fuentes
  globals.css         el sistema de diseño completo
  page.tsx            portada
  catalogo/           catálogo con filtros
  servicios/          diseño, fabricación, instalación y rubros
  proyectos/          proyectos
    [slug]/           página de cada proyecto (galería o video)
  contacto/           formulario (sale por WhatsApp) y datos
components/           piezas de la interfaz
lib/datos.ts          todo el contenido
public/img/           imágenes generadas
fotos-originales/     originales de las imágenes
```
