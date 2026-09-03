# Altobello Victorio — sitio web

Boceto navegable del sitio de **Altobello Victorio**, muebles para oficina
(Rosario, Santa Fe, desde 1959). HTML, CSS y JavaScript planos: se abre con
doble clic, no necesita instalar nada ni levantar un servidor.

## Cómo verlo

Abrí `index.html` en el navegador. Nada más.

Para verlo como lo verá el cliente (con las fotos cargadas), conviene
levantar un servidor local, porque algunos navegadores bloquean la carga de
archivos locales:

```bash
python3 -m http.server 8000
# después abrí http://localhost:8000
```

## Páginas

| Archivo | Qué es |
|---|---|
| `index.html` | Portada: propuesta, familias de producto, taller, piezas de referencia, cómo se trabaja |
| `catalogo.html` | Las 15 piezas con filtros por familia y medidas de serie |
| `servicios.html` | Diseño 3D, fabricación a medida, entrega e instalación |
| `proyectos.html` | Oficinas entregadas, con el Colegio de Arquitectos como caso |
| `contacto.html` | Formulario de presupuesto y datos del showroom |

## Cómo funciona el pedido de presupuesto

No hay carrito ni precios: en muebles de oficina el precio depende del
volumen, el tapizado y el proyecto. En su lugar el visitante arma una
**lista de presupuesto** con el botón *Presupuestar* de cada pieza. La lista
se guarda en el navegador y aparece resumida arriba del formulario de
contacto, así el vendedor recibe el pedido ya armado.

El formulario **no envía nada**: es una maqueta. Al enviarlo muestra un
aviso que lo aclara. Conectarlo a un mail o a un CRM es un paso posterior.

## Las fotos

Ninguna foto está incluida todavía. Mientras falten, cada hueco se muestra
como un bloque de color sobrio con el nombre del archivo que corresponde —
nunca como una imagen rota — así que el sitio se puede presentar igual.

**Para cargarlas:** copiá los `.jpg` en `assets/img/` con los nombres
exactos que lista [`assets/img/README.md`](assets/img/README.md). El sitio
las detecta solo, sin tocar código.

## Editar el sitio

Las páginas se generan con `build.py`, que tiene la cabecera, el pie, las
tarjetas y **todos los textos y productos** en un solo lugar:

```bash
python3 build.py   # reescribe los cinco .html
```

Editá `build.py`, nunca los `.html` — se sobrescriben en cada build.
Los datos de la empresa están en el diccionario `EMPRESA`, el catálogo en
la lista `PRODUCTOS` y los proyectos en `PROYECTOS`.

- `assets/css/site.css` — sistema de diseño completo (tokens, componentes, movimiento)
- `assets/js/site.js` — menú, lista de presupuesto, filtros, revelado al scroll

## Decisiones de diseño

**Color.** El verde-negro `#0C1F1A` sale del isotipo. El papel `#F4F3EF`
está sesgado al frío, como una hoja de plano, para no caer en el crema
tibio de siempre. El único acento es el naranja `#D2571C`, que no es
inventado: es el tapizado de sus propias sillas.

**Tipografía.** Archivo para títulos, Fira Sans para texto (es la humanista
más cercana al logotipo) e IBM Plex Mono para códigos y medidas. En un
catálogo de oficina las dimensiones son contenido, no decoración.

**Movimiento.** Cada duración corresponde a un rol —140 ms para hover,
200 ms para menús, 500 ms para el panel lateral, 560 ms para el revelado
editorial— en vez de una sola para todo. El hover está encerrado en
`@media (hover: hover)` para que el toque en celular no deje estados
pegados, y `prefers-reduced-motion` deja las opacidades y quita los
desplazamientos.

## Pendiente de confirmar con la empresa

Estos datos los tomé de fuentes públicas o son de muestra. Antes de
mostrarlo conviene chequearlos:

- El mail `ventas@altobellovictorio.com.ar` es **inventado**.
- Los horarios de atención son de muestra.
- «Respuesta en 24 h hábiles» es una promesa comercial: confirmar.
- Los códigos, medidas y nombres de producto son verosímiles pero
  **no son el catálogo real**, salvo la Línea Strada.
- De los proyectos, solo el Colegio de Arquitectos y BEI Desarrollos
  están acreditados; los otros tres son de muestra.
