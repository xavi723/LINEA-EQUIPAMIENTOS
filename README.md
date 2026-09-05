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

Todas las imágenes del sitio son reales: los 12 productos, las cuatro
familias, las oficinas de la portada y las bandas, y los dos proyectos.
No queda ningún bloque de reemplazo.

Se generan desde `fotos-originales/` con:

```bash
python3 procesar_fotos.py
```

Tres de las cuatro fotos de ambiente traen el texto del banner quemado en
la imagen (son piezas de la web actual). El script recorta las zonas
limpias en vez de taparlo, para no superponer dos titulares. El detalle
está en [`assets/img/README.md`](assets/img/README.md).

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

## El logo

Es el logo real de la empresa. El original está en
`fotos-originales/logo-altobello-victorio.webp`: el lockup completo
(isotipo, nombre y bajada) en un solo color sobre transparencia.

`procesar_fotos.py` genera las dos versiones que usa el sitio:

- `assets/img/logo.webp` — verde oscuro, para la cabecera
- `assets/img/logo-blanco.webp` — claro, para el pie

La versión clara se deriva recoloreando y conservando el canal alfa, así
los bordes suavizados siguen limpios sobre el verde. Si algún día hay un
`.svg`, dejalo en `assets/img/` con el mismo nombre: el sitio lo prefiere
por ser vectorial, sin tocar código.

## Datos de contacto

Verificados contra la página de contacto de la empresa:

| | |
|---|---|
| Showroom | Bv. Rondeau 3042 · Lun a Vie 9 a 18 h |
| | Tel (0341) 455-5606 · presupuestos@altobellovictorio.com.ar |
| Fábrica y administración | Pedro Goyena 1023 · Lun a Jue 8-12 y 13-17, Vie hasta 16 h |
| | Tel (0341) 453-0775 · administracion@altobellovictorio.com.ar |
| WhatsApp | (0341) 15-601-6491 |
| Fundación | 1959 |

## Pendiente de confirmar con la empresa

- Los nombres de producto y las familias salen de los nombres de archivo
  de las fotos, así que son reales. Las **medidas no están**: las fichas
  dicen «Medidas y terminaciones a consultar» en vez de inventar
  milímetros. Cuando la empresa las pase, se cargan en `PRODUCTOS`
  dentro de `build.py`.
- El catálogo son 12 piezas, las que tienen foto. El catálogo real de la
  empresa es más grande.
- La sección de Proyectos tiene dos, los que están documentados con
  foto: Colegio de Arquitectos y BEI Desarrollos. Había tres más,
  inventados por mí como muestra; los saqué al llegar las fotos reales,
  porque atribuirle una foto verdadera a un proyecto que no existe es
  peor que dejar el hueco a la vista.
- Los teléfonos figuran en el sitio de la empresa sin característica;
  asumí (0341), que es la de Rosario.
